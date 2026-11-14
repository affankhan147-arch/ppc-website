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

## PH-035 - Houston 24-hour plumber page: Houston-specific section - Status: OPEN
Claude note 2026-11-13: BLOCKED because aider scraped the source URLs (the NWS PDF) into the prompt. Fixed in scripts/dsh-agent.py (aider --no-detect-urls). Retry exactly as written on the same branch.
File: `src/data/pageEnhancements.ts`
Why: /cities/houston/24-hour-emergency-plumber has 1,924 impressions at position 18.5 (Search Console, 28 days to 2026-11-07) but no Houston-specific content block (the DFW cities all have one). This adds Houston's own facts from official sources.
Where: search (do not read the whole file) for this line, which appears once:
```ts
  "arlington/24-hour-emergency-plumber": {
```
Insert the whole entry below directly ABOVE that line. Do not change any other entry (PH-036 and PH-034 edit other spots in this file).
```ts
  "houston/24-hour-emergency-plumber": {
    decisionTitle: "Houston emergency plumbing decision guide",
    decisionIntro: "In Houston, the first call depends on where the water is. Water coming up in the street or at the city's meter is reported to the City of Houston through 311, which is open 24 hours a day, 7 days a week. Water leaking inside the house or from your own pipes is a job for a licensed plumber.",
    decisionItems: [
      "Say whether the water is inside the house, in the yard or in the street, so you know right away whether it is a city problem or a plumbing problem.",
      "If water is bubbling up in the street or around the meter box, report it to 311; the City of Houston lists reporting water leaks among its 311 services.",
      "Tell the plumber whether you have been able to shut the water off, and where your shutoff is.",
      "Mention if the leak started during or right after a freeze, since a frozen pipe can split in more than one place."
    ],
    providerTitle: "What a Houston plumber may check",
    providerItems: [
      "Exposed pipes in the attic, garage, exterior walls and outdoor hose bibs, the places most likely to split in a hard freeze.",
      "The line between the meter and the house if the yard is soggy or the meter keeps moving with every fixture off.",
      "Water heater connections and relief lines when the leak is near the heater.",
      "A dated invoice that names the repair, which you will need if you ask Houston Public Works for a leak adjustment."
    ],
    safetyTitle: "When to treat it as urgent in Houston",
    safetyItems: [
      "Water you cannot shut off, or water reaching outlets, the electrical panel or light fixtures.",
      "A ceiling that is sagging or dripping.",
      "Sewage backing up into a tub, shower or floor drain.",
      "Burst pipes after a hard freeze: the National Weather Service in Houston recorded a low of 13 degrees for the City of Houston on February 16, 2021."
    ],
    preventionTitle: "Houston-specific prevention notes",
    preventionItems: [
      "Find your main water shutoff before the next freeze and make sure it turns.",
      "Insulate exposed pipes in the attic, the garage and on outside walls before a freeze.",
      "Keep the plumber's dated invoice after any leak repair: Houston Public Works gives leak credits once proof of the repair is provided, and the credit is larger the sooner the leak is fixed."
    ],
    extraFaqs: [
      {
        question: "Who do I call about a water leak in the street in Houston?",
        answer: "Call 311. The City of Houston's 311 line is open 24 hours a day, 7 days a week, and reporting water leaks is one of its services. For a leak inside your home or in your own plumbing, call a licensed plumber."
      },
      {
        question: "Can I get a credit on my Houston water bill after a leak?",
        answer: "Possibly. Houston Public Works gives leak adjustments once proof of the leak repair is provided, and the credit depends on how soon the leak was repaired after it began. Keep the plumber's dated invoice and check the current rules with Houston Public Works; an adjustment is not guaranteed."
      }
    ],
    extraLinks: [
      { label: "Houston service area", href: "/cities/houston" },
      { label: "24-hour emergency plumber service", href: "/services/24-hour-emergency-plumber" },
      { label: "Ceiling leak from plumbing", href: "/problems/ceiling-leak-from-plumbing" },
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
      { label: "24-hour emergency plumber in San Antonio", href: "/cities/san-antonio/24-hour-emergency-plumber" }
    ]
  },
```
Sources (Claude opened them on 2026-11-12; do not add them to the file): https://www.houstontx.gov/311/about.html ; https://www.houstonpublicworks.org/city-of-houston-approves-sweeping-ordinance-changes-to-address-high-water-bills ; https://www.weather.gov/media/hgx/climate/summary/Feb_2021_Regional_Climate_Summary.pdf ; https://www.weather.gov/hgx/2021ValentineStorm
Content rules: copy the entry word for word; no prices, no guarantees, no phone numbers.
Done when: `npm run build` passes and `.next/server/app/cities/houston/24-hour-emergency-plumber.html` contains `Houston emergency plumbing decision guide`.

---

