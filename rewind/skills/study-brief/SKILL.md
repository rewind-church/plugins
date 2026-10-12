---
name: Study brief
description: Use when someone wants a study brief or exegetical starting point for a passage, grounded in how their own church has treated it — "build me a brief on <passage>", "study notes for <text>", "what do I need to know to preach <passage>", "pull together background on <text>". Leads with the church's own corpus, then scripture, then general study.
version: 0.4.0
---

# Study brief — a passage brief led by your church's corpus

Assemble a working study brief for a passage. The distinctive value is that it
**leads with how THIS church has already treated the text** (via the Rewind MCP
`rewind` server), not generic commentary.

## Build order (corpus first)

1. **The church's own treatments.** `ask` with `question` ("How has our church
   preached <passage>?") for free cited excerpts, and `corpus_search` (`query`) for
   the verbatim moments — narrow with the optional `filters` (`book`/`chapter` for the
   passage itself; `contentKind` if the user wants weekend sermons vs classes — `ask`
   defaults to weekend sermons, `corpus_search` covers every kind unless filtered).
   When a sermon is on point, `get_sermon` (by `sermonId`) for the overview and/or
   full transcript — or the `rewind://sermon/{id}/overview` resource if your client
   prefers. Cite each (title + date + speaker + timestamp).
2. **Scripture context.** The passage itself, its immediate context, and — via
   `coverage` (with `range` set to the book or chapters, e.g. `"Romans"` or
   `"Romans 5–8"`) or `scripture_coverage` — how this book sits in the church's
   overall preaching.
   Rewind's tools do not supply Bible text; take the passage from a source available
   to you, and never present a sermon excerpt as Scripture itself.
3. **General study layer.** Only after the above, add standard background (genre,
   structure, key terms, cross-references). Label this clearly as general study, not
   church corpus.

## Output shape

A brief the preacher can actually use:
- **Passage + context** (1–2 lines)
- **What our church has said** — cited, with what's been emphasized and what hasn't
- **Key observations** — structure, terms, tensions in the text
- **Threads to pull** — angles that build on (not repeat) prior treatments
- **Open ground** — what the recorded sermons have NOT yet drawn out here

## Costs and errors

Every tool above is free. A Rewind-written synthesis (`ask` with `synthesize: true`)
is optional and spends the church's metered allowance. Request one only if the user
asks for it: call first without `spendConfirmed` to get the cost disclosure, relay it
(don't invent an amount or balance), and only after an explicit yes repeat the call
with `spendConfirmed: true`. Never set `spendConfirmed` on your own.

If a tool refuses, read its `code`: on `rate_limited`, wait `retryAfterSeconds` (about
a minute if absent) and retry once; on `daily_limit`, stop and tell the user the
token's daily request limit is reached (it resets within 24 hours); on
`auth_required`, tell them to reconnect Rewind. An error without a `code`: report what
it says and don't loop. Never repeat a confirmed synthesis after any other failure.

## Rules

- **Corpus claims are cited verbatim**; general-study claims are labeled as such.
  Never blur the two.
- **No fabricated corpus.** If the church hasn't preached the passage, say so — that
  shapes the brief (it's fresh ground in the recorded archive) rather than being a
  gap to paper over.
- **The preacher's voice wins.** This is raw material for their study, not a finished
  position to adopt.
