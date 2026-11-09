# DSH task queue - plumbinghands.com

Claude writes this file. DSH: read only. Take the first task with `Status: OPEN` (or `FIX`).
Task format (the cloud agent parses it): heading `## <ID> - <title> - Status: <STATUS>`; one `File:` or `Files:` line listing, in backticks, every file the task may change, or `Files: only your report.` for check-only tasks.
Status: OPEN, IN REVIEW (branch pushed, Claude reviews next morning), DONE, FIX (redo using Claude's note), WAITING (Claude must add data first), REJECTED.
WRITER and WRITER-FIX tasks are articles for the DSH app's Article Writer (docs/dsh/agents/WRITER.md); the cloud agent skips them.

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

## PH-005 - Freeze check block on DFW burst-pipe city pages - Status: DONE (2026-11-05, merged 769a946)
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

## PH-006 - Burst pipe help by city on the burst pipe service page - Status: DONE (2026-11-05, merged 332049d)
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

## PH-007 - Freeze season section on the homepage - Status: DONE (2026-11-05, merged 19284b2)
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

## PH-008 - City burst-pipe links on the DFW freeze history guide - Status: DONE (2026-11-05, merged b33b9e0)
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

## PH-009 - City burst-pipe links on the DFW burst pipes guide - Status: DONE (2026-11-05, merged 288da17)
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

## PH-010 - City burst-pipe links on the freeze watch widget page - Status: DONE (2026-11-05, merged 341f3e8)
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

## PH-011 - Freeze resources on freeze and burst-pipe blog posts - Status: DONE (2026-11-05, merged a60aa0d)
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

## PH-012 - Burst pipe help by city on the burst pipe cost guide - Status: DONE (2026-11-05, merged a539f8d)
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

---

## PH-023 - CTR: city page titles lead with "24 Hour Emergency Plumber" - Status: OPEN
Files: `src/app/cities/[citySlug]/page.tsx`
Goal: the city hub pages rank around position 9-14 for "24 hour plumber" and "emergency plumber" but get almost no clicks (Search Console, 28 days to 2026-11-07: over 11,000 impressions, 4 clicks). Put the top search words at the front of the title and description. Baseline: docs/dsh/CTR.md.
1. Replace this line (about line 53):
```tsx
    title: `Emergency Plumber in ${city.name}, TX | 24/7 Emergency Plumbing`,
```
with exactly:
```tsx
    title: `24 Hour Emergency Plumber in ${city.name}, TX`,
```
2. In `function buildCityDescription` (about line 30), add this line as the FIRST item of the `candidates` array, directly below `  const candidates = [`:
```tsx
    `24 hour plumber in ${city.name}, TX: call ${siteConfig.phoneDisplay} day or night for burst pipes, sewer backups and water heater leaks. Ask the price first.`,
```
Change nothing else.
Done when: `npm run build` passes and both lines are in the file exactly as written above.

## PH-013 - New blog post: water leak between the meter and the house in Dallas - Status: OPEN
Files: `src/data/blogPosts.ts`, `src/data/pageEnhancements.ts`, `src/data/seoOverrides.ts`, `src/data/contentDates.ts`
Goal: one new blog post at `/blog/water-leak-between-meter-and-house-dallas-who-fixes-it`. Search intent: "water leak between meter and house dallas who pays". The page renders automatically from these 4 data files; the hero image is picked automatically from `relatedServiceSlug` (no image edit).
1. `src/data/blogPosts.ts`: at the very end of the file, add a new post copying the shape of `waterMeterLeakDetectionPost` exactly (search `export const waterMeterLeakDetectionPost`), then `blogPosts.push(waterLeakMeterToHouseDallasPost);`. Use exactly:
   - const name `waterLeakMeterToHouseDallasPost`
   - slug `water-leak-between-meter-and-house-dallas-who-fixes-it`
   - title `Water Leak Between the Meter and Your House in Dallas: Who Fixes It?`
   - directAnswer `In Dallas, the property owner is responsible for the private side of the water service line, from the water meter to the house, so a leak there is yours to have repaired by a licensed plumber. A leak at the meter or on the street side is reported to Dallas Water Utilities by calling 311, which takes water emergencies 24 hours a day.`
   - category `Emergency steps`, relatedServiceSlug `24-hour-emergency-plumber`
2. `src/data/pageEnhancements.ts` (search, do not read whole): add a new entry keyed `"water-leak-between-meter-and-house-dallas-who-fixes-it"` directly after the entry `"how-to-check-your-water-meter-for-a-hidden-leak-dallas"` ends, copying its fields exactly (checklistTitle, checklistIntro, checklistItems, proofTitle, proofItems, extraFaqs, extraLinks). Write plain, human copy from this outline (no prices, no guarantees, no invented facts):
   - checklistTitle `How to tell which side of the meter is leaking`. Intro + 5-6 items: wet or soggy ground, or extra-green grass, between the meter box and the house points to the private line; water pooling inside the meter box itself is a meter leak to report to 311; turn off every fixture and watch the meter's leak indicator (say our meter-check post explains how); if your home has a customer shutoff valve, closing it stops water to the house while you wait; do not dig around the meter box or touch city equipment.
   - proofTitle `After the repair: asking Dallas Water Utilities for a leak adjustment`. 4-5 items using ONLY these facts from the DWU Leak Adjustment Request form (https://www.dallascityhall.com/departments/waterutilities/PublishingImages/pages/Request-a-Leak-Adjustment/DWU-FRM-004-RB_LeakAdjustmentRequest_English.pdf): repairs must be complete before you apply; submit within 90 days of the repair date with the repair receipt or paid-in-full invoice; if approved, the adjustment covers at most 3 months and only one adjustment per 12 months; review can take up to 45 days; filing does not guarantee an adjustment, and repair costs and lost water stay the customer's responsibility.
   - extraFaqs (3): "Who do I call for a leak at the water meter in Dallas?" (311, 24 hours a day, source: https://dallascityhall.com/departments/waterutilities/Pages/water_utilities_contacts.aspx lists "Meter leak" as a 311 emergency); "Who pays to fix the pipe between the meter and my Dallas house?" (the property owner: DWU says owners "control and are responsible for maintaining the private side of the service line - from the water meter to the home", source: https://www.dallascityhall.com/departments/waterutilities/Documents/Lead%20and%20Copper%20Update_Brochure_ENGFinal.pdf); "Will Dallas credit my water bill for a leak?" (the adjustment rules above, no promise).
   - extraLinks (5): `{ label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" }`, `{ label: "How to check your water meter for a hidden leak", href: "/blog/how-to-check-your-water-meter-for-a-hidden-leak-dallas" }`, `{ label: "Water Service Line Replacement Cost Calculator (Plus Who Pays)", href: "/tools/water-service-line-cost-calculator" }`, `{ label: "Slab leak warning signs", href: "/blog/slab-leak-warning-signs-dallas-fort-worth-homeowners" }`, `{ label: "Dallas service area", href: "/cities/dallas" }`
   - Links in: add `{ label: "Leak between the meter and the house: who fixes it in Dallas", href: "/blog/water-leak-between-meter-and-house-dallas-who-fixes-it" }` as the last item of the `extraLinks` of BOTH `"how-to-check-your-water-meter-for-a-hidden-leak-dallas"` and `"dfw-water-sewer-rate-increases-by-city-2026"`.
3. `src/data/seoOverrides.ts`: directly after the `"/blog/how-to-check-your-water-meter-for-a-hidden-leak-dallas"` entry (about line 92), add, same shape:
   `"/blog/water-leak-between-meter-and-house-dallas-who-fixes-it": { description: "In Dallas the pipe from the meter to your house is yours to fix. How to tell which side is leaking, when to call 311 and how DWU leak adjustments work." },`
4. `src/data/contentDates.ts`: directly after the line for `"/blog/how-to-check-your-water-meter-for-a-hidden-leak-dallas"` (about line 38) add `"/blog/water-leak-between-meter-and-house-dallas-who-fixes-it": "2026-11-05",`
Done when: `npm run build` passes and `.next/server/app/blog/water-leak-between-meter-and-house-dallas-who-fixes-it.html` exists and contains `After the repair: asking Dallas Water Utilities for a leak adjustment`.

---

## PH-014 - Replace 4 plain <a> page links with <Link> (lint) - Status: OPEN
Files: `src/app/guides/dfw-burst-pipes/page.tsx`, `src/app/guides/dfw-housing-age-by-city/page.tsx`, `src/app/tools/water-hardness-widget/page.tsx`
`Link` is already imported in all 3 files. Change only these links: replace `<a href=` with `<Link href=` and the matching `</a>` with `</Link>`, keep href, className and text exactly as they are.
- `src/app/guides/dfw-burst-pipes/page.tsx` line ~120 (the `<li>` starting `<strong>Call for emergency service.</strong>`): both links, `/services/burst-pipe-emergency` and `/cost-guides/burst-pipe-emergency-cost-guide`.
- `src/app/guides/dfw-housing-age-by-city/page.tsx` line ~153 (paragraph starting `If you're buying an older DFW home`): the `/services/burst-pipe-emergency` link.
- `src/app/tools/water-hardness-widget/page.tsx` line ~120: the `/blog/water-heater-making-popping-noise-dallas` link.
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-burst-pipes/page.tsx src/app/guides/dfw-housing-age-by-city/page.tsx src/app/tools/water-hardness-widget/page.tsx 2>&1 | Select-String "no-html-link-for-pages"` prints nothing.

---

## PH-015 - Escape quotes and apostrophes in the DFW slab leaks guide (lint) - Status: OPEN
Files: `src/app/guides/dfw-slab-leaks/page.tsx`
Make exactly these text replacements (visible text only; do not touch `className="..."` or other attributes):
- line ~116: `<em>"Will my insurance cover this?"</em>` -> `<em>&quot;Will my insurance cover this?&quot;</em>`
- line ~122: `policy's` -> `policy&apos;s`
- line ~123: `Insurance's` -> `Insurance&apos;s`
- line ~127: `agency's` -> `agency&apos;s`
- line ~139: `"I noticed something` -> `&quot;I noticed something` and `a while back"` -> `a while back&quot;`
- line ~141: `plumber's` -> `plumber&apos;s`
- line ~144: `don't` -> `don&apos;t`
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-slab-leaks/page.tsx` reports 0 errors.

---

## PH-016 - Escape quotes and apostrophes in the DFW water heater lifespan guide (lint) - Status: OPEN
Files: `src/app/guides/dfw-water-heater-lifespan/page.tsx`
Make exactly these text replacements, each only on the line given (visible text only; never touch `className="..."` or other attributes):
- line ~78: `DFW's` -> `DFW&apos;s`
- line ~84: `Utilities'` -> `Utilities&apos;` and `city's` -> `city&apos;s`
- line ~91: `"once` -> `&quot;once` and `year"` -> `year&quot;`
- line ~101: `heater's` -> `heater&apos;s`
- line ~110: `aren't` -> `aren&apos;t` and `they're` -> `they&apos;re`
- line ~118: `It's` -> `It&apos;s`
- line ~130: `it's` -> `it&apos;s`
- line ~142: `DFW's` -> `DFW&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-water-heater-lifespan/page.tsx` reports 0 errors.

---

## PH-017 - Escape quotes and apostrophes in 2 data guides (lint) - Status: OPEN
Files: `src/app/guides/texas-insurance-plumbing-claims/page.tsx`, `src/app/guides/dfw-plumbing-data/page.tsx`
Make exactly these text replacements, each only on the line given (visible text only; never touch attributes):
`src/app/guides/texas-insurance-plumbing-claims/page.tsx`
- line ~61: `"Sudden` -> `&quot;Sudden` and `Accidental"` -> `Accidental&quot;`
- line ~82: `"sudden` -> `&quot;sudden` and `accidental"` -> `accidental&quot;`
- line ~85: `policy's` -> `policy&apos;s`
- line ~94: `plumber's` -> `plumber&apos;s`
`src/app/guides/dfw-plumbing-data/page.tsx`
- line ~75: `Utilities'` -> `Utilities&apos;`
- line ~89: `office's` -> `office&apos;s`
- line ~92: `2021's` -> `2021&apos;s`
- line ~102: `Dallas'` -> `Dallas&apos;`, `region's` -> `region&apos;s` and `metro's` -> `metro&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/texas-insurance-plumbing-claims/page.tsx src/app/guides/dfw-plumbing-data/page.tsx` reports 0 errors.

---

## PH-018 - Same service in nearby cities on city-service pages - Status: OPEN
Files: `src/app/cities/[citySlug]/[serviceSlug]/page.tsx`
Goal: each city-service page links to the same service in up to 8 nearby cities in its market (only pages that exist). `cities`, `isPriorityCityService`, `Link`, `city`, `service` and `displayName` are already available in the component.
1. Inside `export default async function CityServicePage`, directly above its line `  return (` (about line 83), add exactly:
```tsx
  const nearbyCities = cities
    .filter((c) => c.marketSlug === city.marketSlug && c.slug !== city.slug && isPriorityCityService(c.slug, service.slug))
    .slice(0, 8);
```
2. Directly above the line that starts `<OfficialSources` (about line 168), insert exactly (keep the file's indentation style):
```tsx
{nearbyCities.length > 0 ? (
  <section className="content-section">
    <p className="section-kicker">Nearby cities</p>
    <h2 className="mt-2 text-2xl font-black text-white">{displayName} in nearby cities</h2>
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
      {nearbyCities.map((c) => (
        <li key={c.slug}><Link className="font-bold text-emerald-300 underline" href={`/cities/${c.slug}/${service.slug}`}>{displayName} in {c.name}</Link></li>
      ))}
    </ul>
  </section>
) : null}
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/cities/plano/burst-pipe-emergency.html` contains `>Nearby cities<`.

---

## PH-019 - Escape quotes and apostrophes in 4 small files (lint) - Status: OPEN
Files: `src/app/guides/dfw-gas-line-safety/page.tsx`, `src/app/guides/dfw-polybutylene-pipe-replacement/page.tsx`, `src/app/guides/dfw-sewer-root-intrusion/page.tsx`, `src/app/page.tsx`
Make exactly these text replacements, each only on the line given (visible text only; never touch attributes):
`src/app/guides/dfw-gas-line-safety/page.tsx`
- line ~93: `"gas-work` -> `&quot;gas-work` and `endorsement"` -> `endorsement&quot;`
- line ~99: `plumber's` -> `plumber&apos;s`
- line ~115: `TSBPE's` -> `TSBPE&apos;s`
`src/app/guides/dfw-polybutylene-pipe-replacement/page.tsx`
- line ~74: `region's` -> `region&apos;s`
- line ~86: `manufacturer's` -> `manufacturer&apos;s`
- line ~91: `region's` -> `region&apos;s`
`src/app/guides/dfw-sewer-root-intrusion/page.tsx`
- line ~65: `Dallas's` -> `Dallas&apos;s` and `homeowner's` -> `homeowner&apos;s`
`src/app/page.tsx`
- line ~108: `DFW's` -> `DFW&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint` on the 4 files reports 0 errors.

---

## PH-020 - New blog post: tankless water heater in a DFW freeze when the power goes out - Status: WRITER
Files: `src/data/blogPosts.ts`, `src/data/pageEnhancements.ts`, `src/data/seoOverrides.ts`, `src/data/contentDates.ts`
Goal: one new blog post at `/blog/tankless-water-heater-freeze-power-outage-dfw`. Search intent: "tankless water heater freeze power outage". Service: water heater emergency. The hero image is picked automatically from `relatedServiceSlug` (no image edit). Use these anchors only (another task edits other spots in the same files):
1. `src/data/blogPosts.ts`: directly after the line `blogPosts.push(tanklessWaterHeaterTroubleshootingPost);` (about line 314), add a new post copying the shape of `tanklessWaterHeaterTroubleshootingPost` exactly, then `blogPosts.push(tanklessFreezePowerOutagePost);`. Use exactly:
   - const name `tanklessFreezePowerOutagePost`
   - slug `tankless-water-heater-freeze-power-outage-dfw`
   - title `Tankless Water Heater in a DFW Freeze: What to Do When the Power Goes Out`
   - directAnswer `A tankless water heater's built-in freeze protection only works while the unit has power, so in a freeze with a long power outage the safe move is to drain it: Rinnai's procedure is to shut off the cold water and gas supply, disconnect power and open the hot and cold drain valves. In Dallas-Fort Worth the average first freeze comes around November 22.`
   - category `Prevention`, relatedServiceSlug `water-heater-emergency`
2. `src/data/pageEnhancements.ts` (search, do not read whole): add a new entry keyed `"tankless-water-heater-freeze-power-outage-dfw"` directly after the entry `"tankless-water-heater-not-producing-hot-water-troubleshooting"` ends, copying its fields exactly. Plain, human copy, ONLY these facts (no prices, no guarantees):
   - checklistTitle `Before and during a freeze: protect a tankless water heater`; 5-6 items: keep power to the unit, because many units have internal sensors that prevent freezing only while powered (Rinnai, https://rinnai.us/residential/freeze-protect-your-rinnai-product); insulate exposed pipes; check vent and drain lines for snow or ice blockages (Rinnai); DFW's average first freeze is November 22 and last freeze March 12 (NWS Fort Worth, https://www.weather.gov/fwd/d32info); check your own model's manual, because steps differ by brand.
   - proofTitle `If the power is out for a long time in freezing weather`; 4 items from Rinnai's general draining procedure: shut off the cold water supply and the gas supply; disconnect power to the water heater; open the hot and cold drain valves; if you are not comfortable doing it, or the unit is already leaking, call a plumber.
   - extraFaqs (3): "Does a tankless water heater have freeze protection?" (yes on many units, but it needs power: Rinnai); "Should I drain my tankless water heater during a power outage?" (in a prolonged outage in freezing weather, Rinnai gives a general draining procedure: summarize it); "When does Dallas-Fort Worth usually get its first freeze?" (around November 22 on average, NWS Fort Worth).
   - extraLinks (5): `{ label: "Water heater emergency help", href: "/services/water-heater-emergency" }`, `{ label: "Tankless water heater not producing hot water", href: "/blog/tankless-water-heater-not-producing-hot-water-troubleshooting" }`, `{ label: "How to keep pipes from freezing in DFW", href: "/blog/frozen-pipes-dallas-fort-worth-prevention-before-the-next-freeze" }`, `{ label: "How often DFW freezes (NWS data)", href: "/guides/dfw-freeze-history" }`, `{ label: "Live DFW freeze watch", href: "/tools/freeze-watch-widget" }`
   - Links in: add `{ label: "Tankless water heater in a freeze: power outage steps", href: "/blog/tankless-water-heater-freeze-power-outage-dfw" }` as the last item of the `extraLinks` of BOTH `"tankless-water-heater-not-producing-hot-water-troubleshooting"` and `"frozen-pipes-dallas-fort-worth-prevention-before-the-next-freeze"`.
3. `src/data/seoOverrides.ts`: directly after the `"/blog/sudden-low-water-pressure-in-dallas-home-what-it-means"` entry (about line 108), add, same shape:
   `"/blog/tankless-water-heater-freeze-power-outage-dfw": { description: "Tankless freeze protection only works with power. What DFW homeowners should do before a freeze and how to drain the unit in a long outage." },`
4. `src/data/contentDates.ts`: directly after the line for `"/blog/tankless-water-heater-not-producing-hot-water-troubleshooting"` (about line 56) add `"/blog/tankless-water-heater-freeze-power-outage-dfw": "2026-11-09",`
Done when: `npm run build` passes and `.next/server/app/blog/tankless-water-heater-freeze-power-outage-dfw.html` exists and contains `If the power is out for a long time in freezing weather`.

---

## PH-021 - Escape quotes and apostrophes on the partners page and restaurant drain post (lint) - Status: OPEN
Files: `src/app/partners/page.tsx`, `src/app/blog/drain-backup-in-a-restaurant-what-owners-should-do-first/page.tsx`
Make exactly these text replacements, each only on the line given (visible text only; never touch attributes):
`src/app/partners/page.tsx`
- line ~46: `you've` -> `you&apos;ve`
- line ~47: `we're` -> `we&apos;re`
- line ~48: `we're` -> `we&apos;re`
- line ~66: `we've` -> `we&apos;ve`
- line ~67: `We're` -> `We&apos;re`
- line ~69: `We're` -> `We&apos;re`
`src/app/blog/drain-backup-in-a-restaurant-what-owners-should-do-first/page.tsx`
- line ~121: `inspector's` -> `inspector&apos;s`
- line ~143: `"just` -> `&quot;just` and `pumping"` -> `pumping&quot;`
- line ~164: `city's` -> `city&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint` on the 2 files reports 0 errors.

---

## PH-022 - Escape quotes and apostrophes in the plumbing leak insurance post (lint) - Status: OPEN
Files: `src/app/blog/does-homeowners-insurance-cover-a-plumbing-leak-in-texas/page.tsx`
Make exactly these text replacements, each only on the line given (visible text only; never touch attributes):
- line ~69: `policy's` -> `policy&apos;s`
- line ~86: `What's` -> `What&apos;s`
- line ~119: `"Sudden` -> `&quot;Sudden` and `Accidental"` -> `Accidental&quot;`
- line ~121: both `that's` -> `that&apos;s`
- line ~126: `DFW's` -> `DFW&apos;s`
- line ~128: `plumber's` -> `plumber&apos;s`
- line ~135: `policy's` -> `policy&apos;s` and `"covered"` -> `&quot;covered&quot;`
- line ~142: `they'll` -> `they&apos;ll`
- line ~175: `plumber's` -> `plumber&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/blog/does-homeowners-insurance-cover-a-plumbing-leak-in-texas/page.tsx` reports 0 errors.
