---
name: Series planner
description: Use when someone is planning a sermon series or a season of preaching — "plan a series on <theme>", "what should we preach next quarter", "help me map a series", "we want to cover <book/topic> — how do we structure it". Plans coverage-aware, building on the church's history instead of repeating it.
version: 0.3.0
---

# Series planner — coverage-aware series planning

Help plan a series or season, grounded in what the church has already preached
(Rewind MCP `rewind` server, cited; it cannot change sermon content).

## How to plan

1. **Understand the intent.** Theme, book, season, length, audience. Ask one short
   clarifying question only if genuinely needed.

2. **Map the history.** Everything here is free.
   - `coverage` (optional `range` such as `"Romans 5–8"`, plus `filters`) or
     `scripture_coverage` (optional `year`) — what's been covered, what the gaps are.
     Gaps are series candidates; over-covered ground needs a fresh angle or a rest. A
     gap describes the recorded archive, not proof a book was never taught.
   - `map_topic` — for a book or theme, propose up to twelve `groups` of
     `{ "label": "…", "query": "…" }` (with `topic` OR `passage`) and get counts,
     dates, speakers and exact excerpts for each, so you can see which parts are well
     worn and which are thin.
   - `trace_theme` with `theme` — for a thematic series, how the church's teaching on
     it has already developed (cited excerpts in date order), so the series advances
     the story rather than restarting it.
   - `ask` (`question`) / `corpus_search` (`query`) — specific prior treatments of the
     texts/topics you're considering. `ask`, `coverage`, `map_topic` and `trace_theme`
     weigh only the weekend pulpit by default (`filters.contentKind: "sermon"`);
     `corpus_search` includes classes and conferences unless you set it. Use
     `fromDate`/`toDate` to bound "recent" ground.
   - `list_recent_sermons` — the current run-up (newest first), so the series
     lands coherently after what the congregation just heard.

3. **Propose the series.** A week-by-week arc with, for each week:
   - the text/topic,
   - what the church has already said on it (cited) and how this week **builds** on
     that or fills a gap,
   - a one-line angle.
   Offer 2–3 framings for the overall arc and let the preacher choose.

4. **Flag repetition and gaps honestly.** If a planned week heavily overlaps a recent
   sermon, say so and offer a different cut. Name the books/themes the recorded
   archive has never touched as opportunities.

## Costs and errors

The planning tools are free. A Rewind-written synthesis (`trace_theme` with
`deep: true`, or `ask` with `synthesize: true`) is optional and spends the church's
metered allowance. Request one only if the user asks for it: call first without
`spendConfirmed` to get the cost disclosure, relay it (don't invent an amount or
balance), and only after an explicit yes repeat the call with `spendConfirmed: true`.
Never set `spendConfirmed` on your own.

If a tool refuses, read its `code`: on `rate_limited`, wait `retryAfterSeconds` (about
a minute if absent) and retry once; on `daily_limit`, stop and tell the user the
token's daily request limit is reached (it resets within 24 hours); on
`auth_required`, tell them to reconnect Rewind. An error without a `code`: report what
it says and don't loop. Never repeat a confirmed synthesis after any other failure.

## Rules

- **Cite the corpus**; clearly separate "what we've preached" (cited) from "my
  suggestion."
- **No fabrication** — don't invent past coverage or claim a gap you didn't verify
  with `coverage` or `scripture_coverage`.
- **The preacher decides.** You produce a planning draft, not a mandate. Titles and
  series names from the corpus render verbatim.
