# Vercel Deployment Steps

Status: Vercel production deployment exists.

Current temporary Vercel production URL:
`https://plumbinghands.vercel.app`

Final production domains:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

ChatGPT/Codex Sites status:
- Keep the `chatgpt.site` URL as preview/control only.
- Do not treat it as the final production website.
- Do not add ChatGPT Sites DNS records while Vercel is being considered as the final host.

## Project Readiness

The repository is a standard Next.js project and is Vercel-ready:
- framework: Next.js
- package manager: npm or pnpm; `package-lock.json` and `pnpm-lock.yaml` both currently exist
- build script: `next build`
- output directory: Vercel default for Next.js
- root directory: repository root

Codex local note:
- The local Codex runtime used for verification does not expose an `npm` binary.
- The Vercel-style Next production build was verified from the D project root with the available package manager.
- The `package.json` `build` script remains compatible with `npm run build`.

## Owner Steps

1. Confirm Vercel deployment opens at `https://plumbinghands.vercel.app`.
2. Confirm Vercel is linked to GitHub repo `affankhan147-arch/ppc-website`.
3. Confirm framework preset: Next.js.
4. Confirm root directory: repository root.
5. Confirm build command uses `npm run build` or the equivalent `next build` script.
6. Add production environment variables from `.env.example`.
7. Keep Google/Bing verification values blank until the owner copies real verification tokens.
8. Confirm domains are added in Vercel project settings:
   - `plumbinghands.com`
   - `www.plumbinghands.com`
9. Keep the Hostinger Vercel DNS records in place.
10. Confirm:
   - `https://plumbinghands.com`
   - `https://www.plumbinghands.com`
   - `https://plumbinghands.com/sitemap.xml`
   - `https://plumbinghands.com/robots.txt`

## Do Not Do Yet

- Do not change Hostinger DNS to any non-Vercel value; the owner should only add the exact records in `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`.
- Do not submit Google Search Console until owner TXT verification succeeds.
- Do not submit Bing Webmaster Tools.
- Do not submit sitemap.
- Do not run IndexNow.
- Do not start citation submissions.
- Do not start backlink outreach.
- Do not create paid ads.
- Do not create fake Google Business Profiles, reviews, addresses, licenses, insurance claims, or office claims.
- Do not copy competitor images.

## Pre-Launch Checklist

- Replace placeholder tracking phone values with owner-approved call tracking.
- Approve real buyer routing endpoints.
- Confirm all canonical URLs use `https://plumbinghands.com`.
- Confirm sitemap and robots use `https://plumbinghands.com`.
- Confirm forms and call buttons use owner-approved destinations.
- Confirm Vercel deployment is production-ready before Bing verification and IndexNow.