## PH-036 - San Antonio 24-hour plumber page: San Antonio-specific section - Status: OPEN
Claude note 2026-11-13: BLOCKED because aider scraped the source URLs (the NWS PDF) into the prompt. Fixed in scripts/dsh-agent.py (aider --no-detect-urls). Retry exactly as written on the same branch.
File: `src/data/pageEnhancements.ts`
Why: /cities/san-antonio/24-hour-emergency-plumber has 1,353 impressions at position 23.2 (Search Console, 28 days to 2026-11-07) and no San Antonio-specific content block. This adds SAWS and NWS facts from official sources.
Where: search (do not read the whole file) for this line, which appears once:
```ts
  "irving/24-hour-emergency-plumber": {
```
Insert the whole entry below directly ABOVE that line. Do not change any other entry (PH-035 and PH-034 edit other spots in this file).
```ts
  "san-antonio/24-hour-emergency-plumber": {
    decisionTitle: "San Antonio emergency plumbing decision guide",
    decisionIntro: "San Antonio Water System (SAWS) takes water and sewer emergency calls 24 hours a day, 7 days a week, but SAWS says it cannot repair plumbing on private property. A leak at your home is yours to have repaired by a licensed plumber.",
    decisionItems: [
      "If you suspect a leak at your home, SAWS's advice is to shut off the main water service at the meter, then call a plumber.",
      "Tell the plumber whether the water is inside the house, in the yard or at the meter box.",
      "Water running in the street or an unscheduled water outage is a call to SAWS, not to a plumber.",
      "Mention if the leak started during or right after a freeze."
    ],
    providerTitle: "What a San Antonio plumber may check",
    providerItems: [
      "Toilets, flex supply lines, water heaters, water softeners, pressure reducing valves and broken pipes, all leak types SAWS lists for its leak repair reimbursement.",
      "Exposed pipes outdoors and in unheated spaces after a freeze.",
      "Whether your main shutoff at the meter closes fully.",
      "A dated receipt for the repair, since SAWS asks for repair receipts within 60 days after repairs."
    ],
    safetyTitle: "When to treat it as urgent in San Antonio",
    safetyItems: [
      "Water you cannot stop at the meter or at the house shutoff.",
      "Water near outlets, the electrical panel or light fixtures.",
      "Sewage coming up through a drain or cleanout.",
      "Pipes that split in a long freeze: the National Weather Service says San Antonio International Airport stayed below freezing for 4 days 12 hours in the February 2021 winter storm."
    ],
    preventionTitle: "San Antonio-specific prevention notes",
    preventionItems: [
      "Find your meter and learn how to close the main water service valve there before the next freeze, as SAWS advises.",
      "Fit foam or fiberglass insulation sleeves on exposed pipes; SAWS says they go a long way in keeping exposed pipes safe.",
      "Keep repair receipts: SAWS takes leak repair reimbursement receipts within 60 days after repairs and allows one adjustment in a 12-month period."
    ],
    extraFaqs: [
      {
        question: "Will SAWS fix a leak on my property?",
        answer: "No. SAWS says it cannot repair plumbing on private property, so a leak at your home needs a plumber. SAWS does take calls about water and sewer emergencies 24 hours a day, 7 days a week."
      },
      {
        question: "Can SAWS reimburse me after a leak repair?",
        answer: "SAWS has a leak repair reimbursement request. Receipts must be submitted within 60 days after repairs, customers are eligible for one adjustment in a 12-month period, the amount depends on the type of leak, and it may take up to two billing cycles. It is not guaranteed."
      }
    ],
    extraLinks: [
      { label: "San Antonio service area", href: "/cities/san-antonio" },
      { label: "24-hour emergency plumber service", href: "/services/24-hour-emergency-plumber" },
      { label: "Ceiling leak from plumbing", href: "/problems/ceiling-leak-from-plumbing" },
      { label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" },
      { label: "24-hour emergency plumber in Houston", href: "/cities/houston/24-hour-emergency-plumber" }
    ]
  },
```
Sources (Claude opened them on 2026-11-12; do not add them to the file): https://www.saws.org/report-water-leaks/ ; https://www.saws.org/report-a-problem/ ; https://www.saws.org/customer-self-service-options/i-need-to-submit-a-document/request-a-leak-repair-reimbursement/ ; https://www.saws.org/service/do-it-yourself-repairs/winter-pipe-protection/ ; https://www.weather.gov/media/ewx/wxevents/ewx-20210218.pdf
Content rules: copy the entry word for word; no prices, no guarantees, no phone numbers.
Done when: `npm run build` passes and `.next/server/app/cities/san-antonio/24-hour-emergency-plumber.html` contains `San Antonio emergency plumbing decision guide`.

---

## PH-034 - Put the calculator links on the 3 pages PH-025 and PH-027 missed - Status: DONE (2026-11-13, merged bfed5fa)
File: `src/data/pageEnhancements.ts`
Why: PH-025 and PH-027 (merged 2026-11-12) placed some links on other pages, because their anchor lines appear more than once in the file (Claude's mistake, not DSH's). These 3 pages still need their link into the sewer and slab calculators (positions 40.2 and 22.1).
Do these 3 inserts. For each: search (do not read the whole file) for the entry line; a few lines below it is the FIRST line `    extraLinks: [` after it; insert the new line directly BELOW that `    extraLinks: [` line, so it becomes the first link of that list. Change nothing else.
1. Entry `  "main-sewer-line-signs": {` -> insert:
```ts
      { label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" },
```
2. Entry `  "emergency-leak-repair-cost-dfw": {` -> insert:
```ts
      { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" },
```
3. Entry `  "sudden-low-water-pressure-in-dallas-home-what-it-means": {` -> insert:
```ts
      { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" },
```
(Claude dry-ran these 3 inserts on 2026-11-12: `npx tsc --noEmit` PASS.)
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `href: "/tools/sewer-line-repair-cost-calculator" }` exactly 4 times and `href: "/tools/slab-leak-repair-cost-calculator" }` exactly 5 times.

---

## PH-038 - Escape quotes and apostrophes in 3 guides (lint) - Status: DONE (2026-11-13, merged dbd2f4d; Claude redid it)
Files: `src/app/guides/dfw-gas-line-safety/page.tsx`, `src/app/guides/dfw-water-heater-lifespan/page.tsx`, `src/app/guides/texas-insurance-plumbing-claims/page.tsx`
Why: `npm run lint` reports 5 react/no-unescaped-entities errors in these 3 files. Make exactly these text replacements, each only on the line given (visible text only; never touch attributes, `className` or `href`):
- `src/app/guides/dfw-gas-line-safety/page.tsx` line ~99: `The plumber's` -> `The plumber&apos;s`
- `src/app/guides/dfw-water-heater-lifespan/page.tsx` line ~91: `"once a year"` -> `&quot;once a year&quot;`
- `src/app/guides/texas-insurance-plumbing-claims/page.tsx` line ~82: `"sudden and accidental"` -> `&quot;sudden and accidental&quot;`
No other changes. (Claude dry-ran these on 2026-11-12: eslint 0 errors in all 3 files.)
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-gas-line-safety/page.tsx src/app/guides/dfw-water-heater-lifespan/page.tsx src/app/guides/texas-insurance-plumbing-claims/page.tsx` reports 0 errors.

---

## PH-039 - Escape quotes and apostrophes in the plumber license post, part 1 (lint) - Status: DONE (2026-11-13, merged 0919198)
File: `src/app/blog/how-to-verify-a-texas-plumbers-license/page.tsx`
Why: `npm run lint` reports 56 react/no-unescaped-entities errors in this file; this task fixes the 28 on lines 114-159 (PH-040 does lines 189-294). Make exactly these text replacements, each only on the line given (visible text only; never touch attributes, `className` or `href`; the page text must read the same):
- line ~114: `plumber's` -> `plumber&apos;s`
- line ~116: `"Find a license/registration"` -> `&quot;Find a license/registration&quot;`
- line ~117: `"Search by Name"` -> `&quot;Search by Name&quot;` and `"Search by License Number"` -> `&quot;Search by License Number&quot;`
- line ~118: `"Texas State Board of Plumbing Examiners"` -> `&quot;Texas State Board of Plumbing Examiners&quot;` and `"Plumbing - Licensed or Registered"` -> `&quot;Plumbing - Licensed or Registered&quot;`
- line ~129: `"Find a license/registration"` -> `&quot;Find a license/registration&quot;`
- line ~135: `don't` -> `don&apos;t`
- line ~141: `"Board"` -> `&quot;Board&quot;` and `"Texas State Board of Plumbing Examiners"` -> `&quot;Texas State Board of Plumbing Examiners&quot;` and `"Plumbing - Licensed or Registered"` -> `&quot;Plumbing - Licensed or Registered&quot;`
- line ~155: `"Active"` -> `&quot;Active&quot;` and `"Expired"` -> `&quot;Expired&quot;` and `"Inactive"` -> `&quot;Inactive&quot;` and `"Suspended"` -> `&quot;Suspended&quot;`
- line ~159: `license's` -> `license&apos;s`
No other changes. Do not touch lines 189-294.
Done when: `npm run build` passes and `npx eslint src/app/blog/how-to-verify-a-texas-plumbers-license/page.tsx` reports 28 errors or fewer, none on lines 114-159.

