# Rewind plugins for Claude

Connect Claude Desktop or [Claude Code](https://code.claude.com/docs/en/plugins) to your church's recorded teaching through [Rewind](https://rewind.church).

This repository is the official Rewind plugin marketplace. Version 0.6.2 uses browser sign-in with OAuth and the ten-tool MCP App catalog. It includes five skills and two commands. Rewind cannot create, edit, or delete sermon content through this connection. It can save source clips you choose to your private Rewind history, visible in Saved under Research.

## Install in Claude Desktop

You need access to Studio research in your church's Rewind environment. The supported roles are admin, staff, planter, seminary faculty, and seminary student. Ask your church administrator about access if you cannot open **Studio → Settings → Connections**.

1. From Home, open **Customize → Plugins → Add plugin**. Use **Manage marketplaces** to add `rewind-church/plugins`, or sync it if already present.
2. Find Rewind and choose **Add**. In connection setup, replace the URL placeholder with `https://<your-church>.rewind.church/api/mcp/mcp?profile=app`.
3. Choose **Sign in**, approve Rewind in your browser, and return through the automatic Claude Desktop callback. Allow the browser's native-app handoff if prompted.
4. Check that the connection has ten tools. Ask for recent sermons and open a result to try the interactive App.

This flow needs no terminal exports, personal token, or Authorization header. For an existing installation, sync the marketplace and update Rewind. Client labels and availability can vary by version and plan. See the [full setup guide](./docs/mcp-setup.md#install-in-claude-desktop).

## Install in Claude Code

1. Set your church's endpoint in the terminal that launches Claude Code:

   ```bash
   export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
   ```

   Keep `REWIND_MCP_URL` query-free. The plugin appends `?profile=app` itself. If you previously added a `?profile=...` suffix to this variable, remove that suffix before starting Claude Code.

2. Add the marketplace and install the plugin:

   ```bash
   claude plugin marketplace add rewind-church/plugins
   claude plugin install rewind@rewind-church
   ```

3. Start `claude` from that terminal and open `/mcp`.
4. Select the Rewind plugin connection (`plugin:rewind:rewind`) and choose **Authenticate**. Sign in to Rewind in your browser and approve the connection.
5. Return to Claude Code and check that Rewind is connected with ten tools. Ask, "What have we preached about anxiety?"

You do not need to create, copy, or export a personal token for this flow. OAuth must be available in your church's Rewind environment. Personal tokens remain an [optional fallback](./docs/mcp-setup.md#use-a-personal-token-as-an-optional-fallback) for clients or environments without OAuth.

For an existing installation, update this marketplace and the Rewind plugin through Claude Code's plugin manager, then restart and authenticate. Versions 0.6.1 and later do not read `REWIND_MCP_TOKEN`. The [upgrade instructions](./docs/mcp-setup.md#upgrade-an-existing-installation) explain how to replace a 0.6.0 token connection without leaving duplicate connections active.

## Included workflows

The plugin uses these ten App tools:

| Tool | Use |
| --- | --- |
| `search` | Find teaching by topic or list recent messages with `order: "recent"`. |
| `get_sermon` | Open original context, available artifacts, and versioned transcript pages. |
| `ask` | Retrieve cited evidence for a question. |
| `check_overlap` | Describe shared wording and related teaching in a draft. |
| `find_illustrations` | Find attributed stories with explicit source availability. |
| `map_topic` | Group recorded teaching by supplied topic queries. |
| `coverage` | Inspect recorded Scripture coverage. |
| `trace_theme` | Read dated statements about a theme. |
| `add_to_chat` | Save clips only when you choose to save them. |
| `history` | Recall your private saved clips in this church. |

The five skills are Sermon prep, Corpus lookup, Study brief, Series planner, and Illustration finder. Use plain language or invoke `/rewind:rewind-prep` and `/rewind:rewind-lookup`. See the [plugin README](./rewind/README.md) for examples.

Research results can render an interactive App in a compatible host. Discuss selected respects the checked sources and keeps its request brief. Save puts a reference or quotation in **Saved → Research** in Rewind, with church labels and removal controls. Reading and discussing do not save. A client that does not render MCP Apps can still receive supported tool text and structured results. Installing this plugin does not install a native ChatGPT plugin or prove a host's behavior. See [other-client setup](./docs/mcp-setup.md#connect-other-mcp-clients).

## Permissions, cost, and data

Each request uses your current church membership and permissions. OAuth connections and optional personal tokens have request and spending limits and can be revoked from Connections. A clip belongs to your account in that church. Reading or discussing a source does not save it.

Retrieval, stored artifacts, illustrations, and source evidence use no metered Rewind synthesis. Searches can use query embeddings. Optional Rewind-written synthesis from `ask` or `trace_theme` uses your church's metered allowance only after your explicit confirmation. Credit amounts and balances may be unavailable. Your Claude subscription or API costs are separate.

Draft-overlap checks may send up to three 500-character draft excerpts to OpenAI for embeddings on a cache miss. This path does not persist the draft text. Derived vectors use hashed cache keys with a configurable 24-hour default. Your chosen AI client's own training, Memory, retention, and sharing controls also apply to material you send to that client. Read the [data and cost reference](./docs/mcp-setup.md#understand-cost-and-data-use).

## Planning Center

The [Planning Center setup guide](./docs/planning-center-setup.md) and [access guide](./docs/planning-center-access.md) describe that separate Services connection. Installing this plugin grants no Planning Center access.

## Maintainer validation

Use Node from `.node-version`, then run `npm ci --no-audit` and `npm run validate`. CI and the tracked pre-push hook run the same static check. It uses pinned Claude Code 2.1.300 in strict JSON mode, validates the marketplace, plugin, five skills and two commands, and proves five extended MCP checks reject unsafe fixture configurations. It does not connect to Rewind or start a model session. The minimum extended-validator version is 2.1.281; an older or unpinned executable fails the check. To compare the app's bundled copy before publication, run `npm run validate -- --mirror /absolute/path/to/rewind-plugin`.

## Support and license

[Open an issue](https://github.com/rewind-church/plugins/issues) or [contact Rewind](https://rewind.church/contact?topic=support). Do not include tokens or private sermon material in public issues.

The repository and installed plugin include the [MIT license](./LICENSE).
