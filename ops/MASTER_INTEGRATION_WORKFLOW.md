# Master Integration Workflow

## Purpose
This repository uses GitHub as the central bridge between planning, building, support research, local control, and durable backup for the PPC lead generation platform.

The first phase is workflow integration only. Do not start the website build from this file.

## Connected Tools And Roles
1. ChatGPT is the planner and command creator.
2. Codex is the builder, tester, fixer, verifier, and reporter.
3. GitHub is the source of truth and handoff bridge.
4. PowerShell is the local laptop controller.
5. Google Colab is the support lab for prepared research files.
6. The local laptop repo is the execution workspace.
7. The D-drive blueprint folder is the local backup archive.

## Canonical Repository
- GitHub repository: `affankhan147-arch/ppc-website`
- Default branch: `master`
- Local project folder: this cloned repository
- D-drive backup target: `D:\PPC_Project_Blueprints\PPC_Lead_Generation_Platform_Blueprint`

## Folder Map
- `command-center/`: prompts, command handoffs, and next-task instructions.
- `ops/`: operating workflow, safety policy, API sync rules, and Codex context.
- `scripts/`: local PowerShell controller scripts.
- `colab/`: Google Colab guide and support notebook.
- `colab-output/`: support outputs prepared by Colab or owner-approved imports.
- `inbox-from-chatgpt/`: commands or planning notes exported from ChatGPT.
- `outbox-to-codex/`: concise packets prepared for Codex execution.
- `manual-owner-steps/`: steps only the owner can perform.
- `reports/`: integration, phase, and Codex reports.
- `blueprints/`: business, marketing, website, technical, AI, and operating model.
- `ai-agents/`: role cards for specialized assistant behavior.

## Standard Handoff Flow
1. Owner or ChatGPT writes a clear command in `command-center/` or `inbox-from-chatgpt/`.
2. PowerShell pulls the latest GitHub state with `scripts/10_pull_latest_from_github.ps1`.
3. Codex reads `ops/codex_minimum_context.md`, the active command file, relevant blueprints, and safety policy.
4. Codex makes only the requested changes, tests or validates them, and writes a phase report.
5. PowerShell or Codex pushes the updated files to GitHub with `scripts/11_push_updates_to_github.ps1`.
6. The owner runs `scripts/20_backup_project_blueprints_to_D_drive.ps1` locally to copy workflow and blueprint artifacts to the D drive.
7. Colab may generate support files only, then those files are reviewed before entering the repo.

## Colab Support Lab Boundaries
Colab may prepare:
- keyword CSVs
- page briefs
- content outlines
- research summaries
- project support data
- files for Codex to inspect later

Colab must not:
- store secrets in notebook text
- create paid ads
- create Google Ads or Bing Ads
- push unreviewed changes containing private data
- claim fake local offices, licenses, insurance, reviews, or addresses

## GitHub Bridge Rules
1. Pull before starting work.
2. Commit meaningful units of workflow or build work.
3. Push after verification.
4. Do not commit `.env`, keys, tokens, private credentials, payment data, or account recovery material.
5. Use GitHub browser login or credential manager rather than writing tokens into files.
6. Reports must say what changed, what was verified, and what remains manual.

## Owner-Only Steps
Only the owner performs:
- account logins
- GitHub authentication approval
- Google account and Colab connection
- domain, DNS, hosting, and payment approvals
- any ad platform access or spend approval
- local D-drive backup execution if Codex cannot access the drive

## Safety Gate
Every Codex or ChatGPT command must comply with `ops/api_safety_policy.md`. If a command conflicts with the policy, stop and report the conflict.

