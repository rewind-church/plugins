---
name: Corpus lookup
description: Use when someone asks what their church has preached about a topic, passage, or theme — "have we preached on X", "what have we said about <topic>", "how did we handle <passage>", "compare how we preached A vs B", "how has our teaching on <theme> changed over time", "which books have we never preached", "what were our recent sermons". Answers ONLY from the church's own sermons, with verbatim citations.
version: 0.5.0
---

# Corpus lookup — what has this church actually preached?

Answer questions about the church's preaching using the Rewind MCP tools (`rewind`
server). Everything is **scoped to this church**, and every answer is **grounded only
in what was preached**, with verbatim citations. No tool can create, edit or delete
sermon content. The one write is `add_to_chat`, which saves clips the user asks you
to save to their private history.

## Pick the right tool

- **A direct "what have we said about X?" question** → `ask` with `question`
  (`corpus_qa` is the same tool under its older name). It returns free, exact cited
  excerpts (`citations`, `hits`); read them and answer from them yourself. Without a
  synthesis, its `answer` field is a standing caveat, not an answer. Use this as the
  default.
- **"Find the sermons / show me where we said …"** → `corpus_search` (`query`, `k` up
  to 20) for verbatim transcript excerpts with title, speaker, date and timestamp, or
  `search` (`query`, `limit`) for ranked sermon moments.
- **"Compare how we preached A vs B"** → `compare_treatments` with `columnA` and
  `columnB`, each `{ "subject": "…", "filters": { … } }`. It returns separate cited
  evidence for each side; you draw the contrast. Different emphasis is not
  contradiction.
- **"How did our teaching on <theme> develop over time?"** → `trace_theme` with
  `theme` (cited excerpts in recorded-date order).
- **"Which Bible books / passages have we (never) preached?"** → `scripture_coverage`
  (optional `year`) or `coverage` (optional `range` such as `"Romans 5–8"`, plus
  `filters`).
- **"Group what we've said on <topic or book> into themes"** → `map_topic` with
  `topic` OR `passage` (a book, chapter or chapter range such as `"Romans 5–8"`; verse
  ranges are refused), and up to twelve `groups` of `{ "label": "…", "query": "…" }`
  that you propose (`perGroup` returns up to 3 excerpts each).
- **"What illustrations have we used for <topic>?"** → `find_illustrations` with
  `topicOrPassage` (free, from a precomputed index; `limit` up to 8; optional
  `notToldSince` date).
- **"Does my draft overlap what we've already preached?"** → `check_overlap` with the
  draft as `text`. The draft is not stored; embeddings of its retrieval windows are
  cached for up to 24 hours.
- **"What did we preach recently / last week?"** → `list_recent_sermons` (`limit`,
  `contentKind`; newest first by preached date) or `search` with `order: "recent"` and
  no `query`. `corpus_search` ranks by RELEVANCE, not recency.
- **"Pull up / read that whole sermon"** → `get_sermon` with `sermonId`, or `title`
  plus `date` (YYYY-MM-DD). It returns the overview and full verbatim transcript by
  default; `include` can add `"group-guide"`, `"devotional"` or `"illustrations"`.
- **"Which stories did this specific sermon use?"** → `get_sermon` with
  `include: ["illustrations"]`.
- **"Save this" / "what did I save before?"** → `add_to_chat` / `history` (see
  Saving clips).

You can chain them: `corpus_search`, `search`, `scripture_coverage` or
`list_recent_sermons` to find a sermon and its id, then `get_sermon` to read it in
full. (The same content is also available as resources — `rewind://sermon/{id}/overview`
or `/transcript` — if your client prefers resource reads.)

### Reading a sermon with `get_sermon`

- A `title` + `date` that matches more than one sermon returns
  `lookupState: "ambiguous"` with `matches`. Ask which one, then use its `sermonId`.
- Long transcripts page. Pass `at` (seconds) to start at a moment. To continue, call
  again with `parts.transcriptPage.nextOffset` as `offset`, `nextSegmentOffset` as
  `segmentOffset`, and the same `transcriptHash`. Unknown keys are refused.
