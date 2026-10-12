# Rewind for Claude

Connect Claude to **your church's own preaching corpus** through Rewind's MCP server.
Search, read, compare and trace what your church has actually preached — and get back
**verbatim, citeable** sources (sermon + timestamp + the speaker's real words).

The connection cannot create, edit, or delete sermon content. It can save source clips
you choose to your private Rewind history (`add_to_chat`), and only when you ask.

This plugin bundles:

- **The Rewind MCP connection** (`.mcp.json`) — sixteen tools, all free by default:

  | Tool | What it does |
  |---|---|
  | `corpus_search` | Verbatim transcript excerpts for a query (`query`, `k`, `filters`), ranked by relevance. Searches every content kind unless you filter. |
  | `search` | Ranked sermon moments for a `query`; `order: "recent"` (no query) lists sermons newest first. |
  | `list_recent_sermons` | The latest sermons, newest first (`limit`, `contentKind`). |
  | `get_sermon` | One sermon by `sermonId`, or by `title` + `date`: overview + verbatim transcript, optionally `group-guide`, `devotional`, `illustrations`, with transcript paging. |
  | `fetch` | One sermon's verbatim transcript by `id` (the companion to `search`). |
  | `ask`, `corpus_qa` | Exact cited excerpts that bear on a `question`. Optional written synthesis (see Cost). |
  | `compare_treatments` | Source evidence for two subjects side by side (`columnA`, `columnB`). Optional written comparison. |
  | `trace_theme` | Dated statements on a `theme` in recorded order. Optional written synthesis (`deep`). |
  | `map_topic` | A `topic` or `passage` mapped into up to twelve labeled `groups`, with counts, dates, speakers and exact excerpts. |
  | `check_overlap` | Which wording or subjects in a draft (`text`) overlap earlier teaching. |
  | `find_illustrations` | Stories told on a topic or passage (`topicOrPassage`), with their teller, from a precomputed index. |
  | `scripture_coverage`, `coverage` | Which Bible books and chapters have recorded sermons, when, and by whom. `coverage` also takes a chapter `range`. |
  | `add_to_chat` | Saves source clips you choose to your private history. Only when you ask. |
  | `history` | Recalls the clips you saved earlier in this church. |

  Most research tools take an optional `filters` object: `speaker` · `book` (+
  `chapter`) · `topic` · `contentKind` · `fromDate`/`toDate` (YYYY-MM-DD). The
  newer research tools default `contentKind` to weekend sermons; `corpus_search`
  and `list_recent_sermons` include every content kind unless you set it. Sermon
  resources (`rewind://sermon/{id}/overview`, `/transcript`, …) are available too.
- **Skills** that turn the tools into weekly workflows: **Sermon prep**, **Corpus
  lookup**, **Study brief**, **Series planner**, **Illustration finder**. Claude
  activates these automatically from plain-language requests.
- **Commands**: `/rewind-prep`, `/rewind-lookup`.

## Setup

You need two values from **Studio → Connections** in your Rewind app
(`https://<your-church>.rewind.church/studio/settings/connections`):

- `REWIND_MCP_URL` — `https://<your-church>.rewind.church/api/mcp/mcp`
- `REWIND_MCP_TOKEN` — a token you mint there (shown once; revocable)

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

The conversation runs on **your** Claude. Every Rewind tool is free by default:
searching, reading sermons, coverage, illustrations (`find_illustrations` reads a
precomputed index) and cited source evidence run no Rewind synthesis. Search and
evidence use only a tiny query embedding, which is not billed to your allowance.

Rewind spends only on an optional written synthesis:

- `ask`, `corpus_qa` and `compare_treatments` with `synthesize: true`, or
  `trace_theme` with `deep: true`;
- and only together with `spendConfirmed: true`. Without it, the tool returns a cost
  disclosure and spends nothing.

The skills never set `spendConfirmed` on their own. They show you the disclosure and
wait for your explicit yes. A synthesis uses your church's metered Rewind allowance
(typically a few cents; the tools report no exact amount or balance) and is capped
by your token's daily spend limit.

## Limits and errors

Each token has a burst limit, a daily request limit and a daily spend cap. When a tool
refuses, the skills read its `code`:

- `rate_limited` — too many requests at once. They wait `retryAfterSeconds` and retry.
- `daily_limit` — the token's daily request limit is reached. They stop and tell you;
  it resets within 24 hours.
- `auth_required` — the token is missing, revoked or expired. Reconnect Rewind: mint a
  new token in Studio → Connections and update `REWIND_MCP_TOKEN`.

A refusal without a `code` (a spend or research limit on a synthesis, or a request the
server cannot accept) is reported to you as-is rather than retried.

## Scoped to your church

Every request is scoped to **your church only**. A token is tied to you, carries your
role's permissions, and can be revoked instantly from the Connections page. No tool
can create, edit or delete sermon content; `add_to_chat` writes only to your own
private clip history.
