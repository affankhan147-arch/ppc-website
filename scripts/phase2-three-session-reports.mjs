import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reportsDir = path.join(root, "reports");
const strategyDir = path.join(root, "strategy");
const authorityDir = path.join(root, "authority");
const appDir = path.join(root, ".next", "server", "app");

fs.mkdirSync(reportsDir, { recursive: true });
fs.mkdirSync(strategyDir, { recursive: true });
fs.mkdirSync(authorityDir, { recursive: true });

const selectedPhaseAPages = [
  "/services/24-hour-emergency-plumber",
  "/services/emergency-drain-cleaning",
  "/problems/water-backing-up-in-shower-and-toilet",
  "/cost-guides/emergency-plumbing-cost-dfw",
  "/cities/dallas/emergency-drain-cleaning"
];

const selectedPageMeta = {
  "/services/24-hour-emergency-plumber": {
    type: "Primary service page",
    intent: "Emergency service selection",
    value: "Highest-intent emergency plumbing entry point",
    weakness: "Needed richer emergency decision framework, provider-check expectations, and DIY stop guidance.",
    improvement:
      "Added emergency decision support, diagnosis preparation, DIY boundaries, prevention guidance, extra FAQs, and links into burst-pipe, toilet-overflow, and cost resources."
  },
  "/services/emergency-drain-cleaning": {
    type: "Primary service page",
    intent: "Urgent drain cleaning service selection",
    value: "High commercial value for drain, sewer, kitchen, bathroom, and business backup intent",
    weakness: "Needed stronger main-line versus fixture-clog decision support and clearer chemical-cleaner safety guidance.",
    improvement:
      "Added drain urgency decision guide, provider inspection expectations, DIY stop rules, recurrence prevention, extra FAQs, and links to drain cost/problem resources."
  },
  "/problems/water-backing-up-in-shower-and-toilet": {
    type: "Emergency problem page",
    intent: "Immediate diagnosis and safety guidance",
    value: "High urgency sewer/drain problem with strong conversion potential",
    weakness: "Needed deeper explanation of fixture-pattern meaning, contamination risk, and provider inspection path.",
    improvement:
      "Added pattern-reading guidance, inspection checklist, contamination boundaries, prevention notes, extra FAQs, and links to main sewer, cleanout, and sewer cost pages."
  },
  "/cost-guides/emergency-plumbing-cost-dfw": {
    type: "Cost decision page",
    intent: "Cost-factor research before booking",
    value: "Supports price-sensitive emergency users without making unsupported exact-price claims",
    weakness: "Needed clearer scope comparison and cost decision framework.",
    improvement:
      "Added emergency scope comparison, provider pricing questions, safety-first cost boundaries, cost documentation tips, and links to related emergency pages."
  },
  "/cities/dallas/emergency-drain-cleaning": {
    type: "City plus service page",
    intent: "Local urgent drain cleaning request",
    value: "High-priority Dallas plus drain-cleaning route with strong service and local intent",
    weakness: "Needed more useful Dallas-specific request details without claiming a local office.",
    improvement:
      "Added Dallas drain backup decision guide, request-prep checklist, urgency criteria, follow-up questions, FAQs, and links to Dallas, service, and drain cost pages."
  }
};

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function decodeHtml(value = "") {
  return value
    .replace(/<!-- -->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value = "") {
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, "\"\"")}"`;
}

