$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$RepoRoot = Split-Path -Parent $PSScriptRoot
$GitHubUrl = "https://github.com/affankhan147-arch/ppc-website"
$ColabUrl = "https://colab.research.google.com/github/affankhan147-arch/ppc-website/blob/master/colab/ppc_online_workflow.ipynb"

Write-Host "Opening local repo and workflow tools..."
Start-Process $RepoRoot
Start-Process (Join-Path $RepoRoot "command-center")
Start-Process (Join-Path $RepoRoot "manual-owner-steps")
Start-Process $GitHubUrl
Start-Process $ColabUrl

Write-Host "Opened workflow folders and browser links."

