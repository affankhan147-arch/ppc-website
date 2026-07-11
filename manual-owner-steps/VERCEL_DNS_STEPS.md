# Vercel DNS Steps

Status: pending Vercel-generated records.

Final production domains:
- `plumbinghands.com`
- `www.plumbinghands.com`

DNS provider:
- Hostinger DNS is controlled by the owner/friend.

## Important

Do not add or change DNS yet. First deploy/import the project in Vercel and add
both domains to the Vercel project. Then copy the exact records Vercel provides
into this file.

## Pending Records

Root domain, `plumbinghands.com`:
- record type: `PENDING_FROM_VERCEL`
- host/name: `PENDING_FROM_VERCEL`
- value/target: `PENDING_FROM_VERCEL`
- TTL: Hostinger default unless Vercel says otherwise

WWW hostname, `www.plumbinghands.com`:
- record type: `PENDING_FROM_VERCEL`
- host/name: `PENDING_FROM_VERCEL`
- value/target: `PENDING_FROM_VERCEL`
- TTL: Hostinger default unless Vercel says otherwise

Verification record, if Vercel requests one:
- record type: `PENDING_FROM_VERCEL`
- host/name: `PENDING_FROM_VERCEL`
- value/target: `PENDING_FROM_VERCEL`
- TTL: Hostinger default unless Vercel says otherwise

## Hostinger Owner Instructions

1. Wait until Vercel displays the exact required DNS records.
2. Remove conflicting old records for `@` or `www` only after confirming the Vercel replacement records.
3. Add the exact Vercel records in Hostinger.
4. Wait for propagation.
5. Ask Codex to verify DNS and HTTPS.

## Still Blocked Until DNS Works

- Google Search Console verification
- Bing Webmaster verification
- sitemap submission
- IndexNow submission
- citation submissions
- outreach/backlink work
- final public launch
