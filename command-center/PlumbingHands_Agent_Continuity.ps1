#Requires -Version 5.1
<#
.SYNOPSIS
Creates, resumes, and verifies a controlled Google Antigravity handoff for PlumbingHands.
#>

[CmdletBinding()]
param(
    [ValidateSet('Status', 'Prepare', 'Resume', 'Verify')]
    [string]$Mode = 'Status',
    [string]$RepositoryRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$Branch = 'codex/workflow-resume-20260716',
    [string]$TaskPath,
    [string]$BundlePath,
    [switch]$AllowDirtyWorktree
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ExpectedRepository = 'affankhan147-arch/ppc-website'
$ProjectOwner = 'Sana Ul Haque'
$OwnerEmail = 'affan.khan147@gmail.com'
$Repo = $null
$Log = New-Object 'System.Collections.Generic.List[string]'

function Write-Log {
    param([string]$Text = '')
    $Log.Add($Text)
    Write-Host $Text
}

function Full-Path {
    param([string]$Path, [string]$Base)
    if ([IO.Path]::IsPathRooted($Path)) { return [IO.Path]::GetFullPath($Path) }
    if ([string]::IsNullOrWhiteSpace($Base)) { $Base = (Get-Location).Path }
    return [IO.Path]::GetFullPath((Join-Path $Base $Path))
}

function Inside-Repo {
    param([string]$Path)
    $full = Full-Path -Path $Path -Base $Repo
    $prefix = $Repo.TrimEnd([char[]]@([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)) + [IO.Path]::DirectorySeparatorChar
    if (-not $full.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase) -and -not $full.Equals($Repo, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Path is outside the verified repository: $full"
    }
    return $full
}

function Relative-Path {
    param([string]$Path)
    $full = Inside-Repo $Path
    return ($full.Substring($Repo.Length).TrimStart([char[]]@('\', '/')) -replace '\\', '/')
}

function Read-Git {
    param([string[]]$Arguments, [switch]$AllowFailure)
    $output = & git -C $Repo @Arguments 2>&1
    $code = $LASTEXITCODE
    $text = (($output | ForEach-Object { [string]$_ }) -join [Environment]::NewLine).TrimEnd()
    if ($code -ne 0 -and -not $AllowFailure) {
        throw "Git inspection failed with exit code $code.`n$text"
    }
    return [pscustomobject]@{ Code = $code; Text = $text }
}

function Get-Context {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git is not available on PATH.' }
    $script:Repo = Full-Path -Path $RepositoryRoot
    if (-not (Test-Path -LiteralPath $Repo -PathType Container)) { throw "Repository root does not exist: $Repo" }
    $script:Repo = Full-Path -Path (Read-Git @('rev-parse', '--show-toplevel')).Text

    $remote = (Read-Git @('remote', 'get-url', 'origin')).Text
    $match = [regex]::Match($remote, 'github\.com[:/](?<repo>[^/\s]+/[^/\s]+?)(?:\.git)?$', 'IgnoreCase')
    $repository = if ($match.Success) { $match.Groups['repo'].Value -replace '\.git$', '' } else { $null }
    if ($repository -ne $ExpectedRepository) { throw "Repository mismatch. Expected $ExpectedRepository; found '$repository'." }

    $currentBranch = (Read-Git @('branch', '--show-current')).Text
    if ($currentBranch -ne $Branch) { throw "Branch mismatch. Expected '$Branch'; found '$currentBranch'." }
    if ($currentBranch -in @('master', 'main')) { throw 'Agent continuity cannot run on the default branch.' }

    $head = (Read-Git @('rev-parse', 'HEAD')).Text
    $status = (Read-Git @('status', '--porcelain')).Text
    $unexpected = @()
    foreach ($line in @($status -split "`r?`n")) {
        if ([string]::IsNullOrWhiteSpace($line)) { continue }
        $path = if ($line.Length -gt 3) { $line.Substring(3).Trim() } else { $line.Trim() }
        $path = $path -replace '\\', '/'
        $allowed = $path -like 'command-center/antigravity-queue/*' -or $path -match '^reports/agent_continuity_[0-9]{8}-[0-9]{6}\.txt$'
        if (-not $allowed) { $unexpected += $line }
    }
    if ($unexpected.Count -gt 0 -and -not $AllowDirtyWorktree) {
        throw "Working tree contains changes outside generated continuity artifacts.`n$($unexpected -join [Environment]::NewLine)"
    }

    $classification = if ([string]::IsNullOrWhiteSpace($status)) { 'clean' } elseif ($unexpected.Count -eq 0) { 'generated continuity artifacts only' } else { 'dirty (explicitly allowed)' }
    return [pscustomobject]@{ Repository = $repository; Branch = $currentBranch; Head = $head; Status = $classification }
}

function Resolve-Task {
    if (-not [string]::IsNullOrWhiteSpace($TaskPath)) {
        $path = Inside-Repo $TaskPath
        if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Task file not found: $path" }
        return $path
    }

    $fallback = Join-Path $Repo 'command-center/fallback-queue'
    if (Test-Path $fallback) {
        foreach ($file in (Get-ChildItem $fallback -File -Filter '*.txt' | Where-Object Name -ne 'TASK_TEMPLATE.txt' | Sort-Object LastWriteTimeUtc -Descending)) {
            $text = Get-Content $file.FullName -Raw
            if ($text -match '(?im)^STATUS:\s*(waiting-for-codex|waiting-for-antigravity|paused|ready-to-resume)\s*$') { return $file.FullName }
        }
    }

    $queue = Join-Path $Repo 'command-center/codex-queue'
    $candidate = Get-ChildItem $queue -File -Filter '*.txt' -ErrorAction SilentlyContinue |
        Where-Object Name -ne 'TASK_TEMPLATE.txt' | Sort-Object LastWriteTimeUtc -Descending | Select-Object -First 1
    if ($null -eq $candidate) { throw 'No resumable task was found. Supply -TaskPath.' }
    return $candidate.FullName
}

function Expected-Reports {
    param([string]$TaskText)
    $result = @()
    foreach ($match in [regex]::Matches($TaskText, '(?i)\breports/[A-Za-z0-9._/-]+\.(?:md|txt|json|csv)\b')) {
        if ($result -notcontains $match.Value) { $result += $match.Value }
    }
    return $result
}

function New-Bundle {
    param($Context, [string]$Task)
    $taskText = Get-Content $Task -Raw
    if ($taskText -match '(?im)^REPOSITORY:\s*(.+)$' -and $Matches[1].Trim() -ne $ExpectedRepository) { throw 'Task repository does not match.' }
    if ($taskText -match '(?im)^BRANCH:\s*(.+)$' -and $Matches[1].Trim() -ne $Branch) { throw 'Task branch does not match.' }

    $taskRelative = Relative-Path $Task
    $taskId = ([IO.Path]::GetFileNameWithoutExtension($Task) -replace '[^A-Za-z0-9._-]', '-').Trim([char[]]@('-', '.', '_'))
    $directory = Join-Path $Repo ("command-center/antigravity-queue/{0}_{1}" -f (Get-Date -Format 'yyyyMMdd-HHmmss'), $taskId)
    New-Item -ItemType Directory -Path $directory -Force | Out-Null

    $sourceCopy = Join-Path $directory 'source-task.txt'
    $agentTask = Join-Path $directory 'ANTIGRAVITY_TASK.md'
    $manifestPath = Join-Path $directory 'continuity-manifest.json'
    $reports = @(Expected-Reports $taskText)
    $reportList = if ($reports.Count) { ($reports | ForEach-Object { "- $_" }) -join "`n" } else { '- Use the report required by the source task.' }

    Set-Content $sourceCopy $taskText -Encoding UTF8
    @"
# PlumbingHands Antigravity Worker Handoff

## Authority
- Project owner: $ProjectOwner
- Owner email: $OwnerEmail
- Repository: $ExpectedRepository
- Branch: $Branch
- Starting commit: $($Context.Head)
- ChatGPT: Master planning house
- PowerShell: orchestrator and verifier
- Antigravity: scoped coding worker
- GitHub: source of truth

## Required reading
- command-center/PROJECT_OWNERSHIP.md
- command-center/MASTER_WORKFLOW.md
- command-center/POWERSHELL_ORCHESTRATOR_PROTOCOL.md
- command-center/CODEX_WORKER_PROTOCOL.md
- command-center/CODEX_FALLBACK_PROTOCOL.md
- command-center/WORKFLOW_STATE.json
- $taskRelative

## Worker contract
1. Confirm repository, branch, and starting commit.
2. Perform only the preserved source task; do not choose another phase or expand scope.
3. Inspect existing patterns and preserve completed work, routing, security controls, truthful claims, and identity.
4. Never merge, deploy, create a pull request, rewrite history, change authentication, expose secrets, or rotate accounts.
5. Produce reviewable Antigravity Artifacts: plan, changed-file summary, exact verification evidence, and UI evidence only when UI behavior changes.
6. Run every check required by the source task. Stop and report the exact blocker if a required check fails.
7. Commit and push only to $Branch after required checks pass.
8. Return the ending commit, changed files, test results, report path, and blockers to PowerShell and the ChatGPT Master.
9. If interrupted, preserve the last verified commit, files touched, completed checks, pending checks, and blockers. Resume only this task.

## Expected reports
$reportList

## Source task
```text
$taskText
```
"@ | Set-Content $agentTask -Encoding UTF8

    $manifest = [ordered]@{
        schema_version = 1
        project = 'PlumbingHands SEO Project'
        project_owner = $ProjectOwner
        project_owner_email = $OwnerEmail
        repository = $ExpectedRepository
        branch = $Branch
        starting_commit = $Context.Head
        agent = 'Google Antigravity'
        status = 'prepared'
        created_at = (Get-Date).ToString('o')
        source_task_path = $taskRelative
        source_task_sha256 = (Get-FileHash $Task -Algorithm SHA256).Hash.ToLowerInvariant()
        agent_task_path = Relative-Path $agentTask
        expected_report_paths = $reports
        required_checks = @('npm test', 'npm run test:routing', 'npm run build')
        prohibited_operations = @('merge', 'deploy', 'rewrite history', 'change authentication', 'commit secrets', 'expand scope')
    }
    $manifest | ConvertTo-Json -Depth 6 | Set-Content $manifestPath -Encoding UTF8
    return [pscustomobject]@{ Directory = $directory; Manifest = $manifestPath; AgentTask = $agentTask; Start = $Context.Head }
}

function Resolve-Bundle {
    if (-not [string]::IsNullOrWhiteSpace($BundlePath)) {
        $path = Inside-Repo $BundlePath
        if (Test-Path $path -PathType Leaf) { $path = Split-Path $path -Parent }
        if (-not (Test-Path $path -PathType Container)) { throw "Bundle not found: $path" }
        return $path
    }
    $root = Join-Path $Repo 'command-center/antigravity-queue'
    $manifest = Get-ChildItem $root -Recurse -File -Filter 'continuity-manifest.json' -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTimeUtc -Descending | Select-Object -First 1
    if ($null -eq $manifest) { throw 'No Antigravity bundle exists. Run Prepare first.' }
    return $manifest.Directory.FullName
}

function Read-Manifest {
    param([string]$Directory)
    $path = Join-Path $Directory 'continuity-manifest.json'
    $manifest = Get-Content $path -Raw | ConvertFrom-Json
    if ($manifest.repository -ne $ExpectedRepository -or $manifest.branch -ne $Branch) { throw 'Manifest repository or branch does not match.' }
    $task = Inside-Repo ([string]$manifest.source_task_path)
    if (-not (Test-Path $task -PathType Leaf)) { throw 'Manifest source task is missing.' }
    $hash = (Get-FileHash $task -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($hash -ne ([string]$manifest.source_task_sha256).ToLowerInvariant()) { throw 'Source task changed after preparation. Prepare a new Master-reviewed bundle.' }
    if ((Read-Git @('cat-file', '-e', "$($manifest.starting_commit)^{commit}") -AllowFailure).Code -ne 0) { throw 'Starting commit is unavailable.' }
    if ((Read-Git @('merge-base', '--is-ancestor', [string]$manifest.starting_commit, 'HEAD') -AllowFailure).Code -ne 0) { throw 'HEAD is not a descendant of the starting commit.' }
    return $manifest
}

function Save-Report {
    param([string]$Failure)
    try {
        $root = if ($Repo) { $Repo } else { Full-Path $RepositoryRoot }
        $directory = Join-Path $root 'reports'
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
        if ($Failure) { Write-Log ''; Write-Log 'RESULT: FAILED'; Write-Log "ERROR: $Failure" }
        $path = Join-Path $directory ("agent_continuity_{0}.txt" -f (Get-Date -Format 'yyyyMMdd-HHmmss'))
        $Log | Set-Content $path -Encoding UTF8
        Write-Host "Report: $path"
    } catch { Write-Warning "Unable to save report: $($_.Exception.Message)" }
}

$failure = $null
try {
    Write-Log 'PLUMBINGHANDS AGENT CONTINUITY'
    Write-Log "Generated: $((Get-Date).ToString('o'))"
    Write-Log "Project owner: $ProjectOwner"
    Write-Log "Mode: $Mode"
    Write-Log ''

    $context = Get-Context
    Write-Log "Repository: $($context.Repository)"
    Write-Log "Branch: $($context.Branch)"
    Write-Log "HEAD: $($context.Head)"
    Write-Log "Working tree: $($context.Status)"
    Write-Log ''

    if ($Mode -eq 'Status') {
        Write-Log "Selected task: $(Relative-Path (Resolve-Task))"
        $count = @(Get-ChildItem (Join-Path $Repo 'command-center/antigravity-queue') -Recurse -Filter 'continuity-manifest.json' -ErrorAction SilentlyContinue).Count
        Write-Log "Existing Antigravity bundles: $count"
        Write-Log 'RESULT: STATUS VERIFIED'
    }
    elseif ($Mode -eq 'Prepare') {
        $bundle = New-Bundle $context (Resolve-Task)
        Write-Log "Bundle: $(Relative-Path $bundle.Directory)"
        Write-Log "Manifest: $(Relative-Path $bundle.Manifest)"
        Write-Log "Agent task: $(Relative-Path $bundle.AgentTask)"
        Write-Log "Starting commit: $($bundle.Start)"
        Write-Log 'RESULT: PREPARED'
    }
    elseif ($Mode -eq 'Resume') {
        $directory = Resolve-Bundle
        $manifest = Read-Manifest $directory
        $resume = Join-Path $directory 'RESUME_CONTEXT.md'
        $diff = (Read-Git @('diff', '--stat', "$($manifest.starting_commit)..HEAD") -AllowFailure).Text
        $files = (Read-Git @('diff', '--name-status', "$($manifest.starting_commit)..HEAD") -AllowFailure).Text
        $commits = (Read-Git @('log', '--oneline', '--max-count=12', "$($manifest.starting_commit)..HEAD") -AllowFailure).Text
        @"
# Antigravity Resume Context
- Repository: $ExpectedRepository
- Branch: $Branch
- Starting commit: $($manifest.starting_commit)
- Current commit: $($context.Head)
- Generated: $((Get-Date).ToString('o'))

## Diff summary
```text
$diff
```
## Changed files
```text
$files
```
## Commits
```text
$commits
```
Continue only the preserved source task. If already satisfied, return evidence instead of duplicating work.
"@ | Set-Content $resume -Encoding UTF8
        Write-Log "Bundle: $(Relative-Path $directory)"
        Write-Log "Resume context: $(Relative-Path $resume)"
        Write-Log "Starting commit: $($manifest.starting_commit)"
        Write-Log "Current commit: $($context.Head)"
        Write-Log 'RESULT: RESUME READY'
    }
    else {
        $directory = Resolve-Bundle
        $manifest = Read-Manifest $directory
        $names = (Read-Git @('diff', '--name-only', "$($manifest.starting_commit)..HEAD") -AllowFailure).Text
        $changed = @($names -split "`r?`n" | Where-Object { $_ })
        $substantive = @($changed | Where-Object { $_ -notlike 'command-center/antigravity-queue/*' -and $_ -notmatch '^reports/agent_continuity_' })
        $commits = (Read-Git @('log', '--oneline', "$($manifest.starting_commit)..HEAD") -AllowFailure).Text
        Write-Log "Starting commit: $($manifest.starting_commit)"
        Write-Log "Ending commit: $($context.Head)"
        Write-Log 'CHANGED FILES'
        Write-Log $(if ($names) { $names } else { '(none)' })
        $failed = -not $commits -or $substantive.Count -eq 0

        Write-Log 'REQUIRED CHECKS (evidence must be recorded by the worker)'
        foreach ($check in @($manifest.required_checks)) { Write-Log "- $check" }

        Write-Log 'EXPECTED REPORTS'
        foreach ($report in @($manifest.expected_report_paths)) {
            $value = ([string]$report) -replace '\\', '/'
            $exists = Test-Path (Inside-Repo $value) -PathType Leaf
            $changedSinceStart = $changed -contains $value
            $state = if (-not $exists) { 'MISSING' } elseif (-not $changedSinceStart) { 'present but unchanged' } else { 'present and changed' }
            Write-Log "$value`: $state"
            if (-not $exists -or -not $changedSinceStart) { $failed = $true }
        }
        if ($failed) { throw 'Antigravity result verification failed; review the report for blockers.' }
        Write-Log 'RESULT: REPOSITORY EVIDENCE VERIFIED'
    }
}
catch { $failure = $_.Exception.Message }
finally { Save-Report $failure }
if ($failure) { throw $failure }
