# Backlink Scout - PlumbingHands (DSH app agent)
Runs: Saturdays 15:00 PKT as a DeepSeek Harness automation task on Sunny's laptop, folder `C:\Users\dell\Documents\plumbinghands-live-master`.
Command path: Claude (DSH project) writes this job file and the tasks in docs/dsh/TASKS.md -> this agent does the work in the DSH app -> it files a report card in docs/dsh/reports/ on a dsh/* branch -> Claude's weekly review checks it, merges what passes and assigns the next work.
Research only: never create accounts, sign in, submit forms, send emails or DMs, post comments, pay for links or use link schemes. Sunny places approved links himself after Claude checks them.

## Start (every run)
1. `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 sync` (checks out master and pulls; plain `git pull` cannot log in inside the DSH sandbox). It must print `SYNCED master`; otherwise write what it printed as BLOCKED and stop.
2. `git checkout -b dsh/<YYYY-MM-DD>-BACKLINKS` (today's date).

## Work
1. Run the scout tool (no AI; it searches, then keeps only pages that load, stay on their own site, are local and on topic, and don't already link to us):
   `node scripts/backlink-scout.mjs --site https://plumbinghands.com --niche "plumbing" --word plumb --cities "Dallas,Fort Worth,Plano,Arlington,Frisco,Irving,Garland,McKinney,Denton,Grand Prairie" 2>&1 | Select-Object -Last 3`
   If it finds nothing (search blocked), do the search by hand: `Invoke-WebRequest -UseBasicParsing "https://html.duckduckgo.com/html/?q=<city> Texas plumbing business directory"`, open each result, keep only pages that load, are about our area or trade, and offer a free listing or a resources/links list, and add them to the report table yourself.
2. Open the report `docs/dsh/reports/<YYYY-MM-DD>-BACKLINKS.md`. Check every row by opening the page: delete rows that are spam, paid-only, off topic, or not about our cities. Keep at most 10.
3. For each kept row, make sure "How to get listed" names the real button or page on that site.

Allowed files: the report and docs/dsh/backlinks-log.md.

## Finish: the report card
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH BACKLINKS: <one line> (DONE)"` (or `(BLOCKED)`, with the reason in the report).
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
