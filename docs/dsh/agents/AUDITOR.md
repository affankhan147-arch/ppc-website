# SEO Auditor + Link Auditor - PlumbingHands
Now a script: `scripts/seo-audit.mjs`, run weekly by `.github/workflows/seo-audit.yml` (Mondays 09:37 PKT, or Actions > Run workflow).
It crawls every sitemap URL of the live site and reports: HTTP errors, broken internal links, H1 count, missing/duplicate/long titles and meta descriptions, canonical and noindex problems, the phone number on the home page, lint totals, orphan and weak pages (in-content links only, nav/footer excluded) and link suggestions.
Claude verifies the findings at its weekly review and turns the real ones into OPEN tasks.
