# Approved Change Preservation Log

Generated: 2026-07-13

## Protected Item 1: Public-Facing Disclosure Cleanup

- Approved change: remove the old repeated wording from normal marketing pages and use "Plumbing Hands helps you connect with available plumbing professionals serving your area." where useful.
- Current implementation: src/data/site.ts keeps the approved service statement; legal disclosure remains separated for legal/disclosure context.
- Files checked: src/data/site.ts, src/app/page.tsx, src/components/PageSections.tsx, src/app/cities/[citySlug]/page.tsx, src/app/cities/[citySlug]/[serviceSlug]/page.tsx.
- Preserved or adjusted: preserved.
- Reason: Phase M does not change public marketing copy.
- Validation result: source scan found the removed wording only inside historical reports, not active source pages.

## Protected Item 2: Truthful Service Positioning

- Approved change: no direct-employment, physical-office, license, insurance, rating, response-time, exact-price, or guarantee claims unless verified.
- Current implementation: source copy uses provider-connection and service-area language with owner-proof blockers for claims.
- Files checked: src/data/site.ts, src/data/faqs.ts, src/data/pageEnhancements.ts, authority/*.md, reports/phase2_compliance_audit.md.
- Preserved or adjusted: preserved.
- Reason: Phase M backup uses placeholders and owner-approval rules.
- Validation result: no new fake office, fake license, fake review, exact-price, paid-ad, or paid-backlink claim was added.

## Protected Item 3: WhatsApp Objection And Mobile-Content Fixes

- Approved change: preserve larger mobile text, phrase/bullet-style cards, removal of public internal page-count language, /cities hub, updated navigation/footer/breadcrumbs/sitemap inventory, FAQ additions, and wrapping safeguards.
- Current implementation: src/app/page.tsx uses phrase/bullet cards; src/app/cities/page.tsx exists; src/data/site.ts navigation points to /cities; src/lib/content.ts includes city-index; src/app/globals.css contains mobile wrapping safeguards.
- Files checked: src/app/page.tsx, src/app/cities/page.tsx, src/data/site.ts, src/lib/content.ts, src/components/Footer.tsx, src/app/globals.css.
- Preserved or adjusted: preserved.
- Reason: Phase M adds repository backup docs only and does not modify the approved UI.
- Validation result: /cities exists and final smoke checks previously passed.

## Protected Item 4: Existing Technical Improvements

- Approved change: preserve orphan-page architecture, internal links, canonical/sitemap repairs, CTA click-event tracking, build/QA fixes, and origin/master workflow.
- Current implementation: sitemap is generated from getAllInventoryPages(); call events use /api/call-event; final commits were pushed to origin/master without force-push.
- Files checked: src/lib/content.ts, src/app/sitemap.ts, src/components/CallButton.tsx, src/components/TrackedLink.tsx, reports/phase2_completion_matrix.csv.
- Preserved or adjusted: preserved.
- Reason: Phase M backup documents these systems for reuse.
- Validation result: final QA and smoke checks passed before Phase M; Phase M will rerun master QA.
