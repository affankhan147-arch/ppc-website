import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, renameSync } from "fs";
import { join, extname } from "path";

const ROOT = join(process.cwd(), "public", "images");
const MIN_BYTES = 80 * 1024;
const MAX_WIDTH = 1920;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push({ path: full, size: st.size });
  }
  return out;
}

const files = walk(ROOT).filter((f) => {
  const ext = extname(f.path).toLowerCase();
  return (ext === ".jpg" || ext === ".jpeg" || ext === ".png") && f.size >= MIN_BYTES;
});

let totalBefore = 0;
let totalAfter = 0;
const report = [];

for (const f of files) {
  try {
    const ext = extname(f.path).toLowerCase();
    const meta = await sharp(f.path).metadata();
    let pipeline = sharp(f.path);
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    let outBuffer;
    if (ext === ".png") {
      outBuffer = await pipeline.png({ quality: 75, compressionLevel: 9, palette: true }).toBuffer();
    } else {
      outBuffer = await pipeline.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
    }
    if (outBuffer.length < f.size) {
      const tmpPath = f.path + ".tmp";
      writeFileSync(tmpPath, outBuffer);
      renameSync(tmpPath, f.path);
      totalBefore += f.size;
      totalAfter += outBuffer.length;
      report.push(f.path.replace(process.cwd(), "") + " : " + (f.size / 1024).toFixed(1) + "KB -> " + (outBuffer.length / 1024).toFixed(1) + "KB");
    } else {
      report.push(f.path.replace(process.cwd(), "") + " : SKIPPED (already optimal, " + (f.size / 1024).toFixed(1) + "KB)");
    }
  } catch (err) {
    report.push(f.path.replace(process.cwd(), "") + " : ERROR - " + err.message);
  }
}

report.push("");
report.push("TOTAL: " + (totalBefore / 1024).toFixed(1) + "KB -> " + (totalAfter / 1024).toFixed(1) + "KB (saved " + ((totalBefore - totalAfter) / 1024).toFixed(1) + "KB)");

console.log(report.join("\n"));
