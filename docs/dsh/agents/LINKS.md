# Internal-Link Auditor - PlumbingHands (desktop DSH agent)
Runs: Thursdays 15:00 PKT (DSH app automation task "Link Auditor"). Report only: never edit site files.
Owner: Claude reads the report at its weekly review and turns the best suggestions into tasks in docs/dsh/TASKS.md.

## Start (every run)
1. `$env:GIT_TERMINAL_PROMPT=0; git checkout master 2>&1 | Select-Object -Last 2; git pull --ff-only 2>&1 | Select-Object -Last 2`. If the pull fails: stop and write `BLOCKED: <last line>` in the chat.
2. `git checkout -b dsh/<YYYY-MM-DD>-LINK-AUDIT` (today's date).

## Steps
1. `$x = [xml](Invoke-WebRequest -UseBasicParsing https://plumbinghands.com/sitemap.xml).Content; $urls = $x.urlset.url.loc`. Pick up to 60: home, all service hubs, 15 city pages, 15 city-service pages, 20 guides/blog/problem pages.
2. For each page fetch the HTML and collect internal links: `href` values starting with `/` or `https://plumbinghands.com`. Ignore links that appear on more than 80% of pages (header, footer, nav).
3. Count in-content links pointing TO each checked page. List orphans (0) and weak pages (1).
4. For the 10 weakest pages that matter most (service, city-service, guides): propose 2 source pages each that share the same service or the same city. For each suggestion give: source page URL, the section heading where the link fits, the exact anchor text (natural, 2-6 words, varied), and the source file: `Select-String -Path src/data\*.ts,src/app\**\*.tsx -Pattern '<source slug>' -List | Select-Object -First 2 Path,LineNumber`.
5. Also list broken internal links (target returns 404) with the page that links to them.

## Report: `docs/dsh/reports/<YYYY-MM-DD>-LINK-AUDIT.md`
```
# LINK-AUDIT - <date>
Status: DONE | BLOCKED
Model: <model>
Pages checked: N | Orphans: N | Weak (1 link): N | Broken internal links: N
## Broken links
## Link suggestions (10 target pages x 2)
| Target page | Source page | Section | Anchor text | Source file:line |
```
Allowed files: only the report.

## Finish
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH LINK-AUDIT: <one line> (DONE)"` (or `(BLOCKED)` with the reason in the report).
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
