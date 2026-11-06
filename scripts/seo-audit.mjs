#!/usr/bin/env node
// SEO + internal-link audit of the LIVE site. No AI, no tokens, no dependencies (Node 20+).
// Run weekly by .github/workflows/seo-audit.yml; writes a markdown report that Claude's
// weekly review turns into tasks. Usage:
//   node scripts/seo-audit.mjs --site https://example.com --phone "844-397-8298" --out report.md [--eslint eslint.json] [--max 700]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
};
const SITE = new URL(arg("site")).origin;
const PHONE_DIGITS = (arg("phone", "") || "").replace(/\D/g, "");
const OUT = arg("out", "seo-audit.md");
const ESLINT = arg("eslint", "");
const MAX = Number(arg("max", "700"));
const UA = "Mozilla/5.0 (compatible; DSH-SEO-Audit/1.0; +" + SITE + ")";
const HOSTS = new Set([new URL(SITE).host, new URL(SITE).host.replace(/^www\./, ""), "www." + new URL(SITE).host.replace(/^www\./, "")]);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'")
   .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const norm = (u) => {
  try {
    const x = new URL(u, SITE);
    if (!HOSTS.has(x.host)) return null;
    let p = x.pathname.replace(/\/+$/, "") || "/";
    return p;
  } catch { return null; }
};

async function get(url, manual = true) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 25000);
      const r = await fetch(url, { redirect: manual ? "manual" : "follow", headers: { "user-agent": UA }, signal: ctl.signal });
      clearTimeout(t);
      const body = r.status >= 200 && r.status < 300 ? await r.text() : "";
      return { status: r.status, location: r.headers.get("location"), body };
    } catch (e) {
      if (attempt === 2) return { status: 0, error: String(e.message || e), body: "" };
      await new Promise((res) => setTimeout(res, 1500 * (attempt + 1)));
    }
  }
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); }
  }));
  return out;
}

async function sitemapUrls() {
  const seen = new Set(), urls = [];
  const queue = [SITE + "/sitemap.xml"];
  while (queue.length) {
    const sm = queue.shift();
    if (seen.has(sm)) continue;
    seen.add(sm);
    const r = await get(sm, false);
    const locs = [...(r.body || "").matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => decode(m[1]));
    if (/<sitemapindex/i.test(r.body || "")) queue.push(...locs);
    else urls.push(...locs);
  }
  return [...new Set(urls)];
}

function parse(html) {
  const head = html.split(/<\/head>/i)[0] || html;
  const title = decode((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const metaTag = head.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0] || "";
  const desc = decode((metaTag.match(/content=["']([^"']*)["']/i) || [])[1] || "");
  const canonTag = head.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] || "";
  const canonical = (canonTag.match(/href=["']([^"']+)["']/i) || [])[1] || "";
  const robots = (head.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i) || [])[1] || "";
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const links = [...body.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ to: norm(m[1]), text: decode(m[2].replace(/<[^>]+>/g, " ")).slice(0, 80) }))
    .filter((l) => l.to);
  return { title, desc, canonical, robots, h1, links, text: body };
}

const t0 = Date.now();
const all = await sitemapUrls();
const urls = all.slice(0, MAX);
const pages = await pool(urls, 8, async (u) => {
  const r = await get(u, true);
  const p = { url: u, path: norm(u) || u, status: r.status, location: r.location, error: r.error };
  if (r.status === 200) Object.assign(p, parse(r.body));
  return p;
});
const ok = pages.filter((p) => p.status === 200);

