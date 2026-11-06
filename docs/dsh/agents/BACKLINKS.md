# Backlink Scout - PlumbingHands (DSH app agent)
Runs: Saturdays 15:00 PKT as a DeepSeek Harness automation task on Sunny's laptop, folder `C:\Users\dell\Documents\plumbinghands-live-master`.
Command path: Claude (DSH project) writes this job file and the tasks in docs/dsh/TASKS.md -> this agent does the work in the DSH app -> it files a report card in docs/dsh/reports/ on a dsh/* branch -> Claude's weekly review checks it, merges what passes and assigns the next work.
Research only: never create accounts, sign in, submit forms, send emails or DMs, post comments, pay for links or use link schemes. Sunny places approved links himself after Claude checks them.

## Start (every run)
1. `$env:GIT_TERMINAL_PROMPT=0; git checkout master 2>&1 | Select-Object -Last 2; git pull --ff-only 2>&1 | Select-Object -Last 2`. If either fails: write `BLOCKED: <last line>` and stop.
2. `git checkout -b dsh/<YYYY-MM-DD>-BACKLINKS` (today's date).

## Work
1. Run the scout tool (it searches, then keeps only pages that load, are local and on topic, and don't already link to us):
   `$env:SITE='https://plumbinghands.com'; $env:NAME='PlumbingHands'; $env:NICHE='plumbing'; $env:NICHE_WORD='plumb'; $env:CITIES='Dallas,Fort Worth,Plano,Arlington,Frisco,Irving,Garland,McKinney,Denton,Grand Prairie'; python scripts\backlink-scout.py 2>&1 | Select-Object -Last 3`
   If `python` is not found, try `py scripts\backlink-scout.py`. If neither exists, do the steps by hand: search `https://html.duckduckgo.com/html/?q=<city> Texas plumbing business directory` with `Invoke-WebRequest -UseBasicParsing`, open each result, and keep only pages that load, are about our area or trade, and offer a free listing or a resources/links list.
2. Open the report `docs/dsh/reports/<YYYY-MM-DD>-BACKLINKS.md`. Check every row by opening the page: delete rows that are spam, paid-only, off topic, or not about our cities. Keep at most 10.
3. For each kept row, make sure "How to get listed" names the real button or page on that site.

Allowed files: the report and docs/dsh/backlinks-log.md.

## Finish: the report card
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH BACKLINKS: <one line> (DONE)"` (or `(BLOCKED)`, with the reason in the report).
3. `git push -u origin <branch> 2>&1 | Select-Object -Last 3`. Never push master; Claude reviews and merges.
4. Prove it: `git ls-remote --heads origin <branch>` must print a line. If it prints nothing the push failed: say `BLOCKED: push failed` plus the error line. Never claim a push you did not verify.
5. `git checkout master 2>&1 | Select-Object -Last 1`. End with one line: the branch you pushed, or BLOCKED and why.

## Hard rules
- NEVER run `git reset --hard`, `git clean`, `git checkout -- .`, `git checkout -f`, `git stash`, `Remove-Item`/`del`, or "reset the environment". On 2026-11-03 this deleted ~500 files. If git looks messy, stop and report BLOCKED.
- Stay in scope: do only what this file says, only in this repo folder. Never change git config, remotes or credentials, never install anything, never touch files outside the repo (temporary files go in `$env:TEMP`).
- Pipe every npm/npx/git/eslint command through `2>&1 | Select-Object -Last 15` (free model quota). Use a NEW session per run; never "try again" inside a failed one.
- Report what commands printed, not what you expect. Copy summary lines verbatim. Never write "clean", "N/A" or "verified" unless a command output shows it.
- No API keys, passwords, ID or bank numbers anywhere. Never change the phone number (1 844-397-8298).
- Facts only. Never invent numbers, prices, reviews, quotes, licenses or sources.
