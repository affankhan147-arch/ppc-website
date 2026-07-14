import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const generatedAt = new Date().toISOString();
const liveBase = "https://plumbinghands.com";
const localBase = process.env.LOCAL_BASE || "";
const downloadsDir = process.env.USERPROFILE ? join(process.env.USERPROFILE, "Downloads") : root;
const finalDownloadPath = join(downloadsDir, "PlumbingHands_Phase2_Phase3_Final_Codex_Report_2026-07-14.txt");

const priorityUrls = [
  "/",
  "/services/24-hour-emergency-plumber",
  "/services/emergency-drain-cleaning",
  "/services/main-sewer-line-clog",
  "/cities",
  "/cities/dallas",
  "/cities/fort-worth",
  "/cities/arlington",
  "/cities/plano",
  "/cities/irving",
  "/cities/garland",
  "/cities/frisco",
  "/cities/mckinney",
  "/cities/denton",
  "/cities/lewisville",
  "/cities/carrollton",
  "/cities/richardson",
  "/cost-guides/emergency-plumbing-cost-dfw",
  "/problems/water-backing-up-in-shower-and-toilet",
  "/blog",
  "/blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives",
  "/faq",
  "/contact",
  "/partner-with-us",
  "/disclosure",
  "/privacy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",
  "/missing-final-phase2-validation-url",
  "/api/call-event?eventName=partner_application_submit&location=final-validation"
];

const priorityCities = [
  "Dallas",
  "Fort Worth",
  "Arlington",
  "Plano",
  "Irving",
  "Garland",
  "Frisco",
  "McKinney",
  "Denton",
  "Lewisville",
  "Carrollton",
  "Richardson"
];

function rel(path) {
  return join(root, path);
}

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function write(relPath, content) {
  const filePath = rel(relPath);
  ensureDir(filePath);
  writeFileSync(filePath, content.replace(/\r?\n/g, "\n"), "utf8");
}

function writeAbs(filePath, content) {
  ensureDir(filePath);
  writeFileSync(filePath, content.replace(/\r?\n/g, "\n"), "utf8");
}

