# @plyxui/mcp

## 0.3.0

### Minor Changes

- b61be2c: Wire the real MCP server. `@plyxui/mcp` is no longer a stub.

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

## 0.2.0

### Minor Changes

- cab0e50: First public alpha: 0.1.0

  Eight packages ship together so consumers can pull only what they need.

  **@plyxui/core** — tokens, polymorphic types, headless hooks. Pure TS, zero DOM, zero RN.

  **@plyxui/styles** — ThemeProvider + useTheme. CSS variables on web, Appearance API on native. Follows OS preference until the user picks.

  **@plyxui/primitives** — Box, Text, Stack, Flex, Input, Button. Web + native parity.

  **@plyxui/icons** — Icon component with a registry pattern. Seed pack of 20 strokeable icons. Augment via module declaration.

  **@plyxui/layouts** — AppShell, Sidebar, ScreenContainer.

  **@plyxui/navigator** — defineRoutes + react-router / react-navigation adapters.

  **@plyxui/comps** — Modal, Dropdown.

  **@plyxui/mcp** — first-party MCP server stub. Tool surface defined; handler implementations are the next chunk of work.

  Source-only distribution for now: each package ships `src/` and consumers' bundlers compile. Pre-compiled `dist/` builds come in 0.2.

### Patch Changes

- Updated dependencies [cab0e50]
  - @plyxui/core@0.2.0
