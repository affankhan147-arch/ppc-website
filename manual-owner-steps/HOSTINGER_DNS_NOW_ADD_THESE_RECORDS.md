# Hostinger DNS: Add These Vercel Records

Open Hostinger:
Domains -> plumbinghands.com -> DNS / Nameservers -> DNS records

Do not change nameservers.
Do not reset DNS records.
Do not delete MX/email records if any exist.

Delete old records if present:

```text
CNAME  www  plumbinghands.com
A      @    2.57.91.91
```

Add Vercel records:

```text
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

Then wait 15 to 60 minutes.

Test:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

Do not submit Google Search Console, Bing Webmaster, sitemap, IndexNow,
citations, or outreach until HTTPS works on both final domains.
