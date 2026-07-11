# Deployment Manual Steps

Codex prepared the app and deployment notes in DNS-safe mode. The final
production domain is `https://plumbinghands.com` with `https://www.plumbinghands.com`
as the www hostname.

Do not treat any temporary `chatgpt.site` preview URL as the final production
website.

## Owner Steps
1. Ask the Hostinger DNS owner to add the records in `manual-owner-steps/DOMAIN_DNS_STEPS.md`.
2. Add environment variables from `.env.example` with real owner-approved values.
3. Replace sample tracking phone number values.
4. Deploy from GitHub branch `master` or continue using the approved Sites deployment.
5. Confirm `https://plumbinghands.com/sitemap.xml`.
6. Confirm `https://plumbinghands.com/robots.txt`.
7. Confirm canonical URLs use `https://plumbinghands.com`.
8. Confirm forms and call tracking use owner-approved endpoints.
9. Verify Search Console and Bing only after DNS and HTTPS are active.
10. Submit sitemap and run IndexNow only after verification succeeds.

Do not add payment methods, DNS changes, or private credentials through Codex.
