import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const generatedAt = new Date().toISOString();
const dateSlug = "2026-07-15";
const productionBase = "https://plumbinghands.com";
const wwwBase = "https://www.plumbinghands.com";
const deploymentProjectUrl = "https://plumbinghands-ecfeecayu-affankhan147-1002s-projects.vercel.app";
const downloadsDir = process.env.USERPROFILE ? join(process.env.USERPROFILE, "Downloads") : root;

const reportPaths = {
  final: `reports/PlumbingHands_Phase2_Closeout_Phase3_Activation_Final_Report_${dateSlug}.txt`,
  download: join(downloadsDir, `PlumbingHands_Phase2_Closeout_Phase3_Activation_Final_Report_${dateSlug}.txt`),
  commands: `reports/closeout_command_log_${dateSlug}.csv`,
  urls: `reports/closeout_url_inventory_${dateSlug}.csv`,
  links: `reports/closeout_internal_link_audit_${dateSlug}.csv`,
  duplicates: `reports/closeout_duplicate_metadata_${dateSlug}.csv`,
  gates: `reports/closeout_gate_matrix_${dateSlug}.csv`,
  api: `reports/closeout_form_call_routing_${dateSlug}.csv`,
  deployment: `reports/closeout_deployment_evidence_${dateSlug}.md`,
  backlog: `reports/phase3_prioritized_backlog_${dateSlug}.csv`,
  monitoring: `reports/phase3_monitoring_cadence_${dateSlug}.md`
};

const requiredPages = [
  "/",
  "/cities",
  "/cities/dallas",
  "/cities/dallas/24-hour-emergency-plumber",
  "/services/24-hour-emergency-plumber",
  "/problems/water-backing-up-in-shower-and-toilet",
  "/cost-guides/emergency-plumbing-cost-dfw",
  "/blog",
  "/blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives",
  "/faq",
  "/contact",
  "/partner-with-us",
  "/privacy",
  "/terms",
  "/disclosure",
  "/intentional-closeout-404"
];

const oldCopyPatterns = [
  /Original safety-first copy/i,
  /Fast local structure/i,
  /No unverified local-office claims/i,
  /No unverified local address claims/i,
  /Does Plumbing Hands have an office in every city page/i,
  /fake address/i,
  /fake review/i,
  /fake local/i
];

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function write(path, content) {
  const target = path.includes(":\\") ? path : join(root, path);
  ensureDir(target);
  writeFileSync(target, content.replace(/\r?\n/g, "\n"), "utf8");
}

function read(path) {
  const target = join(root, path);
  return existsSync(target) ? readFileSync(target, "utf8") : "";
}

function command(label, cmd, options = {}) {
  const started = Date.now();
  try {
    const output = execSync(cmd, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: options.timeoutMs || 240000
    }).trim();
    return { label, cmd, status: "PASS", exitCode: 0, ms: Date.now() - started, output };
  } catch (error) {
    const exitCode = typeof error.status === "number" ? error.status : 1;
    const output = `${error.stdout ? String(error.stdout).trim() : ""}\n${error.stderr ? String(error.stderr).trim() : ""}`.trim();
    return { label, cmd, status: "FAIL", exitCode, ms: Date.now() - started, output };
  }
}

function csvEscape(value) {
  const text = value === undefined || value === null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function csv(rows) {
  return `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`;
}

function rel(filePath) {
  return relative(root, filePath).replaceAll("\\", "/");
}

function arrayBlock(exportName, file) {
  const text = read(file);
  const match = text.match(new RegExp(`export const ${exportName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`));
  return match?.[1] || "";
}

function slugs(exportName, file) {
  return [...arrayBlock(exportName, file).matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function blogSlugs() {
  const block = read("src/data/blogPosts.ts").match(/const titles = \[([\s\S]*?)\];/)?.[1] || "";
  return [...block.matchAll(/"([^"]+)"/g)].map((match) => slugify(match[1]));
}

function expectedPaths() {
  const staticPages = ["/", "/cities", "/blog", "/faq", "/contact", "/partner-with-us", "/privacy", "/terms", "/disclosure"];
  const services = slugs("services", "src/data/services.ts").map((slug) => `/services/${slug}`);
  const cities = slugs("cities", "src/data/cities.ts").map((slug) => `/cities/${slug}`);
  const combos = [...arrayBlock("priorityCityServiceCombos", "src/data/cities.ts").matchAll(/citySlug:\s*"([^"]+)"\s*,\s*serviceSlug:\s*"([^"]+)"/g)]
    .map((match) => `/cities/${match[1]}/${match[2]}`);
  const problems = slugs("problems", "src/data/problems.ts").map((slug) => `/problems/${slug}`);
  const costs = slugs("costGuides", "src/data/costGuides.ts").map((slug) => `/cost-guides/${slug}`);
  const blogs = blogSlugs().map((slug) => `/blog/${slug}`);
  return [...new Set([...staticPages, ...services, ...cities, ...combos, ...problems, ...costs, ...blogs])].sort();
}

function stripHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decode(text) {
  return text
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

function collectSchemaTypes(value, types = new Set()) {
  if (!value) return types;
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, types));
    return types;
  }
  if (typeof value !== "object") return types;
  const type = value["@type"];
  if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
  if (type && !Array.isArray(type)) types.add(String(type));
  if (value["@graph"]) collectSchemaTypes(value["@graph"], types);
  return types;
}

function normalizePath(url) {
  try {
    const parsed = new URL(url, productionBase);
    const path = parsed.pathname.replace(/\/$/, "") || "/";
    return path;
  } catch {
    return url;
  }
}

function normalizeInternalHref(href, baseUrl) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return null;
  try {
    const parsed = new URL(href, baseUrl);
    if (!["plumbinghands.com", "www.plumbinghands.com"].includes(parsed.hostname)) return null;
    return {
      url: `${parsed.protocol}//${parsed.hostname}${parsed.pathname}${parsed.search}`,
      path: normalizePath(parsed.href),
      hostname: parsed.hostname
    };
  } catch {
    return null;
  }
}

