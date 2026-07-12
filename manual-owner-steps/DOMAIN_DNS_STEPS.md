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
- Google Search Console is verified.
- Google sitemap was submitted.
- Homepage indexing was requested.
- IndexNow key is live and 112 URLs were submitted with status `202`.
- Bing Webmaster dashboard setup is optional later because discovery through IndexNow is complete.

Owner-only steps:

1. Do not add the previous ChatGPT Sites DNS records.
2. Use Vercel as the production hosting target.
3. Keep Hostinger DNS records unchanged unless Vercel or the owner requests a change.
4. Do not resubmit the sitemap or IndexNow URLs unless there is a new owner-approved indexing task.
5. Add analytics and real call tracking only through approved hosting environment variables.

Do not let Codex make payment, registrar, or DNS account changes without explicit owner approval.
