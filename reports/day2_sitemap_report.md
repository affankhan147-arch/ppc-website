# Day 2 Sitemap Report

## Sitemap Target

Production sitemap:
`https://plumbinghands.com/sitemap.xml`

## Expected Inventory After Day 2

- Core support/legal pages: 7
- Service pages: 10
- City pages: 30
- Controlled city plus service pages: 16
- Problem pages: 14
- Cost guide pages: 5
- Blog/help articles: 30
- Total expected sitemap URLs: 112

## Local Build Verification

The local production build artifact `.next/server/app/sitemap.xml.body` was checked after Day 2 changes:
- `<loc>` count: 112
- preview/local URLs found: no

## URL Safety

The sitemap is generated from `siteConfig.baseUrl`, which defaults to:
`https://plumbinghands.com`

The sitemap must not include:
- local URLs
- Vercel preview URLs
- ChatGPT Sites URLs
- admin URLs
- report files
- draft/internal-only URLs

## Indexing Status

Google Search Console, Bing Webmaster, IndexNow, citations, and outreach are still not started. They can begin only after owner approval.
