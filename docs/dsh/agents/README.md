# Desktop DSH agents - PlumbingHands
Four agents run as automation tasks in the DeepSeek Harness app on Sunny's laptop (only while the laptop is on and the app is open). Each run does both sites: C:\Users\dell\Documents\plumbinghands-live-master and C:\Users\dell\Documents\urgenthomepros-website.

| Agent | When (PKT) | Gets work from | Delivers |
|---|---|---|---|
| SEO Auditor (`AUDITOR.md`) | Mon 15:00 | its own checklist | branch `dsh/<date>-SEO-AUDIT` with a report |
| Link Auditor (`LINKS.md`) | Thu 15:00 | its own checklist | branch `dsh/<date>-LINK-AUDIT` with a report |
| Article Writer (`WRITER.md`) | daily 16:00 | Claude's briefs in TASKS.md with `Status: WRITER` | branch `dsh/<date>-<task-id>` with the article |
| Backlink Scout (`BACKLINKS.md`) | Sat 15:00 | its own checklist | branch `dsh/<date>-BACKLINKS` with 10 verified opportunities |

The cloud agent (GitHub Actions, daily 13:23) keeps doing `Status: OPEN` tasks. Claude reviews every dsh/* branch weekly, merges what passes, and assigns the next work.
Claude owns these files; agents read them and never edit them.
