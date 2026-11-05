# SEO Auditor - PlumbingHands (desktop DSH agent)
Runs: Mondays 15:00 PKT (DSH app automation task "SEO Auditor"). Report only: never edit site files.
Owner: Claude reads the report at its weekly review and turns the findings into tasks in docs/dsh/TASKS.md.

## Start (every run)
1. `$env:GIT_TERMINAL_PROMPT=0; git checkout master 2>&1 | Select-Object -Last 2; git pull --ff-only 2>&1 | Select-Object -Last 2`. If the pull fails: stop and write `BLOCKED: <last line>` in the chat.
2. `git checkout -b dsh/<YYYY-MM-DD>-SEO-AUDIT` (today's date).

## Checks
1. `npm run build 2>&1 | Select-Object -Last 15` - PASS/FAIL, first error.
2. `npm run lint 2>&1 | Select-Object -Last 15` - copy the totals line verbatim (`N problems (E errors, W warnings)`; if lint prints no problems, write `0 problems`); then the 5 files with the most problems: `npx eslint . -f json 2>$null | ConvertFrom-Json | Where-Object { $_.errorCount + $_.warningCount -gt 0 } | Sort-Object { $_.errorCount + $_.warningCount } -Descending | Select-Object -First 5 @{n='Problems';e={$_.errorCount + $_.warningCount}}, filePath`.
3. `npm run check:images 2>&1 | Select-Object -Last 10`.
   Keep it fast: write at most one small helper script, and put it in `$env:TEMP`, never in the repo.
4. Live site: `$x = [xml](Invoke-WebRequest -UseBasicParsing https://plumbinghands.com/sitemap.xml).Content; $urls = $x.urlset.url.loc`. Count them. Check up to 40 (home, every service hub, 10 city pages, 10 city-service pages, 10 newest guides/blog posts). For each: `$r = Invoke-WebRequest -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue <url>`; record status; from `$r.Content` read `<title>`, `<meta name="description">`, number of `<h1`, `<link rel="canonical">`.
   Flag: status not 200; missing or duplicate title; title over 60 chars; missing meta description or over 160 chars; H1 count not 1; canonical pointing to another URL; phone 1 844-397-8298 missing on the home page.
5. For every flagged page, find the source with `Select-String -Path src/data\*.ts,src/app\**\*.tsx -Pattern '<slug or title text>' -List | Select-Object -First 3 Path,LineNumber`.

## Report: `docs/dsh/reports/<YYYY-MM-DD>-SEO-AUDIT.md`
```
# SEO-AUDIT - <date>
Status: DONE | BLOCKED
Model: <model>
| Check | Result |
(build, lint totals, top lint files, images, sitemap URL count, pages checked, pages flagged)
## Top 10 fixes (most traffic-relevant first)
1. <URL> - <problem> - <exact fix> - <file:line if found>
## Notes
```
Allowed files: only the report.

## Finish
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH SEO-AUDIT: <one line> (DONE)"` (or `(BLOCKED)` with the reason in the report).
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
