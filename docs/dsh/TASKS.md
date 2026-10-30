# DSH task queue - plumbinghands.com

Claude writes this file. DSH: read only. Take the first task with `Status: OPEN` (or `FIX`).
Task format (the cloud agent parses it): heading `## <ID> - <title> - Status: <STATUS>`; one `File:` or `Files:` line listing, in backticks, every file the task may change, or `Files: only your report.` for check-only tasks.
Status: OPEN, IN REVIEW (branch pushed, Claude reviews next morning), DONE, FIX (redo using Claude's note), WAITING (Claude must add data first), REJECTED.

Baseline 2026-10-30 (Claude): build PASS, typecheck PASS, check:images PASS, qa-check PASS, lint 198 errors (191 are `react/no-unescaped-entities`, harmless).

---

## PH-001 - Health check (calibration run) - Status: DONE (2026-10-31, dsh/2026-10-30-PH-001)
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

## PH-002 - Freeze-season links on DFW city hubs - Status: DONE (2026-10-31, dsh/2026-10-30-PH-002 merged 451d7cf)
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

## PH-003 - Small lint fixes (internal links and unused variables) - Status: DONE (2026-10-31, dsh/2026-10-30-PH-003 merged 451d7cf)
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

---

## PH-005 - Freeze check block on DFW burst-pipe city pages - Status: OPEN
Files: `src/app/cities/[citySlug]/[serviceSlug]/page.tsx`
Where: directly above the line that starts `<OfficialSources` (about line 155), inside the returned JSX. `city` and `service` are already defined in the component.
Insert exactly this JSX (keep the indentation style of the file):
```tsx
{service.slug === "burst-pipe-emergency" && city.marketSlug === "dallas-fort-worth" ? (
  <section className="content-section">
    <p className="section-kicker">Freeze season</p>
    <h2 className="mt-2 text-2xl font-black text-white">After a hard freeze in {city.name}: what to check</h2>
    <p className="mt-3 leading-7 text-slate-300">Across Dallas-Fort Worth the average first freeze comes around November 22 and the last around March 12 (National Weather Service). After a freeze, check pipes in exterior walls, attics, garages and crawl spaces for wet spots, bulging drywall or low water pressure. A pipe can crack while frozen and only start leaking once it thaws.</p>
    <ul className="mt-4 space-y-2">
      <li><Link className="font-bold text-emerald-300 underline" href="/blog/frozen-pipes-dallas-fort-worth-prevention-before-the-next-freeze">How to keep pipes from freezing in DFW</Link></li>
      <li><Link className="font-bold text-emerald-300 underline" href="/guides/dfw-freeze-history">How often DFW freezes (NWS data)</Link></li>
      <li><Link className="font-bold text-emerald-300 underline" href="/tools/freeze-watch-widget">Live DFW freeze watch</Link></li>
      <li><Link className="font-bold text-emerald-300 underline" href="/cost-guides/burst-pipe-emergency-cost-guide">Burst pipe repair cost guide</Link></li>
    </ul>
  </section>
) : null}
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/cities/plano/burst-pipe-emergency.html` contains `After a hard freeze in Plano`.

---

## PH-006 - Burst pipe help by city on the burst pipe service page - Status: OPEN
Files: `src/app/services/[serviceSlug]/page.tsx`
Where: directly above the line that starts `<OfficialSources` (about line 165). `service` is already defined.
Add `import Link from "next/link";` as the first line of the file (it is not imported yet).
Insert exactly this JSX (keep the indentation style of the file):
```tsx
{service.slug === "burst-pipe-emergency" ? (
  <section className="content-section">
    <p className="section-kicker">Local help</p>
    <h2 className="mt-2 text-2xl font-black text-white">Burst pipe help by city in Dallas-Fort Worth</h2>
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
       {[["dallas", "Dallas"], ["fort-worth", "Fort Worth"], ["arlington", "Arlington"], ["plano", "Plano"], ["irving", "Irving"], ["garland", "Garland"], ["frisco", "Frisco"], ["mckinney", "McKinney"]].map(([slug, name]) => (
         <li key={slug}><Link className="font-bold text-emerald-300 underline" href={`/cities/${slug}/burst-pipe-emergency`}>Burst pipe help in {name}</Link></li>
       ))}
    </ul>
  </section>
) : null}
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/services/burst-pipe-emergency.html` contains `Burst pipe help in McKinney`.

---

## PH-007 - Freeze season section on the homepage - Status: OPEN
Files: `src/app/page.tsx`
Where: directly above the `<section className="content-section">` whose H2 is `Find an Emergency Plumber in Dallas-Fort Worth Near You.` (about line 191). `Link` is already imported.
Insert exactly this JSX (keep the indentation style of the file):
```tsx
<section className="content-section">
  <p className="section-kicker">Freeze season</p>
  <h2 className="mt-2 text-2xl font-black text-white">Freeze season in Dallas-Fort Worth: protect your pipes</h2>
  <p className="mt-3 leading-7 text-slate-300">Across Dallas-Fort Worth the average first freeze comes around November 22 and the last around March 12 (National Weather Service). Pipes in exterior walls, attics, garages and crawl spaces freeze first. If one splits, shut off the main water valve before anything else, then call.</p>
  <ul className="mt-4 space-y-2">
    <li><Link className="font-bold text-emerald-300 underline" href="/services/burst-pipe-emergency">Burst pipe emergency help</Link></li>
    <li><Link className="font-bold text-emerald-300 underline" href="/blog/frozen-pipes-dallas-fort-worth-prevention-before-the-next-freeze">How to keep pipes from freezing in DFW</Link></li>
    <li><Link className="font-bold text-emerald-300 underline" href="/guides/dfw-freeze-history">How often DFW freezes (NWS data)</Link></li>
    <li><Link className="font-bold text-emerald-300 underline" href="/tools/freeze-watch-widget">Live DFW freeze watch</Link></li>
  </ul>
</section>
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/index.html` contains `Freeze season in Dallas-Fort Worth: protect your pipes`.

---

## PH-008 - City burst-pipe links on the DFW freeze history guide - Status: OPEN
Files: `src/app/guides/dfw-freeze-history/page.tsx`
Where: directly after the closing `</section>` of the section whose H2 is `Section 4: Track This Winter's Freeze Risk Live`.
Add `import Link from "next/link";` as the first line of the file (it is not imported yet).
Insert exactly this JSX (keep the indentation style of the file):
```tsx
<section className="mb-10">
  <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Burst pipe help in your city</h2>
  <p className="leading-7 mb-3">If a freeze has already cracked a pipe, shut off the main water valve first, then open the page for your city:</p>
  <ul className="grid gap-2 sm:grid-cols-2">
     {[["dallas", "Dallas"], ["fort-worth", "Fort Worth"], ["arlington", "Arlington"], ["plano", "Plano"], ["irving", "Irving"], ["garland", "Garland"], ["frisco", "Frisco"], ["mckinney", "McKinney"]].map(([slug, name]) => (
         <li key={slug}><Link className="text-[#F0B429] underline" href={`/cities/${slug}/burst-pipe-emergency`}>Burst pipe help in {name}</Link></li>
       ))}
  </ul>
</section>
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/guides/dfw-freeze-history.html` contains `Burst pipe help in your city`.

---

## PH-009 - City burst-pipe links on the DFW burst pipes guide - Status: OPEN
Files: `src/app/guides/dfw-burst-pipes/page.tsx`
Where: directly after the closing `</section>` of the section whose H2 is `Section 4: What To Do in the First 10 Minutes`.
Insert exactly this JSX (keep the indentation style of the file):
```tsx
<section className="mb-10">
  <h2 className="text-xl font-semibold text-[#F0B429] mb-3">Burst pipe help by city in Dallas-Fort Worth</h2>
  <p className="leading-7 mb-3">Once the main valve is off, use the page for your city to reach a provider:</p>
  <ul className="grid gap-2 sm:grid-cols-2">
     {[["dallas", "Dallas"], ["fort-worth", "Fort Worth"], ["arlington", "Arlington"], ["plano", "Plano"], ["irving", "Irving"], ["garland", "Garland"], ["frisco", "Frisco"], ["mckinney", "McKinney"]].map(([slug, name]) => (
         <li key={slug}><Link className="text-[#F0B429] underline" href={`/cities/${slug}/burst-pipe-emergency`}>Burst pipe help in {name}</Link></li>
       ))}
  </ul>
</section>
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/guides/dfw-burst-pipes.html` contains `Burst pipe help by city in Dallas-Fort Worth`.

---

## PH-010 - City burst-pipe links on the freeze watch widget page - Status: OPEN
Files: `src/app/tools/freeze-watch-widget/page.tsx`
Where: directly after the closing `</section>` of the section whose H2 is `What to do when the widget shows a freeze warning`.
Add `import Link from "next/link";` as the first line of the file (it is not imported yet).
Insert exactly this JSX (keep the indentation style of the file):
```tsx
<section className="mb-10">
  <h2 className="text-xl font-semibold text-[#F0B429] mb-3">If a pipe has already burst</h2>
  <p className="leading-7 mb-3">Shut off the main water valve first, then open the page for your city:</p>
  <ul className="grid gap-2 sm:grid-cols-2">
     {[["dallas", "Dallas"], ["fort-worth", "Fort Worth"], ["arlington", "Arlington"], ["plano", "Plano"], ["irving", "Irving"], ["garland", "Garland"], ["frisco", "Frisco"], ["mckinney", "McKinney"]].map(([slug, name]) => (
         <li key={slug}><Link className="text-[#F0B429] underline" href={`/cities/${slug}/burst-pipe-emergency`}>Burst pipe help in {name}</Link></li>
       ))}
  </ul>
</section>
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/tools/freeze-watch-widget.html` contains `If a pipe has already burst`.

---

## PH-011 - Freeze resources on freeze and burst-pipe blog posts - Status: OPEN
Files: `src/app/blog/[postSlug]/page.tsx`
Where: directly above the line that starts `<OfficialSources` (about line 122). `post` is already defined.
Add `import Link from "next/link";` as the first line of the file (it is not imported yet).
Insert exactly this JSX (keep the indentation style of the file):
```tsx
{post.slug.includes("freez") || post.slug.includes("burst") ? (
  <section className="content-section">
    <p className="section-kicker">Freeze season</p>
    <h2 className="mt-2 text-2xl font-black text-white">More freeze and burst pipe help for Dallas-Fort Worth</h2>
    <ul className="mt-4 space-y-2">
      <li><Link className="font-bold text-emerald-300 underline" href="/services/burst-pipe-emergency">Burst pipe emergency help</Link></li>
      <li><Link className="font-bold text-emerald-300 underline" href="/guides/dfw-burst-pipes">Burst pipes in DFW: causes, costs and first steps</Link></li>
      <li><Link className="font-bold text-emerald-300 underline" href="/guides/dfw-freeze-history">How often DFW freezes (NWS data)</Link></li>
      <li><Link className="font-bold text-emerald-300 underline" href="/tools/freeze-watch-widget">Live DFW freeze watch</Link></li>
    </ul>
  </section>
) : null}
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/blog/frozen-pipes-dallas-fort-worth-prevention-before-the-next-freeze.html` contains `More freeze and burst pipe help`.

---

## PH-012 - Burst pipe help by city on the burst pipe cost guide - Status: OPEN
Files: `src/app/cost-guides/[guideSlug]/page.tsx`
Where: directly above the line that starts `<OfficialSources` (about line 136). `guide` is already defined.
Add `import Link from "next/link";` as the first line of the file (it is not imported yet).
Insert exactly this JSX (keep the indentation style of the file):
```tsx
{guide.slug === "burst-pipe-emergency-cost-guide" ? (
  <section className="content-section">
    <p className="section-kicker">Local help</p>
    <h2 className="mt-2 text-2xl font-black text-white">Burst pipe help by city in Dallas-Fort Worth</h2>
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
       {[["dallas", "Dallas"], ["fort-worth", "Fort Worth"], ["arlington", "Arlington"], ["plano", "Plano"], ["irving", "Irving"], ["garland", "Garland"], ["frisco", "Frisco"], ["mckinney", "McKinney"]].map(([slug, name]) => (
         <li key={slug}><Link className="font-bold text-emerald-300 underline" href={`/cities/${slug}/burst-pipe-emergency`}>Burst pipe help in {name}</Link></li>
       ))}
    </ul>
  </section>
) : null}
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/cost-guides/burst-pipe-emergency-cost-guide.html` contains `Burst pipe help in Frisco`.
