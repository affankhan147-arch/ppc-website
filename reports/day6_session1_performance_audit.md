# Day 6 Session 1 Performance Audit

## Representative Pages

- /
- /services/24-hour-emergency-plumber
- /cities/dallas
- /problems/water-shutoff-valve-will-not-close
- /cost-guides/emergency-plumbing-cost-dfw

## Findings

- Build passes and static generation covers public routes.
- Images are local SVG assets with explicit dimensions where used.
- Main CTA uses a client component because call-event tracking requires click handling.
- Mobile sticky CTA exists and uses the shared CallButton.
- No heavy third-party scripts or analytics IDs are present in source.

## Data Limits

Real Core Web Vitals, CrUX, Lighthouse, and production device metrics are NOT AVAILABLE in repository.
