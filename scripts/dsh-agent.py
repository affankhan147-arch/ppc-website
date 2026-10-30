#!/usr/bin/env python3
"""DSH cloud agent.

Runs in GitHub Actions (.github/workflows/dsh-agent.yml). Takes the next OPEN or FIX
task from docs/dsh/TASKS.md, does it on a dsh/<date>-<task-id> branch with aider and
the free Gemini API, runs the build, writes a report and pushes the branch.
It never pushes to master: Claude's daily audit reviews and merges.

Env: GEMINI_API_KEY (repo secret), DSH_MODELS (comma list), DSH_MAX_TASKS,
DSH_CHECKS and DSH_HEALTH (commands separated by ";;"), DSH_DRY_RUN=1 to skip
aider and pushing (for testing).
"""
import datetime
import os
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path.cwd()
TASKS = ROOT / "docs" / "dsh" / "TASKS.md"
# With a GEMINI_API_KEY secret: free Gemini. Without it: GitHub Models (free, uses the
# workflow's own GITHUB_TOKEN, no secret needed; 8K-token requests, so no AGENTS.md copy).
USE_GEMINI = bool(os.getenv("GEMINI_API_KEY"))
DEFAULT_MODELS = ("gemini/gemini-3.1-flash-lite,gemini/gemini-3.5-flash-lite" if USE_GEMINI
                  else "openai/openai/gpt-4.1-mini,openai/openai/gpt-4o-mini")
MODELS = [m.strip() for m in (os.getenv("DSH_MODELS") or DEFAULT_MODELS).split(",") if m.strip()]
if not USE_GEMINI:
    os.environ.setdefault("OPENAI_API_BASE", "https://models.github.ai/inference")
    os.environ.setdefault("OPENAI_API_KEY", os.getenv("GITHUB_TOKEN", ""))
MAX_TASKS = int(os.getenv("DSH_MAX_TASKS", "2"))
CHECKS = [c for c in os.getenv("DSH_CHECKS", "npm run build").split(";;") if c.strip()]
HEALTH = [c for c in os.getenv("DSH_HEALTH", "npm run build").split(";;") if c.strip()]
DRY = os.getenv("DSH_DRY_RUN") == "1"
TODAY = datetime.date.today().isoformat()


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
    pattern = r"^## ([A-Z]+-\d+) - (.+?) - Status: ([A-Z ]+?)\s*$(.*?)(?=^## |\Z)"
    for m in re.finditer(pattern, text, re.M | re.S):
        yield m.group(1), m.group(2).strip(), m.group(3).strip(), m.group(0).strip()


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
           "--analytics-disable --no-pretty --no-stream --no-fancy-input "
           "--chat-history-file /tmp/aider-chat.md --input-history-file /tmp/aider-input "
           f"{'--read AGENTS.md ' if USE_GEMINI else ''}--message-file {msg_file} {quoted}")
    return sh(cmd, tail=20, timeout=960)


def changed_files():
    out = subprocess.run("git status --porcelain", shell=True, text=True, capture_output=True).stdout
    return [l[3:].strip().strip('"') for l in out.splitlines() if len(l) > 3]


def do_task(task_id, title, status, block):
    existing = remote_branch(task_id)
    if status == "OPEN" and existing:
        print(f"{task_id}: branch {existing} already pushed, waiting for Claude's review. Skipping.")
        return False
    branch = existing if (status == "FIX" and existing) else f"dsh/{TODAY}-{task_id}"
    assert branch.startswith("dsh/"), "DSH only pushes dsh/* branches"
    base = f"origin/{branch}" if branch == existing else "origin/master"
    must(f"git fetch -q origin {branch if branch == existing else 'master'}")
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
            done = False
            for model in MODELS:
                if DRY:
                    notes.append("dry run: aider skipped")
                    break
                code, out = aider(model, files, message)
                if any(f in changed_files() for f in files):
                    used_model, done = model, True
                    break
                notes.append(f"{model}: no change (exit {code}): {out.splitlines()[-1][:160] if out else ''}")
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
        f"Model: {used_model} ({'Gemini' if USE_GEMINI else 'GitHub Models'}, GitHub Actions + aider)\n"
        f"Files changed: {', '.join(files) or 'none'}\n"
        f"What I did: {what}\n"
        f"Checks:\n{checks}\n"
        f"Left / problems: {'; '.join(notes) or 'none'}\n",
        encoding="utf-8")

    to_add = " ".join(f'"{f}"' for f in files + [str(report.relative_to(ROOT))])
    must(f"git add -- {to_add}")
    must(f'git commit -q -m "DSH {task_id}: {title[:60]} ({state})"')
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
    done = 0
    for task_id, title, status, block in parse_tasks():
        if done >= MAX_TASKS:
            break
        if status in ("OPEN", "FIX") and do_task(task_id, title, status, block):
            done += 1
    print(f"Tasks handled this run: {done}")


if __name__ == "__main__":
    main()
