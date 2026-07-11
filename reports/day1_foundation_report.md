# Day 1 Foundation Report

Date: 2026-07-12

## Scope

Day 1 foundation QA only. Day 2 content scaling, Google Search Console, Bing Webmaster, IndexNow, citations, outreach, paid ads, fake GBP, fake reviews, fake addresses, fake licenses, copied competitor images, and spam backlinks were not started.

## Production Status

- Live domain: `https://plumbinghands.com`
- WWW domain: `https://www.plumbinghands.com`
- Vercel URL: `https://plumbinghands.vercel.app`
- Hostinger DNS: connected to Vercel
- HTTPS: working
- Robots: `https://plumbinghands.com/robots.txt`
- Sitemap: `https://plumbinghands.com/sitemap.xml`

## Pages Completed

- Homepage
- Contact page
- Partner-with-us page
- Privacy policy
- Terms page
- Disclosure page
- FAQ page
- 10 service foundation pages
- 16 city foundation pages
- 160 city plus service pages
- Problem, cost guide, and blog structures already exist but were not expanded as a Day 2 batch.

## Homepage QA

- Brand is clear: Plumbing Hands
- Lead-generation wording is honest
- Emergency plumbing and drain-cleaning positioning is present
- Dallas-Fort Worth market is visible
- Click-to-call CTA is present
- Lead form CTA is present
- Trust/disclosure block is present
- Service overview is present
- City/service navigation is present
- Internal links are present
- AEO direct-answer block appears near the top
- Mobile sticky call CTA exists

## Service Foundation QA

Verified service data exists for:
- 24-hour emergency plumber
- emergency drain cleaning
- main sewer line clog
- toilet overflow emergency
- burst pipe emergency
- water heater emergency
- sewer backup help
- commercial emergency plumbing
- same-day plumber connection
- sink and shower drain backup

Each generated service page includes:
- unique metadata from service data
- one H1
- direct answer block
- emergency CTA
- what-to-do-now section
- when-to-call section
- FAQs
- internal links
- breadcrumbs
- WebPage, Service, Breadcrumb, and FAQ schema where appropriate

## CTA System

- Header CTA: present
- Footer CTA: present
- Mobile sticky call bar: present
- Service page CTA: present
- City page CTA: present
- Contact CTA: present
- Placeholder phone: `+1XXXXXXXXXX`

Real tracking is not claimed as live.

## Form And API Status

Lead form includes:
- name
- phone
- service
- city
- urgency
- message
- page URL capture
- UTM capture fields

`/api/lead`:
- accepts JSON or form submissions
- validates with Zod
- logs a safe placeholder event
- redacts phone values in logs
- does not expose secrets

`/api/call-event`:
- accepts call click event data
- logs location, page URL, city, service, timestamp, and configured placeholder phone
- does not require a live call tracking provider
- does not expose secrets

## Buyer Routing Foundation

Buyer data supports:
- buyer_id
- buyer_name
- status
- markets
- services
- open_hours
- daily_cap
- payout
- min_call_duration
- fallback_number

Buyer records are placeholders until owner-approved buyers exist.

## SEO And AEO Foundation

- Metadata helper uses `https://plumbinghands.com`
- Canonical URL base uses `https://plumbinghands.com`
- Open Graph basics are present
- Breadcrumb schema is present
- FAQ schema is present
- WebPage and Service schema are present where appropriate
- robots.txt is live
- sitemap.xml is live
- No temporary Vercel URL is used as final canonical
- ChatGPT Sites is not treated as final production

## Image Policy Foundation

Required image folders exist under `public/images`.

Required policy files exist:
- `ops/image_asset_tracker.csv`
- `ops/image_safety_policy.md`
- `ops/visual_style_guide.md`

No fake customer, technician, job-site, before/after, or copied competitor images were added.

## Ready For Day 2

Day 2 can start after owner confirms this Day 1 QA report. Day 2 should focus on SEO + AEO content scale, internal linking expansion, and content QA. Google/Bing indexing should wait until Day 1 QA is accepted and the sitemap is stable.