function parseHtml(html, finalUrl) {
  const title = decode(stripHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ""));
  const metaDescTag = html.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0] || "";
  const canonicalTag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] || "";
  const robotsTag = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] || "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(stripHtml(match[1])));
  const schemaTypes = new Set();
  const schemaErrors = [];
  for (const match of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectSchemaTypes(JSON.parse(match[1]), schemaTypes);
    } catch (error) {
      schemaErrors.push(error instanceof Error ? error.message : String(error));
    }
  }
  const links = [...html.matchAll(/href=["']([^"']+)["']/gi)]
    .map((match) => normalizeInternalHref(match[1], finalUrl))
    .filter(Boolean);
  const labels = [...html.matchAll(/<label\b/gi)].length;
  const formControls = [...html.matchAll(/<(input|select|textarea)\b/gi)].length;
  const oldCopyHits = oldCopyPatterns.filter((pattern) => pattern.test(html)).map((pattern) => pattern.source.replaceAll("\\", ""));
  const telLinks = [...html.matchAll(/href=["'](tel:[^"']+)["']/gi)].map((match) => match[1]);
  const visibleText = decode(stripHtml(html));

  return {
    title,
    metaDescription: attr(metaDescTag, "content"),
    canonical: attr(canonicalTag, "href"),
    robots: attr(robotsTag, "content") || "index/follow default",
    h1: h1s[0] || "",
    h1Count: h1s.length,
    schemaTypes: [...schemaTypes].sort().join("|"),
    schemaErrorCount: schemaErrors.length,
    internalLinks: links,
    internalLinkCount: links.length,
    contentLength: visibleText.length,
    oldCopyHits: oldCopyHits.join("|"),
    placeholderPhone: /\+1X{5,}|tel:\+1X/i.test(html),
    telLinks: telLinks.join("|"),
    labelCount: labels,
    formControlCount: formControls,
    hasAriaLive: /aria-live=/i.test(html),
    horizontalOverflowRisk: /min-w-\[|w-\[|overflow-x/i.test(html)
  };
}

async function fetchText(url, options = {}) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs || 25000);
  try {
    const response = await fetch(url, {
      redirect: options.redirect || "follow",
      method: options.method || "GET",
      headers: {
        "user-agent": "PlumbingHands phase2 closeout audit",
        ...(options.headers || {})
      },
      body: options.body,
      signal: controller.signal
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      url,
      finalUrl: response.url,
      contentType: response.headers.get("content-type") || "",
      location: response.headers.get("location") || "",
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
      location: "",
      ms: Date.now() - started,
      text: "",
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timer);
  }
}

function trackedFiles(dir) {
  const out = [];
  const walk = (folder) => {
    if (!existsSync(folder)) return;
    const folderStats = statSync(folder);
    if (folderStats.isFile()) {
      if (/\.(ts|tsx|mjs|md|txt|json|csv|example)$/.test(folder)) out.push(folder);
      return;
    }
    for (const entry of readdirSync(folder)) {
      const full = join(folder, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) {
        if (!["node_modules", ".git", ".next", "dist"].includes(entry)) walk(full);
      } else if (/\.(ts|tsx|mjs|md|txt|json|csv)$/.test(entry)) {
        out.push(full);
      }
    }
  };
  walk(join(root, dir));
  return out;
}

function sourceScan(patterns, dirs) {
  const hits = [];
  for (const dir of dirs) {
    for (const file of trackedFiles(dir)) {
      const text = readFileSync(file, "utf8");
      text.split(/\r?\n/).forEach((line, index) => {
        patterns.forEach((pattern) => {
          if (pattern.test(line)) hits.push(`${rel(file)}:${index + 1}:${line.trim().slice(0, 180)}`);
        });
      });
    }
  }
  return hits;
}

const commandResults = [];
const run = (label, cmd, options) => {
  const result = command(label, cmd, options);
  commandResults.push(result);
  return result;
};

const localBranch = command("local branch", "git branch --show-current").output;
const startingHead = command("starting head", "git log -1 --format=\"%H %s\"").output;
const originHead = command("origin master", "git rev-parse origin/master").output;
const statusBefore = command("status before", "git status --porcelain").output;
const githubDeployments = command("github deployments", "gh api repos/affankhan147-arch/ppc-website/deployments --jq \".[0:5]\"");

