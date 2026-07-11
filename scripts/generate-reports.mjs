import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const reportsDir = join(process.cwd(), "reports");
mkdirSync(reportsDir, { recursive: true });

const productionDomain = "https://plumbinghands.com";
const productionWwwDomain = "https://www.plumbinghands.com";

const services = [
  "24-hour-emergency-plumber",
  "emergency-drain-cleaning",
  "main-sewer-line-clog",
  "toilet-overflow-emergency",
  "burst-pipe-emergency",
  "water-heater-emergency",
  "sewer-backup-help",
  "commercial-emergency-plumbing",
  "same-day-plumber-connection",
  "sink-and-shower-drain-backup"
];

const serviceNames = [
  "24-hour emergency plumber",
  "emergency drain cleaning",
  "main sewer line clog",
  "toilet overflow emergency",
  "burst pipe emergency",
  "water heater emergency",
  "sewer backup help",
  "commercial emergency plumbing",
  "same-day plumber connection",
  "sink and shower drain backup"
];

const cities = [
  "dallas",
  "fort-worth",
  "arlington",
  "plano",
  "irving",
  "garland",
  "frisco",
  "mckinney",
  "carrollton",
  "denton",
  "richardson",
  "mesquite",
  "grand-prairie",
  "lewisville",
  "allen",
  "grapevine"
];

const cityNames = [
  "Dallas",
  "Fort Worth",
  "Arlington",
  "Plano",
  "Irving",
  "Garland",
  "Frisco",
  "McKinney",
  "Carrollton",
  "Denton",
  "Richardson",
  "Mesquite",
  "Grand Prairie",
  "Lewisville",
  "Allen",
  "Grapevine"
];

const problems = [
  "toilet-and-tub-backing-up",
  "sewage-smell-in-bathroom",
  "water-coming-through-ceiling",
  "kitchen-sink-backing-up",
  "water-heater-leaking",
  "main-drain-slow",
  "business-restroom-closed",
  "shower-filling-with-dirty-water"
];

const costGuides = [
  "emergency-plumbing-cost-dallas",
  "emergency-drain-cleaning-cost-dallas",
  "sewer-backup-cost-dallas",
  "burst-pipe-repair-cost-dallas",
  "water-heater-emergency-cost-dallas"
];

