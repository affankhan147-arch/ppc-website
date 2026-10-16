// Task221 one-off codemod: visible byline + dated Article schema on literal /blog and /guides pages.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";

const report = [];
function addImports(src, names) {
  return src.replace(/import \{([^}]*)\} from "@\/lib\/schema";/, (m, inner) => {
    const have = inner.split(",").map((s) => s.trim()).filter(Boolean);
    for (const n of names) if (!have.includes(n)) have.push(n);
    return `import { ${have.join(", ")} } from "@/lib/schema";`;
  });
}
function addByline(src, path) {
  if (src.includes("<Byline")) return src;
  const i = src.indexOf("</h1>");
  if (i < 0) return null;
  return src.slice(0, i + 5) + `\n          <Byline path="${path}" />` + src.slice(i + 5);
}

for (const section of ["blog", "guides"]) {
  const dir = `src/app/${section}`;
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    if (!d.isDirectory() || d.name.startsWith("[")) continue;
    const file = `${dir}/${d.name}/page.tsx`;
    if (!existsSync(file)) continue;
    const path = `/${section}/${d.name}`;
    let src = readFileSync(file, "utf8");
    const orig = src;
    const needs = ["Byline"];
    if (!src.includes("articleSchema(")) {
      const t = src.match(/buildMetadata\(\{\s*title:\s*("(?:[^"\\]|\\.)*")/);
      const ds = src.match(/description:\s*(?:truncateForMeta\(\s*)?("(?:[^"\\]|\\.)*")/);
      const j = src.indexOf("<JsonLd");
      const close = j >= 0 ? src.indexOf("/>", src.indexOf("]}", j)) : -1;
      if (!t || !ds || close < 0) {
        report.push(`SKIP schema ${path}`);
      } else {
        const tag = `\n      <JsonLd data={articleSchema("${path}", ${t[1]}, ${ds[1]})} />`;
        src = src.slice(0, close + 2) + tag + src.slice(close + 2);
        needs.push("articleSchema");
      }
    }
    const withByline = addByline(src, path);
    if (withByline === null) report.push(`SKIP byline ${path}`);
    else src = withByline;
    src = addImports(src, needs);
    if (src !== orig) {
      writeFileSync(file, src);
      report.push(`OK ${path} [${needs.join(",")}]`);
    }
  }
}
console.log(report.join("\n"));
