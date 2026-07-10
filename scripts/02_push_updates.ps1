$ErrorActionPreference = "Stop"
Set-Location "$env:USERPROFILE\Documents\ppc-website"
git status
git add .
$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
    Write-Host "Nothing to commit. Repo is clean."
} else {
    $msg = Read-Host "Commit message"
    if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "Update PPC project files" }
    git commit -m "$msg"
    git push origin master
}
git status
