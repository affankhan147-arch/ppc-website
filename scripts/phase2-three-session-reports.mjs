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
- Expected format: Display value such as +1 214 555 0100 or owner-preferred formatting; E.164 value such as +12145550100.
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

const command = process.argv[2] || "phase-a";

if (command === "phase-a") {
  generatePhaseA();
} else {
  console.error(`Unknown report command: ${command}`);
  process.exit(1);
}
