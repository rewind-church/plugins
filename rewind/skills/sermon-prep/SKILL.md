---
name: Sermon prep
description: Use when someone prepares a sermon on a passage or topic and wants prior teaching, recorded Scripture coverage, attributed stories, or a draft-overlap check from their own church's archive.
version: 0.6.0
---

# Sermon prep

Read [the research contract](../../references/research-contract.md) before calling tools. Help the preacher choose a direction from recorded evidence and their own judgment. Rewind cannot edit sermon content through this connection.

## Prepare a message

1. Confirm the passage, topic, audience, and occasion from the request. Ask one short question only when the target is ambiguous.
2. Call `ask` with `question` for free cited evidence, or `search` with `query` to discover moments. Narrow with `filters` when requested. Research defaults to weekend messages. Open relevant context with `get_sermon`.
3. For a passage, call `coverage` with an optional book or chapter `range`, such as `"Romans 5–8"`. Carry its effective scope into the answer. A recorded gap does not prove the church never taught the text.
4. Call `find_illustrations` with `topicOrPassage` for attributed stories. Retain the teller and whole available wording. Treat recorded reuse counts and dates as neutral facts. Never retell another speaker's personal story as the current preacher's experience.
5. If the preacher asks to check a draft, disclose the draft-data behavior in the research contract before calling `check_overlap` with `text`. Shared wording is descriptive. Reuse, revision, and theological judgment remain the preacher's choices.
6. Offer possible angles or an outline. Separate quoted prior teaching from your own suggestions. Let the preacher decide whether to build on, revisit, or revise earlier teaching.

Use `map_topic` when grouped counts help, `trace_theme` for statements over time, and `search` with `order: "recent"` and no `query` for the run-up to this week's message. Compare subjects by reading each side's cited context in the conversation.

Cite every claim about prior teaching with the returned title, date, speaker, link, and timestamp when available. Preserve content-kind labels. Unknown metadata stays unknown. Do not infer doctrine from selected quotations or invent an absence claim.

## Read, discuss, and save

Continue long transcripts with the returned offsets and `transcriptHash`. Discuss does not save. Use `history` when the user asks to resume earlier research. Use `add_to_chat` only for an explicit save request. For a story, fetch a versioned transcript page at its moment before selecting exact contiguous wording and the original segment start. Never add omission markers to the exact source wording.

The research contract governs cost disclosure, confirmation, uncertain saves, request limits, and errors. Optional `ask` synthesis or deep `trace_theme` uses metered Rewind allowance only after explicit confirmation for that request. Never set `spendConfirmed` yourself.
