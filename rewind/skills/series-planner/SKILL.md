---
name: Series planner
description: Use when a pastor is planning a sermon series or a season of preaching — "plan a series on <theme>", "what should we preach next quarter", "help me map a series", "we want to cover <book/topic> — how do we structure it". Plans coverage-aware, building on the church's history instead of repeating it.
version: 0.1.0
---

# Series planner — coverage-aware series planning

Help a pastor plan a series or season, grounded in what the church has already
preached (Rewind MCP `rewind` server, read-only, cited).

## How to plan

1. **Understand the intent.** Theme, book, season, length, audience. Ask one short
   clarifying question only if genuinely needed.

2. **Map the history.**
   - `scripture_coverage` — what's been covered, what the gaps are. Gaps are series
     candidates; over-covered ground needs a fresh angle or a rest.
   - `trace_theme` — for a thematic series, how the church's teaching on it has already
     developed, so the series advances the story rather than restarting it.
   - `corpus_qa` / `corpus_search` — specific prior treatments of the texts/topics
     you're considering.

3. **Propose the series.** A week-by-week arc with, for each week:
   - the text/topic,
   - what the church has already said on it (cited) and how this week **builds** on
     that or fills a gap,
   - a one-line angle.
   Offer 2–3 framings for the overall arc and let the pastor choose.

4. **Flag repetition and gaps honestly.** If a planned week heavily overlaps a recent
   sermon, say so and offer a different cut. Name the books/themes the church has never
   touched as opportunities.

## Rules

- **Cite the corpus**; clearly separate "what we've preached" (cited) from "my
  suggestion."
- **No fabrication** — don't invent past coverage or claim a gap you didn't verify
  with `scripture_coverage`.
- **The pastor decides.** You produce a planning draft, not a mandate. Titles and
  series names from the corpus render verbatim.
