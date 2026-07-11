# Domain And DNS Steps

## Preview Access

The `chatgpt.site` deployment URL is a Codex/Sites preview and control URL. It
is not the final production website URL.

Current preview URL:
`https://dfw-plumbing-connect.m-atifmuneer.chatgpt.site`

Current access status:
- private/custom access
- visible only to the allowed owner account in Sites
- visitors who are not allowed by the Sites access policy may see a permission
  page

To make the preview publicly accessible, explicitly ask Codex to switch the
Sites access mode to public. After that change, anyone with the preview URL can
visit it.

ChatGPT Sites DNS instructions are paused. Vercel is the final production
hosting target.

## Production Domain

Final production hostnames:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

DNS-safe status:
- Vercel production deployment exists at `https://plumbinghands.vercel.app`.
- Hostinger DNS now points to Vercel.
- Apex DNS is `A @ 76.76.21.21`.
- WWW DNS is `CNAME www cname.vercel-dns.com`.
- Exact Vercel DNS records are archived in `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`.
- HTTPS works on `https://plumbinghands.com` and `https://www.plumbinghands.com`.
- Google Search Console verification is pending owner action.
- Bing and IndexNow are pending until Google verification and sitemap submission are complete.

Owner-only steps:

1. Do not add the previous ChatGPT Sites DNS records.
2. Use Vercel as the production hosting target.
3. Run `scripts/50_open_google_search_console_setup.ps1`.
4. Copy the Google TXT value from Search Console.
5. Run `scripts/51_add_google_search_console_txt_to_hostinger.ps1`.

Do not let Codex make payment, registrar, or DNS account changes without explicit owner approval.
