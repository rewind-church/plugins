---
name: Illustration finder
description: Use when someone preparing to preach wants illustrations, stories, or examples for a topic or passage from their church's own preaching — "find illustrations for <topic>", "have we told a story about <theme>", "I need an example for <passage>", "what stories have we used on <topic>". Returns past illustrations with attribution preserved verbatim.
version: 0.4.0
---

# Illustration finder

Surface illustrations and stories the church has already used, via the Rewind MCP
tools (`rewind` server). Scoped to this church; no tool can change sermon content.

## How to use

1. For a **topic or passage across sermons**, call `find_illustrations` with
   `topicOrPassage`. It is free and reads a precomputed story index. Optionally pass
   `limit` (up to 8), `notToldSince` (YYYY-MM-DD: only stories whose last recorded
   use predates it), and `filters` (`speaker`, `book`/`chapter`, `topic`,
   `fromDate`/`toDate`, and `contentKind`, which defaults to weekend `"sermon"`; set
   `"class"`, `"conference"`, `"midweek"` or `"special"` to search those instead).
2. For the stories in **one specific sermon**, get its id from `corpus_search`,
   `search` or `list_recent_sermons`, then call `get_sermon` with
   `{ "sermonId": "<id>", "include": ["illustrations"] }`. This is also free.
3. Present each result with **attribution preserved exactly** — the sermon, the
   timestamp, and **who told it**. When `storyCompleteness` is `"full"`, `storyText`
   holds the whole story in its original wording; `"excerpt_only"` means only an
   excerpt is available, so say so.
4. If helpful, pull the surrounding context with `get_sermon` at the story's moment
   (`at` in seconds) so the preacher can see how the illustration landed.

For `find_illustrations`, `timesTold` and `lastToldAt` are neutral facts about
recorded use, not warnings; deliberate reuse can be valuable. Unknown counts or dates
stay unknown. A `"partial"` state or a `partialReason` means the index was incomplete
for this request — it is not evidence that no story exists.

For `get_sermon`, preserve the distinction between `reasons.illustrations =
"not_analyzed"` (the sermon has not been analyzed for stories) and an empty
`parts.illustrations` list (analyzed, none found). Never turn missing analysis into a
claim that the sermon contains no stories. A null `atSeconds` or `url` means the
timestamp/link is withheld after a transcript change; do not invent one or present it
as checked. Preserve each returned excerpt and attribution.

If the user asks to keep a story, `add_to_chat` saves it (with `sermonId`,
`startSeconds` and the exact `quote`) to their private history. Only save when asked.

## Costs and errors

Both lookups above are free; this skill never needs a paid synthesis. If a tool
refuses, read its `code`: on `rate_limited`, wait `retryAfterSeconds` (about a minute
if absent) and retry once; on `daily_limit`, stop and tell the user the token's daily
request limit is reached (it resets within 24 hours); on `auth_required`, tell the user
to reconnect Rewind. An error without a `code`: report what it says and don't loop.

## Rules (critical for illustrations)

- **Never rewrite a personal story in the first person** for the current preacher. If
  another speaker told "when my daughter was born…", it stays theirs — attributed,
  not adopted. Re-attributing someone's personal story to the current preacher is a
  trust violation.
- **Attribution is verbatim** — render who told it exactly as returned.
- **No fabrication.** If the church hasn't used an illustration on the topic, say so;
  don't invent one and present it as something the church has used.
- Offer your OWN fresh illustration ideas only when clearly labeled as new
  suggestions, separate from the cited corpus results.
