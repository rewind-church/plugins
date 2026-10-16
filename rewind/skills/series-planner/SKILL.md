---
name: Series planner
description: Use when someone plans a sermon series or season and wants to consider their church's recorded Scripture coverage, previous themes, recent teaching, and possible week-by-week directions.
version: 0.6.0
---

# Series planner

Read [the research contract](../../references/research-contract.md) before calling tools. Produce a planning draft for the preacher to decide, grounded in recorded sources. This connection cannot edit sermon content.

## Plan a series

1. Establish the theme or book, season, length, and audience from the request. Clarify only what the plan needs.
2. Map recorded Scripture with `coverage`. Use `range` for a canonical book or chapter range and `filters` for the intended dates or content kind. The default is weekend messages. Report the effective scope.
3. For a book or theme, use `map_topic` with `topic` or `passage` and 1–12 proposed groups of `{ "label": "…", "query": "…" }`. Counts apply to supplied indexed-word queries. A zero or a partial index does not prove the theme was never taught.
4. Use `trace_theme` with `theme` for dated statements. Use `ask` with `question` or `search` with `query` for specific prior treatments. Open source context with `get_sermon` before interpreting a change in emphasis.
5. Use `search` with `order: "recent"` and no `query` to see the latest messages. Do not infer recency from relevance results.
6. Propose a week-by-week arc with the text or topic, a cited connection to prior teaching, and a possible angle. Separate recorded evidence from your suggestions. Offer alternative framings when they help the preacher choose.

Describe repeated teaching and recorded gaps neutrally. Repetition can be intentional. Do not prescribe novelty from a count or call different emphases a contradiction without context. Label a class as a class and preserve returned names, dates, Scripture references, and source links.

## Sources and cost

Use `find_illustrations` when a proposed week needs past stories. Preserve full available story wording and the original teller. For a requested save, first get a versioned transcript page at the story moment, then send exact contiguous wording and its original segment start to `add_to_chat`. Discuss never saves. `history` recalls earlier chosen sources.

The research contract governs transcript continuation, save recovery, request limits, and errors. Planning evidence is free of metered Rewind synthesis. Optional deep `trace_theme` or synthesized `ask` requires the returned cost disclosure and an explicit yes for that request before `spendConfirmed: true`.
