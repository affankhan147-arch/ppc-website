$ErrorActionPreference = "Continue"
Set-StrictMode -Version Latest

$Domain = "plumbinghands.com"
$SearchConsoleUrl = "https://search.google.com/search-console/welcome"

Write-Host "Google Search Console TXT DNS checker for $Domain"
Write-Host ""

$expected = Read-Host "Paste expected Google TXT value"
$expected = $expected.Trim().Trim('"').Trim("'")

if (-not $expected.StartsWith("google-site-verification=")) {
    Write-Host "[FAIL] Expected value must begin with google-site-verification="
    Start-Process $SearchConsoleUrl
    exit 1
}

Write-Host ""
Write-Host "Running nslookup -type=TXT $Domain"
$lookupText = (nslookup -type=TXT $Domain) -join "`n"
Write-Host $lookupText
Write-Host ""

if ($lookupText -like "*$expected*") {
    Write-Host "[PASS] Google TXT value found in DNS."
    Write-Host "Go back to Google Search Console and click VERIFY."
} else {
    Write-Host "[WAITING] Google TXT value not found yet."
    Write-Host "Wait 5 to 15 minutes, then run this checker again."
}

Start-Process $SearchConsoleUrl
