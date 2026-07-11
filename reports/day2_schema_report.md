# Day 2 Schema Report

## Schema Types Present

- Organization schema in root layout
- WebPage schema on content pages
- Service schema on service and city plus service pages
- BreadcrumbList schema on generated pages
- FAQPage schema where FAQ blocks exist

## Schema Safety

Not added:
- fake LocalBusiness address
- fake aggregateRating
- fake review schema
- fake price schema
- fake opening hours
- fake license or insurance claims

LocalBusiness schema was intentionally not added because Plumbing Hands is positioned as a provider-connection platform and no verified local office/address was supplied.

## Canonical And Open Graph

Metadata helper uses:
- `https://plumbinghands.com`

No temporary Vercel URL or ChatGPT Sites URL is used as a final canonical.
