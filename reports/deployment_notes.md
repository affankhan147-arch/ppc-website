# Deployment Notes

The app is prepared for DNS-safe development from GitHub branch master. Vercel is now the production hosting target.

Temporary Vercel production URL:
https://plumbinghands.vercel.app

Final production domains:
- https://plumbinghands.com
- https://www.plumbinghands.com

The ChatGPT/Codex `chatgpt.site` URL is a private preview/control URL and must not be treated as the final production website. ChatGPT Sites is no longer the final production target.

## Vercel Readiness

- Framework: Next.js
- Build script: `next build`
- Local Codex npm status: `npm` executable unavailable in this runtime
- Verified build path: Vercel-style Next production build passed from the D project root
- Output directory: Vercel default for Next.js
- Root directory: repository root
- Required runtime environment values: see `.env.example`

Do not commit `.vercel/` local link metadata or Vercel tokens.

Canonical URL guidance:
- `.env.example` sets `SITE_DOMAIN=plumbinghands.com` and `NEXT_PUBLIC_SITE_URL=https://plumbinghands.com`.
- Sitemap URLs are generated from `siteConfig.baseUrl`, which resolves to https://plumbinghands.com.
- Robots points crawlers to https://plumbinghands.com/sitemap.xml when production env values are used.

Confirmed:
- Hostinger DNS points to Vercel
- HTTPS works on https://plumbinghands.com and https://www.plumbinghands.com
- robots.txt works
- sitemap.xml works
- Google Search Console is verified
- Google sitemap was submitted
- Homepage indexing was requested
- IndexNow key is live
- 112 URLs were submitted to IndexNow with status 202

Pending owner action:
- real tracked phone number
- production service request handling endpoint
- analytics IDs if owner wants GA4, GTM, or Clarity
- optional Bing Webmaster dashboard review later
- final public growth approval

Manual needs: real tracking phone number, production environment variables, approved request handling endpoint, analytics values if used, and verified provider partner details before publishing any provider-specific claims.

Do not commit private credentials.
