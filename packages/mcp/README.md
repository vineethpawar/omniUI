# @plyxui/mcp

Model Context Protocol server for plyxui. Lets coding agents (Claude Desktop, Claude Code, Cursor, Cline, Continue) list, search, install, and lint plyxui components conversationally.

## Status

Phase 0. Tool signatures defined. Real transport wiring lands in week 2.

## Tools

| Name | Purpose |
|---|---|
| `plyxui_list_components` | List available components, optionally by category |
| `plyxui_get_component` | Full prop table, examples, source for a component |
| `plyxui_search` | Free-text search |
| `plyxui_suggest` | Recommend components from a natural-language description |
| `plyxui_install` | Copy a component into the user's project |
| `plyxui_get_tokens` | Active design tokens for a theme |
| `plyxui_lint` | Lint code for plyxui usage mistakes |
| `plyxui_examples` | Runnable code samples |

## Run

```bash
npx plyxui-mcp tools
```

## Wire into Claude Desktop

```jsonc
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "plyxui": {
      "command": "npx",
      "args": ["-y", "@plyxui/mcp"]
    }
  }
}
```
