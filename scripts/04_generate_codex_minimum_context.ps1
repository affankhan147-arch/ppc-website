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
Command 2: reusable SEO + AEO lead-generation platform build.

The website build has started. Dallas-Fort Worth emergency plumbing and drain cleaning is Version 1.

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

## Command 2 Status
Command 2 has been implemented in source code and reports. Latest required verification: report generation, custom QA, Next production build, D-drive backup, GitHub commit, and push.
"@

Set-Content -Path ".\ops\codex_minimum_context.md" -Value $content -Encoding UTF8
Write-Host "Updated ops/codex_minimum_context.md"
