# Rewind for Claude

Search your church's recorded teaching, read original context, and prepare a message with cited sources. The plugin selects Rewind's ten-tool MCP App catalog. The connection cannot create, edit, or delete sermon content. It saves selected source clips to your private Rewind history only when you ask.

## Connect and install

You need Studio research access in your church's Rewind environment. Supported roles are admin, staff, planter, seminary faculty, and seminary student. An ordinary member account cannot create a token. Ask your church administrator if you cannot open Connections.

1. Create a personal MCP token in **Studio → Settings → Connections** at `https://<your-church>.rewind.church/studio/settings/connections`.
2. Set both values in the terminal that launches Claude Code:

   ```bash
   export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
   export REWIND_MCP_TOKEN="rwd_mcp_YOUR_TOKEN_HERE"
   ```

   `REWIND_MCP_URL` is the canonical endpoint without a query. The plugin appends `?profile=app`. Remove an existing `?profile=...` suffix from this variable before starting the new plugin.

3. Install the plugin:

   ```bash
   claude plugin marketplace add rewind-church/plugins
   claude plugin install rewind@rewind-church
   ```

4. Start a new Claude Code session from that terminal. Check `/mcp` for `rewind`.

For an existing installation, update the marketplace and Rewind through Claude Code's plugin manager, then restart. The public [setup guide](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md) includes other clients, upgrades, limits, and troubleshooting. This package installs a Claude Code plugin. Other MCP clients require their own connection setup.

## Use the ten App tools

| Tool | Inputs and behavior |
| --- | --- |
| `search` | Use `query` for relevance, or `order: "recent"` without `query` for newest first. Optional `filters` and `limit` up to 20. |
| `get_sermon` | Use `sermonId`, or `title` and `date`. Read overview and transcript by default. Add `include` for available group guides, devotionals, or illustrations. Transcripts have versioned continuation. |
| `ask` | Use `question` for cited source evidence. Optional confirmed `synthesize: true` requests Rewind-written synthesis. |
| `check_overlap` | Use draft `text` up to 20,000 characters. Describes shared wording and related evidence, without an originality or theological verdict. |
| `find_illustrations` | Use `topicOrPassage`, optional `notToldSince`, and `limit` up to 8. Full stories, excerpts, and incomplete indexes remain distinct. |
| `map_topic` | Supply `topic` or `passage`, plus 1–12 labeled query `groups`. Optional `perGroup` returns up to 3 excerpts per group. |
| `coverage` | Inspect recorded books or chapters. Optional `range`, such as `"Romans 5–8"`, and `filters`. |
| `trace_theme` | Use `theme` for statements in recorded-date order. Optional confirmed `deep: true` requests Rewind-written synthesis. |
| `add_to_chat` | Save 1–6 selected sources with exact wording and source times. Requires your choice to save. |
| `history` | Recall your saved clips with optional `topic`, `since`, and `limit` up to 40. Pass `nextBefore` unchanged as `before` to continue. |

The research tools that accept `filters` default to weekend messages, `contentKind: "sermon"`. Set `"class"`, `"conference"`, `"midweek"`, or `"special"` to research another kind. Other filters are `speaker`, `book`, `chapter`, `topic`, `fromDate`, and `toDate`. A chapter needs its book. Carry the returned scope into your answer.

Each research result can render an App in a compatible host. Text and structured results remain available when App rendering is unsupported. An installed package or automated fixture check does not establish that a native host displays the interface correctly.

## Use the workflows

Ask in plain language, such as "Help me prepare a message on Romans 8" or "Find stories we have told about forgiveness."

The plugin includes Sermon prep, Corpus lookup, Study brief, Series planner, and Illustration finder skills. The command names include the plugin namespace:

- `/rewind:rewind-prep Romans 8`
- `/rewind:rewind-lookup What have we preached about anxiety?`

A comparison uses cited results for each subject in the conversation. There is no separate App comparison tool or workspace-opening tool.

## Read, discuss, and save sources

Every corpus claim needs its returned title, date, speaker, source link, and timestamp when available. Preserve Scripture references and content kinds. Missing dates, speakers, or timings stay unknown. A quoted excerpt is exact source wording, not a paraphrase. A class session is labeled as a class.

Long transcripts page. Continue `get_sermon` with `parts.transcriptPage.nextOffset` as `offset`, `nextSegmentOffset` as `segmentOffset`, and the same `transcriptHash`. A final page does not mean earlier pages were read. The App's continuation control keeps pages in one reader, while separate conversation tool calls may open separate host panels.

Discuss uses the selected material in the conversation. It does not save a clip. To save a story, first read a versioned transcript page at its returned moment. Use exact contiguous wording from `parts.transcriptSegments` and its original `startSeconds`. Specific-sermon illustrations return exact bounded `excerpt` text, its source `startSeconds`, and a separate `excerptTruncated` flag. The labeled `atSeconds` can differ from the source start. Read the source page before choosing the full story or a smaller contiguous clip. Do not add an omission marker to the quote. An empty quote at zero is a whole-sermon reference, never a substitute for a requested quotation.

A timed-out save may have succeeded. Keep the same selection and `requestKey` on retries, or call `history` with that key alone to check without writing. See the [source and recovery reference](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md#read-and-save-exact-sources).

## Understand cost and data use

Retrieval and stored artifacts use no metered Rewind synthesis. Search and source evidence can use query embeddings. Optional synthesis uses your church's metered allowance only after you confirm the disclosure for that request. `ask` takes `synthesize: true`; `trace_theme` takes `deep: true`. The skills first request the disclosure without `spendConfirmed`, then wait for your explicit yes. Exact credit cost and account balance may be unavailable. Your Claude subscription or API costs are separate.

Draft-overlap checks may send up to three 500-character excerpts to OpenAI for embeddings on a cache miss. This path does not persist draft text. Derived vectors use hashed cache keys with a configurable 24-hour default. Material in Claude or another chosen client is also subject to that client's training, Memory, retention, and sharing controls.

Tokens have burst limits, daily request limits, and daily spending caps. On `rate_limited`, wait `retryAfterSeconds` and retry once. On `daily_limit`, stop. On `auth_required`, reconnect with your own authorized account. Report other refusals without looping. Do not blindly repeat a confirmed synthesis after an uncertain failure.

Read the full [setup guide](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md), [privacy policy](https://rewind.church/legal/privacy), and [AI explanation](https://rewind.church/legal/ai). [Report an issue](https://github.com/rewind-church/plugins/issues) or [contact Rewind](https://rewind.church/contact?topic=support) without posting secrets or private source text.

## License

The installed plugin includes its [MIT license](./LICENSE).
