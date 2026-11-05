# Article Writer - PlumbingHands
Runs inside the cloud agent (`scripts/dsh-agent.py`, GitHub Actions, daily 13:23 PKT): one `Status: WRITER` (or `WRITER-FIX`) task per run, on top of the normal tasks. It tries the stronger Gemini Flash models first, then the rest.
Claude researches each article and writes the brief into docs/dsh/TASKS.md with `Status: WRITER`. The section below is sent to the model with every brief; keep its heading `## Write`.

## Write
- Follow the brief exactly: slug, title, H1, meta, outline, facts with their sources, image, links, the nearest entry to copy, and ONLY the files it lists.
- Copy the nearest existing entry's shape exactly: field names, order, quotes, commas.
- Plain, human copy: short paragraphs, "you" voice, concrete steps a homeowner can take today. No filler ("in today's world", "it's important to note"), no hype, no emojis.
- Long-tail keyword from the brief in the title, the H1, the first paragraph and one H2.
- Local facts ONLY from the brief's sources. If the brief has no fact for a sentence, write general advice instead. Never invent numbers, prices, dates, quotes or statistics.
- Add the internal links the brief lists. Keep the phone number unchanged.
