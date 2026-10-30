# DSH task queue - plumbinghands.com

Claude writes this file. DSH: read only. Take the first task with `Status: OPEN` (or `FIX`).
Task format (the cloud agent parses it): heading `## <ID> - <title> - Status: <STATUS>`; one `File:` or `Files:` line listing, in backticks, every file the task may change, or `Files: only your report.` for check-only tasks.
Status: OPEN, IN REVIEW (branch pushed, Claude reviews next morning), DONE, FIX (redo using Claude's note), WAITING (Claude must add data first), REJECTED.

Baseline 2026-10-30 (Claude): build PASS, typecheck PASS, check:images PASS, qa-check PASS, lint 198 errors (191 are `react/no-unescaped-entities`, harmless).

---

## PH-001 - Health check (calibration run) - Status: OPEN
Goal: prove the DSH workflow end to end. No code changes.
Files: only your report.
Steps:
Run these 6 commands exactly as written (the `Select-Object` part keeps the output short; the lint output alone is 33 KB without it):
1. `npm ci --no-audit --no-fund 2>&1 | Select-Object -Last 3`
2. `npm run typecheck 2>&1 | Select-Object -Last 3`
3. `npm run lint 2>&1 | Select-Object -Last 3` (expected: about 201 problems, mostly harmless)
4. `npm run check:images 2>&1 | Select-Object -Last 2`
5. `npm run build 2>&1 | Select-Object -Last 5`
6. `node scripts/qa-check.mjs 2>&1 | Select-Object -Last 3`
Then write the report: each command with PASS/FAIL and the last line it printed. Do not open or search any other file. This task should take about 12 steps.
Done when: branch `dsh/<date>-PH-001` is pushed with the report. Results should match the baseline above.

---

## PH-002 - Freeze-season links on DFW city hubs - Status: OPEN
Why: freeze season starts in late November. The 30 DFW city hubs (`/cities/<city>`) rank for "plumber <city>" searches but never link to our freeze and burst-pipe pages.
File: `src/app/cities/[citySlug]/page.tsx` (only this file)
Steps:
1. Find the block that starts `{searchAnswers ? (` and ends `) : null}` (about lines 143-163). Add the new section directly after it, before `<InfoListSection`.
2. Show it only when `city.marketSlug === "dallas-fort-worth"`. Pattern: `{city.marketSlug === "dallas-fort-worth" ? ( <section ...> ... </section> ) : null}`
3. Use exactly this content and the same class names the searchAnswers section uses:
   - `<section className="content-section">`
   - `<p className="section-kicker">Freeze season</p>`
   - `<h2 className="mt-2 text-2xl font-black text-white">Freeze season in {city.name}: protect your pipes</h2>`
   - `<p className="mt-3 leading-7 text-slate-300">` with this text: `Across Dallas-Fort Worth the average first freeze comes around November 22 and the last around March 12 (National Weather Service). Pipes in exterior walls, attics, garages and crawl spaces freeze first. If one splits, shut off the main water valve before anything else, then call.`
   - `<ul className="mt-4 space-y-2">` with 4 `<li>` items. Each holds `<Link className="font-bold text-emerald-300 underline" href="...">label</Link>`:
     1. ``href={`/cities/${city.slug}/burst-pipe-emergency`}`` - label `Burst pipe help in {city.name}`
     2. href `/guides/dfw-burst-pipes` - label `Burst pipes in DFW: causes, costs and first steps`
     3. href `/guides/dfw-freeze-history` - label `How often DFW freezes (NWS data)`
     4. href `/tools/freeze-watch-widget` - label `Live DFW freeze watch`
4. `Link` is already imported. No new imports, no new files.
Done when: `npm run build` passes, `.next/server/app/cities/plano.html` contains `Freeze season in Plano`, and `.next/server/app/cities/houston.html` does NOT contain `Freeze season`. Put both check results in the report.

---

## PH-003 - Small lint fixes (internal links and unused variables) - Status: OPEN
Why: 6 internal links use a plain `<a href="/...">` instead of Next.js `<Link>`, and 3 imports/variables are unused.
Files: `src/app/guides/dfw-burst-pipes/page.tsx`, `src/app/guides/dfw-housing-age-by-city/page.tsx`, `src/app/guides/dfw-water-heater-lifespan/page.tsx`, `src/app/tools/problem-checklists/page.tsx`, `src/app/tools/water-hardness-widget/page.tsx`, `src/app/blog/how-to-verify-a-texas-plumbers-license/page.tsx`, `scripts/gen-city-service-images.mjs`
Steps:
1. In the 5 files under `src/app/guides/` and `src/app/tools/`: change every internal link written as `<a href="/..." className="...">text</a>` to `<Link href="/..." className="...">text</Link>`, keeping href, className and text exactly. Lines: dfw-burst-pipes 109 (two links), dfw-housing-age-by-city 152, dfw-water-heater-lifespan 123, problem-checklists 69, water-hardness-widget 119. None of these files imports Link yet: add `import Link from "next/link";` as the first import line of each.
2. `src/app/blog/how-to-verify-a-texas-plumbers-license/page.tsx` line 11: remove `CheckCircle, ` from the lucide-react import (keep the others).
3. `scripts/gen-city-service-images.mjs`: delete line 2 `import path from "path";` and change `const header = csv.shift();` to `csv.shift();` (the call must stay: it drops the CSV header row).
4. Do not touch `src/components/CookieConsent.tsx` (Claude will handle it).
Done when: `npx eslint src scripts worker --rule "react/no-unescaped-entities: off"` shows only 1 problem (CookieConsent) and `npm run build` passes.

---

## PH-004 - "Common searches" answers for 6 more city hubs - Status: WAITING
Claude must first pull the exact Search Console queries for /cities/dallas, /cities/arlington, /cities/irving, /cities/garland, /cities/frisco and /cities/lewisville. The task will then say: add one entry per city to `src/data/citySearchAnswers.ts`, copying the shape of the `richardson` entry (4 question/answer items, each linking to an existing page).
