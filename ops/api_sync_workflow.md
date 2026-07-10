# API Sync And Low-Context Workflow

## Goal
Keep Codex focused by preparing concise, safe support files before each build phase.

## Source Of Truth
GitHub is the bridge. The local repo should always pull from `origin master` before work and push verified changes after work.

## Recommended Order
1. PowerShell: `.\scripts\10_pull_latest_from_github.ps1`
2. ChatGPT: create or refine the command in `command-center/` or `inbox-from-chatgpt/`
3. Colab: prepare support files only when useful
4. Owner: review support output for safety and accuracy
5. Codex: execute the approved command
6. Codex or PowerShell: update reports and push to GitHub
7. Owner: run D-drive blueprint backup locally

## Support File Types
Safe files include:
- CSV keyword lists
- page brief markdown files
- outline markdown files
- summary markdown files
- JSON support data with no secrets

Unsafe files include:
- tokens
- API keys
- passwords
- payment details
- unapproved account exports
- private customer data

## Low Codex Usage Practice
Before asking Codex to build:
1. Put a concise command in `command-center/NEXT_CODEX_TASK.txt`.
2. Put bulky research in `colab-output/`.
3. Summarize bulky research in `ops/pre_codex_colab_summary.md` or `reports/`.
4. Ask Codex to read summaries first and raw files only when needed.

## Verification
Every sync phase should confirm:
- repo is on `master`
- no secrets are present
- required docs or support files exist
- safety policy is unchanged
- reports are updated
