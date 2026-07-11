# Vercel DNS Steps

Status: exact Hostinger DNS records are prepared. DNS is still pending owner action.

Temporary Vercel production URL:
`https://plumbinghands.vercel.app`

Final production domains:
- `plumbinghands.com`
- `www.plumbinghands.com`

DNS provider:
- Hostinger DNS is controlled by the owner/friend.

## Important

Do not change nameservers.
Do not reset DNS records.
Do not delete MX/email records if any exist.
Do not add ChatGPT Sites DNS records while Vercel is the production hosting target.

## Delete Old Conflicting Records If Present

```text
CNAME  www  plumbinghands.com
A      @    2.57.91.91
```

## Add These Vercel Records

```text
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

TTL:
- Use Hostinger default unless Vercel specifically asks for another value.

Verification record:
- Add only if Vercel displays a separate verification record in project domain settings.
- Do not invent a verification value.

## Hostinger Owner Instructions

1. Open Hostinger: Domains -> plumbinghands.com -> DNS / Nameservers -> DNS records.
2. Remove only the conflicting old `@` and `www` records listed above if present.
3. Add the Vercel `A` and `CNAME` records exactly as listed.
4. Wait 15 to 60 minutes.
5. Ask Codex to verify DNS and HTTPS with `scripts/40_verify_plumbinghands_dns_and_https.ps1`.

## Still Blocked Until DNS Works

- Google Search Console verification
- Bing Webmaster verification
- sitemap submission
- IndexNow submission
- citation submissions
- outreach/backlink work
- final public launch
