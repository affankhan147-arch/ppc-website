# Technical Layer

## Repository
GitHub repository: `affankhan147-arch/ppc-website`

## Branch
`master`

## Technical Operating Pattern
1. Pull latest.
2. Read context.
3. Edit scoped files.
4. Validate.
5. Update reports.
6. Commit and push.
7. Run local D-drive backup when needed.

## Local Control
PowerShell scripts in `scripts/` control pull, push, tool opening, and backup.

## Secrets
Secrets must stay out of repo files. Use environment variables, Colab Secrets, GitHub Secrets, or hosting provider secrets only when the owner approves.

