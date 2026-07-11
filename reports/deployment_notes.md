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

Pending until Hostinger DNS is confirmed:
- Hostinger DNS record update
- custom domain verification in Vercel
- HTTPS validation on https://plumbinghands.com and https://www.plumbinghands.com
- Google Search Console verification
- Bing Webmaster verification
- sitemap submission
- IndexNow submission
- final public launch

Manual needs: Hostinger DNS record update, real tracking phone number, production environment variables, owner-approved buyer routing endpoints, Search Console verification, Bing verification, and DNS approval.

Do not commit private credentials.
