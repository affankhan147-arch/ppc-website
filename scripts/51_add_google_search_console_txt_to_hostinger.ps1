$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Domain = "plumbinghands.com"
$ApiBase = "https://developers.hostinger.com"
$Desktop = [Environment]::GetFolderPath("Desktop")
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$BackupPath = Join-Path $Desktop "plumbinghands-hostinger-dns-backup-$Timestamp.json"
$LogPath = Join-Path $Desktop "plumbinghands-google-search-console-txt-$Timestamp.log"

function Write-Log {
    param([string]$Message)

    $line = "$(Get-Date -Format "yyyy-MM-dd HH:mm:ss") $Message"
    Write-Host $line
    Add-Content -LiteralPath $LogPath -Value $line
}

function Convert-SecureStringToPlainText {
    param([securestring]$SecureValue)

    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)
    try {
        [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    } finally {
        if ($bstr -ne [IntPtr]::Zero) {
            [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
        }
    }
}

Write-Host "Google Search Console TXT setup for $Domain"
Write-Host "This script adds or updates only this DNS record:"
Write-Host "TXT @ google-site-verification=..."
Write-Host ""
Write-Host "It will not reset DNS, change nameservers, remove Vercel records, or remove MX/email records."
Write-Host "A backup of current DNS records will be saved to your Desktop before the update."
Write-Host ""

$secureToken = Read-Host "Paste Hostinger API token" -AsSecureString
$apiToken = Convert-SecureStringToPlainText -SecureValue $secureToken
if ([string]::IsNullOrWhiteSpace($apiToken)) {
    throw "Hostinger API token was empty."
}

$googleTxt = Read-Host "Paste Google TXT value"
$googleTxt = $googleTxt.Trim().Trim('"').Trim("'")
if (-not $googleTxt.StartsWith("google-site-verification=")) {
    throw "Invalid Google TXT value. It must begin with google-site-verification="
}

$headers = @{
    Authorization = "Bearer $apiToken"
    Accept = "application/json"
    "Content-Type" = "application/json"
}

New-Item -ItemType File -Path $LogPath -Force | Out-Null
Write-Log "Starting Google TXT DNS update for $Domain."
Write-Log "The Hostinger API token is used only in memory and is not written to the log."

$getUrl = "$ApiBase/api/dns/v1/zones/$Domain"
Write-Log "Fetching current DNS records for backup."
$currentDns = Invoke-RestMethod -Method Get -Uri $getUrl -Headers $headers
$currentDns | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $BackupPath -Encoding UTF8
Write-Log "DNS backup saved to $BackupPath"

$vercelAOk = $false
$vercelCnameOk = $false
foreach ($record in @($currentDns)) {
    if ($record.name -eq "@" -and $record.type -eq "A") {
        foreach ($item in @($record.records)) {
            if ($item.content -eq "76.76.21.21") { $vercelAOk = $true }
        }
    }
    if ($record.name -eq "www" -and $record.type -eq "CNAME") {
        foreach ($item in @($record.records)) {
            if ($item.content.TrimEnd(".") -eq "cname.vercel-dns.com") { $vercelCnameOk = $true }
        }
    }
}

if (-not $vercelAOk) {
    Write-Log "WARNING: Existing DNS backup did not show A @ 76.76.21.21. Continuing because this script will not change A records."
}
if (-not $vercelCnameOk) {
    Write-Log "WARNING: Existing DNS backup did not show CNAME www cname.vercel-dns.com. Continuing because this script will not change CNAME records."
}

$body = @{
    overwrite = $false
    zone = @(
        @{
            name = "@"
            type = "TXT"
            ttl = 14400
            records = @(
                @{
                    content = $googleTxt
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

$validateUrl = "$ApiBase/api/dns/v1/zones/$Domain/validate"
Write-Log "Validating TXT record with Hostinger before update."
Invoke-RestMethod -Method Post -Uri $validateUrl -Headers $headers -Body $body | Out-Null
Write-Log "Validation passed."

$updateUrl = "$ApiBase/api/dns/v1/zones/$Domain"
Write-Log "Adding/updating TXT @ record with overwrite=false."
Invoke-RestMethod -Method Put -Uri $updateUrl -Headers $headers -Body $body | Out-Null
Write-Log "Hostinger DNS update request completed."

Write-Log "Running nslookup -type=TXT $Domain"
nslookup -type=TXT $Domain | Tee-Object -FilePath $LogPath -Append

Write-Log "Opening Google Search Console."
Start-Process "https://search.google.com/search-console/welcome"

Write-Host ""
Write-Host "Done. Wait 5 to 15 minutes, then return to Google Search Console and click VERIFY."
Write-Host "Backup: $BackupPath"
Write-Host "Log: $LogPath"

$apiToken = $null
$headers.Authorization = $null
