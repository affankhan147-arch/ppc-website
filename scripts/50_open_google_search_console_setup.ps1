$ErrorActionPreference = "Continue"
Set-StrictMode -Version Latest

$RepoRoot = Split-Path -Parent $PSScriptRoot
$GuidePath = Join-Path $RepoRoot "manual-owner-steps\GOOGLE_SEARCH_CONSOLE_STEP_BY_STEP.md"
$SearchConsoleUrl = "https://search.google.com/search-console/welcome"
$SiteUrl = "https://plumbinghands.com"
$RobotsUrl = "https://plumbinghands.com/robots.txt"
$SitemapUrl = "https://plumbinghands.com/sitemap.xml"

Write-Host "Opening Google Search Console setup tools for Plumbing Hands."
Write-Host ""

Start-Process $SearchConsoleUrl
Start-Process $SiteUrl
Start-Process $RobotsUrl
Start-Process $SitemapUrl

try {
    Set-Clipboard -Value $SitemapUrl
    Write-Host "[OK] Sitemap URL copied to clipboard: $SitemapUrl"
} catch {
    Write-Host "[WAITING] Could not copy sitemap URL to clipboard: $($_.Exception.Message)"
}

if (Test-Path -LiteralPath $GuidePath) {
    Start-Process notepad.exe -ArgumentList "`"$GuidePath`""
    Write-Host "[OK] Manual guide opened in Notepad."
} else {
    Write-Host "[WAITING] Manual guide not found at $GuidePath"
}

Write-Host ""
Write-Host "Next steps:"
Write-Host "1. In Google Search Console, choose Domain property."
Write-Host "2. Enter plumbinghands.com."
Write-Host "3. Copy the TXT value that begins with google-site-verification=."
Write-Host "4. Keep the Google verification page open."
Write-Host "5. Run: .\scripts\51_add_google_search_console_txt_to_hostinger.ps1"
Write-Host ""
Write-Host "Do not start ads, citations, outreach, or IndexNow from this step."
