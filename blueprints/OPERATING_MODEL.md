# Operating Model

## Default Loop
1. Owner sets direction.
2. ChatGPT turns direction into a command.
3. GitHub stores the command and current repo state.
4. Codex executes and reports.
5. PowerShell syncs local and GitHub state.
6. Colab prepares support files when useful.
7. Owner performs manual account and backup steps.

## Decision Rights
- Owner approves accounts, spend, publishing, DNS, credentials, and claims.
- ChatGPT proposes plans.
- Codex implements approved repo changes.
- Colab prepares support data only.

## Reporting
Reports live in `reports/`. Every phase should say what changed, what was verified, and what remains manual.

