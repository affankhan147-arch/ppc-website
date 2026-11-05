#!/usr/bin/env python3
"""Backlink Scout: finds free, real link opportunities for the site and writes a report. Research only.

Never creates accounts, submits forms, sends email or places links: Claude reviews the list and
Sunny places approved links himself. Runs weekly from .github/workflows/backlink-scout.yml.

Search: Gemini with Google Search grounding (GEMINI_API_KEY), DuckDuckGo HTML as a fallback.
Every candidate is fetched and verified (HTTP 200, on topic, not already linking to us) before it
is listed. Config comes from env: SITE, NAME, NICHE, NICHE_WORD, CITIES (comma list).
"""
import datetime, html, json, os, pathlib, re, subprocess, sys, urllib.parse, urllib.request

SITE = os.environ["SITE"].rstrip("/")
DOMAIN = urllib.parse.urlparse(SITE).netloc.replace("www.", "")
NAME = os.environ.get("NAME", DOMAIN)
NICHE = os.environ.get("NICHE", "home services")
WORD = os.environ.get("NICHE_WORD", "").lower()
CITIES = [c.strip() for c in os.environ.get("CITIES", "Dallas").split(",") if c.strip()]
KEY = os.getenv("GEMINI_API_KEY", "")
TODAY = datetime.date.today().isoformat()
ROOT = pathlib.Path(__file__).resolve().parent.parent
LOG = ROOT / "docs" / "dsh" / "backlinks-log.md"
REPORT = ROOT / "docs" / "dsh" / "reports" / f"{TODAY}-BACKLINKS.md"
UA = {"User-Agent": "Mozilla/5.0 (compatible; DSH-Backlink-Scout/1.0)", "Accept": "text/html,*/*"}
SKIP = ("facebook.", "instagram.", "twitter.", "x.com", "linkedin.", "youtube.", "tiktok.", "pinterest.",
        "yelp.", "angi.", "homeadvisor.", "thumbtack.", "google.", "bing.", "wikipedia.", "reddit.",
        "amazon.", "nextdoor.", "porch.", "houzz.", DOMAIN)
NOTES = []


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.geturl(), r.read(600_000).decode("utf-8", "ignore")


