# Indexer - PlumbingHands (DSH app agent) - TRIAL RUN 1
Runs: once, when Sunny starts it in the DeepSeek Harness app (new session), folder `C:\Users\dell\Documents\plumbinghands-live-master`.
Command path: Claude (DSH project) writes this job file -> this agent does the work in the DSH app -> it files a report card in docs/dsh/reports/ on a dsh/* branch -> Claude grades it.
Purpose of this trial: Claude checks how accurate and how efficient the Indexer is before giving it real indexing work (and later the AD-Agency project). Claude already has the correct answers, so guessing is easy to spot.
Report only: never edit site files. Never submit anything to IndexNow, Google or Bing in this trial.

## Start
1. `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 sync` - it must print `SYNCED master`; otherwise write what it printed as BLOCKED and stop.
2. `git checkout -b dsh/<YYYY-MM-DD>-INDEX-TRIAL` (today's date).
3. Note the start time: `Get-Date -Format "yyyy-MM-dd HH:mm"`.

## Work (answer every question; if a command did not show the answer, write UNKNOWN - never guess)
Status helper for live checks (Windows PowerShell throws on 404 and on redirects, this catches both):
```powershell
function Get-Status($u) { try { $r = Invoke-WebRequest $u -UseBasicParsing -MaximumRedirection 0 -TimeoutSec 30; "$($r.StatusCode)" } catch { $s = $_.Exception.Response.StatusCode.value__; $l = $_.Exception.Response.Headers["Location"]; "$s $l" } }
```

Part 1 - Live sitemap
1. Download `https://plumbinghands.com/sitemap.xml` (`Invoke-WebRequest -UseBasicParsing`). Report: total number of `<loc>` entries; every host name used in them; how many entries have a `<lastmod>`.
2. Count the URLs by first path segment (`cities`, `blog`, `tools`, `problems`, `services`, `guides`, `cost-guides`, and `other` for everything else). Give a table; the counts must add up to the total.

Part 2 - Coverage: pages that exist but are not in the sitemap
3. List every folder directly under `src\app\guides` (each one is a guide page at `/guides/<folder>`). Which of these URLs are NOT in the live sitemap?
4. For each missing URL: name the file that decides which pages go into the sitemap, and write the exact line you would add to it (copy the shape of the nearest existing line). Do not edit the file.

Part 3 - Live page checks. For each URL report: status (use `Get-Status`), the canonical URL from `<link rel="canonical" href="...">`, the robots meta content (or `none`), and whether it is in the sitemap (yes/no):
- `https://plumbinghands.com/blog/how-to-check-your-water-meter-for-a-hidden-leak-dallas`
- `https://plumbinghands.com/guides/dfw-freeze-history`
- `https://plumbinghands.com/cities/plano/burst-pipe-emergency`
- `https://plumbinghands.com/blog/indexer-trial-page-that-does-not-exist`
5. Also report `Get-Status` for `https://www.plumbinghands.com/` and `https://plumbinghands.com/` (does one host redirect to the other?).

Part 4 - Code map. For the first 3 URLs in Part 3: which source file renders the page, and which data file(s) hold its words? Search, do not read whole files (`Select-String`).

Part 5 - IndexNow dry run (NO submit)
6. `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\60_submit_indexnow_from_sitemap.ps1 -DryRun 2>&1 | Select-Object -Last 15`. Copy the key-file check result and the `URLs found for IndexNow` line exactly. Never use `-Submit`. The script writes `reports\indexnow_submission_report.md`: do not commit it.

Part 6 - Efficiency
7. End time (`Get-Date -Format "yyyy-MM-dd HH:mm"`), model used, number of shell commands you ran, and any command that failed (one line each).

## Report: `docs/dsh/reports/<YYYY-MM-DD>-INDEX-TRIAL.md`
```
# INDEX-TRIAL - <date>
Status: DONE | BLOCKED
Model: <model>
Start: <time> | End: <time> | Commands run: N | Failed commands: N
## 1 Sitemap
Total: N | Hosts: ... | With lastmod: N
| Segment | URLs |
## 2 Coverage
Guide folders: N | Missing from sitemap: <list or none>
Sitemap source file: <path> | Line to add: <line>
## 3 Page checks
| URL | Status | Canonical | Robots | In sitemap |
www vs apex: <what Get-Status printed for each>
## 4 Code map
| URL | Page file | Data file(s) |
## 5 IndexNow dry run
<copied lines>
## 6 Problems
<anything unclear or unfinished>
```
Allowed files: only the report.

## Finish: the report card
1. `git add` ONLY the report (never `git add .`).
2. `git commit -m "DSH INDEX-TRIAL: <one line> (DONE)"` (or `(BLOCKED)`, with the reason in the report).
3. `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 push`. Report exactly what it printed (`PUSHED <branch>` or `BLOCKED: push failed ...`). Never claim a push you did not see confirmed. Never push master.
4. `git checkout master 2>&1 | Select-Object -Last 1`. End with one line: the branch you pushed, or BLOCKED and why.

## Hard rules
- NEVER run `git reset --hard`, `git clean`, `git checkout -- .`, `git checkout -f`, `git stash`, `Remove-Item`/`del`, or "reset the environment". If git looks messy, stop and report BLOCKED.
- Stay in scope: do only what this file says, only in this repo folder. Never change git config, remotes or credentials, never install anything, never touch files outside the repo (temporary files go in `$env:TEMP`).
- Pipe every npm/npx/git command through `2>&1 | Select-Object -Last 15` (free model quota). Use a NEW session per run; never "try again" inside a failed one.
- Report what commands printed, not what you expect. Never write "clean", "N/A" or "verified" unless a command output shows it.
- No API keys, passwords, ID or bank numbers anywhere (do not copy the IndexNow key into the report). Never change the phone number (1 844-397-8298).
