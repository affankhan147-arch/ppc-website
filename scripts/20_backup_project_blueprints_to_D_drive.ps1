$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ScriptRepoRoot = Split-Path -Parent $PSScriptRoot
$PreferredRepoRoot = "C:\Users\dell\Documents\ppc-website"
$RepoRoot = if (Test-Path (Join-Path $ScriptRepoRoot ".git")) { $ScriptRepoRoot } elseif (Test-Path (Join-Path $PreferredRepoRoot ".git")) { $PreferredRepoRoot } else { $ScriptRepoRoot }
$TargetRoot = "D:\PPC_Project_Blueprints\PPC_Lead_Generation_Platform_Blueprint"

if (-not (Test-Path "D:\")) {
    Write-Host "D drive not found. Blueprint archive remains inside the repo under blueprints/."
    exit 1
}

New-Item -ItemType Directory -Force -Path $TargetRoot | Out-Null

$itemsToBackup = @(
    "blueprints",
    "ai-agents",
    "manual-owner-steps",
    "colab",
    "reports"
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

$opsFiles = @(
    "PROJECT_BLUEPRINT.md",
    "business_model.md",
    "marketing_strategy.md",
    "AEO_POLICY.md",
    "seo_aeo_strategy.md",
    "OPERATING_MANUAL.md",
    "EPICS.md",
    "platform_architecture.md",
    "scaling_plan_2_year.md",
    "safety_rules.md"
)

$opsTarget = Join-Path $TargetRoot "ops"
New-Item -ItemType Directory -Force -Path $opsTarget | Out-Null
foreach ($file in $opsFiles) {
    $source = Join-Path (Join-Path $RepoRoot "ops") $file
    if (Test-Path $source) {
        Copy-Item -LiteralPath $source -Destination (Join-Path $opsTarget $file) -Force
        Write-Host "Backed up ops/$file"
    }
}

$commandTarget = Join-Path $TargetRoot "command-center"
New-Item -ItemType Directory -Force -Path $commandTarget | Out-Null
Get-ChildItem -Path (Join-Path $RepoRoot "command-center") -File -ErrorAction SilentlyContinue |
    Copy-Item -Destination $commandTarget -Force

$reportSource = Join-Path $RepoRoot "reports\full_workflow_integration_report.md"
if (Test-Path $reportSource) {
    $reportTarget = Join-Path $TargetRoot "reports"
    New-Item -ItemType Directory -Force -Path $reportTarget | Out-Null
    Copy-Item -LiteralPath $reportSource -Destination (Join-Path $reportTarget "full_workflow_integration_report.md") -Force
}

$readme = @"
README START HERE

This folder is the reusable PPC lead-generation blueprint archive.

To reuse for another city or home-service niche:
1. Copy the blueprint archive into a new repo.
2. Choose the active vertical and market.
3. Update data/config files for services, cities, buyers, FAQs, problems, and cost guides.
4. Keep safety rules: no fake GBP, fake addresses, fake reviews, fake licenses, fake insurance claims, copied competitor images, spam backlinks, or repo secrets.
5. Run build, QA, reports, and backup before launch.
"@

Set-Content -Path (Join-Path $TargetRoot "README_START_HERE.txt") -Value $readme -Encoding UTF8

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
