---
name: Corpus lookup
description: Use when someone asks what their church has preached about a topic, passage, or theme — "have we preached on X", "what have we said about <topic>", "how did we handle <passage>", "compare how we preached A vs B", "how has our teaching on <theme> changed over time", "which books have we never preached", "what were our recent sermons". Answers ONLY from the church's own sermons, with verbatim citations.
version: 0.5.0
---

# Corpus lookup — what has this church actually preached?

Answer questions about the church's preaching using the Rewind MCP tools (`rewind`
server). Everything is **read-only and scoped to this church**, and every answer is
**grounded only in what was preached**, with verbatim citations.

## Pick the right tool

- **"Open the teaching research workspace"** → `open_research_workspace` when
  the server advertises it and the host supports MCP Apps. Pick `view` from
  `archive`, `topics`, `illustrations`, `scripture` or `continuity`. This is a
  presentation opener; it does not run research or generate an answer. In a
  text-only client, continue with the tools below.

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
- **"What did we preach recently / last week?"** → `list_recent_sermons` (newest
  first by preached date — `corpus_search` ranks by RELEVANCE, not recency).
- **"Pull up / read that whole sermon"** → `get_sermon` (one sermon by id: overview +
  full verbatim transcript, optionally group guide, devotional, or illustrations).
- **"Which stories did this specific sermon use?"** → `get_sermon` with
  `include: ["illustrations"]` (free), not the metered cross-sermon search.

You can chain them: `corpus_search`, `scripture_coverage`, or `list_recent_sermons`
to find the sermon and its id, then `get_sermon` to read it in full. (The same
content is also available as resources — `rewind://sermon/{id}/overview` or
`/transcript` — if your client prefers resource reads.)

`get_sermon` returns `missing` plus `reasons`: `not_generated` means a requested
generated part is unavailable; `not_analyzed` means illustrations have not been
analyzed yet. An analyzed sermon with no stories returns an empty illustrations
list instead. Report missing analysis honestly. If an illustration's timestamp
or link is withheld after a transcript change, do not fabricate or validate it.

## Narrowing with filters

`corpus_search`, `corpus_qa`, `compare_treatments` (per column), `trace_theme`, and
`find_illustrations` all take an optional `filters` object: `speaker` · `book` (+
`chapter`) · `topic` · `contentKind` · `fromDate`/`toDate` (YYYY-MM-DD).
`list_recent_sermons` takes a top-level `contentKind`.

- `contentKind` scopes to one kind of content: `"sermon"` (the weekend message —
  most of the corpus) · `"class"` · `"conference"` · `"midweek"` · `"special"`.
  Use it when the person says "in our classes", "weekend sermons only", and so on;
  omit it to search everything. Every result's metadata carries its `contentKind`,
  so label non-sermon content for what it is (a class session, not a sermon).
- Field names are exact — the server rejects unknown filter keys rather than
  silently ignoring them, so a validation error means fix the field name, not drop
  the filter.

## Rules

- **Cite verbatim.** Sermon title + date + speaker + timestamp on every claim. A
  quote shown is a quote actually preached — never smooth or paraphrase it into one.
- **Scope and provenance.** Keep the returned query/filters and limitations with
  the result. Retrieval is bounded: no selected evidence does not prove the
  church never taught a topic. Preserve sparse citation tokens, canonical links,
  speaker and exact excerpts. Only `verified: true` means a quote was matched;
  unverified wording remains unverified. Tokens restart across research runs:
  retain the App's qualified reference (for example `R2:c1`) and original token
  when reviewing a selected-source follow-up.
- **No fabrication.** Say when the selected sources are insufficient. Never
  invent teaching, Bible text or church doctrine to fill a gap.
- **Continuity needs context.** Use `compare_treatments` with independent
  speaker/date scopes or `trace_theme`, then `get_sermon` to inspect the exact
  statements and their surrounding transcript. Distinguish possible
  contradiction from compatible paraphrase/emphasis, audience context,
  explicit correction/development, insufficient evidence and interpretation
  ambiguity. Do not infer church doctrine from a speaker. Doctrine comparison
  needs explicit church-approved versioned sources; Scripture interpretation
  needs passage context and source attribution. Present a pastoral review aid,
  never a verdict of biblical truth, an accusation or an enforcement decision.
- **Attribution intact.** Personal stories keep their teller; titles and names render
  exactly as returned.
- **Metered tools cost the church a few cents** (`corpus_qa`, `compare_treatments`,
  `trace_theme`, `find_illustrations`); `corpus_search`, `scripture_coverage`, and
  `get_sermon` are free. Prefer the free tools for exploration, the metered ones for
  the real answer.