// ---- page checks
const issues = { status: [], noindex: [], h1: [], noTitle: [], noDesc: [], dupTitle: [], dupDesc: [], longTitle: [], shortTitle: [], longDesc: [], shortDesc: [], canonical: [] };
const byTitle = new Map(), byDesc = new Map();
for (const p of pages) {
  if (p.status !== 200) { issues.status.push(`${p.url} - HTTP ${p.status || p.error}${p.location ? " -> " + p.location : ""}`); continue; }
  if (/noindex/i.test(p.robots)) issues.noindex.push(`${p.url} - robots "${p.robots}" but listed in the sitemap`);
  if (p.h1 !== 1) issues.h1.push(`${p.url} - ${p.h1} <h1> tags`);
  if (!p.title) issues.noTitle.push(p.url);
  else {
    (byTitle.get(p.title) || byTitle.set(p.title, []).get(p.title)).push(p.url);
    if (p.title.length > 60) issues.longTitle.push(`${p.url} - ${p.title.length} chars: "${p.title}"`);
    if (p.title.length < 25) issues.shortTitle.push(`${p.url} - ${p.title.length} chars: "${p.title}"`);
  }
  if (!p.desc) issues.noDesc.push(p.url);
  else {
    (byDesc.get(p.desc) || byDesc.set(p.desc, []).get(p.desc)).push(p.url);
    if (p.desc.length > 160) issues.longDesc.push(`${p.url} - ${p.desc.length} chars`);
    if (p.desc.length < 70) issues.shortDesc.push(`${p.url} - ${p.desc.length} chars: "${p.desc}"`);
  }
  const c = p.canonical ? norm(p.canonical) : null;
  if (!p.canonical) issues.canonical.push(`${p.url} - no canonical tag`);
  else if (c !== p.path) issues.canonical.push(`${p.url} - canonical points to ${p.canonical}`);
}
for (const [t, us] of byTitle) if (us.length > 1) issues.dupTitle.push(`"${t}" on ${us.length} pages: ${us.slice(0, 4).join(", ")}${us.length > 4 ? " ..." : ""}`);
for (const [d, us] of byDesc) if (us.length > 1) issues.dupDesc.push(`"${d.slice(0, 70)}..." on ${us.length} pages: ${us.slice(0, 4).join(", ")}${us.length > 4 ? " ..." : ""}`);
const home = pages.find((p) => p.path === "/");
const phoneOnHome = !PHONE_DIGITS || (home?.text || "").replace(/\D/g, "").includes(PHONE_DIGITS.slice(-10));

// ---- internal link graph (in-content links = links that are NOT on most pages, i.e. not header/footer/nav)
const linkPages = new Map(); // target -> Set(source)
for (const p of ok) for (const l of new Set(p.links.map((x) => x.to))) {
  if (!linkPages.has(l)) linkPages.set(l, new Set());
  linkPages.get(l).add(p.path);
}
const boiler = new Set([...linkPages].filter(([, s]) => s.size > ok.length * 0.8).map(([t]) => t));
const inbound = new Map(ok.map((p) => [p.path, new Set()]));
for (const p of ok) for (const l of p.links) if (!boiler.has(l.to) && l.to !== p.path && inbound.has(l.to)) inbound.get(l.to).add(p.path);
const pagePaths = new Set(ok.map((p) => p.path));
// Pages linked from the header/footer on most pages (hubs like /services) are well linked: not orphans.
const orphans = ok.filter((p) => p.path !== "/" && !boiler.has(p.path) && inbound.get(p.path).size === 0);
const weak = ok.filter((p) => p.path !== "/" && !boiler.has(p.path) && inbound.get(p.path).size === 1);

// broken internal links: targets not in the crawl
const extra = [...linkPages.keys()].filter((t) => !pagePaths.has(t) && !/\.(png|jpe?g|webp|svg|gif|pdf|xml|txt|ico)$/i.test(t)).slice(0, 250);
const extraStatus = await pool(extra, 8, async (t) => ({ t, ...(await get(SITE + t, false)) }));
const broken = extraStatus.filter((x) => x.status !== 200).map((x) => `${x.t} - HTTP ${x.status || x.error} - linked from ${[...linkPages.get(x.t)].slice(0, 3).join(", ")}`);

