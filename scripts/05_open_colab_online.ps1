$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ScriptRepoRoot = Split-Path -Parent $PSScriptRoot
$PreferredRepoRoot = "C:\Users\dell\Documents\ppc-website"
$RepoRoot = if (Test-Path (Join-Path $ScriptRepoRoot ".git")) { $ScriptRepoRoot } elseif (Test-Path (Join-Path $PreferredRepoRoot ".git")) { $PreferredRepoRoot } else { $ScriptRepoRoot }
$ColabUrl = "https://colab.research.google.com/github/affankhan147-arch/ppc-website/blob/master/colab/ppc_online_workflow.ipynb"

Write-Host "Repo: $RepoRoot"
Write-Host "Opening online Google Colab notebook:"
Write-Host $ColabUrl
Start-Process $ColabUrl