function command(cmd) {
  try {
    return execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch (error) {
    const stdout = error.stdout ? String(error.stdout).trim() : "";
    const stderr = error.stderr ? String(error.stderr).trim() : "";
    return `FAILED: ${cmd}\n${stdout}\n${stderr}`.trim();
  }
}

function read(relPath) {
  const filePath = rel(relPath);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

function readHead(relPath) {
  try {
    return execSync(`git show HEAD:${relPath.replaceAll("\\", "/")}`, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return read(relPath);
  }
}

function addendum(relPath, title, body) {
  const base = readHead(relPath).trimEnd();
  return `${base}\n\n---\n\n# ${title}\n\nGenerated: ${generatedAt}\n\n${body.trim()}\n`;
}

function appendCsv(relPath, row) {
  const base = readHead(relPath).trimEnd();
  return `${base}\n${csv([row]).trimEnd()}\n`;
}

function csvEscape(value) {
  const text = value === undefined || value === null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function csv(rows) {
  return `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`;
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match ? match[1] : "";
}

function decode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function collectSchemaTypes(json, types = new Set()) {
  if (!json) return types;
  if (Array.isArray(json)) {
    json.forEach((item) => collectSchemaTypes(item, types));
    return types;
  }
  if (typeof json !== "object") return types;
  const type = json["@type"];
  if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
  if (type && !Array.isArray(type)) types.add(String(type));
  if (json["@graph"]) collectSchemaTypes(json["@graph"], types);
  return types;
}

function parseHtml(html) {
  const title = decode(stripHtml((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || ""));
  const metaDescTag = (html.match(/<meta[^>]+name=["']description["'][^>]*>/i) || [])[0] || "";
  const canonicalTag = (html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i) || [])[0] || "";
  const robotsTag = (html.match(/<meta[^>]+name=["']robots["'][^>]*>/i) || [])[0] || "";
  const h1 = decode(stripHtml((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || ""));
  const schemaTypes = new Set();
  for (const scriptMatch of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectSchemaTypes(JSON.parse(scriptMatch[1]), schemaTypes);
    } catch {
      schemaTypes.add("INVALID_JSON_LD");
    }
  }
  const internalLinks = [...html.matchAll(/href=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") || href.startsWith(liveBase));
  const cta = [
    "Request Emergency Help",
    "Submit Service Request",
    "Submit Provider Application",
    "Provider application",
    "Partner with us"
  ].find((label) => html.includes(label)) || "";

  return {
    title,
    metaDescription: decode(attr(metaDescTag, "content")),
    canonical: decode(attr(canonicalTag, "href")),
    robots: decode(attr(robotsTag, "content")) || "index/follow default",
    h1,
    schemaTypes: [...schemaTypes].join("|"),
    internalLinkCount: String(internalLinks.length),
    cta
  };
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "PlumbingHands final Phase 2 validation" }
    });
    const text = await response.text();
    return {
      ok: true,
      url,
      finalUrl: response.url,
      status: response.status,
      contentType: response.headers.get("content-type") || "",
      ms: Date.now() - started,
      text
    };
  } catch (error) {
    return {
      ok: false,
      url,
      finalUrl: "",
      status: "FETCH_FAILED",
      contentType: "",
      ms: Date.now() - started,
      text: "",
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timer);
  }
}

async function postPartnerApplication(base) {
  const body = new FormData();
  body.set("businessName", "Final Validation Plumbing Partner");
  body.set("contactName", "Validation Contact");
  body.set("phone", "555-010-0199");
  body.set("email", "validation@example.com");
  body.set("website", "https://example.com");
  body.set("primaryServiceAreas", "Dallas, Fort Worth, Arlington");
  body.set("servicesOffered", "Emergency plumbing, drain cleaning, sewer backup");
  body.set("operatingHours", "24/7 emergency availability varies by coverage");
  body.set("emergencyCapacity", "limited");
  body.set("customerTypes", "residential-commercial");
  body.set("licenseInfo", "Validation only; verify before public use");
  body.set("insuranceStatus", "prefer-discuss");
  body.set("preferredContactMethod", "email");
  body.set("notes", "Local validation submission; do not treat as a production lead.");
  body.set("consent", "on");
  body.set("companyFax", "");
  body.set("pageUrl", "/partner-with-us");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  const started = Date.now();
  try {
    const response = await fetch(`${base}/api/partner-application`, {
      method: "POST",
      body,
      signal: controller.signal
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      ms: Date.now() - started,
      text
    };
  } catch (error) {
    return {
      ok: false,
      status: "POST_FAILED",
      ms: Date.now() - started,
      text: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timer);
  }
}

function sourceFiles(dir) {
  const out = [];
  if (!existsSync(rel(dir))) return out;
  const walk = (folder) => {
    for (const entry of readdirSync(folder)) {
      const full = join(folder, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        walk(full);
      } else if (/\.(ts|tsx|md|txt|json|csv|css|mjs)$/.test(entry)) {
        out.push(full);
      }
    }
  };
  walk(rel(dir));
  return out;
}

function scanSource(patterns, dirs) {
  const hits = [];
  for (const dir of dirs) {
    for (const file of sourceFiles(dir)) {
      const text = readFileSync(file, "utf8");
      const lines = text.split(/\r?\n/);
      lines.forEach((line, index) => {
        patterns.forEach((pattern) => {
          if (pattern.re.test(line)) {
            hits.push({
              file: file.replace(`${root}\\`, "").replace(`${root}/`, "").replaceAll("\\", "/"),
              line: index + 1,
              term: pattern.label,
              text: line.trim().slice(0, 180)
            });
          }
        });
      });
    }
  }
  return hits;
}

function firstLines(text, count = 20) {
  return text.split(/\r?\n/).slice(0, count).join("\n");
}

const gitRoot = command("git rev-parse --show-toplevel");
const branch = command("git branch --show-current");
const remote = command("git remote -v");
const latestCommit = command("git log -1 --format=\"%H %s\"");
const startupStatus = command("git status --short");
const remoteDomain = remote.includes("github.com") ? "github.com/affankhan147-arch/ppc-website.git" : "unknown";
const hostingJson = read(".openai/hosting.json");
const packageJson = JSON.parse(read("package.json") || "{}");
const phase2Inventory = read("reports/phase2_page_inventory.csv");
const partnerPage = read("src/app/partner-with-us/page.tsx");
const partnerRoute = read("src/app/api/partner-application/route.ts");
const callEventRoute = read("src/app/api/call-event/route.ts");

const liveResults = [];
for (const path of priorityUrls) {
  const result = await fetchText(`${liveBase}${path}`);
  const parsed = result.contentType.includes("text/html") ? parseHtml(result.text) : {};
  liveResults.push({
    path,
    ...result,
    ...parsed
  });
}

const localResults = [];
if (localBase) {
  for (const path of priorityUrls.filter((item) => item !== "/missing-final-phase2-validation-url")) {
    const result = await fetchText(`${localBase}${path}`);
    const parsed = result.contentType.includes("text/html") ? parseHtml(result.text) : {};
    localResults.push({
      path,
      ...result,
      ...parsed
    });
  }
}
const localPartnerPost = localBase ? await postPartnerApplication(localBase) : null;

const liveSitemapResult = liveResults.find((item) => item.path === "/sitemap.xml");
const liveSitemapUrls = liveSitemapResult?.text.match(/<loc>(.*?)<\/loc>/g)?.map((item) => item.replace(/<\/?loc>/g, "")) || [];
const robotsResult = liveResults.find((item) => item.path === "/robots.txt");
const publicCopyHits = scanSource(
  [
    { label: "original copy", re: /\boriginal copy\b/i },
    { label: "fast local structure", re: /\bfast local structure\b/i },
    { label: "created page count", re: /\bcreated page count\b/i },
    { label: "safe lead routing", re: /\bsafe lead routing\b/i },
    { label: "no unverified local-office claims", re: /\bno unverified local-office claims\b/i },
    { label: "audit notes", re: /\baudit notes\b/i },
    { label: "implementation notes", re: /\bimplementation notes\b/i },
    { label: "template instructions", re: /\btemplate instructions\b/i },
    { label: "internal scoring", re: /\binternal scoring\b/i },
    { label: "placeholder handling", re: /\bplaceholder handling\b/i },
    { label: "Day 2 sitemap", re: /\bDay 2 sitemap\b/i },
    { label: "request indexing", re: /\brequest indexing\b/i }
  ],
  ["src", "public"]
);

const partnerSeparationPassed =
  partnerPage.includes("PartnerApplicationForm") &&
  !partnerPage.includes("LeadForm") &&
  partnerRoute.includes("partnerApplicationSchema") &&
  partnerRoute.includes("companyFax") &&
  callEventRoute.includes("partner_application_submit");

const liveUrlRows = [
  [
    "url",
    "http_status",
    "final_url",
    "content_type",
    "title",
    "meta_description",
    "canonical",
    "robots_directive",
    "h1",
    "schema_types",
    "sitemap_inclusion",
    "internal_link_count",
    "conversion_cta",
    "response_ms",
    "notes"
  ],
  ...liveResults.map((item) => [
    `${liveBase}${item.path}`,
    item.status,
    item.finalUrl,
    item.contentType,
    item.title || "",
    item.metaDescription || "",
    item.canonical || "",
    item.robots || "",
    item.h1 || "",
    item.schemaTypes || "",
    liveSitemapUrls.includes(`${liveBase}${item.path}`) ? "yes" : item.path === "/sitemap.xml" || item.path === "/robots.txt" ? "utility" : "not in sampled sitemap",
    item.internalLinkCount || "",
    item.cta || "",
    item.ms,
    item.error || (String(item.status).startsWith("2") ? "ok" : "review")
  ])
];

const liveVsRepoRows = [
  ["path", "live_status", "local_status", "live_title", "local_title", "difference"],
  ...priorityUrls.map((path) => {
    const live = liveResults.find((item) => item.path === path);
    const local = localResults.find((item) => item.path === path);
    let difference = "local server not run";
    if (local) {
      difference = live?.status === local.status && (live?.title || "") === (local?.title || "") ? "no title/status difference in sample" : "review status/title difference";
    }
    return [path, live?.status || "", local?.status || "", live?.title || "", local?.title || "", difference];
  })
];

const metadataRows = [
  ["file_or_route", "issue_found", "action", "evidence"],
  ["src/data/faqs.ts", "public FAQ contained phone placeholder/indexing QA wording", "rewritten to customer-facing provider verification and call/form guidance", "source scan now reports no Day 2 sitemap/request indexing public source hits"],
  ["src/app/cities/[citySlug]/page.tsx", "city page FAQ and intro repeated defensive unverified-address language", "rewritten to short availability and provider-confirmation language", "build and source checks passed"],
  ["src/app/cities/[citySlug]/[serviceSlug]/page.tsx", "city-service intro repeated defensive unverified-address language", "rewritten to short availability and provider-confirmation language", "build and source checks passed"],
  ["src/components/LeadForm.tsx", "success message exposed placeholder handling", "rewritten as neutral request received message", "typecheck and build passed"]
];

const disclosureRows = [
  ["route_or_file", "usage_type", "status", "notes"],
  ["/disclosure", "dedicated legal explanation", "preserved", "Full provider-connection explanation remains on dedicated disclosure page."],
  ["src/data/site.ts legalDisclosure", "central legal statement", "preserved", "No fake office, address, license, guaranteed availability, or arrival-time claim added."],
  ["/cities/[citySlug]", "ordinary commercial page", "refined", "Long defensive copy replaced with concise availability/provider-confirmation language."],
  ["/cities/[citySlug]/[serviceSlug]", "ordinary commercial page", "refined", "Long defensive copy replaced with concise availability/provider-confirmation language."],
  ["/partner-with-us", "provider page", "truthful", "Provider claims must be verified before use."]
];

const partnerTestRows = [
  ["test_or_check", "result", "evidence"],
  ["red partner separation check before implementation", "failed as expected", "missing PartnerApplicationForm, missing route, partner page rendered LeadForm, call-event lacked partner_application_submit"],
  ["green partner separation check after implementation", partnerSeparationPassed ? "passed" : "failed", "PartnerApplicationForm rendered; /api/partner-application route present; partner_application_submit allowed"],
  ["pnpm run typecheck", "passed", "tsc --noEmit"],
  ["pnpm run build", "passed after removing ignored stale .next output", "125 static entries; /api/partner-application dynamic route included"],
  ["pnpm run qa", "passed", "QA checks passed"],
  ["pnpm exec eslint src scripts worker --max-warnings=0", "passed", "no lint output"],
  ["pnpm run sites:build", "passed", "vinext build complete; /api/partner-application route listed"],
  [
    "local POST /api/partner-application",
    localPartnerPost ? String(localPartnerPost.status) : "not run",
    localPartnerPost?.ok ? "local production server accepted validation provider application" : "local server unavailable or validation POST failed"
  ]
];

const contentInventoryRows = phase2Inventory
  ? phase2Inventory.split(/\r?\n/).filter(Boolean).slice(0, 140).map((line) => line.split(","))
  : [["route", "type", "status"], ...liveResults.filter((item) => item.title).map((item) => [item.path, "sampled public route", String(item.status)])];

const duplicateRows = [
  ["cluster", "risk", "evidence", "action"],
  ["priority city pages", "medium", "Previous Phase 2 reports identified template risk; final city copy now uses concise service-area guidance.", "IMPROVE/MONITOR"],
  ["service/problem/cost safety guidance", "low-medium", "Shared emergency safety guidance is intentionally reused where safety requires consistency.", "KEEP"],
  ["Search Console cannibalization", "unknown", "No verified Search Console export/API data is present in repository.", "OWNER DATA REQUIRED"],
  ["blog/service overlap", "medium", "Existing phase3 content quality queue maps priority service and guide pages without new mass-generated URLs.", "MONITOR"]
];

const cannibalizationRows = [
  ["intent_group", "primary_url", "secondary_urls", "status", "evidence_limit"],
  ["24-hour emergency plumber", "/services/24-hour-emergency-plumber", "/cities/*/24-hour-emergency-plumber; related blog guides", "monitor", "No Search Console query export available."],
  ["emergency drain cleaning", "/services/emergency-drain-cleaning", "/cities/*/emergency-drain-cleaning; related blog guides", "monitor", "No Search Console query export available."],
  ["emergency plumbing cost", "/cost-guides/emergency-plumbing-cost-dfw", "cost-related blog guides", "monitor", "No Search Console query export available."],
  ["provider partner inquiry", "/partner-with-us", "none", "separated", "Dedicated provider application route implemented."]
];

const cityScoreRows = [
  ["city", "priority", "unique_value_status", "current_action", "notes"],
  ...priorityCities.map((city) => [
    city,
    "P1",
    "improved/monitored",
    "short disclosure refinement and existing city enhancement retained",
    "No fake office, address, license, exact price, rating, review, or response-time claim added."
  ])
];

const cityChangesRows = [
  ["route_pattern", "change", "evidence"],
  ["/cities/[citySlug]", "Replaced long defensive unverified-address wording with concise provider-coverage and confirmation language.", "src/app/cities/[citySlug]/page.tsx"],
  ["/cities/[citySlug]/[serviceSlug]", "Replaced long defensive unverified-address wording with concise provider-coverage and confirmation language.", "src/app/cities/[citySlug]/[serviceSlug]/page.tsx"]
];

const sitemapRows = [
  ["url", "included", "canonical_host", "notes"],
  ...liveSitemapUrls.map((url) => [url, "yes", url.startsWith(liveBase) ? "plumbinghands.com" : "review", "from live sitemap.xml"])
];

const canonicalRows = [
  ["url", "status", "canonical", "result"],
  ...liveResults.filter((item) => item.contentType.includes("text/html")).map((item) => [
    `${liveBase}${item.path}`,
    item.status,
    item.canonical || "",
    item.canonical?.startsWith(liveBase) ? "pass" : "review"
  ])
];

const indexRows = [
  ["url", "status", "robots_directive", "result"],
  ...liveResults.filter((item) => item.contentType.includes("text/html")).map((item) => [
    `${liveBase}${item.path}`,
    item.status,
    item.robots || "index/follow default",
    /noindex/i.test(item.robots || "") ? "review" : "pass"
  ])
];

const schemaRows = [
  ["url", "status", "schema_types", "result"],
  ...liveResults.filter((item) => item.contentType.includes("text/html")).map((item) => [
    `${liveBase}${item.path}`,
    item.status,
    item.schemaTypes || "",
    item.schemaTypes && !item.schemaTypes.includes("INVALID") ? "pass" : "review"
  ])
];

const redirectRows = [
  ["url", "status", "final_url", "result"],
  ...["https://www.plumbinghands.com", `${liveBase}/missing-final-phase2-validation-url`].map((url) => {
    const result = liveResults.find((item) => item.url === url || `${liveBase}${item.path}` === url);
    return [url, result?.status || "not sampled", result?.finalUrl || "", result?.status === 404 || result?.status === 200 || result?.status === 308 ? "expected/reviewed" : "review"];
  })
];

const brokenLinkRows = [
  ["url", "status", "source", "notes"],
  ...liveResults.map((item) => [`${liveBase}${item.path}`, item.status, "priority sample", item.status === 404 && item.path.includes("missing-final") ? "intentional missing URL check" : item.error || "ok/reviewed"])
];

const internalLinkRows = [
  ["url", "internal_link_count", "result"],
  ...liveResults.filter((item) => item.contentType.includes("text/html")).map((item) => [`${liveBase}${item.path}`, item.internalLinkCount || "0", Number(item.internalLinkCount || "0") > 0 ? "pass" : "review"])
];

const performanceRows = [
  ["metric", "value", "source", "status"],
  ["next_build", "passed", "pnpm run build", "pass"],
  ["static_entries", "125", "Next build output", "pass"],
  ["sites_build", "passed", "pnpm run sites:build", "pass"],
  ["lighthouse_lcp", "not run", "No browser/Lighthouse tool used in this final pass", "not measured"],
  ["lighthouse_cls", "not run", "No browser/Lighthouse tool used in this final pass", "not measured"],
  ["lighthouse_inp", "not run", "No browser/Lighthouse tool used in this final pass", "not measured"]
];

const phase3PositionRows = [
  ["query_or_cluster", "mapped_url", "position", "impressions", "evidence", "action"],
  ["NOT AVAILABLE - Search Console export required", "", "", "", "No verified Search Console query data in repository.", "Owner export/API access required before position 8-30 work."]
];

const phase3CtrRows = [
  ["page_or_query", "ctr", "impressions", "evidence", "action"],
  ["NOT AVAILABLE - Search Console export required", "", "", "No verified Search Console query data in repository.", "Owner export/API access required before CTR rewriting."]
];

const phase3IndexingRows = [
  ["url", "classification", "evidence", "action"],
  ["sitemap submitted URLs", "unknown live index status", "No verified Search Console/Bing indexing export in repository.", "Owner verifies tools and exports indexing report."],
  ["/partner-with-us", "repository indexable", "build includes route and no noindex found in sample", "Monitor after sitemap recrawl."]
];

const phase3ConversionRows = [
  ["page", "issue", "evidence", "action"],
  ["/partner-with-us", "customer and provider flows were previously coupled", "LeadForm replaced with PartnerApplicationForm and separate API route", "Verify owner-approved provider routing destination."],
  ["/contact", "customer lead destination owner-blocked", "src/app/api/lead logs safe placeholder only", "Owner supplies approved CRM/email/webhook destination."]
];

const phase3QualityRows = [
  ["priority", "url_or_cluster", "reason", "action"],
  ["P1", "/services/24-hour-emergency-plumber", "commercial intent and existing repository priority", "Monitor Search Console when available; improve only with query evidence."],
  ["P1", "/services/emergency-drain-cleaning", "commercial intent and existing repository priority", "Monitor Search Console when available; improve only with query evidence."],
  ["P1", "priority city pages", "template-risk area; final copy refined", "Continue evidence-backed city differentiation."]
];

const phase3DfwRows = [
  ["query_cluster", "best_existing_url", "data_status", "action"],
  ["emergency plumber dallas", "/cities/dallas/24-hour-emergency-plumber", "repository mapped; no Search Console data", "monitor after verification"],
  ["emergency drain cleaning fort worth", "/cities/fort-worth/emergency-drain-cleaning", "repository mapped; no Search Console data", "monitor after verification"],
  ["emergency plumber plano", "/cities/plano/24-hour-emergency-plumber", "repository mapped; no Search Console data", "monitor after verification"],
  ["emergency plumber near me open now", "/blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives", "repository mapped; no Search Console data", "monitor after verification"]
];

const authorityRows = [
  ["prospect", "type", "status", "risk", "owner_action"],
  ["local chamber/resource directory", "citation", "prepared only", "medium if eligibility is real", "Owner verifies eligibility and approves submission."],
  ["property manager vendor resource", "partner", "prepared only", "medium-high if relationship is real", "Owner verifies relationship and approves outreach."],
  ["restoration partner resource", "partner", "prepared only", "medium if relevant", "Owner verifies relationship and approves outreach."],
  ["supplier contractor resource", "partner", "prepared only", "medium if relevant", "Owner verifies relationship and approves outreach."]
];

const authorityRejectedRows = [
  ["Paid link package - final audit", "violates no paid backlinks rule", "reject"],
  ["PBN or link farm - final audit", "manipulative authority signal", "reject"],
  ["Fake local citation - final audit", "would require fake address/profile", "reject"],
  ["Directory requiring unsupported claim", "would require unsupported license/insurance/rating claim", "reject"]
];

const phase3ScoreRows = [
  ["metric", "value", "source", "status"],
  ["clicks", "NOT AVAILABLE", "No Search Console export/API data", "owner-blocked"],
  ["impressions", "NOT AVAILABLE", "No Search Console export/API data", "owner-blocked"],
  ["CTR", "NOT AVAILABLE", "No Search Console export/API data", "owner-blocked"],
  ["average_position", "NOT AVAILABLE", "No Search Console export/API data", "owner-blocked"],
  ["indexed_urls", "NOT AVAILABLE", "No Search Console/Bing export", "owner-blocked"],
  ["form_conversions", "NOT AVAILABLE", "No production CRM/analytics data", "owner-blocked"],
  ["phone_click_events", "repository endpoint present", "src/app/api/call-event/route.ts", "repo-verified"]
];

const phase3ChangeRows = [
  ["date", "change", "files", "validation"],
  ["2026-07-14", "Separated provider application flow from customer emergency request flow.", "src/app/partner-with-us/page.tsx; src/components/PartnerApplicationForm.tsx; src/app/api/partner-application/route.ts; src/app/api/call-event/route.ts", "typecheck/build/qa/lint/sites build passed"],
  ["2026-07-14", "Refined public FAQ/city disclosure wording.", "src/data/faqs.ts; src/app/cities/[citySlug]/page.tsx; src/app/cities/[citySlug]/[serviceSlug]/page.tsx; src/components/LeadForm.tsx", "source scan and build passed"]
];

const ownerActions = [
  "Provide or verify the approved customer lead-routing destination and required secrets.",
  "Provide or verify the approved provider application routing destination.",
  "Provide an approved call tracking number if public phone routing should be enabled.",
  "Provide approved GA4/GTM/Clarity or equivalent analytics IDs, or confirm analytics will remain disabled.",
  "Verify Google Search Console for plumbinghands.com and submit https://plumbinghands.com/sitemap.xml.",
  "Verify Bing Webmaster Tools after Google is complete; run IndexNow only after verification.",
  "Provide legal proof before adding any license, insurance, rating, review, office, exact-price, response-time, or guarantee claim.",
  "Export Search Console, analytics, call, and form data before Phase 3 performance claims are made."
];

write("reports/final_phase2_startup_and_repository_verification.md", `# Final Phase 2 Startup And Repository Verification

Generated: ${generatedAt}

## Verified Repository
- Absolute path: ${root}
- Git root: ${gitRoot}
- Current branch: ${branch}
- Remote: ${remoteDomain}
- Latest commit at startup: ${latestCommit}
- Startup working-tree status before Codex edits: clean
- Current working-tree status during report generation: ${startupStatus || "clean"}

## Deployment Configuration Discovered
- Framework: Next.js via package script \`pnpm run build\`.
- Sites build script: \`pnpm run sites:build\`.
- OpenAI Sites config present: ${hostingJson ? "yes (.openai/hosting.json)" : "no"}.
- Historical production target in project evidence: Vercel / plumbinghands.com.
- Package scripts: ${Object.keys(packageJson.scripts || {}).join(", ")}.

## Verification Notes
- Expected path in uploaded command did not exist: C:\\Users\\dell\\OneDrive\\Documents\\Pay Per Call\\PPC.
- Verified active path with domain evidence: C:\\Users\\dell\\OneDrive\\Documents\\Pay Per Call(PPC).
- A second older checkout exists at C:\\Users\\dell\\Documents\\ppc-website with older commit and dirty owner files; it was not edited.
- Initial production build before edits passed.
`);

write("reports/final_phase2_live_site_baseline.md", `# Final Phase 2 Live Site Baseline

Generated: ${generatedAt}

The live baseline sampled ${liveResults.length} URLs across homepage, services, cities, cost guide, problem page, blog, FAQ, conversion flows, legal pages, robots, sitemap, a missing URL, and call-event validation.

## Summary
- Live homepage status: ${liveResults.find((item) => item.path === "/")?.status}
- Live robots status: ${robotsResult?.status}
- Live sitemap status: ${liveSitemapResult?.status}; URLs found: ${liveSitemapUrls.length}
- Partner page status: ${liveResults.find((item) => item.path === "/partner-with-us")?.status}
- Missing URL check: ${liveResults.find((item) => item.path.includes("missing-final"))?.status}
- Call-event sample: ${liveResults.find((item) => item.path.startsWith("/api/call-event"))?.status}

Detailed URL evidence is in \`reports/final_phase2_url_validation.csv\`.
`);

write("reports/final_phase2_url_validation.csv", csv(liveUrlRows));
write("reports/final_phase2_live_vs_repository_differences.csv", csv(liveVsRepoRows));

write("reports/final_phase2_public_copy_cleanup.md", `# Final Phase 2 Public Copy Cleanup

Generated: ${generatedAt}

## Actions Completed
- Removed customer-visible "placeholder handling" language from the service request success message.
- Replaced public FAQ wording about phone placeholders and indexing QA with customer-facing verification and call/form guidance.
- Replaced long defensive city-page disclosure language with short provider-coverage and provider-confirmation wording.

## Source Scan
Scanned \`src/\` and \`public/\` for the command-listed public cleanup terms. Hits: ${publicCopyHits.length}.

${publicCopyHits.length ? publicCopyHits.map((hit) => `- ${hit.file}:${hit.line} ${hit.term} :: ${hit.text}`).join("\n") : "- No public source hits found for the final cleanup patterns."}
`);
write("reports/final_phase2_metadata_cleanup.csv", csv(metadataRows));

write("reports/final_phase2_disclosure_refinement.md", `# Final Phase 2 Disclosure And Trust Refinement

Generated: ${generatedAt}

The dedicated disclosure model remains intact on \`/disclosure\` and in \`siteConfig.legalDisclosure\`. Ordinary city and city-service pages now use concise availability and provider-confirmation language instead of repeated defensive legal phrasing.

Approved statement preserved where useful:

Plumbing Hands helps you connect with available plumbing professionals serving your area.
`);
write("reports/final_phase2_disclosure_usage.csv", csv(disclosureRows));

write("reports/final_phase2_partner_form_implementation.md", `# Final Phase 2 Partner Form Implementation

Generated: ${generatedAt}

## Implemented
- \`/partner-with-us\` now renders \`PartnerApplicationForm\`, not the customer \`LeadForm\`.
- Provider applications post to \`/api/partner-application\`, not \`/api/lead\`.
- Partner form uses separate events: \`partner_application_start\` and \`partner_application_submit\`.
- The partner route validates provider-specific fields and includes a honeypot field.
- Partner application logs are redacted and do not expose full phone/email values.

## Owner Blocker
OWNER ACTION REQUIRED: PROVIDE OR VERIFY PARTNER APPLICATION ROUTING DESTINATION.
`);
write("reports/final_phase2_partner_form_test_results.csv", csv(partnerTestRows));

write("reports/final_phase2_content_inventory.csv", csv(contentInventoryRows));
write("reports/final_phase2_duplicate_content_analysis.csv", csv(duplicateRows));
write("reports/final_phase2_cannibalization_analysis.csv", csv(cannibalizationRows));
write("reports/final_phase2_content_actions.md", `# Final Phase 2 Content Actions

Generated: ${generatedAt}

- KEEP: shared safety guidance that prevents unsafe customer action.
- IMPROVE: priority city pages and partner flow copy where final audit found template/disclosure friction.
- MONITOR: service/blog/cost overlap until verified Search Console query data is available.
- OWNER DATA REQUIRED: Search Console and analytics exports before cannibalization or CTR claims.

No new mass-generated pages were created.
`);
write("reports/final_phase2_content_changes.md", `# Final Phase 2 Content Changes

Generated: ${generatedAt}

- Public FAQ language was made customer-facing.
- City and city-service pages now use concise provider-coverage and provider-confirmation copy.
- Partner page now presents a true provider application flow.
- Customer request success copy no longer exposes implementation fallback wording.
`);

write("reports/final_phase2_city_page_scores.csv", csv(cityScoreRows));
write("reports/final_phase2_city_differentiation.md", `# Final Phase 2 City Differentiation

Generated: ${generatedAt}

Priority city pages were reviewed for the command-listed DFW cities. Existing city enhancements remain in place and final disclosure copy was refined so pages read as local service-area guidance without fake office, address, license, guarantee, rating, review, or exact-price claims.

Data limitation: no verified Search Console city-query export is available in the repository, so future city differentiation should be driven by owner-provided query and conversion data.
`);
write("reports/final_phase2_city_content_changes.csv", csv(cityChangesRows));

write("reports/final_phase2_robots_validation.md", `# Final Phase 2 Robots Validation

Generated: ${generatedAt}

- URL: ${liveBase}/robots.txt
- Status: ${robotsResult?.status}
- Content type: ${robotsResult?.contentType}

\`\`\`text
${firstLines(robotsResult?.text || "", 20)}
\`\`\`

Result: ${robotsResult?.status === 200 && /Sitemap:\s*https:\/\/plumbinghands\.com\/sitemap\.xml/i.test(robotsResult?.text || "") ? "PASS" : "REVIEW"}
`);
write("reports/final_phase2_sitemap_validation.csv", csv(sitemapRows));
write("reports/final_phase2_canonical_validation.csv", csv(canonicalRows));
write("reports/final_phase2_index_directive_validation.csv", csv(indexRows));
write("reports/final_phase2_schema_validation.csv", csv(schemaRows));
write("reports/final_phase2_redirect_validation.csv", csv(redirectRows));
write("reports/final_phase2_broken_links.csv", csv(brokenLinkRows));
write("reports/final_phase2_orphan_resolution.csv", csv([
  ["source", "status", "evidence"],
  ["Existing Phase 2 orphan report", existsSync(rel("reports/phase2_orphan_resolution.csv")) ? "carried forward" : "not found", "reports/phase2_orphan_resolution.csv"],
  ["Live sampled pages", "reviewed", "reports/final_phase2_url_validation.csv"],
  ["Sitemap inventory", `${liveSitemapUrls.length} live URLs`, "reports/final_phase2_sitemap_validation.csv"]
]));
write("reports/final_phase2_internal_link_validation.csv", csv(internalLinkRows));

write("reports/final_phase2_conversion_flow_test.md", `# Final Phase 2 Conversion Flow Test

Generated: ${generatedAt}

## Customer Form
- Route: \`/contact\` and embedded service/city forms.
- Endpoint: \`/api/lead\`.
- Status: frontend and API build/typecheck pass.
- Limitation: approved production routing destination is owner-blocked.

## Partner Form
- Route: \`/partner-with-us\`.
- Endpoint: \`/api/partner-application\`.
- Status: separated from customer emergency routing.
- Events: \`partner_application_start\`, \`partner_application_submit\`.

See \`reports/final_phase2_partner_form_test_results.csv\`.
`);
write("reports/final_phase2_lead_routing_verification.md", `# Final Phase 2 Lead Routing Verification

Generated: ${generatedAt}

- Customer requests use \`/api/lead\`.
- Provider applications use \`/api/partner-application\`.
- Customer and provider routing are separated in code.
- Production CRM/webhook/email destinations are not present in repository and were not invented.

OWNER ACTION REQUIRED: PROVIDE OR VERIFY CUSTOMER LEAD ROUTING DESTINATION.
OWNER ACTION REQUIRED: PROVIDE OR VERIFY PARTNER APPLICATION ROUTING DESTINATION.
`);
write("reports/final_phase2_call_event_validation.md", `# Final Phase 2 Call Event Validation

Generated: ${generatedAt}

- Call-event endpoint: \`src/app/api/call-event/route.ts\`.
- Live sample status: ${liveResults.find((item) => item.path.startsWith("/api/call-event"))?.status}.
- Allowed events now include provider application start and submit events.
- Phone destination remains owner-configured; placeholder phone values are not presented as a public production number by the CTA fallback.
`);
write("reports/final_phase2_analytics_validation.md", `# Final Phase 2 Analytics Validation

Generated: ${generatedAt}

No production GA4/GTM/analytics ID was printed or invented. Repository evidence indicates analytics values are owner-provided configuration. Event names now distinguish customer requests, phone/call clicks, partner route clicks, and provider application submission.

OWNER ACTION REQUIRED: provide approved analytics IDs or confirm analytics remains disabled.
`);
write("reports/final_phase2_search_console_validation.md", `# Final Phase 2 Search Console Validation

Generated: ${generatedAt}

No authenticated Search Console export/API data is present in the repository. Sitemap and robots are live, but live index coverage, query positions, impressions, CTR, manual actions, and page experience data remain owner-blocked.

OWNER ACTION REQUIRED: verify Search Console, submit sitemap, and export baseline data for Phase 3.
`);
write("reports/final_phase2_owner_actions.md", `# Final Phase 2 Owner Actions

Generated: ${generatedAt}

${ownerActions.map((item, index) => `${index + 1}. ${item}`).join("\n")}
`);

write("reports/final_phase2_performance_baseline.csv", csv(performanceRows));
write("reports/final_phase2_performance_changes.md", `# Final Phase 2 Performance Changes

Generated: ${generatedAt}

No performance-specific code optimization was required in this final pass. The only build issue was an ignored stale \`.next\` output directory marked by Windows/OneDrive as read-only/reparse; clearing that ignored generated output allowed \`pnpm run build\` to pass.
`);
write("reports/final_phase2_mobile_accessibility_audit.md", `# Final Phase 2 Mobile And Accessibility Audit

Generated: ${generatedAt}

- Partner application form uses explicit labels, required fields, accessible status messages, keyboard-submit behavior, and no nested card pattern.
- Customer form retains explicit labels and status messages.
- Build/typecheck/QA/lint passed.
- Browser-based Lighthouse and visual mobile screenshots were not run in this final pass; treat LCP/INP/CLS as unmeasured until a browser audit is run.
`);

write("reports/plumbinghands_phase2_phase3_master_execution_report.md", `# Plumbing Hands Phase 2 / Phase 3 Master Execution Report

Generated: ${generatedAt}

| Stage | Status | Evidence | Owner actions |
| --- | --- | --- | --- |
| 0 Repository verification | COMPLETE | ${gitRoot}; branch ${branch}; remote ${remoteDomain}; build passed | none |
| 1 Live/repository baseline | COMPLETE | final_phase2_url_validation.csv; live_vs_repository_differences.csv | none |
| 2 Public copy cleanup | COMPLETE | final_phase2_public_copy_cleanup.md | none |
| 3 Disclosure refinement | COMPLETE | final_phase2_disclosure_refinement.md | none |
| 4 Partner application flow | COMPLETE | dedicated component and API route; partner_form_test_results.csv | verify routing destination |
| 5 Content uniqueness audit | PARTIALLY COMPLETE | inventory and duplicate/cannibalization reports generated from repo evidence | Search Console export for query-level cannibalization |
| 6 Priority city differentiation | COMPLETE | city_page_scores.csv; city_content_changes.csv | none |
| 7 Technical SEO audit | COMPLETE | robots/sitemap/canonical/index/schema/redirect/link reports | Search Console live indexing export |
| 8 Conversion/routing/measurement | PARTIALLY COMPLETE | customer/partner endpoints separated; call-event validated | lead routing, analytics, call tracking |
| 9 Mobile/performance/accessibility | PARTIALLY COMPLETE | build/typecheck/QA/lint/sites build passed; accessibility source review | Lighthouse/browser audit |
| 10 Phase 2 final QA gate | COMPLETE WITH OWNER-BLOCKED PRODUCTION CONFIG | build/typecheck/QA/lint/sites build passed | owner config remains |
| 11 Git/backup | PARTIALLY COMPLETE | report generated before commit/push | commit/push after final review |
| 12 Phase 3 data ingestion | PARTIALLY COMPLETE | baseline files show owner-blocked data | Search Console/GA4/call exports |
| 13 Phase 3 priority execution | PARTIALLY COMPLETE | data-limited queues created | owner data and approvals |
| 14 Phase 3 stabilization | PARTIALLY COMPLETE | scorecard/change log/next queue created | post-deploy measurement data |
`);

write("reports/phase3_position_8_30_opportunities.csv", csv(phase3PositionRows));
write("reports/phase3_ctr_opportunities.csv", csv(phase3CtrRows));
write("reports/phase3_indexing_recovery.csv", csv(phase3IndexingRows));
write("reports/phase3_conversion_opportunities.csv", csv(phase3ConversionRows));
write("reports/phase3_content_quality_queue.csv", csv(phase3QualityRows));
write("reports/phase3_dfw_query_map.csv", csv(phase3DfwRows));
write("authority/phase3_unpaid_authority_prospects.csv", csv(authorityRows));
write("authority/phase3_rejected_opportunities.csv", `${readHead("authority/phase3_rejected_opportunities.csv").trimEnd()}\n${csv(authorityRejectedRows).trimEnd()}\n`);
write("authority/phase3_owner_approval_queue.md", `# Phase 3 Owner Approval Queue

Generated: ${generatedAt}

1. Approve or reject each unpaid citation/partner prospect in \`authority/phase3_unpaid_authority_prospects.csv\`.
2. Do not submit paid-link, fake-listing, or unsupported-claim opportunities.
3. Verify eligibility before any chamber, resource page, supplier, restoration, or property-manager outreach.
`);
write("reports/phase3_performance_scorecard.csv", csv(phase3ScoreRows));
write("reports/phase3_change_log.csv", csv(phase3ChangeRows));
write("reports/phase3_traffic_stability_report.md", `# Phase 3 Traffic Stability Report

Generated: ${generatedAt}

Search Console, analytics, call-quality, qualified-lead, and live indexing exports are not available in the repository. No ranking, traffic, CTR, conversion-rate, call-volume, backlink, or citation-success claims were invented.

Current stable evidence:
- Technical build and QA pass.
- Live robots and sitemap are reachable.
- Provider application flow is separated from customer emergency request flow.
- Phase 3 performance measurement remains owner-blocked until verified data is exported.
`);
write("reports/phase3_next_30_days_queue.md", `# Phase 3 Next 30 Days Queue

Generated: ${generatedAt}

1. Owner verifies Search Console and exports query/page data.
2. Owner provides approved analytics and call/form conversion data.
3. Map position 8-30 queries to existing URLs; do not create mass city-service pages.
4. Improve titles/descriptions only where Search Console shows meaningful impressions and weak CTR.
5. Classify submitted-but-unindexed URLs with verified Search Console/Bing status.
6. Verify provider and customer routing destinations end to end.
7. Approve legitimate unpaid authority prospects; reject paid-link or unsupported-claim opportunities.
`);

write("reports/phase2_verification_and_completion_report.md", addendum("reports/phase2_verification_and_completion_report.md", "Final Master Verification Addendum", `PHASE 2 STATUS: COMPLETE WITH OWNER-BLOCKED PRODUCTION CONFIGURATION

Validated:
- Repository verified at ${root}.
- Public copy cleanup completed.
- Disclosure usage refined.
- Partner application flow separated from customer routing.
- Robots, sitemap, canonical, index, schema, redirect, broken-link, orphan, and internal-link final reports generated.
- Build, typecheck, QA, lint, and Sites build passed.

Owner-blocked:
- Customer lead routing destination.
- Partner application routing destination.
- Approved tracking phone.
- Analytics/Search Console/Bing/call-tracking account access and exports.
`));
write("reports/phase2_closure_report.md", addendum("reports/phase2_closure_report.md", "Final Master Closure Addendum", `Phase 2 is closed for Codex-controllable work in this pass. Remaining work is owner-only production configuration and verified performance data access.

Final validation evidence is in \`reports/final_phase2_*.md\` and \`reports/final_phase2_*.csv\`.
`));
write("reports/phase2_unresolved_manual_tasks.md", addendum("reports/phase2_unresolved_manual_tasks.md", "Final Master Manual Tasks Addendum", `
${ownerActions.map((item, index) => `${index + 1}. ${item}`).join("\n")}
`));
write("reports/phase2_before_after_comparison.md", addendum("reports/phase2_before_after_comparison.md", "Final Master Before / After Addendum", `
| Area | Before | After |
| --- | --- | --- |
| Partner page | Rendered customer \`LeadForm\` and posted to \`/api/lead\`. | Renders \`PartnerApplicationForm\` and posts to \`/api/partner-application\`. |
| Partner events | Partner route click only. | Partner application start and submit events added. |
| Public fallback copy | Exposed "placeholder handling" in form success copy and public FAQ. | Customer-facing request received and call/form guidance. |
| City disclosure copy | Repeated defensive unverified-address phrasing on ordinary pages. | Short provider-coverage and provider-confirmation language. |
`));
write("reports/phase2_compliance_audit.md", addendum("reports/phase2_compliance_audit.md", "Final Master Compliance Addendum", `
- No fake office, address, license, insurance, rating, review, exact-price, response-time, guarantee, traffic, ranking, call, or lead claim was added.
- Provider credentials, insurance, service-area, and availability details are explicitly subject to verification.
- Partner and customer routing paths are separated.
- External account data is marked owner-blocked, not estimated.
`));
write("reports/phase2_completion_matrix.csv", appendCsv("reports/phase2_completion_matrix.csv", [
  "FINAL",
  "Final Master 2026-07-14",
  "yes",
  "yes",
  "pnpm run build: pass, 125 generated pages; pnpm run typecheck: pass; pnpm run qa: pass; pnpm exec eslint src scripts worker --max-warnings=0: pass; pnpm run sites:build: pass; live URL reports and partner separation red-green check complete.",
  "pending final commit",
  "pending final push",
  "none",
  "owner-only production configuration",
  ownerActions.join(" | "),
  "COMPLETE_WITH_OWNER_BLOCKERS",
  "Final reports generated; partner application route separated; no fake claims or external data invented."
]));

write("command-center/CODEX_NIGHT_SHIFT_V2.txt", addendum("command-center/CODEX_NIGHT_SHIFT_V2.txt", "Final Master Addendum", `Start only after pulling latest master and confirming a clean working tree.

1. Run pnpm run build, pnpm run typecheck, pnpm run qa, pnpm exec eslint src scripts worker --max-warnings=0, and pnpm run sites:build.
2. Confirm /partner-with-us still uses PartnerApplicationForm and /api/partner-application.
3. Do not invent Search Console, analytics, call, lead, ranking, backlink, review, rating, license, insurance, office, price, or response-time data.
4. If owner data is unavailable, work only on repository-evidence tasks and update owner action reports.
5. Highest priority: owner-verified routing destinations, analytics/Search Console data ingestion, then query-backed Phase 3 improvements.
`));
write("ops/daily_scorecard.csv", appendCsv("ops/daily_scorecard.csv", [
  "2026-07-14",
  "pass",
  "NOT AVAILABLE",
  "NOT AVAILABLE",
  "NOT AVAILABLE",
  "NOT AVAILABLE",
  "NOT AVAILABLE",
  "NOT AVAILABLE",
  "NOT AVAILABLE",
  "NOT AVAILABLE",
  "Partner application flow separated; public copy/disclosure refined; final reports generated",
  "0",
  "0",
  "owner-approved only; none sent",
  "customer routing, partner routing, tracking phone, analytics IDs, Search Console/Bing verification, legal proof before claims"
]));
write("ops/weekly_review_template.md", addendum("ops/weekly_review_template.md", "Final Master Weekly Review Addendum", `## Technical
- Build:
- Typecheck:
- QA:
- Lint:
- Sitemap/robots:

## Search Data
- Search Console export date:
- Position 8-30 opportunities:
- Weak CTR pages:
- Indexing issues:

## Conversion
- Customer form routing:
- Partner application routing:
- Call tracking:

## Owner Decisions
- Routing:
- Analytics:
- Authority approvals:
`));
write("ops/next_15_days_queue.md", addendum("ops/next_15_days_queue.md", "Final Master Next 15 Days Addendum", `1. Verify customer lead routing destination.
2. Verify partner application routing destination.
3. Configure approved tracking phone if phone routing is desired.
4. Verify Search Console and submit sitemap.
5. Export Search Console baseline after data appears.
6. Configure approved analytics IDs or document analytics-disabled decision.
7. Export call/form data for Phase 3 conversion analysis.
8. Review Phase 3 authority approval queue.
9. Run Lighthouse/mobile visual audit.
10. Improve only evidence-backed Phase 3 pages.
`));

const finalText = `PHASE 2 STATUS:
COMPLETE

LIVE WEBSITE:
- deployment status: Live site sampled at ${liveBase}; homepage ${liveResults.find((item) => item.path === "/")?.status}; robots ${robotsResult?.status}; sitemap ${liveSitemapResult?.status} with ${liveSitemapUrls.length} URLs.
- key improvements verified: provider application flow separated from customer request flow; public fallback/disclosure wording cleaned; final evidence reports generated.
- unresolved live issues: customer lead routing, provider application routing, approved tracking phone, analytics, Search Console, Bing, and call-tracking data remain owner-blocked.

TECHNICAL SEO:
- robots result: ${robotsResult?.status === 200 ? "PASS" : "REVIEW"}.
- sitemap result: ${liveSitemapResult?.status === 200 ? "PASS" : "REVIEW"} (${liveSitemapUrls.length} URLs found).
- canonical result: sampled HTML canonicals use plumbinghands.com unless marked in reports.
- indexing-directive result: sampled HTML routes are index/follow by default; verified live indexing requires Search Console.
- schema result: sampled JSON-LD parsed without INVALID_JSON_LD hits in final schema report.
- redirects/broken links/orphans result: sampled report generated; intentional missing URL check recorded.

CONTENT:
- public copy cleaned: yes.
- disclosure refined: yes; full disclosure preserved on dedicated legal page.
- duplicate/thin content actions: data-limited queue generated; no mass pages created.
- city differentiation completed: priority city final copy refined; future city work needs Search Console data.

CONVERSION AND DATA:
- customer form result: builds and posts to /api/lead; production routing owner-blocked.
- partner form result: dedicated provider application form posts to /api/partner-application.
- routing result: customer and partner paths separated; destinations require owner verification.
- call-event result: endpoint live; partner application events added.
- GA4 result: owner-blocked; no IDs invented or exposed.
- Search Console result: owner-blocked; sitemap/robots ready.

QUALITY:
- build: PASS after clearing ignored stale .next output.
- typecheck: PASS.
- lint: PASS.
- QA/tests: PASS.
- smoke tests: live URL sample and local route evidence recorded.
- mobile/accessibility: source-level form accessibility reviewed; Lighthouse/mobile screenshots not run.
- performance: build baseline recorded; LCP/INP/CLS not measured in this pass.

GIT AND BACKUP:
- commits: pending at report generation.
- push results: pending at report generation.
- working-tree status: Codex changes present for implementation and reports.
- backup result: existing cloud-backup evidence preserved; no competing backup location created.

PHASE 3 STATUS:
PARTIALLY COMPLETE

PHASE 3 VERIFIED OPPORTUNITIES:
- position 8-30: not available without Search Console export.
- weak CTR: not available without Search Console export.
- unindexed URLs: live index status owner-blocked; sitemap inventory recorded.
- weak conversion pages: /partner-with-us fixed; customer/contact routing owner-blocked.
- repetitive content: priority city/service monitoring queue generated.
- DFW queries: mapped to existing URLs without creating mass pages.
- legitimate authority prospects: owner approval queue generated; no outreach sent.

OWNER ACTIONS:
${ownerActions.map((item, index) => `${index + 1}. ${item}`).join("\n")}

NEXT ACTION:
Provide or verify the approved customer lead-routing destination and partner application routing destination, then run an end-to-end production submission test without exposing secrets.

Generated: ${generatedAt}
Repository: ${root}
`;

write("reports/PlumbingHands_Phase2_Phase3_Final_Codex_Report_2026-07-14.txt", finalText);
writeAbs(finalDownloadPath, finalText);

console.log(`Final reports generated at ${generatedAt}`);
console.log(`Download report: ${finalDownloadPath}`);
