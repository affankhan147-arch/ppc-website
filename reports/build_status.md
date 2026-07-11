# Build Status

Date: 2026-07-12

## Latest Scope

Day 2 SEO + AEO content scale.

## Requested Commands

`npm install`:
- status: not available in this Codex runtime
- result: `npm` command not found

`npm run build`:
- status: not available in this Codex runtime
- result: `npm` command not found

## Equivalent Build Verification

Because this Codex runtime does not expose `npm`, the source was synced to the D-drive project workspace and verified with the available pnpm runtime.

Command path:
- `D:\PPC_Project_Offloaded_Data\Pay Per Call(PPC)`

Result:
- Next.js production build passed
- 118 static build entries generated, including framework/support routes
- 112 sitemap URLs verified in the local sitemap artifact
- `/api/lead` remains dynamic
- `/api/call-event` remains dynamic

## Other Checks

`npm run lint`:
- not run because no `lint` script exists in `package.json`

`npm run test`:
- not run because no `test` script exists in `package.json`

Custom QA:
- passed with `pnpm run qa`

TypeScript:
- passed with `pnpm run typecheck`

Sitemap artifact:
- `.next/server/app/sitemap.xml.body` contained 112 final-domain URLs
- no Vercel preview, ChatGPT Sites, localhost, admin, report, or draft URLs were found

PowerShell syntax checks:
- passed for Google Search Console helper scripts

Live URL checks:
- `https://plumbinghands.com`: reachable on Vercel
- `https://www.plumbinghands.com`: reachable on Vercel
- `https://plumbinghands.com/robots.txt`: reachable
- `https://plumbinghands.com/sitemap.xml`: reachable
