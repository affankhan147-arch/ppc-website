# Deployment Notes

The app is prepared for deployment from GitHub branch master and has a Sites-compatible vinext worker package.

Manual needs after Sites deployment: custom production domain if desired, real tracking phone number, environment variables, Search Console verification, Bing verification, and DNS approval.

Private Sites production URL:
https://dfw-plumbing-connect.m-atifmuneer.chatgpt.site

Access status:
- The `chatgpt.site` URL is private/custom access and may show a permission page to visitors who are not allowed in the Sites access policy.
- It is a preview/control URL, not the final production website.
- To make this preview public, the owner must explicitly ask Codex to switch Sites access mode to public.

Custom domain target:
https://plumbinghands.com

DNS provider detected from nameservers:
`ns1.dns-parking.com` and `ns2.dns-parking.com`

Required DNS records:

Root domain:
- `A` record for `@` to `162.159.143.30`
- `A` record for `@` to `172.66.3.26`
- `TXT` record `_openai-site-verification` with value `openai-site-verification=9kmC7UkZ_q4kj-kyT9D2yzxfChEBJ5jX6ldD4cYy7E4`
- `TXT` record `_cf-custom-hostname` with value `841c231c-8c90-444e-8617-e7126a8e3a6e`

WWW subdomain:
- `CNAME` record `www` to `custom-domains.chatgpt.site.`
- `TXT` record `_openai-site-verification.www` with value `openai-site-verification=Q9K0jUeEKtwVMGe6x3vIkD4AETfUrSf7EbkXDlJV84c`
- `TXT` record `_cf-custom-hostname.www` with value `2f114ba2-584d-4a8f-88dd-2600f004e5d2`

Do not commit private credentials.
