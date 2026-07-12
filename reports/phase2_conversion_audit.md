# Phase 2 Session 1 Conversion Audit

Generated: 2026-07-12T15:04:57.214Z

## Summary

High-intent pages render visible CTAs and lead forms, and the global mobile sticky CTA is present. Because the tracking phone remains a placeholder, call buttons intentionally fall back to /contact instead of emitting fake tel links.

## Verified Paths

- Homepage: hero CTA -> /contact; lead form -> POST /api/lead; mobile sticky CTA -> /contact.
- Service page: top CTA -> /contact; lead form -> POST /api/lead; related service links present.
- City page: top CTA -> /contact; lead form -> POST /api/lead; service/city links present.
- Emergency problem page: top CTA -> /contact; lead form -> POST /api/lead; recommended service CTA present.
- Cost guide: top CTA -> /contact; lead form -> POST /api/lead; related service/problem/contact links present.

## Issues

- P1 /: No active tel link because tracking phone is a placeholder (owner action required)
- P2 /: Call event hook is declarative only
- P2 /: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/24-hour-plumber-in-plano-when-the-problem-cannot-wait: Call event hook is declarative only
- P2 /blog/24-hour-plumber-in-plano-when-the-problem-cannot-wait: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/bathtub-backing-up-when-toilet-flushes-what-causes-it: Call event hook is declarative only
- P2 /blog/bathtub-backing-up-when-toilet-flushes-what-causes-it: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/best-questions-to-ask-before-you-book-an-emergency-plumber: Call event hook is declarative only
- P2 /blog/best-questions-to-ask-before-you-book-an-emergency-plumber: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/burst-pipe-in-dallas-what-to-shut-off-first: Call event hook is declarative only
- P2 /blog/burst-pipe-in-dallas-what-to-shut-off-first: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/commercial-drain-backup-what-business-owners-should-do-first: Call event hook is declarative only
- P2 /blog/commercial-drain-backup-what-business-owners-should-do-first: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/dallas-hard-water-and-drain-problems-what-homeowners-should-know: Call event hook is declarative only
- P2 /blog/dallas-hard-water-and-drain-problems-what-homeowners-should-know: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/dallas-storms-and-sewer-backups-what-to-check-after-heavy-rain: Call event hook is declarative only
- P2 /blog/dallas-storms-and-sewer-backups-what-to-check-after-heavy-rain: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/drain-cleaning-cost-guide-for-dallas-homeowners: Call event hook is declarative only
- P2 /blog/drain-cleaning-cost-guide-for-dallas-homeowners: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/drain-smell-in-bathroom-sewer-gas-or-simple-clog: Call event hook is declarative only
- P2 /blog/drain-smell-in-bathroom-sewer-gas-or-simple-clog: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-drain-cleaning-cost-in-dallas-what-affects-the-price: Call event hook is declarative only
- P2 /blog/emergency-drain-cleaning-cost-in-dallas-what-affects-the-price: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-drain-cleaning-in-fort-worth-fast-homeowner-guide: Call event hook is declarative only
- P2 /blog/emergency-drain-cleaning-in-fort-worth-fast-homeowner-guide: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-drain-cleaning-in-frisco-what-to-expect: Call event hook is declarative only
- P2 /blog/emergency-drain-cleaning-in-frisco-what-to-expect: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-plumber-in-plano-when-to-call-now: Call event hook is declarative only
- P2 /blog/emergency-plumber-in-plano-when-to-call-now: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives: Call event hook is declarative only
- P2 /blog/emergency-plumber-near-me-open-now-what-to-do-before-help-arrives: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-plumber-vs-regular-plumber-what-is-the-difference: Call event hook is declarative only
- P2 /blog/emergency-plumber-vs-regular-plumber-what-is-the-difference: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-plumbing-cost-guide-for-dallas-homeowners: Call event hook is declarative only
- P2 /blog/emergency-plumbing-cost-guide-for-dallas-homeowners: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-plumbing-in-arlington-tx-common-night-and-weekend-problems: Call event hook is declarative only
- P2 /blog/emergency-plumbing-in-arlington-tx-common-night-and-weekend-problems: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/emergency-sewer-help-in-garland-signs-and-next-steps: Call event hook is declarative only
- P2 /blog/emergency-sewer-help-in-garland-signs-and-next-steps: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/how-long-should-emergency-drain-cleaning-take: Call event hook is declarative only
- P2 /blog/how-long-should-emergency-drain-cleaning-take: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/how-to-know-if-a-clogged-drain-is-actually-a-sewer-line-problem: Call event hook is declarative only
- P2 /blog/how-to-know-if-a-clogged-drain-is-actually-a-sewer-line-problem: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/kitchen-sink-backing-up-in-dallas-signs-you-need-drain-help: Call event hook is declarative only
- P2 /blog/kitchen-sink-backing-up-in-dallas-signs-you-need-drain-help: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/main-sewer-line-clogged-in-dallas-warning-signs-and-fast-options: Call event hook is declarative only
- P2 /blog/main-sewer-line-clogged-in-dallas-warning-signs-and-fast-options: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/roto-rooter-vs-local-emergency-plumber-in-dallas-which-should-you-call: Call event hook is declarative only
- P2 /blog/roto-rooter-vs-local-emergency-plumber-in-dallas-which-should-you-call: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/same-day-drain-cleaning-in-dallas-what-to-expect: Call event hook is declarative only
- P2 /blog/same-day-drain-cleaning-in-dallas-what-to-expect: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/sewer-backup-in-fort-worth-what-it-means-and-who-to-call: Call event hook is declarative only
- P2 /blog/sewer-backup-in-fort-worth-what-it-means-and-who-to-call: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/signs-your-main-drain-needs-same-day-service: Call event hook is declarative only
- P2 /blog/signs-your-main-drain-needs-same-day-service: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/toilet-overflowing-at-night-in-dallas-fast-steps-for-homeowners: Call event hook is declarative only
- P2 /blog/toilet-overflowing-at-night-in-dallas-fast-steps-for-homeowners: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/toilet-shower-and-sink-backing-up-together-what-it-means: Call event hook is declarative only
- P2 /blog/toilet-shower-and-sink-backing-up-together-what-it-means: Form submits to JSON endpoint without a user-facing confirmation page
- P2 /blog/water-heater-leaking-in-dallas-emergency-signs-to-watch: Call event hook is declarative only

## Owner Actions

- Replace placeholder phone env values with a real owner-approved tracking number.
- Approve the CRM, webhook, email, or lead storage destination before public launch.
- Confirm whether call-click analytics should fire before tel navigation once the real number is active.
