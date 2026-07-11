# Vercel DNS Steps For Hostinger

Final production hosting:
Vercel

Temporary Vercel production URL:
`https://plumbinghands.vercel.app`

Final public SEO domains:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

Open Hostinger:
Domains -> plumbinghands.com -> DNS / Nameservers -> DNS records

Do not change nameservers.
Do not reset DNS records.
Do not delete MX/email records if any exist.
Do not add ChatGPT Sites DNS records.

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
- `https://plumbinghands.com/robots.txt`
- `https://plumbinghands.com/sitemap.xml`

Do not start Google Search Console, Bing Webmaster, sitemap submission,
IndexNow, citations, outreach, or final public launch until both final domains
open the real Vercel site with HTTPS.
