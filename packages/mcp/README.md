# @omniui/mcp

Model Context Protocol server for omniUI. Lets coding agents (Claude Desktop, Claude Code, Cursor, Cline, Continue) list, search, install, and lint omniUI components conversationally.

## Status

Phase 0. Tool signatures defined. Real transport wiring lands in week 2.

## Tools

| Name | Purpose |
|---|---|
| `omniui_list_components` | List available components, optionally by category |
| `omniui_get_component` | Full prop table, examples, source for a component |
| `omniui_search` | Free-text search |
| `omniui_suggest` | Recommend components from a natural-language description |
| `omniui_install` | Copy a component into the user's project |
| `omniui_get_tokens` | Active design tokens for a theme |
| `omniui_lint` | Lint code for omniUI usage mistakes |
| `omniui_examples` | Runnable code samples |

## Run

```bash
npx omniui-mcp tools
```

## Wire into Claude Desktop

```jsonc
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "omniui": {
      "command": "npx",
      "args": ["-y", "@omniui/mcp"]
    }
  }
}
```