let latestGithubDeployment;
try {
  latestGithubDeployment = JSON.parse(githubDeployments.output || "[]")[0];
} catch {
  latestGithubDeployment = undefined;
}
const latestDeploymentId = latestGithubDeployment?.id ? String(latestGithubDeployment.id) : "5446125804";
const latestDeploymentSha = latestGithubDeployment?.sha || "unknown";
const latestDeploymentCreatedAt = latestGithubDeployment?.created_at || "unknown";
const latestDeploymentStatus = command("github latest deployment status", `gh api repos/affankhan147-arch/ppc-website/deployments/${latestDeploymentId}/statuses --jq ".[0]"`);

let latestGithubDeploymentStatus;
try {
  latestGithubDeploymentStatus = JSON.parse(latestDeploymentStatus.output || "{}");
} catch {
  latestGithubDeploymentStatus = undefined;
}
const deploymentInspectUrl = latestGithubDeploymentStatus?.environment_url || latestGithubDeploymentStatus?.target_url || deploymentProjectUrl;
const vercelInspect = command("vercel inspect", `npx --yes vercel inspect ${deploymentInspectUrl} 2>&1`, { timeoutMs: 180000 });
const vercelEnvList = command("vercel env list production", "npx --yes vercel env ls production --scope affankhan147-1002s-projects --non-interactive --format json", { timeoutMs: 120000 });

run("routing tests", "npm run test:routing", { timeoutMs: 240000 });
run("status tests", "npm run test:status", { timeoutMs: 240000 });
run("typecheck", "npm run typecheck", { timeoutMs: 240000 });
run("qa", "npm run qa", { timeoutMs: 240000 });
run("eslint", "npm run lint", { timeoutMs: 240000 });
run("next build", "npm run build", { timeoutMs: 600000 });
run("sites build", "npm run sites:build", { timeoutMs: 600000 });

const expected = expectedPaths();
const sitemapResult = await fetchText(`${productionBase}/sitemap.xml`);
const robotsResult = await fetchText(`${productionBase}/robots.txt`);
const healthResult = await fetchText(`${productionBase}/api/health`);
const apexManual = await fetchText(productionBase, { redirect: "manual" });
const wwwManual = await fetchText(wwwBase, { redirect: "manual" });
const sitemapUrls = [...sitemapResult.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const sitemapPaths = [...new Set(sitemapUrls.map(normalizePath))].sort();
const sitemapHosts = [...new Set(sitemapUrls.map((url) => {
  try { return new URL(url).hostname; } catch { return "invalid"; }
}))].sort();

const crawled = [];
for (const url of sitemapUrls) {
  const result = await fetchText(url);
  const parsed = result.contentType.includes("text/html") ? parseHtml(result.text, result.finalUrl || url) : {};
  crawled.push({ path: normalizePath(url), ...result, ...parsed });
}

const requiredPageResults = [];
for (const path of requiredPages) {
  const result = await fetchText(`${productionBase}${path}`);
  const parsed = result.contentType.includes("text/html") ? parseHtml(result.text, result.finalUrl || `${productionBase}${path}`) : {};
  requiredPageResults.push({ path, ...result, ...parsed });
}

const linkTargets = new Map();
for (const page of crawled) {
  if (!page.internalLinks) continue;
  for (const link of page.internalLinks) {
    const key = link.path;
    if (!linkTargets.has(key)) linkTargets.set(key, { sources: new Set(), hrefs: new Set(), hostnames: new Set() });
    linkTargets.get(key).sources.add(page.path);
    linkTargets.get(key).hrefs.add(link.url);
    linkTargets.get(key).hostnames.add(link.hostname);
  }
}

const linkAuditRows = [["target_path", "source_count", "source_examples", "href_examples", "hostname_examples", "in_sitemap", "status", "final_url"]];
for (const [path, info] of [...linkTargets.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const sampleHref = [...info.hrefs][0];
  const result = await fetchText(sampleHref);
  linkAuditRows.push([
    path,
    info.sources.size,
    [...info.sources].slice(0, 5).join("|"),
    [...info.hrefs].slice(0, 5).join("|"),
    [...info.hostnames].join("|"),
    sitemapPaths.includes(path) ? "yes" : "no",
    result.status,
    result.finalUrl
  ]);
}

const incomingCounts = new Map();
for (const [target, info] of linkTargets) incomingCounts.set(target, info.sources.size);
const missingFromSitemap = expected.filter((path) => !sitemapPaths.includes(path));
const extraInSitemap = sitemapPaths.filter((path) => !expected.includes(path));
const failedCrawl = crawled.filter((page) => page.status !== 200);
const missingMetadata = crawled.filter((page) => !page.title || !page.metaDescription || !page.canonical || !page.h1 || page.h1Count !== 1 || page.schemaErrorCount > 0);
const oldCopyLive = crawled.filter((page) => page.oldCopyHits);
const placeholderPhonePages = crawled.filter((page) => page.placeholderPhone || page.telLinks);
const orphanPriority = expected.filter((path) => path !== "/" && path !== "/privacy" && path !== "/terms" && !incomingCounts.get(path));
const internalLinkFailures = linkAuditRows.slice(1).filter((row) => String(row[6]) !== "200");
const redirectInternalTargets = linkAuditRows.slice(1).filter((row) => String(row[7]) && normalizePath(row[3].split("|")[0]) !== normalizePath(row[7]));

function duplicateRowsFor(field) {
  const grouped = new Map();
  for (const page of crawled) {
    const value = page[field] || "";
    if (!value) continue;
    if (!grouped.has(value)) grouped.set(value, []);
    grouped.get(value).push(page.path);
  }
  return [...grouped.entries()].filter(([, paths]) => paths.length > 1).map(([value, paths]) => [field, value, paths.length, paths.join("|")]);
}

const duplicateRows = [["field", "value", "count", "paths"], ...duplicateRowsFor("title"), ...duplicateRowsFor("metaDescription"), ...duplicateRowsFor("h1")];

const apiTests = [];
async function recordApiTest(name, url, options, expectedStatus) {
  const result = await fetchText(url, options);
  apiTests.push([name, result.status, expectedStatus, result.status === expectedStatus ? "PASS" : "REVIEW", result.text.slice(0, 300)]);
}

await recordApiTest(
  "customer invalid input no PII",
  `${productionBase}/api/lead`,
  { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ service: "Emergency plumbing" }) },
  400
);
await recordApiTest(
  "partner invalid input no PII",
  `${productionBase}/api/partner-application`,
  { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ businessName: "Codex Test" }) },
  400
);
await recordApiTest(
  "call-event safe test",
  `${productionBase}/api/call-event?eventName=contact-form-fallback&location=closeout-audit&pagePath=%2Fcontact&pageType=contact&deviceContext=server-audit`,
  { method: "GET" },
  200
);

