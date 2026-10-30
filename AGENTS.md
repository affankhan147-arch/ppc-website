# AGENTS.md - brief for DeepSeek Harness (DSH) and any coding agent

**Site:** www.plumbinghands.com. Dallas-Fort Worth emergency plumbing, pay-per-call. Every page exists to get a homeowner to call **1 844-397-8298**.
**Stack:** Next.js 16 (App Router, TypeScript, Tailwind 4). Vercel deploys `master` automatically.
**Supervisor:** Claude reviews every DSH branch each morning (about 08:45 PKT), merges what passes, and writes the next tasks.

## Start every session
1. `git checkout master` then `git pull`
2. Open `docs/dsh/TASKS.md`. Take the FIRST task with `Status: OPEN` (or `Status: FIX`, which means redo it using Claude's note). One task per session.
3. `git checkout -b dsh/<YYYY-MM-DD>-<task-id>` (for FIX, reuse the task's existing branch)
4. Do only what the task says, only in the files it lists.

## Finish every session
1. `npm run build` must end with no errors. If it fails, fix it (2 tries max). Still failing: report `Status: BLOCKED` with the error.
2. Write `docs/dsh/reports/<YYYY-MM-DD>-<task-id>.md` using the template below.
3. `git add` only the files you changed plus the report. Never `git add .` If `git status` lists files you did not touch (line-ending noise, e.g. `src/data/cities.ts`), leave them out.
4. `git commit -m "DSH <task-id>: <one line>"`
5. `git push -u origin <branch>`. **Never push to master.** Claude merges.
6. Do not edit `docs/dsh/TASKS.md` or `docs/dsh/AUDIT.md`. Claude owns them.

## Where things are
- Pages: `src/app/` (cities/[citySlug], cities/[citySlug]/[serviceSlug], services/[serviceSlug], problems/[problemSlug], blog/, cost-guides/, guides/, tools/)
- Data that drives pages: `src/data/` (cities.ts = 33 cities, 30 with `marketSlug: "dallas-fort-worth"`; Houston, Austin and San Antonio are other markets; services.ts = 10 services; citySearchAnswers.ts; faqs.ts; externalSources.ts; seoOverrides.ts)
- Shared page sections: `src/components/PageSections.tsx`
- Phone number: `src/data/site.ts`. Never change it.
- Checks: `npm run build`, `npm run typecheck`, `npm run lint`, `npm run check:images`, `node scripts/qa-check.mjs`

## Save quota (free model: every step is one request)
- Search before you read: `Select-String -Path src\data\cities.ts -Pattern "slug:"`. Never open `src/data/pageEnhancements.ts` (390 KB) whole; search it.
- Copy the shape of the nearest existing entry exactly: quotes, commas, field names, class names.
- No exploring, refactoring or dev server. If the task is unclear, report `BLOCKED: <question>` and stop.

## Hard rules
- Smallest correct change. No deleting or renaming files. No force-push.
- Don't edit package.json, package-lock.json, next.config.mjs, vercel.json, .env*, .gitattributes unless the task says so.
- Don't edit `src/data/blogPosts.ts` or `src/data/pageEnhancements.ts` unless the task says so (Claude's daily blog job edits them).
- No API keys, passwords, ID or bank numbers anywhere, ever.
- Windows: save files as UTF-8 **without BOM** (never PowerShell `-Encoding UTF8`); keep LF line endings.

## Content rules (every page, section, answer)
- One real search intent per page, tied to a real service and a city we cover. Put the long-tail keyword in the title, H1 or H2 and the first paragraph.
- Plain, human writing. Local facts only when the task gives a source (city utility, TSBPE, NWS, Census). Never invent.
- No fake reviews, testimonials, prices, licenses, addresses, guarantees, "years of experience" or statistics.
- No pages that are copies with only the city name swapped.
- New page: clean lowercase-hyphen URL, a relevant existing image from `public/` with real alt text, 2 internal links in and 2 out.

## Report template (`docs/dsh/reports/<date>-<task-id>.md`)
```
# <task-id> - <date>
Status: DONE | BLOCKED
Model: <model used>
Files changed: <list>
What I did: <2-4 lines>
Checks: build PASS/FAIL, other checks the task asked for
Left / problems: <anything unfinished or unsure>
```
