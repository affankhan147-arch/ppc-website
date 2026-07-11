$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ScriptRepoRoot = Split-Path -Parent $PSScriptRoot
$PreferredRepoRoot = "C:\Users\dell\Documents\ppc-website"
$RepoRoot = if (Test-Path (Join-Path $ScriptRepoRoot ".git")) { $ScriptRepoRoot } elseif (Test-Path (Join-Path $PreferredRepoRoot ".git")) { $PreferredRepoRoot } else { $ScriptRepoRoot }
Set-Location $RepoRoot

$files = Get-ChildItem -Recurse -File | Where-Object {
    $_.FullName -notmatch "\\.git\\" -and
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.Name -notmatch "^\.env"
}

$commandFiles = Get-ChildItem ".\command-center" -File -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
$opsFiles = Get-ChildItem ".\ops" -File -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name

$content = @"
# Codex Minimum Context

## Project
PPC lead generation platform for organic SEO and AEO focused call generation.

## Current Phase
Command 2: DNS-safe reusable SEO + AEO lead-generation platform build.

Continue build work that does not require DNS ownership confirmation. Dallas-Fort Worth emergency plumbing and drain cleaning is Version 1.

## Repository
- GitHub: ``affankhan147-arch/ppc-website``
- Branch: ``master``
- GitHub is the central bridge.
- PowerShell is the local controller.
- Google Colab is the support lab.
- ChatGPT is the planner and command creator.
- Codex is the builder, tester, fixer, verifier, and reporter.

## Local File Count
$($files.Count)

## Command Files
$($commandFiles -join "`n")

## Ops Files
$($opsFiles -join "`n")

## Required First Reads
1. ``ops/MASTER_INTEGRATION_WORKFLOW.md``
2. ``ops/OPERATING_MANUAL.md``
3. ``ops/api_safety_policy.md``
4. ``ops/AEO_POLICY.md``
5. ``ops/seo_aeo_strategy.md``
6. ``command-center/NEXT_CODEX_TASK.txt``
7. ``reports/final_handoff.md``

## Active Safety Rules
Do not create paid ads.
Do not create Google Ads.
Do not create Bing Ads.
Do not create fake Google Business Profiles.
Do not create fake reviews.
Do not create fake addresses.
Do not create fake licenses.
Do not create fake insurance claims.
Do not copy competitor images.
Do not create fake local office claims.
Do not create spam backlinks.
Do not commit passwords, API keys, payment details, GitHub tokens, OpenAI keys, or private credentials.

## Manual Owner Steps
Only the owner handles account logins, GitHub or Google authorization, DNS, hosting, payment, ad platform approvals, production call tracking number setup, Search Console verification, and Bing verification.

## Deployment Context
- The ChatGPT/Codex Sites URL is a private preview/control URL, not the final production website.
- Current private preview/control URL: ``https://dfw-plumbing-connect.m-atifmuneer.chatgpt.site``
- Production domain target: ``https://plumbinghands.com``
- WWW production hostname: ``https://www.plumbinghands.com``
- DNS instructions are maintained in ``manual-owner-steps/DOMAIN_DNS_STEPS.md``.
- DNS and HTTPS are live on ``plumbinghands.com`` and ``www.plumbinghands.com``. Google Search Console TXT verification is the next owner action. Bing, IndexNow, citation submissions, outreach, and final launch remain pending.
- Use ``plumbinghands.com`` for ``.env.example``, sitemap guidance, robots guidance, canonical URL guidance, Search Console guidance, Bing Webmaster guidance, and deployment notes.

## Command 2 Status
Command 2 DNS setup is complete. Current required setup: Google Search Console owner verification, sitemap submission after verification, Bing next, and IndexNow only after Bing verification.
"@

Set-Content -Path ".\ops\codex_minimum_context.md" -Value $content -Encoding UTF8
Write-Host "Updated ops/codex_minimum_context.md"
