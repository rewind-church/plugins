# Rewind for Claude

Connect Claude to **your church's own preaching corpus** through Rewind's read-only
MCP server. Search, synthesize, and compare across what your church has actually
preached — and get back **verbatim, citeable** answers (sermon + timestamp + the
preacher's real words).

This plugin bundles:

- **The Rewind MCP connection** (`.mcp.json`) — seven read-only corpus tools
  (`corpus_search`, `scripture_coverage`, `get_sermon`, `corpus_qa`,
  `compare_treatments`, `trace_theme`, `find_illustrations`) plus sermon resources.
- **Skills** that turn the tools into weekly workflows: **Sermon prep**, **Corpus
  lookup**, **Study brief**, **Series planner**, **Illustration finder**. Claude
  activates these automatically from plain-language requests.
- **Commands**: `/rewind-prep`, `/rewind-lookup`.

## Setup

You need two values from **Studio → Connections** in your Rewind app
(`https://<your-church>.rewind.church/studio/settings/connections`):

- `REWIND_MCP_URL` — `https://<your-church>.rewind.church/api/mcp/mcp`
- `REWIND_MCP_TOKEN` — a token you mint there (shown once; read-only; revocable)

Set them in your environment before launching Claude Code:

```bash
export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
export REWIND_MCP_TOKEN="rwd_mcp_…"
```

### Install

```bash
# Add the Rewind marketplace, then install the plugin
claude plugin marketplace add rewind-church/plugins
claude plugin install rewind@rewind-church
```

## What's it cost?

The conversation runs on **your** Claude. Rewind only spends on the four *metered*
tools (a few cents each, capped by your token's daily limit); `corpus_search` and
`scripture_coverage` are free. See the in-app setup guide for the full breakdown.

## Read-only & scoped

No tool can create, edit, or delete anything, and every request is scoped to **your
church only**. A token is tied to you, carries your role's permissions, and can be
revoked instantly from the Connections page.
