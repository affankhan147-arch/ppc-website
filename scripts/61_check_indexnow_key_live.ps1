Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
$ErrorActionPreference = "Stop"

$ConfigPath = Join-Path (Get-Location) "scripts\indexnow.config.json"
$Cfg = [System.IO.File]::ReadAllText($ConfigPath) | ConvertFrom-Json

Write-Host "Checking IndexNow key file..." -ForegroundColor Cyan
Write-Host $Cfg.keyLocation

try {
    $Body = (Invoke-WebRequest -Uri $Cfg.keyLocation -UseBasicParsing -TimeoutSec 30).Content.Trim()

    if ($Body -eq $Cfg.key) {
        Write-Host "PASS: IndexNow key file is live and correct." -ForegroundColor Green
    } else {
        Write-Host "FAIL: Key file is live but content does not match." -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "WAITING: Key file is not live yet. Wait 2-5 minutes and run this script again." -ForegroundColor Yellow
    Write-Host $_.Exception.Message
    exit 1
}

Write-Host "Checking sitemap..." -ForegroundColor Cyan

$Sitemap = Invoke-WebRequest -Uri $Cfg.sitemap -UseBasicParsing -TimeoutSec 30

if ($Sitemap.StatusCode -eq 200) {
    Write-Host "PASS: Sitemap is reachable." -ForegroundColor Green
} else {
    Write-Host "FAIL: Sitemap problem." -ForegroundColor Red
    exit 1
}
