---
"@plyxui/mcp": minor
---

Wire the real MCP server. `@plyxui/mcp` is no longer a stub.

- **stdio transport** via `@modelcontextprotocol/sdk`. Claude Desktop,
  Cursor, Cline, Continue all pick up the eight tools when you point
  their `mcpServers` config at `npx -y @plyxui/mcp`.
- **Components registry** — hand-curated entry for every shipped
  component (Box, Text, Stack, Flex, Input, Button, Image, Divider,
  Spinner, Icon, Field, Select, Checkbox, Radio, Modal, Dropdown,
  Tooltip, Tabs, Toaster, Drawer, AppShell, Sidebar, EmptyState,
  CommandPalette). Each carries the prop table, examples, source
  path, and the design tokens it touches.
- **Real handlers** for all eight tools. `plyxui_search` does
  word-overlap scoring against names + descriptions + prop names.
  `plyxui_install` returns the `npm install <pkg>` + `import` line
  for the agent to execute in the user's project (no source-copy
  step — packages ship pre-bundled dist). `plyxui_lint` catches
  three common foot-guns (hex colors in `style` props, `useTheme`
  without the `@plyxui/styles` import, the legacy `@omniui/*`
  scope).
- **Pre-bundled dist** via tsup, same as the rest of the workspace.
  `dist/bin.cjs` is the CLI entry; `@plyxui/mcp/registry`,
  `@plyxui/mcp/server`, and `@plyxui/mcp/tools` are subpath exports
  so tooling can reach into the registry without spinning stdio.
- **README** has the Claude Desktop / Cursor / Cline config snippets;
  `apps/docs/public/llms.txt` lands at `plyxui.com/llms.txt` so any
  AI agent crawling the docs gets a structured pointer.
