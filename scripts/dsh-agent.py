#!/usr/bin/env python3
"""DSH cloud agent.

Runs in GitHub Actions (.github/workflows/dsh-agent.yml). Takes the next OPEN or FIX
task from docs/dsh/TASKS.md, does it on a dsh/<date>-<task-id> branch with aider and
the free Gemini API, runs the build, writes a report and pushes the branch.
It never pushes to master: Claude's daily audit reviews and merges.

Env: GEMINI_API_KEY plus optional OPENROUTER/GROQ/MISTRAL/CEREBRAS_API_KEY (repo secrets),
DSH_MODELS (comma list, overrides discovery), DSH_MAX_TASKS,
DSH_CHECKS and DSH_HEALTH (commands separated by ";;"), DSH_DRY_RUN=1 to skip
aider and pushing (for testing).
"""
import datetime
import json
import os
import pathlib
import re
import shlex
import subprocess
import sys
import urllib.request

ROOT = pathlib.Path.cwd()
TASKS = ROOT / "docs" / "dsh" / "TASKS.md"
# Free model pool, discovered live every run (see all_models): Gemini Flash Lite first
# (500 requests/day each), then the other free Gemini Flash models (about 20/day each),
# then any other free provider whose key is a repo secret. A model that hits a limit or
# errors is dropped for the rest of the run, so the next task starts on the next model.
PROVIDER_KEYS = ("GEMINI_API_KEY", "OPENROUTER_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY", "CEREBRAS_API_KEY")
KEYED = any(os.getenv(k) for k in PROVIDER_KEYS)
if not KEYED:  # last resort: GitHub Models via the workflow token (returned plain "OK" on 2026-10-31)
    os.environ.setdefault("OPENAI_API_BASE", "https://models.github.ai/inference")
    os.environ.setdefault("OPENAI_API_KEY", os.getenv("GITHUB_TOKEN", ""))
MODELS = []
DEAD = set()
MAX_TASKS = int(os.getenv("DSH_MAX_TASKS", "2"))
MAX_WRITER = int(os.getenv("DSH_MAX_WRITER", "0"))  # WRITER tasks belong to the DSH app's Article Writer; set 1 to let the cloud write too
CHECKS = [c for c in os.getenv("DSH_CHECKS", "npm run build").split(";;") if c.strip()]
HEALTH = [c for c in os.getenv("DSH_HEALTH", "npm run build").split(";;") if c.strip()]
DRY = os.getenv("DSH_DRY_RUN") == "1"
TODAY = datetime.date.today().isoformat()


