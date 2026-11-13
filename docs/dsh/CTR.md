# CTR tracker - plumbinghands.com

Claude keeps this file (DSH: read only). Sunny's priority since 2026-11-10: more clicks from the impressions we already get.
Each Wednesday review adds the latest Search Console numbers (last 28 days: impressions / clicks / CTR / avg position) under "Checks". A change is judged 14+ days after it goes live; if CTR drops on 2 checks in a row, try a different title.
Rule: CTR work only for pages at average position 15 or better. Pages ranking lower need rankings first (links, content), not new titles.

Site, 28 days to 2026-11-07: 79 clicks / 42.4k impressions / 0.2% CTR / position 20.

| Page | Change (task, live date) | Baseline (28 days to 2026-11-07) | Checks |
|---|---|---|---|
| /cities/fort-worth, arlington, carrollton, plano, mckinney, richardson, garland, frisco, lewisville, denton, irving (city hubs) | PH-023: title and description lead with "24 hour" (live 2026-11-12, merge 910dc8a; judge from 2026-11-26) | fort-worth 2,399 / 1 / 0% / 9.9; arlington 1,292 / 0 / 0% / 10.8; carrollton 1,157 / 0 / 0% / 9.3; plano 976 / 0 / 0% / 13.4; mckinney 965 / 1 / 0.1% / 11.0 | |
| /tools/water-heater-age-lookup | seoOverrides title + description (Oct 2026) | before (3 months to 2026-10-19): 466 / 1.1% / 9.6 | 2026-11-07: 1,698 / 32 / 1.9% / 6.6 (better) |
| /blog/how-to-verify-a-texas-plumbers-license | seoOverrides title + description (Oct 2026) | before (3 months to 2026-10-19): 1,152 / 0.9% / 12.3 | 2026-11-07: 1,330 / 16 / 1.2% / 9.8 (better) |

Rankings first (titles already match the queries; position too low for CTR work):
- /guides/dfw-emergency-plumbing-costs: 1,018 / 1 / 0.1% / 13.0 (top query "emergency plumber cost" at position 24)
- /cities/houston/24-hour-emergency-plumber: 1,924 / 0 / 0% / 18.5; /cities/san-antonio/24-hour-emergency-plumber: 1,353 / 1 / 0.1% / 23.2
- /tools/sewer-line-repair-cost-calculator: 2,130 / 4 / 0.2% / 40.2; /tools/slab-leak-repair-cost-calculator: 1,204 / 3 / 0.2% / 22.1

Checks log:
- 2026-11-13 (Fri): Search Console skipped: Chrome offline (cloud run). No new numbers.
- 2026-11-12 (Thu): Search Console skipped: Chrome offline (cloud run). PH-023 (city hub titles) and PH-026 (2 calculator titles) went live today.
- 2026-11-11 (Wed): Search Console skipped: Chrome offline (cloud run, no Claude in Chrome). No new numbers. PH-023 not live yet: the DSH agent crashed on 10 and 11 Nov on the double quotes in its task title (fixed 2026-11-11), so it runs on 12 Nov.

Rankings-first work queued 2026-11-11 (judge 14+ days after live):
- /guides/dfw-emergency-plumbing-costs: PH-024 links from 2 more pages (p13.0).
- /tools/sewer-line-repair-cost-calculator: PH-025 links from 3 sewer pages, PH-026 title 65 -> 53 chars, PH-032 new Fort Worth sewer post links in (p40.2).
- /tools/slab-leak-repair-cost-calculator: PH-027 links from 3 leak pages (p22.1).
- /cities/houston/24-hour-emergency-plumber (p18.5) and /cities/san-antonio/24-hour-emergency-plumber (p23.2): PH-028 links from the 24-hour service page.
- Live 2026-11-12: PH-024 (d8a8962), PH-025 (c3949a2), PH-026 (503ae4c), PH-027 (1b34c1a), PH-028 (bbb22d2). PH-025 put 1 of 3 links and PH-027 2 of 3 links on neighbouring pages (anchor lines were not unique); PH-034 adds the 3 missing links.

Rankings-first work queued 2026-11-13 (judge 14+ days after live):
- Live 2026-11-13: PH-034 the 3 missing calculator links (bfed5fa); PH-037 SAWS leak post links into the San Antonio 24-hour page (cd2e7e3).
- /cities/houston/24-hour-emergency-plumber (p18.5) and /cities/san-antonio/24-hour-emergency-plumber (p23.2): PH-041 links from 3 emergency posts; PH-035/036 retrying (blocked on URL scraping, fixed); PH-045 San Antonio plumbing permit post (WRITER).
- /guides/dfw-emergency-plumbing-costs (p13.0): PH-042 links from 2 more posts.
- /tools/sewer-line-repair-cost-calculator (p40.2): PH-043 links from 3 sewer posts. /tools/slab-leak-repair-cost-calculator (p22.1): PH-044 links from 2 leak posts.

Rankings-first work queued 2026-11-12 (judge 14+ days after live):
- /cities/houston/24-hour-emergency-plumber (1,924 / 0 / p18.5): PH-035 Houston-specific section (311, Houston Public Works leak credits, NWS Feb 2021 low).
- /cities/san-antonio/24-hour-emergency-plumber (1,353 / 1 / p23.2): PH-036 San Antonio section (SAWS rules, NWS Feb 2021 freeze); PH-037 new SAWS leak post links in.
- /tools/sewer-line-repair-cost-calculator (p40.2) and /tools/slab-leak-repair-cost-calculator (p22.1): PH-034 the 3 missing links.
