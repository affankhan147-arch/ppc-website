# Platform Architecture

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- static generation where possible
- TypeScript data files for services, cities, markets, buyers, FAQs, blog posts, and templates

## Config-Driven Design
Core content lives under `src/data/`. Components and routes read from config files instead of hard-coding verticals, cities, services, or buyers.

## Routing
The platform generates:
- `/services/[serviceSlug]`
- `/cities/[citySlug]`
- `/cities/[citySlug]/[serviceSlug]`
- `/problems/[problemSlug]`
- `/cost-guides/[guideSlug]`
- `/blog/[postSlug]`

## APIs
- `/api/lead` logs safe form requests
- `/api/call-event` supports call-click tracking

## Buyer Routing
`src/lib/routing.ts` matches buyers by market, service, status, daily cap, payout, and fallback number.
