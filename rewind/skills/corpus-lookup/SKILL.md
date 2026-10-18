---
name: Corpus lookup
description: Use when someone asks what their church has preached about a topic, passage, or theme, wants recent messages, compares prior treatments, checks recorded coverage, or resumes saved source research. Answer from the church's recorded teaching with exact citations.
version: 0.6.0
---

# Corpus lookup

Read [the research contract](../../references/research-contract.md) before calling tools. Use the Rewind MCP server for this church's recorded teaching. No tool can edit sermon content. Save clips only when the user asks.

## Choose a tool

- For a direct question, call `ask` with `question`. Read the free `citations` and `hits` and answer from the evidence. Without synthesis, a standing caveat in `answer` is not a generated answer.
- To discover moments, call `search` with `query` and optional `filters` and `limit` up to 20. Open relevant sources with `get_sermon`.
- For recent messages, call `search` with `order: "recent"` and no `query`. Dates order these results, not relevance.
- For a comparison, call `ask` or `search` for each subject, read context with `get_sermon`, then compare in the conversation. Different emphasis alone is not contradiction.
- For statements over time, call `trace_theme` with `theme`. Preserve recorded dates and scope.
- For Scripture coverage, call `coverage` with optional `range`, such as `"Romans 5–8"`, and `filters`. It defaults to weekend messages.
- For grouped archive counts, call `map_topic` with `topic` or `passage`, plus 1–12 groups of `{ "label": "…", "query": "…" }`. A book or chapter range works; a verse range is refused. `perGroup` is at most 3.
- For stories, call `find_illustrations` with `topicOrPassage`, optional `notToldSince`, and `limit` up to 8. Whole stories, partial excerpts, unknown usage, and incomplete indexes stay distinct.
- For overlap in a draft, disclose the draft-data behavior in the research contract, then call `check_overlap` with `text`. Describe shared wording and related evidence neutrally.
- To read one message, call `get_sermon` with `sermonId`, or `title` plus `date`. Use `include` for requested available artifacts. Continue versioned transcript pages exactly as the research contract describes.
- To resume private source research, call `history`. Call `add_to_chat` only for an explicit request to save, using exact contiguous transcript wording and the original segment start.

## Answer from the evidence

Cite title, date, speaker, returned link, and timestamp when available. Preserve returned Scripture references and content kinds. Quote exactly and distinguish your interpretation. An empty or partial result describes this request's available archive, not the church's entire history.

For any illustration save, first fetch a versioned transcript page at the story moment. Use the source segment's start rather than a labeled story moment. Do not add omission markers to the exact wording or guess a timestamp. The research contract also governs save recovery, spending confirmation, errors, and client-data controls.
