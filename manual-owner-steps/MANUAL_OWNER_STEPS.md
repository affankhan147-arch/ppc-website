# Manual Owner Steps

These steps require owner action and should not be automated by Codex.

## Account Access
1. Log in to GitHub locally if push fails.
2. Log in to Google before opening Colab.
3. Approve any browser-based authorization prompts yourself.

## Local Backup
Run this locally from the repo root:

```powershell
.\scripts\20_backup_project_blueprints_to_D_drive.ps1
```

Codex may not be able to write to the D drive from its sandbox. The script is ready for local execution.

## Safety Approvals
The owner must explicitly approve:
- paid tools
- ad account actions
- DNS changes
- hosting changes
- payment setup
- third-party service connections
- any claim about licenses, insurance, physical offices, or verified reviews

## Before Command 2
1. Confirm this workflow commit is visible on GitHub.
2. Run the D-drive backup script.
3. Confirm the safety policy is acceptable.
4. Confirm whether the private `chatgpt.site` preview should remain private or be switched to public preview access.
5. Add the production DNS records from `manual-owner-steps/DOMAIN_DNS_STEPS.md`.
6. Tell Codex to start Command 2 only when ready.
