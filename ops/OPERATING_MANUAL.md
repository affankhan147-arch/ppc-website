# Operating Manual

## Daily Start
1. Open PowerShell in the local repository.
2. Run `.\scripts\10_pull_latest_from_github.ps1`.
3. Read `ops/codex_minimum_context.md`.
4. Read the active file in `command-center/`.
5. Confirm the safety policy still applies.

## Creating Work For ChatGPT
Place planning requests, strategy notes, or raw command drafts in `inbox-from-chatgpt/`.

ChatGPT should produce:
- a clear goal
- exact deliverables
- safety limits
- files Codex should edit
- files Codex should not touch
- verification steps

## Creating Work For Codex
Place execution-ready commands in `command-center/NEXT_CODEX_TASK.txt` or `outbox-to-codex/`.

Codex should:
1. Read minimum context first.
2. Inspect the current repo state.
3. Make the smallest complete workflow or build change that satisfies the command.
4. Run relevant verification.
5. Update reports.
6. Commit and push when requested and authentication allows.

## Using Google Colab
Use `colab/COLAB_INTEGRATION_GUIDE.md` and `colab/ppc_online_workflow.ipynb`.

Colab is for support preparation only:
- keyword research tables
- page briefs
- outlines
- content planning CSVs
- summary files for Codex

Do not use Colab for credentials, ads, payment setup, or fake entity creation.

## Using PowerShell
PowerShell is the local controller for:
- pulling GitHub updates
- pushing verified repo changes
- opening workflow tools
- copying blueprint backups to the D drive

Run scripts from the repo root whenever possible.

## Backup Routine
After meaningful updates:
1. Pull latest.
2. Verify reports are current.
3. Run `.\scripts\20_backup_project_blueprints_to_D_drive.ps1` locally.
4. Confirm the D-drive target contains updated files.

## Reporting Routine
Every phase report should include:
- phase name
- files changed
- validation performed
- safety checks performed
- manual owner steps
- next command status

## Stop Conditions
Stop and ask the owner before:
- spending money
- creating ads
- using private account access
- changing DNS or payment settings
- publishing claims about licenses, insurance, offices, or reviews
- committing anything that looks like a credential

