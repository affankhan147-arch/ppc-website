# Google Search Console Step By Step

This guide is for the owner. It does not require coding.

Goal:
- Prove to Google that you own `plumbinghands.com`.
- Submit the sitemap after Google verifies ownership.
- Request indexing for the homepage only.

Do not create ads. Do not create a Google Business Profile. Do not create reviews, fake address, fake license, or fake office claims.

## Before You Start

Keep these open:
- Google Search Console: `https://search.google.com/search-console/welcome`
- Website: `https://plumbinghands.com`
- Sitemap: `https://plumbinghands.com/sitemap.xml`
- Robots: `https://plumbinghands.com/robots.txt`

## Step 1: Open Google Search Console

1. Open this link:
   `https://search.google.com/search-console/welcome`
2. Log in with the Google account you want to use for this website.
3. If Google asks you to choose a property type, choose:
   `Domain`
4. In the domain box, enter:
   `plumbinghands.com`
5. Click Continue.

## Step 2: Copy The Google TXT Record

Google will show a DNS TXT verification record.

It usually looks like this:

```text
google-site-verification=xxxxxxxxxxxxxxxx
```

Copy only the TXT value.

Correct:

```text
google-site-verification=xxxxxxxxxxxxxxxx
```

Wrong:

```text
TXT google-site-verification=xxxxxxxxxxxxxxxx
```

Wrong:

```text
plumbinghands.com google-site-verification=xxxxxxxxxxxxxxxx
```

Do not close the Google Search Console verification page yet.

## Step 3: Add The TXT Record To Hostinger DNS

Run this PowerShell script from the project folder:

```powershell
.\scripts\51_add_google_search_console_txt_to_hostinger.ps1
```

The script will ask for:
- Hostinger API token
- Google TXT value

The script will:
- back up the current Hostinger DNS records to your Desktop
- add or update only `TXT @ google-site-verification=...`
- keep Vercel A and CNAME records
- keep MX/email records
- keep nameservers unchanged
- open Google Search Console when done

## Step 4: Wait

Wait 5 to 15 minutes after the script finishes.

Sometimes DNS can take longer. If Google does not verify immediately, wait and try again.

## Step 5: Verify In Google Search Console

Go back to the Google Search Console verification page.

Click:
`VERIFY`

If verification fails:
1. Wait 10 more minutes.
2. Run this checker:

```powershell
.\scripts\52_check_google_txt_dns.ps1
```

3. Try `VERIFY` again in Google Search Console.

## Step 6: Submit The Sitemap

After Google verifies ownership:

1. In Google Search Console, open the `plumbinghands.com` property.
2. Click `Sitemaps`.
3. Submit:

```text
https://plumbinghands.com/sitemap.xml
```

If Google only asks for the path, submit:

```text
sitemap.xml
```

Submitting a sitemap helps Google discover pages. It does not guarantee indexing.

## Step 7: Inspect The Homepage

1. Open `URL Inspection`.
2. Enter:

```text
https://plumbinghands.com
```

3. After Google checks the page, click `Request indexing` for the homepage only.

Do not request indexing for dozens of pages today unless Codex gives a later instruction.

## Stop Point

After Google verification and homepage indexing request, stop.

Next step will be Bing Webmaster setup.
