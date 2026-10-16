# Rewind plugins for Claude

Connect [Claude Code](https://code.claude.com/docs/en/plugins) to your church's recorded teaching through [Rewind](https://rewind.church).

This repository is the official Rewind plugin marketplace. Version 0.6.0 selects the newer ten-tool MCP App catalog and includes five skills and two commands. Rewind cannot create, edit, or delete sermon content through this connection. It can save source clips you choose to your private Rewind history.

## Install

You need access to Studio research in your church's Rewind environment. The supported roles are admin, staff, planter, seminary faculty, and seminary student. An ordinary member account cannot create a token. Ask your church administrator about access if you cannot open Connections.

1. Open **Studio → Settings → Connections** at `https://<your-church>.rewind.church/studio/settings/connections`.
2. Create a personal MCP token and copy it while it is shown.
3. Set the endpoint and token in the terminal that launches Claude Code:

   ```bash
   export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
   export REWIND_MCP_TOKEN="rwd_mcp_YOUR_TOKEN_HERE"
   ```

   Keep `REWIND_MCP_URL` query-free. The plugin appends `?profile=app` itself. If you previously added a `?profile=...` suffix to this variable, remove that suffix before starting Claude Code.

4. Add the marketplace and install the plugin:

   ```bash
   claude plugin marketplace add rewind-church/plugins
   claude plugin install rewind@rewind-church
   ```

5. Start a new Claude Code session from that terminal. Check `/mcp` for the `rewind` connection, then ask, "What have we preached about anxiety?"

For an existing installation, update this marketplace and the Rewind plugin through Claude Code's plugin manager, then restart the session. The [setup guide](./docs/mcp-setup.md) covers upgrades, other clients, authentication, limits, and troubleshooting.

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

Research results can render an interactive App in a compatible host. A client that does not render MCP Apps can still receive supported tool text and structured results. Installing this Claude Code plugin does not install a native ChatGPT plugin or prove that a particular host supports the App interface. See [other-client setup](./docs/mcp-setup.md#connect-other-mcp-clients).

## Permissions, cost, and data

Each request uses your current church membership and permissions. Tokens have request and spending limits and can be revoked from Connections. A clip belongs to your account in that church. Reading or discussing a source does not save it.

Retrieval, stored artifacts, illustrations, and source evidence use no metered Rewind synthesis. Searches can use query embeddings. Optional Rewind-written synthesis from `ask` or `trace_theme` uses your church's metered allowance only after your explicit confirmation. Credit amounts and balances may be unavailable. Your Claude subscription or API costs are separate.

Draft-overlap checks may send up to three 500-character draft excerpts to OpenAI for embeddings on a cache miss. This path does not persist the draft text. Derived vectors use hashed cache keys with a configurable 24-hour default. Your chosen AI client's own training, Memory, retention, and sharing controls also apply to material you send to that client. Read the [data and cost reference](./docs/mcp-setup.md#understand-cost-and-data-use).

## Planning Center

The [Planning Center setup guide](./docs/planning-center-setup.md) and [access guide](./docs/planning-center-access.md) describe that separate Services connection. Installing this plugin grants no Planning Center access.

## Maintainer validation

Use Node from `.node-version`, then run `npm ci --no-audit` and `npm run validate`. CI and the tracked pre-push hook run the same static check. It uses pinned Claude Code 2.1.300 in strict JSON mode, validates the marketplace, plugin, five skills and two commands, and proves five extended MCP checks reject unsafe fixture configurations. It does not connect to Rewind or start a model session. The minimum extended-validator version is 2.1.281; an older or unpinned executable fails the check. To compare the app's bundled copy before publication, run `npm run validate -- --mirror /absolute/path/to/rewind-plugin`.

## Support and license

[Open an issue](https://github.com/rewind-church/plugins/issues) or [contact Rewind](https://rewind.church/contact?topic=support). Do not include tokens or private sermon material in public issues.

The repository and installed plugin include the [MIT license](./LICENSE).
