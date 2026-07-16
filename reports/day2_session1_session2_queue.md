# Day 2 Session 2 Priority Queue

## P0

- Priority: P0
- URL or file: none currently
- Problem: No active P0 remains after Phase A. Build passes, CTA safely falls back to /contact while phone is placeholder, and no fake claims were added.
- Business impact: No launch-blocking code failure hidden.
- Recommended action: Continue to Phase B.
- Owner input required: no
- Estimated complexity: not applicable
- Validation method: build and QA gates.
- Proposed order: not applicable

## P1

- Priority: P1
- URL or file: src/data/site.ts; hosted environment
- Problem: Tracking phone values remain +1XXXXXXXXXX placeholders.
- Business impact: Real call conversion cannot be verified.
- Recommended action: Owner must provide approved display and E.164 call tracking values; then verify live tel links.
- Owner input required: yes
- Estimated complexity: low once values exist
- Validation method: CTA hrefs become tel: links and call-event logs phone destination.
- Proposed order: 1

- Priority: P1
- URL or file: src/app/api/lead/route.ts; hosted environment
- Problem: Lead form is placeholder-console-log-only and no approved CRM/webhook/email destination exists.
- Business impact: Form leads are not production-routed.
- Recommended action: Connect approved lead destination without committing secrets.
- Owner input required: yes
- Estimated complexity: medium
- Validation method: submit test lead and verify destination receipt with redaction/privacy checks.
- Proposed order: 2

- Priority: P1
- URL or file: src/components/CallButton.tsx; src/app/api/call-event/route.ts
- Problem: Call events currently send location only from buttons.
- Business impact: Page type, city, service, and CTA context are under-instrumented.
- Recommended action: Add privacy-conscious event parameters and event dictionary.
- Owner input required: no
- Estimated complexity: medium
- Validation method: smoke test event URLs and inspect logs.
- Proposed order: 3

## P2

- Priority: P2
- URL or file: selected Phase A pages and supporting cluster pages
- Problem: FAQs and internal links can be refined across the commercial cluster.
- Business impact: Better user answers and crawl paths.
- Recommended action: Audit selected-page FAQ/supporting pages and add or refine high-value FAQs without duplication.
- Owner input required: no
- Estimated complexity: medium
- Validation method: visible FAQ and FAQPage schema match.
- Proposed order: 4

- Priority: P2
- URL or file: src/components/LeadForm.tsx
- Problem: Form returns native JSON response instead of polished in-page confirmation.
- Business impact: Lower conversion confidence after submit.
- Recommended action: Add client-side success/error state while preserving privacy.
- Owner input required: no
- Estimated complexity: medium
- Validation method: submit locally and verify no PII is exposed in response.
- Proposed order: 5

## P3

- Priority: P3
- URL or file: social preview assets and owner proof files
- Problem: Social preview and verified local differentiation remain limited.
- Business impact: Better presentation and trust after owner evidence exists.
- Recommended action: Add truthful OG image and owner-verified local proof later.
- Owner input required: partly
- Estimated complexity: low to medium
- Validation method: metadata inspection and owner evidence review.
- Proposed order: 6
