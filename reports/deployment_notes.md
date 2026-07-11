# Deployment Notes

The app is prepared for DNS-safe development from GitHub branch master.

Final production domains:
- https://plumbinghands.com
- https://www.plumbinghands.com

The ChatGPT/Codex `chatgpt.site` URL is a private preview/control URL and must not be treated as the final production website.

Canonical URL guidance:
- `.env.example` sets `SITE_DOMAIN=plumbinghands.com` and `NEXT_PUBLIC_SITE_URL=https://plumbinghands.com`.
- Sitemap URLs are generated from `siteConfig.baseUrl`, which resolves to https://plumbinghands.com.
- Robots points crawlers to https://plumbinghands.com/sitemap.xml when production env values are used.

Pending until Hostinger DNS is confirmed:
- custom domain verification
- HTTPS validation on https://plumbinghands.com and https://www.plumbinghands.com
- Google Search Console verification
- Bing Webmaster verification
- sitemap submission
- IndexNow submission
- final public launch

Manual needs: real tracking phone number, production environment variables, owner-approved buyer routing endpoints, Search Console verification, Bing verification, and DNS approval.

Do not commit private credentials.