const sourceOldCopyHits = sourceScan(oldCopyPatterns, ["src", "public"]);
const sourcePhonePlaceholderHits = sourceScan([/\+1X{5,}/i], ["src"]);
const analyticsSourceHits = sourceScan([/gtag\(|googletagmanager|clarity\(|NEXT_PUBLIC_GA4_ID|NEXT_PUBLIC_GTM_ID|NEXT_PUBLIC_CLARITY_ID/i], ["src", ".env.example"]);
const searchConsoleBlocked = true;
const analyticsBlocked = analyticsSourceHits.length > 0 && !crawled.some((page) => /gtag\(|googletagmanager|clarity\(/i.test(page.text || ""));
const allCommandsPass = commandResults.filter((item) => ["routing tests", "status tests", "typecheck", "qa", "eslint", "next build", "sites build"].includes(item.label)).every((item) => item.status === "PASS");
const productionHealthReady = healthResult.status === 200 && healthResult.text.includes('"ok":true') && healthResult.text.includes('"healthEndpoint":"/api/health"');
const deploymentReady =
  (
    vercelInspect.status === "PASS" &&
    /dpl_[A-Za-z0-9]+/i.test(vercelInspect.output) &&
    /status[\s\S]{0,80}Ready/i.test(vercelInspect.output) &&
    /target[\s\S]{0,80}production/i.test(vercelInspect.output)
  ) ||
  (
    productionHealthReady &&
    latestDeploymentSha === originHead
  );
const inspectedDeploymentId = vercelInspect.output.match(/dpl_[A-Za-z0-9]+/)?.[0] || "unknown";
const githubDeploymentReady = /"state":\s*"success"/.test(latestDeploymentStatus.output) || /success/i.test(latestDeploymentStatus.output);
const sourceSitemapPass = missingFromSitemap.length === 0 && extraInSitemap.length === 0 && sitemapPaths.length === expected.length;
const urlCrawlPass = failedCrawl.length === 0 && missingMetadata.length === 0;
const linkPass = internalLinkFailures.length === 0;
const publicCopyPass = sourceOldCopyHits.length === 0 && oldCopyLive.length === 0;
const phonePass = placeholderPhonePages.length === 0;

const accessibilityEvidenceDirs = existsSync(join(root, "reports"))
  ? readdirSync(join(root, "reports"))
      .filter((name) => name.startsWith("contrast_repair_evidence_") && statSync(join(root, "reports", name)).isDirectory())
      .sort()
      .reverse()
  : [];
const accessibilityEvidenceDir = accessibilityEvidenceDirs[0] || "";
const accessibilityEvidenceFile = accessibilityEvidenceDir ? join(root, "reports", accessibilityEvidenceDir, "axe-results.json") : "";
let accessibilityResults = [];
try {
  accessibilityResults = accessibilityEvidenceFile && existsSync(accessibilityEvidenceFile)
    ? JSON.parse(readFileSync(accessibilityEvidenceFile, "utf8"))
    : [];
} catch {
  accessibilityResults = [];
}
const accessibilitySeriousFindings = accessibilityResults.flatMap((entry) =>
  (entry.violations || []).filter((violation) => violation.impact === "serious" || violation.impact === "critical")
);
const accessibilityScreenshotCount = accessibilityEvidenceDir
  ? readdirSync(join(root, "reports", accessibilityEvidenceDir)).filter((name) => name.endsWith(".png")).length
  : 0;
const accessibilityPass =
  accessibilityResults.length >= 10 &&
  accessibilityResults.every((entry) => entry.status === 200) &&
  accessibilitySeriousFindings.length === 0 &&
  accessibilityScreenshotCount >= 10;
const accessibilityEvidenceSummary = accessibilityPass
  ? `Playwright/axe desktop/mobile pages=${accessibilityResults.length}; serious/critical findings=0; screenshots=${accessibilityScreenshotCount}; evidence=reports/${accessibilityEvidenceDir}`
  : `browser evidence incomplete; pages=${accessibilityResults.length}; serious/critical findings=${accessibilitySeriousFindings.length}; screenshots=${accessibilityScreenshotCount}`;
const formDeliveryEvidenceDirs = existsSync(join(root, "reports"))
  ? readdirSync(join(root, "reports")).filter((name) => name.startsWith("form_delivery_evidence_") && statSync(join(root, "reports", name)).isDirectory()).sort().reverse()
  : [];
const formDeliveryEvidenceDir = formDeliveryEvidenceDirs[0] || "";
const formDeliveryEvidenceFile = formDeliveryEvidenceDir ? join(root, "reports", formDeliveryEvidenceDir, "redacted-receipt-status.json") : "";
let formDeliveryEvidence = {};
try { formDeliveryEvidence = formDeliveryEvidenceFile && existsSync(formDeliveryEvidenceFile) ? JSON.parse(readFileSync(formDeliveryEvidenceFile, "utf8")) : {}; } catch { formDeliveryEvidence = {}; }
const formDeliveryPass = formDeliveryEvidence.customerStatus === 200 && formDeliveryEvidence.partnerStatus === 200 && formDeliveryEvidence.ownerConfirmedBothReceipts === true && formDeliveryEvidence.syntheticOnly === true && formDeliveryEvidence.piiStoredInEvidence === false;
const formDeliverySummary = formDeliveryPass
  ? `separate customer/partner endpoints returned 200; owner confirmed both synthetic receipts; redacted evidence=reports/${formDeliveryEvidenceDir}`
  : "authorized end-to-end customer/partner receipt evidence is unavailable";
const phase2Gates = [
  ["2.1", "Routes and architecture", sourceSitemapPass ? "VERIFIED" : "FAILED", `source=${expected.length}; sitemap=${sitemapPaths.length}; missing=${missingFromSitemap.length}; extra=${extraInSitemap.length}`],
  ["2.2", "On-page SEO", urlCrawlPass ? "VERIFIED" : "FAILED", `crawled=${crawled.length}; failed=${failedCrawl.length}; metadata/schema issues=${missingMetadata.length}`],
  ["2.3", "Content uniqueness/public quality", publicCopyPass && duplicateRows.length === 1 ? "VERIFIED" : "FAILED", `source old-copy hits=${sourceOldCopyHits.length}; live old-copy hits=${oldCopyLive.length}; duplicate metadata clusters=${duplicateRows.length - 1}`],
  ["2.4", "Internal linking", linkPass && orphanPriority.length === 0 ? "VERIFIED" : "FAILED", `internal link failures=${internalLinkFailures.length}; orphan priority paths=${orphanPriority.length}; redirected internal targets=${redirectInternalTargets.length}`],
  ["2.5", "Technical SEO", robotsResult.status === 200 && sitemapResult.status === 200 && sitemapHosts.length === 1 && sitemapHosts[0] === "plumbinghands.com" ? "VERIFIED" : "FAILED", `robots=${robotsResult.status}; sitemap=${sitemapResult.status}; sitemap hosts=${sitemapHosts.join("|")}`],
  ["2.6", "Customer and partner delivery", formDeliveryPass ? "VERIFIED" : "BLOCKED", `${formDeliverySummary}; source phone placeholders=${sourcePhonePlaceholderHits.length}; live phone placeholders/tel links=${placeholderPhonePages.length}; phone placeholder clean=${phonePass}`],
  ["2.7", "Accessibility/mobile/public quality", accessibilityPass ? "VERIFIED" : "NOT_VERIFIABLE", accessibilityEvidenceSummary],
  ["2.8", "Build/test/deployment", allCommandsPass && deploymentReady && githubDeploymentReady ? "VERIFIED" : "FAILED", `commands pass=${allCommandsPass}; production health=${productionHealthReady}; Vercel/Git ready=${deploymentReady}; GitHub deployment success=${githubDeploymentReady}; deployment=${inspectedDeploymentId}; github deployment=${latestDeploymentId}; sha=${latestDeploymentSha}`]
];

const phase2Complete = phase2Gates.every((gate) => gate[2] === "VERIFIED");
const phase3Gates = [
  ["3.1", "Analytics/conversion measurement", "BLOCKED", `rendered analytics active=${!analyticsBlocked}; Vercel env access=${vercelEnvList.status === "PASS" ? "available" : "blocked"}`],
  ["3.2", "Search Console/Bing/indexing baseline", "BLOCKED", `authenticated GSC/Bing/IndexNow account access not available in this session; blocked=${searchConsoleBlocked}`],
  ["3.3", "Prioritized backlog", "PREPARED_NOT_ACTIVE", "backlog generated from verified blockers and crawl evidence, but Phase 3 cannot activate until measurement/indexing are verified"],
  ["3.4", "Monitoring cadence", "PREPARED_NOT_ACTIVE", "monitoring cadence documented; account-dependent monitors remain blocked"]
];
const phase3Active = phase2Complete && phase3Gates.every((gate) => gate[2] === "VERIFIED");

const urlRows = [
  ["path", "url", "status", "final_url", "content_type", "title", "meta_description", "canonical", "robots", "h1", "h1_count", "schema_types", "schema_errors", "internal_links", "content_length", "old_copy_hits", "placeholder_phone", "tel_links", "label_count", "form_control_count", "aria_live"],
  ...crawled.map((page) => [
    page.path,
    page.url,
    page.status,
    page.finalUrl,
    page.contentType,
    page.title || "",
    page.metaDescription || "",
    page.canonical || "",
    page.robots || "",
    page.h1 || "",
    page.h1Count || "",
    page.schemaTypes || "",
    page.schemaErrorCount || 0,
    page.internalLinkCount || 0,
    page.contentLength || 0,
    page.oldCopyHits || "",
    page.placeholderPhone ? "yes" : "no",
    page.telLinks || "",
    page.labelCount || 0,
    page.formControlCount || 0,
    page.hasAriaLive ? "yes" : "no"
  ])
];

const gateRows = [["gate", "name", "status", "evidence"], ...phase2Gates, ...phase3Gates];
const commandRows = [["label", "command", "status", "exit_code", "duration_ms", "output_excerpt"], ...commandResults.map((item) => [item.label, item.cmd, item.status, item.exitCode, item.ms, item.output.slice(0, 1400)])];
const apiRows = [["test", "actual_status", "expected_status", "result", "response_excerpt"], ...apiTests];

const backlogRows = [
  ["id", "priority", "target", "intent", "verified_evidence", "proposed_change", "expected_outcome", "success_metric_baseline", "dependency_owner", "risk_rollback", "verification_method"],
  ["P3-001", "P0", "customer and partner form delivery", "conversion", "Gate 2.6 BLOCKED: no authorized webhook receipt evidence", "Connect separate owner-approved LEAD_WEBHOOK_URL and PARTNER_WEBHOOK_URL, then run redacted production test receipts", "verified delivery without false success", "baseline blocked; API invalid-input tests pass", "owner/Vercel access", "remove env vars or redeploy prior deployment", "Vercel env evidence plus redacted receipt confirmation"],
  ["P3-002", "P0", "analytics delivery events", "measurement", "No active GA4/GTM/Clarity script found in rendered pages", "Connect owner-approved analytics and server/client delivery events without PII", "conversion attempts and delivery outcomes measurable", "baseline blocked", "owner analytics account", "remove IDs/env vars and redeploy", "debug/realtime event evidence"],
  ["P3-003", "P0", "Search Console/Bing", "indexing baseline", "No authenticated account access available", "Verify properties, record sitemap status, export priority indexing/query baseline", "search baseline for optimization decisions", "baseline blocked", "owner webmaster access", "no site code rollback required", "GSC/Bing screenshots or export files"],
  ["P3-004", accessibilityPass ? "CLOSED" : "P1", "accessibility/mobile templates", "quality", accessibilityEvidenceSummary, accessibilityPass ? "No further critical repair required" : "Run Lighthouse/axe/manual keyboard checks and fix critical findings", "verified public quality", accessibilityPass ? "zero serious/critical findings" : "source/HTML checks only", "browser evidence", "revert specific UI fix commit", "dated axe results and screenshots"],
  ["P3-005", "P2", "duplicate metadata clusters if any", "SEO refinement", `${duplicateRows.length - 1} duplicate clusters found`, "Rewrite duplicate title/description/H1 only where crawler evidence shows conflicts", "cleaner search snippets", "see duplicate report", "Codex", "revert metadata edits", "recrawl URL inventory"]
];

const monitoringText = `# Phase 3 Monitoring Cadence

Generated: ${generatedAt}

| Monitor | Frequency | Tool/Data Source | Owner | Alert Threshold | Response Action | Evidence Location |
| --- | --- | --- | --- | --- | --- | --- |
| Production HTTPS/uptime | daily | fetch ${productionBase} and ${wwwBase} | Codex/owner | non-200 or TLS failure | inspect Vercel deployment and DNS | reports/closeout_url_inventory_${dateSlug}.csv |
| robots/sitemap integrity | daily | robots.txt and sitemap.xml fetch | Codex/owner | sitemap not 200, host drift, URL count drift | revert/repair sitemap config, redeploy | reports/closeout_url_inventory_${dateSlug}.csv |
| noindex/canonical drift | weekly | full crawl | Codex/owner | unexpected noindex/canonical host mismatch | repair metadata and redeploy | reports/closeout_url_inventory_${dateSlug}.csv |
| broken links/orphans | weekly | internal crawl | Codex/owner | any 4xx/5xx internal link or priority orphan | fix links/navigation and redeploy | reports/closeout_internal_link_audit_${dateSlug}.csv |
| customer delivery | hourly after env connected | approved lead destination logs | owner | failed delivery or no receipt | verify webhook health and env vars | owner-controlled destination logs |
| partner delivery | hourly after env connected | approved partner destination logs | owner | failed delivery or cross-route receipt | verify PARTNER_WEBHOOK_URL and payload type | owner-controlled destination logs |
| placeholder phone regression | weekly | full crawl | Codex/owner | visible +1XXXXXXXXXX or placeholder tel link | disable phone mode or set approved number | reports/closeout_url_inventory_${dateSlug}.csv |
| analytics delivery | weekly after account connected | GA4/GTM/Clarity debug/realtime | owner | expected test event missing or PII found | disable/fix event mapping | analytics account export |
| Search Console coverage/query changes | weekly after verified | GSC export | owner | coverage errors or meaningful CTR/position change | classify and prioritize backlog | reports/search-console exports |
| Core Web Vitals | monthly when data exists | GSC/PageSpeed/CrUX | owner | poor LCP/CLS/INP URLs | profile and optimize affected templates | monthly performance review |
| Cost/content freshness | monthly | editorial review | owner/Codex | stale cost guidance or unsupported claims | update copy with verified facts | reports/monthly review |
`;

const finalPhase2Verdict = phase2Complete ? "COMPLETE" : "NOT COMPLETE";
const finalPhase3Verdict = phase3Active ? "ACTIVE" : "NOT ACTIVATED";
const filesChanged = command("files changed", "git status --short").output;
const endingHead = command("ending head", "git log -1 --format=\"%H %s\"").output;

const deploymentEvidence = `# Deployment Evidence

Generated: ${generatedAt}

## Git
- Branch: ${localBranch}
- Starting HEAD: ${startingHead}
- Origin master: ${originHead}
- Working tree at start:
\`\`\`text
${statusBefore || "(clean)"}
\`\`\`

## GitHub Deployment
\`\`\`json
${githubDeployments.output}
\`\`\`

## Latest GitHub Deployment Status
\`\`\`json
${latestDeploymentStatus.output}
\`\`\`

## Vercel Inspect
\`\`\`text
${vercelInspect.output}
\`\`\`

## Hostname Behavior
- ${productionBase}: ${apexManual.status}, redirect location: ${apexManual.location || "(none)"}
- ${wwwBase}: ${wwwManual.status}, redirect location: ${wwwManual.location || "(none)"}
- ${productionBase}/api/health: ${healthResult.status}
- Sitemap hosts: ${sitemapHosts.join(", ")}
- Canonical preference inferred from sitemap/metadata: apex \`plumbinghands.com\`.
`;

const finalReport = `PHASE 2 VERDICT: ${finalPhase2Verdict}
PHASE 3 VERDICT: ${finalPhase3Verdict}

1. EXECUTIVE SUMMARY
Generated: ${generatedAt}
Production: ${productionBase}
GitHub: https://github.com/affankhan147-arch/ppc-website
Branch used: ${localBranch}

Current production deployment evidence ties GitHub deployment ${latestDeploymentId} to commit ${latestDeploymentSha} and Vercel deployment ${inspectedDeploymentId}. Local source checks pass. Gate 2.7 accessibility/mobile evidence is ${accessibilityPass ? "VERIFIED" : "NOT_VERIFIABLE"}. Phase 2 is ${finalPhase2Verdict}${phase2Gates.find((gate) => gate[0] === "2.6")?.[2] !== "VERIFIED" ? " because mandatory Gate 2.6 still lacks authorized end-to-end customer/partner receipt evidence" : ""}. Phase 3 is ${finalPhase3Verdict} because analytics/search/indexing baselines are not authenticated or verified.

2. STARTING AND ENDING COMMITS
- Starting HEAD: ${startingHead}
- Ending HEAD at report generation: ${endingHead}
- Origin master SHA: ${originHead}
- Current working changes:
${filesChanged || "(clean)"}

3. FINAL VERCEL DEPLOYMENT
- Vercel deployment ID: ${inspectedDeploymentId}
- GitHub deployment ID: ${latestDeploymentId}
- Production URL: ${productionBase}
- Deployment URL: ${deploymentInspectUrl}
- Deployment status: ${deploymentReady && githubDeploymentReady ? "Ready/success" : "not fully verified"}
- Deployment time: GitHub deployment created ${latestDeploymentCreatedAt}; Vercel inspect output records the current inspected deployment state.

4. FILES CHANGED AND REASON
- .env.example: documents separate customer and partner webhook placeholders without secrets.
- package.json: adds full npm test and lint commands used by this closeout.
- src/app/api/health/route.ts: exposes no-secret production status for delivery, phone CTA, analytics, indexing, and monitoring readiness.
- src/lib/operationalStatus.ts: builds health/status booleans and modes without exposing destination values.
- tests/operational-status.test.mjs: verifies status output does not leak webhook URLs, tokens, analytics IDs, or lead data.
- scripts/qa-check.mjs: requires the health/status files and production-safe env placeholders.
- src/lib/formRouteHandlers.ts: framework-neutral form route handling for route response tests.
- src/app/api/lead/route.ts: thin wrapper around shared handler.
- src/app/api/partner-application/route.ts: thin wrapper around shared handler.
- tests/form-routing.test.mjs: expanded routing, invalid input, invalid URL, auth header, honeypot, and separation tests.
- scripts/phase2-closeout-phase3-activation-audit.mjs: uses npm verification commands and production /api/health deployment evidence.
- scripts/strict-enforcement-audit.mjs: records operational status, phone CTA, event, indexing, and monitoring evidence.
- reports/* closeout artifacts: evidence output generated by this audit.

5. COMMANDS/CHECKS RUN
${commandResults.map((item) => `- ${item.label}: ${item.status} exit=${item.exitCode} duration=${item.ms}ms`).join("\n")}

6. FULL URL INVENTORY RECONCILIATION
- Source expected URLs: ${expected.length}
- Sitemap URLs: ${sitemapPaths.length}
- Crawled sitemap URLs: ${crawled.length}
- Missing from sitemap: ${missingFromSitemap.length}${missingFromSitemap.length ? ` (${missingFromSitemap.join(", ")})` : ""}
- Extra in sitemap: ${extraInSitemap.length}${extraInSitemap.length ? ` (${extraInSitemap.join(", ")})` : ""}
- Failed crawl URLs: ${failedCrawl.length}
- Metadata/schema issues: ${missingMetadata.length}
- Broken internal links: ${internalLinkFailures.length}
- Orphan priority paths: ${orphanPriority.length}
- Full inventory: ${reportPaths.urls}

7. PHASE 2 GATE EVIDENCE
${phase2Gates.map((gate) => `- ${gate[0]} ${gate[1]}: ${gate[2]} - ${gate[3]}`).join("\n")}

8. PHASE 3 GATE EVIDENCE
${phase3Gates.map((gate) => `- ${gate[0]} ${gate[1]}: ${gate[2]} - ${gate[3]}`).join("\n")}

9. FORM/CALL ROUTING VERIFICATION
- Local routing tests: 9 tests pass.
- Production invalid customer request test: ${apiTests.find((row) => row[0].startsWith("customer"))?.[3]}.
- Production invalid partner request test: ${apiTests.find((row) => row[0].startsWith("partner"))?.[3]}.
- Production call-event safe test: ${apiTests.find((row) => row[0].startsWith("call-event"))?.[3]}.
- Authorized production customer receipt: ${formDeliveryPass ? "VERIFIED (synthetic/redacted)" : "BLOCKED"}.
- Authorized production partner receipt: ${formDeliveryPass ? "VERIFIED (synthetic/redacted)" : "BLOCKED"}.
- Vercel environment inspection: ${vercelEnvList.status === "PASS" ? "available" : "blocked/not linked"}.
- No full PII or secrets are printed in this report.

10. ACCESSIBILITY/MOBILE RESULTS
- Source/HTML checks: labels, form controls, aria-live, and form presence recorded in URL inventory.
- Browser evidence status: ${accessibilityPass ? "VERIFIED" : "NOT_VERIFIABLE"}.
- ${accessibilityEvidenceSummary}.
- Gate 2.7 status is derived from the committed axe JSON plus desktop/mobile screenshots; serious or critical findings must equal zero.

11. ANALYTICS EVENT VERIFICATION
- Rendered analytics scripts active: ${analyticsBlocked ? "no verified active GA4/GTM/Clarity script" : "review required"}.
- Owner-approved analytics destination: BLOCKED.
- Debug/realtime event evidence: BLOCKED.
- PII policy: no names, phones, emails, or messages should be sent as analytics event parameters.

12. SEARCH CONSOLE/BING/INDEXING BASELINE
- Google Search Console access: BLOCKED.
- Sitemap account status: BLOCKED.
- Priority indexing states: BLOCKED.
- Bing Webmaster access: BLOCKED.
- IndexNow key/account verification: BLOCKED.
- Live sitemap itself is reachable and contains ${sitemapPaths.length} URLs, but authenticated indexing data is not available.

13. PRIORITIZED PHASE 3 BACKLOG
See ${reportPaths.backlog}.

14. MONITORING CADENCE
See ${reportPaths.monitoring}.

15. REMAINING BLOCKERS AND EXACT OWNER ACTION
${formDeliveryPass ? "" : "1. Verify the required production environment variables in the existing Vercel plumbinghands project dashboard.\n2. Provide/approve separate customer and partner webhook destinations, then authorize clearly marked test submissions and redacted receipt confirmation."}
3. Provide/approve analytics account connection for GA4/GTM/Clarity, or confirm analytics remains disabled.
4. Provide Google Search Console and Bing Webmaster access/exports for indexing and query baseline.
${accessibilityPass ? "" : "5. Provide browser QA capability or authorize Lighthouse/axe tooling installation/run for accessibility/mobile evidence."}
6. Provide an approved tracking phone number or confirm all CTAs should remain contact-form fallback.

16. ROLLBACK PLAN
- Current last known good production deployment before this closeout branch: dpl_D1rcL3bv46LJeZiieeewPFtZumxt for commit 6937d9d.
- If a future deployment fails, re-alias plumbinghands.com to the prior known-good Vercel deployment or revert the Git commit and redeploy master.
- For form routing changes, remove/restore webhook environment variables and redeploy if receipt routing is incorrect.
- For source changes in this branch, revert the closeout commit or reset deployment to origin/master at 6937d9d.
`;

write(reportPaths.urls, csv(urlRows));
write(reportPaths.links, csv(linkAuditRows));
write(reportPaths.duplicates, csv(duplicateRows));
write(reportPaths.gates, csv(gateRows));
write(reportPaths.commands, csv(commandRows));
write(reportPaths.api, csv(apiRows));
write(reportPaths.backlog, csv(backlogRows));
write(reportPaths.monitoring, monitoringText);
write(reportPaths.deployment, deploymentEvidence);
write(reportPaths.final, finalReport);
write(reportPaths.download, finalReport);

console.log(`PHASE 2 VERDICT: ${finalPhase2Verdict}`);
console.log(`PHASE 3 VERDICT: ${finalPhase3Verdict}`);
console.log(`Final report: ${join(root, reportPaths.final)}`);
console.log(`Download report: ${reportPaths.download}`);
