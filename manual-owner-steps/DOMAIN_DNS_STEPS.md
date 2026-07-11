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
visit it. Keep using `plumbinghands.com` as the production domain target.

## Production Domain

Owner-only steps:

1. Log in directly to the DNS provider for `plumbinghands.com`.
2. Add these root-domain records:
   - `A` record for `@` to `162.159.143.30`
   - `A` record for `@` to `172.66.3.26`
   - `TXT` record `_openai-site-verification` with value `openai-site-verification=9kmC7UkZ_q4kj-kyT9D2yzxfChEBJ5jX6ldD4cYy7E4`
   - `TXT` record `_cf-custom-hostname` with value `841c231c-8c90-444e-8617-e7126a8e3a6e`
3. Add these `www` records:
   - `CNAME` record `www` to `custom-domains.chatgpt.site.`
   - `TXT` record `_openai-site-verification.www` with value `openai-site-verification=Q9K0jUeEKtwVMGe6x3vIkD4AETfUrSf7EbkXDlJV84c`
   - `TXT` record `_cf-custom-hostname.www` with value `2f114ba2-584d-4a8f-88dd-2600f004e5d2`
4. Remove conflicting `A`, `AAAA`, or `CNAME` records for `@` and `www` if the DNS provider warns about conflicts.
5. Wait for DNS propagation, then ask Codex to refresh domain validation.

Do not let Codex make payment, registrar, or DNS account changes without explicit owner approval.
