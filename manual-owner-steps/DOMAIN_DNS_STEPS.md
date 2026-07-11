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

ChatGPT Sites DNS instructions are paused while Vercel is being considered as
the final production hosting target.

## Production Domain

Final production hostnames:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

DNS-safe status:
- Vercel deployment path is being prepared.
- Hostinger DNS changes are pending with the domain owner/friend.
- Vercel-generated DNS records are pending.
- Domain verification is pending.
- HTTPS on the custom domain is pending.
- Google/Bing verification and indexing are pending.
- Do not submit sitemap, Bing, or IndexNow until Vercel DNS and HTTPS are live.

Owner-only steps:

1. Do not add the previous ChatGPT Sites DNS records.
2. Import/deploy the project in Vercel first.
3. Add `plumbinghands.com` and `www.plumbinghands.com` to the Vercel project.
4. Copy the exact Vercel-generated DNS records into `manual-owner-steps/VERCEL_DNS_STEPS.md`.
5. Have the Hostinger DNS owner add only those Vercel records.
6. Wait for DNS propagation, then ask Codex to verify domain and HTTPS status.

Do not let Codex make payment, registrar, or DNS account changes without explicit owner approval.
