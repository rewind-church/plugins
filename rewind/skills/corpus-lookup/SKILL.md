---
name: Corpus lookup
description: Use when someone asks what their church has preached about a topic, passage, or theme — "have we preached on X", "what have we said about <topic>", "how did we handle <passage>", "compare how we preached A vs B", "how has our teaching on <theme> changed over time", "which books have we never preached". Answers ONLY from the church's own sermons, with verbatim citations.
version: 0.2.0
---

# Corpus lookup — what has this church actually preached?

Answer questions about the church's preaching using the Rewind MCP tools (`rewind`
server). Everything is **read-only and scoped to this church**, and every answer is
**grounded only in what was preached**, with verbatim citations.

## Pick the right tool

- **A direct "what have we said about X?" question** → `corpus_qa` (synthesizes an
  answer across sermons with verbatim citations). Use this as the default.
- **"Find the sermons / show me where we said …"** → `corpus_search` (verbatim
  transcript excerpts with title, speaker, date, timestamp).
- **"Compare how we preached A vs B"** → `compare_treatments` (two subjects side by
  side, with a contrast).
- **"How did our teaching on <theme> develop over time?"** → `trace_theme`
  (date-ordered development).
- **"Which Bible books / passages have we (never) preached?"** → `scripture_coverage`.
- **"What illustrations have we used for <topic>?"** → `find_illustrations`.
- **"Pull up / read that whole sermon"** → `get_sermon` (one sermon by id: overview +
  full verbatim transcript, optionally group guide + devotional).

You can chain them: `corpus_search` or `scripture_coverage` to find the sermon and
its id, then `get_sermon` to read it in full. (The same content is also available as
resources — `rewind://sermon/{id}/overview` or `/transcript` — if your client prefers
resource reads.)

## Rules

- **Cite verbatim.** Sermon title + date + speaker + timestamp on every claim. A
  quote shown is a quote actually preached — never smooth or paraphrase it into one.
- **No fabrication.** "We haven't preached on that yet" is a valid, useful answer.
  Never invent teaching to fill a gap.
- **Attribution intact.** Personal stories keep their teller; titles and names render
  exactly as returned.
- **Metered tools cost the church a few cents** (`corpus_qa`, `compare_treatments`,
  `trace_theme`, `find_illustrations`); `corpus_search`, `scripture_coverage`, and
  `get_sermon` are free. Prefer the free tools for exploration, the metered ones for
  the real answer.
