---
name: Study brief
description: Use when a pastor wants a study brief or exegetical starting point for a passage, grounded in how their own church has treated it — "build me a brief on <passage>", "study notes for <text>", "what do I need to know to preach <passage>", "pull together background on <text>". Leads with the church's own corpus, then scripture, then general study.
version: 0.2.0
---

# Study brief — a passage brief led by your church's corpus

Assemble a working study brief for a passage. The distinctive value is that it
**leads with how THIS church has already treated the text** (via the Rewind MCP
`rewind` server), not generic commentary.

## Build order (corpus first)

1. **The church's own treatments.** `corpus_qa` ("How has our church preached
   <passage>?") and `corpus_search` for the verbatim moments. When a sermon is on
   point, `get_sermon` (by its id) for the overview and/or full transcript — or the
   `rewind://sermon/{id}/overview` resource if your client prefers. Cite each
   (title + date + speaker + timestamp).
2. **Scripture context.** The passage itself, its immediate context, and — via
   `scripture_coverage` — how this book sits in the church's overall preaching.
3. **General study layer.** Only after the above, add standard background (genre,
   structure, key terms, cross-references). Label this clearly as general study, not
   church corpus.

## Output shape

A brief the pastor can actually use:
- **Passage + context** (1–2 lines)
- **What our church has said** — cited, with what's been emphasized and what hasn't
- **Key observations** — structure, terms, tensions in the text
- **Threads to pull** — angles that build on (not repeat) prior treatments
- **Open ground** — what the church has NOT yet drawn out here

## Rules

- **Corpus claims are cited verbatim**; general-study claims are labeled as such.
  Never blur the two.
- **No fabricated corpus.** If the church hasn't preached the passage, say so — that
  shapes the brief (it's fresh ground) rather than being a gap to paper over.
- **The pastor's voice wins.** This is raw material for their study, not a finished
  position to adopt.