- `missing` lists requested parts that are absent, and `reasons` says why:
  `not_generated` (the part isn't available), `not_approved` (the stored overview
  hasn't been approved) or `not_analyzed` (the sermon hasn't been analyzed for
  stories). An analyzed sermon with no stories returns an empty illustrations list
  instead. Report missing analysis honestly. If an illustration's timestamp or link
  is withheld after a transcript change, do not fabricate or validate it.

## Narrowing with filters

`corpus_search`, `search`, `ask`, `corpus_qa`, `compare_treatments` (per column),
`trace_theme`, `map_topic`, `check_overlap`, `find_illustrations` and `coverage` take
an optional `filters` object: `speaker` · `book` (+ `chapter`, which needs `book`) ·
`topic` · `contentKind` · `fromDate`/`toDate` (YYYY-MM-DD, oldest first).
`list_recent_sermons` takes a top-level `contentKind`; `scripture_coverage` takes
only `year`.

- `contentKind` is one of `"sermon"` (the weekend message — most of the corpus) ·
  `"class"` · `"conference"` · `"midweek"` · `"special"`. Every tool above except
  `corpus_search` defaults to `"sermon"`; set another kind when the person asks about
  classes, conferences and so on (one kind per call). `corpus_search` and
  `list_recent_sermons` include every kind when it's omitted. Every result carries
  its `contentKind`, so label non-sermon content for what it is (a class session, not
  a sermon).
- Field names are exact — the server rejects unknown filter keys rather than
  silently ignoring them, so a validation error means fix the field name, not drop
  the filter.

## Saving clips (the one write)

`add_to_chat` saves source clips to the user's private Rewind history. Call it only
when the user explicitly asks to save — never because they opened, read or discussed
a source. Pass `items` (1–6 of `{ "sermonId", "startSeconds", "quote" }`, where `quote`
is the exact source wording), an optional `topic`, and optionally a `requestKey`.

A timeout does not prove the save failed. Retry the same selection with the same
`requestKey`, or check without writing by calling `history` with that `requestKey`
alone. Without a key, an identical retry replays the earlier save; the result's
`operation.requestKey` is the key to check with. `history` (`topic`, `since`, `limit`;
pass `nextBefore` back as `before` for the next page) recalls earlier clips when the
user asks to resume their research.

## Cost: free unless the user confirms a synthesis

Every tool is free by default. A Rewind-written synthesis is optional: `ask`,
`corpus_qa` and `compare_treatments` take `synthesize: true`, and `trace_theme` takes
`deep: true`. Request one only when the user asks for a Rewind-written answer.

- First call with the synthesis flag but WITHOUT `spendConfirmed`. That spends nothing
  and returns `generationConfirmationRequired: true` with a cost disclosure.
- Relay the disclosure: the synthesis uses the church's metered Rewind allowance, and
  the exact amount and balance are not reported (don't invent them). Ask for an
  explicit yes.
- Only after that yes, repeat the call with `spendConfirmed: true`. A yes covers that
  one request, not the rest of the session.
- Never set `spendConfirmed` on your own initiative.

## When a tool refuses

Read the error's `code`:

- `rate_limited` — wait `retryAfterSeconds` (about a minute if it's absent), then
  retry the same call once. If it is refused again, tell the user.
- `daily_limit` — stop calling Rewind tools. Tell the user the token's daily request
  limit is reached; it resets within 24 hours.
- `auth_required` — tell the user to reconnect Rewind (mint a new token in Studio →
  Connections and update `REWIND_MCP_TOKEN`, or reconnect the connector).

An error with no `code` (for example a spend or research limit on a synthesis, or a
`search`/`fetch` refusal), or with `retryable: false`: tell the user what it says, fix
the input if it names a fix, and don't loop. Never repeat a confirmed synthesis after
any failure other than `rate_limited`; it may already have spent.

## Rules

- **Cite verbatim.** Sermon title + date + speaker + timestamp on every claim. A
  quote shown is a quote actually preached — never smooth or paraphrase it into one.
- **No fabrication.** "We don't have a recorded sermon on that" is a valid, useful
  answer. Say it as a fact about the recorded archive, not proof the church never
  taught it. Never invent teaching to fill a gap.
- **Attribution intact.** Personal stories keep their teller; titles and names render
  exactly as returned.
- **Selected excerpts are not doctrine.** Read them in context. Don't infer the
  church's doctrine from one speaker or a handful of excerpts.
