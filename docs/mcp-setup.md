# Connect Rewind to an AI client

Connect an authorized AI client to your church's recorded teaching. This guide covers the Claude Code plugin and remote MCP clients. Rewind's ten-tool App catalog returns cited sources and can display interactive research results in a compatible host.

## Check your access

Your church's Rewind environment must offer MCP access, and your account needs Studio research permission. Supported roles are admin, staff, planter, seminary faculty, and seminary student. An ordinary member account cannot create an MCP token. Ask your church administrator about access if you cannot open **Studio → Settings → Connections**.

A token belongs to your own account in one church. Rewind checks your current membership and role on requests. A token does not grant access to another church, unpublished sermon review, or another person's private clips. Keep tokens out of prompts, source control, screenshots, and public issue reports.

## Install the Claude Code plugin

1. Open `https://<your-church>.rewind.church/studio/settings/connections`.
2. Create a personal MCP token. Copy it while it is shown. Choose an appropriate daily spending cap and expiry.
3. Set the endpoint and token in the terminal that launches Claude Code:

   ```bash
   export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
   export REWIND_MCP_TOKEN="rwd_mcp_YOUR_TOKEN_HERE"
   ```

   Keep the endpoint without a query. The plugin adds `?profile=app` in `.mcp.json`. If you previously stored a URL with a `?profile=...` suffix, remove that suffix from `REWIND_MCP_URL`.

4. Install the marketplace and plugin:

   ```bash
   claude plugin marketplace add rewind-church/plugins
   claude plugin install rewind@rewind-church
   ```

5. Start a new Claude Code session from that terminal. Open `/mcp` and check that `rewind` is connected.
6. Ask, "What have we preached about anxiety?" You can also use `/rewind:rewind-prep Romans 8` or `/rewind:rewind-lookup What did we preach last week?`.

