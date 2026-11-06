#!/usr/bin/env node
// Backlink Scout tool for the DSH app agent (Node 20+, no AI, no keys, no dependencies).
// Searches the web for free local listing / resource pages, then keeps only pages that load,
// stay on their own site, are about our area and trade, and don't already link to us.
// The DSH agent then checks every row by hand. Research only: it never submits anything.
// Usage (PowerShell):
//   node scripts/backlink-scout.mjs --site https://example.com --niche "plumbing" --word plumb --cities "Dallas,Plano"
import { existsSync, readFileSync, writeFileSync, appendFileSync, mkdirSync } from "node:fs";

const arg = (n, d = "") => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };
const SITE = arg("site").replace(/\/+$/, "");
const DOMAIN = new URL(SITE).host.replace(/^www\./, "");
const NICHE = arg("niche", "home services");
const WORD = arg("word", "").toLowerCase();
const CITIES = arg("cities", "Dallas").split(",").map((c) => c.trim()).filter(Boolean);
const TODAY = new Date().toISOString().slice(0, 10);
const REPORT = `docs/dsh/reports/${TODAY}-BACKLINKS.md`;
const LOG = "docs/dsh/backlinks-log.md";
const UA = { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36" };
const SKIP = ["facebook.", "instagram.", "twitter.", "x.com", "linkedin.", "youtube.", "tiktok.", "pinterest.", "yelp.", "angi.",
  "homeadvisor.", "thumbtack.", "google.", "bing.", "duckduckgo.", "wikipedia.", "reddit.", "amazon.", "nextdoor.", "porch.", "houzz.", DOMAIN];
const notes = [];

async function get(url, ms = 20000) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { headers: UA, redirect: "follow", signal: ctl.signal });
    return { status: r.status, url: r.url, body: (await r.text()).slice(0, 600000) };
  } catch (e) { return { status: 0, url, body: "", error: String(e.message || e) }; } finally { clearTimeout(t); }
}

async function search(q) {
  const out = new Set();
  for (const base of ["https://html.duckduckgo.com/html/?q=", "https://lite.duckduckgo.com/lite/?q="]) {
    const r = await get(base + encodeURIComponent(q));
    for (const m of r.body.matchAll(/uddg=([^&"']+)/g)) out.add(decodeURIComponent(m[1]));
    for (const m of r.body.matchAll(/class=["']result-link["'][^>]*href=["'](https?:[^"']+)/g)) out.add(m[1]);
    if (out.size) break;
    notes.push(`search empty (${base.split("/")[2]}, HTTP ${r.status || r.error})`);
  }
  return [...out].slice(0, 10);
}

const host = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return ""; } };
const logged = existsSync(LOG) ? new Set([...readFileSync(LOG, "utf8").matchAll(/https?:\/\/[^\s|]+/g)].map((m) => host(m[0]))) : new Set();
const week = Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / 6048e5);
const cities = CITIES.length > 1 ? [0, 1].map((i) => CITIES[(week * 2 + i) % CITIES.length]) : CITIES;
const themes = [
  "{city} Texas business directory add your business free",
  "{city} chamber of commerce member directory {niche}",
  "Texas {niche} contractors association directory",
  "{city} Texas homeowner resources useful links {niche}",
  "{city} TX community resources home repair links",
];

const candidates = [];
for (const city of cities) for (const t of themes) {
  const q = t.replace("{city}", city).replace("{niche}", NICHE);
  for (const u of await search(q)) candidates.push({ url: u, city });
}

const verified = [], seen = new Set();
const LISTING = /add (your|a) (business|listing|company)|submit (your |a )?(business|listing|site|link|resource)|list your business|get listed|claim your (business|listing)|business directory|member directory|find a member|useful links|community resources|resource links/;
for (const c of candidates) {
  if (verified.length >= 15) break;
  const asked = host(c.url);
  if (!asked || seen.has(asked) || logged.has(asked) || SKIP.some((s) => asked.includes(s))) continue;
  seen.add(asked);
  const r = await get(c.url);
  if (r.status !== 200 || host(r.url) !== asked) continue; // dead, blocked, or redirected to another site
  const low = r.body.toLowerCase();
  if (low.includes(DOMAIN)) continue; // already links to (or mentions) us
  const local = low.includes(c.city.toLowerCase()) || low.includes("texas");
  const listing = low.match(LISTING);
  if (!local || !(listing || (WORD && low.includes(WORD)))) continue;
  let start = "";
  for (const m of r.body.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (/add (your|a) (business|listing)|submit|list your business|get listed|claim|join|membership|directory|resources/i.test(label)) {
      try { start = `${label.slice(0, 40)} -> ${new URL(m[1], r.url).href.slice(0, 120)}`; } catch {}
      break;
    }
  }
  const title = ((r.body.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || asked).replace(/\s+/g, " ").trim().slice(0, 70);
  verified.push({ site: title.replace(/\|/g, "/"), url: r.url, how: (start || `page mentions: ${listing ? listing[0] : WORD}`).replace(/\|/g, "/"), why: `${c.city}${listing ? " / listing page" : " / on topic"}` });
}

const home = await get(SITE);
const desc = ((home.body.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)/i) || [])[1] || "").split(/\s+/).slice(0, 60).join(" ");
mkdirSync("docs/dsh/reports", { recursive: true });
const rows = verified.map((v, i) => `| ${i + 1} | ${v.site} | ${v.url} | check | ${v.how} | ${v.why} |`).join("\n");
writeFileSync(REPORT, `# BACKLINKS - ${TODAY}
Status: ${verified.length ? "DONE" : "BLOCKED"}
Model: none (scripts/backlink-scout.mjs: web search + page checks); rows checked by the DSH agent below
Cities this week: ${cities.join(", ")} | candidates: ${candidates.length} | passed the page checks: ${verified.length}

Research only. Nothing was submitted. Claude checks each one; Sunny places approved links himself.

| # | Site | Page where the link would go | Free? | How to get listed | Why relevant |
|---|---|---|---|---|---|
${rows || "| - | none passed the checks this week | | | | |"}

## Ready-to-paste business description (from our home page)
${desc || "(home page description not found)"}

## Notes
${[...new Set(notes)].join("; ") || "none"}
`);
if (verified.length) {
  if (!existsSync(LOG)) writeFileSync(LOG, "# Backlink log\nOne line per opportunity the Backlink Scout proposed: date | site | page | status.\n");
  appendFileSync(LOG, verified.map((v) => `${TODAY} | ${v.site} | ${v.url} | proposed\n`).join(""));
}
console.log(`Backlink Scout: ${verified.length} passed of ${candidates.length} candidates -> ${REPORT}`);
