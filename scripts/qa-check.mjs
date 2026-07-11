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
  "reports/page_inventory_day1.csv",
  "reports/aeo_page_audit.csv",
  "reports/day1_foundation_report.md",
  "reports/day1_qa_checklist.md",
  "reports/build_status.md",
  "reports/remaining_owner_inputs.md",
  "reports/final_handoff.md",
  "manual-owner-steps/DEPLOYMENT_MANUAL_STEPS.md",
  "manual-owner-steps/DOMAIN_DNS_STEPS.md",
  "manual-owner-steps/SEARCH_CONSOLE_BING_STEPS.md",
  "manual-owner-steps/GOOGLE_SEARCH_CONSOLE_STEP_BY_STEP.md",
  "manual-owner-steps/GOOGLE_SITEMAP_SUBMISSION_CHECKLIST.md",
  "manual-owner-steps/BING_WEBMASTER_NEXT_AFTER_GOOGLE.md",
  "manual-owner-steps/INDEXNOW_PENDING.md",
  "manual-owner-steps/VERCEL_DEPLOYMENT_STEPS.md",
  "manual-owner-steps/VERCEL_DNS_STEPS.md",
  "manual-owner-steps/VERCEL_DNS_STEPS_HOSTINGER.md",
  "manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md",
  "manual-owner-steps/POST_DNS_INDEXING_CHECKLIST.md",
  "command-center/NEXT_CODEX_TASK_AFTER_DNS.txt",
  "command-center/NEXT_OWNER_STEP.txt",
  "scripts/40_verify_plumbinghands_dns_and_https.ps1",
  "scripts/50_open_google_search_console_setup.ps1",
  "scripts/51_add_google_search_console_txt_to_hostinger.ps1",
  "scripts/52_check_google_txt_dns.ps1",
  "reports/indexing_setup_status.md",
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
  "ChatGPT Sites DNS instructions are paused",
  "HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md"
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
if (!deploymentNotes.includes("Vercel is now the production hosting target")) {
  console.error("Deployment notes must mark Vercel as the production path.");
  process.exit(1);
}

const hostingerDns = readFileSync(join(process.cwd(), "manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md"), "utf8");
for (const requiredText of ["76.76.21.21", "cname.vercel-dns.com", "2.57.91.91"]) {
  if (!hostingerDns.includes(requiredText)) {
    console.error(`Hostinger DNS handoff is missing required text: ${requiredText}`);
    process.exit(1);
  }
}

const postDnsTask = readFileSync(join(process.cwd(), "command-center/NEXT_CODEX_TASK_AFTER_DNS.txt"), "utf8");
if (!postDnsTask.includes("Verify no temporary Vercel URL is used as final canonical")) {
  console.error("Post-DNS task must include canonical URL verification.");
  process.exit(1);
}

const gscGuide = readFileSync(join(process.cwd(), "manual-owner-steps/GOOGLE_SEARCH_CONSOLE_STEP_BY_STEP.md"), "utf8");
for (const requiredText of [
  "https://search.google.com/search-console/welcome",
  "Domain",
  "plumbinghands.com",
  "google-site-verification=",
  "https://plumbinghands.com/sitemap.xml"
]) {
  if (!gscGuide.includes(requiredText)) {
    console.error(`Google Search Console guide is missing required text: ${requiredText}`);
    process.exit(1);
  }
}

const hostingerGoogleScript = readFileSync(join(process.cwd(), "scripts/51_add_google_search_console_txt_to_hostinger.ps1"), "utf8");
for (const requiredText of [
  "Read-Host \"Paste Hostinger API token\" -AsSecureString",
  "google-site-verification=",
  "overwrite = $false",
  "nslookup -type=TXT",
  "76.76.21.21",
  "cname.vercel-dns.com"
]) {
  if (!hostingerGoogleScript.includes(requiredText)) {
    console.error(`Hostinger Google TXT script is missing required safety text: ${requiredText}`);
    process.exit(1);
  }
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
