# Vercel DNS steps for plumbinghands.com

Final production hosting target:
Vercel

Final domain:
https://plumbinghands.com
https://www.plumbinghands.com

In Hostinger DNS, remove these old records if present:

CNAME  www  plumbinghands.com
A      @    2.57.91.91

Add these Vercel records, unless Vercel dashboard shows different values:

A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com

Do not change nameservers.
Do not reset DNS records.
Do not delete MX/email records if they exist.

After DNS is added:
1. Wait 15 to 60 minutes.
2. Check https://plumbinghands.com
3. Check https://www.plumbinghands.com
4. Confirm HTTPS works.
5. Only then start Google Search Console, Bing, sitemap submission, and IndexNow.
