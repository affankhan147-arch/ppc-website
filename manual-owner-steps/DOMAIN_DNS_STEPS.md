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
- Hostinger DNS changes are pending with the domain owner/friend.
- Exact Hostinger DNS records are in `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`.
- Domain verification is pending.
- HTTPS on the custom domain is pending.
- Google/Bing verification and indexing are pending.
- Do not submit sitemap, Bing, or IndexNow until Vercel DNS and HTTPS are live.

Owner-only steps:

1. Do not add the previous ChatGPT Sites DNS records.
2. Use Vercel as the production hosting target.
3. Have the Hostinger DNS owner add only the records in `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`.
4. Wait 15 to 60 minutes.
5. Ask Codex to run `scripts/40_verify_plumbinghands_dns_and_https.ps1`.

Do not let Codex make payment, registrar, or DNS account changes without explicit owner approval.
