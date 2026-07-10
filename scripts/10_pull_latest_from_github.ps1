$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ScriptRepoRoot = Split-Path -Parent $PSScriptRoot
$PreferredRepoRoot = "C:\Users\dell\Documents\ppc-website"
$RepoRoot = if (Test-Path (Join-Path $ScriptRepoRoot ".git")) { $ScriptRepoRoot } elseif (Test-Path (Join-Path $PreferredRepoRoot ".git")) { $PreferredRepoRoot } else { $ScriptRepoRoot }
Set-Location $RepoRoot

Write-Host "Repo: $RepoRoot"
Write-Host "Checking branch..."
$branch = git rev-parse --abbrev-ref HEAD
if ($branch -ne "master") {
    Write-Host "Switching to master..."
    git checkout master
}

Write-Host "Pulling latest from GitHub..."
git fetch origin master
git pull --ff-only origin master

Write-Host "Current status:"
git status --short --branch
