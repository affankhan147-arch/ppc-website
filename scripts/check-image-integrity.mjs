#!/usr/bin/env node
// Image integrity guard: fails if any image in public/ is empty, undecodable, or shows the
// "black band" corruption (large solid-black horizontal strip) that slipped into 3 photos in Aug 2026.
// Usage: node scripts/check-image-integrity.mjs   (exit 1 when something is broken)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const PUBLIC = path.resolve("public");
// Real photos that are intentionally dark (verified by eye) - not corruption.
const ALLOW = new Set(["images/citypages/burst-pipe-emergency/grapevine.jpg"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(jpe?g|png|webp|avif|svg)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const problems = [];
for (const file of walk(PUBLIC)) {
  const rel = path.relative(PUBLIC, file).replace(/\\/g, "/");
  const size = fs.statSync(file).size;
  if (size < 100) { problems.push(`${rel}: only ${size} bytes`); continue; }
  try {
    if (/\.svg$/i.test(file)) {
      const text = fs.readFileSync(file, "utf8");
      if (!/<svg[\s>]/i.test(text)) { problems.push(`${rel}: no <svg> root`); continue; }
      await sharp(Buffer.from(text)).png().toBuffer();
      continue;
    }
    await sharp(file, { failOn: "warning" }).raw().toBuffer();
    if (ALLOW.has(rel)) continue;
    const W = 64, H = 64;
    const px = await sharp(file).resize(W, H, { fit: "fill" }).greyscale().raw().toBuffer();
    let run = 0, longest = 0;
    for (let y = 0; y < H; y++) {
      let s = 0;
      for (let x = 0; x < W; x++) s += px[y * W + x];
      if (s / W < 4) { run++; longest = Math.max(longest, run); } else run = 0;
    }
    if (longest / H >= 0.2) problems.push(`${rel}: solid black band covering ${Math.round((longest / H) * 100)}% of height (likely corrupted)`);
  } catch (err) {
    problems.push(`${rel}: ${String(err.message).slice(0, 80)}`);
  }
}

if (problems.length) {
  console.error(`Image integrity check FAILED (${problems.length}):`);
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}
console.log("Image integrity check passed.");
