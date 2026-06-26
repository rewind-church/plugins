---
name: Illustration finder
description: Use when a pastor wants illustrations, stories, or examples for a topic or passage from their church's own preaching — "find illustrations for <topic>", "have we told a story about <theme>", "I need an example for <passage>", "what stories have we used on <topic>". Returns past illustrations with attribution preserved verbatim.
version: 0.1.0
---

# Illustration finder

Surface illustrations and stories the church has already used, via the Rewind MCP
`find_illustrations` tool (`rewind` server). Read-only, scoped to this church.

## How to use

1. Call `find_illustrations` with the topic or passage. Optionally narrow with filters
   (speaker, book, date range).
2. Present each result with **attribution preserved exactly** — the sermon, the
   timestamp, and **who told it**.
3. If helpful, pull the surrounding context from `rewind://sermon/{id}/transcript` so
   the pastor can see how the illustration landed.

## Rules (critical for illustrations)

- **Never rewrite a personal story in the first person** for the current preacher. If
  another preacher told "when my daughter was born…", it stays theirs — attributed,
  not adopted. Re-attributing someone's personal story to the current speaker is a
  trust violation.
- **Attribution is verbatim** — render who told it exactly as returned.
- **No fabrication.** If the church hasn't used an illustration on the topic, say so;
  don't invent one and present it as something the church has used.
- Offer your OWN fresh illustration ideas only when clearly labeled as new
  suggestions, separate from the cited corpus results.
