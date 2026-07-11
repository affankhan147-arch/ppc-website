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

## Current Owner Steps
1. Confirm each pushed sprint commit is visible on GitHub.
2. Keep the private `chatgpt.site` preview separate from the final production website.
3. Confirm the Vercel deployment at `https://plumbinghands.vercel.app`.
4. Add Vercel production environment variables from `.env.example`.
5. Confirm `plumbinghands.com` and `www.plumbinghands.com` are live on Vercel.
6. Run `scripts/50_open_google_search_console_setup.ps1`.
7. Copy the Google TXT verification value from Search Console.
8. Run `scripts/51_add_google_search_console_txt_to_hostinger.ps1`.
9. Replace sample tracking phone values with real owner-approved call tracking values before public launch.
10. Approve real buyer routing endpoints before collecting or forwarding production leads.
11. Verify Google Search Console, submit the sitemap, and request homepage indexing only.
12. Prepare Bing and IndexNow only after Google verification succeeds.
13. Do not approve paid ads, fake GBP, fake reviews, fake addresses, fake licenses, fake insurance claims, copied competitor images, or spam backlink actions.
