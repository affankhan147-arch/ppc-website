# Search Console And Bing Webmaster Steps

Production domain target:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

DNS-safe status:
- Vercel production hosting exists at `https://plumbinghands.vercel.app`.
- DNS is pending with the Hostinger DNS owner.
- Google Search Console verification is pending.
- Bing Webmaster verification is pending.
- Sitemap submission is pending.
- IndexNow submission is pending.
- Do not submit anything until DNS resolves to the approved production hosting target.

Owner-only steps:

1. Wait for the Hostinger DNS owner to add the records in `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`.
2. Ask Codex to run `scripts/40_verify_plumbinghands_dns_and_https.ps1`.
3. Open Google Search Console.
4. Add `plumbinghands.com` as the domain property or add `https://plumbinghands.com` as a URL-prefix property.
5. Add the verification token through DNS or the approved hosting verification method.
6. Confirm canonical URLs use `https://plumbinghands.com`.
7. Confirm robots points to `https://plumbinghands.com/sitemap.xml`.
8. Submit `https://plumbinghands.com/sitemap.xml` only after verification succeeds.
9. Open Bing Webmaster Tools.
10. Add `https://plumbinghands.com` and verify ownership.
11. Submit `https://plumbinghands.com/sitemap.xml` only after verification succeeds.
12. Run IndexNow only after DNS, HTTPS, and Bing verification are confirmed.

Do not commit verification secrets or account tokens to the repo.
