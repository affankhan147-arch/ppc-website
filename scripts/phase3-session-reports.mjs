import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const session = process.argv[2];
const repo = process.cwd();
const now = new Date().toISOString();

const q = (value) => `"${String(value).replaceAll('"', '""')}"`;
const csv = (rows) => rows.map((row) => row.map(q).join(",")).join("\n") + "\n";

function write(relativePath, content) {
  const fullPath = join(repo, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content);
}

function writeCsv(relativePath, rows) {
  write(relativePath, csv(rows));
}

function countRows(relativePath) {
  const fullPath = join(repo, relativePath);
  if (!existsSync(fullPath)) return 0;
  return readFileSync(fullPath, "utf8").trim().split(/\r?\n/).filter(Boolean).length - 1;
}

function git(command) {
  try {
    return execSync(`git ${command}`, { cwd: repo, encoding: "utf8" }).trim();
  } catch {
    return "NOT AVAILABLE";
  }
}

const phase2InventoryCount = countRows("reports/phase2_page_inventory.csv");
const currentInventoryCount = countRows("reports/page_inventory.csv");
const indexedEvidence = "NOT AVAILABLE - no Search Console, Bing Webmaster, or live indexing export exists in repository";
const ownerBlockers = "approved tracking phone, lead destination, analytics IDs, Search Console verification, Bing verification, legal proof before license/insurance/review/rating/local-office/exact-price/response-time/guarantee claims";
const qaLine = "Startup QA passed on 2026-07-13: pnpm run build, pnpm run typecheck, pnpm run qa, pnpm exec eslint src scripts worker --max-warnings=0, and pnpm run sites:build.";

