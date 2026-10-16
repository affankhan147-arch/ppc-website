// Task221: three literal blog pages render no <h1> at all. Add the H1 (from `title`) + byline after the breadcrumbs.
import { readFileSync, writeFileSync } from "node:fs";
const slugs = [
  "does-homeowners-insurance-cover-a-plumbing-leak-in-texas",
  "drain-backup-in-a-restaurant-what-owners-should-do-first",
  "how-to-verify-a-texas-plumbers-license"
];
for (const s of slugs) {
  const file = `src/app/blog/${s}/page.tsx`;
  let src = readFileSync(file, "utf8");
  if (/<h1[\s>]/.test(src)) { console.log("has h1", s); continue; }
  const b = src.indexOf("<Breadcrumbs");
  const end = src.indexOf("/>", src.indexOf("]}", b));
  if (b < 0 || end < 0) { console.log("SKIP", s); continue; }
  const ins = `\n      <h1 className="mt-6 text-4xl font-black leading-tight text-white">{title}</h1>\n      <Byline path={path} />`;
  src = src.slice(0, end + 2) + ins + src.slice(end + 2);
  writeFileSync(file, src);
  console.log("OK", s);
}
