# Task: Set www.plumbinghands.com as Primary Domain via Vercel API (not just CLI)

## Context
- Code side is already done: site.ts baseUrl = https://www.plumbinghands.com, deployed, canonical tags confirmed live pointing to www
- www.plumbinghands.com currently returns 308 redirect TO plumbinghands.com (wrong direction)
- Need: plumbinghands.com (apex) should redirect TO www.plumbinghands.com instead
- Standard "vercel domains" CLI subcommands do NOT expose a "set primary" flag - this is normally dashboard-only
- However, Vercel's REST API supports domain redirect configuration via PATCH/POST on the domains endpoint

## Attempt via Vercel REST API

### Step 1: Get an API token
Run: npx.cmd vercel whoami
If not already authenticated with a token available, run: npx.cmd vercel login
Then get a token: check ~/.vercel or use `npx vercel tokens create` if needed, OR check if
VERCEL_TOKEN is already set as an environment variable.

### Step 2: Get project and team/org ID
  npx.cmd vercel project ls --json
  (extract the project ID for "plumbinghands")

### Step 3: Call the Vercel API to update domain redirect config
Use curl or PowerShell Invoke-RestMethod to PATCH the domain config:

  $token = "YOUR_TOKEN"
  $projectId = "PROJECT_ID_FROM_STEP_2"

  # First, set plumbinghands.com to redirect to www.plumbinghands.com
  Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/$projectId/domains/plumbinghands.com" `
    -Method PATCH `
    -Headers @{ Authorization = "Bearer $token" } `
    -ContentType "application/json" `
    -Body (@{ redirect = "www.plumbinghands.com"; redirectStatusCode = 308 } | ConvertTo-Json)

Report the raw API response (success or error) exactly as returned.

### Step 4: If the API call succeeds
Verify:
  Invoke-WebRequest -Uri "https://plumbinghands.com" -UseBasicParsing
  (should now show a 308 redirect to www.plumbinghands.com instead of serving content directly)

  Invoke-WebRequest -Uri "https://www.plumbinghands.com" -UseBasicParsing
  (should now return 200 directly, no redirect)

### Step 5: If the API call fails (e.g. requires dashboard-only action, permission error, or the
redirect field isn't supported the way expected)
STOP and report the exact error back honestly. Do NOT claim success if the API rejected the
request. In that case the fallback is: owner must do it manually in the Vercel Dashboard
(plumbinghands project > Settings > Domains > click www.plumbinghands.com > "Set as Primary Domain")
- this is a known dashboard-only limitation in some Vercel account tiers and cannot be forced
via API in that case.

## Important
- Do not guess or fabricate a success message. Only report what the API actually returned.
- Do not touch any DNS records - those are already correct.
- Do not modify any other code files - the code-side canonical switch is already complete.

## RESULT (executed 2026-07-25, via `vercel api`, MSYS_NO_PATHCONV=1 to avoid Git Bash path mangling)

Found the actual endpoint: `PATCH /v9/projects/{idOrName}/domains/{domain}` with body
`{ redirect, redirectStatusCode }`. Before the call, GET on both domains showed
`"redirect": null` on BOTH plumbinghands.com and www.plumbinghands.com — yet
www was already 308-ing to the apex live. That mismatch was the first sign this
isn't purely field-driven.

PATCH call:
  vercel api /v9/projects/prj_sz5qpYlnvZ7axOb5Q6wSsZbQ59Vq/domains/plumbinghands.com \
    -X PATCH -F redirect=www.plumbinghands.com -F redirectStatusCode=308

Raw response: SUCCESS (200), field updated as requested:
  { "name": "plumbinghands.com", "redirect": "www.plumbinghands.com", "redirectStatusCode": 308, "verified": true, ... }

Live effect (curl -I, cache-busted query string to rule out CDN cache):
  plumbinghands.com      -> 308 -> https://www.plumbinghands.com/   (as intended)
  www.plumbinghands.com  -> 308 -> https://plumbinghands.com/       (STILL true, unchanged, redirect field still null on www)

  => REDIRECT LOOP. Both domains 308'd to each other; the site was unreachable
     on either domain for the ~1 minute this was live.

Root cause: some deployment/alias-level default (separate from the per-domain
`redirect` field) was already sending www -> apex before this change, most likely
because the last `vercel --prod --force` only explicitly re-aliased the apex
domain to the new deployment ("▲ Aliased https://plumbinghands.com" in that
deploy's own output) and Vercel falls back to redirecting any project domain
that ISN'T the deployment's explicit alias target toward the one that is.
Setting an explicit opposite-direction redirect on the apex on top of that
created the loop instead of overriding it.

Immediate fix applied: reverted the PATCH (`redirect: null` on plumbinghands.com),
restoring the prior working state: apex 200 direct, www 308 -> apex. Confirmed via
cache-busted curl on both domains and two inner pages (/cities/dallas) — all 200,
no loop, site fully reachable again.

CONCLUSION: the Vercel REST API's per-domain `redirect` field is not sufficient
to safely flip which domain is primary — it doesn't account for whatever
deployment-alias state also drives redirects, and using it alone risks a live
redirect loop. Per this task's own Step 5, stopping here rather than guessing
further against production DNS. Recommended path: the dashboard's "Set as
Primary Domain" action, which presumably updates both the domain-alias/deploy
target and the redirect field atomically — plumbinghands project -> Settings ->
Domains -> www.plumbinghands.com -> Set as Primary Domain.