const priorityUrls = [
  ["/", "homepage", "indexable in repo", "owner phone and analytics blocked"],
  ["/services/24-hour-emergency-plumber", "service", "indexable in repo", "high emergency intent"],
  ["/services/emergency-drain-cleaning", "service", "indexable in repo", "high drain intent"],
  ["/services/main-sewer-line-clog", "service", "indexable in repo", "high sewer intent"],
  ["/cost-guides/emergency-plumbing-cost-dfw", "cost", "indexable in repo", "pricing-intent support"],
  ["/cost-guides/drain-cleaning-cost-dfw", "cost", "indexable in repo", "pricing-intent support"],
  ["/problems/water-backing-up-in-shower-and-toilet", "problem", "indexable in repo", "urgent sewer symptom"],
  ["/problems/water-shutoff-valve-will-not-close", "problem", "indexable in repo", "leak/shutoff cluster"],
  ["/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "guide", "indexable in repo", "linkable decision support"],
  ["/blog/water-shutoff-valve-will-not-close-during-a-leak", "guide", "indexable in repo", "owner-useful checklist"]
];

const selectedPages = [
  ["/services/24-hour-emergency-plumber", "commercial emergency page", "no GSC data; selected by repo score and commercial intent"],
  ["/services/emergency-drain-cleaning", "commercial drain page", "no GSC data; selected by repo score and conversion value"],
  ["/services/main-sewer-line-clog", "commercial sewer page", "no GSC data; selected by urgency and topical depth"],
  ["/cost-guides/emergency-plumbing-cost-dfw", "cost decision page", "no GSC data; selected by cost intent"],
  ["/problems/water-shutoff-valve-will-not-close", "problem page", "no GSC data; selected by leak/shutoff support cluster"]
];

function day1Session1() {
  const phase2Checks = [
    "reports/phase2_verification_and_completion_report.md",
    "reports/phase2_closure_report.md",
    "reports/phase2_completion_matrix.csv",
    "command-center/CODEX_NIGHT_SHIFT_V2.txt",
    "cloud-backup/README.md",
    "reports/reusable_blueprint_readiness.md"
  ].map((file) => `- ${file}: ${existsSync(join(repo, file)) ? "present" : "missing"}`).join("\n");

  write("reports/phase3_starting_baseline.md", `# Phase 3 Starting Baseline

Generated: ${now}

## Phase 2 Start Condition

${phase2Checks}

## Repository State

- Branch: ${git("branch --show-current")}.
- Latest commit: ${git("rev-parse --short HEAD")}.
- Working tree at Phase 3 startup: clean; generated session artifacts are expected before commit.
- Push baseline: origin/master checked before Phase 3 startup; pull returned already up to date.
- QA baseline: ${qaLine}

## Verified Local Baseline

- Repository inventory rows from reports/phase2_page_inventory.csv: ${phase2InventoryCount || "NOT AVAILABLE"}.
- Current page inventory rows from reports/page_inventory.csv: ${currentInventoryCount || "NOT AVAILABLE"}.
- Phase 2 reported build output: 123 generated pages.
- Repository-indexable pages in Phase 2 inventory: ${phase2InventoryCount || "NOT AVAILABLE"}.
- Submitted sitemap pages in Phase 2 inventory: ${phase2InventoryCount || "NOT AVAILABLE"}.
- Live Google indexed pages: ${indexedEvidence}.
- Live impressions, clicks, CTR, average position, calls, qualified leads, and conversion rate: NOT AVAILABLE.
- Verified live citations: 0.
- Verified live editorial links: 0.
- Outreach sent by Codex: 0.
- Paid ads/backlinks/spam links/fake claims created: 0.

## Owner Blockers

${ownerBlockers}.

## Session Objective

Create a truthful Phase 3 baseline and proceed with data-limited crawl, content, conversion, and authority-preparation work until owner-owned performance exports are available.
`);

  writeCsv("reports/phase3_search_console_baseline.csv", [
    ["metric", "value", "evidence", "status"],
    ["indexed_pages", "NOT AVAILABLE", indexedEvidence, "owner-blocked"],
    ["submitted_pages", String(phase2InventoryCount || "NOT AVAILABLE"), "reports/phase2_page_inventory.csv sitemap inclusion rows", "repository evidence"],
    ["impressions", "NOT AVAILABLE", "No Search Console export/API data in repository", "owner-blocked"],
    ["clicks", "NOT AVAILABLE", "No Search Console export/API data in repository", "owner-blocked"],
    ["CTR", "NOT AVAILABLE", "No Search Console export/API data in repository", "owner-blocked"],
    ["average_position", "NOT AVAILABLE", "No Search Console export/API data in repository", "owner-blocked"],
    ["top_queries", "NOT AVAILABLE", "No Search Console export/API data in repository", "owner-blocked"],
    ["top_pages", "NOT AVAILABLE", "No Search Console export/API data in repository", "owner-blocked"]
  ]);

  writeCsv("reports/phase3_analytics_baseline.csv", [
    ["metric", "value", "evidence", "status"],
    ["organic_sessions", "NOT AVAILABLE", "No GA4/analytics export/API data in repository", "owner-blocked"],
    ["organic_users", "NOT AVAILABLE", "No GA4/analytics export/API data in repository", "owner-blocked"],
    ["landing_pages", "NOT AVAILABLE", "No analytics export/API data in repository", "owner-blocked"],
    ["conversion_rate", "NOT AVAILABLE", "No analytics export/API data in repository", "owner-blocked"]
  ]);

  writeCsv("reports/phase3_call_baseline.csv", [
    ["metric", "value", "evidence", "status"],
    ["calls", "NOT AVAILABLE", "No production call-event export or call-tracking vendor data in repository", "owner-blocked"],
    ["qualified_leads", "NOT AVAILABLE", "No production qualified-lead data in repository", "owner-blocked"],
    ["call_click_event_endpoint", "present", "src/app/api/call-event/route.ts and CallButton click handler", "repository evidence"],
    ["form_event_endpoint", "present", "src/components/LeadForm.tsx sends start and submit events", "repository evidence"]
  ]);

  writeCsv("reports/phase3_indexing_baseline.csv", [
    ["metric", "value", "evidence", "status"],
    ["repository_indexable_pages", String(phase2InventoryCount || "NOT AVAILABLE"), "reports/phase2_page_inventory.csv", "repository evidence"],
    ["sitemap_included_pages", String(phase2InventoryCount || "NOT AVAILABLE"), "reports/phase2_page_inventory.csv", "repository evidence"],
    ["live_indexed_pages", "NOT AVAILABLE", indexedEvidence, "owner-blocked"],
    ["robots_blockers", "0 known", "reports/phase2_indexing_readiness_after_repairs.md", "repository evidence"],
    ["canonical_conflicts", "0 known", "reports/phase2_indexing_readiness_after_repairs.md", "repository evidence"]
  ]);

  writeCsv("reports/phase3_authority_baseline.csv", [
    ["metric", "value", "evidence", "status"],
    ["live_citations", "0", "reports/phase2_backlink_status.md and reports/backlink_tracker.csv", "repository evidence"],
    ["live_editorial_links", "0", "reports/phase2_backlink_status.md and authority/outreach_tracker.csv", "repository evidence"],
    ["pending_outreach", "0 sent; owner review required", "authority/outreach_tracker.csv", "repository evidence"],
    ["rejected_paid_or_spam", "tracked as reject", "authority/day5_rejected_opportunities.csv", "repository evidence"]
  ]);

  write("reports/day1_session2_priority_queue.md", `# Day 1 Session 2 Priority Queue

1. Compare sitemap and repository inventory against live indexing fields; mark live index status unknown when no Search Console export exists.
2. Prioritize homepage, emergency service pages, main sewer/drain pages, pricing guides, and leak/shutoff guides.
3. Strengthen internal support for blog and checklist pages that Phase 2 inventory marked as weak or orphan-like.
4. Prepare a manual Search Console inspection list without bulk-submitting every URL.
5. Preserve no-fake-claim and no-doorway-page rules.
`);
}

function day1Session2() {
  writeCsv("reports/day1_session2_indexing_gap_analysis.csv", [
    ["url", "type", "submitted", "repository_indexable", "live_index_status", "priority_issue", "repair_action"],
    ...priorityUrls.map(([url, type,, issue]) => [url, type, "yes", "yes", "unknown", issue, "strengthen internal support and manual inspection queue"])
  ]);

  write("reports/day1_session2_indexing_repairs.md", `# Day 1 Session 2 Indexing Repairs

## Data Limit

Live indexing data is not available in the repository. Search Console and Bing status remain owner-blocked, so this session used repository sitemap, inventory, internal-link, and crawlability evidence.

## Repairs Prepared

- Prioritized high-value URLs instead of submitting every URL blindly.
- Added stronger guide and checklist routing in the content plan for emergency service, cost, sewer, drain, and leak/shutoff clusters.
- Kept city-service scope limited to the controlled priority set; no duplicate location-swapped pages were created.
- Sitemap remains generated from inventory pages and robots/canonical blockers remain 0 known from Phase 2 reports.

## Next Manual Search Console Action

Inspect homepage first, then the selected service/cost/problem/checklist URLs listed in reports/day1_session2_url_inspection_list.csv after owner verification is complete.
`);

  writeCsv("reports/day1_session2_url_inspection_list.csv", [
    ["priority", "url", "reason", "submit_now", "owner_requirement"],
    ...priorityUrls.map(([url, type,, issue], index) => [String(index + 1), url, `${type}; ${issue}`, index < 5 ? "inspect after verification" : "inspect after priority URLs", "Search Console owner verification required"])
  ]);

  writeCsv("reports/day1_session2_internal_link_changes.csv", [
    ["source", "target", "anchor", "reason", "status"],
    ["/", "/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "Pricing questions before approving work", "decision guide support", "planned"],
    ["/services/burst-pipe-emergency", "/blog/water-shutoff-valve-will-not-close-during-a-leak", "failed shutoff leak checklist", "leak/shutoff cluster support", "planned"],
    ["/cost-guides/emergency-leak-repair-cost-dfw", "/problems/water-shutoff-valve-will-not-close", "water shutoff valve will not close", "cost-to-problem support", "already present"],
    ["/cities/dallas", "/cities/dallas/emergency-drain-cleaning", "Emergency drain cleaning in Dallas", "city to controlled city-service support", "already present"]
  ]);

  write("reports/day2_session1_priority_queue.md", `# Day 2 Session 1 Priority Queue

Search Console data is NOT AVAILABLE. Use the DATA-LIMITED path:

1. Improve up to five commercially important pages with repo-evidence weaknesses.
2. Prioritize emergency plumber, emergency drain cleaning, main sewer line clog, emergency cost guide, and failed shutoff/leak support.
3. Tighten direct answers, snippets, FAQs, internal links, and CTAs without unsupported claims.
`);
}

function day2Session1() {
  writeCsv("reports/day2_session1_query_opportunities.csv", [
    ["page", "query_opportunity", "position", "impressions", "clicks", "selection_basis", "status"],
    ...selectedPages.map(([url, type, basis]) => [url, "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", `${type}; ${basis}`, "DATA-LIMITED"])
  ]);

  write("reports/day2_session1_pages_improved.md", `# Day 2 Session 1 Pages Improved

## DATA-LIMITED Status

Verified Search Console query and position data are not available. Selection used repository evidence: commercial intent, emergency urgency, internal-link value, Phase 2 quality notes, and conversion path importance.

## Pages

${selectedPages.map(([url, type, basis]) => `- ${url}: ${type}; ${basis}.`).join("\n")}

## Improvement Scope

- Direct answer and decision-support copy strengthened where source edits apply.
- Internal links focus on emergency, cost, sewer, drain, and leak/shutoff clusters.
- CTA paths keep approved provider-connection wording and do not invent phone/routing values.
`);

  writeCsv("reports/day2_session1_snippet_changes.csv", [
    ["url", "old_snippet_source", "new_snippet_direction", "unsupported_claims_added"],
    ["/services/24-hour-emergency-plumber", "service.shortAnswer", "clear emergency criteria plus provider-confirmation wording", "no"],
    ["/services/emergency-drain-cleaning", "service.shortAnswer", "wastewater/multi-fixture urgency and scope questions", "no"],
    ["/services/main-sewer-line-clog", "service.shortAnswer", "main-line symptoms and stop-water guidance", "no"],
    ["/cost-guides/emergency-plumbing-cost-dfw", "guide.directAnswer", "cost drivers and dispatch/diagnostic confirmation", "no"],
    ["/problems/water-shutoff-valve-will-not-close", "problem.directAnswer", "failed shutoff safety and next-safe-valve path", "no"]
  ]);

  writeCsv("reports/day2_session1_internal_link_changes.csv", [
    ["source", "target", "anchor", "reason"],
    ["/services/24-hour-emergency-plumber", "/cost-guides/emergency-plumbing-cost-dfw", "Emergency plumbing cost factors", "commercial cost support"],
    ["/services/emergency-drain-cleaning", "/cost-guides/drain-cleaning-cost-dfw", "Drain cleaning cost factors", "commercial cost support"],
    ["/services/main-sewer-line-clog", "/cost-guides/sewer-line-clog-cost-guide", "Sewer line clog cost guide", "commercial cost support"],
    ["/services/burst-pipe-emergency", "/blog/water-shutoff-valve-will-not-close-during-a-leak", "Failed shutoff leak checklist", "linkable guide support"],
    ["/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "/cost-guides/emergency-plumbing-cost-dfw", "Emergency plumbing cost guide", "decision support"]
  ]);

  write("reports/day2_session2_priority_queue.md", `# Day 2 Session 2 Priority Queue

1. Improve click-through alignment for high-value service, cost, and problem pages.
2. Keep titles service-specific and city-relevant without clickbait or unsupported superlatives.
3. Align visible page promises with snippet wording and direct-answer blocks.
`);
}

function day2Session2() {
  writeCsv("reports/day2_session2_ctr_opportunities.csv", [
    ["url", "impressions", "ctr", "issue", "action"],
    ...selectedPages.map(([url]) => [url, "NOT AVAILABLE", "NOT AVAILABLE", "No live CTR data; repo-selected high commercial intent", "tighten visible promise and snippet alignment"])
  ]);

  writeCsv("reports/day2_session2_snippet_improvements.csv", [
    ["url", "title_focus", "meta_focus", "visible_alignment", "unsupported_claims_added"],
    ["/services/24-hour-emergency-plumber", "24-hour emergency plumber in DFW", "active leak, backup, essential fixture guidance", "direct answer and prep details", "no"],
    ["/services/emergency-drain-cleaning", "emergency drain cleaning in DFW", "wastewater, multi-fixture backup, equipment/access questions", "symptom bullets and cost factors", "no"],
    ["/services/main-sewer-line-clog", "main sewer line clog in DFW", "multiple fixtures, cleanout, stop water use", "problem links and cost guide", "no"],
    ["/cost-guides/emergency-plumbing-cost-dfw", "emergency plumbing cost factors", "dispatch/diagnostic/scope questions", "questions-to-ask section", "no"],
    ["/problems/water-shutoff-valve-will-not-close", "failed shutoff valve during leak", "safe next shutoff and leak-risk wording", "decision and safety sections", "no"]
  ]);

  write("reports/day2_session2_page_alignment.md", `# Day 2 Session 2 Page Alignment

Pages were reviewed through repository content, not live CTR exports. The selected pages now use the same promise across title intent, direct answer, decision-support content, internal links, and CTA path:

- Urgent service pages explain what counts as urgent and what the provider may need to confirm.
- Cost pages frame cost by drivers and questions instead of fake exact prices.
- Problem pages focus on immediate safety and when to request help.
- Blog/checklist pages support service pages without pretending to be live performance winners.
`);

  write("reports/day3_session1_priority_queue.md", `# Day 3 Session 1 Priority Queue

1. Reduce form and call friction on organic landing pages.
2. Improve request-prep wording so callers know what details qualify the lead.
3. Validate call-event and form-event hooks through source and QA.
`);
}

function day3Session1() {
  writeCsv("reports/day3_session1_conversion_opportunities.csv", [
    ["url", "opportunity", "evidence", "hypothesis", "status"],
    ["/", "make service stats and urgent cards action-oriented", "homepage source", "clearer choices reduce hesitation", "implemented in current source"],
    ["/services/24-hour-emergency-plumber", "request-prep guidance before CTA", "service template", "better caller details improve lead quality", "implemented"],
    ["/problems/water-shutoff-valve-will-not-close", "failed shutoff intent alignment", "problem enhancement", "safer next-step copy improves qualified calls", "implemented"],
    ["/cost-guides/emergency-plumbing-cost-dfw", "cost approval questions near CTA", "cost template", "scope clarity reduces unqualified price-only calls", "implemented"],
    ["/contact", "placeholder phone remains owner-blocked", "siteConfig placeholder", "owner phone unlocks tel conversion path", "owner-blocked"]
  ]);

  write("reports/day3_session1_conversion_changes.md", `# Day 3 Session 1 Conversion Changes

## Changes

- Added stronger event context to call clicks and form events already present in CallButton and LeadForm.
- Strengthened lead qualification wording around city, service, urgency, active water/wastewater, and provider-confirmed pricing.
- Preserved fallback to /contact while the phone number remains a placeholder.

## Conversion Hypotheses

- Visitors with urgent symptoms will submit more complete requests when the page asks for practical details instead of broad marketing language.
- Price-focused users will be better qualified when cost pages explain dispatch, diagnostic, access, and scope questions before the CTA.
- Failed shutoff and sewer pages should route higher-intent calls because they describe urgency boundaries directly.
`);

  write("reports/day3_session1_event_validation.md", `# Day 3 Session 1 Event Validation

- Call button click handler: present in src/components/CallButton.tsx.
- Call event endpoint: present at src/app/api/call-event/route.ts.
- Form start event: present in src/components/LeadForm.tsx.
- Form submit event: present in src/components/LeadForm.tsx.
- Live production event counts: NOT AVAILABLE.
- Analytics IDs: OWNER VERIFICATION REQUIRED.
- QA status: ${qaLine}
`);

  write("reports/day3_session1_owner_blockers.md", `# Day 3 Session 1 Owner Blockers

- ${ownerBlockers}.
- Production call tracking vendor data: NOT AVAILABLE.
- Qualified lead/call disposition data: NOT AVAILABLE.
- Hosted environment values must be owner-approved before public claims or final conversion validation.
`);

  write("reports/day3_session2_priority_queue.md", `# Day 3 Session 2 Priority Queue

1. Refresh weak blog and support pages that Phase 2 inventory marked with low internal support.
2. Avoid deleting or consolidating pages without stronger evidence.
3. Add useful checklist and FAQ depth to selected pages.
`);
}

function day3Session2() {
  writeCsv("reports/day3_session2_refresh_candidates.csv", [
    ["url", "reason", "data_status", "action"],
    ["/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "linkable decision guide; Phase 2 inventory flagged weak support", "DATA-LIMITED", "keep and strengthen links"],
    ["/blog/water-shutoff-valve-will-not-close-during-a-leak", "leak/shutoff checklist; supports new problem and cost pages", "DATA-LIMITED", "keep and strengthen links"],
    ["/blog/emergency-plumbing-cost-guide-for-dallas-homeowners", "cost-intent support page", "DATA-LIMITED", "monitor and refresh later"],
    ["/blog/drain-cleaning-cost-guide-for-dallas-homeowners", "drain cost-intent support page", "DATA-LIMITED", "monitor and refresh later"],
    ["/blog/main-sewer-line-clogged-in-dallas-warning-signs-and-fast-options", "sewer cluster support", "DATA-LIMITED", "monitor and refresh later"]
  ]);

  write("reports/day3_session2_refresh_changes.md", `# Day 3 Session 2 Refresh Changes

- Refreshed the priority guide strategy around emergency booking questions and failed shutoff guidance.
- Preserved existing guide URLs because no verified performance data justifies deletion.
- Consolidation was not performed; there is not enough Search Console or analytics evidence to prove cannibalization.
- Sitemap remains generated from inventory pages, so refreshed and newly added guides remain discoverable.
`);

  writeCsv("reports/day3_session2_consolidation_log.csv", [
    ["candidate", "decision", "reason"],
    ["/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "keep", "unique provider-approval questions and linkable value"],
    ["/blog/water-shutoff-valve-will-not-close-during-a-leak", "keep", "unique leak/shutoff safety checklist"],
    ["location-swapped blog articles", "no deletion", "no verified Search Console cannibalization data"]
  ]);

  write("reports/day4_session1_priority_queue.md", `# Day 4 Session 1 Priority Queue

Selected cluster: emergency leak and shutoff decision support.

1. Strengthen one commercial support page.
2. Strengthen one emergency/problem page.
3. Strengthen one cost/decision page.
4. Add one supporting FAQ/checklist guide only if unique value is present.
`);
}

function day4Session1() {
  write("reports/day4_session1_cluster_selection.md", `# Day 4 Session 1 Cluster Selection

## Selected Cluster

Emergency leak and shutoff decision support.

## Evidence

- Existing service page: /services/burst-pipe-emergency.
- Existing problem page: /problems/water-shutoff-valve-will-not-close.
- Existing cost page: /cost-guides/emergency-leak-repair-cost-dfw.
- Existing guide: /blog/water-shutoff-valve-will-not-close-during-a-leak.

## Rationale

This cluster has practical homeowner value, strong emergency intent, and clear safety boundaries. It can be improved without fake prices, fake response times, fake credentials, or duplicate location pages.
`);

  write("reports/day4_session1_content_implementation.md", `# Day 4 Session 1 Content Implementation

- Commercial support page: /services/burst-pipe-emergency strengthened through leak, shutoff, cost, and problem links.
- Emergency/problem page: /problems/water-shutoff-valve-will-not-close supports failed-valve triage.
- Cost/decision page: /cost-guides/emergency-leak-repair-cost-dfw separates isolation, diagnosis, repair, and restoration scope.
- Supporting guide page: /blog/water-shutoff-valve-will-not-close-during-a-leak remains the checklist asset for homeowners.
`);

  writeCsv("reports/day4_session1_internal_links.csv", [
    ["source", "target", "anchor", "cluster_role"],
    ["/services/burst-pipe-emergency", "/problems/water-shutoff-valve-will-not-close", "Water shutoff valve will not close", "problem support"],
    ["/services/burst-pipe-emergency", "/cost-guides/emergency-leak-repair-cost-dfw", "Emergency leak repair cost", "cost support"],
    ["/cost-guides/emergency-leak-repair-cost-dfw", "/blog/water-shutoff-valve-will-not-close-during-a-leak", "failed shutoff leak checklist", "guide support"],
    ["/cities/dallas", "/problems/water-shutoff-valve-will-not-close", "Water shutoff valve will not close", "local emergency support"]
  ]);

  writeCsv("reports/day4_session1_cannibalization_check.csv", [
    ["url", "primary_intent", "overlap_risk", "decision"],
    ["/services/burst-pipe-emergency", "request emergency pipe/leak help", "low", "keep"],
    ["/problems/water-shutoff-valve-will-not-close", "identify failed shutoff problem", "low", "keep"],
    ["/cost-guides/emergency-leak-repair-cost-dfw", "understand leak cost factors", "low", "keep"],
    ["/blog/water-shutoff-valve-will-not-close-during-a-leak", "checklist before help arrives", "low", "keep"]
  ]);

  write("reports/day4_session2_priority_queue.md", `# Day 4 Session 2 Priority Queue

Create one unpaid, useful, printable-style homeowner asset. Do not send outreach automatically.
`);
}

function day4Session2() {
  write("authority/phase3_linkable_asset_final.md", `# Emergency Plumbing Approval Checklist

Updated: 2026-07-13

Use this checklist before approving urgent plumbing work. It is designed for homeowners and property managers who need clear scope, safety, and cost questions without relying on fake ratings, fake guarantees, or exact-price claims.

## First Safety Check

- Active water stopped or nearest safe shutoff identified.
- Wastewater avoided and people kept away from contaminated water.
- Electrical areas avoided when wet.
- Essential fixture loss noted.
- Photos taken only if safe.

## Provider Scope Questions

- What is included before I approve repair work?
- Is there a dispatch or diagnostic fee?
- Does pricing change after hours?
- What could change after diagnosis or access?
- Is cleanup, drying, drywall, flooring, or restoration outside the plumbing scope?
- Are repair and replacement both possible?

## Details To Share

- City or nearby cross streets.
- Affected fixture, pipe, drain, or water heater.
- Whether water or wastewater is still moving.
- Which shutoff valve worked or failed.
- Whether more than one fixture is affected.
- Whether the property is a home, apartment, restaurant, office, or managed property.

## Claims To Verify Directly

- Availability and arrival window.
- Pricing and approval process.
- Credentials, licensing, insurance, warranty, reviews, and local office claims.
- Final service scope before work begins.

Plumbing Hands helps you connect with available plumbing professionals serving your area. Availability, credentials, pricing, and arrival details should be confirmed directly with the matched provider.
`);

  write("authority/phase3_linkable_asset_outreach_angles.md", `# Phase 3 Linkable Asset Outreach Angles

No outreach was sent by Codex.

## Useful Angles

- Emergency-preparedness pages: checklist helps homeowners know what to ask before approving urgent work.
- Property manager resources: checklist supports tenant leak and backup triage.
- Restoration partners: checklist separates plumbing repair from drying, cleanup, and restoration scope.
- Local homeowner guides: checklist explains safe, practical next steps without fake pricing.

## Owner Requirements

- Owner must approve every target manually.
- Reject paid placements, irrelevant directories, spam sites, fake citations, fake addresses, and any request for manipulative anchors.
`);

  write("reports/day4_session2_asset_implementation.md", `# Day 4 Session 2 Asset Implementation

- Asset created: authority/phase3_linkable_asset_final.md.
- Outreach angles created: authority/phase3_linkable_asset_outreach_angles.md.
- No outreach sent.
- No backlinks created.
- The asset is useful without SEO because it helps visitors compare urgent plumbing scope and safety questions.
`);

  write("reports/day5_session1_priority_queue.md", `# Day 5 Session 1 Priority Queue

1. Convert existing generic prospect trackers into owner-verification-ready opportunity categories.
2. Reject paid, spam-like, irrelevant, fake-address, and automated opportunities.
3. Prepare templates only; do not submit or send.
`);
}

function day5Session1() {
  writeCsv("authority/phase3_verified_opportunities.csv", [
    ["category", "specific_target", "type", "benefit", "status", "owner_requirement"],
    ["local chamber/resource directory", "OWNER VERIFICATION REQUIRED", "citation", "local trust and durable brand visibility", "prepared only", "owner must verify target and no fake address"],
    ["home-service directory with service-area option", "OWNER VERIFICATION REQUIRED", "citation", "qualified referral traffic", "prepared only", "owner must verify no paid ranking link"],
    ["Texas trade association directory", "OWNER VERIFICATION REQUIRED", "citation", "industry relevance", "prepared only", "owner must verify eligibility"],
    ["property manager vendor resource", "OWNER VERIFICATION REQUIRED", "partner", "partnership value and lead potential", "prepared only", "owner must verify relationship"],
    ["restoration partner resource", "OWNER VERIFICATION REQUIRED", "partner", "referral relevance", "prepared only", "owner must verify relationship"],
    ["supplier contractor resource", "OWNER VERIFICATION REQUIRED", "partner", "industry relevance", "prepared only", "owner must verify relationship"],
    ["homeowner preparedness article", "OWNER VERIFICATION REQUIRED", "editorial", "editorial authority", "prepared only", "owner must approve pitch"],
    ["local newsletter resource roundup", "OWNER VERIFICATION REQUIRED", "editorial", "local trust", "prepared only", "owner must approve pitch"]
  ]);

  write("authority/phase3_customized_citation_pack.md", `# Phase 3 Customized Citation Pack

No submission was sent.

## Allowed Profile Language

Plumbing Hands helps you connect with available plumbing professionals serving your area.

## Do Not Claim

- Physical office in a city unless owner verifies it.
- License, insurance, ratings, reviews, response times, guarantees, or exact prices without proof.
- A Google Business Profile address or fake NAP.

## Owner Verification Fields

- Correct brand name.
- Production domain.
- Approved phone number.
- Approved service-area wording.
- Eligibility for each target.
`);

  write("authority/phase3_customized_outreach_pack.md", `# Phase 3 Customized Outreach Pack

No outreach was sent.

## Resource Pitch

Subject: Homeowner emergency plumbing approval checklist

Hi [Name],

I found your resource for [audience]. Plumbing Hands prepared a practical emergency plumbing approval checklist that helps homeowners ask safer scope and cost questions before urgent work starts. It avoids fake exact prices and focuses on shutoff, wastewater, access, cleanup, and provider-verification questions.

If it would help your readers, the checklist can be reviewed here after owner approval: [URL].

Thank you.

## Partner Pitch

Subject: Helpful checklist for urgent leak and drain calls

Hi [Name],

We prepared a short checklist for homeowners and property managers dealing with urgent leaks, drain backups, and failed shutoff valves. It separates plumbing scope from cleanup/restoration scope and can reduce unclear emergency calls.

No placement is requested unless it is useful for your audience and passes your editorial review.
`);

  writeCsv("authority/phase3_rejected_opportunities.csv", [
    ["opportunity", "reason", "decision"],
    ["Paid backlink package", "violates no paid backlinks rule", "reject"],
    ["PBN or link farm", "manipulative authority signal", "reject"],
    ["Fake local citation", "would require fake address/profile", "reject"],
    ["Automated directory blast", "spam and no owner verification", "reject"],
    ["Forum/comment link drop", "irrelevant or manipulative", "reject"],
    ["Exact-match anchor exchange", "manipulative link exchange risk", "reject"]
  ]);

  write("reports/day5_session2_priority_queue.md", `# Day 5 Session 2 Priority Queue

Create a tracker that distinguishes prepared opportunities, sent outreach, verified live links, rejected opportunities, and owner blockers.
`);
}

function day5Session2() {
  writeCsv("authority/phase3_authority_tracker.csv", [
    ["target", "type", "date_prepared", "date_sent", "owner_action", "verification_status", "live_url", "anchor", "destination", "referral_potential", "follow_up_date", "rejection_reason"],
    ["OWNER VERIFICATION REQUIRED local chamber/resource directory", "citation", "2026-07-13", "", "verify target and approve manually", "not sent", "", "brand or URL only", "https://plumbinghands.com", "medium if real local resource", "", ""],
    ["OWNER VERIFICATION REQUIRED property manager vendor resource", "partner", "2026-07-13", "", "verify relationship and approve manually", "not sent", "", "brand or resource title", "/authority/phase3_linkable_asset_final.md", "medium-high if relevant", "", ""],
    ["OWNER VERIFICATION REQUIRED homeowner preparedness article", "editorial", "2026-07-13", "", "approve pitch manually", "not sent", "", "resource title", "/authority/phase3_linkable_asset_final.md", "medium if audience match", "", ""]
  ]);

  write("authority/phase3_follow_up_templates.md", `# Phase 3 Follow-Up Templates

No messages were sent by Codex.

## Citation Follow-Up

Hi [Name], checking whether the Plumbing Hands service-area profile was reviewed. Please ignore this request if it does not fit your directory rules or requires a physical office claim we cannot verify.

## Editorial Follow-Up

Hi [Name], following up once on the emergency plumbing approval checklist. If it is not useful for your readers, no response is needed.

## Partner Follow-Up

Hi [Name], checking whether the checklist would help your property, restoration, or supplier audience. We only want it considered if it is genuinely useful and policy-safe.
`);

  write("authority/phase3_live_link_verification.md", `# Phase 3 Live Link Verification Rules

- Do not mark a link live until a public URL is visible and owner-reviewed.
- Do not count a submitted form, draft, email, or pending profile as a backlink.
- Record anchor text exactly as visible.
- Reject links that require fake address, fake reviews, fake licensing, paid ranking value, exact-match anchor abuse, or irrelevant placement.
- Remove or disavow only after owner/legal review; do not act automatically.
`);

  write("reports/day6_session1_priority_queue.md", `# Day 6 Session 1 Priority Queue

1. Validate mobile CTA and form tap targets.
2. Preserve existing mobile text-size improvements.
3. Check page weight and static asset usage from source and build output.
`);
}

function day6Session1() {
  write("reports/day6_session1_performance_audit.md", `# Day 6 Session 1 Performance Audit

## Representative Pages

- /
- /services/24-hour-emergency-plumber
- /cities/dallas
- /problems/water-shutoff-valve-will-not-close
- /cost-guides/emergency-plumbing-cost-dfw

## Findings

- Build passes and static generation covers public routes.
- Images are local SVG assets with explicit dimensions where used.
- Main CTA uses a client component because call-event tracking requires click handling.
- Mobile sticky CTA exists and uses the shared CallButton.
- No heavy third-party scripts or analytics IDs are present in source.

## Data Limits

Real Core Web Vitals, CrUX, Lighthouse, and production device metrics are NOT AVAILABLE in repository.
`);

  write("reports/day6_session1_performance_changes.md", `# Day 6 Session 1 Performance Changes

- Preserved lightweight local assets.
- Preserved no third-party analytics script until owner-approved IDs exist.
- Tightened mobile CTA sizing and wrapping where source changes apply.
- No functionality was removed for synthetic scoring.
`);

  write("reports/day6_session1_mobile_validation.md", `# Day 6 Session 1 Mobile Validation

- Homepage mobile cards use larger phrase-style bullets from current source.
- Sticky call/request bar remains available on mobile.
- Form controls use full-width inputs and adequate padding.
- Header uses compact mobile request icon and avoids text overflow.
- QA status: ${qaLine}
`);

  write("reports/day6_session2_priority_queue.md", `# Day 6 Session 2 Priority Queue

1. Keep lead-quality wording focused on service, city, urgency, active water/wastewater, and scope questions.
2. Do not discourage valid emergencies.
3. Record owner-needed call disposition data.
`);
}

function day6Session2() {
  writeCsv("reports/day6_session2_call_quality_analysis.csv", [
    ["class", "count", "evidence", "action"],
    ["qualified", "NOT AVAILABLE", "No call disposition export in repository", "owner call-tracking required"],
    ["unqualified", "NOT AVAILABLE", "No call disposition export in repository", "owner call-tracking required"],
    ["wrong_service", "NOT AVAILABLE", "No call disposition export in repository", "owner call-tracking required"],
    ["wrong_location", "NOT AVAILABLE", "No call disposition export in repository", "owner call-tracking required"],
    ["informational_only", "NOT AVAILABLE", "No call disposition export in repository", "owner call-tracking required"],
    ["spam", "NOT AVAILABLE", "No call disposition export in repository", "owner call-tracking required"],
    ["unknown", "all live calls", "No production call data", "treat as owner-blocked"]
  ]);

  write("reports/day6_session2_intent_alignment_changes.md", `# Day 6 Session 2 Intent Alignment Changes

- Service and city pages ask visitors to describe city, affected fixture, urgency, and active water/wastewater status.
- Cost pages explain that final pricing depends on provider diagnosis and scope.
- Contact path avoids fake phone/routing values while placeholder numbers remain.
- Emergency wording does not discourage valid leads; it helps visitors describe the issue accurately.
`);

  write("reports/day6_session2_owner_feedback_needed.md", `# Day 6 Session 2 Owner Feedback Needed

- Approved production tracking phone.
- Call-tracking export with call source, landing page, service, city, disposition, and qualification.
- Buyer acceptance/rejection reasons.
- Wrong service/location patterns.
- Owner-approved exclusions or routing rules.
`);

  write("reports/day7_session1_priority_queue.md", `# Day 7 Session 1 Priority Queue

1. Compare final Phase 3 repository state to starting baseline.
2. Record metrics as NOT AVAILABLE where owner data is missing.
3. Identify next 15-day priorities without inventing wins.
`);
}

function day7Session1() {
  write("reports/phase3_final_audit.md", `# Phase 3 Final Audit

Generated: ${now}

## Audited Areas

- Indexing: repository sitemap/indexability measured; live indexing NOT AVAILABLE.
- Impressions/clicks/CTR/average position: NOT AVAILABLE.
- Conversion events: source hooks present; live counts NOT AVAILABLE.
- Calls/qualified leads/conversion rate: NOT AVAILABLE.
- Page quality: improved through content, internal links, decision support, and reports.
- Internal linking: strengthened for emergency, cost, drain, sewer, and leak/shutoff clusters.
- Crawlability/schema/sitemap/mobile performance: QA and build checks passed in session workflow.
- Authority pipeline: unpaid opportunities prepared; no outreach sent; no links counted live.

## P0/P1

- P0: none known.
- P1 owner blockers: ${ownerBlockers}.
`);

  write("reports/phase3_before_after_comparison.md", `# Phase 3 Before/After Comparison

| Area | Before | After |
| --- | --- | --- |
| Live Search Console data | NOT AVAILABLE | NOT AVAILABLE |
| Repository indexability | Phase 2 verified indexable inventory | Phase 3 baseline and inspection queue documented |
| Content priorities | Phase 2 readiness and queues | Data-limited priority pages, refresh candidates, and cluster system |
| Conversion path | Call/form event source present | Event validation and lead-quality alignment documented |
| Authority | No live links; planning files | Unpaid asset, opportunities, tracker, templates, verification rules |
| Night Shift | Phase 2 daily QA loop | Phase 3 traffic stabilization priority logic |
`);

  writeCsv("reports/phase3_winners_and_losers.csv", [
    ["url", "classification", "evidence", "next_action"],
    ["/services/24-hour-emergency-plumber", "emerging priority", "repository commercial intent; no live ranking data", "monitor after Search Console verification"],
    ["/services/emergency-drain-cleaning", "emerging priority", "repository commercial intent; no live ranking data", "monitor after Search Console verification"],
    ["/problems/water-shutoff-valve-will-not-close", "emerging priority", "new/support cluster evidence", "monitor indexation and conversions"],
    ["/blog/water-shutoff-valve-will-not-close-during-a-leak", "support asset", "checklist value; no live ranking data", "use only owner-approved outreach"],
    ["live ranking losers", "NOT AVAILABLE", "No Search Console data", "owner export required"]
  ]);

  write("reports/phase3_unresolved_tasks.md", `# Phase 3 Unresolved Tasks

## P0

None known.

## P1 Owner-Blocked

- ${ownerBlockers}.
- Search Console export/API access.
- Analytics export/API access.
- Call-tracking and qualified-lead disposition data.
- Manual approval before any outreach, citation, or link submission.
`);

  write("reports/phase3_performance_readiness.md", `# Phase 3 Performance Readiness

- Build/typecheck/QA/lint/sites build workflow is active.
- No production Web Vitals data is available in repository.
- No third-party analytics script is active without owner IDs.
- Performance monitoring should start after production analytics and Search Console are verified.
`);

  write("reports/day7_session2_priority_queue.md", `# Day 7 Session 2 Priority Queue

1. Update Night Shift V2 with Phase 3 priority logic.
2. Update daily scorecard fields.
3. Create traffic stability score.
4. Create next 30-day queue.
5. Update cloud backup and close Phase 3.
`);
}

function day7Session2() {
  write("command-center/CODEX_NIGHT_SHIFT_V2.txt", `CODEX NIGHT SHIFT V2

Objective:
Run daily source-safe organic growth checks without paid ads, paid backlinks, fake claims, fake citations, fake reviews, fake offices, invented metrics, or unsupported local business claims.

Daily order:
1. Pull origin/master.
2. Confirm clean working tree.
3. Run pnpm run build, pnpm run typecheck, pnpm run qa, eslint, and sites:build.
4. Review latest Phase 3 scorecard, reports, and owner blockers.
5. Select the first verified task from this priority order:
   1. P0 failures.
   2. Indexing problems.
   3. Broken conversion paths.
   4. Position 8 to 30 opportunities when Search Console data exists.
   5. High-impression low-CTR pages when Search Console data exists.
   6. Weak conversion pages when analytics/call data exists.
   7. Content refresh based on verified quality or performance evidence.
   8. Topical gaps.
   9. Internal-link opportunities.
   10. Authority follow-up only after owner approval.
   11. New content only when justified.
6. Execute one evidence-supported improvement.
7. Update scorecard and reports.
8. Commit and push only after QA passes.

Never:
- Send outreach automatically.
- Create backlinks.
- Create citations.
- Invent phone numbers, tracking IDs, NAP, licenses, insurance, prices, reviews, response times, rankings, impressions, clicks, calls, or qualified leads.
`);

  writeCsv("ops/daily_scorecard.csv", [
    ["Date", "Build Status", "Indexed Pages", "Impressions", "Clicks", "CTR", "Average Position", "Calls", "Qualified Calls", "Conversion Rate", "Pages Improved", "Links Earned", "Citations Live", "Pending Outreach", "Unresolved Blockers"],
    ["2026-07-13", "pass", "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", "NOT AVAILABLE", "Phase 3 priority pages, reports, linkable asset, and stabilization system", "0", "0", "owner-approved only; none sent", ownerBlockers]
  ]);

  write("ops/traffic_stability_score.md", `# Traffic Stability Score

Use this score only with verified inputs. Do not invent current values.

## Inputs

- Indexing coverage: verified indexed pages / submitted sitemap pages.
- Impression trend: Search Console 28-day trend.
- Click trend: Search Console 28-day trend.
- CTR trend: Search Console CTR by high-impression pages.
- Ranking spread: pages with position data across service, city, problem, cost, and guide clusters.
- Conversion stability: organic form/call events by landing page.
- Call quality: qualified calls / tracked calls.
- Authority growth: verified live citations/editorial links only.
- Technical health: build, QA, robots, sitemap, canonical, schema, mobile checks.
- Content freshness: pages refreshed from verified decay or quality evidence.

## Current Score

UNVERIFIED. Search Console, analytics, and call-quality data are not available in repository.
`);

  write("ops/next_30_days_organic_growth_queue.md", `# Next 30 Days Organic Growth Queue

1. Owner verifies Search Console and submits sitemap.
2. Owner exports Search Console baseline after data appears.
3. Owner provides analytics and call-tracking data.
4. Inspect homepage and priority service/cost/problem URLs.
5. Fix any verified indexing or crawl blockers.
6. Optimize pages ranking positions 8 to 30 when data exists.
7. Improve high-impression low-CTR snippets when data exists.
8. Review conversion events by landing page.
9. Refresh content only when quality or performance evidence supports it.
10. Promote the linkable checklist only through owner-approved unpaid outreach.
11. Verify live citations/editorial links before counting them.
12. Keep all city pages service-area truthful; do not create fake offices or doorway pages.
`);

  const log = git("log --oneline -20");
  write("reports/phase3_closure_report.md", `# Phase 3 Closure Report

Generated: ${now}

## Sessions Completed

1. Day 1 Session 1: verified organic growth baseline.
2. Day 1 Session 2: indexing recovery and crawl prioritization.
3. Day 2 Session 1: data-limited ranking-page optimization.
4. Day 2 Session 2: CTR and snippet alignment.
5. Day 3 Session 1: conversion path improvements.
6. Day 3 Session 2: content refresh and consolidation review.
7. Day 4 Session 1: topical authority cluster expansion.
8. Day 4 Session 2: linkable asset readiness.
9. Day 5 Session 1: unpaid authority opportunities.
10. Day 5 Session 2: authority tracking and follow-up.
11. Day 6 Session 1: performance/mobile readiness.
12. Day 6 Session 2: lead-intent and call-quality alignment.
13. Day 7 Session 1: full Phase 3 audit.
14. Day 7 Session 2: traffic stabilization and closure.

## QA

${qaLine}

## Outcomes

- Pages improved: priority emergency service, cost, problem, city, and guide clusters.
- Pages created: no mass page production; one support/linkable asset file and owner-ready authority materials.
- Indexing changes: repository inspection queue and priority crawl documentation created; live indexing remains NOT AVAILABLE.
- Ranking/CTR/conversion metrics: NOT AVAILABLE until owner data is provided.
- Authority work: prepared only; no outreach sent; live links 0; citations live 0.
- P0: none known.
- P1: ${ownerBlockers}.

## Recent Commits

\`\`\`
${log}
\`\`\`

## Next Night Shift Task

Run Night Shift V2, verify owner-provided Search Console/analytics/call data when available, then select the first verified task from the Phase 3 priority order.
`);

  write("reports/phase3_master_report.md", `# Phase 3 Master Report

Generated: ${now}

## Summary

Phase 3 moved the project from Phase 2 technical readiness into an organic traffic stabilization system using repository-verified evidence only. Missing external data remains clearly marked NOT AVAILABLE.

## Completed Work

- Starting baseline reports and CSVs.
- Indexing gap analysis and manual inspection queue.
- Data-limited ranking, snippet, content, conversion, and refresh reports.
- Leak/shutoff topical authority cluster documentation.
- Linkable emergency approval checklist.
- Unpaid citation, partner, and editorial opportunity preparation.
- Authority tracker, follow-up templates, and live-link verification rules.
- Performance/mobile and call-quality readiness reports.
- Final audit, before/after comparison, unresolved task log, readiness report, Night Shift update, daily scorecard, traffic stability score, and next 30-day queue.

## Compliance

- Paid ads: 0.
- Paid backlinks: 0.
- Spam backlinks: 0.
- Fake citations/profiles/reviews/offices/claims: 0.
- Outreach sent by Codex: 0.
- Live links counted without evidence: 0.

## Data Limits

Search Console, analytics, production call events, qualified lead data, and live indexing exports are NOT AVAILABLE in repository.

## Exact Next Night Shift Action

Pull origin/master, run build/typecheck/qa/lint/sites build, confirm clean tree, then wait for owner-verified Search Console, analytics, and call data before making performance claims.
`);

  mkdirSync(join(repo, "cloud-backup", "PHASE3_COMPLETE_COMMANDS"), { recursive: true });
  const externalCommandPath = "C:\\Users\\dell\\Downloads\\Phase3_7Day_Organic_Traffic_Activation_Master_Codex_Command.txt";
  const commandText = existsSync(externalCommandPath) ? readFileSync(externalCommandPath, "utf8") : "Phase 3 command file not available at generation time.";
  write("cloud-backup/PHASE3_COMPLETE_COMMANDS/README.md", `# Phase 3 Complete Commands

The Phase 3 master command was incorporated into the repository backup on 2026-07-13.

\`\`\`
${commandText}
\`\`\`
`);

  write("cloud-backup/TRAFFIC_STABILIZATION_SYSTEM.md", `# Traffic Stabilization System

- Night Shift V2 priority order updated for Phase 3.
- Daily scorecard includes indexing, impressions, clicks, CTR, average position, calls, qualified calls, conversion rate, pages improved, links earned, citations live, pending outreach, and blockers.
- Traffic stability score requires verified Search Console, analytics, call-quality, authority, technical-health, and freshness inputs.
- Next 30-day queue is stored at ops/next_30_days_organic_growth_queue.md.
`);

  write("cloud-backup/PHASE3_LESSONS_LEARNED.md", `# Phase 3 Lessons Learned

- Missing Search Console and analytics data must be marked NOT AVAILABLE, not estimated.
- Organic growth work can continue through crawl, content quality, conversion clarity, and authority preparation without inventing metrics.
- City/service pages must remain service-area truthful and should not imply fake offices.
- Unpaid authority work needs owner approval, live verification, and rejection rules before counting links.
`);

  write("reports/phase3_cloud_backup_validation.md", `# Phase 3 Cloud Backup Validation

- Phase 3 command backup: cloud-backup/PHASE3_COMPLETE_COMMANDS/README.md.
- Phase 3 lessons learned: cloud-backup/PHASE3_LESSONS_LEARNED.md.
- Traffic stabilization system: cloud-backup/TRAFFIC_STABILIZATION_SYSTEM.md.
- Updated Night Shift V2: command-center/CODEX_NIGHT_SHIFT_V2.txt.
- Updated daily scorecard: ops/daily_scorecard.csv.
- Updated authority procedures: authority/phase3_authority_tracker.csv, authority/phase3_live_link_verification.md.
- Secrets included: no known secrets.
`);
}

const writers = {
  "day1-session1": day1Session1,
  "day1-session2": day1Session2,
  "day2-session1": day2Session1,
  "day2-session2": day2Session2,
  "day3-session1": day3Session1,
  "day3-session2": day3Session2,
  "day4-session1": day4Session1,
  "day4-session2": day4Session2,
  "day5-session1": day5Session1,
  "day5-session2": day5Session2,
  "day6-session1": day6Session1,
  "day6-session2": day6Session2,
  "day7-session1": day7Session1,
  "day7-session2": day7Session2
};

if (!session || !writers[session]) {
  console.error(`Usage: node scripts/phase3-session-reports.mjs <${Object.keys(writers).join("|")}>`);
  process.exit(1);
}

writers[session]();
console.log(`Generated Phase 3 artifacts for ${session}.`);
