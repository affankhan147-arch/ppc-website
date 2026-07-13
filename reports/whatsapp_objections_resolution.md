# WhatsApp Objections Resolution

Date: 2026-07-13

## Objections Reviewed

- Increase mobile card text size.
- Replace sentence-heavy card descriptions with short phrases and bullet-style copy.
- Do not present internal page counts as front-page stats.
- Keep detailed safety/pricing points in FAQ or guide-style sections.
- Show graphics or stronger visual support near major headings.
- Create a separate location hub instead of relying on homepage city-page counts.

## Changes Made

- Homepage urgent cards now use larger icons, larger headings, and phrase bullets.
- Homepage service, problem, and cost cards now use larger mobile text and short list items instead of paragraph descriptions.
- Homepage stats now describe service areas, urgent service types, and local request paths instead of saying how many pages were created.
- Added `/cities` as a Dallas-Fort Worth location hub using existing verified city data.
- Updated primary navigation, footer, breadcrumbs, and sitemap inventory to use the new `/cities` hub.
- Added related emergency guidance to the FAQ dataset.
- Added mobile wrapping safeguards for headings, cards, and form controls.

## Verification

- Typecheck: pass.
- ESLint: pass.
- QA script: pass.
- Next build: pass, 122 generated pages.
- sites:build: pass.
- Mobile visual check: pass at 390px emulated viewport for `/`, `/cities`, and lower homepage card sections.

## Safety

- Paid ads created: 0.
- Backlinks created: 0.
- Fake claims added: 0.
- New fake locations or offices added: 0.
