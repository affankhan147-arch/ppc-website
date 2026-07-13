# Day 3 Session 2 Priority Queue

## P0

- Priority: P0
- URL or file: none currently
- Problem: No known build, routing, indexing, or conversion P0 remains.
- Business impact: No hidden launch blocker identified in repository checks.
- Recommended action: Continue only after owner reviews required configuration.
- Owner input required: no
- Estimated complexity: not applicable
- Validation method: build, QA, smoke checks.
- Proposed order: not applicable

## P1

- Priority: P1
- URL or file: hosted environment; src/data/site.ts
- Problem: Tracking phone values remain placeholders.
- Business impact: Phone conversion cannot be production-verified.
- Recommended action: Owner provides approved display/E.164 tracking phone values.
- Owner input required: yes
- Estimated complexity: low after values exist
- Validation method: CTA hrefs change to tel: and call-event requestDestination becomes phone.
- Proposed order: 1

- Priority: P1
- URL or file: hosted environment; src/app/api/lead/route.ts
- Problem: Lead delivery destination remains placeholder-only.
- Business impact: Form submissions are not routed to approved production CRM/webhook/email.
- Recommended action: Owner approves destination and secrets are configured only in hosting env.
- Owner input required: yes
- Estimated complexity: medium
- Validation method: live test lead reaches approved destination without exposing PII.
- Proposed order: 2

## P2

- Priority: P2
- URL or file: /services/burst-pipe-emergency and leak cluster
- Problem: Leak cluster can be expanded later with owner-approved details such as verified service coverage and provider capabilities.
- Business impact: More complete topical support after owner proof exists.
- Recommended action: Add proof-backed service details only after verification.
- Owner input required: yes
- Estimated complexity: medium
- Validation method: content review and build.
- Proposed order: 3

- Priority: P2
- URL or file: /blog/best-questions-to-ask-before-you-book-an-emergency-plumber
- Problem: Authority-ready asset can be made more useful with owner-approved downloadable/printable format later.
- Business impact: Better usefulness and future editorial suitability.
- Recommended action: Add downloadable checklist only if the site design supports it and no outreach starts.
- Owner input required: no
- Estimated complexity: medium
- Validation method: visual QA and accessibility check.
- Proposed order: 4

## P3

- Priority: P3
- URL or file: authority files
- Problem: Future unpaid backlink opportunities need manual scoring before use.
- Business impact: Keeps authority work clean.
- Recommended action: Score opportunities only when real relevant opportunities exist.
- Owner input required: yes for claims/relationships
- Estimated complexity: low
- Validation method: filter score and policy compliance.
- Proposed order: after owner configuration
