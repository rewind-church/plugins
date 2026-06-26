# Rewind plugins for Claude

Official [Claude Code](https://docs.claude.com/en/docs/claude-code) plugins from
**[Rewind](https://rewind.church)** — connect Claude to **your church's own preaching
corpus** and turn it into your weekly prep workflow.

This repository is the Rewind plugin **marketplace**. Everything here is read-only and
scoped to your church; nothing can create, edit, or delete your data.

## Install

You need a Rewind account. From **Studio → Connections** in your church's Rewind app
(`https://<your-church>.rewind.church/studio/settings/connections`), mint a token, then:

```bash
# Set your church's endpoint + token (shown once in the app)
export REWIND_MCP_URL="https://<your-church>.rewind.church/api/mcp/mcp"
export REWIND_MCP_TOKEN="rwd_mcp_…"

# Add this marketplace and install the plugin
claude plugin marketplace add rewind-church/plugins
claude plugin install rewind@rewind-church
```

Then just ask in plain language — *"prep this week's message on Romans 8"*, *"what have we
preached about anxiety?"* — and Claude orchestrates the corpus tools for you.

## What's inside

### `rewind`
The Rewind corpus plugin. Bundles:

- **The Rewind MCP connection** — six read-only corpus tools (`corpus_search`,
  `scripture_coverage`, `corpus_qa`, `compare_treatments`, `trace_theme`,
  `find_illustrations`) plus sermon resources.
- **Skills** — _Sermon prep_, _Corpus lookup_, _Study brief_, _Series planner_,
  _Illustration finder_. Claude activates them from plain-language requests.
- **Commands** — `/rewind-prep`, `/rewind-lookup`.

See [`rewind/README.md`](./rewind/README.md) for details.

## Read-only & scoped

Every request is scoped to **your church only**, read-only, and authenticated by a token
that's tied to you, carries your role's permissions, has a daily spend cap, and can be
**revoked instantly** from the Connections page. The plugin itself carries no credentials —
your endpoint and token are supplied via the two environment variables above.

## Cost

The conversation runs on **your** Claude. Rewind only spends on the four *metered* tools (a
few cents each, capped by your token's daily limit); search and coverage are free. Full
breakdown in the [setup guide](https://rewind.church).

## Support

Questions or issues: open an issue here, or contact us via your Rewind app.

## License

[MIT](./LICENSE) © Rewind
