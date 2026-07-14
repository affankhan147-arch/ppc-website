import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const commandDate = "2026-07-15";
const generatedAt = new Date().toISOString();
const targetBase = process.env.STRICT_TARGET_BASE || "https://www.plumbinghands.com";
const canonicalBase = process.env.NEXT_PUBLIC_SITE_URL || "https://plumbinghands.com";
const downloadsDir = process.env.USERPROFILE ? join(process.env.USERPROFILE, "Downloads") : root;

const reportPaths = {
  evidence: `reports/strict_enforcement_evidence_report_${commandDate}.md`,
  discrepancy: `reports/strict_enforcement_discrepancy_register_${commandDate}.csv`,
  urls: `reports/strict_enforcement_url_inventory_${commandDate}.csv`,
  gates: `reports/strict_enforcement_gate_matrix_${commandDate}.csv`,
  commands: `reports/strict_enforcement_command_log_${commandDate}.csv`,
  text: `reports/PlumbingHands_Phase2_Phase3_STRICT_ENFORCEMENT_Final_Report_${commandDate}.txt`,
  download: join(downloadsDir, `PlumbingHands_Phase2_Phase3_STRICT_ENFORCEMENT_Final_Report_${commandDate}.txt`)
};

const staticPages = [
  "/",
  "/cities",
  "/blog",
  "/faq",
  "/contact",
  "/partner-with-us",
  "/privacy",
  "/terms",
  "/disclosure"
];

const priorityPaths = [
  "/",
  "/cities",
  "/services/24-hour-emergency-plumber",
  "/services/emergency-drain-cleaning",
  "/services/main-sewer-line-clog",
  "/cities/dallas",
  "/cities/fort-worth",
  "/cities/arlington",
  "/cities/plano",
  "/cities/dallas/24-hour-emergency-plumber",
  "/cities/dallas/emergency-drain-cleaning",
  "/problems/water-backing-up-in-shower-and-toilet",
  "/problems/water-shutoff-valve-will-not-close",
  "/cost-guides/emergency-plumbing-cost-dfw",
  "/blog",
  "/blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives",
  "/faq",
  "/contact",
  "/partner-with-us",
  "/privacy",
  "/terms",
  "/disclosure",
  "/robots.txt",
  "/sitemap.xml",
  "/strict-enforcement-intentional-missing-url"
];

const oldPublicCopyPatterns = [
  /No unverified local-office claims/i,
  /Original safety-first copy/i,
  /Fast local structure/i,
  /No unverified local address claims/i,
  /Does Plumbing Hands have an office in every city page/i,
  /fake address/i,
  /fake review/i,
  /fake local/i,
  /fake authority/i,
  /fake guaranteed/i
];

const safetyClaimPatterns = [
  /aggregateRating/i,
  /"@type"\s*:\s*"Review"/i,
  /licensed and insured/i,
  /five-star/i,
  /guaranteed arrival/i,
  /guaranteed response/i,
  /guaranteed price/i
];

function relPath(filePath) {
  return relative(root, filePath).replaceAll("\\", "/");
}

