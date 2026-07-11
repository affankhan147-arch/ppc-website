import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const required = [
  "src/app/page.tsx",
  "src/app/services/[serviceSlug]/page.tsx",
  "src/app/cities/[citySlug]/page.tsx",
  "src/app/cities/[citySlug]/[serviceSlug]/page.tsx",
  "src/app/api/lead/route.ts",
  "src/app/api/call-event/route.ts",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "reports/page_inventory.csv",
  "reports/aeo_page_audit.csv",
  "reports/final_handoff.md",
  "manual-owner-steps/DEPLOYMENT_MANUAL_STEPS.md",
  "manual-owner-steps/DOMAIN_DNS_STEPS.md",
  "manual-owner-steps/SEARCH_CONSOLE_BING_STEPS.md",
  "ops/image_asset_tracker.csv"
];

const imageSafetyFolders = [
  "blog",
  "brand",
  "cities",
  "cost-guides",
  "diagrams",
  "hero",
  "partner-real-photos",
  "placeholders",
  "problems",
  "services",
  "trust"
];

for (const folder of imageSafetyFolders) {
  required.push(`public/images/${folder}/README.md`);
}

const missing = required.filter((file) => !existsSync(join(process.cwd(), file)));
if (missing.length) {
  console.error("Missing required files:");
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const bannedPatterns = [
  /aggregateRating/i,
  /"@type"\s*:\s*"Review"/i,
  /guaranteed arrival/i,
  /licensed and insured/i,
  /five-star/i
];

const sourceFiles = [
  "src/app/page.tsx",
  "src/components/CallButton.tsx",
  "src/lib/schema.tsx",
  "src/data/site.ts"
];

for (const file of sourceFiles) {
  const content = readFileSync(join(process.cwd(), file), "utf8");
  for (const pattern of bannedPatterns) {
    if (pattern.test(content)) {
      console.error(`Safety pattern matched ${pattern} in ${file}`);
      process.exit(1);
    }
  }
}

const callButton = readFileSync(join(process.cwd(), "src/components/CallButton.tsx"), "utf8");
if (!callButton.includes("href={`tel:${siteConfig.phoneE164}`}")) {
  console.error("CallButton must use tel: link format.");
  process.exit(1);
}

const envExample = readFileSync(join(process.cwd(), ".env.example"), "utf8");
if (!envExample.includes("SITE_DOMAIN=plumbinghands.com") || !envExample.includes("NEXT_PUBLIC_SITE_URL=https://plumbinghands.com")) {
  console.error(".env.example must point DNS-safe production guidance at plumbinghands.com.");
  process.exit(1);
}

const domainSteps = readFileSync(join(process.cwd(), "manual-owner-steps/DOMAIN_DNS_STEPS.md"), "utf8");
for (const requiredText of [
  "https://plumbinghands.com",
  "https://www.plumbinghands.com",
  "Hostinger DNS",
  "162.159.143.30",
  "172.66.3.26",
  "custom-domains.chatgpt.site."
]) {
  if (!domainSteps.includes(requiredText)) {
    console.error(`DOMAIN_DNS_STEPS.md is missing required DNS-safe text: ${requiredText}`);
    process.exit(1);
  }
}

const deploymentNotes = readFileSync(join(process.cwd(), "reports/deployment_notes.md"), "utf8");
if (!deploymentNotes.includes("must not be treated as the final production website")) {
  console.error("Deployment notes must mark chatgpt.site as preview/control only.");
  process.exit(1);
}

const reports = readdirSync(join(process.cwd(), "reports"));
const neededReports = [
  "page_inventory.csv",
  "content_inventory.csv",
  "keyword_map.csv",
  "internal_link_map.csv",
  "content_qa_report.csv",
  "aeo_page_audit.csv",
  "qa_launch_log.csv",
  "buyer_routing_log.csv",
  "citations.csv",
  "outreach.csv",
  "partner_targets.csv",
  "backlink_tracker.csv"
];

for (const report of neededReports) {
  if (!reports.includes(report)) {
    console.error(`Missing report ${report}`);
    process.exit(1);
  }
}

console.log("QA checks passed.");
