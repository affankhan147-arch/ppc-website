import { getAllInventoryPages } from "@/lib/content";
import { siteConfig } from "@/data/site";
import { joinUrl } from "@/lib/format";

export const dynamic = "force-static";

const SECTION_TITLES: Record<string, string> = {
  service: "Emergency plumbing services",
  guide: "Data guides, tools, and research reports",
  blog: "Homeowner guides",
  problem: "Plumbing problems: what to do now",
  cost: "Cost guides",
  "cost-guide": "Cost guides",
  city: "Service areas",
  "service-index": "Service directory",
  "city-index": "City directory",
  faq: "Frequently asked questions"
};

function clip(text: string, max = 200): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "...";
}

export function GET() {
  const pages = getAllInventoryPages().filter((p) => p.kind !== "city-service" && p.kind !== "home" && p.kind !== "legal");
  const groups = new Map<string, typeof pages>();
  for (const page of pages) {
    const list = groups.get(page.kind) ?? [];
    list.push(page);
    groups.set(page.kind, list);
  }

  const lines: string[] = [];
  lines.push(`# ${siteConfig.brandName}`);
  lines.push("");
  lines.push(`> ${siteConfig.serviceStatement} Free, sourced guides and tools on DFW water rates, leaks, water hardness, freeze risk, lead service lines, and emergency plumbing costs. Phone: ${siteConfig.phoneDisplay}.`);
  lines.push("");
  lines.push(`${siteConfig.legalDisclosure} Data pages cite primary sources such as city water utilities, the EPA, the National Weather Service, and the U.S. Census.`);
  lines.push("");

  for (const [kind, list] of groups) {
    lines.push(`## ${SECTION_TITLES[kind] ?? kind}`);
    for (const page of list) {
      lines.push(`- [${page.title}](${joinUrl(siteConfig.baseUrl, page.path)}): ${clip(page.description)}`);
    }
    lines.push("");
  }

  lines.push("## Optional");
  lines.push(`- [Sitemap](${joinUrl(siteConfig.baseUrl, "/sitemap.xml")}): Includes every city and service combination page.`);

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
