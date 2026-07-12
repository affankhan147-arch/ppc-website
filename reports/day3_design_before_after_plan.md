# Day 3 Design Before After Plan

Date: 2026-07-12

## Before

- Homepage exposed internal positioning and build strategy.
- CTA hierarchy mixed phone, form, and business model language.
- Public copy referenced terms that were not appropriate for visitor-facing pages.
- Visual system relied mostly on layout and icons.

## After

- Homepage rebuilt around an emergency service request hero.
- First screen now includes direct value proposition, request CTA, form, and original visual asset.
- Service, city, problem, cost, disclosure, contact, terms, privacy, and partner copy use public-safe language.
- Design system now uses premium cards, stronger emergency strip, softer content bands, and orange CTA styling.

## QA Focus

- Confirm exact forbidden terms are absent from `src` and `public`.
- Confirm sitemap and robots logic still use `https://plumbinghands.com`.
- Confirm build passes before commit.
