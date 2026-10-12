# Rewind plugins for Claude

Official [Claude Code](https://docs.claude.com/en/docs/claude-code) plugins from
**[Rewind](https://rewind.church)** — connect Claude to **your church's own preaching
corpus** and turn it into your weekly prep workflow.

This repository is the Rewind plugin **marketplace**. Everything here is scoped to your
church. Nothing can create, edit, or delete your church's sermon content; the one thing
the connection can write is a source clip you ask it to save to your private Rewind
history.

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

- **The Rewind MCP connection** — sixteen corpus tools, all free by default:
  - search and read: `corpus_search`, `search`, `list_recent_sermons`, `get_sermon`,
    `fetch`;
  - evidence and research: `ask`, `corpus_qa`, `compare_treatments`, `trace_theme`,
    `map_topic`, `check_overlap`, `find_illustrations`;
  - Scripture coverage: `scripture_coverage`, `coverage`;
  - your saved clips: `add_to_chat` (saves clips you choose), `history`.

  Sermon resources (`rewind://sermon/{id}/…`) are available too.
- **Skills** — _Sermon prep_, _Corpus lookup_, _Study brief_, _Series planner_,
  _Illustration finder_. Claude activates them from plain-language requests.
- **Commands** — `/rewind-prep`, `/rewind-lookup`.

See [`rewind/README.md`](./rewind/README.md) for details.

## Scoped to your church

Every request is scoped to **your church only** and authenticated by a token that's tied
to you, carries your role's permissions, has a daily request limit and a daily spend cap,
and can be **revoked instantly** from the Connections page. No tool can create, edit or
delete sermon content. `add_to_chat` saves source clips to your private history, and
only when you ask it to. The plugin itself carries no credentials — your endpoint and
token are supplied via the two environment variables above.

## Cost

The conversation runs on **your** Claude. Every Rewind tool is free by default: search,
reading, coverage, illustrations and source evidence run no Rewind synthesis (search
uses only a tiny query embedding). Rewind spends only on an optional written synthesis
from `ask`, `corpus_qa`, `compare_treatments` or `trace_theme`, and only after you
confirm it. The skills ask before they request one. Each synthesis uses your church's metered Rewind allowance
(typically a few cents; the tools report no exact amount or balance) and is capped by
your token's daily spend limit. Full breakdown in the
[setup guide](https://rewind.church).

## Support

Questions or issues: open an issue here, or contact us via your Rewind app.

## License

[MIT](./LICENSE) © Rewind
