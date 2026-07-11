# Day 1 QA Checklist

## Repo And Build

- [x] Pulled latest `master`
- [x] Checked clean starting repo state
- [x] Attempted `npm install`
- [x] Attempted `npm run build`
- [x] Ran equivalent Next production build with available pnpm runtime
- [x] Ran TypeScript check with available pnpm runtime
- [x] Ran custom QA script
- [x] Checked PowerShell syntax for new scripts from prior sprint
- [x] Checked for committed private login fragments

## Foundation Pages

- [x] Homepage exists
- [x] Contact page exists
- [x] Partner-with-us page exists
- [x] Privacy policy exists
- [x] Terms page exists
- [x] Disclosure page exists
- [x] Main service pages generate from config
- [x] City pages generate from config
- [x] City plus service pages generate from config
- [x] FAQ sections exist where appropriate

## Homepage

- [x] Plumbing Hands brand visible
- [x] Honest lead-generation wording present
- [x] Emergency plumbing and drain-cleaning positioning present
- [x] Dallas-Fort Worth market visible
- [x] Click-to-call CTA present
- [x] Lead form CTA present
- [x] Trust/disclosure block present
- [x] Service overview present
- [x] City/service navigation present
- [x] Internal links present
- [x] Direct-answer block near top
- [x] Mobile-friendly CTA exists

## Services

- [x] 24-hour emergency plumber
- [x] emergency drain cleaning
- [x] main sewer line clog
- [x] toilet overflow emergency
- [x] burst pipe emergency
- [x] water heater emergency
- [x] sewer backup help
- [x] commercial emergency plumbing

Service page template checks:
- [x] unique title
- [x] unique meta description
- [x] one H1
- [x] direct answer block
- [x] emergency CTA
- [x] what-to-do-now section
- [x] when-to-call section
- [x] FAQs
- [x] internal links
- [x] breadcrumbs
- [x] schema

## CTAs And APIs

- [x] Header CTA
- [x] Footer CTA
- [x] Mobile sticky call bar
- [x] Service page CTA
- [x] City page CTA
- [x] Contact CTA
- [x] Placeholder phone is intentionally marked as `+1XXXXXXXXXX`
- [x] Lead form captures required fields
- [x] Lead form captures page URL and UTM values where available
- [x] `/api/lead` validates safely
- [x] `/api/call-event` logs click event fields safely

## SEO, AEO, Safety

- [x] Canonicals use `https://plumbinghands.com`
- [x] Open Graph basics exist
- [x] Breadcrumb schema exists
- [x] FAQ schema exists
- [x] Service/WebPage schema exists where appropriate
- [x] robots.txt reachable
- [x] sitemap.xml reachable
- [x] No temporary Vercel URL used as final canonical
- [x] No ChatGPT Sites URL treated as production
- [x] No fake license, office, GBP, review, address, or insurance claims
- [x] Legal pages exist
- [x] Image safety folders and policies exist

## Deferred

- [ ] Real call tracking number
- [ ] Production buyer endpoints
- [ ] Google Search Console
- [ ] Bing Webmaster
- [ ] IndexNow
- [ ] citations
- [ ] outreach
- [ ] paid ads
