$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ScriptRepoRoot = Split-Path -Parent $PSScriptRoot
$PreferredRepoRoot = "C:\Users\dell\Documents\ppc-website"
$RepoRoot = if (Test-Path (Join-Path $ScriptRepoRoot ".git")) { $ScriptRepoRoot } elseif (Test-Path (Join-Path $PreferredRepoRoot ".git")) { $PreferredRepoRoot } else { $ScriptRepoRoot }
$GitHubUrl = "https://github.com/affankhan147-arch/ppc-website"
$ColabUrl = "https://colab.research.google.com/github/affankhan147-arch/ppc-website/blob/master/colab/ppc_online_workflow.ipynb"
$ChatGptUrl = "https://chatgpt.com"
$CodexUrl = "https://chatgpt.com/codex"

Write-Host "Opening local repo and workflow tools..."
Start-Process $RepoRoot
Start-Process (Join-Path $RepoRoot "command-center")
Start-Process (Join-Path $RepoRoot "manual-owner-steps")
Start-Process $GitHubUrl
Start-Process $ColabUrl
Start-Process $ChatGptUrl
Start-Process $CodexUrl

Write-Host "Opened workflow folders and browser links."
