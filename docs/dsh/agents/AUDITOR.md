# SEO Auditor - PlumbingHands (desktop DSH agent)
Runs: Mondays 15:00 PKT (DSH app automation task "SEO Auditor"). Report only: never edit site files.
Owner: Claude reads the report at its weekly review and turns the findings into tasks in docs/dsh/TASKS.md.

## Start (every run)
1. `$env:GIT_TERMINAL_PROMPT=0; git checkout master 2>&1 | Select-Object -Last 2; git pull --ff-only 2>&1 | Select-Object -Last 2`. If the pull fails: stop and write `BLOCKED: <last line>` in the chat.
2. `git checkout -b dsh/<YYYY-MM-DD>-SEO-AUDIT` (today's date).

## Checks
1. `npm run build 2>&1 | Select-Object -Last 15` - PASS/FAIL, first error.
2. `npm run lint 2>&1 | Select-Object -Last 15` - error/warning totals; then `npx eslint . -f unix 2>&1 | Select-String -Pattern ':[0-9]+:[0-9]+:' | ForEach-Object { ($_ -split ':')[0] } | Group-Object | Sort-Object Count -Descending | Select-Object -First 5 Count,Name`.
3. `npm run check:images 2>&1 | Select-Object -Last 10`.
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
4. `git checkout master 2>&1 | Select-Object -Last 1`.

## Hard rules (same as AGENTS.md)
- NEVER run `git reset --hard`, `git clean`, `git checkout -- .`, `git checkout -f`, `git stash`, `Remove-Item`/`del`, or "reset the environment". If git looks messy, stop and report BLOCKED.
- Pipe every npm/npx/git/eslint command through `2>&1 | Select-Object -Last 15` (free model quota).
- No API keys, passwords, ID or bank numbers anywhere. Never change the phone number (1 844-397-8298).
- Facts only. Never invent numbers, prices, reviews, quotes, licenses or sources.
