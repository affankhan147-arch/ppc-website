import { problems } from "@/data/problems";
import { costGuides } from "@/data/costGuides";
import { getLiveBlogPosts } from "@/data/blogPosts";
import { contentPublished } from "@/data/contentDates";
import { siteConfig } from "@/data/site";
import { joinUrl } from "@/lib/format";

// Full-text companion to /llms.txt: answers, warning signs, steps, cost ranges and questions in one
// plain file so answer engines (ChatGPT search, Perplexity, Copilot, Gemini) can read and quote it
// without rendering pages. Every entry carries its canonical URL and publish date for attribution.
export const dynamic = "force-static";

const clean = (t: string) => t.replace(/\s+/g, " ").trim();

export function GET() {
  const out: string[] = [];
  const head = (title: string, path: string) => {
    out.push(`## ${title}`, `URL: ${joinUrl(siteConfig.baseUrl, path)}`);
    if (contentPublished[path]) out.push(`Published: ${contentPublished[path]}`);
    out.push("");
  };
  const list = (label: string, items?: string[]) => {
    if (!items?.length) return;
    out.push(`${label}:`);
    items.forEach((i) => out.push(`- ${clean(i)}`));
  };

  out.push(`# ${siteConfig.brandName}: full guide text`, "");
  out.push(`> ${siteConfig.serviceStatement} Dallas-Fort Worth plumbing emergencies, costs and what to do first. Phone: ${siteConfig.phoneDisplay}. Index: ${joinUrl(siteConfig.baseUrl, "/llms.txt")}`, "");
  out.push(siteConfig.legalDisclosure, "");

  for (const p of problems) {
    head(p.title, `/problems/${p.slug}`);
    out.push(clean(p.directAnswer));
    if (p.whatItMeans) out.push(clean(p.whatItMeans));
    list("Warning signs", p.warningSigns);
    list("What to do now", p.steps);
    list("What not to do", p.whatNotToDo);
    list("Call a plumber right away when", p.urgentWhen);
    out.push("");
  }

  for (const c of costGuides) {
    head(c.title, `/cost-guides/${c.slug}`);
    out.push(clean(c.directAnswer), clean(c.rangeGuidance));
    list("What changes the price", c.factors);
    list("Questions to ask before work starts", c.questionsToAsk);
    out.push("");
  }

  for (const b of getLiveBlogPosts()) {
    head(b.title, `/blog/${b.slug}`);
    out.push(clean(b.directAnswer), "");
  }

  return new Response(out.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