// link suggestions for weak/orphan pages: related pages share path words (service or city), don't link yet
const words = (path) => new Set(path.split(/[\/-]/).filter((w) => w.length > 2 && !["the", "and", "for", "cities", "services", "guides", "blog", "problems", "cost"].includes(w)));
const anchor = (p) => (p.title.split(/\s[|–-]\s/)[0] || p.title).replace(/\s*\(.*?\)\s*/g, " ").trim().slice(0, 60);
const targets = [...orphans, ...weak]
  .sort((a, b) => (/\/cities\/[^/]+\/[^/]+|\/services\/|\/guides\/|\/problems\//.test(b.path) ? 1 : 0) - (/\/cities\/[^/]+\/[^/]+|\/services\/|\/guides\/|\/problems\//.test(a.path) ? 1 : 0))
  .slice(0, 15);
const suggestions = [];
for (const t of targets) {
  const tw = words(t.path);
  const cands = ok
    .filter((s) => s.path !== t.path && !inbound.get(t.path).has(s.path))
    .map((s) => ({ s, score: [...words(s.path)].filter((w) => tw.has(w)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || inbound.get(b.s.path).size - inbound.get(a.s.path).size)
    .slice(0, 2);
  for (const { s } of cands) suggestions.push(`| ${t.path} (${inbound.get(t.path).size} in) | ${s.path} | ${anchor(t)} |`);
}

// ---- lint (optional eslint -f json output)
let lint = "not run";
let lintTop = [];
if (ESLINT && existsSync(ESLINT)) {
  try {
    const res = JSON.parse(readFileSync(ESLINT, "utf8"));
    const e = res.reduce((a, r) => a + r.errorCount, 0), w = res.reduce((a, r) => a + r.warningCount, 0);
    lint = `${e + w} problems (${e} errors, ${w} warnings)`;
    lintTop = res.filter((r) => r.errorCount + r.warningCount).sort((a, b) => b.errorCount + b.warningCount - a.errorCount - a.warningCount)
      .slice(0, 5).map((r) => `${r.errorCount + r.warningCount} - ${r.filePath.replace(process.cwd() + "/", "")}`);
  } catch (e) { lint = "eslint output unreadable: " + e.message; }
}

// ---- report
const date = new Date().toISOString().slice(0, 10);
const list = (arr, n = 25) => (arr.length ? arr.slice(0, n).map((x) => `- ${x}`).join("\n") + (arr.length > n ? `\n- ... and ${arr.length - n} more` : "") : "- none");
const priority = [
  ...issues.status.map((x) => `Fix or remove from sitemap: ${x}`),
  ...broken.map((x) => `Broken internal link: ${x}`),
  ...issues.noindex.map((x) => `Noindex page in sitemap: ${x}`),
  ...issues.h1.map((x) => `H1 count: ${x}`),
  ...issues.noTitle.map((x) => `Missing title: ${x}`),
  ...issues.noDesc.map((x) => `Missing meta description: ${x}`),
  ...issues.canonical.map((x) => `Canonical: ${x}`),
  ...issues.dupTitle.map((x) => `Duplicate title: ${x}`),
  ...issues.dupDesc.map((x) => `Duplicate meta description: ${x}`),
  ...orphans.slice(0, 5).map((p) => `Orphan page (no in-content links): ${p.url}`),
  ...issues.longTitle.map((x) => `Title too long: ${x}`),
].slice(0, 10);

const md = `# SEO-AUDIT - ${date}
Status: DONE
Model: none (scripts/seo-audit.mjs, no AI)

| Check | Result |
|---|---|
| Sitemap URLs | ${all.length}${all.length > MAX ? ` (checked first ${MAX})` : ""} |
| Pages returning 200 | ${ok.length} / ${pages.length} |
| Phone on home page | ${phoneOnHome ? "yes" : "NO"} |
| Lint | ${lint} |
| Missing title / meta description | ${issues.noTitle.length} / ${issues.noDesc.length} |
| Duplicate titles / meta descriptions | ${issues.dupTitle.length} / ${issues.dupDesc.length} |
| Titles over 60 chars / under 25 | ${issues.longTitle.length} / ${issues.shortTitle.length} |
| Meta over 160 chars / under 70 | ${issues.longDesc.length} / ${issues.shortDesc.length} |
| Pages without exactly one H1 | ${issues.h1.length} |
| Canonical problems | ${issues.canonical.length} |
| Noindex pages in sitemap | ${issues.noindex.length} |
| Broken internal links | ${broken.length} |
| Orphan pages (0 in-content links) / weak (1) | ${orphans.length} / ${weak.length} |
| Run time | ${Math.round((Date.now() - t0) / 1000)}s |

## Top 10 fixes
${priority.length ? priority.map((x, i) => `${i + 1}. ${x}`).join("\n") : "Nothing urgent."}

## Lint: files with the most problems
${list(lintTop, 5)}

## Status errors
${list(issues.status)}

## Broken internal links
${list(broken)}

## H1 problems
${list(issues.h1)}

## Missing / duplicate titles and descriptions
${list([...issues.noTitle.map((u) => "no title: " + u), ...issues.noDesc.map((u) => "no meta description: " + u), ...issues.dupTitle, ...issues.dupDesc])}

## Canonical and noindex
${list([...issues.canonical, ...issues.noindex])}

## Length warnings
${list([...issues.longTitle, ...issues.shortTitle, ...issues.longDesc, ...issues.shortDesc], 30)}

## Internal links: orphan and weak pages
${list([...orphans.map((p) => "orphan: " + p.url), ...weak.map((p) => "1 link in: " + p.url)], 30)}

## Internal-link suggestions (verify before tasking; the script matches pages by shared service/city words)
| Target page (in-content links in) | Add a link from | Suggested anchor |
|---|---|---|
${suggestions.join("\n") || "| none | | |"}
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, md);
console.log(`Wrote ${OUT}: ${ok.length}/${pages.length} pages ok, ${priority.length} top fixes, ${Math.round((Date.now() - t0) / 1000)}s`);
