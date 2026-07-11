# Post Vercel Deployment Report

## Vercel Production URL

Temporary Vercel production URL:
`https://plumbinghands.vercel.app`

Final public SEO domains:
- `https://plumbinghands.com`
- `https://www.plumbinghands.com`

## Build Status

- `npm install`: attempted, but unavailable because the local Codex runtime has no `npm` executable.
- `npm run build`: attempted, but unavailable because the local Codex runtime has no `npm` executable.
- Vercel-style Next production build: passed from the D project root.
- Generated static pages: 242.
- Dynamic API routes: `/api/lead`, `/api/call-event`.
- QA script: passed from the D project root.

## Files Changed

- `.env.example`
- `src/data/site.ts`
- `src/app/layout.tsx`
- `ops/codex_minimum_context.md`
- `command-center/NEXT_CODEX_TASK.txt`
- `command-center/NEXT_CODEX_TASK_AFTER_DNS.txt`
- `manual-owner-steps/DEPLOYMENT_MANUAL_STEPS.md`
- `manual-owner-steps/DOMAIN_DNS_STEPS.md`
- `manual-owner-steps/HOSTINGER_DNS_NOW_ADD_THESE_RECORDS.md`
- `manual-owner-steps/MANUAL_OWNER_STEPS.md`
- `manual-owner-steps/POST_DNS_INDEXING_CHECKLIST.md`
- `manual-owner-steps/SEARCH_CONSOLE_BING_STEPS.md`
- `manual-owner-steps/VERCEL_DEPLOYMENT_STEPS.md`
- `manual-owner-steps/VERCEL_DNS_STEPS_HOSTINGER.md`
- `scripts/40_verify_plumbinghands_dns_and_https.ps1`
- `reports/vercel_deployment_readiness_report.md`
- `reports/post_vercel_deployment_report.md`

## DNS Records To Add In Hostinger

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

## Still Blocked By DNS

- `https://plumbinghands.com`
- `https://www.plumbinghands.com`
- final HTTPS verification
- final-domain robots verification
- final-domain sitemap verification
- Google Search Console
- Bing Webmaster Tools
- sitemap submission
- IndexNow
- citations
- outreach

## Owner Must Do Next

Open Hostinger:
Domains -> plumbinghands.com -> DNS / Nameservers -> DNS records

Do not change nameservers.
Do not reset DNS records.
Do not delete MX/email records if any exist.

Add the Vercel records above, wait 15 to 60 minutes, then ask Codex to run:

```powershell
.\scripts\40_verify_plumbinghands_dns_and_https.ps1
```

## Next Codex Task After DNS Works

Use:
`command-center/NEXT_CODEX_TASK_AFTER_DNS.txt`
