# Connect Rewind to an AI client

Connect an authorized AI client to your church's recorded teaching. This guide covers the Claude Desktop and Claude Code plugin, plus remote MCP clients. Rewind's ten-tool App catalog returns cited sources and can display interactive research results in a compatible host.

## Check your access

Your church's Rewind environment must offer MCP access, and your account needs Studio research permission. Supported roles are admin, staff, planter, seminary faculty, and seminary student. Ask your church administrator about access if you cannot open **Studio → Settings → Connections**.

OAuth is the default: sign in with your church account and approve the client in your browser. You do not need to create or export a personal token. A connection belongs to your own account in one church. Rewind checks your current membership and role on requests. It does not grant access to another church, unpublished sermon review, or another person's private clips.

## Install in Claude Desktop

1. From Home, open **Customize → Plugins → Add plugin**.
2. Open **Manage marketplaces** and add `rewind-church/plugins`. If it is already listed, sync it to load the current version.
3. Find Rewind and choose **Add**. Open the connection setup and replace the URL placeholder with your church's full App endpoint:

   ```text
   https://<your-church>.rewind.church/api/mcp/mcp?profile=app
   ```

4. Choose **Sign in**. In your browser, sign in to Rewind with the intended church account, review the requested connection, and approve it.
5. The browser returns you to Claude Desktop automatically. Allow its native-app handoff if prompted. Confirm the connection shows ten tools.
6. Ask for recent sermons, then open a returned source to check the interactive App and its source link.

