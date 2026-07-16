# QA And Release

Required checks:
- pnpm run build
- pnpm run typecheck
- pnpm run qa
- pnpm exec eslint src scripts worker --max-warnings=0
- pnpm run sites:build

Smoke routes:
homepage, /cities, service, city, problem, cost, contact, call-event API, robots.txt, sitemap.xml, and every new route.
