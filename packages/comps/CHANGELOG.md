# @plyxui/comps

## 0.2.0

### Minor Changes

- 7eafe46: Four new comps: `Tooltip`, `Tabs`, `Toaster`, `Drawer`.

  - `Tooltip` wraps a single trigger element via `cloneElement`. Auto-flips to
    the opposite side if it would clip the viewport. Default 250&nbsp;ms open
    delay, immediate close. Escape dismisses. Native build is a pass-through
    for now — the hover gesture doesn't exist on touch.
  - `Tabs` ships as composable parts: `Tabs` + `TabList` + `Tab` + `TabPanel`.
    `aria-controls` / `aria-labelledby` pair every tab to its panel; arrow
    keys move focus + activate within the list.
  - `Toaster` is the renderer for the headless queue in `@plyxui/hooks`. Mount
    once near the app root, call `toast()` anywhere. Picks the per-variant
    accent from theme tokens (`statusSuccess`, `statusError`, …).
  - `Drawer` is a side-anchored sibling of `Modal`. Same controlled open/close
    shape, same Escape + backdrop dismiss, but the panel sits flush against
    an edge instead of centering.

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

- Updated dependencies [351bdc7]
- Updated dependencies [cab0e50]
  - @plyxui/hooks@0.2.0
  - @plyxui/core@0.2.0
  - @plyxui/styles@0.2.0
  - @plyxui/primitives@0.2.0
  - @plyxui/icons@0.2.0