---

## PH-040 - Escape quotes and apostrophes in the plumber license post, part 2 (lint) - Status: DONE (2026-11-13, merged b52ded1 + d7d8e56; Claude fixed 8 lines)
File: `src/app/blog/how-to-verify-a-texas-plumbers-license/page.tsx`
Why: the other 28 react/no-unescaped-entities errors in this file, on lines 189-294 (PH-039 does lines 114-159). Make exactly these text replacements, each only on the line given (visible text only; never touch attributes, `className` or `href`; the page text must read the same):
- line ~189: `Texas's` -> `Texas&apos;s`
- line ~196: `"homeowner exemption"` -> `&quot;homeowner exemption&quot;`
- line ~206: `"Inactive"` -> `&quot;Inactive&quot;`
- line ~216: `can't` -> `can&apos;t`
- line ~249: `doesn't` -> `doesn&apos;t`
- line ~254: `license's` -> `license&apos;s`
- line ~257: `plumber's` -> `plumber&apos;s`
- line ~261: `"Apprentice"` -> `&quot;Apprentice&quot;`
- line ~269: `plumber's` -> `plumber&apos;s`
- line ~270: `"TDLR plumbing license lookup,"` -> `&quot;TDLR plumbing license lookup,&quot;` and `won't` -> `won&apos;t`
- line ~273: `plumber's` -> `plumber&apos;s`
- line ~274: `there's` -> `there&apos;s`
- line ~277: `plumber's` -> `plumber&apos;s`
- line ~278: `"Search by License Number"` -> `&quot;Search by License Number&quot;` and `"Search by Name"` -> `&quot;Search by Name&quot;` and `it's` -> `it&apos;s`
- line ~282: `board's` -> `board&apos;s` and `you're` -> `you&apos;re` and `plumber's` -> `plumber&apos;s`
- line ~294: `plumber's` -> `plumber&apos;s`
No other changes. Do not touch lines 114-159.
Done when: `npm run build` passes and `npx eslint src/app/blog/how-to-verify-a-texas-plumbers-license/page.tsx` reports no errors on lines 189-294.

---

## PH-037 - New blog post: water leak at your San Antonio home, who fixes it and SAWS reimbursement - Status: DONE (2026-11-13, merged cd2e7e3)
Files: `src/data/blogPosts.ts`, `src/data/pageEnhancements.ts`, `src/data/seoOverrides.ts`, `src/data/contentDates.ts`
Goal: one new blog post at `/blog/saws-water-leak-who-fixes-it-san-antonio`. Search intent: "saws leak on my property who fixes it" / "saws leak adjustment". Gap: no page on the site mentions SAWS, while the San Antonio 24-hour page has 1,353 impressions (position 23.2). The page renders from these 4 data files; the hero image is picked automatically from `relatedServiceSlug` (no image edit). Use these anchors only (other tasks edit other spots in the same files).
1. `src/data/blogPosts.ts`: directly after the line `blogPosts.push(waterLeakMeterToHouseDallasPost);`, add a new post copying the shape of `waterLeakMeterToHouseDallasPost` exactly, then `blogPosts.push(sawsWaterLeakSanAntonioPost);`. Use exactly:
   - const name `sawsWaterLeakSanAntonioPost`
   - slug `saws-water-leak-who-fixes-it-san-antonio`
   - title `Water Leak at Your San Antonio Home: Who Fixes It and Will SAWS Help?`
   - directAnswer `SAWS says it cannot repair plumbing on private property, so a leak at your San Antonio home needs a licensed plumber. Water and sewer emergencies on SAWS's side go to SAWS, which takes those calls 24 hours a day. After the repair, SAWS has a leak repair reimbursement request: receipts are due within 60 days, with one adjustment per 12 months.`
   - category `Emergency steps`, relatedServiceSlug `24-hour-emergency-plumber`