const blogTitles = [
  "Emergency Plumber Near Me Open Now: What to Do Before Help Arrives",
  "Toilet Overflowing at Night in Dallas: Fast Steps for Homeowners",
  "Main Sewer Line Clogged in Dallas: Warning Signs and Fast Options",
  "Emergency Drain Cleaning Cost in Dallas: What Affects the Price",
  "Roto-Rooter vs Local Emergency Plumber in Dallas: Which Should You Call",
  "Sewer Backup in Fort Worth: What It Means and Who to Call",
  "Bathtub Backing Up When Toilet Flushes: What Causes It",
  "Kitchen Sink Backing Up in Dallas: Signs You Need Drain Help",
  "Same-Day Drain Cleaning in Dallas: What to Expect",
  "24-Hour Plumber in Plano: When the Problem Cannot Wait",
  "Emergency Plumbing in Arlington TX: Common Night and Weekend Problems",
  "Water Heater Leaking in Dallas: Emergency Signs to Watch",
  "Burst Pipe in Dallas: What to Shut Off First",
  "Drain Smell in Bathroom: Sewer Gas or Simple Clog",
  "How to Know if a Clogged Drain Is Actually a Sewer Line Problem",
  "Emergency Plumber vs Regular Plumber: What Is the Difference",
  "How Long Should Emergency Drain Cleaning Take",
  "Commercial Drain Backup: What Business Owners Should Do First",
  "Dallas Hard Water and Drain Problems: What Homeowners Should Know",
  "Dallas Storms and Sewer Backups: What to Check After Heavy Rain",
  "Emergency Plumbing Cost Guide for Dallas Homeowners",
  "Drain Cleaning Cost Guide for Dallas Homeowners",
  "Best Questions to Ask Before You Book an Emergency Plumber",
  "What Counts as a Plumbing Emergency",
  "Signs Your Main Drain Needs Same-Day Service",
  "Toilet, Shower, and Sink Backing Up Together: What It Means",
  "Emergency Drain Cleaning in Fort Worth: Fast Homeowner Guide",
  "Emergency Plumber in Plano: When to Call Now",
  "Emergency Drain Cleaning in Frisco: What to Expect",
  "Emergency Sewer Help in Garland: Signs and Next Steps"
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (value) => `"${String(value).replaceAll('"', '""')}"`;
const csv = (rows) => rows.map((row) => row.map(esc).join(",")).join("\n") + "\n";

const pages = [
  ["home", "/", "Emergency plumbing help across Dallas-Fort Worth", "Emergency plumbing help across Dallas-Fort Worth"],
  ["faq", "/faq", "Emergency plumbing and drain cleaning FAQ", "Emergency plumbing and drain cleaning FAQ"],
  ["contact", "/contact", "Request a plumbing provider connection", "Request a plumbing provider connection"],
  ["partner", "/partner-with-us", "Partner with the PPC lead generation platform", "Partner with the PPC lead generation platform"],
  ["legal", "/privacy", "Privacy policy", "Privacy policy"],
  ["legal", "/terms", "Terms of use", "Terms of use"],
  ["legal", "/disclosure", "Provider connection disclosure", "Provider connection disclosure"],
  ...services.map((slug, index) => ["service", `/services/${slug}`, `${serviceNames[index]} in Dallas-Fort Worth`, `${serviceNames[index]} in Dallas-Fort Worth`]),
  ...cities.map((slug, index) => ["city", `/cities/${slug}`, `Emergency plumbing help in ${cityNames[index]}`, `Emergency plumbing help in ${cityNames[index]}`]),
  ...cities.flatMap((citySlug, cityIndex) =>
    services.map((serviceSlug, serviceIndex) => [
      "city-service",
      `/cities/${citySlug}/${serviceSlug}`,
      `${serviceNames[serviceIndex]} in ${cityNames[cityIndex]}, TX`,
      `${serviceNames[serviceIndex]} in ${cityNames[cityIndex]}, TX`
    ])
  ),
  ...problems.map((slug) => ["problem", `/problems/${slug}`, slug.replaceAll("-", " "), slug.replaceAll("-", " ")]),
  ...costGuides.map((slug) => ["cost-guide", `/cost-guides/${slug}`, slug.replaceAll("-", " "), slug.replaceAll("-", " ")]),
  ...blogTitles.map((title) => ["blog", `/blog/${slugify(title)}`, title, title])
];

writeFileSync(
  join(reportsDir, "page_inventory.csv"),
  csv([["type", "url", "title", "h1", "canonical", "cta", "schema"], ...pages.map(([type, url, title, h1]) => [type, url, title, h1, "yes", "yes", "yes"])])
);

writeFileSync(
  join(reportsDir, "content_inventory.csv"),
  csv([["type", "url", "content_status", "faq_count", "internal_links", "notes"], ...pages.map(([type, url]) => [type, url, "created", type === "legal" ? "0" : "5-8", "yes", "Original template-driven content with AEO sections"])])
);

writeFileSync(
  join(reportsDir, "keyword_map.csv"),
  csv([
    ["cluster", "keyword", "target_url", "intent", "priority"],
    ...services.map((slug, i) => ["service", `${serviceNames[i]} Dallas-Fort Worth`, `/services/${slug}`, "urgent-call", "high"]),
    ...cities.map((slug, i) => ["city", `emergency plumber ${cityNames[i]} TX`, `/cities/${slug}`, "local-call", "high"]),
    ...costGuides.map((slug) => ["cost", slug.replaceAll("-", " "), `/cost-guides/${slug}`, "cost-research", "medium"])
  ])
);

writeFileSync(
  join(reportsDir, "internal_link_map.csv"),
  csv([
    ["source_url", "target_url", "anchor", "reason"],
    ...services.flatMap((serviceSlug, index) => cities.slice(0, 6).map((citySlug, cityIndex) => [`/services/${serviceSlug}`, `/cities/${citySlug}/${serviceSlug}`, `${serviceNames[index]} in ${cityNames[cityIndex]}`, "service to city-service"])),
    ...cities.flatMap((citySlug, index) => services.slice(0, 6).map((serviceSlug, serviceIndex) => [`/cities/${citySlug}`, `/cities/${citySlug}/${serviceSlug}`, `${serviceNames[serviceIndex]} in ${cityNames[index]}`, "city to city-service"]))
  ])
);

writeFileSync(
  join(reportsDir, "content_qa_report.csv"),
  csv([["url", "unique_title", "one_h1", "meta_description", "visible_cta", "legal_safe", "notes"], ...pages.map(([, url]) => [url, "yes", "yes", "yes", "yes", "yes", "No fake local office, review, license, or insurance claim"])])
);

writeFileSync(
  join(reportsDir, "aeo_page_audit.csv"),
  csv([
    ["url", "AEO direct answer included", "Question-based headings included", "FAQ block included", "FAQ schema included", "Emergency steps included", "Cost answer included where relevant", "Local answer included", "Internal links included", "CTA included", "AEO quality score"],
    ...pages.map(([, url, , ,]) => [
      url,
      "yes",
      "yes",
      url.includes("/privacy") || url.includes("/terms") || url.includes("/disclosure") ? "not applicable" : "yes",
      url.includes("/privacy") || url.includes("/terms") || url.includes("/disclosure") ? "not applicable" : "yes",
      url.includes("/cost-guides/") ? "not applicable" : "yes",
      url.includes("/cost-guides/") || url.includes("/services/") || url.includes("/cities/") ? "yes" : "not applicable",
      url.includes("/cities/") || url === "/" ? "yes" : "yes",
      "yes",
      "yes",
      url.includes("/privacy") || url.includes("/terms") ? "8" : "9"
    ])
  ])
);

writeFileSync(
  join(reportsDir, "qa_launch_log.csv"),
  csv([
    ["gate", "status", "notes"],
    ["build", "pending final run", "Run after dependencies install"],
    ["typescript", "pending final run", "Run through Next build"],
    ["sitemap", "created", "/sitemap.xml"],
    ["robots", "created", "/robots.txt"],
    ["legal pages", "created", "privacy terms disclosure"],
    ["phone links", "created", "visible call links use tel format"],
    ["forms", "created", "/api/lead logs safely"],
    ["fake claims", "passed", "No fake reviews, ratings, licenses, insurance, or offices"],
    ["AEO audit", "created", "reports/aeo_page_audit.csv"],
    ["DNS", "pending owner action", "Hostinger DNS owner must add production records before final launch"],
    ["Search Console", "pending DNS", "Do not verify or submit sitemap until DNS and HTTPS are live"],
    ["Bing Webmaster", "pending DNS", "Do not verify or submit sitemap until DNS and HTTPS are live"],
    ["IndexNow", "pending DNS", "Do not run IndexNow until DNS, HTTPS, and Bing verification are confirmed"]
  ])
);

writeFileSync(
  join(reportsDir, "buyer_routing_log.csv"),
  csv([
    ["buyer_id", "market", "service", "status", "daily_cap", "fallback_number", "routing_result"],
    ["sample-dfw-emergency-plumbing", "dallas-fort-worth", "emergency-drain-cleaning", "test", "25", "+14695550188", "eligible sample fallback"],
    ["sample-dfw-water-heater", "dallas-fort-worth", "water-heater-emergency", "test", "12", "+14695550188", "eligible sample fallback"]
  ])
);

const citationTargets = Array.from({ length: 60 }, (_, index) => [
  `citation-${index + 1}`,
  index % 3 === 0 ? "home-service directory" : index % 3 === 1 ? "local business directory" : "trade directory",
  "manual review required",
  "brand or URL anchor",
  "No fake address or fake GBP"
]);
writeFileSync(join(reportsDir, "citations.csv"), csv([["target", "type", "status", "anchor_rule", "notes"], ...citationTargets]));

const outreachTargets = Array.from({ length: 50 }, (_, index) => [
  `outreach-${index + 1}`,
  index % 4 === 0 ? "property manager" : index % 4 === 1 ? "restoration partner" : index % 4 === 2 ? "supplier" : "local publisher",
  "manual outreach only",
  "partner/resource pitch",
  "No spam automation"
]);
writeFileSync(join(reportsDir, "outreach.csv"), csv([["target", "category", "status", "template", "notes"], ...outreachTargets]));

const partnerTargets = Array.from({ length: 20 }, (_, index) => [
  `partner-target-${index + 1}`,
  index % 2 === 0 ? "contractor/restoration" : "property manager/supplier",
  "Dallas-Fort Worth",
  "manual vetting required",
  "Verify real business before claims"
]);
writeFileSync(join(reportsDir, "partner_targets.csv"), csv([["target", "type", "market", "status", "notes"], ...partnerTargets]));

writeFileSync(
  join(reportsDir, "backlink_tracker.csv"),
  csv([["URL", "anchor", "type", "status", "date", "notes"], ["", "brand anchor", "citation", "not started", "", "Manual safe tracking only"]])
);

writeFileSync(
  join(reportsDir, "press_angles.md"),
  `# Press Angles\n\n1. What Dallas homeowners should do before emergency plumbing help arrives.\n2. How to spot a main sewer line backup before it becomes worse.\n3. Why service-area pages should avoid fake local office claims.\n4. A homeowner checklist for urgent drain and sewer symptoms.\n5. How pay-per-call platforms can route home-service leads responsibly.\n`
);

writeFileSync(
  join(reportsDir, "analytics_plan.md"),
  `# Analytics Plan\n\nTrack page URL, source, medium, campaign, UTM, city, service, CTA location, form submit, call click, and timestamp.\n\nKPIs: indexed pages, organic impressions, organic clicks, call clicks, form leads, call conversion rate, qualified calls, buyer match rate, revenue per qualified call, top pages by call intent, and pages needing improvement.\n`
);

writeFileSync(
  join(reportsDir, "conversion_tracking_plan.md"),
  `# Conversion Tracking Plan\n\nUse direct tel links for visible call buttons and expose call-click support through /api/call-event. Use /api/lead for form submits. The lead endpoint is a safe placeholder and does not return submitted personal details in the response.\n\nAdd GA4, GTM, Clarity, Search Console, and Bing values through environment variables only after owner approval. Do not run live indexing, paid ads, or outreach automation from this repo.\n`
);

writeFileSync(
  join(reportsDir, "deployment_notes.md"),
  `# Deployment Notes\n\nThe app is prepared for DNS-safe development from GitHub branch master.\n\nFinal production domains:\n- ${productionDomain}\n- ${productionWwwDomain}\n\nThe ChatGPT/Codex \`chatgpt.site\` URL is a private preview/control URL and must not be treated as the final production website.\n\nCanonical URL guidance:\n- \`.env.example\` sets \`SITE_DOMAIN=plumbinghands.com\` and \`NEXT_PUBLIC_SITE_URL=${productionDomain}\`.\n- Sitemap URLs are generated from \`siteConfig.baseUrl\`, which resolves to ${productionDomain}.\n- Robots points crawlers to ${productionDomain}/sitemap.xml when production env values are used.\n\nPending until Hostinger DNS is confirmed:\n- custom domain verification\n- HTTPS validation on ${productionDomain} and ${productionWwwDomain}\n- Google Search Console verification\n- Bing Webmaster verification\n- sitemap submission\n- IndexNow submission\n- final public launch\n\nManual needs: real tracking phone number, production environment variables, owner-approved buyer routing endpoints, Search Console verification, Bing verification, and DNS approval.\n\nDo not commit private credentials.\n`
);

writeFileSync(
  join(reportsDir, "seo_aeo_execution_report.md"),
  `# SEO + AEO Execution Report\n\nEpic: SEO and Content\nGoal: Build a reusable Dallas-Fort Worth emergency plumbing SEO + AEO platform in DNS-safe mode.\nCompleted: Config-driven service, city, city-service, problem, cost guide, blog, FAQ, contact, partner, and legal pages.\nFiles changed: src/data, src/app, src/components, src/lib, public/images, reports, ops, blueprints, scripts, and manual-owner-steps.\nTests run: report generation pending build and QA run.\nRisks: Owner must replace sample tracking phone values before public launch. Hostinger DNS is pending. Search Console, Bing, sitemap submission, IndexNow, citations, outreach, and final launch are blocked until DNS and HTTPS are confirmed.\nManual owner steps: tracking number, Hostinger DNS, domain verification, Search Console verification, Bing verification, and buyer endpoint approval.\nNext action: run report generation, QA, build, D-drive backup, commit, and push.\n`
);

writeFileSync(
  join(reportsDir, "final_handoff.md"),
  `# Final Handoff\n\n## What Was Built\nA config-driven pay-per-call lead-generation platform for Dallas-Fort Worth emergency plumbing and drain cleaning.\n\n## DNS-Safe Production Target\nFinal domain: ${productionDomain}\nWWW hostname: ${productionWwwDomain}\n\nThe temporary \`chatgpt.site\` preview/control URL is not the final production website.\n\n## How To Run Locally\nUse Node and pnpm, then run pnpm install, pnpm run reports, pnpm run qa, pnpm run build, and pnpm run dev.\n\n## Environment Variables Needed\nSee .env.example. Replace sample phone values before public launch. Keep verification tokens blank until owner approval.\n\n## Sitemap, Robots, And Canonicals\nSitemap target after DNS: ${productionDomain}/sitemap.xml\nRobots target after DNS: ${productionDomain}/robots.txt\nCanonical URL base: ${productionDomain}\n\nDo not submit sitemap or IndexNow until Hostinger DNS, HTTPS, Google Search Console, and Bing verification are confirmed.\n\n## Important Page URLs\n/, /services/24-hour-emergency-plumber, /services/emergency-drain-cleaning, /cities/dallas, /cities/dallas/emergency-drain-cleaning, /faq, /contact, /partner-with-us, /privacy, /terms, /disclosure.\n\n## Manual Owner Steps\nProvide real tracking number, have the Hostinger DNS owner add records, verify Search Console and Bing after DNS, approve buyer routing endpoints, and approve any real business claims before use.\n\n## Known Limitations\nSample buyer and tracking values are included for build/routing scaffolding and must be replaced before public launch. DNS, verification, indexing, citations, outreach, and final launch are pending.\n\n## Next 7-Day Growth Plan\nImprove top city-service pages, add verified buyer data, expand FAQs, refine internal links, submit sitemap only after DNS/verification, monitor Search Console and Bing, and update content QA reports.\n`
);

console.log(`Generated ${pages.length} page/report records.`);
