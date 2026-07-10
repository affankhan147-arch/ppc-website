$ErrorActionPreference = "Stop"
Write-Host "Checking GitHub CLI auth..."
gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in. Starting GitHub browser login..."
    gh auth login
}
gh auth setup-git
Write-Host "GitHub auth ready."
