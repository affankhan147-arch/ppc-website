import fs from "fs";
import path from "path";

const csv = fs.readFileSync("scripts/image-manifest.csv", "utf8").trim().split(/\r?\n/);
const header = csv.shift();
const rows = csv.map((line) => {
  const [id, outfile] = line.split(",");
  return { id: id.trim(), outfile: outfile.trim() };
});

const bySvc = {};
for (const r of rows) {
  // outfile: public/images/citypages/<service>/<city>.jpg
  const parts = r.outfile.split("/");
  const service = parts[3];
  const city = parts[4].replace(/\.jpg$/, "");
  if (!bySvc[service]) bySvc[service] = {};
  bySvc[service][city] = `/images/citypages/${service}/${city}.jpg`;
}

const services = Object.keys(bySvc);
let out = "// AUTO-GENERATED from scripts/image-manifest.csv by scripts/gen-city-service-images.mjs\n";
out += "// Do not hand-edit; regenerate after changing the manifest and re-running the download script.\n";
out += "export const cityServiceHeroImages: Record<string, Record<string, string>> = {\n";
services.forEach((s, si) => {
  out += `  "${s}": {\n`;
  const cities = Object.keys(bySvc[s]);
  cities.forEach((c, ci) => {
    out += `    "${c}": "${bySvc[s][c]}"${ci < cities.length - 1 ? "," : ""}\n`;
  });
  out += `  }${si < services.length - 1 ? "," : ""}\n`;
});
out += "};\n";

fs.writeFileSync("src/lib/cityServiceImages.ts", out, "utf8");
let total = 0;
services.forEach((s) => (total += Object.keys(bySvc[s]).length));
console.log(`Wrote src/lib/cityServiceImages.ts: ${services.length} services, ${total} total entries`);
