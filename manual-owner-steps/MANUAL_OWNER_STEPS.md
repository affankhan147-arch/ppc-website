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

## During Command 2 DNS-Safe Mode
1. Confirm each pushed sprint commit is visible on GitHub.
2. Keep the private `chatgpt.site` preview separate from the final production website.
3. Import the GitHub repo into Vercel when ready.
4. Add Vercel production environment variables from `.env.example`.
5. Add `plumbinghands.com` and `www.plumbinghands.com` in Vercel.
6. Copy exact Vercel-generated DNS records into `manual-owner-steps/VERCEL_DNS_STEPS.md`.
7. Ask the Hostinger DNS owner to add only those exact Vercel records.
8. Replace sample tracking phone values with real owner-approved call tracking values before public launch.
9. Approve real buyer routing endpoints before collecting or forwarding production leads.
10. Verify Search Console and Bing only after DNS and HTTPS are confirmed.
11. Submit sitemap and run IndexNow only after Google/Bing verification succeeds.
12. Do not approve paid ads, fake GBP, fake reviews, fake addresses, fake licenses, fake insurance claims, copied competitor images, or spam backlink actions.