No terminal exports, personal token, or Authorization header are needed. The plugin installs its skills and commands alongside the connection. If a separate older Rewind connector is enabled, disable it in the test chat to keep catalogs distinct. Do not revoke a credential used by another client. Client labels, plugins and remote connector availability depend on version, plan and organization settings. See [Claude's plugin guide](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

To update, sync the marketplace and update Rewind in the plugin manager. Existing OAuth authorization can remain valid; reconnect if the client requests it.

If Claude says **A connector with this URL already exists in your organization**,
cancel the duplicate setup. Open **Customize → Connectors → Yours**, select the
existing Rewind connector, and confirm its complete URL ends in
`/api/mcp/mcp?profile=app` and it shows ten tools. Use that connection and keep the
Rewind plugin enabled for its skills and commands. The plugin's placeholder-based
connector card can still say **Not added**; check the actual connector entry's
connection state. Do not disconnect a working connector just to clear that label.

## Install the Claude Code plugin

1. Set your church's endpoint in the terminal that launches Claude Code:

   ```bash
   export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
   ```

   Keep the endpoint without a query. The plugin adds `?profile=app` in `.mcp.json`. If you previously stored a URL with a `?profile=...` suffix, remove that suffix from `REWIND_MCP_URL`.

2. Install the marketplace and plugin:

   ```bash
   claude plugin marketplace add rewind-church/plugins
   claude plugin install rewind@rewind-church
   ```

3. Start `claude` from that terminal and open `/mcp`.
4. Select the Rewind plugin connection (`plugin:rewind:rewind`) and choose **Authenticate**.
5. In the browser, sign in to Rewind with your church account. Review and approve the connection, then return to Claude Code.
6. Check that Rewind is connected with ten tools. Ask, "What have we preached about anxiety?" You can also use `/rewind:rewind-prep Romans 8` or `/rewind:rewind-lookup What did we preach last week?`.

Claude Code stores and refreshes the OAuth credentials for this connection. The plugin contains five skills, two namespaced commands, a shared research reference, its license, and an HTTP MCP configuration with no Authorization header. See [Claude Code's authentication instructions](https://code.claude.com/docs/en/mcp-quickstart#connect-a-server-that-requires-sign-in) and [plugin documentation](https://code.claude.com/docs/en/plugins).

OAuth must be enabled in your church's Rewind environment. If it is unavailable, ask your church administrator or use the [optional personal-token fallback](#use-a-personal-token-as-an-optional-fallback).

### Upgrade an existing installation

Update the Rewind marketplace and plugin through Claude Code's plugin manager. Set the query-free `REWIND_MCP_URL`, then start a new session and authenticate the plugin connection through `/mcp`.

Version 0.6.1 replaces 0.6.0's required personal token with OAuth. It no longer reads `REWIND_MCP_TOKEN`; you can remove that export from your shell setup. If you added a separate token connection, disable that connection in `/mcp` before authenticating the plugin connection. Keep the Rewind plugin enabled so its skills and commands remain available. After OAuth works, revoke an old personal token in Connections only if no other client uses it.

Check that the discovered catalog has the ten tools below. If old-only tools remain, confirm that the updated plugin is enabled and inspect any separate legacy connection. Keep a legacy connection only when a compatibility workflow needs it.

## Connect other MCP clients

This repository distributes a Claude plugin. Claude Desktop's native installation is above. Claude web, a Desktop installation without plugin support, ChatGPT, and other clients can use their own remote MCP setup. Availability depends on your client plan and organization settings. Installing the plugin does not register a native ChatGPT plugin.

For an App connection entered directly in a client, use the full URL:

```text
https://<your-church>.rewind.church/api/mcp/mcp?profile=app
```

For Claude web and Claude Desktop, use **Settings → Connectors → Add custom connector**, enter the App URL, and complete the Rewind sign-in. For ChatGPT, use its custom MCP connection flow and choose OAuth. Availability and labels depend on your client plan and organization settings. Installing the Claude Code plugin does not authorize these separate clients.

For clients that accept Claude-style HTTP MCP configuration, the OAuth configuration has no credential header:

```json
{
  "mcpServers": {
    "rewind": {
      "type": "http",
      "url": "https://YOUR-CHURCH.rewind.church/api/mcp/mcp?profile=app"
    }
  }
}
```

This JSON describes the Claude Code HTTP server shape. It is not a Claude Desktop Developer configuration. Use Claude Desktop's remote connector flow above. Other clients may use different configuration keys; follow their documentation.

The transport is Streamable HTTP, not an old SSE endpoint. Do not add `/sse`. An App-compatible host may render interactive results. Other hosts can use the returned text and structured source data. Tool discovery and text output alone do not prove that a particular native host renders or operates the App correctly.

For the current client setup flow, consult [Claude's connector guide](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) or [OpenAI's custom MCP server guide](https://developers.openai.com/api/docs/guides/custom-mcp-server). Your client can ask you to approve tool calls as well as authorize the connection.

## Use a personal token as an optional fallback

Use this path when your client cannot use OAuth or your Rewind environment has not enabled it. A personal token is not required for the default plugin connection.

1. Open **Studio → Settings → Connections** at `https://<your-church>.rewind.church/studio/settings/connections`.
2. Under the personal-token fallback, create a token with a name and an appropriate daily spending cap. Copy it while it is shown.
3. In Claude Code, open `/mcp`, select `plugin:rewind:rewind`, and choose **Disable** for that connection. Keep the Rewind plugin itself enabled. This preserves its skills and commands without leaving two Rewind connections active.
4. Exit the session. In Bash or zsh, add a separate token connection. The `read` command asks for the token without putting its value in shell history:

   ```bash
   printf 'Rewind token: '
   read -r -s REWIND_MCP_TOKEN
   printf '\n'
   claude mcp add --transport http --scope user rewind-token \
     "${REWIND_MCP_URL}?profile=app" \
     --header "Authorization: Bearer $REWIND_MCP_TOKEN"
   unset REWIND_MCP_TOKEN
   claude
   ```

   Use the same query-free `REWIND_MCP_URL` from the install instructions. Claude Code stores this manual connection and its header in your local configuration.

5. In `/mcp`, check that `rewind-token` is connected and the plugin's OAuth connection is disabled. When using another project, check those states again because connection enablement can be project-specific.

For another client with custom header support, use the full App URL and `Authorization: Bearer YOUR_PERSONAL_REWIND_TOKEN`. The equivalent Claude-style configuration is:

```json
{
  "mcpServers": {
    "rewind-token": {
      "type": "http",
      "url": "https://YOUR-CHURCH.rewind.church/api/mcp/mcp?profile=app",
      "headers": {
        "Authorization": "Bearer YOUR_PERSONAL_REWIND_TOKEN"
      }
    }
  }
}
```

Use the client's own configuration format. Keep actual tokens out of prompts, source control, screenshots, and public issue reports.

To return to OAuth, disable the manual token connection, enable the plugin's connection in `/mcp`, and choose **Authenticate**. Revoke the old token in Rewind Connections when no other client uses it. Disconnecting OAuth does not revoke a separate personal token, and revoking that token does not disconnect OAuth.

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

**Discuss selected** uses only checked, displayed sources. It sends a brief request with bounded source context when supported, or a readable fallback of at most 6,000 characters. Truncated source wording is explicitly marked partial. It does not load other transcripts automatically, save to private history, or start metered Rewind synthesis. Clearing all source checkboxes disables the action. A metadata reference has no quotation and is labeled as a reference.

Choose **Save** or explicitly ask the assistant to save when you want a private clip. Opening or reading a source is not a save request. Open **View Saved research** in the App, or open **Saved → Research** in Rewind (`/my#research`), to find your saves. This account-wide list labels each church; the `history` tool remains scoped to its connected church. Use Earlier research for older pages and Newest research to return.

Each item has a **Remove** control with confirmation. It deletes the saved quotation or reference. A source or access change withholds the content but leaves your receipt removable. Rewind keeps retry metadata, with the removed item's private topic cleared, so an old request cannot restore the deleted save. A new deliberate Save needs a new request key. Disconnecting a client does not delete history or that client's copies.

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
| `auth_required` or HTTP 401 | For OAuth, select the plugin connection in `/mcp` and authenticate again with your own account. For the optional token connection, replace your revoked or expired token. |
| Invalid field or unknown key | Correct the named input. Preserve the requested scope. |
| `retryable: false` or a refusal without a `code` | Read the message, correct a named issue, and do not loop. |
| HTTP 404 on the App URL | Check the church URL and ask Rewind whether MCP App access is available for that environment. |

Do not blindly repeat a confirmed synthesis after an uncertain failure. It may already have spent allowance. An explicit `rate_limited` refusal permits the single delayed retry above. Never mint credentials to evade request or spending limits.

If the plugin is installed but MCP fails to connect, check the query-free `REWIND_MCP_URL` in the terminal that starts Claude Code, your current Studio access, and whether OAuth is enabled in your Rewind environment. Restart after changing the URL. A status of **Needs authentication** means you must select the connection in `/mcp` and choose **Authenticate**. An old exported personal token does not authenticate version 0.6.1's default connection.

Native sign-in returns to Claude Code through a local loopback callback. If the browser cannot return, keep Claude Code running and check whether your computer allows its local callback listener. Do not enable insecure-issuer settings on a production server to work around a callback failure. For the optional token connection, check its saved header and token expiry or revocation without printing the secret.

## Compatibility and Deep Research

The canonical endpoint without a query, `https://<your-church>.rewind.church/api/mcp/mcp`, selects the legacy catalog. An explicit `?profile=legacy` also selects it. Keep this separate from the plugin's App connection.

The legacy catalog retains compatibility tools such as `corpus_search`, `list_recent_sermons`, `corpus_qa`, `compare_treatments`, `scripture_coverage`, and `fetch`. A client that specifically requires the legacy `search` and `fetch` pair for a Deep Research workflow uses this separate legacy URL. The public plugin's five skills and two commands target the App catalog instead.

Legacy `scripture_coverage` accepts only an optional `year` and aggregates every content kind, including classes. It has no content-kind filter. It is not interchangeable with App `coverage`, which defaults to weekend messages and supports filters and a chapter range. Use `coverage` for weekend preaching planning. Legacy `corpus_search` and `list_recent_sermons` also include every content kind when omitted. Preserve those distinctions when interpreting old workflows.

Both profiles use the same church and account authorization boundary. An old catalog is not an older wire protocol, and static HTTP bearer authentication is supported for the App profile too.

## Get help

[Contact Rewind](https://rewind.church/contact?topic=support) for account or church configuration help. [Open a public plugin issue](https://github.com/rewind-church/plugins/issues) for a reproducible package problem. Redact credentials, church-private source text, and personal information.
