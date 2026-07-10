param(
    [string]$Message = "Update workflow integration system"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

Write-Host "Repo: $RepoRoot"
Write-Host "Running secret-shaped value scan..."
$secretMatches = Get-ChildItem -Recurse -File |
    Where-Object {
        $_.FullName -notmatch "\\.git\\" -and
        $_.FullName -notmatch "\\node_modules\\" -and
        $_.FullName -notmatch "\\.next\\" -and
        $_.Name -notmatch "^\.env$"
    } |
    Select-String -Pattern 'sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}' -ErrorAction SilentlyContinue

if ($secretMatches) {
    Write-Host "Possible secret-shaped values found. Review before committing:"
    $secretMatches | ForEach-Object { Write-Host "$($_.Path):$($_.LineNumber)" }
    exit 1
}

git status --short --branch
git add command-center ops scripts colab colab-output inbox-from-chatgpt outbox-to-codex manual-owner-steps reports blueprints ai-agents README.md .gitignore .env.example

$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
    Write-Host "Nothing to commit. Repo is clean."
} else {
    git commit -m $Message
    git push origin master
}

git status --short --branch
