# ARTICLE-WRITER — PlumbingHands gap articles (gaps #3–15)

**Job file for the DeepSeek Harness (DSH) Article Writer agent.**
Written by Muse (in Claude's seat in the DSH route) on 2026-11-20. Gaps #1–2 were already drafted by Muse on 2026-11-20 — do NOT re-write them (see below).
**How to run:** Sunny copies this file to `ppc-website docs/dsh/agents/ARTICLE-WRITER.md`, adds the TASKS.md entry at the bottom, then in the DSH app sets Workspace = the ppc-website repo, Sandbox: **Workspace Write — never Full access**, picks the ARTICLE-WRITER agent, sets the model (default: Gemini 3.1 Flash Lite, auto fallbacks), and pastes the "Copy this message" block below.
**Branch:** `dsh/<date>-ARTICLE-WRITER-gaps` (e.g. dsh/2026-11-21-ARTICLE-WRITER-gaps).
**Pace:** 1–2 articles per run/day, in ranked order. One report card per batch: `docs/dsh/reports/<date>-ARTICLE-WRITER-gaps.md`. Update this job file and TASKS.md after each batch, and add a dated entry to the handoff log.

## Task

Write the remaining genuine content-gap articles for PlumbingHands.com (plumbinghands.com, Next.js, DFW plumbing), from the Day 33 gap audit (2026-11-20, sitemap ground truth). Work through the ranked list below in order, 1–2 articles per run. Each article is a new page under `/blog/` with a descriptive long-tail slug (the Days 21–32 posts live under `/blog/` — match that convention). Check the live sitemap before writing each slug so it does not collide with anything live.

**Already done — do not redo:** Gap #1 (sewer camera inspection) and Gap #2 (toilet running constantly) were drafted by Muse on 2026-11-20 and are held by Muse — if Sunny wants them in the repo he will add them; the agent must NOT write them again.

## Ranked gaps to write (#3–#15)

3. How to thaw frozen pipes safely (DFW) — the emergency action after a freeze; the existing frozen-pipes post is prevention-only.
4. Dripping / leaking faucet repair — kitchen & bathroom (DFW). **SCOPE HOLD — do not write this one yet.** The exact official 8-service set is not in the project memory; confirm faucet repair is in scope first, and flag the question in the report card.
5. Toilet leaking at the base / wax-ring failure signs.
6. Water leaking under the kitchen or bathroom sink — first checks.
7. Tankless water heater flush & descale maintenance (DFW hard water).
8. What size tankless water heater do I need (DFW).
9. Cast-iron drain pipe replacement (DFW older homes).
10. PEX vs copper repipe (DFW).
11. How to flush / drain a conventional water heater — sediment (DFW).
12. Shower-head low pressure / clogged shower head. **SCOPE HOLD — same as #4.** Flag in the report card; write the others first.
13. Water-heater flue & carbon-monoxide warning signs.
14. Garbage disposal jammed — reset button & when it's dead.
15. Sewer line bellied / sagging — signs & repair options.

**Deliberately NOT gaps (never write these):** sump pump; water-softener / backflow / septic / sprinkler topics (out of scope); any of the 284 deprioritized city-service combos; topics already covered live (hose-bib, hydro-jetting vs snaking, tankless troubleshooting, whole-house low pressure, repipe cost, water-heater age/lifespan).

## Rules (from the SEO project memory and the live site)

- Long-tail keywords related to the service; humanized content, not generic AI filler; optimizable content.
- **Never invent data, prices, statistics, or claims.** Only verified facts (live site content, InterNACHI, EPA WaterSense, TSBPE/TDI/EPA WaterSense guidance). Where a cost is discussed, give a clearly-labelled typical range ONLY if the site's own cost guides support it; otherwise say costs vary and must be confirmed with the matched provider.
- Disclaimer-led tone like the live site: "matched provider", "should be confirmed directly with the matched provider", no guaranteed pricing, no "licensed roofer"-style guarantees.
- **Structure (follow the live guides):** disclaimer box up top ("for informational purposes only... does not constitute professional plumbing or insurance advice"), short summary paragraph, 4–5 numbered H2 sections, a "Sources" line (real sources as text), a call CTA (Call 1 844-397-8298), a "Keep Reading" list of pages verified live in the sitemap, and an FAQ section with 4–6 schema-ready Q&As (the live guides currently lack FAQs — new posts must include one).
- **Titles under 60 characters** (the site has a known title-length problem — do not add to it).
- Every article needs a relevant image: a fresh Pexels photo matching the topic (record the Pexels search term in the file). Do NOT copy, duplicate, or reuse the site's existing images. Images go in the GitHub `public/` folder — the site only serves images from there.
- **Safety rules (DSH route):** never force-push, never delete files, smallest correct change, never put API keys, passwords, ID numbers or bank details in files, commits or chats. Run `npm run build` and `npm test` before finishing; both must pass.

## Acceptance test (per batch)

- [ ] 1–2 new articles written under `/blog/` with long-tail slugs that do not collide with live URLs.
- [ ] Each article: disclaimer, summary, 4–5 numbered sections, Sources line, call CTA, Keep Reading (live pages only), FAQ section, title < 60 chars, Pexels image recorded.
- [ ] No invented prices, statistics, or claims; no out-of-scope topics; gaps #4 and #12 NOT written (scope hold flagged).
- [ ] `npm run build` passes, `npm test` passes.
- [ ] Report card written: `docs/dsh/reports/<date>-ARTICLE-WRITER-gaps.md` (what was written, files changed, what is left, what failed), this job file and TASKS.md updated, handoff-log entry added.

## Copy this message (Sunny pastes this into the DSH app)

> You are the ARTICLE-WRITER agent. Read the job file docs/dsh/agents/ARTICLE-WRITER.md and do the next batch (1–2 articles) from the ranked gap list, in order, skipping the two SCOPE HOLD items (#4 and #12) and flagging them in your report card. Follow all rules in the job file exactly — structure, no invented data, titles under 60 characters, FAQ section, Pexels image recorded, Keep Reading links verified live. Work on branch dsh/<today's date>-ARTICLE-WRITER-gaps. Run npm run build and npm test; both must pass. Never force-push, never delete files, never put secrets in files, commits or chats. When done, write the report card to docs/dsh/reports/<today's date>-ARTICLE-WRITER-gaps.md, update the job file and TASKS.md, and add a dated handoff-log entry.

## TASKS.md entry (add to docs/dsh/tasks/TASKS.md)

`- [ ] ARTICLE-WRITER gaps #3–15 — PlumbingHands gap articles, 1–2 per day in ranked order (#4, #12 on scope hold). Status: assigned 2026-11-20. Job file: docs/dsh/agents/ARTICLE-WRITER.md.`