The plugin contains five skills, two namespaced commands, a shared research reference, its license, and an HTTP MCP configuration. It does not contain your credentials. See [Claude Code's plugin documentation](https://code.claude.com/docs/en/plugins).

### Upgrade an existing installation

Update the Rewind marketplace and plugin through Claude Code's plugin manager, then restart the session from the terminal containing your environment variables. Version 0.6.0 selects the App profile even if your existing variable contains the previously documented canonical endpoint. Do not append the App query to that variable yourself.

Check that the discovered catalog has the ten tools below. If old-only tools remain, confirm that the new plugin is enabled and remove a duplicate manually configured legacy connection. Keep a separate legacy connection only when a compatibility workflow needs it.

## Connect other MCP clients

This repository distributes a Claude Code plugin. Claude web, Claude Desktop, ChatGPT, and other clients each require their own remote MCP setup. Availability depends on your client plan and organization settings. Installing the plugin does not register a native ChatGPT plugin.

For an App connection entered directly in a client, use the full URL:

```text
https://<your-church>.rewind.church/api/mcp/mcp?profile=app
```

Use the client's custom remote MCP connection flow and sign in with Rewind OAuth when offered. This is a separate client authorization step. A static bearer token can instead be used by clients that support authenticated Streamable HTTP with custom headers. The manual configuration is:

```json
{
  "mcpServers": {
    "rewind": {
      "type": "http",
      "url": "https://YOUR-CHURCH.rewind.church/api/mcp/mcp?profile=app",
      "headers": {
        "Authorization": "Bearer YOUR_PERSONAL_REWIND_TOKEN"
      }
    }
  }
}
```

This JSON describes the Claude HTTP server shape. Other clients may use different configuration keys. Use your client's documentation rather than pasting this into an unrelated configuration file. Never share a configuration containing a real token.

The transport is Streamable HTTP, not an old SSE endpoint. Do not add `/sse`. An App-compatible host may render interactive results. Other hosts can use the returned text and structured source data. Tool discovery and text output alone do not prove that a particular native host renders or operates the App correctly.

For the current client setup flow, consult [Claude's connector guide](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) or [OpenAI's custom MCP server guide](https://developers.openai.com/api/docs/guides/custom-mcp-server). Your client can ask you to approve tool calls as well as authorize the connection.

## Use the App catalog

The App URL exposes these ten tools:

| Tool | Required input or mode | Result |
| --- | --- | --- |
| `search` | `query` for relevance, or `order: "recent"` without `query` | Selected source moments or recent metadata. `limit` is at most 20. |
| `get_sermon` | `sermonId`, or `title` and `date` | Original context, available artifacts, and versioned transcript pages. |
| `ask` | `question` | Exact cited evidence. Optional confirmed synthesis. |
| `check_overlap` | `text`, up to 20,000 characters | Shared wording and related evidence with limitations. |
| `find_illustrations` | `topicOrPassage` | Attributed stories. `limit` is at most 8. Optional recorded-use cutoff `notToldSince`. |
| `map_topic` | `topic` or `passage`, and 1–12 `groups` with `label` and `query` | Indexed-word counts and up to 3 excerpts per group with `perGroup`. |
| `coverage` | Optional `range` and `filters` | Recorded Scripture books and chapters, dates, and bounded source references. |
| `trace_theme` | `theme` | Dated cited statements. Optional confirmed deep synthesis. |
| `add_to_chat` | `items` with `sermonId`, `startSeconds`, and exact `quote` | A private save receipt for your chosen sources. |
| `history` | Optional `topic`, `since`, and `limit`, or `requestKey` alone | Your earlier clips in this church, or one save's recovery state. |

Compare subjects by retrieving contextual evidence for each and discussing it in the conversation. There is no separate App comparison tool or workspace-opening tool.

Research tools that accept `filters` default to weekend messages, `contentKind: "sermon"`. Other supported kinds are `"class"`, `"conference"`, `"midweek"`, and `"special"`. Filter keys are `speaker`, `book`, `chapter`, `topic`, `contentKind`, `fromDate`, and `toDate`. A chapter needs its book. Dates use YYYY-MM-DD and run oldest to newest. Unknown keys are refused.

Carry the returned scope into each claim. Source links, title, date, speaker, Scripture references, and available segment times identify the evidence. A class session stays labeled as a class. Missing metadata stays unknown. Search results and keyword counts are bounded evidence, not proof of everything the church has taught or its doctrinal position.

## Read and save exact sources

`get_sermon` returns overview and transcript by default. Use `include` to request `"overview"`, `"transcript"`, `"group-guide"`, `"devotional"`, or `"illustrations"`. Missing or unapproved parts are reported explicitly. More than one title-and-date match returns candidates; choose the intended ID before continuing.

Long transcripts page. To continue, send `parts.transcriptPage.nextOffset` as `offset`, `nextSegmentOffset` as `segmentOffset`, and the same `transcriptHash`. Omit `at` when using those absolute continuation cursors. If the source changes, load it again rather than combining versions. `rangeExhausted` means the requested stored range ended. It does not mean earlier pages were read. A segment timestamp is not a word-level timestamp. The App's continuation control keeps pages in one reader; independent conversation calls may create separate host panels.

Discuss brings selected source material into the conversation. It does not save to private history. Choose Save or explicitly ask the assistant to save when you want a private clip. Opening or reading a source is not a save request.

Before saving an illustration, fetch a versioned transcript page at its returned moment with `get_sermon`. Use exact contiguous wording from `parts.transcriptSegments` and the original starting segment's `startSeconds`. Continue if needed for the selected story. Specific-sermon illustrations return exact bounded `excerpt` text, its actual source `startSeconds`, and a separate `excerptTruncated` flag when more wording follows. The labeled `atSeconds` can differ from that source start. Read the versioned page to select the full story or a smaller clip. Do not add omission markers or substitute the labeled time for the source time. Withheld timing or source text cannot be filled in by guessing.

A save accepts 1–6 items, at most 50,000 quote characters per item and 120,000 characters total. An empty quote at zero is only a whole-sermon reference. It is not a substitute for a chosen quotation. Save receipts confirm private history state. They do not prove that the host displayed a separate conversation message.

For an uncertain save, check with `history` and `requestKey` alone, or retry the identical selection and key. A timeout does not establish failure. An identical unkeyed retry replays the earlier save. Keep the returned `operation.requestKey` for recovery. A new key represents a new deliberate selection.

`history` is newest first. It accepts `limit` up to 40. If `hasMore` is true, pass `nextBefore` unchanged as `before` for the next page. Changed, unpublished, or otherwise unavailable source wording is withheld.

Sermon resources are also available to clients that support resource reads: `rewind://sermons` and `rewind://sermon/{id}/overview`, `/transcript`, `/group-guide`, `/devotional`, and `/illustrations`. Resource reads are subject to the same account, church, publication, and request gates.

## Understand cost and data use

Retrieval, stored artifacts, precomputed stories, and source evidence use no metered Rewind synthesis. Search and evidence retrieval can still use query embeddings. The chosen AI client has its own subscription or API costs.

`ask` with `synthesize: true` and `trace_theme` with `deep: true` can request optional Rewind-written synthesis. Without `spendConfirmed`, they return the disclosure without running generation. Review the disclosure, then explicitly confirm that request if you want it. A credit amount and remaining balance may be unavailable. Do not treat an unavailable number as zero or assume a quoted price. Token spending caps still apply.

For draft overlap, a cache miss may send up to three 500-character draft excerpts to OpenAI for embeddings. This path does not persist draft text. Derived vectors use hashed cache keys with a configurable 24-hour default. That default is not an unconditional retention maximum.

Your AI client also receives the prompts and tool material used in the conversation. The client's own training, Memory, retention, and sharing controls apply independently. Rewind's provider commitments do not override those controls. Check your plan, organization policy, and client settings before sharing private material. See [Rewind's privacy policy](https://rewind.church/legal/privacy), [AI explanation](https://rewind.church/legal/ai), and [trust information](https://rewind.church/trust).

## Handle limits and errors

Each credential has a burst limit, a daily request limit, and a daily spending cap. Tool and resource reads consume request limits even when cached. Current role or membership changes and token expiry or revocation can remove access. Revoke a token in Connections when you no longer need it. OAuth connections can also be disconnected or revoked through the relevant Rewind and client controls.

| Response | Action |
| --- | --- |
| `rate_limited` | Wait `retryAfterSeconds`, then retry the same call once. If absent, wait about a minute. Stop if it is refused again. |
| `daily_limit` | Stop calling tools. The daily request window resets within 24 hours. |
| `auth_required` or HTTP 401 | Reconnect with your own authorized account, or replace your revoked or expired token. Check that environment variables reached the process. |
| Invalid field or unknown key | Correct the named input. Preserve the requested scope. |
| `retryable: false` or a refusal without a `code` | Read the message, correct a named issue, and do not loop. |
| HTTP 404 on the App URL | Check the church URL and ask Rewind whether MCP App access is available for that environment. |

Do not blindly repeat a confirmed synthesis after an uncertain failure. It may already have spent allowance. An explicit `rate_limited` refusal permits the single delayed retry above. Never mint credentials to evade request or spending limits.

If the plugin is installed but MCP fails to connect, check both environment variables in the terminal that starts Claude Code, the query-free endpoint, token expiry or revocation, and your current Studio access. Restart after changing environment variables. Do not print or post the token while diagnosing the issue.

## Compatibility and Deep Research

The canonical endpoint without a query, `https://<your-church>.rewind.church/api/mcp/mcp`, selects the legacy catalog. An explicit `?profile=legacy` also selects it. Keep this separate from the plugin's App connection.

The legacy catalog retains compatibility tools such as `corpus_search`, `list_recent_sermons`, `corpus_qa`, `compare_treatments`, `scripture_coverage`, and `fetch`. A client that specifically requires the legacy `search` and `fetch` pair for a Deep Research workflow uses this separate legacy URL. The public plugin's five skills and two commands target the App catalog instead.

Legacy `scripture_coverage` accepts only an optional `year` and aggregates every content kind, including classes. It has no content-kind filter. It is not interchangeable with App `coverage`, which defaults to weekend messages and supports filters and a chapter range. Use `coverage` for weekend preaching planning. Legacy `corpus_search` and `list_recent_sermons` also include every content kind when omitted. Preserve those distinctions when interpreting old workflows.

Both profiles use the same church and account authorization boundary. An old catalog is not an older wire protocol, and static HTTP bearer authentication is supported for the App profile too.

## Get help

[Contact Rewind](https://rewind.church/contact?topic=support) for account or church configuration help. [Open a public plugin issue](https://github.com/rewind-church/plugins/issues) for a reproducible package problem. Redact credentials, church-private source text, and personal information.
