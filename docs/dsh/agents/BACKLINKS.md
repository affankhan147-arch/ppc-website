# Backlink Scout - PlumbingHands
Now a script: `scripts/backlink-scout.py`, run weekly by `.github/workflows/backlink-scout.yml` (Saturdays 10:13 PKT, or Actions > Run workflow).
It asks Gemini (with Google Search) for free local directories, association listings and resource pages, then fetches every candidate and keeps only pages that load, are on topic and don't already link to us. Already-proposed sites are skipped via `docs/dsh/backlinks-log.md`.
Research only: it never creates accounts, submits forms, sends email, pays for links or uses link schemes. Claude checks the list; Sunny places approved links himself.