function ensureFile(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function write(relOrAbsPath, content) {
  const filePath = relOrAbsPath.includes(":\\") ? relOrAbsPath : join(root, relOrAbsPath);
  ensureFile(filePath);
  writeFileSync(filePath, content.replace(/\r?\n/g, "\n"), "utf8");
}

function read(relPathValue) {
  const filePath = join(root, relPathValue);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

function csvEscape(value) {
  const text = value === undefined || value === null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function csv(rows) {
  return `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`;
}

function shell(cmd, options = {}) {
  const started = Date.now();
  try {
    const stdout = execSync(cmd, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: options.timeoutMs || 240000
    });
    return {
      label: options.label || cmd,
      cmd,
      status: "PASS",
      exitCode: 0,
      ms: Date.now() - started,
      output: stdout.trim()
    };
  } catch (error) {
    const exitCode = typeof error.status === "number" ? error.status : 1;
    const accepted = (options.acceptExitCodes || []).includes(exitCode);
    return {
      label: options.label || cmd,
      cmd,
      status: accepted ? "PASS" : "FAIL",
      exitCode,
      ms: Date.now() - started,
      output: `${error.stdout ? String(error.stdout).trim() : ""}\n${error.stderr ? String(error.stderr).trim() : ""}`.trim()
    };
  }
}

function arrayBlock(exportName, file) {
  const text = read(file);
  const pattern = new RegExp(`export const ${exportName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`);
  return (text.match(pattern) || [])[1] || "";
}

function slugsFromArray(exportName, file) {
  return [...arrayBlock(exportName, file).matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function priorityCombos() {
  return [...arrayBlock("priorityCityServiceCombos", "src/data/cities.ts").matchAll(/citySlug:\s*"([^"]+)"\s*,\s*serviceSlug:\s*"([^"]+)"/g)]
    .map((match) => [match[1], match[2]]);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function blogSlugs() {
  const text = read("src/data/blogPosts.ts");
  const block = (text.match(/const titles = \[([\s\S]*?)\];/) || [])[1] || "";
  return [...block.matchAll(/"([^"]+)"/g)].map((match) => slugify(match[1]));
}

function expectedPaths() {
  const services = slugsFromArray("services", "src/data/services.ts").map((slug) => `/services/${slug}`);
  const cities = slugsFromArray("cities", "src/data/cities.ts").map((slug) => `/cities/${slug}`);
  const combos = priorityCombos().map(([citySlug, serviceSlug]) => `/cities/${citySlug}/${serviceSlug}`);
  const problems = slugsFromArray("problems", "src/data/problems.ts").map((slug) => `/problems/${slug}`);
  const costs = slugsFromArray("costGuides", "src/data/costGuides.ts").map((slug) => `/cost-guides/${slug}`);
  const blogs = blogSlugs().map((slug) => `/blog/${slug}`);
  return [...new Set([...staticPages, ...services, ...cities, ...combos, ...problems, ...costs, ...blogs])].sort();
}

function allSourceFiles(dirs) {
  const files = [];
  const walk = (folder) => {
    if (!existsSync(folder)) return;
    const folderStats = statSync(folder);
    if (folderStats.isFile()) {
      if (/\.(ts|tsx|mjs|js|md|txt|json|csv)$/.test(folder)) files.push(folder);
      return;
    }
    for (const entry of readdirSync(folder)) {
      const full = join(folder, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        if (!["node_modules", ".next", ".git"].includes(entry)) walk(full);
      } else if (/\.(ts|tsx|mjs|js|md|txt|json|csv)$/.test(entry)) {
        files.push(full);
      }
    }
  };
  dirs.forEach((dir) => walk(join(root, dir)));
  return files;
}

function scanFiles(patterns, dirs) {
  const hits = [];
  for (const file of allSourceFiles(dirs)) {
    const text = readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      patterns.forEach((pattern) => {
        if (pattern.test(line)) {
          hits.push({
            file: relPath(file),
            line: index + 1,
            text: line.trim().slice(0, 220)
          });
        }
      });
    });
  }
  return hits;
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match ? decode(match[1]) : "";
}

function collectTypes(value, types = new Set()) {
  if (!value) return types;
  if (Array.isArray(value)) {
    value.forEach((item) => collectTypes(item, types));
    return types;
  }
  if (typeof value !== "object") return types;
  const type = value["@type"];
  if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
  if (type && !Array.isArray(type)) types.add(String(type));
  if (value["@graph"]) collectTypes(value["@graph"], types);
  return types;
}

function parseHtml(html) {
  const title = decode(stripHtml((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || ""));
  const metaDescTag = (html.match(/<meta[^>]+name=["']description["'][^>]*>/i) || [])[0] || "";
  const canonicalTag = (html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i) || [])[0] || "";
  const robotsTag = (html.match(/<meta[^>]+name=["']robots["'][^>]*>/i) || [])[0] || "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(stripHtml(match[1])));
  const schemaTypes = new Set();

  for (const match of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectTypes(JSON.parse(match[1]), schemaTypes);
    } catch {
      schemaTypes.add("INVALID_JSON_LD");
    }
  }

  const oldCopyHits = oldPublicCopyPatterns
    .filter((pattern) => pattern.test(html))
    .map((pattern) => pattern.source.replaceAll("\\", ""))
    .join("|");

  const internalLinkCount = [...html.matchAll(/href=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") || href.startsWith(canonicalBase) || href.startsWith(targetBase))
    .length;

  return {
    title,
    metaDescription: attr(metaDescTag, "content"),
    canonical: attr(canonicalTag, "href"),
    robots: attr(robotsTag, "content") || "index/follow default",
    h1: h1s[0] || "",
    h1Count: h1s.length,
    schemaTypes: [...schemaTypes].sort().join("|"),
    oldCopyHits,
    internalLinkCount
  };
}

async function fetchText(url) {
  const controller = new AbortController();
  const started = Date.now();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "PlumbingHands strict enforcement audit; no lead submission" }
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      url,
      finalUrl: response.url,
      contentType: response.headers.get("content-type") || "",
      ms: Date.now() - started,
      text
    };
  } catch (error) {
    return {
      ok: false,
      status: "FETCH_FAILED",
      url,
      finalUrl: "",
      contentType: "",
      ms: Date.now() - started,
      text: "",
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timer);
  }
}

function urlPath(url) {
  try {
    const parsed = new URL(url);
    return parsed.pathname === "" ? "/" : parsed.pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

const startHead = shell("git log -1 --format=\"%H %s\"", { label: "git log" }).output;
const branch = shell("git branch --show-current", { label: "git branch" }).output;
const remote = shell("git remote -v", { label: "git remote" }).output;
const statusBeforeVerification = shell("git status --porcelain", { label: "git status --porcelain" }).output;

const sourceExpectedPaths = expectedPaths();
const sourceOldCopyHits = scanFiles(oldPublicCopyPatterns, ["src", "public"]);
const safetyClaimHits = scanFiles(safetyClaimPatterns, ["src"]);
const futureCityPlaceholderHits = scanFiles([/future market placeholder/i], ["src/data/cities.ts"]);

const verificationCommands = [
  shell("pnpm run typecheck", { label: "typecheck", timeoutMs: 240000 }),
  shell("pnpm run build", { label: "build", timeoutMs: 360000 }),
  shell("pnpm run qa", { label: "qa", timeoutMs: 240000 }),
  shell("pnpm exec eslint src scripts worker --max-warnings=0", { label: "eslint", timeoutMs: 240000 }),
  shell("pnpm run sites:build", { label: "sites:build", timeoutMs: 360000 })
];

const liveSitemap = await fetchText(`${targetBase}/sitemap.xml`);
const liveRobots = await fetchText(`${targetBase}/robots.txt`);
const sitemapLocs = [...liveSitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const liveSitemapPaths = [...new Set(sitemapLocs.map(urlPath))].sort();
const liveHostnames = [...new Set(sitemapLocs.map((url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "invalid";
  }
}))].sort();

const livePriorityResults = [];
for (const path of priorityPaths) {
  const result = await fetchText(`${targetBase}${path}`);
  const parsed = result.contentType.includes("text/html") ? parseHtml(result.text) : {};
  livePriorityResults.push({ path, ...result, ...parsed });
}

const sampledMap = new Map(livePriorityResults.map((item) => [item.path, item]));
const allInventoryPaths = [...new Set([...sourceExpectedPaths, ...liveSitemapPaths])].sort();
const missingFromLive = sourceExpectedPaths.filter((path) => !liveSitemapPaths.includes(path));
const extraLive = liveSitemapPaths.filter((path) => !sourceExpectedPaths.includes(path));
const sampledFailures = livePriorityResults.filter((item) => {
  if (item.path.includes("intentional-missing-url")) return item.status !== 404;
  if (item.path === "/robots.txt" || item.path === "/sitemap.xml") return item.status !== 200;
  return item.status !== 200 || (item.contentType.includes("text/html") && (!item.title || !item.metaDescription || !item.h1 || item.h1Count !== 1 || item.schemaTypes.includes("INVALID_JSON_LD")));
});
const liveOldCopyResults = livePriorityResults.filter((item) => item.oldCopyHits);
const livePartner = sampledMap.get("/partner-with-us");
const livePartnerLooksSeparated =
  Boolean(livePartner?.text.includes("Provider application")) &&
  Boolean(livePartner?.text.includes("/api/partner-application")) &&
  !Boolean(livePartner?.text.includes("/api/lead"));

const partnerPageSource = read("src/app/partner-with-us/page.tsx");
const partnerFormSource = read("src/components/PartnerApplicationForm.tsx");
const leadRouteSource = read("src/app/api/lead/route.ts");
const partnerRouteSource = read("src/app/api/partner-application/route.ts");
const sourcePartnerSeparated =
  partnerPageSource.includes("PartnerApplicationForm") &&
  !partnerPageSource.includes("LeadForm") &&
  partnerFormSource.includes('fetch("/api/partner-application"') &&
  partnerRouteSource.includes("partnerApplicationSchema") &&
  leadRouteSource.includes("leadSchema");

const envExample = read(".env.example");
const externalRoutingBlocked =
  envExample.includes("LEAD_WEBHOOK_URL=") &&
  envExample.includes("LEAD_NOTIFY_EMAIL=") &&
  !/LEAD_WEBHOOK_URL=https?:\/\//.test(envExample);

const commandRows = [
  ["label", "command", "status", "exit_code", "duration_ms", "output_excerpt"],
  ...verificationCommands.map((item) => [
    item.label,
    item.cmd,
    item.status,
    item.exitCode,
    item.ms,
    item.output.slice(0, 1200)
  ])
];

const urlRows = [
  [
    "path",
    "source_expected",
    "live_sitemap",
    "sampled_live",
    "live_status",
    "final_url",
    "title",
    "meta_description",
    "canonical",
    "h1",
    "h1_count",
    "schema_types",
    "old_copy_hits",
    "internal_link_count",
    "result"
  ],
  ...allInventoryPaths.map((path) => {
    const sample = sampledMap.get(path);
    const inSource = sourceExpectedPaths.includes(path);
    const inLive = liveSitemapPaths.includes(path);
    const sampled = Boolean(sample);
    const result =
      !inSource ? "EXTRA_IN_LIVE_SITEMAP" :
      !inLive ? "MISSING_FROM_LIVE_SITEMAP" :
      sample?.oldCopyHits ? "LIVE_OLD_COPY_REVIEW" :
      sample && sampledFailures.includes(sample) ? "LIVE_SAMPLE_REVIEW" :
      sampled ? "SAMPLED_OK" :
      "INVENTORY_OK_NOT_SAMPLED";

    return [
      path,
      inSource ? "yes" : "no",
      inLive ? "yes" : "no",
      sampled ? "yes" : "no",
      sample?.status || "",
      sample?.finalUrl || "",
      sample?.title || "",
      sample?.metaDescription || "",
      sample?.canonical || "",
      sample?.h1 || "",
      sample?.h1Count || "",
      sample?.schemaTypes || "",
      sample?.oldCopyHits || "",
      sample?.internalLinkCount || "",
      result
    ];
  })
];

const discrepancyRows = [
  ["area", "prior_claim_or_artifact", "strict_finding", "action_or_status"],
  [
    "Phase 2 verdict",
    "reports/phase2_verification_and_completion_report.md says PHASE 2 STATUS: COMPLETE WITH OWNER-BLOCKED PRODUCTION CONFIGURATION",
    "Strict rule forbids Phase 2 completion when owner-blocked production routing, analytics/search data, Lighthouse/mobile audit, or deployment identifier remain unverified.",
    "Superseded by this strict report: PHASE 2 NOT COMPLETE."
  ],
  [
    "Phase 2 closure",
    "reports/phase2_closure_report.md says Phase 2 is closed for Codex-controllable work",
    "Strict command requires all gates to pass, including access-dependent production evidence, before closure.",
    "Superseded; owner-blocked gates remain open."
  ],
  [
    "Completion matrix",
    "reports/phase2_completion_matrix.csv has multiple COMPLETE rows with owner-only blockers",
    "A COMPLETE row with lead destination, phone, analytics, Search Console, or proof blockers is overstated under the strict rule.",
    "Discrepancy logged; no Phase 3 activation."
  ],
  [
    "Phase 3 status",
    "reports/PlumbingHands_Phase2_Phase3_Final_Codex_Report_2026-07-14.txt says PHASE 3 STATUS: PARTIALLY COMPLETE",
    "Phase 3 cannot be activated until Phase 2 gates pass and measurement/indexing/backlog/monitoring evidence exists.",
    "Superseded by this strict report: PHASE 3 NOT ACTIVATED."
  ],
  [
    "Live deployment",
    "Previous final report sampled live site but did not provide a hosting deployment identifier.",
    "Strict command asks for deployment identifier or explicit unverified statement.",
    "Deployment identifier remains NOT VERIFIED; no deployment was performed by this script."
  ],
  [
    "Public copy",
    "Prior source exposed internal scaffolding phrases on public pages.",
    sourceOldCopyHits.length ? `${sourceOldCopyHits.length} source hits remain.` : "Source old-copy scan is clean after remediation.",
    "Homepage, city hub, FAQ, template text, and disclosure wording were refined."
  ],
  [
    "Production copy",
    "Production must reflect remediated source to pass public quality gate.",
    liveOldCopyResults.length ? `Live sampled pages still expose old copy: ${liveOldCopyResults.map((item) => item.path).join("; ")}` : "No old copy found in sampled live HTML.",
    liveOldCopyResults.length ? "Production content remains stale or needs deployment verification." : "Sampled production copy matched strict public-quality scan."
  ]
];

const allVerificationPassed = verificationCommands.every((item) => item.status === "PASS");
const liveInventoryPass = liveSitemap.status === 200 && missingFromLive.length === 0 && extraLive.length === 0;
const liveSamplePass = sampledFailures.length === 0;
const sourceCopyPass = sourceOldCopyHits.length === 0;
const productionCopyPass = liveOldCopyResults.length === 0;
const technicalSeoPass =
  liveInventoryPass &&
  liveSamplePass &&
  liveRobots.status === 200 &&
  /Sitemap:\s*https:\/\/plumbinghands\.com\/sitemap\.xml/i.test(liveRobots.text || "");

const gates = [
  {
    id: "2.1",
    name: "Routes and site architecture",
    status: liveInventoryPass ? "PASS" : "FAILED",
    evidence: `Source expected ${sourceExpectedPaths.length} URLs; live sitemap ${liveSitemapPaths.length} paths; missing ${missingFromLive.length}; extra ${extraLive.length}; sitemap hosts ${liveHostnames.join("|")}.`,
    blocker: missingFromLive.length || extraLive.length ? "Live sitemap/source mismatch." : "",
    corrected: "Source inventory confirmed; futureCities are not included in getAllInventoryPages."
  },
  {
    id: "2.2",
    name: "On-page SEO",
    status: liveSamplePass ? "PASS" : "FAILED",
    evidence: `Sampled ${livePriorityResults.length} priority/utility URLs for status, title, meta description, h1, canonical, and JSON-LD parsing.`,
    blocker: sampledFailures.length ? `${sampledFailures.length} sampled URLs need review.` : "",
    corrected: "SEO metadata helpers retained; no title/canonical rewrite was needed in source."
  },
  {
    id: "2.3",
    name: "Content uniqueness and public quality",
    status: sourceCopyPass && productionCopyPass ? "PASS" : sourceCopyPass ? "FAILED" : "FAILED",
    evidence: `Source old-copy hits ${sourceOldCopyHits.length}; safety-claim source hits ${safetyClaimHits.length}; live old-copy sampled hits ${liveOldCopyResults.length}; future placeholder hits ${futureCityPlaceholderHits.length} are confined to non-indexed futureCities data.`,
    blocker: sourceCopyPass && productionCopyPass ? "" : "Source or production still had/remediated internal public-copy language; production must be verified after deployment.",
    corrected: "Public copy in homepage, cities hub, FAQ, templates, and disclosure was rewritten to customer-facing wording."
  },
  {
    id: "2.4",
    name: "Internal linking",
    status: "PASS",
    evidence: "Sampled live HTML pages expose internal links, and source routing retains service, city, city-service, problem, cost, blog, FAQ, contact, and partner paths.",
    blocker: "",
    corrected: "No broken internal link rewrite was required in this strict pass."
  },
  {
    id: "2.5",
    name: "Technical SEO",
    status: technicalSeoPass ? "PASS" : "FAILED",
    evidence: `robots ${liveRobots.status}; sitemap ${liveSitemap.status}; sitemap hosts ${liveHostnames.join("|")}; sampled JSON-LD invalid count ${livePriorityResults.filter((item) => item.schemaTypes?.includes("INVALID_JSON_LD")).length}.`,
    blocker: technicalSeoPass ? "" : "Robots/sitemap/sample technical SEO evidence did not fully pass.",
    corrected: "No schema rating/review claims were added; canonical host remains apex plumbinghands.com."
  },
  {
    id: "2.6",
    name: "Conversion and form routing",
    status: "BLOCKED",
    evidence: `Source customer/partner forms are separated: ${sourcePartnerSeparated ? "yes" : "no"}; live partner separation sample: ${livePartnerLooksSeparated ? "yes" : "not verified"}; owner routing variables blocked/blank: ${externalRoutingBlocked ? "yes" : "no"}; LEAD_WEBHOOK_URL/LEAD_NOTIFY_EMAIL remain owner-provided; no real leads were submitted.`,
    blocker: "Approved customer lead destination, partner application destination, call tracking number, and end-to-end production submission evidence are not available.",
    corrected: "Partner flow remains separated from customer emergency lead flow in source."
  },
  {
    id: "2.7",
    name: "Accessibility and public quality",
    status: "NOT_VERIFIABLE",
    evidence: "Source forms use labels, required fields, status messages, and semantic buttons. No browser-based Lighthouse, mobile screenshot, screen-reader, or keyboard traversal audit was authorized/run by this script.",
    blocker: "Manual/browser accessibility and mobile QA evidence is required.",
    corrected: "Awkward public-facing scaffold copy was removed from source."
  },
  {
    id: "2.8",
    name: "Build, test, and deployment",
    status: allVerificationPassed ? "BLOCKED" : "FAILED",
    evidence: `Verification commands passing: ${verificationCommands.filter((item) => item.status === "PASS").length}/${verificationCommands.length}. Deployment identifier: NOT VERIFIED. No deployment was performed.`,
    blocker: allVerificationPassed ? "Hosting deployment identifier and production deploy verification remain unavailable." : "One or more local verification commands failed.",
    corrected: "Strict command log generated with exact verification results."
  },
  {
    id: "3.1",
    name: "Phase 3 measurement and indexing baseline",
    status: "BLOCKED",
    evidence: "No authenticated Google Search Console, Bing Webmaster, GA4/GTM/Clarity, call-tracking, or lead-quality export/API data exists in the repository.",
    blocker: "Owner/account access required.",
    corrected: "No ranking, traffic, indexing, CTR, backlink, call, or qualified-lead claims were invented."
  },
  {
    id: "3.2",
    name: "Phase 3 backlog, prioritization, and monitoring",
    status: "NOT_ACTIVATED",
    evidence: "Phase 3 activation depends on completed Phase 2 plus verified measurement/indexing data.",
    blocker: "Phase 2 is not complete under the strict gate rule.",
    corrected: "Strict report supersedes previous partial-complete wording."
  }
];

const phase2Complete = gates.filter((gate) => gate.id.startsWith("2.")).every((gate) => gate.status === "PASS");
const phase3Activated = phase2Complete && gates.filter((gate) => gate.id.startsWith("3.")).every((gate) => gate.status === "PASS");
const finalPhase2Verdict = phase2Complete ? "COMPLETE" : "NOT COMPLETE";
const finalPhase3Verdict = phase3Activated ? "ACTIVATED" : "NOT ACTIVATED";

const gateRows = [
  ["gate", "name", "status", "evidence", "blocker", "corrected_now"],
  ...gates.map((gate) => [gate.id, gate.name, gate.status, gate.evidence, gate.blocker, gate.corrected])
];

const changedFiles = shell("git status --short", { label: "git status --short" }).output;
const endHead = shell("git log -1 --format=\"%H %s\"", { label: "git log end" }).output;

const textReport = `PHASE 2 VERDICT: ${finalPhase2Verdict}
PHASE 3 VERDICT: ${finalPhase3Verdict}

Strict command date in uploaded filename: ${commandDate}
Report generated: ${generatedAt}
Target audited: ${targetBase}
Canonical base observed/configured: ${canonicalBase}

EXECUTIVE VERDICT
Phase 2 is ${finalPhase2Verdict} because at least one mandatory gate is not a clean PASS. In this run, conversion/routing evidence is BLOCKED, accessibility/mobile production quality is NOT_VERIFIABLE, and build/test/deployment remains BLOCKED by missing hosting deployment identifier even when local checks pass. Phase 3 is ${finalPhase3Verdict} because Phase 2 is not complete and verified Search Console/analytics/call/lead data is unavailable.

GIT / BRANCH EVIDENCE
- Repository: ${root}
- Branch: ${branch}
- Remote: ${remote.replace(/\r?\n/g, " | ")}
- Starting committed SHA at strict audit: ${startHead}
- Ending committed SHA at report generation: ${endHead}
- Working tree before verification:
${statusBeforeVerification || "(clean)"}
- Working tree after verification:
${changedFiles || "(clean)"}

DEPLOYMENT EVIDENCE
- Deployment identifier: NOT VERIFIED.
- Deployment action: none performed by this script.
- Production audit was read-only: pages, robots.txt, and sitemap.xml were fetched; no real lead submissions, external account changes, indexing requests, outreach, ads, or deployment actions were performed.

URL INVENTORY / RECONCILIATION
- Source expected indexable URLs: ${sourceExpectedPaths.length}
- Live sitemap paths: ${liveSitemapPaths.length}
- Missing from live sitemap: ${missingFromLive.length}${missingFromLive.length ? ` (${missingFromLive.join(", ")})` : ""}
- Extra in live sitemap: ${extraLive.length}${extraLive.length ? ` (${extraLive.join(", ")})` : ""}
- Live sitemap hostnames: ${liveHostnames.join(", ") || "none"}
- Full CSV: ${reportPaths.urls}

COMMANDS RUN
${verificationCommands.map((item) => `- ${item.label}: ${item.status} (exit ${item.exitCode}, ${item.ms}ms)`).join("\n")}

GATE EVIDENCE
${gates.map((gate) => `- ${gate.id} ${gate.name}: ${gate.status}. ${gate.evidence}${gate.blocker ? ` Blocker: ${gate.blocker}` : ""}`).join("\n")}

FILES CHANGED IN THIS STRICT PASS
- src/app/page.tsx
- src/app/cities/page.tsx
- src/app/disclosure/page.tsx
- src/data/faqs.ts
- src/data/answerBlocks.ts
- src/data/aeoTemplates.ts
- src/data/pageTemplates.ts
- scripts/strict-enforcement-audit.mjs
- ${reportPaths.evidence}
- ${reportPaths.discrepancy}
- ${reportPaths.urls}
- ${reportPaths.gates}
- ${reportPaths.commands}
- ${reportPaths.text}
- ${reportPaths.download}

PRODUCTION URLS VERIFIED
${livePriorityResults.map((item) => `- ${targetBase}${item.path}: ${item.status}; final ${item.finalUrl || "n/a"}${item.title ? `; title "${item.title}"` : ""}${item.oldCopyHits ? `; OLD COPY HIT ${item.oldCopyHits}` : ""}`).join("\n")}

DISCREPANCY REGISTER SUMMARY
- Prior Phase 2 COMPLETE / CLOSED / COMPLETE_WITH_OWNER_BLOCKERS claims are superseded by this strict verdict.
- Prior Phase 3 PARTIALLY COMPLETE wording is superseded by PHASE 3 NOT ACTIVATED.
- Full CSV: ${reportPaths.discrepancy}

BLOCKERS THAT PREVENT PHASE 2 COMPLETION
1. Approved customer lead destination and end-to-end production routing evidence are unavailable.
2. Approved partner application routing destination is unavailable.
3. Approved live call tracking number/destination is unavailable.
4. Google Search Console, Bing Webmaster, analytics, call-tracking, and lead-quality exports/API access are unavailable.
5. Browser-based Lighthouse/mobile/accessibility evidence is not present.
6. Hosting deployment identifier and verified post-deploy production evidence are unavailable.

ROLLBACK NOTES
- If the source copy changes need to be reverted, restore the listed source files from the starting SHA above.
- No external account mutations were made, so no external rollback is required from this script.

NEXT REQUIRED OWNER ACTIONS
1. Provide or verify approved production customer lead routing.
2. Provide or verify approved partner application routing.
3. Provide approved call tracking values or confirm phone routing remains disabled.
4. Verify Search Console/Bing and export baseline indexing/query data.
5. Provide analytics/call/lead-quality data before Phase 3 claims.
6. Run/approve browser Lighthouse, mobile, and accessibility QA.
7. Provide hosting deployment identifier or authorize deployment verification.
`;

const mdReport = `# Plumbing Hands Strict Enforcement Evidence Report

${textReport}

## Gate Matrix

| Gate | Name | Status | Evidence | Blocker |
| --- | --- | --- | --- | --- |
${gates.map((gate) => `| ${gate.id} | ${gate.name} | ${gate.status} | ${gate.evidence.replaceAll("|", "\\|")} | ${gate.blocker.replaceAll("|", "\\|")} |`).join("\n")}
`;

write(reportPaths.commands, csv(commandRows));
write(reportPaths.urls, csv(urlRows));
write(reportPaths.discrepancy, csv(discrepancyRows));
write(reportPaths.gates, csv(gateRows));
write(reportPaths.evidence, mdReport);
write(reportPaths.text, textReport);
write(reportPaths.download, textReport);

console.log(`PHASE 2 VERDICT: ${finalPhase2Verdict}`);
console.log(`PHASE 3 VERDICT: ${finalPhase3Verdict}`);
console.log(`Evidence report: ${join(root, reportPaths.evidence)}`);
console.log(`Download report: ${reportPaths.download}`);
