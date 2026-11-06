# Internal-Link Auditor - PlumbingHands (DSH app agent)
Runs: Thursdays 15:00 PKT as a DeepSeek Harness automation task on Sunny's laptop, folder `C:\Users\dell\Documents\plumbinghands-live-master`.
Command path: Claude (DSH project) writes this job file and the tasks in docs/dsh/TASKS.md -> this agent does the work in the DSH app -> it files a report card in docs/dsh/reports/ on a dsh/* branch -> Claude's weekly review checks it, merges what passes and assigns the next work.
Report only: never edit site files.

## Start (every run)
1. `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 sync` (checks out master and pulls; plain `git pull` cannot log in inside the DSH sandbox). It must print `SYNCED master`; otherwise write what it printed as BLOCKED and stop.
2. `git checkout -b dsh/<YYYY-MM-DD>-LINK-AUDIT` (today's date).

## Work
1. Run the audit tool for fresh link data: `node scripts/seo-audit.mjs --site https://plumbinghands.com --phone "844-397-8298" --out $env:TEMP\link-audit.md 2>&1 | Select-Object -Last 3`. Read its sections "Internal links: orphan and weak pages" and "Internal-link suggestions".
2. Pick the 10 most valuable weak pages (city-service pages, service pages and guides before anything else).
3. For each, choose 2 source pages that share the same service or the same city (use the tool's suggestions, but check they make sense). Find each source's file: `Get-ChildItem -Recurse -File src\data,src\app -Include *.ts,*.tsx | Select-String -SimpleMatch -Pattern '<source slug>' -List | Select-Object -First 2 Path,LineNumber`.
4. Write one natural sentence per link (12-25 words, plain English) that could sit in that source page, with a 2-6 word anchor that describes the target. Vary anchors; no "click here".

## Report: `docs/dsh/reports/<YYYY-MM-DD>-LINK-AUDIT.md`
```
# LINK-AUDIT - <date>
Status: DONE | BLOCKED
Model: <model>
Pages checked: N | Orphans: N | Weak (1 link in): N | Broken internal links: N   (copy from the tool)
| Target page | Source page | Source file:line | Anchor | Sentence to add |
```
Allowed files: only the report.

## Finish: the report card
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH LINK-AUDIT: <one line> (DONE)"` (or `(BLOCKED)`, with the reason in the report).
3. Push with the sandbox-safe helper (plain `git push` cannot log in inside the DSH sandbox): `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 push`. It only pushes dsh/* branches and checks GitHub afterwards. Never push master; Claude reviews and merges.
4. It prints `PUSHED <branch>` or `BLOCKED: push failed` plus the error. Report exactly what it printed. Never claim a push you did not see confirmed.
5. `git checkout master 2>&1 | Select-Object -Last 1`. End with one line: the branch you pushed, or BLOCKED and why.

## Hard rules
- NEVER run `git reset --hard`, `git clean`, `git checkout -- .`, `git checkout -f`, `git stash`, `Remove-Item`/`del`, or "reset the environment". On 2026-11-03 this deleted ~500 files. If git looks messy, stop and report BLOCKED.
- Stay in scope: do only what this file says, only in this repo folder. Never change git config, remotes or credentials, never install anything, never touch files outside the repo (temporary files go in `$env:TEMP`).
- Pipe every npm/npx/git/eslint command through `2>&1 | Select-Object -Last 15` (free model quota). Use a NEW session per run; never "try again" inside a failed one.
- Report what commands printed, not what you expect. Copy summary lines verbatim. Never write "clean", "N/A" or "verified" unless a command output shows it.
- No API keys, passwords, ID or bank numbers anywhere. Never change the phone number (1 844-397-8298).
- Facts only. Never invent numbers, prices, reviews, quotes, licenses or sources.
