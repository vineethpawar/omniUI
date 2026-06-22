# @plyxui/mcp

Model Context Protocol server for plyxui. Lets coding agents (Claude
Desktop, Claude Code, Cursor, Cline, Continue) list, search, install,
and lint plyxui components conversationally.

## Run

```bash
# As a one-off — prints the tool surface and exits
npx @plyxui/mcp tools

# As a real MCP server on stdio (the default; what every host expects)
npx @plyxui/mcp
```

## Wire into Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
(macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```jsonc
{
  "mcpServers": {
    "plyxui": {
      "command": "npx",
      "args": ["-y", "@plyxui/mcp"]
    }
  }
}
```

Restart Claude Desktop. The eight tools below show up under the hammer
icon. Try: *"list all plyxui primitives"* or *"give me the props for
the Modal component"* or *"install Drawer into this project."*

## Wire into Cursor / Cline / Continue

Same shape — every MCP-capable host accepts a `{command, args}` stdio
entry. Substitute `@plyxui/mcp` for the binary.

## Tools

| Name | Purpose |
|---|---|
| `plyxui_list_components` | All components, optionally filtered by category |
| `plyxui_get_component` | Full prop table, examples, source path, tokens used |
| `plyxui_search` | Free-text search over names + descriptions + prop names |
| `plyxui_suggest` | Natural-language description → ranked component shortlist |
| `plyxui_install` | Returns the npm install + import lines for a given component |
| `plyxui_get_tokens` | Active design tokens (colors) for light or dark |
| `plyxui_lint` | Static checks on a TSX snippet — hex colors, missing imports, old scope |
| `plyxui_examples` | Runnable code samples for a single component |

## How install works

plyxui packages ship pre-bundled `dist/*.{js,cjs,d.ts}`. There's no
"copy source into your repo" step like shadcn — consumers just install
the npm package and import. `plyxui_install` returns the install
command and import line for the agent to execute in your project:

```
RUN: npm install @plyxui/comps
IMPORT: import { Modal } from "@plyxui/comps";
```

## Use the registry from code

```ts
import { COMPONENTS, findComponent, searchComponents } from "@plyxui/mcp/registry";
import { handlers } from "@plyxui/mcp/server";

// Hit a handler directly without stdio — handy for tests + tooling
const result = await handlers.plyxui_get_component({ name: "Modal" });
```

## Status

End-to-end working as of 0.3. The registry covers every shipped
component; the lint engine catches the three most common foot-guns
(hex colors in style props, `useTheme` without an import, the legacy
`@omniui/*` scope). AST-based rules will replace the regexes without
changing the wire format.
