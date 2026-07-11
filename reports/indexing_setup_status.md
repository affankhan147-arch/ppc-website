# Indexing Setup Status

Date: 2026-07-12

## Live Domain Status

- `https://plumbinghands.com`: live on Vercel
- `https://www.plumbinghands.com`: live on Vercel
- `https://plumbinghands.com/robots.txt`: live
- `https://plumbinghands.com/sitemap.xml`: live
- Apex DNS: `A @ 76.76.21.21`
- WWW DNS: `CNAME www cname.vercel-dns.com`

## Google Search Console

Status: pending owner action.

Owner must open Google Search Console, create a Domain property for `plumbinghands.com`, copy the Google TXT value, add it to Hostinger DNS, verify ownership, and then submit the sitemap.

Manual guide:
- `manual-owner-steps/GOOGLE_SEARCH_CONSOLE_STEP_BY_STEP.md`

Opener script:
- `scripts/50_open_google_search_console_setup.ps1`

Google TXT Hostinger script:
- `scripts/51_add_google_search_console_txt_to_hostinger.ps1`

Google TXT checker:
- `scripts/52_check_google_txt_dns.ps1`

## Sitemap URL

```text
https://plumbinghands.com/sitemap.xml
```

## Bing Webmaster

Status: pending.

Guide:
- `manual-owner-steps/BING_WEBMASTER_NEXT_AFTER_GOOGLE.md`

Do not start Bing until Google verification and sitemap submission are complete.

## IndexNow

Status: pending.

Guide:
- `manual-owner-steps/INDEXNOW_PENDING.md`

Do not run IndexNow until Bing Webmaster is verified and the sitemap is submitted.

## What Owner Must Do Next

Run:

```powershell
.\scripts\50_open_google_search_console_setup.ps1
```

Then copy the Google TXT value that begins with:

```text
google-site-verification=
```

Then run:

```powershell
.\scripts\51_add_google_search_console_txt_to_hostinger.ps1
```