2. `src/data/pageEnhancements.ts` (search, do not read whole): find the line `  "water-leak-between-meter-and-house-dallas-who-fixes-it": {`; after that entry's closing `  },` add a new entry keyed `"saws-water-leak-who-fixes-it-san-antonio"`, copying its fields exactly (checklistTitle, checklistIntro, checklistItems, proofTitle, proofItems, extraFaqs, extraLinks). Plain, human copy, ONLY these facts (no prices, no guarantees, no phone numbers):
   - checklistTitle `Is the leak yours or SAWS's?`; intro + 5 items: SAWS says it cannot repair plumbing on private property, and if you have a leak you will need to hire a plumber (https://www.saws.org/report-water-leaks/); if you suspect a leak at your own home, shut off the main water service at the meter (same page); water and sewer emergencies are taken 24 hours a day, 7 days a week, and SAWS asks you to call any time of day or night about an unscheduled outage (https://www.saws.org/report-a-problem/); ice formed during a freeze can block pipes and cause them to burst (https://www.saws.org/service/do-it-yourself-repairs/winter-pipe-protection/); know where your meter is and how to close the valve there before you need it (same page).
   - proofTitle `After the repair: SAWS leak repair reimbursement`; 4-5 items using ONLY these facts from https://www.saws.org/customer-self-service-options/i-need-to-submit-a-document/request-a-leak-repair-reimbursement/ : all receipts must be submitted within 60 days after repairs; customers are only eligible for one adjustment in a 12-month period; it may take up to two billing cycles to receive an adjustment; reimbursements are based on the type of leak, and the listed types include irrigation systems, flex supply lines, toilets, pools, water heaters, water softeners, broken pipes and pressure reducing valves; receipts can be uploaded as jpg, gif, png, pdf or jpeg files.
   - extraFaqs (3): "Will SAWS fix a leak on my property?" (no: SAWS cannot repair plumbing on private property; hire a plumber); "How long do I have to send SAWS my leak repair receipts?" (within 60 days after repairs; one adjustment per 12 months; up to two billing cycles); "What should I do first if I find a leak at home in San Antonio?" (shut off the main water service at the meter, as SAWS advises, then call a licensed plumber).
   - extraLinks (5): `{ label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" }`, `{ label: "24-hour emergency plumber in San Antonio", href: "/cities/san-antonio/24-hour-emergency-plumber" }`, `{ label: "Water shutoff valve will not close", href: "/problems/water-shutoff-valve-will-not-close" }`, `{ label: "Leak between the meter and the house in Dallas", href: "/blog/water-leak-between-meter-and-house-dallas-who-fixes-it" }`, `{ label: "San Antonio service area", href: "/cities/san-antonio" }`
   - Links in: in BOTH entries `"water-leak-between-meter-and-house-dallas-who-fixes-it"` and `"how-to-check-your-water-meter-for-a-hidden-leak-dallas"`, find the FIRST line `    extraLinks: [` below the entry line and insert directly BELOW it: `      { label: "Water leak at your San Antonio home: who fixes it", href: "/blog/saws-water-leak-who-fixes-it-san-antonio" },`
3. `src/data/seoOverrides.ts`: directly after the 3-line `"/blog/water-leak-between-meter-and-house-dallas-who-fixes-it"` entry, add, same shape:
   `"/blog/saws-water-leak-who-fixes-it-san-antonio": { description: "SAWS can't repair plumbing on private property. Who fixes a leak at your San Antonio home, what to shut off first, and how SAWS leak reimbursement works." },`
4. `src/data/contentDates.ts`: directly after the line for `"/blog/water-leak-between-meter-and-house-dallas-who-fixes-it"` add `"/blog/saws-water-leak-who-fixes-it-san-antonio": "2026-11-12",`
Done when: `npm run build` passes and `.next/server/app/blog/saws-water-leak-who-fixes-it-san-antonio.html` exists and contains `After the repair: SAWS leak repair reimbursement`.

---

## PH-023 - CTR: city page titles lead with 24 Hour Emergency Plumber - Status: DONE (2026-11-12, merged 910dc8a)
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

## PH-033 - Add 2 live guides to the sitemap inventory - Status: DONE (2026-11-12, merged 1915fc9)
File: `src/lib/content.ts`
Why: /guides/dfw-freeze-history and /guides/dfw-housing-age-by-city are live (200) but missing from the sitemap, because the sitemap is built from the page inventory in this file. Google finds pages faster when they are in the sitemap.
1. Find the line that starts `    { kind: "guide", title: "Water Heater Lifespan & Maintenance in DFW` (about line 84). It is the last item before the line `  ];` and ends with `}` and no comma. Add a comma at the end of that line.
2. Directly below it (above `  ];`), insert exactly these two lines (the last one has no comma):
```ts
    { kind: "guide", title: "How Often Does DFW Actually Freeze? NWS Climate Data", path: "/guides/dfw-freeze-history", h1: "How Often Does DFW Actually Freeze?", description: "Official National Weather Service data on how many days per year Dallas-Fort Worth actually freezes, average first/last freeze dates, and what that means for your pipes." },
    { kind: "guide", title: "DFW Housing Age by City: What It Means for Your Pipes", path: "/guides/dfw-housing-age-by-city", h1: "DFW Housing Age by City", description: "Real U.S. Census data on the median construction year for 7 DFW cities, and what each city's typical housing age means for galvanized, polybutylene, and copper/PEX pipe risk." }
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/sitemap.xml.body` (or the built sitemap) contains `/guides/dfw-freeze-history` and `/guides/dfw-housing-age-by-city`.

---

## PH-013 - New blog post: water leak between the meter and the house in Dallas - Status: DONE (2026-11-12, merged 06f9629)
Claude note 2026-11-11: everything else passed review; fix 2 lines in `src/data/pageEnhancements.ts`, entry `"water-leak-between-meter-and-house-dallas-who-fixes-it"`, on the existing branch dsh/2026-11-06-PH-013:
1. Last `checklistItems` line: replace `Do not dig around the meter box or attempt to adjust city equipment, as service lines and meter connections remain utility property.` with `Do not dig around the meter box or touch the city's meter or other city equipment.` (the old text says service lines are utility property, which contradicts the post: the private side is the owner's).
2. First `extraFaqs` answer: delete ` (or 214-670-3111 from outside city limits)` so it reads `Call 311, which takes Dallas water and sewer emergencies 24 hours a day, to report a meter leak.` (that number was not in the brief's sources).
Change nothing else. Done when: `npm run build` passes and the file contains both new texts exactly.
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

## PH-014 - Replace 4 plain <a> page links with <Link> (lint) - Status: DONE (2026-11-11, merged a653ed4)
Files: `src/app/guides/dfw-burst-pipes/page.tsx`, `src/app/guides/dfw-housing-age-by-city/page.tsx`, `src/app/tools/water-hardness-widget/page.tsx`
`Link` is already imported in all 3 files. Change only these links: replace `<a href=` with `<Link href=` and the matching `</a>` with `</Link>`, keep href, className and text exactly as they are.
- `src/app/guides/dfw-burst-pipes/page.tsx` line ~120 (the `<li>` starting `<strong>Call for emergency service.</strong>`): both links, `/services/burst-pipe-emergency` and `/cost-guides/burst-pipe-emergency-cost-guide`.
- `src/app/guides/dfw-housing-age-by-city/page.tsx` line ~153 (paragraph starting `If you're buying an older DFW home`): the `/services/burst-pipe-emergency` link.
- `src/app/tools/water-hardness-widget/page.tsx` line ~120: the `/blog/water-heater-making-popping-noise-dallas` link.
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-burst-pipes/page.tsx src/app/guides/dfw-housing-age-by-city/page.tsx src/app/tools/water-hardness-widget/page.tsx 2>&1 | Select-String "no-html-link-for-pages"` prints nothing.

---

## PH-015 - Escape quotes and apostrophes in the DFW slab leaks guide (lint) - Status: DONE (2026-11-11, merged 50644a0)
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

## PH-016 - Escape quotes and apostrophes in the DFW water heater lifespan guide (lint) - Status: DONE (2026-11-11, merged 63dbafc)
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

## PH-017 - Escape quotes and apostrophes in 2 data guides (lint) - Status: DONE (2026-11-11, merged 4e1db83)
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

## PH-018 - Same service in nearby cities on city-service pages - Status: DONE (2026-11-11, merged 2c3c421)
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

## PH-019 - Escape quotes and apostrophes in 4 small files (lint) - Status: DONE (2026-11-11, merged 3fd74dd)
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

## PH-020 - New blog post: tankless water heater in a DFW freeze when the power goes out - Status: DONE (2026-11-12, merged 900c73e)
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

## PH-021 - Escape quotes and apostrophes on the partners page and restaurant drain post (lint) - Status: DONE (2026-11-11, merged 8d82e21)
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

## PH-022 - Escape quotes and apostrophes in the plumbing leak insurance post (lint) - Status: DONE (2026-11-12, merged 190e7b5)
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

---

## PH-024 - Links into the DFW emergency plumbing cost guide - Status: DONE (2026-11-12, merged d8a8962)
Files: `src/data/pageEnhancements.ts`
Why: /guides/dfw-emergency-plumbing-costs has 1,018 impressions at position 13.0 and its top query "emergency plumber cost" sits at position 24 (Search Console, 28 days to 2026-11-07). Two more related pages should link to it.
Search for each entry key (do not read the whole file). Change only the lines named here; other tasks edit other entries in this file.
1. Inside the entry `  "emergency-drain-cleaning-in-fort-worth-fast-homeowner-guide": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Drain cleaning cost guide", href: "/cost-guides/drain-cleaning-cost-dfw" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "DFW emergency plumbing costs guide", href: "/guides/dfw-emergency-plumbing-costs" }
```
2. Inside the entry `  "emergency-plumbing-cost-dfw": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Ceiling leak from plumbing", href: "/problems/ceiling-leak-from-plumbing" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "DFW emergency plumbing costs guide", href: "/guides/dfw-emergency-plumbing-costs" }
```
No other changes.
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `{ label: "DFW emergency plumbing costs guide", href: "/guides/dfw-emergency-plumbing-costs" }` and `{ label: "DFW emergency plumbing costs guide", href: "/guides/dfw-emergency-plumbing-costs" }` exactly once each.

---

## PH-025 - Links into the sewer line repair cost calculator - Status: DONE (2026-11-12, merged c3949a2)
Files: `src/data/pageEnhancements.ts`
Why: /tools/sewer-line-repair-cost-calculator has 2,130 impressions at position 40.2 (Search Console, 28 days to 2026-11-07) but only a few pages link to it. Three sewer pages should.
Search for each entry key (do not read the whole file). Change only the lines named here; other tasks edit other entries in this file.
1. Inside the entry `  "main-sewer-line-signs": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Outdoor cleanout overflowing", href: "/problems/outdoor-cleanout-overflowing" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }
```
2. Inside the entry `  "is-a-clogged-drain-actually-a-sewer-line-problem": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Main sewer line clogged in Dallas: warning signs", href: "/blog/main-sewer-line-clogged-in-dallas-warning-signs" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }
```
3. Inside the entry `  "dallas-storms-and-sewer-backups-what-to-check": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Sewer backup in Fort Worth: what it means", href: "/blog/sewer-backup-in-fort-worth-what-it-means-and-who-to-call" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }
```
No other changes.
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `{ label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }` and `{ label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }` and `{ label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }` exactly once each.

---

## PH-027 - Links into the slab leak repair cost calculator - Status: DONE (2026-11-12, merged 1b34c1a)
Files: `src/data/pageEnhancements.ts`
Why: /tools/slab-leak-repair-cost-calculator has 1,204 impressions at position 22.1 (Search Console, 28 days to 2026-11-07). Three leak pages should link to it.
Search for each entry key (do not read the whole file). Change only the lines named here; other tasks edit other entries in this file.
1. Inside the entry `  "emergency-leak-repair-cost-dfw": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Dallas emergency plumbing help", href: "/cities/dallas" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }
```
2. Inside the entry `  "slab-leak-warning-signs-dallas-fort-worth-homeowners": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Emergency leak repair cost guide", href: "/cost-guides/emergency-leak-repair-cost-dfw" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }
```
3. Inside the entry `  "sudden-low-water-pressure-in-dallas-home-what-it-means": {`, find this line (the last line of its `extraLinks` list):
```ts
      { label: "Water Pressure Regulator (PRV) Replacement Cost Calculator", href: "/tools/water-pressure-regulator-cost-calculator" }
```
Add a comma at the end of that line, then insert this new line directly below it:
```ts
      { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }
```
No other changes.
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `{ label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }` and `{ label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }` and `{ label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }` exactly once each.

---

## PH-028 - Links from the 24-hour emergency plumber service page to Houston and San Antonio - Status: DONE (2026-11-12, merged bbb22d2)
Files: `src/data/pageEnhancements.ts`
Why: /cities/houston/24-hour-emergency-plumber (1,924 impressions, position 18.5) and /cities/san-antonio/24-hour-emergency-plumber (1,353 impressions, position 23.2) are only linked from the home page and their own city hubs (Search Console, 28 days to 2026-11-07). The main 24-hour service page should link to both.
Search for the entry key (do not read the whole file). Change only these lines; other tasks edit other entries in this file.
1. Inside the entry `  "24-hour-emergency-plumber": {` (near the top of the file, about line 72), find this line (the last line of its `extraLinks` list):
```ts
      { label: "Toilet overflow steps", href: "/problems/toilet-overflowing-will-not-stop" }
```
Add a comma at the end of that line, then insert these two lines directly below it:
```ts
      { label: "24-hour emergency plumber in Houston", href: "/cities/houston/24-hour-emergency-plumber" },
      { label: "24-hour emergency plumber in San Antonio", href: "/cities/san-antonio/24-hour-emergency-plumber" }
```
No other changes.
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains both new lines exactly once.

---

## PH-026 - Shorter search titles for 2 cost calculators - Status: DONE (2026-11-12, merged 503ae4c)
Files: `src/data/seoOverrides.ts`
Why: the 2026-11-06 SEO audit found these tool titles over 60 characters, so Google cuts them off. Only the search title changes (the page H1 stays). Both pages are on the "Rankings first" list in docs/dsh/CTR.md.
1. Find the entry `  "/blog/no-usable-toilet-in-the-house-what-dfw-homeowners-should-do": {`. It is the LAST entry: its closing line `  }` is directly above the final line `};` of the file. Change that `  }` to `  },` and insert directly below it (above `};`) exactly:
```ts
  // SEO-AUDIT 2026-11-06: title was 65 chars.
  "/tools/sewer-line-repair-cost-calculator": {
    title: "Sewer Line Repair Cost Calculator: Trenchless vs. Dig"
  },
  // SEO-AUDIT 2026-11-06: title was 62 chars.
  "/tools/water-service-line-cost-calculator": {
    title: "Water Service Line Cost Calculator (Plus Who Pays)"
  }
```
No other changes.
Done when: `npm run build` passes and `.next/server/app/tools/sewer-line-repair-cost-calculator.html` contains `<title>Sewer Line Repair Cost Calculator: Trenchless vs. Dig`.

---

## PH-029 - Escape quotes and apostrophes in the DFW burst pipes guide (lint) - Status: DONE (2026-11-13, merged 82789bc; Claude restored line 100)
Claude note 2026-11-12: everything else passed; fix 1 line in `src/app/guides/dfw-burst-pipes/page.tsx` on the existing branch dsh/2026-11-12-PH-029. On line ~100 the sentence now starts `&quot;most&quot; Texas homeowners policies do cover water damage` (the first word was changed by mistake). Change that start back to `Most Texas homeowners policies do cover water damage`. Keep the later `&quot;most&quot; is doing real work` on the same line as it is. Change nothing else. Done when: `npm run build` passes, `npx eslint src/app/guides/dfw-burst-pipes/page.tsx` reports 0 errors and the file contains `Most Texas homeowners policies do cover water damage`.
File: `src/app/guides/dfw-burst-pipes/page.tsx`
Why: `npm run lint` reports 28 react/no-unescaped-entities errors in this file. Make exactly these text replacements, each only on the line given (visible text only; never touch attributes, `className`, `href` or code). Where a word appears twice on one line, replace both.
- line ~62: `You'd` -> `You&apos;d`
- line ~64: `isn't` -> `isn&apos;t` and `it's` -> `it&apos;s` and `doesn't` -> `doesn&apos;t`
- line ~67: `don't` -> `don&apos;t` and `area's` -> `area&apos;s`
- line ~70: `isn't` -> `isn&apos;t` and `DFW's` -> `DFW&apos;s`
- line ~85: `DFW's` -> `DFW&apos;s`
- line ~87: `2021's` -> `2021&apos;s` and `aren't` -> `aren&apos;t` and `they're` -> `they&apos;re`
- line ~90: `industry's` -> `industry&apos;s`
- line ~93: `isn't` -> `isn&apos;t` and `it's` -> `it&apos;s` and `doesn't` -> `doesn&apos;t`
- line ~100: `"most"` -> `&quot;most&quot;` and `what's` -> `what&apos;s` and `it's` -> `it&apos;s`
- line ~106: `policyholder's` -> `policyholder&apos;s` and `doesn't` -> `doesn&apos;t`
- line ~116: `don't` -> `don&apos;t`
- line ~117: `it's` -> `it&apos;s`
- line ~119: `TDI's` -> `TDI&apos;s` and `doesn't` -> `doesn&apos;t`
- line ~133: `it's` -> `it&apos;s`
- line ~142: `DFW's` -> `DFW&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-burst-pipes/page.tsx` reports 0 errors.

---

## PH-030 - Escape quotes and apostrophes in the DFW freeze history guide (lint) - Status: OPEN
File: `src/app/guides/dfw-freeze-history/page.tsx`
Why: `npm run lint` reports 21 react/no-unescaped-entities errors in this file. Make exactly these text replacements, each only on the line given (visible text only; never touch attributes, `className`, `href` or code). Where a word appears twice on one line, replace both.
- line ~62: `DFW's` -> `DFW&apos;s`
- line ~64: `"DFW` -> `&quot;DFW` and `freezes"` -> `freezes&quot;` and `it's` -> `it&apos;s` and `Service's` -> `Service&apos;s`
- line ~67: `aren't` -> `aren&apos;t` and `NWS's` -> `NWS&apos;s` and `DFW's` -> `DFW&apos;s`
- line ~70: `DFW's` -> `DFW&apos;s`
- line ~75: `DFW's` -> `DFW&apos;s`
- line ~77: `DFW's` -> `DFW&apos;s`
- line ~80: `DFW's` -> `DFW&apos;s` and `region's` -> `region&apos;s`
- line ~85: `"DFW` -> `&quot;DFW` and `Doesn't` -> `Doesn&apos;t` and `Freeze"` -> `Freeze&quot;`
- line ~87: `2021's` -> `2021&apos;s`
- line ~90: `isn't` -> `isn&apos;t` and `NWS's` -> `NWS&apos;s`
- line ~95: `Winter's` -> `Winter&apos;s`
- line ~116: `DFW's` -> `DFW&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-freeze-history/page.tsx` reports 0 errors.

---

## PH-031 - Escape quotes and apostrophes in the DFW housing age guide (lint) - Status: OPEN
Claude note 2026-11-12: now OPEN; Claude re-checked every line number below against master today.
File: `src/app/guides/dfw-housing-age-by-city/page.tsx`
Why: `npm run lint` reports 21 react/no-unescaped-entities errors in this file. Make exactly these text replacements, each only on the line given (visible text only; never touch attributes, `className`, `href` or code). Where a word appears twice on one line, replace both.
- line ~45: `Bureau's` -> `Bureau&apos;s`
- line ~64: `home's` -> `home&apos;s` and `DFW's` -> `DFW&apos;s` and `Bureau's` -> `Bureau&apos;s` and `city's` -> `city&apos;s`
- line ~115: `city's` -> `city&apos;s` and `"typical"` -> `&quot;typical&quot;` and `Arlington's` -> `Arlington&apos;s` and `Allen's` -> `Allen&apos;s`
- line ~120: `Home's` -> `Home&apos;s`
- line ~125: `DFW's` -> `DFW&apos;s`
- line ~126: `DFW's` -> `DFW&apos;s`
- line ~127: `DFW's` -> `DFW&apos;s`
- line ~130: `city's` -> `city&apos;s`
- line ~143: `DFW's` -> `DFW&apos;s`
- line ~150: `it's` -> `it&apos;s`
- line ~153: `you're` -> `you&apos;re` and `home's` -> `home&apos;s` and `doesn't` -> `doesn&apos;t`
- line ~162: `DFW's` -> `DFW&apos;s`
No other changes.
Done when: `npm run build` passes and `npx eslint src/app/guides/dfw-housing-age-by-city/page.tsx` reports 0 errors.

---

## PH-032 - New blog post: who is responsible for the sewer line in Fort Worth - Status: WRITER
Files: `src/data/blogPosts.ts`, `src/data/pageEnhancements.ts`, `src/data/seoOverrides.ts`, `src/data/contentDates.ts`
Goal: one new blog post at `/blog/who-is-responsible-for-sewer-line-fort-worth`. Search intent: "who is responsible for sewer line fort worth" (owner vs city). Service: main sewer line clog. It supports /tools/sewer-line-repair-cost-calculator (2,130 impressions, position 40) and /cities/fort-worth (2,399 impressions, position 9.9). The page renders automatically from these 4 data files; the hero image is picked automatically from `relatedServiceSlug` (no image edit). This is a different question from the existing post "Sewer backup in Fort Worth: what it means" (that one is about symptoms); do not copy its text.
1. `src/data/blogPosts.ts`: directly after the line `blogPosts.push(anodeRodMaintenancePost);` (about line 369), add a new post copying the shape of `anodeRodMaintenancePost` exactly, then `blogPosts.push(fortWorthSewerLineResponsibilityPost);`. Do NOT add it at the end of the file or after the tankless post (other tasks add there). Use exactly:
   - const name `fortWorthSewerLineResponsibilityPost`
   - slug `who-is-responsible-for-sewer-line-fort-worth`
   - title `Who Is Responsible for the Sewer Line in Fort Worth? Owner vs. City`
   - directAnswer `In Fort Worth, the sewer lateral, the pipe from your house to the public sewer main, is privately owned and maintained, so repairs to it are the property owner's job. The city is responsible for the sewer mains and outfalls in rights-of-way and easements. For a backup, call Fort Worth Water at 817-392-4477 first: city crews check the main and tell you whether the problem is theirs.`
   - category `Drain and sewer guidance`, relatedServiceSlug `main-sewer-line-clog`
2. `src/data/pageEnhancements.ts` (search, do not read whole):
   a. In the entry `"drain-smell-in-bathroom-sewer-gas-or-simple-clog"`, find its last `extraLinks` line `      { label: "Is a clogged drain actually a sewer line problem?", href: "/blog/is-a-clogged-drain-actually-a-sewer-line-problem" }`, add a comma at its end and insert below it `      { label: "Who is responsible for the sewer line in Fort Worth", href: "/blog/who-is-responsible-for-sewer-line-fort-worth" }`.
   b. Directly after that entry's closing `  },`, add a new entry keyed `"who-is-responsible-for-sewer-line-fort-worth"`, copying the fields of `"drain-smell-in-bathroom-sewer-gas-or-simple-clog"` exactly (checklistTitle, checklistIntro, checklistItems, proofTitle, proofItems, extraFaqs, extraLinks). Write plain, human copy using ONLY these facts (no prices, no guarantees, no invented facts):
   - checklistTitle `Is the backup in the city main or your sewer lateral?`. Intro 1-2 sentences + 5 items: Fort Worth Water says a backup that happens while you are not using any water outlets may be a problem in the city main; if the trouble only shows up when you run water, it is likely in your private sewer lateral; call 817-392-4477 and city crews will check the mains and tell you if the problem is in the city main or not; the same number is answered 24 hours a day (Option 1 for water emergencies); report sewage flowing onto the ground to 817-392-4477 as well.
   - proofTitle `Fixing a private sewer line in Fort Worth`. 4-5 items using ONLY these facts: Fort Worth requires a plumbing permit for changing, installing, moving or repairing plumbing; permit applicants must be a registered building contractor or meet the requirements for a homestead permit; a Fort Worth plumbing contractor registration requires a valid Texas Master Plumber License; ask the plumber who will pull the permit before work starts; a homeowner working on their own homestead does not need a state plumbing license (Texas Occupations Code Sec. 1301.051), but the city permit rules above still apply.
   - extraFaqs (3): "Who pays to fix the sewer line in Fort Worth?" (the owner: Fort Worth Water calls the sewer lateral "the privately owned and maintained sewer pipe" connecting a building to the public sewer main; the city is responsible for mains and outfalls in rights-of-way and easements); "Who do I call for a sewer backup in Fort Worth?" (817-392-4477, 24 hours a day; city crews check the main first); "Do I need a permit to replace my sewer line in Fort Worth?" (repairing plumbing requires a plumbing permit; the applicant must be a registered contractor or qualify for a homestead permit).
   - extraLinks (5): `{ label: "Main sewer line clog service", href: "/services/main-sewer-line-clog" }`, `{ label: "Sewer backup in Fort Worth: what it means", href: "/blog/sewer-backup-in-fort-worth-what-it-means-and-who-to-call" }`, `{ label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }`, `{ label: "Main sewer line signs", href: "/problems/main-sewer-line-signs" }`, `{ label: "Fort Worth plumbing help", href: "/cities/fort-worth" }`.
   c. In the entry `"toilet-shower-and-sink-backing-up-together-what-it-means"`, find its last `extraLinks` line `      { label: "Sewer line clog cost guide", href: "/cost-guides/sewer-line-clog-cost-guide" }`, add a comma and insert below it `      { label: "Who is responsible for the sewer line in Fort Worth", href: "/blog/who-is-responsible-for-sewer-line-fort-worth" }`.
3. `src/data/seoOverrides.ts`: insert directly ABOVE the line `  // 42 impr / 2.4% / pos 4.3` exactly:
```ts
  // New post 2026-11-11 (PH-032).
  "/blog/who-is-responsible-for-sewer-line-fort-worth": {
    title: "Fort Worth Sewer Line: Who Is Responsible, Owner or City?",
    description:
      "In Fort Worth the sewer pipe from your house to the city main is yours to maintain. How to tell whose problem a backup is, who to call and the permit rules."
  },
```
4. `src/data/contentDates.ts`: directly below the line `  "/blog/sewer-backup-in-fort-worth-what-it-means-and-who-to-call": "2026-07-11",` add `  "/blog/who-is-responsible-for-sewer-line-fort-worth": "2026-11-12",`.
Sources (Claude opened them on 2026-11-11): https://www.fortworthtexas.gov/departments/water/wastewater/sewer-faq ; https://www.fortworthtexas.gov/departments/water/wastewater ; https://www.fortworthtexas.gov/departments/development-services/permits/residential-information ; https://www.fortworthtexas.gov/departments/development-services/permits/contractor-registration ; https://tsbpe.texas.gov/wp-content/uploads/documents/TSBPE_PlumbingLicenseLaw(PlainView)_Sept2025.pdf
Done when: `npm run build` passes and `.next/server/app/blog/who-is-responsible-for-sewer-line-fort-worth.html` exists and contains `Fixing a private sewer line in Fort Worth`.

## PH-041 - Links into the Houston and San Antonio 24-hour pages from 3 emergency posts - Status: OPEN
File: `src/data/pageEnhancements.ts`
Why: /cities/houston/24-hour-emergency-plumber (1,924 impressions, position 18.5) and /cities/san-antonio/24-hour-emergency-plumber (1,353, position 23.2) get almost no links from blog posts. These 3 general emergency posts are the closest match.
Where: do this in 3 places. For EACH of these entry lines (each appears once; search, do not read the whole file):
- `  "what-counts-as-a-plumbing-emergency": {`
- `  "emergency-plumber-vs-regular-plumber-what-is-the-difference": {`
- `  "emergency-plumber-near-me-open-now-before-help-arrives": {`
find the FIRST line `    extraLinks: [` below the entry line and insert these 2 lines directly BELOW it:
```ts
      { label: "24-hour emergency plumber in Houston", href: "/cities/houston/24-hour-emergency-plumber" },
      { label: "24-hour emergency plumber in San Antonio", href: "/cities/san-antonio/24-hour-emergency-plumber" },
```
Change nothing else (other tasks edit other entries in this file).
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `href: "/cities/houston/24-hour-emergency-plumber" }` exactly 4 times.

---

## PH-042 - Links into the DFW emergency plumbing cost guide from 2 more posts - Status: OPEN
File: `src/data/pageEnhancements.ts`
Why: /guides/dfw-emergency-plumbing-costs has 1,018 impressions at position 13.0; its top query "emergency plumber cost" sits at position 24. Two cost and approval posts don't link to it yet.
Where: for EACH of these entry lines (each appears once; search, do not read the whole file):
- `  "emergency-plumbing-cost-guide-for-dallas-homeowners": {`
- `  "emergency-leak-approval-checklist-for-homeowners": {`
find the FIRST line `    extraLinks: [` below the entry line and insert this line directly BELOW it:
```ts
      { label: "Emergency plumber cost in DFW: what changes the price", href: "/guides/dfw-emergency-plumbing-costs" },
```
Change nothing else.
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `Emergency plumber cost in DFW: what changes the price` exactly 2 times.

---

## PH-043 - Links into the sewer line repair cost calculator from 3 sewer posts - Status: OPEN
File: `src/data/pageEnhancements.ts`
Why: /tools/sewer-line-repair-cost-calculator has 2,130 impressions at position 40.2. Three sewer posts don't link to it yet.
Where: for EACH of these entry lines (each appears once; search, do not read the whole file):
- `  "main-sewer-line-clogged-in-dallas-warning-signs": {`
- `  "sewer-backup-in-fort-worth-what-it-means-and-who-to-call": {`
- `  "emergency-sewer-help-in-garland-signs-and-next-steps": {`
find the FIRST line `    extraLinks: [` below the entry line and insert this line directly BELOW it:
```ts
      { label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" },
```
Change nothing else.
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `href: "/tools/sewer-line-repair-cost-calculator" }` exactly 7 times.

---

## PH-044 - Links into the slab leak repair cost calculator from 2 leak posts - Status: OPEN
File: `src/data/pageEnhancements.ts`
Why: /tools/slab-leak-repair-cost-calculator has 1,204 impressions at position 22.1. Two water-meter leak posts don't link to it yet.
Where: for EACH of these entry lines (each appears once; search, do not read the whole file):
- `  "how-to-check-your-water-meter-for-a-hidden-leak-dallas": {`
- `  "water-leak-between-meter-and-house-dallas-who-fixes-it": {`
find the FIRST line `    extraLinks: [` below the entry line and insert this line directly BELOW it:
```ts
      { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" },
```
Change nothing else.
Done when: `npm run build` passes and `src/data/pageEnhancements.ts` contains `href: "/tools/slab-leak-repair-cost-calculator" }` exactly 7 times.

---

## PH-045 - New blog post: plumbing permit in San Antonio, can a homeowner pull it - Status: WRITER
Files: `src/data/blogPosts.ts`, `src/data/pageEnhancements.ts`, `src/data/seoOverrides.ts`, `src/data/contentDates.ts`
Goal: one new blog post at `/blog/san-antonio-plumbing-permit-homeowner-or-plumber`. Search intent: "san antonio plumbing permit homeowner" / "can i pull my own plumbing permit san antonio". Gap: no PH page covers San Antonio permits, and the San Antonio 24-hour page has 1,353 impressions (position 23.2). The page renders from these 4 data files; the hero image is picked automatically from `relatedServiceSlug`. Copy the shape of PH-037 (`sawsWaterLeakSanAntonioPost`) exactly and use these anchors only (other tasks edit other spots in the same files).
1. `src/data/blogPosts.ts`: directly after the line `blogPosts.push(sawsWaterLeakSanAntonioPost);`, add a new post copying the shape of `sawsWaterLeakSanAntonioPost` exactly, then `blogPosts.push(sanAntonioPlumbingPermitPost);`. Use exactly:
   - const name `sanAntonioPlumbingPermitPost`
   - slug `san-antonio-plumbing-permit-homeowner-or-plumber`
   - title `Plumbing Permit in San Antonio: Can a Homeowner Pull It?`
   - directAnswer `Only in one case. The City of San Antonio says a homeowner can apply for a plumbing permit for an existing home only if it is their homestead and they will personally do the work. Otherwise, a trade contractor licensed by the city or state and registered with the city can obtain the plumbing permit on the homeowner's behalf.`
   - category `Cost and decision guides`, relatedServiceSlug `24-hour-emergency-plumber`
2. `src/data/pageEnhancements.ts` (search, do not read whole): find the line `  "saws-water-leak-who-fixes-it-san-antonio": {`; after that entry's closing `  },` add a new entry keyed `"san-antonio-plumbing-permit-homeowner-or-plumber"`, copying its fields exactly (checklistTitle, checklistIntro, checklistItems, proofTitle, proofItems, extraFaqs, extraLinks). Plain, human copy, ONLY these facts, all from the City of San Antonio Development Services residential permits page (https://www.sa.gov/Directory/Departments/DSD/Constructing/Residential/Permits), no prices, no fees, no timelines, no guarantees, no phone numbers:
   - checklistTitle `Can you pull the plumbing permit yourself?`; intro + 5 items: a homeowner can only apply for a plumbing permit for an existing residence if it is their homestead and they will personally be doing the work; the city refers homeowners to its Plumbing Homeowner Affidavit; the homeowner plumbing permit row is only for an existing homestead and asks for proof of ownership; the city also says that for your safety you must use licensed trade contractors for new electrical, plumbing and/or HVAC project components; trade contractors licensed by the city or state and registered with the city may obtain trade permits on behalf of the homeowner.
   - proofTitle `Before plumbing work starts in San Antonio`; 4 items: the city's plumbing application is titled "Plumbing, Gas and Sewer Permit"; a project may need several permits (building, electrical, mechanical and plumbing) depending on its scope, and the city's example is a deck with a ceiling fan and sink, which needs building, electrical and plumbing permits; ask your plumber to confirm they are licensed and registered with the city, and who will pull the permit; keep a copy of the permit with your home records.
   - extraFaqs (3): "Can a homeowner pull a plumbing permit in San Antonio?" (only for an existing home that is their homestead, doing the work personally; the city points to its Plumbing Homeowner Affidavit); "Who can pull a plumbing permit for me in San Antonio?" (a trade contractor licensed by the city or state and registered with the city); "Is a gas or sewer job a separate permit in San Antonio?" (the city's plumbing application is titled "Plumbing, Gas and Sewer Permit"; ask your licensed plumber to confirm what your job needs).
   - extraLinks (5): `{ label: "24-hour emergency plumber", href: "/services/24-hour-emergency-plumber" }`, `{ label: "24-hour emergency plumber in San Antonio", href: "/cities/san-antonio/24-hour-emergency-plumber" }`, `{ label: "How to verify a Texas plumber's license", href: "/blog/how-to-verify-a-texas-plumbers-license" }`, `{ label: "Water leak at your San Antonio home: who fixes it", href: "/blog/saws-water-leak-who-fixes-it-san-antonio" }`, `{ label: "San Antonio service area", href: "/cities/san-antonio" }`
   - Links in: in BOTH entries `"saws-water-leak-who-fixes-it-san-antonio"` and `"how-to-verify-a-texas-plumbers-license"`, find the FIRST line `    extraLinks: [` below the entry line and insert directly BELOW it: `      { label: "Plumbing permit in San Antonio: can a homeowner pull it?", href: "/blog/san-antonio-plumbing-permit-homeowner-or-plumber" },`
3. `src/data/seoOverrides.ts`: directly after the 3-line `"/blog/saws-water-leak-who-fixes-it-san-antonio"` entry, add, same shape:
   `"/blog/san-antonio-plumbing-permit-homeowner-or-plumber": { description: "Can you pull your own plumbing permit in San Antonio? Only for your homestead, doing the work yourself. Otherwise a licensed, registered plumber pulls it." },`
4. `src/data/contentDates.ts`: directly after the line for `"/blog/saws-water-leak-who-fixes-it-san-antonio"` add `"/blog/san-antonio-plumbing-permit-homeowner-or-plumber": "2026-11-13",`
Done when: `npm run build` passes and `.next/server/app/blog/san-antonio-plumbing-permit-homeowner-or-plumber.html` exists and contains `Before plumbing work starts in San Antonio`.

---
