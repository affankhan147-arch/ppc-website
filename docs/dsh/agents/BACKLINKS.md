# Backlink Scout - PlumbingHands (desktop DSH agent)
Runs: Saturdays 15:00 PKT (DSH app automation task "Backlink Scout"). Research only.
Owner: Claude reviews the list at its weekly review; Sunny places the approved links himself.

## Never
Create accounts, sign in, submit forms, send emails or DMs, post comments, pay for links, or use link farms, PBNs, paid guest posts or link exchanges. Never edit site files. These would risk a Google spam penalty and are Sunny's call.

## Start (every run)
1. `$env:GIT_TERMINAL_PROMPT=0; git checkout master 2>&1 | Select-Object -Last 2; git pull --ff-only 2>&1 | Select-Object -Last 2`. If the pull fails: stop and write `BLOCKED: <last line>` in the chat.
2. `git checkout -b dsh/<YYYY-MM-DD>-BACKLINKS` (today's date).

## Goal
10 real, verified, free backlink opportunities for https://plumbinghands.com (emergency plumbing (burst pipes, slab leaks, water heaters, drains, sewer) in Dallas-Fort Worth and other Texas cities).
Good types: Texas plumbing associations (e.g. PHCC Texas), city chambers of commerce, neighborhood/HOA resource pages, local news home-maintenance guides; local business directories that list service businesses; unlinked mentions of PlumbingHands; resource pages with broken links we could replace; journalist/expert requests (e.g. Qwoted, Featured) on our topics.

## Steps
1. Read `docs/dsh/backlinks-log.md` (create it if missing, header `# Backlink log`). Skip anything already listed.
2. Search: `(Invoke-WebRequest -UseBasicParsing "https://html.duckduckgo.com/html/?q=<url-encoded query>").Links | Where-Object href -match 'uddg=' | Select-Object -First 10 href`. Queries combine a city we serve + the niche + "directory", "resources", "submit your business", "add listing", "useful links".
3. For each candidate open the page (`Invoke-WebRequest -UseBasicParsing`): it must return 200, be about our area or niche, and not already link to plumbinghands.com (search the HTML). Read the site's own "how to get listed" steps and whether it is free.
4. Skip paid listings, spammy directories (pages full of unrelated links, casino/pharma), and sites that are not in the US.

## Report: `docs/dsh/reports/<YYYY-MM-DD>-BACKLINKS.md`
```
# BACKLINKS - <date>
Status: DONE | BLOCKED
Model: <model>
| # | Site | Page where the link would go | Type | Free? | How to get listed (their steps) | Why relevant |
## Ready-to-paste business description (max 60 words, facts from our home page only)
```
Then append one line per opportunity to `docs/dsh/backlinks-log.md`: `<date> | <site> | <page URL> | proposed`.
Allowed files: the report and docs/dsh/backlinks-log.md.

## Finish
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH BACKLINKS: <one line> (DONE)"` (or `(BLOCKED)` with the reason in the report).
3. `git push -u origin <branch> 2>&1 | Select-Object -Last 3`. Never push master. Claude reviews and merges.
   Then prove it: `git ls-remote --heads origin <branch>` must print a line. If it prints nothing, the push failed: say `BLOCKED: push failed` plus the error line. Never claim a push you did not verify.
4. `git checkout master 2>&1 | Select-Object -Last 1`.

## Hard rules (same as AGENTS.md)
- NEVER run `git reset --hard`, `git clean`, `git checkout -- .`, `git checkout -f`, `git stash`, `Remove-Item`/`del`, or "reset the environment". If git looks messy, stop and report BLOCKED.
- Pipe every npm/npx/git/eslint command through `2>&1 | Select-Object -Last 15` (free model quota).
- No API keys, passwords, ID or bank numbers anywhere. Never change the phone number (1 844-397-8298).
- Stay in scope: do only what this file says. Never change git config, remotes or credentials, and never install anything. If something blocks you, report BLOCKED with the error line instead of working around it.
- Report what the commands printed, not what you expect. Copy summary lines verbatim (e.g. eslint's `N problems (E errors, W warnings)`). Never write "clean", "N/A" or "verified" unless a command output shows it.
- Facts only. Never invent numbers, prices, reviews, quotes, licenses or sources.
