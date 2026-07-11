# Codex Phase Report

## Phase
Command 2: 3-day SEO + AEO build, DNS-safe mode.

## Work Performed
- Built the reusable Next.js pay-per-call lead-generation platform.
- Added config-driven data files for Dallas-Fort Worth plumbing, future verticals, markets, cities, services, problems, cost guides, FAQs, buyers, blog posts, internal links, page templates, answer blocks, and AEO templates.
- Added homepage, dynamic service pages, city pages, city plus service pages, problem pages, cost guides, blog posts, FAQ, contact, partner, privacy, terms, and disclosure pages.
- Added lead API, call-event API, sitemap, robots, SEO metadata helpers, schema helpers, routing model, and UTM model.
- Added AEO policy, SEO/AEO strategy, platform architecture docs, safe link building strategy, GBP strategy, image safety policy, and reusable blueprint archive.
- Generated page inventory, content inventory, keyword map, internal link map, AEO audit, content QA, citations, outreach, partner targets, backlink tracker, analytics plan, conversion tracking plan, deployment notes, and final handoff.
- Updated DNS-safe production guidance for `https://plumbinghands.com` and `https://www.plumbinghands.com`.
- Verified Vercel as the production hosting target and paused ChatGPT Sites DNS instructions.
- Added tracked image safety folders and updated the image asset tracker.
- Tightened the lead API placeholder so it does not return submitted personal details.

## Work Not Started
- No paid ads or ad account work was performed.
- No Google Business Profile was created.
- No DNS, payment, Search Console, Bing verification, sitemap submission, IndexNow submission, citation submission, backlink outreach, or final launch action was performed.

## Verification Planned
- Required paths exist: passed.
- Colab notebook JSON validation: passed.
- PowerShell script syntax parse: passed.
- Secret-shaped value scan: passed; only existing local helper variable names were detected, with no committed secret values.
- Report generation: passed.
- Custom QA: passed.
- Next production build: passed on Next.js 16.2.10 with 242 static pages plus dynamic APIs.
- Sites worker build: passed with `vinext build`.
- Private Sites preview/control deployment exists, but it is not the final production website.
- Temporary Vercel production URL: `https://plumbinghands.vercel.app`.
- Exact Hostinger DNS records are prepared in `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`.
- Commit and push: completed as the final step of this DNS-safe sprint.

## Manual Owner Steps
- Replace sample tracking phone number values with the real owner-approved call tracking number.
- Run `scripts/50_open_google_search_console_setup.ps1`.
- Copy the Google TXT verification value from Search Console.
- Run `scripts/51_add_google_search_console_txt_to_hostinger.ps1`.
- Verify Google Search Console, submit the sitemap, and request homepage indexing only.
- Prepare Bing Webmaster only after Google verification and sitemap submission are complete.
- Submit sitemap and run IndexNow only after verification succeeds.
- Verify real buyer claims before any license, insurance, review, office, or GBP language is used.

## D-Drive Backup
Codex created and verified the D-drive backup at:

`D:\PPC_Project_Blueprints\PPC_Lead_Generation_Platform_Blueprint`

Verified backup contents:
- `blueprints/`
- `ops/`
- `command-center/`
- `manual-owner-steps/`
- `reports/`
- `ai-agents/`
- `colab/`
- `_backup_manifest.txt`
