# Article Writer - PlumbingHands (desktop DSH agent)
Runs: daily 16:00 PKT (DSH app automation task "Article Writer"). One article per site per run.
Owner: Claude researches each article and writes the brief into docs/dsh/TASKS.md with `Status: WRITER`. The cloud agent ignores WRITER tasks; only you take them.

## Which task
Open docs/dsh/TASKS.md. Take the FIRST task whose heading ends `Status: WRITER` (or `Status: WRITER-FIX`, which means redo it on its existing branch using Claude's note). None: write `No WRITER task` in the chat and stop. Do not edit TASKS.md.

## Start
1. `$env:GIT_TERMINAL_PROMPT=0; git checkout master 2>&1 | Select-Object -Last 2; git pull --ff-only 2>&1 | Select-Object -Last 2`. If the pull fails: stop and write `BLOCKED: <last line>`.
2. If `git ls-remote --heads origin "dsh/*-<task-id>"` shows a branch and the status is WRITER (not WRITER-FIX): it is waiting for Claude's review. Take the next WRITER task instead.
3. `git checkout -b dsh/<YYYY-MM-DD>-<task-id>` (WRITER-FIX: `git checkout <existing branch>`).

## Write
- Follow the brief exactly: slug, title, H1, meta, outline, facts with their sources, image, links, the nearest entry to copy, and ONLY the files it lists.
- Copy the nearest existing entry's shape exactly: field names, order, quotes, commas.
- Plain, human copy: short paragraphs, "you" voice, concrete steps a homeowner can take today. No filler ("in today's world", "it's important to note"), no hype, no emojis.
- Long-tail keyword from the brief in the title, the H1, the first paragraph and one H2.
- Local facts ONLY from the brief's sources. If the brief has no fact for a sentence, write general advice instead. Never invent numbers, prices, dates, quotes or statistics.
- Add the internal links the brief lists. Keep the phone number unchanged.

## Check before committing
1. `npm run build 2>&1 | Select-Object -Last 5` ends without errors (2 fix tries max; still failing = BLOCKED).
2. The brief's "Done when" check passes.
3. `Select-String` your new text for `TODO|lorem|\[insert|as an AI` - must find nothing.

## Report: `docs/dsh/reports/<YYYY-MM-DD>-<task-id>.md` (template in AGENTS.md) plus one line: `Words: <approx count>, keyword in title/H1/first paragraph/H2: yes/no`.

## Finish
1. `git add` ONLY the files this job allows (never `git add .`).
2. `git commit -m "DSH <task-id>: <one line> (DONE)"` (or `(BLOCKED)` with the reason in the report).
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
