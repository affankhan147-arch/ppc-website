# Deployment Manual Steps

Codex prepared the app and deployment notes in DNS-safe mode. Vercel is now the
production hosting target.

The final production domain is `https://plumbinghands.com` with
`https://www.plumbinghands.com` as the www hostname.

Do not treat any temporary `chatgpt.site` preview URL as the final production
website.

Temporary Vercel production URL:
`https://plumbinghands.vercel.app`

## Owner Steps
1. Follow `manual-owner-steps/VERCEL_DEPLOYMENT_STEPS.md`.
2. Add the Hostinger DNS records from `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`.
3. Add environment variables from `.env.example` in Vercel with real owner-approved values.
4. Replace sample tracking phone number values before public launch.
5. Deploy from GitHub branch `master` on Vercel.
6. Add `plumbinghands.com` and `www.plumbinghands.com` in Vercel.
7. Have the Hostinger DNS owner add the exact Vercel records.
9. Confirm `https://plumbinghands.com/sitemap.xml`.
10. Confirm `https://plumbinghands.com/robots.txt`.
11. Confirm canonical URLs use `https://plumbinghands.com`.
12. Confirm forms and call tracking use owner-approved endpoints.
13. Verify Search Console and Bing only after DNS and HTTPS are active.
14. Submit sitemap and run IndexNow only after verification succeeds.

Do not add payment methods, DNS changes, or private credentials through Codex.
