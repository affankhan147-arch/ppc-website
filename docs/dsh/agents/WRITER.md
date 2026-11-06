# Article Writer - PlumbingHands (DSH app agent)
Runs: daily 16:00 PKT, one article per run as a DeepSeek Harness automation task on Sunny's laptop, folder `C:\Users\dell\Documents\plumbinghands-live-master`.
Command path: Claude (DSH project) writes this job file and the tasks in docs/dsh/TASKS.md -> this agent does the work in the DSH app -> it files a report card in docs/dsh/reports/ on a dsh/* branch -> Claude's weekly review checks it, merges what passes and assigns the next work.
Claude researches each article and writes the brief into docs/dsh/TASKS.md with `Status: WRITER`. Only this agent takes WRITER tasks; the cloud agent skips them.

## Which task
Open docs/dsh/TASKS.md. Take the FIRST task whose heading ends `Status: WRITER` (or `Status: WRITER-FIX`: redo it on its existing branch using Claude's note). If `git ls-remote --heads origin "dsh/*-<task-id>"` already shows a branch for a WRITER (not WRITER-FIX) task, it is waiting for Claude: take the next one. None left: say `No WRITER task` and stop. Never edit TASKS.md.

## Start
1. `$env:GIT_TERMINAL_PROMPT=0; git checkout master 2>&1 | Select-Object -Last 2; git pull --ff-only 2>&1 | Select-Object -Last 2`. If either fails: write `BLOCKED: <last line>` and stop.
2. `git checkout -b dsh/<YYYY-MM-DD>-<task-id>` (WRITER-FIX: `git checkout <existing branch>`).

## Write
- Follow the brief exactly: slug, title, H1, meta, outline, facts with their sources, image, links, the nearest entry to copy, and ONLY the files it lists.
- Copy the nearest existing entry's shape exactly: field names, order, quotes, commas.
- Plain, human copy: short paragraphs, "you" voice, concrete steps a homeowner can take today. No filler ("in today's world", "it's important to note"), no hype, no emojis.
- Long-tail keyword from the brief in the title, the H1, the first paragraph and one H2.
- Local facts ONLY from the brief's sources. If the brief has no fact for a sentence, write general advice instead. Never invent numbers, prices, dates, quotes or statistics.
- Add the internal links the brief lists. Keep the phone number unchanged.

## Check before committing
1. `npm run build 2>&1 | Select-Object -Last 5` must end without errors (2 fix tries max; still failing = BLOCKED with the error).
2. The brief's "Done when" check passes.
3. `Select-String` your new text for `TODO|lorem|\[insert|as an AI`: must find nothing.

## Report card: `docs/dsh/reports/<YYYY-MM-DD>-<task-id>.md`
```
# <task-id> - <date>
Status: DONE | BLOCKED
Model: <model>
Files changed: <list>
What I did: <2-4 lines>
Checks: build PASS/FAIL (paste its last line), Done-when PASS/FAIL
Words: <approx> | keyword in title/H1/first paragraph/H2: yes/no
Left / problems: <anything unsure>
```
Allowed files: the brief's files and the report.

## Finish: the report card
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH <task-id>: <one line> (DONE)"` (or `(BLOCKED)`, with the reason in the report).
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
