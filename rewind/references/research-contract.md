# Rewind research contract

Read this reference before using a Rewind skill. It applies to all five workflows in this plugin.

## Catalog and scope

Use only the ten App tools: `search`, `get_sermon`, `ask`, `check_overlap`, `find_illustrations`, `map_topic`, `coverage`, `trace_theme`, `add_to_chat`, and `history`. Compare subjects by obtaining contextual cited results for each and discussing them in the conversation. Do not call a separate comparison or workspace tool.

Research tools that accept `filters` default to `contentKind: "sermon"`, the weekend message. Set one of `"class"`, `"conference"`, `"midweek"`, or `"special"` when requested. Filters are `speaker`, `book`, `chapter`, `topic`, `contentKind`, `fromDate`, and `toDate`. A chapter needs its book, and dates run oldest to newest. Unknown fields are refused. Correct the input rather than dropping the user's scope.

`search` relevance needs `query`. For newest first, use `order: "recent"` without `query`; use `filters` to narrow the list. Both modes accept `limit` up to 20. Do not describe relevance order as recency.

## Evidence and source reading

Cite returned title, date, speaker, source link, timestamp, and Scripture references when available. Preserve names and titles exactly. Label each content kind correctly. Do not invent missing metadata or a word-level time from a segment timestamp. Quotations retain exact wording. Separate your interpretation from the quotation and from general study suggestions.

A bounded search, an empty index, or selected quotations do not establish the church's doctrine or prove that it never taught a subject. Carry the returned scope, partial state, missing analysis, and limitations into the answer. Deliberate reuse is a valid pastoral choice. Reuse counts and dates are neutral facts, not warnings. `check_overlap` gives no plagiarism, originality, or theological verdict.

Open context with `get_sermon`, using `sermonId` or `title` plus `date` in YYYY-MM-DD form. If `lookupState` is `"ambiguous"`, ask which returned match the user means. For a timed source page, pass `at` and `include: ["transcript"]`.

Long transcripts page. Pass `parts.transcriptPage.nextOffset` as `offset`, `nextSegmentOffset` as `segmentOffset`, and the same `transcriptHash`. These are absolute cursors; omit `at` on continuation. Do not send `nextOffset` as an input key. If the source version changes, read again rather than joining pages across versions. A final page means the requested range ended, not that earlier pages were read or that the archive is complete. Use the App's continuation control when present to keep the same reader.

`missing` and `reasons` distinguish `not_generated`, `not_approved`, and `not_analyzed`. An analyzed empty illustration list is different from missing analysis. Withheld timestamps or source links remain unknown.

## Discuss and save have different effects

Discuss brings selected original material and its attribution into the conversation. Reading, opening, or discussing a source never authorizes a save. Do not call `add_to_chat` for Discuss or inferred interest.

Only after the user asks to save, obtain exact source wording. For an illustration, first call `get_sermon` at its returned moment with `include: ["transcript"]` to obtain a versioned source page. Use contiguous wording from `parts.transcriptSegments` and the original starting segment's `startSeconds`. Fetch continuation when the selected story exceeds the page. Specific-sermon illustrations return exact bounded `excerpt` text, its source `startSeconds`, and a separate `excerptTruncated` flag. The labeled `atSeconds` can differ from that source start. Do not add omission markers, join noncontiguous snippets, paraphrase a quote, or substitute a label's time for its source time. If timing is withheld, explain that limitation instead of guessing.

`add_to_chat` accepts `items`, 1–6 objects with `sermonId`, `startSeconds`, and `quote`. A quote can contain up to 50,000 characters, with a 120,000-character total selection cap. An empty quote at zero is only a deliberate whole-sermon reference. Never substitute it for a selected quote. Preserve the title, date, speaker, passages, and source link in the conversation too. Do not claim that a save receipt proves a separate host message was displayed.

Use a stable `requestKey` for a deliberate selection. A timeout does not prove failure. Retry the same selection and key, or call `history` with `requestKey` alone to check without writing. An identical unkeyed retry replays its earlier save; use the returned `operation.requestKey` for recovery. Use a fresh key only for a new selection. For history pages, pass `nextBefore` unchanged as `before` when `hasMore` is true. Unavailable or changed source wording stays withheld.

## Cost and request limits

Retrieval, stored artifacts, and precomputed illustrations use no metered Rewind synthesis. Query embeddings can still run. The chosen client has its own subscription or API costs.

Optional Rewind-written synthesis uses metered church allowance. For `ask`, use `synthesize: true`; for `trace_theme`, use `deep: true`. Request the disclosure first without `spendConfirmed`. Relay the returned disclosure, including unavailable amounts or balances. Wait for an explicit yes for that request before repeating with `spendConfirmed: true`. Never infer confirmation, invent a price, or treat one yes as session-wide permission.

Every tool and resource read consumes the token's request limits, including a cache hit. On refusal:

- `rate_limited`: wait `retryAfterSeconds`, or about a minute if absent, then retry the same call once. Stop if refused again.
- `daily_limit`: stop calling Rewind and explain that the request limit resets within 24 hours.
- `auth_required`: reconnect using the user's authorized account, or replace their own revoked or expired token in **Studio → Settings → Connections**.
- A validation error, `retryable: false`, or an error without a `code`: report the refusal, correct any named input issue, and do not loop.

Never repeat a confirmed synthesis after an uncertain failure other than an explicit `rate_limited` refusal. It may already have spent allowance. Do not mint credentials to evade a limit.

## Draft and client data

Before sending draft text to `check_overlap`, explain that a cache miss may send up to three 500-character excerpts to OpenAI for embeddings. This path does not persist the draft text. Derived vectors use hashed cache keys and a configurable 24-hour default. Do not describe the default as an unconditional retention maximum.

Material supplied to the chosen AI client also follows that client's training, Memory, retention, and sharing controls. Rewind's provider commitments do not override client settings. Do not promise that material never leaves Rewind or that a native host never stores or trains on it.
