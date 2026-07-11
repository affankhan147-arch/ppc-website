param(
    [switch]$DryRun,
    [switch]$Submit
)

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
$ErrorActionPreference = "Stop"

$ConfigPath = Join-Path (Get-Location) "scripts\indexnow.config.json"
$ReportPath = Join-Path (Get-Location) "reports\indexnow_submission_report.md"
$Endpoint = "https://api.indexnow.org/indexnow"

if (!(Test-Path $ConfigPath)) {
    throw "Missing scripts\indexnow.config.json. Run the IndexNow setup command first."
}

$Cfg = Get-Content $ConfigPath -Raw | ConvertFrom-Json

if (-not $Submit) {
    $DryRun = $true
}

Write-Host "Checking IndexNow key file..." -ForegroundColor Cyan
Write-Host $Cfg.keyLocation

try {
    $KeyBody = (Invoke-WebRequest -Uri $Cfg.keyLocation -UseBasicParsing -TimeoutSec 30).Content.Trim()
    if ($KeyBody -ne $Cfg.key) {
        throw "IndexNow key file content does not match config key."
    }
    Write-Host "PASS: IndexNow key file is live and correct." -ForegroundColor Green
}
catch {
    Write-Host "WAIT/FAIL: IndexNow key file is not live or not correct yet." -ForegroundColor Yellow
    Write-Host $_.Exception.Message
    Write-Host "Wait 2-5 minutes for Vercel deployment, then run this script again."
    exit 1
}

Write-Host "Reading sitemap..." -ForegroundColor Cyan
Write-Host $Cfg.sitemap

$XmlText = (Invoke-WebRequest -Uri $Cfg.sitemap -UseBasicParsing -TimeoutSec 60).Content
$Matches = [regex]::Matches($XmlText, "<loc>(.*?)</loc>")

$Urls = @()

foreach ($M in $Matches) {
    $Url = [System.Net.WebUtility]::HtmlDecode($M.Groups[1].Value.Trim())

    if (
        $Url -like "https://plumbinghands.com*" -and
        $Url -notlike "*localhost*" -and
        $Url -notlike "*.vercel.app*" -and
        $Url -notlike "*chatgpt*" -and
        $Url -notlike "*/admin/*" -and
        $Url -notlike "*/draft/*" -and
        $Url -notlike "*/reports/*"
    ) {
        $Urls += $Url
    }
}

$Urls = $Urls | Sort-Object -Unique

if ($Urls.Count -eq 0) {
    throw "No valid PlumbingHands URLs found in sitemap."
}

Write-Host "URLs found for IndexNow: $($Urls.Count)" -ForegroundColor Green

$Mode = "DRY RUN"
if ($Submit) { $Mode = "SUBMIT" }

$Report = @()
$Report += "# IndexNow Submission Report"
$Report += ""
$Report += "Time: $(Get-Date)"
$Report += "Mode: $Mode"
$Report += "Host: $($Cfg.host)"
$Report += "Key location: $($Cfg.keyLocation)"
$Report += "Sitemap: $($Cfg.sitemap)"
$Report += "URL count: $($Urls.Count)"
$Report += ""

if ($DryRun -and -not $Submit) {
    Write-Host "DRY RUN ONLY. No URLs submitted." -ForegroundColor Yellow
    $Report += "Status: Dry run only. No URLs submitted."
    $Report += ""
    $Report += "First 25 URLs:"
    foreach ($U in ($Urls | Select-Object -First 25)) {
        $Report += "- $U"
    }
    $Report | Set-Content $ReportPath -Encoding UTF8
    Write-Host "Report saved: $ReportPath" -ForegroundColor Green
    notepad $ReportPath
    exit 0
}

$PayloadObject = @{
    host = $Cfg.host
    key = $Cfg.key
    keyLocation = $Cfg.keyLocation
    urlList = @($Urls)
}

$Payload = $PayloadObject | ConvertTo-Json -Depth 10

Write-Host "Submitting URLs to IndexNow..." -ForegroundColor Cyan

try {
    $Response = Invoke-WebRequest -Uri $Endpoint -Method POST -Body $Payload -ContentType "application/json" -UseBasicParsing -TimeoutSec 120
    Write-Host "IndexNow response status: $($Response.StatusCode)" -ForegroundColor Green

    $Report += "Submission status: $($Response.StatusCode)"
    $Report += "Response content:"
    $Report += $Response.Content
}
catch {
    Write-Host "IndexNow submission error:" -ForegroundColor Red
    Write-Host $_.Exception.Message

    $Report += "Submission status: ERROR"
    $Report += "Error:"
    $Report += $_.Exception.Message
}

$Report += ""
$Report += "Submitted URLs:"
foreach ($U in $Urls) {
    $Report += "- $U"
}

$Report | Set-Content $ReportPath -Encoding UTF8
Write-Host "Report saved: $ReportPath" -ForegroundColor Green
notepad $ReportPath