def gemini(prompt):
    """Search-grounded Gemini call. Returns (text, [source urls])."""
    body = json.dumps({"contents": [{"parts": [{"text": prompt}]}], "tools": [{"google_search": {}}]}).encode()
    for model in ("gemini-3.5-flash", "gemini-2.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-2.5-flash-lite"):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
        req = urllib.request.Request(url, data=body, headers={"x-goog-api-key": KEY, "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                data = json.load(r)
        except Exception as e:  # noqa: BLE001
            NOTES.append(f"{model}: {type(e).__name__} {getattr(e, 'code', '')}")
            continue
        cand = (data.get("candidates") or [{}])[0]
        text = "".join(p.get("text", "") for p in cand.get("content", {}).get("parts", []))
        sources = [c.get("web", {}).get("uri") for c in cand.get("groundingMetadata", {}).get("groundingChunks", [])]
        return text, [s for s in sources if s], model
    return "", [], None


def ddg(query):
    try:
        _, _, page = fetch("https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query))
    except Exception as e:  # noqa: BLE001
        NOTES.append(f"duckduckgo: {type(e).__name__}")
        return []
    out = []
    for m in re.finditer(r'uddg=([^&"]+)', page):
        out.append(urllib.parse.unquote(m.group(1)))
    return out[:10]


def json_items(text):
    m = re.search(r"\[.*\]", text, re.S)
    if not m:
        return []
    try:
        items = json.loads(m.group(0))
        return [i for i in items if isinstance(i, dict) and str(i.get("url", "")).startswith("http")]
    except json.JSONDecodeError:
        return []


def logged():
    if not LOG.exists():
        return set()
    return {urllib.parse.urlparse(u).netloc.replace("www.", "") for u in re.findall(r"https?://[^\s|]+", LOG.read_text(encoding="utf-8"))}


def main():
    week = datetime.date.today().isocalendar()[1]
    cities = [CITIES[(week * 2 + i) % len(CITIES)] for i in range(2)] if len(CITIES) > 1 else CITIES
    seen_domains = logged()
    candidates, used = [], None
    themes = [
        "local business directories and chamber of commerce member directories that list {niche} companies for free",
        "Texas trade association or industry directories for {niche} contractors with a free listing",
        "city, county, HOA or neighborhood resource pages that link to local {niche} help or emergency resources",
        "local news or community blogs with homeowner guides about {niche} that accept expert tips or resources",
    ]
    for city in cities:
        for theme in themes:
            q = theme.format(niche=NICHE)
            if KEY:
                text, sources, model = gemini(
                    f"Find real, currently live web pages for {city}, Texas: {q}. Exclude paid-only listings, "
                    "social networks, Yelp, Angi, HomeAdvisor, Thumbtack and lead-generation marketplaces. "
                    "Return ONLY a JSON array (max 8) of objects with keys: url (the exact page where a business "
                    "would be listed or linked), site, type, how_to_get_listed (the site's own steps, short), free (true/false).")
                used = used or model
                for it in json_items(text):
                    candidates.append({**it, "city": city})
                for s in sources[:6]:
                    candidates.append({"url": s, "site": "", "type": "search source", "how_to_get_listed": "", "free": None, "city": city})
            else:
                for u in ddg(f"{city} Texas {q}"):
                    candidates.append({"url": u, "site": "", "type": "search result", "how_to_get_listed": "", "free": None, "city": city})

    verified, checked = [], set()
    for c in candidates:
        if len(verified) >= 10:
            break
        if c.get("free") is False:
            continue
        try:
            status, final, page = fetch(c["url"])
        except Exception:  # noqa: BLE001
            continue
        dom = urllib.parse.urlparse(final).netloc.replace("www.", "")
        if status != 200 or dom in checked or dom in seen_domains or any(s in dom for s in SKIP):
            continue
        checked.add(dom)
        low = page.lower()
        if DOMAIN in low:
            continue  # already links to us (or mentions us): not a new opportunity
        on_topic = (c["city"].lower() in low or "texas" in low) and (WORD in low if WORD else True)
        listing = re.search(r"add (your|a) (business|listing)|submit (your )?(business|listing|site|link)|list your business|get listed|join|member directory|resources", low)
        if not (on_topic or listing):
            continue
        tm = re.search(r"<title[^>]*>(.*?)</title>", page, re.S | re.I)
        title = html.unescape(tm.group(1).strip())[:80] if tm else dom
        verified.append({
            "site": c.get("site") or dom, "url": final, "title": title, "type": c.get("type") or "",
            "how": (c.get("how_to_get_listed") or ("page mentions: " + listing.group(0) if listing else "see page")).replace("|", "/")[:160],
            "free": {True: "yes", False: "no", None: "check"}[c.get("free")],
            "why": f"{c['city']} / {'on-topic' if on_topic else 'listing page'}",
        })

    try:
        _, _, home = fetch(SITE)
        desc = html.unescape((re.search(r'<meta[^>]+name=["\']description["\'][^>]*content=["\']([^"\']+)', home, re.I) or [None, ""])[1])
    except Exception:  # noqa: BLE001
        desc = ""
    desc = " ".join(desc.split()[:60])

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    rows = "\n".join(f"| {i} | {v['site']} | {v['url']} | {v['type']} | {v['free']} | {v['how']} | {v['why']} |" for i, v in enumerate(verified, 1))
    REPORT.write_text(
        f"# BACKLINKS - {TODAY}\n"
        f"Status: {'DONE' if verified or used else 'BLOCKED'}\n"
        f"Model: {used or 'none (DuckDuckGo search)'} + scripts/backlink-scout.py (GitHub Actions)\n"
        f"Cities this week: {', '.join(cities)} | candidates: {len(candidates)} | verified: {len(verified)}\n\n"
        "Research only. Nothing was submitted. Claude checks each one; Sunny places approved links himself.\n\n"
        "| # | Site | Page where the link would go | Type | Free? | How to get listed | Why relevant |\n"
        "|---|---|---|---|---|---|---|\n"
        f"{rows or '| - | none verified this week | | | | | |'}\n\n"
        f"## Ready-to-paste business description (from our home page)\n{desc or '(home page description not found)'}\n\n"
        f"## Notes\n{'; '.join(NOTES) or 'none'}\n",
        encoding="utf-8")
    if verified:
        if not LOG.exists():
            LOG.write_text("# Backlink log\nOne line per opportunity the Backlink Scout proposed: date | site | page | status.\n", encoding="utf-8")
        with LOG.open("a", encoding="utf-8") as f:
            for v in verified:
                f.write(f"{TODAY} | {v['site']} | {v['url']} | proposed\n")
    print(f"Backlink Scout: {len(verified)} verified of {len(candidates)} candidates; report {REPORT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
