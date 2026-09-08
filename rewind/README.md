# Rewind for Claude

Connect Claude to **your church's own preaching corpus** through Rewind's read-only
MCP server. Search, synthesize, and compare across what your church has actually
preached — and get back **verbatim, citeable** answers (sermon + timestamp + the
preacher's real words).

This plugin bundles:

- **The Rewind MCP connection** (`.mcp.json`) — eight read-only corpus tools
  (`corpus_search`, `scripture_coverage`, `get_sermon`, `list_recent_sermons`,
  `corpus_qa`, `compare_treatments`, `trace_theme`, `find_illustrations`) plus
  sermon resources. The search and synthesis tools accept optional filters —
  speaker, scripture book/chapter, topic, content kind (weekend sermon vs class /
  conference / midweek / special), and preached-date range.
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

For stories from one specific sermon, request `get_sermon` with
`include: ["illustrations"]`: a free read of its analyzed timeline, with
verbatim excerpts and attribution. A missing analysis is reported separately
from an analyzed sermon with no stories. Cross-sermon topic searches still use
the metered `find_illustrations` tool.

The conversation runs on **your** Claude. Rewind only spends on the four *metered*
tools (`corpus_qa`, `compare_treatments`, `trace_theme`, `find_illustrations` — a
few cents each, capped by your token's daily limit); `corpus_search`,
`scripture_coverage`, `get_sermon`, and `list_recent_sermons` are free. See the
in-app setup guide for the full breakdown.

## Read-only & scoped

No tool can create, edit, or delete anything, and every request is scoped to **your
church only**. A token is tied to you, carries your role's permissions, and can be
revoked instantly from the Connections page.
