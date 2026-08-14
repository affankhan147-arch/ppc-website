import sharp from "sharp";
import { writeFileSync, renameSync, readFileSync } from "fs";
import { join } from "path";

const files = [
  "public/images/photography/home-emergency-plumber.png",
  "public/images/photography/homeowner-consultation.png",
  "public/images/photography/plumbing-diagnostic.png"
];

for (const rel of files) {
  const full = join(process.cwd(), rel);
  console.log("--- " + rel + " ---");
  try {
    const buf = readFileSync(full);
    console.log("raw bytes:", buf.length);
    const img = sharp(buf, { failOn: "none", unlimited: true });
    const meta = await img.metadata();
    console.log("metadata OK:", JSON.stringify(meta));
    const out = await sharp(buf, { failOn: "none", unlimited: true })
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    console.log("re-encoded JPEG bytes:", out.length);
    const outPath = full.replace(/\.png$/, ".jpg");
    const tmp = outPath + ".tmp";
    writeFileSync(tmp, out);
    renameSync(tmp, outPath);
    console.log("WROTE:", outPath);
  } catch (err) {
    console.log("STILL FAILING:", err.message);
  }
}
