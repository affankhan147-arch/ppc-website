# Deployment Manual Steps

Codex prepared the app and deployment notes in DNS-safe mode. Vercel is now the
production hosting target, and Hostinger DNS now points to Vercel.

The final production domain is `https://plumbinghands.com` with
`https://www.plumbinghands.com` as the www hostname.

Do not treat any temporary `chatgpt.site` preview URL as the final production
website.

Temporary Vercel production URL:
`https://plumbinghands.vercel.app`

## Owner Steps
1. Follow `manual-owner-steps/VERCEL_DEPLOYMENT_STEPS.md`.
2. Keep the Hostinger Vercel DNS records in place.
3. Add environment variables from `.env.example` in Vercel with real owner-approved values.
4. Replace sample tracking phone number values before public launch.
5. Deploy from GitHub branch `master` on Vercel.
6. Add `plumbinghands.com` and `www.plumbinghands.com` in Vercel.
7. Confirm `https://plumbinghands.com` and `https://www.plumbinghands.com`.
8. Run `scripts/50_open_google_search_console_setup.ps1`.
9. Copy the Google TXT value and run `scripts/51_add_google_search_console_txt_to_hostinger.ps1`.
10. Confirm `https://plumbinghands.com/sitemap.xml`.
11. Confirm `https://plumbinghands.com/robots.txt`.
12. Confirm canonical URLs use `https://plumbinghands.com`.
13. Confirm forms and call tracking use owner-approved endpoints.
14. Verify Google Search Console, submit the sitemap, and request homepage indexing only.
15. Prepare Bing and IndexNow only after Google verification succeeds.

Do not add payment methods, DNS changes, or private credentials through Codex.
