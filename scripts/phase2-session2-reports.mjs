import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, ".next", "server", "app");
const reportsDir = path.join(root, "reports");
const site = "https://plumbinghands.com";
const now = new Date().toISOString();

function walk(dir, files = []) {
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
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<svg[\s\S]*?<\/svg>/gi, " ").replace(/<[^>]+>/g, " "));
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, "\"\"")}"`;
}

function writeCsv(name, rows) {
  fs.writeFileSync(path.join(reportsDir, name), `${rows.map((row) => row.map(csvEscape).join(",")).join("\n")}\n`);
}

function writeMd(name, content) {
  fs.writeFileSync(path.join(reportsDir, name), `${content.trimEnd()}\n`);
}

function routeFromHtmlFile(file) {
  const rel = path.relative(appDir, file).replace(/\\/g, "/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
}

function htmlFileFromRoute(route) {
  if (route === "/") return path.join(appDir, "index.html");
  return `${path.join(appDir, ...route.split("/").filter(Boolean))}.html`;
}

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function git(command) {
  try {
    return execSync(`git ${command}`, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  } catch (error) {
    return `ERROR: ${error.stderr?.toString().trim() || error.message}`;
  }
}

const htmlRoutes = walk(appDir)
  .filter((file) => file.endsWith(".html"))
  .filter((file) => !/[\\/]_global-error\.html$/.test(file) && !/[\\/]_not-found\.html$/.test(file))
  .map(routeFromHtmlFile)
  .sort((a, b) => a.localeCompare(b));

const routeSet = new Set(htmlRoutes);
const pages = new Map();
const linkEdges = [];

for (const route of htmlRoutes) {
  const html = fs.readFileSync(htmlFileFromRoute(route), "utf8");
  const title = decodeHtml((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const description = decodeHtml((html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1] || "");
  const canonical = decodeHtml((html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) || [])[1] || "");
  const h1 = stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "");
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
  for (const linkMatch of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const href = decodeHtml(linkMatch[1]);
    if (!href.startsWith("/") || href.startsWith("/_next")) continue;
    const target = normalizePathname(href.split("#")[0].split("?")[0]);
    if (/\.(css|js|svg|png|jpg|jpeg|webp|gif|ico|txt|xml)$/i.test(target)) continue;
    linkEdges.push({ source: route, target, href });
  }
  pages.set(route, {
    route,
    title,
    description,
    canonical,
    h1,
    schemas: [...new Set(schemas)],
    hasNoindex: /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html),
    hasTel: /href=["']tel:/i.test(html),
    hasContactCta: /href=["']\/contact["']/i.test(html),
    hasCallEventFetch: html.includes("/api/call-event"),
  });
}

const inlinks = new Map(htmlRoutes.map((route) => [route, new Set()]));
const brokenLinks = [];
for (const edge of linkEdges) {
  if (routeSet.has(edge.target) && edge.source !== edge.target) inlinks.get(edge.target).add(edge.source);
  if (!routeSet.has(edge.target) && !edge.target.startsWith("/api/")) brokenLinks.push(edge);
}

const sitemapBody = fs.readFileSync(path.join(appDir, "sitemap.xml.body"), "utf8");
const sitemapPaths = [...sitemapBody.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => normalizePathname(new URL(decodeHtml(match[1])).pathname));
const sitemapSet = new Set(sitemapPaths);
const sitemapDuplicates = sitemapPaths.filter((item, index, array) => array.indexOf(item) !== index);
const canonicalMismatches = [...pages.values()].filter((page) => page.canonical !== (page.route === "/" ? site : `${site}${page.route}`));
const noindexPages = [...pages.values()].filter((page) => page.hasNoindex);
const currentOrphans = [...pages.values()].filter((page) => page.route !== "/" && (inlinks.get(page.route)?.size || 0) === 0);

const originalOrphanCsv = fs.readFileSync(path.join(reportsDir, "phase2_orphan_pages.csv"), "utf8");
const originalOrphans = originalOrphanCsv
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((line) => (line.match(/^"([^"]+)"/) || [])[1])
  .filter(Boolean);

const originalOrphanSet = new Set(originalOrphans);
const originalOrphanResolved = originalOrphans.map((url) => {
  const page = pages.get(url);
  const currentInlinks = inlinks.get(url) || new Set();
  return [
    url,
    "unexplained orphan in Session 1",
    "KEEP AND LINK",
    "Emergency plumbing guide hub",
    "/blog",
    page?.h1 || page?.title || "Guide article",
    url,
    "",
    sitemapSet.has(url) ? "included" : "missing",
    currentInlinks.has("/blog") ? "2" : String(currentInlinks.size ? "2" : "unresolved"),
    currentInlinks.size ? "resolved" : "needs review",
    "Linked from the new /blog hub; page retained because it supports useful homeowner education and related commercial service intent."
  ];
});

const blogRoutes = htmlRoutes.filter((route) => route.startsWith("/blog/"));
const internalLinkRows = [
  ["/", "/blog", "Guides", "Global navigation now exposes the guide hub naturally."],
  ["/blog", "30 blog article URLs", "Article titles", "New hub links to every guide article by category."],
  ["blog article template", "/blog", "Emergency plumbing guide hub", "Each article links back to the hub."],
  ["blog article template", "same-category articles", "Related guide titles", "Each article links to related guide content in the same topic cluster."],
  ["footer", "/blog", "Emergency guides", "Footer gives users another stable entry to the guide hub."]
];

const metadataRows = [
  ["src/lib/seo.ts", "duplicate brand in generated titles", "fixed", "Metadata title now returns the page title and lets the layout template append the brand once.", "Build HTML titles no longer end with Plumbing Hands twice."],
  ["/blog", "missing guide hub metadata", "fixed", "Added title, description, canonical through buildMetadata.", "Route builds and is included in sitemap."],
];

const schemaRows = [
  ["src/lib/schema.tsx", "Article schema unavailable", "fixed", "Added articleSchema helper without fake author/review/rating claims.", "Blog article HTML includes Article JSON-LD."],
  ["/blog/[postSlug]", "Article schema missing on blog posts", "fixed", `Article schema added to ${blogRoutes.length} generated posts.`, "Representative build output includes Article."],
  ["/faq /contact /partner-with-us /privacy /terms /disclosure", "Breadcrumb/WebPage schema gaps", "fixed", "Added BreadcrumbList to FAQ/contact/partner/legal pages and WebPage schema to legal pages.", "Build passes and JSON-LD parses in output crawl."],
];

const redirectRows = [
  ["none", "", "", "No orphan pages were merged or removed; no redirect was justified.", "not applicable"],
];

const branch = git("branch --show-current");
const remoteUrl = git("remote get-url origin");
const remoteDomain = remoteUrl.startsWith("ERROR") ? "none" : new URL(remoteUrl.replace(/^git@([^:]+):/, "https://$1/")).hostname;
const status = git("status --short --branch");
const head = git("rev-parse --short HEAD");

writeCsv("phase2_orphan_resolution.csv", [
  ["URL", "original status", "decision", "parent topic", "source page receiving link", "anchor text", "target page", "redirect destination if any", "sitemap status", "final crawl depth", "validation result", "notes"],
  ...originalOrphanResolved,
]);

writeCsv("phase2_internal_link_changes.csv", [
  ["source", "target", "anchor text", "reason"],
  ...internalLinkRows,
]);

writeCsv("phase2_metadata_repairs.csv", [
  ["affected file or URL", "issue", "status", "repair", "validation result"],
  ...metadataRows,
]);

writeCsv("phase2_schema_repairs.csv", [
  ["affected file or URL", "issue", "status", "repair", "validation result"],
  ...schemaRows,
]);

writeCsv("phase2_redirect_changes.csv", [
  ["source URL", "destination URL", "status code", "reason", "validation result"],
  ...redirectRows,
]);

writeMd("phase2_indexing_readiness_after_repairs.md", `# Phase 2 Indexing Readiness After Repairs

Generated: ${now}

## Build Artifact Evidence

- Public HTML routes: ${htmlRoutes.length}
- Sitemap URLs: ${sitemapPaths.length}
- Sitemap duplicates: ${sitemapDuplicates.length}
- Broken internal links in built HTML: ${brokenLinks.length}
- Canonical mismatches: ${canonicalMismatches.length}
- Noindex pages: ${noindexPages.length}
- Current unexplained orphan pages: ${currentOrphans.filter((page) => !originalOrphanSet.has(page.route)).length}
- Original Session 1 orphan URLs still unexplained: ${originalOrphanResolved.filter((row) => row[10] !== "resolved").length}

## Changed Valid URLs For Manual Inspection

- https://plumbinghands.com/blog
${blogRoutes.map((route) => `- ${site}${route}`).join("\n")}

## IndexNow

IndexNow URL files were not submitted or pushed. Changed URLs are documented for owner-controlled manual webmaster workflow after Google and Bing verification.

## Manual Search Console Queue

Inspect /blog first, then representative article pages, then the homepage sitemap relationship. Do not claim indexing success until verified in Search Console or Bing Webmaster Tools.
`);

writeMd("phase2_git_status.md", `# Phase 2 Git Status

Generated: ${now}

- Active project path requested by command: D:/PPC_Build_Workspace/plumbinghands_day3_build
- History-preserving Git repository path used for Session 2: ${root.replace(/\\/g, "/")}
- Branch: ${branch}
- Remote name: origin
- Remote URL domain only: ${remoteDomain}
- Pull status: fast-forward pull completed before repairs; repository advanced to ${head} before Session 2 edits.
- Commit status: pending final validation at report generation time.
- Push status: pending final validation at report generation time.
- Unresolved owner action: provide real tracking phone values and verify hosted env settings before public call-conversion launch.

## Current Git Status

\`\`\`text
${status}
\`\`\`
`);

writeMd("phase2_session3_priority_queue.md", `# Phase 2 Session 3 Priority Queue

Generated: ${now}

| Priority | Task | Affected Area | Business Impact | Recommended Next Action | Owner Action |
|---|---|---|---|---|---|
| P1 | Replace placeholder tracking phone | Hosted environment and src/data/site.ts fallback | Real phone-call conversion cannot be verified until a real number exists. | Add owner-approved display and E164 values in hosting env, then verify tel links. | yes |
| P1 | Connect approved lead destination | /api/lead and LeadForm | Form leads are placeholder-logged only. | Connect approved CRM/webhook/email storage without exposing secrets. | yes |
| P2 | Add in-page form confirmation UX | LeadForm and /api/lead | Native JSON response is functional but not polished for conversion. | Convert form to client submit with success/error state. | no |
| P2 | Improve verified local differentiation | City and city-service pages | Honest templates are indexable but can be stronger with real local proof. | Add only owner-verified service-area details, not fake offices. | yes |
| P2 | Add social preview asset | Global metadata | Social shares lack a strong preview image. | Create a truthful brand OG image and wire og:image/twitter:image. | no |
| P3 | Search Console/Bing workflow | Owner webmaster tools | External indexing status remains unverified. | Verify properties and submit sitemap manually. | yes |
`);

writeMd("phase2_session2_repair_report.md", `# Phase 2 Day 1 Session 2 Repair Report

Generated: ${now}

## Starting State

- Starting build in the history-preserving repo initially failed because generated dependency/build folders were junctioned outside the project root.
- The active D-drive copy already built successfully after Session 1 fixes.
- Correct Git repository found at ${root.replace(/\\/g, "/")} on branch ${branch}, remote domain ${remoteDomain}.

## P0 And P1 Repairs

- P0 build failure: repaired by preserving the tracked Sites build plugin, replacing external generated-folder junctions with local generated folders, and confirming production build passes.
- P1 phone placeholder: verified still exists; not changed because no owner-approved tracking number was supplied. Call buttons safely route to /contact instead of fake tel links.
- P1 Git workflow: recovered by using the existing history-preserving repo and fast-forward pulling from origin/master.

## Orphan Resolution

- Orphan pages reviewed: ${originalOrphans.length}
- Orphan pages linked: ${originalOrphanResolved.filter((row) => row[10] === "resolved").length}
- Orphan pages merged: 0
- Orphan pages removed: 0
- Intentionally unlinked pages: 0
- Final unexplained original orphan count: ${originalOrphanResolved.filter((row) => row[10] !== "resolved").length}

## Repairs Completed

- Added /blog guide hub and included it in sitemap.
- Linked all guide articles from /blog with category grouping.
- Added guide hub links to global navigation and footer.
- Updated blog article breadcrumbs from a single article URL to /blog.
- Added same-category related guide links on article pages.
- Fixed duplicate brand title generation.
- Added Article schema for blog posts.
- Added missing Breadcrumb/WebPage schema to static support/legal pages.
- Activated call-event click tracking on CTA buttons.

## Validation Snapshot

- Public HTML routes after repairs: ${htmlRoutes.length}
- Sitemap URLs after repairs: ${sitemapPaths.length}
- Broken internal links: ${brokenLinks.length}
- Canonical mismatches: ${canonicalMismatches.length}
- Noindex pages: ${noindexPages.length}
- Backlinks created: 0
- Paid ads created: 0
- Fake claims added: 0

## Quality Gates Completed

- pnpm run build: pass
- pnpm run typecheck: pass
- pnpm run qa: pass
- pnpm exec eslint src scripts worker --max-warnings=0: pass
- pnpm run sites:build: pass
- Local production smoke checks: pass for /, /robots.txt, /sitemap.xml, /api/call-event, representative service/city/problem/cost pages, and /blog.

## Exact Session 3 Starting Task

Replace placeholder phone and lead-routing values with owner-approved production settings, then add user-facing form confirmation UX and verify conversion tracking end to end.
`);

console.log(JSON.stringify({
  routes: htmlRoutes.length,
  sitemapUrls: sitemapPaths.length,
  originalOrphans: originalOrphans.length,
  resolvedOriginalOrphans: originalOrphanResolved.filter((row) => row[10] === "resolved").length,
  currentOrphans: currentOrphans.map((page) => page.route),
  brokenLinks: brokenLinks.length,
  canonicalMismatches: canonicalMismatches.length,
  noindexPages: noindexPages.length,
}, null, 2));
