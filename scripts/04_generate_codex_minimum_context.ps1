$ErrorActionPreference = "Stop"
Set-Location "$env:USERPROFILE\Documents\ppc-website"

$files = Get-ChildItem -Recurse -File | Where-Object {
    $_.FullName -notmatch "\\.git\\" -and
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.next\\" -and
    $_.Name -notmatch "^\.env"
} | Select-Object FullName, Length

$totalFiles = $files.Count
$commandFiles = Get-ChildItem ".\command-center" -File -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
$opsFiles = Get-ChildItem ".\ops" -File -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name

$content = @"
# Codex Minimum Context

## Project
Pay Per Call household niche authority website.

## Main rule
Organic SEO first. No paid ads until organic calls and income start.

## Repo status
Run git status before work.

## Total tracked local files found
$totalFiles

## Command files
$($commandFiles -join "`n")

## Ops files
$($opsFiles -join "`n")

## What Codex should do
1. Read this file first.
2. Read command-center final 3-day command.
3. Use ops trackers and summaries.
4. Avoid scanning raw large files unless needed.
5. Build, test, fix, and report.

## What Codex must not do
1. Do not create ads.
2. Do not spend money.
3. Do not create fake GMBs.
4. Do not create fake reviews.
5. Do not use fake addresses.
6. Do not copy competitor images.
7. Do not expose API keys.

## Manual owner steps
Only ask owner for login, DNS, verification, payment approval, or account permission steps.
"@

Set-Content -Path ".\ops\codex_minimum_context.md" -Value $content -Encoding UTF8
Write-Host "Created ops/codex_minimum_context.md"
