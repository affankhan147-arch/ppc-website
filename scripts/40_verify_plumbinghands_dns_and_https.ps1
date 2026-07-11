$ErrorActionPreference = "Continue"
Set-StrictMode -Version Latest

$ExpectedApexA = "76.76.21.21"
$ExpectedWwwCname = "cname.vercel-dns.com"
$ApexDomain = "plumbinghands.com"
$WwwDomain = "www.plumbinghands.com"

function Write-Check {
    param(
        [string]$Name,
        [string]$Status,
        [string]$Detail
    )

    $prefix = switch ($Status) {
        "PASS" { "[PASS]" }
        "WAITING" { "[WAITING]" }
        default { "[FAIL]" }
    }

    Write-Host "$prefix $Name - $Detail"
}

function Get-ARecords {
    param([string]$Domain)

    try {
        @(Resolve-DnsName -Name $Domain -Type A -ErrorAction Stop | Where-Object { $_.IPAddress } | Select-Object -ExpandProperty IPAddress)
    } catch {
        @()
    }
}

function Get-CnameRecords {
    param([string]$Domain)

    try {
        @(Resolve-DnsName -Name $Domain -Type CNAME -ErrorAction Stop | Where-Object { $_.NameHost } | Select-Object -ExpandProperty NameHost)
    } catch {
        @()
    }
}

function Test-Url {
    param([string]$Url)

    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -MaximumRedirection 5 -TimeoutSec 30 -UseBasicParsing
        [pscustomobject]@{
            Ok = $true
            StatusCode = [int]$response.StatusCode
            Detail = "HTTP $([int]$response.StatusCode)"
        }
    } catch {
        [pscustomobject]@{
            Ok = $false
            StatusCode = 0
            Detail = $_.Exception.Message
        }
    }
}

Write-Host "DNS and HTTPS verification for Plumbing Hands"
Write-Host "No indexing, Google, Bing, IndexNow, citation, or outreach submission is performed."
Write-Host ""

$apexA = @(Get-ARecords -Domain $ApexDomain)
$apexReady = $apexA -contains $ExpectedApexA
if ($apexReady) {
    Write-Check "A record $ApexDomain" "PASS" "found $ExpectedApexA"
} elseif ($apexA.Count -gt 0) {
    Write-Check "A record $ApexDomain" "WAITING" "current: $($apexA -join ', '); expected: $ExpectedApexA"
} else {
    Write-Check "A record $ApexDomain" "FAIL" "no A record found; expected: $ExpectedApexA"
}

$wwwCname = @(Get-CnameRecords -Domain $WwwDomain)
$wwwCnameNormalized = @($wwwCname | ForEach-Object { $_.TrimEnd(".") })
$wwwReady = $wwwCnameNormalized -contains $ExpectedWwwCname
if ($wwwReady) {
    Write-Check "CNAME $WwwDomain" "PASS" "found $ExpectedWwwCname"
} elseif ($wwwCname.Count -gt 0) {
    Write-Check "CNAME $WwwDomain" "WAITING" "current: $($wwwCname -join ', '); expected: $ExpectedWwwCname"
} else {
    Write-Check "CNAME $WwwDomain" "WAITING" "no CNAME found yet; expected: $ExpectedWwwCname"
}

Write-Host ""
Write-Host "nslookup $ApexDomain"
nslookup $ApexDomain

Write-Host ""
Write-Host "nslookup $WwwDomain"
nslookup $WwwDomain

Write-Host ""
foreach ($url in @(
    "https://plumbinghands.com",
    "https://www.plumbinghands.com",
    "https://plumbinghands.com/robots.txt",
    "https://plumbinghands.com/sitemap.xml"
)) {
    $result = Test-Url -Url $url
    $requiresReadyDns = if ($url -like "https://www.*") { $wwwReady } else { $apexReady }
    if ($result.Ok -and $requiresReadyDns) {
        Write-Check $url "PASS" $result.Detail
    } elseif ($result.Ok) {
        Write-Check $url "WAITING" "$($result.Detail), but Vercel DNS is not active yet"
    } else {
        Write-Check $url "WAITING" $result.Detail
    }
}

Write-Host ""
Write-Host "Summary: PASS means ready, WAITING means DNS/HTTPS propagation likely still pending, FAIL means the required DNS record is missing."
