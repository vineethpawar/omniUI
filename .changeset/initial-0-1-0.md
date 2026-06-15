---
"@omniui/core": minor
"@omniui/styles": minor
"@omniui/primitives": minor
"@omniui/icons": minor
"@omniui/layouts": minor
"@omniui/navigator": minor
"@omniui/comps": minor
"@omniui/mcp": minor
---

First public alpha: 0.1.0

Eight packages ship together so consumers can pull only what they need.

**@omniui/core** — tokens, polymorphic types, headless hooks. Pure TS, zero DOM, zero RN.

**@omniui/styles** — ThemeProvider + useTheme. CSS variables on web, Appearance API on native. Follows OS preference until the user picks.

**@omniui/primitives** — Box, Text, Stack, Flex, Input, Button. Web + native parity.

**@omniui/icons** — Icon component with a registry pattern. Seed pack of 20 strokeable icons. Augment via module declaration.

**@omniui/layouts** — AppShell, Sidebar, ScreenContainer.

**@omniui/navigator** — defineRoutes + react-router / react-navigation adapters.

**@omniui/comps** — Modal, Dropdown.

**@omniui/mcp** — first-party MCP server stub. Tool surface defined; handler implementations are the next chunk of work.

Source-only distribution for now: each package ships `src/` and consumers' bundlers compile. Pre-compiled `dist/` builds come in 0.2.
