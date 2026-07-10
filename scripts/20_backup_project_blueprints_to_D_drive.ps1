$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$RepoRoot = Split-Path -Parent $PSScriptRoot
$TargetRoot = "D:\PPC_Project_Blueprints\PPC_Lead_Generation_Platform_Blueprint"

if (-not (Test-Path "D:\")) {
    Write-Host "D drive was not found on this machine."
    Write-Host "Run this script on the local laptop that has the D drive attached."
    exit 1
}

New-Item -ItemType Directory -Force -Path $TargetRoot | Out-Null

$itemsToBackup = @(
    "blueprints",
    "ops",
    "command-center",
    "manual-owner-steps",
    "reports",
    "ai-agents",
    "colab"
)

foreach ($item in $itemsToBackup) {
    $source = Join-Path $RepoRoot $item
    if (Test-Path $source) {
        $destination = Join-Path $TargetRoot $item
        if (Test-Path $destination) {
            Remove-Item -LiteralPath $destination -Recurse -Force
        }
        Copy-Item -LiteralPath $source -Destination $destination -Recurse -Force
        Write-Host "Backed up $item"
    }
}

$manifest = @"
PPC project blueprint backup
Source: $RepoRoot
Target: $TargetRoot
Created: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz")
Branch: $(git -C $RepoRoot rev-parse --abbrev-ref HEAD)
Commit: $(git -C $RepoRoot rev-parse HEAD)
"@

Set-Content -Path (Join-Path $TargetRoot "_backup_manifest.txt") -Value $manifest -Encoding UTF8
Write-Host "Backup complete: $TargetRoot"

