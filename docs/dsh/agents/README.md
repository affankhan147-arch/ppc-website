# SEO agents - PlumbingHands
All four run on GitHub (free, no laptop needed). Nothing runs on Sunny's laptop. They only push `dsh/*` branches; Claude's weekly review merges what passes and assigns the next work.

| Agent | Runs (PKT) | How | Gets work from | Delivers |
|---|---|---|---|---|
| SEO Auditor + Link Auditor | Mon 09:37 | `scripts/seo-audit.mjs` (no AI, no tokens) via `.github/workflows/seo-audit.yml` | its own checklist | branch `dsh/<date>-SEO-AUDIT` with a report: status codes, titles, meta, H1, canonicals, broken links, orphan/weak pages, link suggestions, lint totals |
| Article Writer | daily 13:23, one article per run | the cloud agent (`scripts/dsh-agent.py`) with the rules in `WRITER.md` | Claude's briefs in TASKS.md with `Status: WRITER` | branch `dsh/<date>-<task-id>` with the article |
| Backlink Scout | Sat 10:13 | `scripts/backlink-scout.py` (Gemini search + checks) via `.github/workflows/backlink-scout.yml` | its own checklist | branch `dsh/<date>-BACKLINKS` with verified free opportunities. Research only: never submits anything |
| Task worker | daily 13:23, 2 tasks | the cloud agent | TASKS.md `Status: OPEN` / `FIX` | branch per task |

Run any of them now: GitHub > Actions > pick the workflow > Run workflow.
Claude owns these files.
