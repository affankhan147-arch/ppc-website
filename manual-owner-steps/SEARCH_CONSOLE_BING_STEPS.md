# Search Console And Bing Webmaster Steps

Production domain:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

Current status:
- Vercel production is live.
- Hostinger DNS points to Vercel.
- HTTPS works on apex and www.
- `https://plumbinghands.com/robots.txt` works.
- `https://plumbinghands.com/sitemap.xml` works.
- Google Search Console verification is pending owner action.
- Bing Webmaster verification is pending until Google is complete.
- IndexNow is pending until Bing is verified.

## Google First

Use:
- `manual-owner-steps/GOOGLE_SEARCH_CONSOLE_STEP_BY_STEP.md`
- `manual-owner-steps/GOOGLE_SITEMAP_SUBMISSION_CHECKLIST.md`
- `scripts/50_open_google_search_console_setup.ps1`
- `scripts/51_add_google_search_console_txt_to_hostinger.ps1`
- `scripts/52_check_google_txt_dns.ps1`

Owner-only steps:

1. Run `scripts/50_open_google_search_console_setup.ps1`.
2. In Google Search Console, choose Domain property.
3. Enter `plumbinghands.com`.
4. Copy the TXT value beginning with `google-site-verification=`.
5. Keep the Google verification page open.
6. Run `scripts/51_add_google_search_console_txt_to_hostinger.ps1`.
7. Wait 5 to 15 minutes.
8. Click `VERIFY` in Google Search Console.
9. Submit `https://plumbinghands.com/sitemap.xml`.
10. Inspect `https://plumbinghands.com`.
11. Request indexing for the homepage only.

## Bing Next

Use:
- `manual-owner-steps/BING_WEBMASTER_NEXT_AFTER_GOOGLE.md`

Do not start Bing until Google ownership verification and sitemap submission are complete.

## IndexNow Later

Use:
- `manual-owner-steps/INDEXNOW_PENDING.md`

Do not run IndexNow until Bing Webmaster is verified and the sitemap is submitted.

Do not commit verification secrets, API tokens, or account credentials to the repo.
