# SEO agents - PlumbingHands
Four agents run in the DeepSeek Harness app on Sunny's laptop as automation tasks (only while the laptop is on and the app is open), one set per site: workspace `plumbinghands-live-master` (C:\Users\dell\Documents\plumbinghands-live-master) and workspace `urgenthomepros-website` (C:\Users\dell\Documents\urgenthomepros-website).
Command path: Claude (DSH project) -> job files here + TASKS.md -> DSH app agent -> report card in docs/dsh/reports/ on a dsh/* branch -> Claude's weekly review.

| Agent (app task) | When (PKT) | Gets work from | Report card |
|---|---|---|---|
| SEO Auditor (`AUDITOR.md`) | Mon 15:00 | its checklist + `scripts/seo-audit.mjs` | `dsh/<date>-SEO-AUDIT` |
| Link Auditor (`LINKS.md`) | Thu 15:00 | its checklist + `scripts/seo-audit.mjs` | `dsh/<date>-LINK-AUDIT` |
| Article Writer (`WRITER.md`) | daily 16:00 | Claude's briefs in TASKS.md (`Status: WRITER`) | `dsh/<date>-<task-id>` |
| Backlink Scout (`BACKLINKS.md`) | Sat 15:00 | its checklist + `scripts/backlink-scout.mjs` | `dsh/<date>-BACKLINKS` |

Agents run in the app's safe "Workspace Write" sandbox (one repo folder each, no access to the rest of the laptop). They sync, list and push with `scripts/dsh-git.ps1` (git's normal login helper is blocked in the sandbox; the script uses the GitHub CLI login for one command at a time and only pushes dsh/* branches).
The cloud agent (GitHub Actions, daily 13:23) keeps doing `Status: OPEN` tasks and skips WRITER tasks. The GitHub workflows `seo-audit.yml` and `backlink-scout.yml` are manual-only backups.
Claude owns these files; agents read them and never edit them.
