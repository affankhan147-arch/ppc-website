# Git for DSH app agents inside the DeepSeek Harness sandbox ("Workspace Write").
# Why: git's normal GitHub login helper runs through sh.exe, which the sandbox blocks
# ("couldn't create signal pipe"). This uses the GitHub CLI login (gh auth token) for one git
# command at a time, passed as a header. The token is never printed or saved.
# Usage, from the repo folder:
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 sync              # checkout master + pull --ff-only
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 push              # push the current dsh/* branch, then confirm on GitHub
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\dsh-git.ps1 branches "dsh/*-PH-020"   # list matching branches on GitHub
param([Parameter(Mandatory = $true)][ValidateSet("sync", "push", "branches")][string]$Action, [string]$Arg = "")

$token = gh auth token 2>$null
if (-not $token) { Write-Output "BLOCKED: GitHub CLI is not logged in. Sunny: run 'gh auth login' once."; exit 1 }
$basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("x-access-token:$token"))
$auth = @("-c", "credential.helper=", "-c", "credential.https://github.com.helper=",
          "-c", "http.https://github.com/.extraheader=AUTHORIZATION: basic $basic")
Remove-Variable token -ErrorAction SilentlyContinue
$env:GIT_TERMINAL_PROMPT = "0"
$code = 0

switch ($Action) {
  "sync" {
    git checkout master 2>&1 | Select-Object -Last 2
    if ($LASTEXITCODE) { Write-Output "BLOCKED: git checkout master failed"; $code = 1; break }
    git @auth pull --ff-only 2>&1 | Select-Object -Last 2
    if ($LASTEXITCODE) { Write-Output "BLOCKED: git pull failed"; $code = 1 } else { Write-Output "SYNCED master" }
  }
  "push" {
    $branch = if ($Arg) { $Arg } else { git branch --show-current }
    if ($branch -notlike "dsh/*") { Write-Output "BLOCKED: only dsh/* branches may be pushed (current: '$branch')"; $code = 1; break }
    $out = git @auth push -u origin "$branch" 2>&1 | Select-Object -Last 3
    $found = git @auth ls-remote --heads origin "$branch" 2>$null
    if ($found) { Write-Output "PUSHED $branch" } else { Write-Output "BLOCKED: push failed"; $out | ForEach-Object { Write-Output "  $_" }; $code = 1 }
  }
  "branches" {
    $pattern = if ($Arg) { $Arg } else { "dsh/*" }
    $list = git @auth ls-remote --heads origin "$pattern" 2>$null
    if ($list) { $list | ForEach-Object { ($_ -split "refs/heads/")[1] } } else { Write-Output "(none)" }
  }
}
Remove-Variable basic, auth -ErrorAction SilentlyContinue
exit $code
