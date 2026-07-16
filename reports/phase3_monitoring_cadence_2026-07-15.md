# Phase 3 Monitoring Cadence

Generated: 2026-07-14T22:59:18.116Z

| Monitor | Frequency | Tool/Data Source | Owner | Alert Threshold | Response Action | Evidence Location |
| --- | --- | --- | --- | --- | --- | --- |
| Production HTTPS/uptime | daily | fetch https://plumbinghands.com and https://www.plumbinghands.com | Codex/owner | non-200 or TLS failure | inspect Vercel deployment and DNS | reports/closeout_url_inventory_2026-07-15.csv |
| robots/sitemap integrity | daily | robots.txt and sitemap.xml fetch | Codex/owner | sitemap not 200, host drift, URL count drift | revert/repair sitemap config, redeploy | reports/closeout_url_inventory_2026-07-15.csv |
| noindex/canonical drift | weekly | full crawl | Codex/owner | unexpected noindex/canonical host mismatch | repair metadata and redeploy | reports/closeout_url_inventory_2026-07-15.csv |
| broken links/orphans | weekly | internal crawl | Codex/owner | any 4xx/5xx internal link or priority orphan | fix links/navigation and redeploy | reports/closeout_internal_link_audit_2026-07-15.csv |
| call-click event health | daily | production call-event endpoint and application logs | Codex/owner | endpoint failure or missing expected event | inspect call button and call-event route, then redeploy verified fix | production/application logs |
| call quality and attribution | weekly after export connected | approved call-tracking aggregate export | owner | missing attribution, routing failure, or material unqualified-call pattern | review landing page, service, city, routing, and exclusions | owner-controlled redacted call export |
| placeholder phone regression | weekly | full crawl | Codex/owner | visible +1XXXXXXXXXX or placeholder tel link | disable phone mode or set approved number | reports/closeout_url_inventory_2026-07-15.csv |
| analytics delivery | weekly after account connected | GA4/GTM/Clarity debug/realtime | owner | expected test event missing or PII found | disable/fix event mapping | analytics account export |
| Search Console coverage/query changes | weekly after verified | GSC export | owner | coverage errors or meaningful CTR/position change | classify and prioritize backlog | reports/search-console exports |
| Core Web Vitals | monthly when data exists | GSC/PageSpeed/CrUX | owner | poor LCP/CLS/INP URLs | profile and optimize affected templates | monthly performance review |
| Cost/content freshness | monthly | editorial review | owner/Codex | stale cost guidance or unsupported claims | update copy with verified facts | reports/monthly review |
