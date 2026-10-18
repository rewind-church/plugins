---
name: Illustration finder
description: Use when someone wants stories or illustrations previously told in their church's recorded teaching, with whole available source wording, original attribution, recorded-use facts, and source context.
version: 0.6.0
---

# Illustration finder

Read [the research contract](../../references/research-contract.md) before calling tools. Find stories through Rewind's MCP server. This connection cannot edit sermon content. This workflow needs no paid synthesis.

## Find and read stories

1. For a topic or passage across messages, call `find_illustrations` with `topicOrPassage`. Optional `limit` is at most 8. Use `notToldSince` only when the user requests a recorded-use cutoff. Narrow with `filters`; weekend messages are the default.
2. For one message, find its ID with `search`, then call `get_sermon` with `include: ["illustrations"]`.
3. Present the returned teller, title, date, source link, and time when available. Preserve attribution exactly. `storyCompleteness: "full"` means `storyText` contains the whole canonically available story. `"excerpt_only"` means complete source wording is unavailable. Say which you have. Do not shorten a requested whole story into a new synopsis.
4. Read surrounding original context with `get_sermon` at the returned story moment. If a timestamp or link is withheld, say so. Do not invent one.

Recorded `timesTold` and `lastToldAt` are neutral facts. Deliberate reuse can be useful. Null counts or dates stay unknown. A `"partial"` state or `partialReason` means this request could not use a complete index or date set. It is not evidence that no story exists.

For a specific message, `reasons.illustrations: "not_analyzed"` is different from an analyzed empty `parts.illustrations` list. Missing analysis is not a finding that the message has no stories.

## Save a chosen story from the transcript

Save only when the user asks. Discuss, reading, and opening never authorize a save.

Before any illustration save, call `get_sermon` with its `sermonId`, the returned moment as `at`, and `include: ["transcript"]`. This returns a versioned page. Select exact contiguous wording from `parts.transcriptSegments` and use the original starting segment's `startSeconds`. If the story spans pages, continue with the returned offsets and `transcriptHash`. Preserve the contiguous selected range.

Specific-sermon illustrations return exact bounded `excerpt` text and its actual source `startSeconds`. A separate `excerptTruncated` flag says that more wording follows. The labeled `atSeconds` can differ from the source start. Read the versioned transcript page before choosing the story range. Do not add an omission marker to a quote or use the label's time as the source time. If source wording or timing is unavailable, explain the limitation instead of guessing.

Call `add_to_chat` with the selected `sermonId`, source `startSeconds`, and exact `quote`. Keep a stable `requestKey` for retries. Check an uncertain save with `history(requestKey)` before writing again. An empty quote at zero represents a whole-message reference, never a chosen story. Follow the research contract for selection limits, recovery, refusals, and client-data controls.

## Keep attribution intact

Never rewrite another speaker's personal story in the first person for the current preacher. Their experience remains theirs. Keep who told it exactly as returned.

If no usable story is returned, describe the searched scope and limitations. Do not invent a story and call it something the church used. Label any fresh suggestions as your own ideas, separate from recorded source material.
