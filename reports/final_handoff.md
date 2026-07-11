# Final Handoff

## What Was Built
A config-driven pay-per-call lead-generation platform for Dallas-Fort Worth emergency plumbing and drain cleaning.

## DNS-Safe Production Target
Final domain: https://plumbinghands.com
WWW hostname: https://www.plumbinghands.com

The temporary `chatgpt.site` preview/control URL is not the final production website. Vercel is the production hosting target, while ChatGPT Sites remains preview-only.

Temporary Vercel production URL: `https://plumbinghands.vercel.app`

## How To Run Locally
Use Node and pnpm, then run pnpm install, pnpm run reports, pnpm run qa, pnpm run build, and pnpm run dev.

## Environment Variables Needed
See .env.example. Replace sample phone values before public launch. Keep verification tokens blank until owner approval.

## Sitemap, Robots, And Canonicals
Sitemap target: https://plumbinghands.com/sitemap.xml
Robots target: https://plumbinghands.com/robots.txt
Canonical URL base: https://plumbinghands.com

Do not submit the sitemap until Google Search Console ownership is verified. Do not run IndexNow until Bing Webmaster is verified.

## Important Page URLs
/, /services/24-hour-emergency-plumber, /services/emergency-drain-cleaning, /cities/dallas, /cities/dallas/emergency-drain-cleaning, /faq, /contact, /partner-with-us, /privacy, /terms, /disclosure.

## Manual Owner Steps
Run `scripts/50_open_google_search_console_setup.ps1`, copy the Google TXT verification value, run `scripts/51_add_google_search_console_txt_to_hostinger.ps1`, verify Search Console, submit the sitemap, provide a real tracking number, approve buyer routing endpoints, and approve any real business claims before use.

## Known Limitations
Sample buyer and tracking values are included for build/routing scaffolding and must be replaced before public launch. Google verification, Bing verification, IndexNow, citations, outreach, and final launch are pending.

## Next 7-Day Growth Plan
Improve top city-service pages, add verified buyer data, expand FAQs, refine internal links, submit sitemap after Google verification, monitor Search Console and Bing, and update content QA reports.
