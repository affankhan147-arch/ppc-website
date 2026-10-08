// Task208 (2026-10-08): one-off relink. /cost-guides/emergency-plumbing-cost-dfw is being
// 301'd into /guides/dfw-emergency-plumbing-costs (the two pages split the same
// "emergency plumber cost" queries in GSC). Rewrites internal hrefs byte-for-byte
// (no line-ending changes) so links point straight at the surviving page.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const FROM = 'href: "/cost-guides/emergency-plumbing-cost-dfw"';
const TO = 'href: "/guides/dfw-emergency-plumbing-costs"';
const roots = ["src"];
let files = 0;
let hits = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(name)) {
      const buf = readFileSync(p);
      const text = buf.toString("utf8");
      if (!text.includes(FROM)) continue;
      const n = text.split(FROM).length - 1;
      writeFileSync(p, Buffer.from(text.split(FROM).join(TO), "utf8"));
      files += 1;
      hits += n;
      console.log(`${n}\t${p}`);
    }
  }
}

roots.forEach(walk);
console.log(`TOTAL ${hits} replacements in ${files} files`);
