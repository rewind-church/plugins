---
name: Study brief
description: Use when someone wants a study brief or exegetical starting point for a passage, beginning with their church's recorded treatments, then Scripture context and clearly labeled general study.
version: 0.6.0
---

# Study brief

Read [the research contract](../../references/research-contract.md) before calling tools. Build a working brief from the church's recorded teaching before adding general study. This connection cannot edit sermon content.

## Build a brief

1. Call `ask` with a `question` about the passage for cited evidence, or `search` with `query` to find moments. Narrow with `filters.book` and `filters.chapter` when appropriate. The default content kind is weekend messages. If the user wants classes or another kind, set it explicitly and label the results.
2. Open relevant messages with `get_sermon` using the returned `sermonId`. Read original context and continue long transcripts with the returned offsets and `transcriptHash`. Requested group guides or devotionals may be absent or unapproved; report those states.
3. Call `coverage` with a book or chapter `range`, such as `"Romans"` or `"Romans 5–8"`, to place the recorded treatments in context. Carry the effective filters into coverage claims. A recorded gap is not proof that the church never taught the passage.
4. Obtain Bible text from an available Scripture source if needed. Rewind's research tools do not supply Bible text. Never present a sermon quotation as Scripture.
5. Add general background, genre, structure, key terms, or cross-references only after the recorded evidence. Label these as general study, separate from what the church preached.

Present the passage and context, cited prior treatments, key observations, possible threads to explore, and questions the returned evidence leaves open. Preserve source titles, speakers, dates, links, timestamps, Scripture references, and content kinds. Quote exactly. Do not infer a doctrinal position from selected excerpts or invent missing historical treatments.

## Keep sources and costs explicit

Compare subjects by obtaining evidence for each and reading it in context in the conversation. Use `trace_theme` for dated statements and `map_topic` when grouped indexed-word counts help. The preacher decides what to adopt.

Discuss does not save. Use `add_to_chat` only for a requested save and `history` to resume earlier chosen sources. Before saving a story, fetch a versioned transcript page at its moment. Use exact contiguous wording and the original segment start. Do not add omission markers.

The research contract governs request limits, errors, data controls, and uncertain saves. Source evidence uses no metered Rewind synthesis. Optional synthesized `ask` requires its cost disclosure and an explicit yes for that request before `spendConfirmed: true`. Never infer consent or invent an amount or balance.
