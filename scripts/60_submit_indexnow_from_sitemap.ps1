param(
    [switch]$DryRun,
    [switch]$Submit
)

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
$ErrorActionPreference = "Stop"

$ConfigPath = Join-Path (Get-Location) "scripts\indexnow.config.json"
$Cfg = [System.IO.File]::ReadAllText($ConfigPath) | ConvertFrom-Json

$Endpoint = "https://api.indexnow.org/indexnow"
$ReportPath = ".\reports\indexnow_submission_report.md"

if (-not $Submit) {
    $DryRun = $true
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

Write-Host "URLs found:" $Urls.Count -ForegroundColor Green

$Mode = "DRY RUN"
if ($Submit) {
    $Mode = "SUBMIT"
}

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

if ($Urls.Count -eq 0) {
    throw "No valid URLs found in sitemap."
}

if ($DryRun -and -not $Submit) {
    Write-Host "DRY RUN ONLY. No URLs submitted." -ForegroundColor Yellow
    $Report += "Status: Dry run only. No URLs submitted."
    $Report += ""
    $Report += "First 25 URLs:"
    $Urls | Select-Object -First 25 | ForEach-Object {
        $Report += "- $_"
    }

    $Report | Set-Content $ReportPath -Encoding UTF8
    notepad $ReportPath
    exit 0
}

$Payload = @{
    host = $Cfg.host
    key = $Cfg.key
    keyLocation = $Cfg.keyLocation
    urlList = @($Urls)
} | ConvertTo-Json -Depth 10

Write-Host "Submitting to IndexNow..." -ForegroundColor Cyan

try {
    $Response = Invoke-WebRequest -Uri $Endpoint -Method POST -Body $Payload -ContentType "application/json; charset=utf-8" -UseBasicParsing -TimeoutSec 120

    Write-Host "IndexNow response:" $Response.StatusCode -ForegroundColor Green

    $Report += "Submission status: $($Response.StatusCode)"
    $Report += "Response:"
    $Report += "```"
    $Report += $Response.Content
    $Report += "```"
}
catch {
    Write-Host "IndexNow submission error:" -ForegroundColor Red
    Write-Host $_.Exception.Message

    $Report += "Submission status: ERROR"
    $Report += "Error:"
    $Report += "```"
    $Report += $_.Exception.Message
    $Report += "```"
}

$Report += ""
$Report += "URLs:"
$Urls | ForEach-Object {
    $Report += "- $_"
}

$Report | Set-Content $ReportPath -Encoding UTF8
notepad $ReportPath
