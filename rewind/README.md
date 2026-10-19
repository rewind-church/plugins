# Rewind for Claude

Search your church's recorded teaching, read original context, and prepare a message with cited sources. Version 0.6.2 connects through browser sign-in with OAuth and selects Rewind's ten-tool MCP App catalog. The connection cannot create, edit, or delete sermon content. It saves selected source clips to your private Rewind history only when you ask.

## Connect and install

You need Studio research access in your church's Rewind environment. Supported roles are admin, staff, planter, seminary faculty, and seminary student. Ask your church administrator if you cannot open **Studio → Settings → Connections**.

### Claude Desktop

1. From Home, open **Customize → Plugins → Add plugin**. In **Manage marketplaces**, add `rewind-church/plugins`, or sync that marketplace if already listed.
2. Find Rewind and choose **Add**. Open its connection setup and replace the URL placeholder with your church's complete App endpoint:

   ```text
   https://<your-church>.rewind.church/api/mcp/mcp?profile=app
   ```

3. Choose **Sign in** and approve the Rewind connection in your browser. The browser returns you to Claude Desktop automatically; allow the native-app handoff if your browser asks.
4. Confirm the connection has ten tools. Ask for recent sermons and open a result to check the interactive App.

No terminal exports, personal token, or Authorization header are needed in this flow. For an existing installation, sync the marketplace and update Rewind. If an older, separate Rewind connector is also enabled, disable it in the test chat so its tool catalog cannot be confused with this plugin. Client labels and availability can vary by version and plan; the [setup guide](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md) also covers remote connectors.

### Claude Code

1. Set your church's endpoint in the terminal that launches Claude Code:

   ```bash
   export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
   ```

   `REWIND_MCP_URL` is the canonical endpoint without a query. The plugin appends `?profile=app`. Remove an existing `?profile=...` suffix from this variable before starting the new plugin.

2. Install the plugin:

   ```bash
   claude plugin marketplace add rewind-church/plugins
   claude plugin install rewind@rewind-church
   ```

3. Start `claude` from that terminal and open `/mcp`.
4. Select the Rewind plugin connection (`plugin:rewind:rewind`) and choose **Authenticate**. Sign in to Rewind in your browser and approve the connection.
5. Return to Claude Code and check that Rewind is connected with ten tools.

OAuth requires no personal token to create, copy, or export. It must be available in your church's Rewind environment. Personal tokens remain an [optional fallback](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md#use-a-personal-token-as-an-optional-fallback).

For an existing installation, update the marketplace and Rewind through Claude Code's plugin manager, then restart and authenticate. Versions 0.6.1 and later do not read `REWIND_MCP_TOKEN`. Follow the [upgrade instructions](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md#upgrade-an-existing-installation) to avoid duplicate connections. Other MCP clients require their own connection setup.

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

**Discuss selected** uses only checked sources and sends a brief request, with bounded source context when the host supports it. Otherwise, it sends a readable fallback of up to 6,000 characters. Larger wording is explicitly marked partial. Discuss neither saves nor automatically opens transcripts. Clear every checkbox to disable it. A sermon reference has no quotation attached and is labeled accordingly.

**Save** keeps the chosen reference or quotation in **Saved → Research** in Rewind (`/my#research`). The App's **View Saved research** link opens that section. Items identify their church and can be removed there, including receipts whose source or access is no longer available. Disconnecting the client does not delete history. Removing a save deletes its stored quotation/reference; minimal operation metadata remains to prevent an old retry from restoring it. A new deliberate save uses a new request key.

To save a story, first read a versioned transcript page at its returned moment. Use exact contiguous wording from `parts.transcriptSegments` and its original `startSeconds`. Specific-sermon illustrations return exact bounded `excerpt` text, its source `startSeconds`, and a separate `excerptTruncated` flag. The labeled `atSeconds` can differ from the source start. Read the source page before choosing the full story or a smaller contiguous clip. Do not add an omission marker to the quote. An empty quote at zero is a whole-sermon reference, never a substitute for a requested quotation.

A timed-out save may have succeeded. Keep the same selection and `requestKey` on retries, or call `history` with that key alone to check without writing. See the [source and recovery reference](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md#read-and-save-exact-sources).

## Understand cost and data use

Retrieval and stored artifacts use no metered Rewind synthesis. Search and source evidence can use query embeddings. Optional synthesis uses your church's metered allowance only after you confirm the disclosure for that request. `ask` takes `synthesize: true`; `trace_theme` takes `deep: true`. The skills first request the disclosure without `spendConfirmed`, then wait for your explicit yes. Exact credit cost and account balance may be unavailable. Your Claude subscription or API costs are separate.

Draft-overlap checks may send up to three 500-character excerpts to OpenAI for embeddings on a cache miss. This path does not persist draft text. Derived vectors use hashed cache keys with a configurable 24-hour default. Material in Claude or another chosen client is also subject to that client's training, Memory, retention, and sharing controls.

Tokens have burst limits, daily request limits, and daily spending caps. On `rate_limited`, wait `retryAfterSeconds` and retry once. On `daily_limit`, stop. On `auth_required`, reconnect with your own authorized account. Report other refusals without looping. Do not blindly repeat a confirmed synthesis after an uncertain failure.

Read the full [setup guide](https://github.com/rewind-church/plugins/blob/main/docs/mcp-setup.md), [privacy policy](https://rewind.church/legal/privacy), and [AI explanation](https://rewind.church/legal/ai). [Report an issue](https://github.com/rewind-church/plugins/issues) or [contact Rewind](https://rewind.church/contact?topic=support) without posting secrets or private source text.

## License

The installed plugin includes its [MIT license](./LICENSE).