def _get_json(url, headers=None):
    # Groq and Cerebras sit behind Cloudflare, which rejects the default "Python-urllib" agent.
    req = urllib.request.Request(url, headers={"User-Agent": "dsh-agent/1.0", "Accept": "application/json", **(headers or {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def gemini_models():
    """Every free Gemini Flash model this key can call, Flash Lite first, newest first."""
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        return []
    fallback = ["gemini/gemini-3.5-flash-lite", "gemini/gemini-3.1-flash-lite"]
    try:
        data = _get_json("https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000",
                         {"x-goog-api-key": key})
    except Exception as e:  # noqa: BLE001
        print(f"Gemini model list failed ({type(e).__name__}); using defaults")
        return fallback
    skip = ("image", "tts", "audio", "live", "embedding", "vision", "learnlm", "robotics", "computer-use", "banana")
    names = {m.get("name", "").split("/", 1)[-1] for m in data.get("models", [])
             if "generateContent" in m.get("supportedGenerationMethods", [])}
    names = [n for n in names if "flash" in n and not any(x in n for x in skip)]

    def rank(n):
        v = re.findall(r"\d+(?:\.\d+)?", n)
        return ("lite" not in n, any(x in n for x in ("preview", "exp", "latest")), -float(v[0]) if v else 0, n)
    return ["gemini/" + n for n in sorted(names, key=rank)] or fallback


def listed_models(env, url, prefix, want, limit):
    """Model ids from an OpenAI-style /models list, for a provider whose key is set."""
    key = os.getenv(env)
    if not key:
        return []
    try:
        data = _get_json(url, {"Authorization": f"Bearer {key}"})
    except Exception as e:  # noqa: BLE001
        print(f"{env}: model list failed ({type(e).__name__} {getattr(e, 'code', '')})")
        return []
    ids = sorted(i for i in (m.get("id", "") for m in data.get("data", [])) if want(i))
    # Coding-strong families first; anything else that passed the filter comes after.
    ids.sort(key=lambda i: not any(w in i.lower() for w in ("coder", "deepseek", "qwen", "kimi", "glm", "gpt-oss")))
    print(f"{env}: {len(ids)} usable models")
    return [prefix + i for i in ids][:limit]


def all_models():
    if os.getenv("DSH_MODELS"):
        return [m.strip() for m in os.getenv("DSH_MODELS").split(",") if m.strip()]
    pool = gemini_models()
    pool += listed_models("OPENROUTER_API_KEY", "https://openrouter.ai/api/v1/models", "openrouter/",
                          lambda i: i.endswith(":free"), 4)
    pool += listed_models("GROQ_API_KEY", "https://api.groq.com/openai/v1/models", "groq/",
                          lambda i: not any(w in i for w in ("whisper", "tts", "guard", "playai", "orpheus", "prompt")), 3)
    pool += listed_models("CEREBRAS_API_KEY", "https://api.cerebras.ai/v1/models", "cerebras/",
                          lambda i: True, 3)
    if os.getenv("MISTRAL_API_KEY"):
        pool += ["mistral/codestral-latest", "mistral/mistral-small-latest"]
    return pool or ["openai/openai/gpt-4.1-mini", "openai/openai/gpt-4o-mini"]


def preflight():
    """Tiny requests to the model endpoint, so the report shows what the endpoint really returns."""
    if KEYED:
        return "provider keys set"
    import json, urllib.request, urllib.error
    body = json.dumps({"model": MODELS[0].split("/", 1)[1], "max_tokens": 5,
                       "messages": [{"role": "user", "content": "Reply OK"}]}).encode()
    base = {"Authorization": f"Bearer {os.environ.get('OPENAI_API_KEY', '')}", "Content-Type": "application/json"}
    variants = {"github-models": {"Accept": "application/vnd.github+json"}}
    results = []
    for name, extra in variants.items():
        req = urllib.request.Request(os.environ["OPENAI_API_BASE"].rstrip("/") + "/chat/completions",
                                     data=body, headers={**base, **extra})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                results.append(f"{name}: HTTP {r.status} {r.headers.get('content-type')} {r.read()[:90]!r}")
        except urllib.error.HTTPError as e:
            results.append(f"{name}: HTTP {e.code} {e.read()[:150]!r}")
        except Exception as e:  # noqa: BLE001
            results.append(f"{name}: {type(e).__name__}: {e}")
    return " || ".join(results)


def sh(cmd, tail=12, timeout=1200):
    """Run a shell command; return (exit code, last `tail` lines of output)."""
    try:
        p = subprocess.run(cmd, shell=True, text=True, capture_output=True, timeout=timeout)
        out = (p.stdout + "\n" + p.stderr).strip().splitlines()
        return p.returncode, "\n".join(out[-tail:])
    except subprocess.TimeoutExpired:
        return 124, f"timed out after {timeout}s"


def must(cmd):
    code, out = sh(cmd)
    if code:
        sys.exit(f"FAILED ({code}): {cmd}\n{out}")
    return out


def parse_tasks():
    text = TASKS.read_text(encoding="utf-8")
    # One heading per line: "## <ID> - <title> - Status: <STATUS ...>". Status = its first word.
    pattern = r"^## ([A-Z]+-\d+) - ([^\n]+?) - Status: ([^\n]+?)[ \t]*$(.*?)(?=^## |\Z)"
    for m in re.finditer(pattern, text, re.M | re.S):
        yield m.group(1), m.group(2).strip(), m.group(3).split()[0].upper(), m.group(0).strip()


def task_files(block):
    """Backticked paths on 'File:' / 'Files:' lines are the only files the task may change."""
    files = []
    for line in block.splitlines():
        if re.match(r"\s*Files?:", line):
            files += re.findall(r"`([^`\s]+\.[A-Za-z0-9]+)`", line)
    return sorted(set(files))


def report_only(block):
    return bool(re.search(r"^\s*Files?:\s*only (your|the) report", block, re.M | re.I))


def remote_branch(task_id):
    _, out = sh(f'git ls-remote --heads origin "dsh/*-{task_id}"')
    refs = [l.split("refs/heads/")[1] for l in out.splitlines() if "refs/heads/" in l]
    return sorted(refs)[-1] if refs else None


def run_checks(cmds):
    lines, ok = [], True
    for c in cmds:
        code, out = sh(c, tail=3)
        last = out.splitlines()[-1] if out else ""
        lines.append(f"- `{c}`: {'PASS' if code == 0 else 'FAIL'} - {last[:160]}")
        ok = ok and code == 0
    return ok, "\n".join(lines)


def aider(model, files, message):
    msg_file = pathlib.Path("/tmp/dsh-message.txt")
    msg_file.write_text(message, encoding="utf-8")
    quoted = " ".join(f'"{f}"' for f in files)
    cmd = (f"timeout 900 aider --model {model} --edit-format diff --yes-always --no-auto-commits "
           "--no-dirty-commits --no-gitignore --map-tokens 0 --no-show-model-warnings --no-check-update "
           "--analytics-disable --no-pretty --no-stream --no-fancy-input --no-detect-urls "
           "--chat-history-file /tmp/aider-chat.md --input-history-file /tmp/aider-input "
           f"{'--read AGENTS.md ' if KEYED else ''}--message-file {msg_file} {quoted}")
    return sh(cmd, tail=20, timeout=960)


def changed_files():
    out = subprocess.run("git status --porcelain", shell=True, text=True, capture_output=True).stdout
    return [l[3:].strip().strip('"') for l in out.splitlines() if len(l) > 3]


def writer_rules():
    """The Article Writer's style rules, from docs/dsh/agents/WRITER.md (section '## Write')."""
    f = ROOT / "docs" / "dsh" / "agents" / "WRITER.md"
    text = f.read_text(encoding="utf-8") if f.exists() else ""
    m = re.search(r"^## Write\n(.*?)(?=^## |\Z)", text, re.M | re.S)
    return "You are the Article Writer. Writing rules:\n" + (m.group(1).strip() if m else
           "Plain, human copy; facts only from the brief's sources; keyword in title, H1, first paragraph and one H2.")


def writer_models():
    """Articles: try the stronger non-Lite Gemini Flash models first (20 requests/day each), then the rest."""
    strong = [m for m in MODELS if m.startswith("gemini/") and "flash" in m and "lite" not in m
              and not re.search(r"preview|latest|omni|live", m)]
    return strong + [m for m in MODELS if m not in strong]


def do_task(task_id, title, status, block):
    existing = remote_branch(task_id)
    blocked = False
    if existing:
        must(f"git fetch -q origin +refs/heads/{existing}:refs/remotes/origin/{existing}")
        _, subject = sh(f"git log -1 --format=%s origin/{existing}")
        blocked = "(BLOCKED)" in subject  # last attempt failed: retry on the same branch
    if status in ("OPEN", "WRITER") and existing and not blocked:
        print(f"{task_id}: branch {existing} already pushed, waiting for Claude's review. Skipping.")
        return False
    branch = existing if (existing and (status in ("FIX", "WRITER-FIX") or blocked)) else f"dsh/{TODAY}-{task_id}"
    assert branch.startswith("dsh/"), "DSH only pushes dsh/* branches"
    base = f"origin/{branch}" if branch == existing else "origin/master"
    must(f"git checkout -q -B {branch} {base}")
    if branch == existing:
        sh("git merge -q --no-edit origin/master")

    report = ROOT / "docs" / "dsh" / "reports" / f"{TODAY}-{task_id}.md"
    used_model, notes = "none (checks only)", []

    if report_only(block):
        ok, checks = run_checks(HEALTH)
        files, done = [], True
        ok = True  # a health check is DONE once it has reported, even if some checks fail
        what = "Ran the health checks listed in the task. No code changes."
    else:
        files = task_files(block)
        if not files:
            ok, checks, done = False, "- not run", False
            what = "BLOCKED: the task has no `File:` line with backticked paths, so I don't know which files I may change."
        else:
            message = ("You are DSH, a careful junior developer. Do ONLY this task and edit ONLY the files "
                       "you were given. Follow AGENTS.md (content rules above all). Use exactly the text, "
                       "links and class names the task gives. Do not reformat or touch anything else.\n\n"
                       f"TASK:\n{block}\n")
            writer = status.startswith("WRITER")
            if writer:
                message = writer_rules() + "\n\n" + message
            done = False
            notes.append(f"preflight: {preflight()}")
            order = writer_models() if writer else MODELS
            for model in [m for m in order if m not in DEAD]:
                if DRY:
                    notes.append("dry run: aider skipped")
                    break
                code, out = aider(model, files, message)
                if any(f in changed_files() for f in files):
                    used_model, done = model, True
                    break
                notes.append(f"{model}: no change (exit {code}): {' | '.join(out.splitlines()[-4:])[:400] if out else ''}")
                if re.search(r"rate.?limit|quota|exhaust|429|not.?found|404|permission|denied|401|403|api.?key", out or "", re.I):
                    DEAD.add(model)  # skip it for the rest of this run
            ok, checks = run_checks(CHECKS) if done else (False, "- not run (no change made)")
            if done and not ok and not DRY:
                code, out = sh(CHECKS[0], tail=25)
                aider(used_model, files, message + f"\nThe build failed. Fix only this error:\n{out}\n")
                ok, checks = run_checks(CHECKS)
            # Undo anything outside the task's files (aider caches, stray edits).
            for f in changed_files():
                if f not in files and not f.startswith("docs/dsh/reports/"):
                    sh(f'git checkout -- "{f}" 2>/dev/null || git clean -fdq -- "{f}"')
            what = (f"Applied the task to {', '.join(files)} with aider." if done
                    else "BLOCKED: the model made no change.")

    state = "DONE" if (done and ok) else "BLOCKED"
    files = [f for f in files if f in changed_files()]
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(
        f"# {task_id} - {TODAY}\n"
        f"Status: {state}\n"
        f"Model: {used_model} (GitHub Actions + aider)\n"
        f"Files changed: {', '.join(files) or 'none'}\n"
        f"What I did: {what}\n"
        f"Checks:\n{checks}\n"
        f"Left / problems: {'; '.join(notes) or 'none'}\n",
        encoding="utf-8")

    to_add = " ".join(f'"{f}"' for f in files + [str(report.relative_to(ROOT))])
    must(f"git add -- {to_add}")
    must("git commit -q -m " + shlex.quote(f"DSH {task_id}: {title[:60]} ({state})"))
    if DRY:
        print(f"{task_id}: dry run, not pushing. Report:\n{report.read_text()}")
    else:
        must(f"git push -q -u origin {branch}")
        print(f"{task_id}: pushed {branch} ({state})")
    sh("git checkout -q master || git checkout -q -B master origin/master")
    return True


def main():
    must('git config user.name "DSH agent"')
    must('git config user.email "dsh-agent@users.noreply.github.com"')
    must("git fetch -q origin master")
    global MODELS
    MODELS = all_models()
    print("Model pool:", ", ".join(MODELS))
    if not KEYED:
        check = preflight()
        if '"choices"' not in check:
            # GitHub Models answered 'OK' as plain text on 2026-10-31, not a chat reply. Don't push empty branches.
            sys.exit("No working AI model. Add the repo secret GEMINI_API_KEY "
                     "(Settings > Secrets and variables > Actions). GitHub Models said: " + check[:200])
    tasks = list(parse_tasks())
    wrote = 0
    for task_id, title, status, block in tasks:  # Article Writer first: one WRITER task per run
        if wrote >= MAX_WRITER:
            break
        if status in ("WRITER", "WRITER-FIX") and do_task(task_id, title, status, block):
            wrote += 1
    done = 0
    for task_id, title, status, block in tasks:
        if done >= MAX_TASKS:
            break
        if status in ("OPEN", "FIX") and do_task(task_id, title, status, block):
            done += 1
    print(f"Tasks handled this run: {done} (+ {wrote} article)")


if __name__ == "__main__":
    main()