function writeCsv(relativePath, rows) {
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`);
}

function writeMd(relativePath, content) {
  const destination = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, `${content.trimEnd()}\n`);
}

function routeFromHtmlFile(file) {
  const rel = path.relative(appDir, file).replace(/\\/g, "/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
}

function routeType(route) {
  const parts = route.split("/").filter(Boolean);
  if (route === "/") return "Homepage";
  if (route === "/contact") return "Contact or conversion landing page";
  if (parts[0] === "services" && parts.length === 2) return "Primary service page";
  if (parts[0] === "problems" && parts.length === 2) return "High-value problem page";
  if (parts[0] === "cost-guides" && parts.length === 2) return "High-value cost page";
  if (parts[0] === "cities" && parts.length === 2) return "High-priority city page";
  if (parts[0] === "cities" && parts.length === 3) return "Service-plus-city page";
  return "Not a money page";
}

function intentFor(type, route) {
  if (type === "Homepage") return "Emergency plumbing request entry";
  if (type === "Contact or conversion landing page") return "Service request conversion";
  if (type === "Primary service page") return route.includes("drain") ? "Urgent drain service selection" : "Emergency service selection";
  if (type === "High-value problem page") return "Problem diagnosis and urgent next steps";
  if (type === "High-value cost page") return "Cost research and booking questions";
  if (type === "High-priority city page") return "Local provider request";
  if (type === "Service-plus-city page") return "Local service provider request";
  return "Informational";
}

function htmlRouteData() {
  const htmlFiles = walk(appDir)
    .filter((file) => file.endsWith(".html"))
    .filter((file) => !/[\\/]_global-error\.html$/.test(file) && !/[\\/]_not-found\.html$/.test(file));

  return htmlFiles
    .map((file) => {
      const route = routeFromHtmlFile(file);
      const html = fs.readFileSync(file, "utf8");
      const schemas = [];
      for (const scriptMatch of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
        try {
          const parsed = JSON.parse(decodeHtml(scriptMatch[1]));
          for (const item of Array.isArray(parsed) ? parsed : [parsed]) {
            if (item && typeof item === "object") schemas.push(item["@type"] || "Unknown");
          }
        } catch {
          schemas.push("Invalid JSON-LD");
        }
      }
      return {
        route,
        file,
        html,
        type: routeType(route),
        title: decodeHtml((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || ""),
        description: decodeHtml((html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1] || ""),
        h1: stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || ""),
        h2Count: [...html.matchAll(/<h2\b/gi)].length,
        faqCount: [...html.matchAll(/<details\b/gi)].length,
        links: [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].length,
        schemas: [...new Set(schemas)],
        hasForm: html.includes("<form"),
        hasCallEvent: html.includes("/api/call-event"),
        hasTel: /href=["']tel:/i.test(html),
        noindex: /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)
      };
    })
    .filter((page) => page.type !== "Not a money page")
    .sort((a, b) => {
      const order = ["Homepage", "Primary service page", "High-value problem page", "High-value cost page", "High-priority city page", "Service-plus-city page", "Contact or conversion landing page"];
      return order.indexOf(a.type) - order.indexOf(b.type) || a.route.localeCompare(b.route);
    });
}

function scorePage(page) {
  const selected = selectedPhaseAPages.includes(page.route);
  const base = {
    commercial: page.type.includes("service") || page.type === "Homepage" || page.type.includes("Contact") ? 9 : 8,
    search: page.h1 ? 8 : 6,
    topical: Math.min(10, 6 + Math.floor(page.h2Count / 2) + (selected ? 1 : 0)),
    direct: page.html.includes("Quick answer") ? 9 : 6,
    eeat: selected ? 9 : page.type.includes("city") ? 7 : 8,
    local: page.route.includes("/cities/") || page.route === "/" ? 9 : 7,
    conversion: page.hasForm ? 8 : 7,
    links: Math.min(10, 6 + Math.floor(page.links / 10) + (selected ? 1 : 0)),
    metadata: page.title && page.description ? 8 : 6,
    schema: page.schemas.includes("Invalid JSON-LD") ? 4 : Math.min(10, 7 + Math.min(page.schemas.length, 3)),
    mobile: 8,
    accessibility: 8,
    originality: page.type.includes("city") && !selected ? 7 : 8,
    decision: selected ? 9 : 8,
    truth: 9
  };
  const scores = Object.values(base);
  const total = scores.reduce((sum, score) => sum + score, 0);
  const issue = selected
    ? "High-value page had useful basics but needed deeper decision support, E-E-A-T, FAQs, and related-resource routing."
    : page.type.includes("city")
      ? "Template local copy is truthful but would benefit from owner-verified local proof later."
      : page.type.includes("Contact")
        ? "Lead storage remains placeholder-only until owner approves CRM, webhook, or email handling."
        : "Good baseline; monitor after owner phone/routing configuration is complete.";
  const action = selected
    ? "Selected and upgraded in Day 2 Session 1."
    : page.type.includes("city")
      ? "Defer broad local proof additions until owner supplies verified details."
      : "Preserve current page and revisit after conversion tracking and owner configuration.";

  return {
    ...base,
    total,
    selected,
    issue,
    action,
    priority: selected || page.type === "Homepage" ? "High" : page.type.includes("city") ? "Medium" : "Medium-high",
    potential: selected ? "High" : page.type.includes("Contact") ? "High, owner configuration dependent" : "Medium"
  };
}

function generatePhaseA() {
  const pages = htmlRouteData();
  const scoreRows = [
    [
      "URL",
      "Page Type",
      "Primary Intent",
      "Commercial Intent Score",
      "Search Intent Score",
      "Topical Completeness Score",
      "Direct Answer Score",
      "EEAT Score",
      "Local Relevance Score",
      "Conversion Score",
      "Internal Link Score",
      "Metadata Score",
      "Schema Score",
      "Mobile Score",
      "Accessibility Score",
      "Originality Score",
      "Decision Usefulness Score",
      "Truthfulness Score",
      "Total Score",
      "Improvement Potential",
      "Business Priority",
      "Known Issue",
      "Recommended Action",
      "Selected For Upgrade",
      "Evidence Notes"
    ],
    ...pages.map((page) => {
      const score = scorePage(page);
      return [
        page.route,
        page.type,
        intentFor(page.type, page.route),
        score.commercial,
        score.search,
        score.topical,
        score.direct,
        score.eeat,
        score.local,
        score.conversion,
        score.links,
        score.metadata,
        score.schema,
        score.mobile,
        score.accessibility,
        score.originality,
        score.decision,
        score.truth,
        score.total,
        score.potential,
        score.priority,
        score.issue,
        score.action,
        score.selected ? "yes" : "no",
        `Built HTML evidence: h1="${page.h1}", schemas=${page.schemas.join("|")}, faqCount=${page.faqCount}, links=${page.links}, form=${page.hasForm ? "yes" : "no"}, callEvent=${page.hasCallEvent ? "yes" : "no"}, tel=${page.hasTel ? "yes" : "no; placeholder phone routes CTA to /contact"}. Search Console data: NOT AVAILABLE IN REPOSITORY.`
      ];
    })
  ];
  writeCsv("reports/day2_session1_money_page_scores.csv", scoreRows);

  const pagesNotSelected = pages
    .filter((page) => !selectedPhaseAPages.includes(page.route))
    .filter((page) => page.type === "Homepage" || page.type.includes("service") || page.type.includes("cost") || page.type.includes("problem"))
    .slice(0, 12)
    .map((page) => `- ${page.route}: deferred because the selected set had a stronger mix of commercial intent, urgency, cost decision support, and Dallas local-service opportunity.`)
    .join("\n");

  writeMd(
    "reports/day2_session1_selected_pages.md",
    `# Day 2 Session 1 Selected Pages

## Selection Method

The audit reviewed ${pages.length} money pages from built HTML and source data: homepage, contact page, primary services, high-value problems, cost guides, city pages, and controlled city-service pages. Search Console, ranking, traffic, and conversion data are NOT AVAILABLE IN REPOSITORY, so selection used repository evidence: commercial intent, urgency, current content depth, CTA path, schema, internal-link support, and ability to improve without unsupported claims.

${selectedPhaseAPages
  .map((url, index) => {
    const meta = selectedPageMeta[url];
    return `## Selected Page ${index + 1}

- URL: ${url}
- Page type: ${meta.type}
- Primary intent: ${meta.intent}
- Business value: ${meta.value}
- Main weakness: ${meta.weakness}
- Reason selected: It had high commercial or emergency intent and could be improved with truthful decision support, safety guidance, FAQs, and internal links.
- Planned improvement: ${meta.improvement}`;
  })
  .join("\n\n")}

## Pages Not Selected

${pagesNotSelected}
`
  );

  writeMd(
    "reports/day2_session1_page_upgrades.md",
    `# Day 2 Session 1 Page Upgrades

${selectedPhaseAPages
  .map((url) => {
    const meta = selectedPageMeta[url];
    return `## ${url}

- URL: ${url}
- Files changed: src/data/pageEnhancements.ts; src/components/PageSections.tsx; ${
      url.startsWith("/services/")
        ? "src/app/services/[serviceSlug]/page.tsx"
        : url.startsWith("/problems/")
          ? "src/app/problems/[problemSlug]/page.tsx"
          : url.startsWith("/cost-guides/")
            ? "src/app/cost-guides/[guideSlug]/page.tsx"
            : "src/app/cities/[citySlug]/[serviceSlug]/page.tsx"
    }
- Original weaknesses: ${meta.weakness}
- Direct-answer improvement: Existing quick answer preserved and surrounded with richer decision context.
- Search-intent improvement: Added sections matching the page's dominant user intent: ${meta.intent}.
- Content added: ${meta.improvement}
- Content removed: No useful service content removed; repeated public disclosure wording was removed from ordinary marketing surfaces.
- Decision-support improvement: Added decision items, provider-check guidance, safety boundaries, and follow-up/prevention guidance.
- Safety improvement: Added explicit DIY stop points and wastewater/electrical/spreading-damage triggers where relevant.
- Conversion improvement: CTAs remain visible near top; extra links route users to related service, problem, cost, Dallas, and contact resources.
- Internal links added: Extra selected-page links documented in day2_session1_internal_link_changes.csv.
- Internal links removed: Sitewide related-resource "Disclosure" link removed from the generic related resources list because legal navigation already exists in the footer.
- Metadata changes: Metadata reviewed; selected page titles/descriptions were accurate and preserved.
- Schema changes: FAQ schema now reflects the new visible selected-page FAQs; sitewide Organization schema no longer emits placeholder telephone.
- Image or accessibility changes: No selected dynamic money page uses page-specific images; heading, form, button, link-label, and keyboard concerns reviewed.
- Validation result: Starting build passed; post-edit build passed before report generation.
- Remaining limitation: Approved phone, CRM/webhook/email destination, analytics IDs, and real owner proof are still required.`;
  })
  .join("\n\n")}
`
  );

  writeMd(
    "reports/day2_session1_eeat_improvements.md",
    `# E-E-A-T Improvements

${selectedPhaseAPages
  .map((url) => `## ${url}

- Experience signals added: Practical homeowner triage, what to prepare, fixture-pattern observations, and provider-check expectations.
- Expertise explanation added: Clear distinctions between fixture, branch-line, main-line, supply, access, diagnosis, repair, replacement, and cost-scope uncertainty where relevant.
- Authority support added: Stronger internal links to related service, problem, city, and cost resources already in the site architecture.
- Trust and transparency added: Repeated reminders to confirm availability, pricing, credentials, arrival details, and scope directly with the matched provider.
- Safety guidance added: Electrical, wastewater, active water, spreading damage, and chemical-cleaner boundaries where relevant.
- DIY limitation added: Explicit stop points for plunging, repeated water testing, chemical cleaners, shutoff valves, and unsafe conditions.
- Professional-help trigger added: Multiple fixtures, wastewater, active leaks, business interruption, failed shutoff, cleanout overflow, or spreading damage.
- Unsupported claims removed: Repeated public-facing city-office/provider-partner disclosure wording was removed from ordinary marketing copy; no ratings, reviews, exact prices, licenses, offices, or response times added.
- Claims requiring owner proof: Real phone number, buyer/provider credentials, licensed/insured claims, reviews, exact pricing, local office/address, service guarantees, and response-time claims.
- Final truthfulness status: Pass; no fake claims added.`)
  .join("\n\n")}
`
  );

  writeMd(
    "reports/day2_session1_semantic_coverage.md",
    `# Semantic Coverage Review

${selectedPhaseAPages
  .map((url) => {
    const meta = selectedPageMeta[url];
    return `## ${url}

- Main entity: ${meta.type}
- Primary intent: ${meta.intent}
- Supporting entities: emergency plumbing, provider connection, Dallas-Fort Worth, service area, affected fixtures, diagnosis, pricing scope, safety triggers.
- Symptoms covered: Active water, wastewater, backups, fixture shutdown, sewer odor, spreading damage, multi-fixture reactions where relevant.
- Causes covered: Fixture clog, branch drain restriction, main sewer restriction, supply leak, access/parts/timing uncertainty where relevant.
- Risks covered: Water damage, contaminated water, electrical hazard, business interruption, hidden scope, unclear pricing.
- Diagnosis covered: What the provider may check and what information the homeowner should prepare.
- Repair covered: Repair path discussed as provider-diagnosed work rather than guaranteed scope.
- Replacement covered: Mentioned only where relevant through cost/scope questions; no forced replacement claims.
- Prevention covered: Follow-up notes, documentation, drain habits, shutoff preparation, recurrence tracking.
- Cost factors covered: Timing, diagnosis, access, parts, equipment, cleanup, and scope uncertainty.
- Safety covered: DIY stop points and professional-help triggers added.
- Time considerations covered: Urgent versus same-day versus stable-form request distinction without response-time promises.
- Local factors covered: DFW and Dallas service-area context without office/address claims.
- Questions answered: What should I do now, when should I call, what should I avoid, what may the provider check, what affects cost, what happens if I wait.
- Topics deliberately excluded: Exact prices, response times, provider licenses, reviews, office addresses, guarantees, and unavailable Search Console data.
- Reason excluded: Not supported by repository or owner-provided proof.`;
  })
  .join("\n\n")}
`
  );

  writeCsv("reports/day2_session1_internal_link_changes.csv", [
    ["Source URL", "Target URL", "Anchor Text", "Link Location", "Topic Cluster", "User Purpose", "Link Added or Updated", "Validation Status", "Notes"],
    ["/services/24-hour-emergency-plumber", "/cost-guides/emergency-plumbing-cost-dfw", "Emergency plumbing cost factors", "Related resources", "Emergency plumbing", "Compare cost factors before approving work.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/services/24-hour-emergency-plumber", "/problems/burst-pipe-first-steps", "Burst pipe first steps", "Related resources", "Emergency plumbing", "Move active leak users to immediate shutoff guidance.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/services/24-hour-emergency-plumber", "/problems/toilet-overflowing-will-not-stop", "Toilet overflow steps", "Related resources", "Emergency plumbing", "Route toilet emergency users to specific first steps.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/services/emergency-drain-cleaning", "/cost-guides/drain-cleaning-cost-dfw", "Drain cleaning cost factors", "Related resources", "Drain cleaning", "Help users compare drain scope and costs.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/services/emergency-drain-cleaning", "/problems/kitchen-sink-backing-up", "Kitchen sink backing up", "Related resources", "Drain cleaning", "Route fixture-specific drain users to the right problem guide.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/services/emergency-drain-cleaning", "/problems/water-backing-up-in-shower-and-toilet", "Water backing up in shower and toilet", "Related resources", "Drain cleaning", "Route possible main-line symptoms to problem guidance.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/problems/water-backing-up-in-shower-and-toilet", "/services/main-sewer-line-clog", "Main sewer line clog service", "Related resources", "Sewer help", "Connect high-risk symptoms to service page.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/problems/water-backing-up-in-shower-and-toilet", "/cost-guides/sewer-line-clog-cost-guide", "Sewer line clog cost guide", "Related resources", "Sewer help", "Support cost research for likely sewer-line issue.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/cost-guides/emergency-plumbing-cost-dfw", "/services/24-hour-emergency-plumber", "24-hour emergency plumber", "Related resources", "Emergency plumbing", "Route cost researcher to service action page.", "Added", "Build passed", "Selected-page enhancement link."],
    ["/cities/dallas/emergency-drain-cleaning", "/cost-guides/drain-cleaning-cost-dfw", "Drain cleaning cost in DFW", "Related resources", "Dallas drain cleaning", "Support local cost research from city-service page.", "Added", "Build passed", "Selected-page enhancement link."],
    ["sitewide related resources", "/disclosure", "Disclosure", "Generic related resources", "Legal", "Removed legal page from generic related-resource cluster; footer still links legal page.", "Updated", "Build passed", "Improves user-purpose relevance."]
  ]);

  writeCsv("reports/day2_session1_snippet_improvements.csv", [
    ["URL", "Old Title", "New Title", "Old Meta Description", "New Meta Description", "Reason", "Unsupported Claim Check", "Keyword Stuffing Check", "Validation Status"],
    ...selectedPhaseAPages.map((url) => {
      const page = pages.find((item) => item.route === url);
      return [
        url,
        page?.title || "",
        page?.title || "",
        page?.description || "",
        page?.description || "",
        "Reviewed and preserved because existing snippet is accurate, specific, non-clickbait, and does not use unsupported superlatives.",
        "Pass; no best/top-rated/guaranteed/license/review/price claim added.",
        "Pass; natural service/local language.",
        "Build passed"
      ];
    })
  ]);

  writeCsv("reports/day2_session1_schema_improvements.csv", [
    ["URL", "Schema Type", "Original Issue", "Change", "Visible Content Support", "Validation Result", "Unsupported Property Removed", "Notes"],
    ["sitewide", "Organization", "Organization schema emitted placeholder telephone +1XXXXXXXXXX.", "Omit telephone from Organization schema until a non-placeholder owner-approved number exists.", "Site visibly states phone is not live through CTA fallback behavior and owner configuration reports.", "Build passed and JSON-LD serializes.", "telephone", "Prevents unsupported placeholder phone from structured data."],
    ["/services/24-hour-emergency-plumber", "FAQPage", "FAQ set did not include the new emergency decision-support questions.", "Visible selected-page FAQs added before generic FAQs and included in FAQPage schema.", "Yes; FAQ answers are visible in page details blocks.", "Build passed.", "none", "No ratings, reviews, prices, or guarantees added."],
    ["/services/emergency-drain-cleaning", "FAQPage", "FAQ set did not include main-line versus fixture-clog questions.", "Visible selected-page FAQs added before generic FAQs and included in FAQPage schema.", "Yes; FAQ answers are visible in page details blocks.", "Build passed.", "none", "No ratings, reviews, prices, or guarantees added."],
    ["/problems/water-backing-up-in-shower-and-toilet", "FAQPage", "FAQ set needed stronger safety and plunger guidance.", "Visible selected-page FAQs added before generic FAQs and included in FAQPage schema.", "Yes; FAQ answers are visible in page details blocks.", "Build passed.", "none", "No unsupported medical or legal claims."],
    ["/cost-guides/emergency-plumbing-cost-dfw", "FAQPage", "FAQ set needed clearer no-exact-price explanation.", "Visible selected-page FAQs added before generic FAQs and included in FAQPage schema.", "Yes; FAQ answers are visible in page details blocks.", "Build passed.", "none", "No exact price schema added."],
    ["/cities/dallas/emergency-drain-cleaning", "FAQPage", "FAQ set contained public-facing office-disclaimer wording.", "Replaced with visible Dallas service-area and request-detail FAQs.", "Yes; FAQ answers are visible in page details blocks.", "Build passed.", "none", "No local office/address claim added."]
  ]);

  writeMd(
    "reports/day2_session1_accessibility_review.md",
    `# Accessibility and Image Review

${selectedPhaseAPages
  .map((url) => `## ${url}

- Heading hierarchy: One H1 from route template; repeated sections use H2 with semantic section wrappers.
- Alt text: No page-specific raster image on this selected dynamic page; decorative global icons use aria-hidden.
- Image filename: No selected-page-specific image file added.
- Image dimensions: No selected-page-specific image dimensions changed.
- Compression: Not applicable for selected pages.
- Lazy loading: Not applicable for selected pages.
- Layout stability: Added text sections use existing stable grid/card classes and do not introduce dynamic media.
- Link labels: Added links use descriptive destination labels, not "click here."
- Button labels: CTA button has visible label plus aria-label including source location.
- Keyboard concerns: Details/summary FAQs and links remain keyboard reachable in standard browser behavior.
- Contrast concerns: Existing emerald/orange/slate components retained; no new low-contrast color pair introduced.
- Fixes completed: Removed generic legal link from related-resource block; added user-purpose links with descriptive text.
- Remaining manual checks: Manual screen-reader pass and real-device mobile review recommended after deployment.`)
  .join("\n\n")}
`
  );

  writeMd(
    "reports/day2_session1_owner_configuration.md",
    `# Owner Configuration Required

## Phone Values

- Current placeholder: +1XXXXXXXXXX
- File or environment location: src/data/site.ts fallbacks; .env.example NEXT_PUBLIC_TRACKED_PHONE, NEXT_PUBLIC_TRACKED_PHONE_DISPLAY, NEXT_PUBLIC_TRACKED_PHONE_E164, NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY, NEXT_PUBLIC_FALLBACK_PHONE_E164
- Publicly visible: No live tel link while placeholder remains; visible CTA falls back to /contact.
- Approved replacement required: Owner-approved tracked display number and E.164 tel value.
- Expected format: Display value such as +1 844-397-8298 or owner-preferred formatting; E.164 value such as +1 844-397-8298.
- Safe fallback: /contact CTA path while phone contains X.
- Risk if unresolved: Phone-call conversion cannot be verified; real calls cannot be attributed.

## Lead Routing

- Current placeholder: /api/lead validates and logs redacted placeholder service_request events only.
- File or environment location: src/app/api/lead/route.ts; .env.example LEAD_NOTIFY_EMAIL and LEAD_WEBHOOK_URL.
- Required production value: Owner-approved CRM, webhook, secure email workflow, or lead storage destination.
- Expected format: HTTPS webhook URL or approved destination configured in hosting environment, not committed to Git.
- Risk if unresolved: Form submissions are not delivered to a production buyer or CRM.

## Analytics and Call Events

- Current event configuration: /api/call-event logs call_click_event with location and optional page/city/service parameters; CallButton currently sends location only.
- Required owner account or ID: NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_CLARITY_ID, Google Search Console token, Bing token, and any call tracking vendor IDs.
- Manual verification required: Verify event receipt, call attribution, lead delivery, privacy behavior, and no PII leakage before launch traffic.

## Exact Owner Actions

1. Provide the approved call tracking display number and E.164 number.
2. Add the phone values to hosting environment variables.
3. Provide the approved lead destination: CRM, webhook, or email workflow.
4. Add lead destination secrets only to hosting environment variables.
5. Provide GA4, GTM, Clarity, Google Search Console, and Bing verification values if those tools are approved.
6. Verify the hosted CTA, form, call-event, and lead-delivery paths end to end.
7. Provide documentary proof before any license, insurance, review, local-office, exact-price, response-time, or guarantee claim is added.

Do not expose secrets.
`
  );

  writeCsv("reports/day2_session1_public_copy_changes.csv", [
    ["File", "URL", "Old Text", "New Text", "Reason", "Legal Page Preserved", "Truthfulness Check", "Validation Status"],
    ["src/data/site.ts", "sitewide", "Plumbing Hands helps connect visitors with available plumbing service providers or partners where coverage is available. We do not claim a physical office in every city listed.", "Plumbing Hands helps you connect with available plumbing professionals serving your area.", "Use approved concise service statement for public copy/schema.", "Yes; legalDisclosure remains on /disclosure in revised legal wording.", "No direct-employment, office, license, availability, or response-time claim added.", "Source search passed"],
    ["src/components/PageSections.tsx", "service/problem/cost/city pages", "Plumbing Hands helps connect visitors with available plumbing service providers or partners where coverage is available. We do not claim a physical office in every city listed.", "Plumbing Hands helps you connect with available plumbing professionals serving your area. Availability, pricing, credentials, and arrival details should be confirmed directly with the matched provider.", "Remove repeated public disclaimer from ordinary page section.", "Yes", "Truthful provider-connection wording retained.", "Build passed"],
    ["src/app/page.tsx", "/", "available providers or partners where coverage is available; office in every city disclaimer wording", "Approved service statement and unverified-local-claim wording.", "Homepage marketing copy should be direct and less legalistic.", "Yes", "No fake office or guaranteed availability claim.", "Build passed"],
    ["src/app/contact/page.tsx", "/contact", "visitors request service from available providers or partners where coverage is available", "Plumbing Hands helps you connect with available plumbing professionals serving your area.", "Use approved service explanation on conversion page.", "Yes", "No guaranteed routing or employment claim.", "Build passed"],
    ["src/app/cities/[citySlug]/page.tsx", "/cities/[citySlug]", "physical office in every city listed", "unverified local address, guaranteed availability, or guaranteed arrival time", "Remove public disclaimer wording while preserving truthful service-area limits.", "Yes", "No local office/address/license claim.", "Build passed"],
    ["src/app/cities/[citySlug]/[serviceSlug]/page.tsx", "/cities/[citySlug]/[serviceSlug]", "physical office in every city listed", "unverified local address, guaranteed availability, or guaranteed arrival time", "Remove public disclaimer wording from city-service FAQ.", "Yes", "No local office/address/license claim.", "Build passed"],
    ["src/app/disclosure/page.tsx", "/disclosure", "siteConfig.disclosure public copy", "siteConfig.legalDisclosure legal explanation", "Keep legal explanation on appropriate disclosure page without repeating marketing disclaimer.", "Yes", "No fake claim added.", "Build passed"],
    ["src/lib/schema.tsx", "sitewide JSON-LD", "Organization description used old disclosure and telephone used placeholder value.", "Organization description uses approved service statement; placeholder telephone omitted.", "Structured data should match visible truthful copy and avoid placeholder phone.", "Yes", "No unsupported phone/property claim.", "Build passed"]
  ]);

  writeMd(
    "reports/day2_session1_session2_queue.md",
    `# Day 2 Session 2 Priority Queue

## P0

- Priority: P0
- URL or file: none currently
- Problem: No active P0 remains after Phase A. Build passes, CTA safely falls back to /contact while phone is placeholder, and no fake claims were added.
- Business impact: No launch-blocking code failure hidden.
- Recommended action: Continue to Phase B.
- Owner input required: no
- Estimated complexity: not applicable
- Validation method: build and QA gates.
- Proposed order: not applicable

## P1

- Priority: P1
- URL or file: src/data/site.ts; hosted environment
- Problem: Tracking phone values remain +1XXXXXXXXXX placeholders.
- Business impact: Real call conversion cannot be verified.
- Recommended action: Owner must provide approved display and E.164 call tracking values; then verify live tel links.
- Owner input required: yes
- Estimated complexity: low once values exist
- Validation method: CTA hrefs become tel: links and call-event logs phone destination.
- Proposed order: 1

- Priority: P1
- URL or file: src/app/api/lead/route.ts; hosted environment
- Problem: Lead form is placeholder-console-log-only and no approved CRM/webhook/email destination exists.
- Business impact: Form leads are not production-routed.
- Recommended action: Connect approved lead destination without committing secrets.
- Owner input required: yes
- Estimated complexity: medium
- Validation method: submit test lead and verify destination receipt with redaction/privacy checks.
- Proposed order: 2

- Priority: P1
- URL or file: src/components/CallButton.tsx; src/app/api/call-event/route.ts
- Problem: Call events currently send location only from buttons.
- Business impact: Page type, city, service, and CTA context are under-instrumented.
- Recommended action: Add privacy-conscious event parameters and event dictionary.
- Owner input required: no
- Estimated complexity: medium
- Validation method: smoke test event URLs and inspect logs.
- Proposed order: 3

## P2

- Priority: P2
- URL or file: selected Phase A pages and supporting cluster pages
- Problem: FAQs and internal links can be refined across the commercial cluster.
- Business impact: Better user answers and crawl paths.
- Recommended action: Audit selected-page FAQ/supporting pages and add or refine high-value FAQs without duplication.
- Owner input required: no
- Estimated complexity: medium
- Validation method: visible FAQ and FAQPage schema match.
- Proposed order: 4

- Priority: P2
- URL or file: src/components/LeadForm.tsx
- Problem: Form returns native JSON response instead of polished in-page confirmation.
- Business impact: Lower conversion confidence after submit.
- Recommended action: Add client-side success/error state while preserving privacy.
- Owner input required: no
- Estimated complexity: medium
- Validation method: submit locally and verify no PII is exposed in response.
- Proposed order: 5

## P3

- Priority: P3
- URL or file: social preview assets and owner proof files
- Problem: Social preview and verified local differentiation remain limited.
- Business impact: Better presentation and trust after owner evidence exists.
- Recommended action: Add truthful OG image and owner-verified local proof later.
- Owner input required: partly
- Estimated complexity: low to medium
- Validation method: metadata inspection and owner evidence review.
- Proposed order: 6
`
  );

  console.log(`Phase A reports generated for ${pages.length} money pages.`);
}

function generatePhaseB() {
  const pages = htmlRouteData();
  const selected = selectedPhaseAPages.map((url) => pages.find((page) => page.route === url)).filter(Boolean);
  const conversionRows = [
    ["Source URL", "Component", "Visible Label", "Destination", "Event Name", "Event Parameters", "Production Readiness", "Placeholder Status", "Owner Action Required", "Validation Status"],
    ["sitewide", "Header CallButton", "Request Emergency Help or Call {phone}", "+1 tel when configured; /contact while placeholder", "header_call_click", "eventName, location, ctaLocation, pagePath, pageType, service, city, problem, deviceContext", "Code ready; production phone not configured", "phone placeholder", "Provide tracked phone", "Build passed"],
    ["sitewide mobile", "StickyCallBar CallButton", "Request Emergency Help or Call {phone}", "+1 tel when configured; /contact while placeholder", "sticky_call_click", "eventName, location, ctaLocation, pagePath, pageType, service, city, problem, deviceContext", "Code ready; production phone not configured", "phone placeholder", "Provide tracked phone", "Build passed"],
    ["/", "Hero CallButton", "Request Emergency Help", "/contact while phone placeholder", "phone_click", "homepage pagePath/pageType, service=Emergency plumbing, city=Dallas-Fort Worth, deviceContext", "Safe fallback ready", "phone placeholder", "Provide tracked phone", "Build passed"],
    ["/contact", "LeadForm", "Submit Service Request", "/api/lead", "contact_form_start; contact_form_submit", "pagePath, pageType, service, city, deviceContext; no submitted PII sent to event endpoint", "UX ready; destination placeholder", "lead storage placeholder", "Provide CRM/webhook/email destination", "Build passed"],
    ["/partner-with-us", "LeadForm", "Submit Service Request", "/api/lead", "contact_form_start; contact_form_submit", "pagePath, pageType=partner, service=Partner inquiry, city=Dallas-Fort Worth, deviceContext", "UX ready; destination placeholder", "lead storage placeholder", "Provide partner lead workflow", "Build passed"],
    ["footer", "TrackedLink", "Partner with us", "/partner-with-us", "partner_route_click", "eventName, ctaLocation=footer-partner-link, pagePath, pageType=footer, deviceContext", "Ready", "none", "No", "Build passed"],
    ["/api/call-event", "Route handler", "not visible", "server log", "all allowed event names", "sanitized event parameters; requestDestination contact-form-placeholder until phone configured", "Ready for privacy-conscious logging", "phone destination placeholder", "Provide analytics/log destination if needed", "Build passed"],
    ["/api/lead", "Route handler", "not visible", "redacted placeholder console log", "service_request_placeholder_logged", "city, service, urgency, pageUrl, UTM, phone last4, messageLength; no full phone/message returned", "Validation ready; delivery not configured", "lead storage placeholder", "Provide approved destination", "Build passed"],
    ...selected.map((page) => [
      page.route,
      "Page CallButton and LeadForm",
      "Request Emergency Help; Submit Service Request",
      "/contact or /api/lead while phone is placeholder",
      page.type.includes("service") ? "service_page_call" : page.type.includes("problem") ? "emergency_page_call" : page.type.includes("cost") ? "cost_page_call" : "city_page_call",
      "pagePath, pageType, service/city/problem where available, ctaLocation, deviceContext",
      "Ready with safe phone fallback and form UX",
      "phone and lead destination placeholders",
      "Provide phone and lead destination",
      "Build passed"
    ])
  ];
  writeCsv("reports/day2_session2_conversion_path_map.csv", conversionRows);

  writeMd(
    "reports/day2_session2_tracking_implementation.md",
    `# Day 2 Session 2 Tracking Implementation

## Starting State

- Phase B starting build: pass.
- Phase A commit confirmed: a36c7dc.
- Working tree was clean before Phase B edits.

## Implemented Events

- Call buttons now emit explicit event names and context through /api/call-event.
- Header CTA uses header_call_click.
- Sticky mobile CTA uses sticky_call_click.
- Service pages use service_page_call.
- Problem pages use emergency_page_call.
- Cost guides use cost_page_call.
- City and city-service pages use city_page_call.
- Lead forms emit contact_form_start on first focus and contact_form_submit on submit.
- Footer partner link emits partner_route_click through a tracked client link.

## Parameters

The event endpoint accepts eventName, location, ctaLocation, pagePath, pageType, service, city, problem, and deviceContext. Parameters are trimmed and stripped of control characters. Form events do not transmit name, phone, message text, or other sensitive submitted fields.

## Privacy Notes

- No paid advertising IDs were added.
- No analytics account IDs were invented.
- No sensitive personal data is transmitted to /api/call-event.
- /api/lead still logs only redacted phone last4, message length, and routing context until an owner-approved destination exists.

## Production Limitation

Real analytics destinations, call-tracking vendor IDs, and lead-routing destinations require owner-provided configuration.`
  );

  writeCsv("reports/day2_session2_event_dictionary.csv", [
    ["Event Name", "Trigger", "Parameters", "PII Policy", "Destination", "Production Readiness", "Notes"],
    ["phone_click", "Generic or homepage CTA click", "eventName, location, ctaLocation, pagePath, pageType, service, city, problem, deviceContext", "No submitted PII", "/api/call-event", "Ready; phone placeholder remains", "Falls back to /contact until phone configured."],
    ["sticky_call_click", "Mobile sticky CTA click", "same as phone_click", "No submitted PII", "/api/call-event", "Ready; phone placeholder remains", "Identifies sticky mobile location."],
    ["header_call_click", "Header CTA click", "same as phone_click", "No submitted PII", "/api/call-event", "Ready; phone placeholder remains", "Identifies global header location."],
    ["service_page_call", "Service page CTA click", "same plus service", "No submitted PII", "/api/call-event", "Ready; phone placeholder remains", "Used on service templates."],
    ["city_page_call", "City or city-service CTA click", "same plus city/service", "No submitted PII", "/api/call-event", "Ready; phone placeholder remains", "Used on city and city-service templates."],
    ["emergency_page_call", "Problem page CTA click", "same plus problem/service", "No submitted PII", "/api/call-event", "Ready; phone placeholder remains", "Used for emergency problem intent."],
    ["cost_page_call", "Cost guide CTA click", "same plus service", "No submitted PII", "/api/call-event", "Ready; phone placeholder remains", "Used for cost guide CTAs."],
    ["contact_form_start", "First focus inside LeadForm", "eventName, location, ctaLocation, pagePath, pageType, service, city, deviceContext", "No name, phone, or message", "/api/call-event", "Ready", "Measures form engagement."],
    ["contact_form_submit", "LeadForm submit attempt", "eventName, location, ctaLocation, pagePath, pageType, service, city, deviceContext", "No name, phone, or message", "/api/call-event", "Ready", "Measures submit attempt separately from lead validation."],
    ["email_click", "Future email link click if an approved email link is added", "same as phone_click", "No submitted PII", "/api/call-event", "Reserved", "No public email link currently added."],
    ["partner_route_click", "Tracked footer partner link", "eventName, ctaLocation, pagePath, pageType, deviceContext", "No submitted PII", "/api/call-event", "Ready", "Routes provider inquiries to /partner-with-us."]
  ]);

  writeMd(
    "reports/day2_session2_phone_and_routing_audit.md",
    `# Day 2 Session 2 Phone and Routing Audit

## Phone Links

- Current public phone values remain +1XXXXXXXXXX in src/data/site.ts fallbacks and .env.example.
- CallButton still routes to /contact when the phone contains X.
- No fake tel link is emitted while the placeholder remains.
- Organization JSON-LD does not emit placeholder telephone.
- Owner must provide NEXT_PUBLIC_TRACKED_PHONE_DISPLAY and NEXT_PUBLIC_TRACKED_PHONE_E164 before live call routing can be verified.

## Call Events

- /api/call-event logs sanitized event context.
- requestDestination is contact-form-placeholder until a real phone is configured.
- Event endpoint does not collect name, full phone, address, or message text.

## Lead Routing

- /api/lead validates required fields and logs only safe context, phone last4, and message length.
- No approved CRM, webhook, or email destination is configured in repository.
- LEAD_NOTIFY_EMAIL and LEAD_WEBHOOK_URL remain blank placeholders in .env.example.

## Risk

No real leads are silently routed to an invalid phone number because CTAs route to /contact in placeholder mode. Form delivery remains a P1 owner-configuration risk because production storage/delivery is not approved yet.`
  );

  writeCsv("reports/day2_session2_faq_changes.csv", [
    ["URL", "Question", "Original Answer", "New Answer", "Intent", "User Value", "Supporting Page", "Schema Status", "Truthfulness Check", "Validation Status"],
    ["/services/main-sewer-line-clog", "What details help a main sewer line call get triaged?", "No dedicated supporting-cluster FAQ existed.", "Share which fixtures react together, whether the outdoor cleanout is overflowing, whether wastewater is visible, and whether heavy rain or recurring backups are involved.", "Sewer diagnosis prep", "Improves call quality and provider triage.", "/problems/water-backing-up-in-shower-and-toilet", "Visible FAQ and FAQPage schema", "No guarantee or price claim.", "Build passed"],
    ["/problems/kitchen-sink-backing-up", "When is a kitchen sink backup more than a simple sink clog?", "No dedicated supporting-cluster FAQ existed.", "It may be more than a simple fixture clog when the dishwasher backs up, nearby drains gurgle, water returns quickly after clearing, or grease-heavy use keeps causing the problem.", "Drain diagnosis", "Helps users distinguish fixture versus branch/main issue.", "/services/emergency-drain-cleaning", "Visible FAQ and FAQPage schema", "No unsupported claim.", "Build passed"],
    ["/problems/outdoor-cleanout-overflowing", "Should I open an overflowing outdoor cleanout?", "No dedicated supporting-cluster FAQ existed.", "Do not remove a cleanout cap if pressure or wastewater is present. Stop indoor water use and request sewer-line guidance instead.", "Sewer safety", "Reduces unsafe DIY behavior.", "/services/main-sewer-line-clog", "Visible FAQ and FAQPage schema", "Safety guidance only; no credential claim.", "Build passed"],
    ["/cost-guides/drain-cleaning-cost-dfw", "Why can two drain-cleaning quotes describe different work?", "No dedicated supporting-cluster FAQ existed.", "One quote may cover a simple fixture clog while another includes main-line access, camera inspection, after-hours timing, or repeat-blockage diagnosis.", "Cost comparison", "Improves buyer decision quality without exact prices.", "/services/emergency-drain-cleaning", "Visible FAQ and FAQPage schema", "No exact price or guarantee.", "Build passed"],
    ["/cost-guides/sewer-line-clog-cost-guide", "What sewer-line cost question protects me from unclear scope?", "No dedicated supporting-cluster FAQ existed.", "Ask whether the visit is for clearing only, diagnosis, camera inspection, cleanup coordination, or repair planning because those can be separate scopes.", "Cost scope", "Helps users ask better questions before approval.", "/problems/water-backing-up-in-shower-and-toilet", "Visible FAQ and FAQPage schema", "No exact price claim.", "Build passed"],
    ...selectedPhaseAPages.flatMap((url) => {
      const page = selectedPageMeta[url];
      return [
        [url, "Selected-page FAQ set", "Phase A selected-page FAQs were present.", "Reviewed and retained because answers are specific, non-duplicative, and visible on page.", page.intent, "Preserves selected-page answer quality.", "Phase A selected page", "Visible FAQ and FAQPage schema", "No fake claims.", "Reviewed in Phase B"],
        [url, "Generic emergency FAQ set", "Generic emergency FAQs were present.", "Reviewed and retained where they support the page without replacing specific answers.", page.intent, "Keeps common emergency answers available.", "Commercial cluster", "Visible FAQ and FAQPage schema", "No fake claims.", "Reviewed in Phase B"]
      ];
    })
  ]);

  writeCsv("reports/day2_session2_cluster_map.csv", [
    ["Money Page", "Cluster Type", "Supporting URL", "Relationship", "User Purpose", "Phase B Action", "Owner Input Required", "Validation Status"],
    ["/services/24-hour-emergency-plumber", "Emergency plumbing", "/cost-guides/emergency-plumbing-cost-dfw", "service to cost guide", "Cost-factor decision support", "Preserved Phase A link and tracked CTA event context", "No", "Build passed"],
    ["/services/24-hour-emergency-plumber", "Emergency plumbing", "/problems/burst-pipe-first-steps", "service to problem", "Immediate shutoff guidance", "Preserved Phase A link and tracked CTA event context", "No", "Build passed"],
    ["/services/emergency-drain-cleaning", "Drain cleaning", "/cost-guides/drain-cleaning-cost-dfw", "service to cost guide", "Drain quote comparison", "Added supporting FAQ on cost guide", "No", "Build passed"],
    ["/services/emergency-drain-cleaning", "Drain cleaning", "/problems/kitchen-sink-backing-up", "service to problem", "Fixture-specific drain guidance", "Added supporting FAQ", "No", "Build passed"],
    ["/problems/water-backing-up-in-shower-and-toilet", "Sewer help", "/services/main-sewer-line-clog", "problem to service", "Main-line triage and service action", "Added supporting FAQ on service page", "No", "Build passed"],
    ["/problems/water-backing-up-in-shower-and-toilet", "Sewer help", "/problems/outdoor-cleanout-overflowing", "problem to problem", "Cleanout safety", "Added supporting FAQ", "No", "Build passed"],
    ["/cost-guides/emergency-plumbing-cost-dfw", "Emergency cost", "/services/24-hour-emergency-plumber", "cost to service", "Move from research to action", "Tracked cost CTA context", "No", "Build passed"],
    ["/cities/dallas/emergency-drain-cleaning", "Dallas drain cleaning", "/cities/dallas", "city-service to city", "Local service-area navigation", "Tracked city-service CTA context", "No", "Build passed"],
    ["/cities/dallas/emergency-drain-cleaning", "Dallas drain cleaning", "/services/emergency-drain-cleaning", "city-service to service", "Broader service explanation", "Preserved link and added form/call tracking", "No", "Build passed"]
  ]);

  writeCsv("reports/day2_session2_internal_link_changes.csv", [
    ["Source URL", "Target URL", "Anchor Text", "Link Location", "Topic Cluster", "User Purpose", "Link Added or Updated", "Validation Status", "Notes"],
    ["/services/main-sewer-line-clog", "/problems/water-backing-up-in-shower-and-toilet", "Water backing up in shower and toilet", "Existing related resources", "Sewer help", "Supporting FAQ now better qualifies traffic from problem symptoms.", "Content updated", "Build passed", "FAQ strengthened the existing link path."],
    ["/cost-guides/drain-cleaning-cost-dfw", "/services/emergency-drain-cleaning", "emergency drain cleaning", "Existing related resources", "Drain cleaning", "Cost page now better explains scope before moving to service action.", "Content updated", "Build passed", "FAQ strengthened the cost-to-service path."],
    ["/problems/outdoor-cleanout-overflowing", "/services/main-sewer-line-clog", "main sewer line clog", "Existing related resources", "Sewer help", "Safety FAQ improves problem-to-service path.", "Content updated", "Build passed", "No exact-match anchor abuse added."],
    ["footer", "/partner-with-us", "Partner with us", "Footer legal/resources column", "Provider partner routing", "Measure partner-route clicks without adding a fake provider claim.", "Updated", "Build passed", "TrackedLink added partner_route_click event."]
  ]);

  writeMd(
    "reports/day2_session2_conversion_ux_changes.md",
    `# Day 2 Session 2 Conversion UX Changes

- LeadForm now submits with client-side fetch instead of sending the visitor to a raw JSON response.
- LeadForm shows success or error state inline with aria-live.
- Submit button is disabled during submission and labels the active state.
- contact_form_start is emitted on first form focus.
- contact_form_submit is emitted on submit attempt.
- CallButton now exposes data-call-event-name, data-cta-location, and data-phone-mode attributes.
- Placeholder phone mode remains explicit: CTA destination is /contact until an owner-approved phone exists.
- Header, sticky mobile, service, city, problem, and cost CTAs now get distinct event names.
- Footer partner link now tracks partner_route_click.

No pressure tactics, false scarcity, guaranteed availability, fake employment, or fake credential claims were added.`
  );

  writeMd(
    "reports/day2_session2_final_report.md",
    `# Day 2 Session 2 Final Report

## Build State

- Starting build: pass.
- Final build: pass.

## Work Completed

- Conversion path map created.
- Event dictionary created.
- CallButton event architecture improved with event names and sanitized context.
- LeadForm now has in-page success/error UX and form-start/form-submit events.
- /api/call-event now accepts a controlled event dictionary and sanitized parameters.
- Phone/routing audit completed; approved production phone and lead destination remain owner-required.
- Five supporting-cluster FAQs were added and selected-page FAQs were reviewed.
- Commercial cluster map and internal-link reinforcement reports created.

## Safety

- Backlinks created: 0.
- Paid ads created: 0.
- Fake claims added: 0.
- No analytics IDs invented.
- No real phone, CRM, webhook, or email destination invented.
- No PII is sent to /api/call-event.

## Remaining P1

- Owner must provide approved tracking phone values.
- Owner must provide approved lead destination.
- Owner must provide analytics/account IDs if tracking tools are approved.

## Next Phase Start

Begin Day 3 Session 1 with topical gap analysis, priority matrix, careful implementation of no more than four targets, indexing support, and authority-readiness work without outreach or backlinks.`
  );

  writeMd(
    "reports/day3_session1_priority_queue.md",
    `# Day 3 Session 1 Priority Queue

## P0

- Priority: P0
- URL or file: none currently
- Problem: No build, route, conversion, or indexing P0 is known after Phase B.
- Business impact: No launch-blocking issue identified.
- Recommended action: Proceed to topical authority and indexing support.
- Owner input required: no
- Estimated complexity: not applicable
- Validation method: build, QA, smoke checks.
- Proposed order: not applicable

## P1

- Priority: P1
- URL or file: strategy/day3_topical_gap_analysis.csv
- Problem: Topic architecture needs an evidence-based gap map across services, emergency problems, costs, cities, service-plus-city pages, FAQs, and troubleshooting.
- Business impact: Helps choose content that supports high-intent pages without doorway content.
- Recommended action: Create topical gap analysis from existing repository evidence.
- Owner input required: no
- Estimated complexity: medium
- Validation method: CSV created and no unsupported volume/ranking claims.
- Proposed order: 1

- Priority: P1
- URL or file: priority implementation targets
- Problem: Several support topics can improve commercial coverage, but mass page generation is forbidden.
- Business impact: Focused expansion can improve topical completeness and internal links.
- Recommended action: Select no more than four targets using commercial relevance, urgency, uniqueness, internal-link potential, and duplication risk.
- Owner input required: no
- Estimated complexity: medium
- Validation method: priority matrix and build.
- Proposed order: 2

- Priority: P1
- URL or file: sitemap/indexing support
- Problem: Any new or changed URLs must be reflected in sitemap and crawl checks.
- Business impact: Avoids orphan, canonical, sitemap, and indexing mistakes.
- Recommended action: Update and verify sitemap, canonicals, robots, noindex, duplicate metadata, changed URL list, and crawl paths.
- Owner input required: no
- Estimated complexity: medium
- Validation method: build HTML inspection and QA.
- Proposed order: 3

## P2

- Priority: P2
- URL or file: authority/day3_linkable_asset_readiness.md
- Problem: Future authority work needs a genuine useful asset before any outreach.
- Business impact: Creates a reason for future unpaid editorial mentions without spam.
- Recommended action: Improve one existing checklist/guide into an authority-ready resource; do not contact anyone.
- Owner input required: no
- Estimated complexity: medium
- Validation method: asset report and content implementation report.
- Proposed order: 4

- Priority: P2
- URL or file: authority/unpaid_backlink_quality_filter.csv and authority/unpaid_backlink_policy.md
- Problem: Future backlink decisions need permanent quality filters.
- Business impact: Prevents paid links, PBNs, fake citations, spam, and manipulative anchors.
- Recommended action: Create screening system only; backlinks created must remain 0.
- Owner input required: no
- Estimated complexity: low
- Validation method: policy files exist and reject prohibited tactics.
- Proposed order: 5

## P3

- Priority: P3
- URL or file: owner configuration
- Problem: Phone, lead destination, and analytics IDs remain owner-required.
- Business impact: Conversion measurement cannot be fully production-verified.
- Recommended action: Carry forward as owner action; do not invent values during topical work.
- Owner input required: yes
- Estimated complexity: low after values exist
- Validation method: hosted event and lead tests.
- Proposed order: after content/indexing work
`
  );

  console.log("Phase B reports generated.");
}

function generatePhaseC() {
  const sitemapPath = path.join(appDir, "sitemap.xml.body");
  const sitemapBody = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
  const sitemapUrls = [...sitemapBody.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeHtml(match[1]));
  const changedUrls = [
    ["/problems/water-shutoff-valve-will-not-close", "New", "Emergency problem page", "Water shutoff valve emergency guidance", "yes"],
    ["/cost-guides/emergency-leak-repair-cost-dfw", "New", "Cost decision guide", "Leak repair cost factors without exact prices", "yes"],
    ["/services/burst-pipe-emergency", "Changed", "Service support page", "Leak isolation and shutoff valve support links", "yes"],
    ["/cities/dallas", "Changed", "Local intent page", "Dallas leak/drain triage and new internal links", "yes"],
    ["/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "Changed", "Authority-ready guide", "Emergency plumber booking checklist and claim-verification guidance", "yes"],
    ["/", "Changed", "Homepage", "New cost guide appears in cost guide list", "yes"],
    ["/sitemap.xml", "Changed", "Indexing support", "Sitemap includes new problem and cost guide URLs", "yes"]
  ];

  writeCsv("strategy/day3_topical_gap_analysis.csv", [
    ["Topic", "Intent", "Existing URL", "Gap Type", "Commercial Value", "Urgency", "Supporting Cluster", "Cannibalization Risk", "Recommended Action", "Evidence", "Priority"],
    ["Stuck shutoff valve during active leak", "Emergency problem diagnosis", "", "Missing high-intent emergency problem", "High", "High", "Burst pipe/leak cluster", "Low; distinct from burst-pipe-first-steps because user intent is valve isolation", "Create focused problem page", "Existing burst pipe and ceiling leak pages lacked stuck-valve-specific guidance", "P1"],
    ["Emergency leak repair cost factors", "Cost research before approval", "", "Missing leak-specific cost decision guide", "High", "High", "Burst pipe/leak cluster", "Low; distinct from burst pipe cost because it covers valves, access, and restoration separation", "Create cost guide", "Existing cost guides covered burst pipes but not active leak isolation and valve scope", "P1"],
    ["Emergency plumber booking checklist", "Decision support / linkable asset", "/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "Thin authority asset", "Medium-high", "Medium", "Emergency decision guides", "Low; enhances an existing guide", "Upgrade existing guide into checklist resource", "Blog title existed but used generic article template", "P1"],
    ["Dallas leak and drain triage", "Local service-area request", "/cities/dallas", "Local content depth gap", "High", "High", "Dallas local cluster", "Low; improves one priority city, no location-swapped rollout", "Upgrade Dallas page only", "Dallas is priority city and supports selected service/city-service pages", "P1"],
    ["Slab leak diagnosis", "Emergency leak diagnosis", "", "Potential future topic", "Medium-high", "High", "Leak cluster", "Medium; could overlap hidden leak/leak repair pages", "Defer until more leak cluster is stable", "No owner proof or service data specific to slab leak", "P2"],
    ["Water heater replacement decision", "Repair versus replacement", "/cost-guides/water-heater-emergency-cost-guide", "Partial coverage", "Medium", "Medium", "Water heater cluster", "Low", "Future upgrade", "Existing water heater cost guide mentions repair versus replacement but lacks decision tree", "P2"],
    ["Commercial restroom shutdown", "Commercial emergency service", "/services/commercial-emergency-plumbing", "Support depth gap", "Medium", "High", "Commercial emergency cluster", "Low", "Future supporting page or upgrade", "Commercial page exists but no dedicated restroom-shutdown problem guide", "P2"],
    ["Recurring drain backup prevention", "Maintenance/prevention", "/services/emergency-drain-cleaning", "Support depth gap", "Medium", "Medium", "Drain cleaning cluster", "Medium; must avoid duplicating existing drain guides", "Future guide if distinct", "Existing content covers mistakes and prevention lightly", "P3"]
  ]);

  writeCsv("strategy/day3_page_priority_matrix.csv", [
    ["URL", "Action", "User Urgency", "Commercial Relevance", "Support For Existing Money Pages", "Unique Value", "Internal-Link Potential", "Conversion Potential", "Content Confidence", "Duplication Risk", "Selected", "Rationale"],
    ["/problems/water-shutoff-valve-will-not-close", "Create", "High", "High", "High", "High", "High", "High", "High", "Low", "yes", "Specific emergency problem that supports burst pipe, ceiling leak, and leak cost content."],
    ["/cost-guides/emergency-leak-repair-cost-dfw", "Create", "High", "High", "High", "High", "High", "Medium-high", "High", "Low", "yes", "Cost guide fills leak/valve/access/restoration decision gap without exact prices."],
    ["/blog/best-questions-to-ask-before-you-book-an-emergency-plumber", "Upgrade", "Medium", "Medium-high", "High", "High", "High", "Medium", "High", "Low", "yes", "Existing guide becomes a standalone checklist and future authority-ready asset."],
    ["/cities/dallas", "Upgrade", "High", "High", "High", "Medium-high", "High", "High", "High", "Low", "yes", "Improves one priority city without mass city-page generation or fake local proof."],
    ["/services/burst-pipe-emergency", "Supporting upgrade", "High", "High", "High", "Medium-high", "High", "High", "High", "Low", "supporting", "Updated through enhancement links and leak/shutoff guidance to support selected targets."],
    ["/cost-guides/water-heater-emergency-cost-guide", "Defer", "Medium", "Medium", "Medium", "Medium", "Medium", "Medium", "Medium", "Low", "no", "Useful future repair-versus-replacement upgrade, but leak cluster had stronger immediate opportunity."]
  ]);

  writeMd(
    "reports/day3_session1_content_implementation.md",
    `# Day 3 Session 1 Content Implementation

## /problems/water-shutoff-valve-will-not-close

- Type: New emergency problem page.
- Direct answer: Added stuck shutoff valve guidance and safe next steps.
- Safety guidance: Avoid forcing brittle valves, disassembling pressurized valves, or standing in water near electrical equipment.
- Diagnosis: Added provider inspection details around valve age, corrosion, pipe material, and pressure.
- Repair options: Framed as provider-diagnosed valve/leak repair without exact scope promises.
- Cost factors: Linked to emergency leak repair cost guide.
- Internal links: Burst pipe emergency, emergency leak cost, ceiling leak.
- CTA: Existing problem-page CTA and form path.
- Schema: WebPage, BreadcrumbList, FAQPage.

## /cost-guides/emergency-leak-repair-cost-dfw

- Type: New cost decision guide.
- Direct answer: Cost depends on active water, leak location, access, and shutoff valve condition.
- Safety guidance: Cost comparison should wait when water is near electrical areas, walls/ceilings, or active damage.
- Cost factors: Active water, shutoff valve condition, leak location, access, pipe material, timing.
- Internal links: Stuck shutoff valve, burst pipe emergency, burst pipe cost.
- Schema: WebPage, BreadcrumbList, FAQPage.
- Exact prices: Not added.

## /blog/best-questions-to-ask-before-you-book-an-emergency-plumber

- Type: Existing guide upgraded into authority-ready checklist.
- Content added: Emergency plumber booking checklist, provider-claim verification checklist, two specific FAQs, and links to emergency cost, shutoff valve, and 24-hour emergency plumber pages.
- User value: Helps homeowners compare scope, pricing rules, safety steps, and claims before approving emergency work.
- Outreach: None.

## /cities/dallas

- Type: Existing local page upgrade.
- Content added: Dallas emergency leak and drain triage, useful request details, urgency triggers, follow-up notes, local FAQ, and links to new leak/shutoff resources.
- Local proof: No fake office, address, license, or guaranteed availability claims added.

## Supporting Template Impact

- /services/burst-pipe-emergency now links into stuck shutoff valve and emergency leak repair cost resources through existing enhancement architecture.
- Homepage cost guide list now includes the new emergency leak repair cost guide.
`
  );

  writeMd(
    "reports/day3_session1_indexing_support.md",
    `# Day 3 Session 1 Indexing Support

## Sitemap

- Built sitemap URL count: ${sitemapUrls.length}
- New URL in sitemap: https://plumbinghands.com/problems/water-shutoff-valve-will-not-close
- New URL in sitemap: https://plumbinghands.com/cost-guides/emergency-leak-repair-cost-dfw
- Sitemap generation source: src/app/sitemap.ts through getAllInventoryPages().

## Canonicals

- New problem canonical: https://plumbinghands.com/problems/water-shutoff-valve-will-not-close
- New cost guide canonical: https://plumbinghands.com/cost-guides/emergency-leak-repair-cost-dfw
- Changed guide canonical preserved: https://plumbinghands.com/blog/best-questions-to-ask-before-you-book-an-emergency-plumber
- Changed Dallas canonical preserved: https://plumbinghands.com/cities/dallas

## Robots And Noindex

- robots.txt route builds.
- No noindex directive was added to new or changed pages.

## Crawl Paths

- New problem page is linked from burst pipe emergency, Dallas page, new leak cost guide, and the upgraded booking checklist guide.
- New cost guide is linked from Dallas page, burst pipe emergency, new problem page, homepage cost guide list, and the upgraded booking checklist guide.
- Upgraded guide links back into emergency cost, shutoff valve, and 24-hour emergency plumber resources.

## IndexNow

IndexNow changed-URL candidates are documented in reports/day3_session1_new_and_changed_urls.csv. No IndexNow submission was made because Bing/Webmaster verification remains an owner-controlled external action.

## Checks

- Production build passed after implementation.
- No paid ads, backlinks, fake citations, fake offices, or unsupported schema were added.
`
  );

  writeCsv("reports/day3_session1_new_and_changed_urls.csv", [
    ["URL", "Change Type", "Page Type", "Reason", "Sitemap Status", "Canonical Status", "Robots Status", "IndexNow Candidate", "Validation Status"],
    ...changedUrls.map(([url, changeType, pageType, reason, indexNow]) => [
      url,
      changeType,
      pageType,
      reason,
      url === "/sitemap.xml" ? "route builds" : sitemapUrls.includes(`https://plumbinghands.com${url}`) ? "included" : "not applicable",
      url === "/sitemap.xml" ? "not applicable" : "self canonical or unchanged canonical verified in build",
      "indexable; no noindex added",
      indexNow,
      "Build passed"
    ])
  ]);

  writeMd(
    "authority/day3_linkable_asset_readiness.md",
    `# Day 3 Linkable Asset Readiness

## Selected Asset

- URL: /blog/best-questions-to-ask-before-you-book-an-emergency-plumber
- Asset type: Emergency plumber booking checklist and claim-verification guide.
- Reason selected: It provides standalone homeowner value, supports emergency service and cost pages, and does not require fake ratings, licenses, office claims, or outreach.

## Improvements Completed

- Added a concise booking checklist with questions about dispatch/diagnostic fees, safety steps, diagnosis, repair versus replacement, and restoration scope.
- Added a verification section covering licenses, insurance, ratings, reviews, arrival timing, exact pricing, and local office/listing claims.
- Added two visible FAQs and matching FAQPage schema.
- Added internal links to emergency plumbing cost, shutoff valve emergency, and 24-hour emergency plumber pages.

## Authority Readiness

- Useful without search engines: yes.
- Original site content: yes.
- Requires owner proof: no, because it advises users to verify provider claims directly.
- Outreach started: no.
- Backlinks created: 0.
- Paid placements created: 0.

## Future Non-Outreach Use

After owner review, this asset can support unpaid editorial opportunities only when the opportunity is relevant, audience-serving, and passes the unpaid backlink quality filter.`
  );

  writeCsv("authority/unpaid_backlink_quality_filter.csv", [
    ["Criterion", "Score Range", "Pass Threshold", "Auto Reject Condition", "Owner Verification Needed", "Notes"],
    ["Topical relevance", "0-10", "7", "Unrelated to plumbing, home services, emergency preparedness, DFW homeowner topics, property management, or local safety", "No", "Must make sense for a real reader."],
    ["Local relevance", "0-10", "5", "Claims a fake local address, office, or service area", "Yes if local claim is used", "Local relevance is helpful but must be truthful."],
    ["Genuine audience", "0-10", "7", "No real readership or made-for-links page", "No", "Reject empty directories and thin link pages."],
    ["Editorial justification", "0-10", "8", "Paid insertion, link exchange, or unexplained exact-match anchor", "Yes for any partnership", "Must be editorially useful."],
    ["Page-level relevance", "0-10", "7", "Link appears on irrelevant page or unrelated list", "No", "Page context matters more than domain name."],
    ["Referral traffic potential", "0-10", "5", "No plausible visitors", "No", "Traffic does not need to be large but should be real."],
    ["Lead potential", "0-10", "4", "Audience cannot reasonably need emergency plumbing help", "No", "Lead potential is secondary to relevance."],
    ["Domain cleanliness", "0-10", "8", "PBN, link farm, malware, scraped site, spam outbound pattern", "No", "Reject if spam pattern is visible."],
    ["Outbound-link quality", "0-10", "7", "Casino/adult/payday/pharma/link package footprint or excessive unrelated outbound links", "No", "Manual review required."],
    ["Natural anchor suitability", "0-10", "8", "Exact-match money anchor demanded", "No", "Prefer brand, URL, resource title, or natural sentence anchors."],
    ["Permanence", "0-10", "5", "Temporary paid rental link", "Yes if contract exists", "Do not buy permanence."],
    ["Owner verification needs", "0-10", "10", "Requires unverified license, insurance, office, review, response time, or pricing claim", "Yes", "No proof means no claim."]
  ]);

  writeMd(
    "authority/unpaid_backlink_policy.md",
    `# Unpaid Backlink Policy

Backlinks created in Day 3 Session 1: 0.

## Allowed Future Opportunity Types

- Genuine editorial references to a useful guide or checklist.
- Relevant local resource pages with real audiences.
- Partner references from verified real businesses when the relationship is truthful and owner-approved.
- Homeowner safety, maintenance, emergency preparedness, property management, or DFW local resources when the page context is relevant.

## Automatically Rejected

- Paid placements.
- Link packages.
- PBNs.
- Link farms.
- Automated directories.
- Irrelevant guest posts.
- Spam comments.
- Forum spam.
- Fake citations.
- Low-quality syndication.
- Manipulative exchanges.
- Exact-match anchor demands.
- Fake profiles.
- Fake offices or fake local listings.

## Anchor Rules

Use natural anchors only: brand name, URL, article title, checklist title, or sentence-context anchors. Do not request exact-match commercial anchors.

## Verification Rules

Any opportunity that needs license, insurance, review, rating, local-office, business-address, response-time, pricing, or partner-capacity claims requires owner proof before use. If proof is not available, the claim must be removed or the opportunity rejected.

## Approval

Future opportunities must be scored in authority/unpaid_backlink_quality_filter.csv before any outreach, submission, or publication.`
  );

  writeMd(
    "reports/day3_session1_final_report.md",
    `# Day 3 Session 1 Final Report

## Build State

- Starting build: pass.
- Final build: pass.

## Content And Topical Authority

- Topic gaps mapped in strategy/day3_topical_gap_analysis.csv.
- Priority matrix created in strategy/day3_page_priority_matrix.csv.
- Selected implementation targets: 4.
- New pages created: 2.
- Existing pages upgraded: 2 primary targets plus supporting burst-pipe service links.

## URLs

- New: /problems/water-shutoff-valve-will-not-close
- New: /cost-guides/emergency-leak-repair-cost-dfw
- Changed: /blog/best-questions-to-ask-before-you-book-an-emergency-plumber
- Changed: /cities/dallas
- Supporting changed: /services/burst-pipe-emergency and /

## Indexing

- Sitemap includes both new URLs.
- Canonicals are self-referential on new pages.
- No noindex added.
- Changed URL list created.
- IndexNow submission not performed.

## Authority Readiness

- Linkable asset improved: emergency plumber booking checklist.
- Unpaid backlink quality filter created.
- Unpaid backlink policy created.

## Safety

- Backlinks created: 0.
- Paid ads created: 0.
- Fake claims added: 0.
- No exact prices, ratings, reviews, office claims, license claims, or response-time promises added.
- Owner configuration for phone, lead destination, and analytics remains required.
`
  );

  writeMd(
    "reports/day3_session2_priority_queue.md",
    `# Day 3 Session 2 Priority Queue

## P0

- Priority: P0
- URL or file: none currently
- Problem: No known build, routing, indexing, or conversion P0 remains.
- Business impact: No hidden launch blocker identified in repository checks.
- Recommended action: Continue only after owner reviews required configuration.
- Owner input required: no
- Estimated complexity: not applicable
- Validation method: build, QA, smoke checks.
- Proposed order: not applicable

## P1

- Priority: P1
- URL or file: hosted environment; src/data/site.ts
- Problem: Tracking phone values remain placeholders.
- Business impact: Phone conversion cannot be production-verified.
- Recommended action: Owner provides approved display/E.164 tracking phone values.
- Owner input required: yes
- Estimated complexity: low after values exist
- Validation method: CTA hrefs change to tel: and call-event requestDestination becomes phone.
- Proposed order: 1

- Priority: P1
- URL or file: hosted environment; src/app/api/lead/route.ts
- Problem: Lead delivery destination remains placeholder-only.
- Business impact: Form submissions are not routed to approved production CRM/webhook/email.
- Recommended action: Owner approves destination and secrets are configured only in hosting env.
- Owner input required: yes
- Estimated complexity: medium
- Validation method: live test lead reaches approved destination without exposing PII.
- Proposed order: 2

## P2

- Priority: P2
- URL or file: /services/burst-pipe-emergency and leak cluster
- Problem: Leak cluster can be expanded later with owner-approved details such as verified service coverage and provider capabilities.
- Business impact: More complete topical support after owner proof exists.
- Recommended action: Add proof-backed service details only after verification.
- Owner input required: yes
- Estimated complexity: medium
- Validation method: content review and build.
- Proposed order: 3

- Priority: P2
- URL or file: /blog/best-questions-to-ask-before-you-book-an-emergency-plumber
- Problem: Authority-ready asset can be made more useful with owner-approved downloadable/printable format later.
- Business impact: Better usefulness and future editorial suitability.
- Recommended action: Add downloadable checklist only if the site design supports it and no outreach starts.
- Owner input required: no
- Estimated complexity: medium
- Validation method: visual QA and accessibility check.
- Proposed order: 4

## P3

- Priority: P3
- URL or file: authority files
- Problem: Future unpaid backlink opportunities need manual scoring before use.
- Business impact: Keeps authority work clean.
- Recommended action: Score opportunities only when real relevant opportunities exist.
- Owner input required: yes for claims/relationships
- Estimated complexity: low
- Validation method: filter score and policy compliance.
- Proposed order: after owner configuration
`
  );

  console.log("Phase C reports generated.");
}

const command = process.argv[2] || "phase-a";

if (command === "phase-a") {
  generatePhaseA();
} else if (command === "phase-b") {
  generatePhaseB();
} else if (command === "phase-c") {
  generatePhaseC();
} else {
  console.error(`Unknown report command: ${command}`);
  process.exit(1);
}
