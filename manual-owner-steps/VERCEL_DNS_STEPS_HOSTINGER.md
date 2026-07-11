# Vercel DNS steps for Hostinger

Final production hosting:
Vercel

Final domain:
https://plumbinghands.com
https://www.plumbinghands.com

In Hostinger:
Domains → plumbinghands.com → DNS / Nameservers → DNS records

Do not change nameservers.
Do not reset DNS records.
Do not delete MX/email records if any exist.

Delete old records if present:
CNAME  www  plumbinghands.com
A      @    2.57.91.91

Add Vercel records:
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com

After DNS:
1. Wait 15 to 60 minutes.
2. Open https://plumbinghands.com
3. Open https://www.plumbinghands.com
4. Confirm HTTPS works.
5. Only then start Google Search Console, Bing, sitemap submission, and IndexNow.
