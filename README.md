# omniUI

A component library that tries to be equally good for humans and AI agents.

Most libraries pick a lane. shadcn is built around copy-paste. Radix is built around correctness. Tamagui is built around its compiler. omniUI is built around one assumption: in 2026 the agent installing your component matters as much as the developer reading the docs.

## Why I'm building this

After shipping a few products on top of shadcn + Radix + bespoke Electron chrome, the same gaps kept showing up:

1. The same components had to be rewritten three times: web, Electron renderer, VS Code webview. The first two are mostly the same with a few title-bar and IPC edges. The webview pretends to be web but isn't quite.
2. Type intellisense degraded as the design system grew. Variants, tokens, icon names: all stringly typed eventually.
3. Cursor and Claude Code consistently misimplemented components because they couldn't read the design system. They scraped HTML from a docs site and guessed.

omniUI is an attempt to fix all three at once:

- One source tree, platform splits via `.native.tsx`. Electron treats web as web. VS Code webview gets its own theme bridge.
- `cva` for variants, branded tokens, module augmentation hooks. Autocomplete is the spec.
- A first-party MCP server (`@omniui/mcp`) so coding agents can list, search, install, and lint components conversationally.

## Status

Foundation + first chunk of breadth + docs scaffold all in. Tracker in `OMNIUI_PLAN.md`.

- `@omniui/core`: design tokens (colors, spacing, radius), polymorphic type helper, headless hooks. Module-augmentable.
- `@omniui/theme`: ThemeProvider for web and React Native. Follows OS preference until you toggle; persists once you do. Electron title-bar bridge baked in.
- `@omniui/primitives`: `Box`, `Text`, `Stack`, `Flex`, `Input`, `Button`. Web + native parity.
- `@omniui/icons`: registry-based `Icon` component, augmentable name union, seed pack of 20.
- `@omniui/layouts`: `AppShell`, `Sidebar`, `ScreenContainer`.
- `@omniui/navigator`: router-agnostic `defineRoutes` + adapters for react-router and react-navigation.
- `@omniui/comps`: `Modal`, `Dropdown`. More incoming.
- `@omniui/mcp`: tool signatures, handler impls in progress.

Not on npm yet. The 0.1 cut lands once the MCP server has real handlers; until then, point at the GitHub workspace.

## Extending tokens

Tokens are interfaces, not enums. Augment them from userland and the rest of the library autocompletes against your brand:

```ts
declare module "@omniui/core" {
  interface OmniColorTokens {
    brandTeal: string;
    brandTealMuted: string;
  }
}

import { registerColorTokens } from "@omniui/core";

registerColorTokens({
  brandTeal:      { light: "#0FAFA4", dark: "#3FD9CE" },
  brandTealMuted: { light: "#E1F5F4", dark: "#0A2E2C" },
});
```

After registration, every `useTheme().colors.brandTeal` call is typed, and every `<Box surface="brandTeal">` autocompletes.

## Layout

```
omniUI/
├── apps/
│   ├── playground-web/      vite app, quick way to see primitives render
│   ├── docs/                next.js + MDX docs site
│   └── landing/             product page (Product Hunt-bound)
├── packages/
│   ├── core/                tokens + types + hooks, zero DOM, zero RN
│   ├── theme/               ThemeProvider with web + native splits
│   ├── primitives/          Box, Text, Stack, Flex, Input, Button
│   ├── icons/               Icon component + registry + seed pack
│   ├── layouts/             AppShell, Sidebar, ScreenContainer
│   ├── navigator/           router-agnostic + adapters
│   ├── comps/               Modal, Dropdown (more coming)
│   └── mcp/                 first-party MCP server
├── turbo.json
└── tsconfig.base.json
```

## Local dev

```bash
npm install
npm run check-types
npm run dev --workspace=@omniui/playground-web
```

## Roadmap

Foundation + breadth + docs scaffold are in. Next stops:

- MCP server: real handler implementations behind the tool signatures, then llms.txt at the docs root.
- Composites: Tooltip, Tabs, Toast, Drawer.
- AI desktop app: paste a Figma frame URL + bring your Anthropic key, the agent edits the design system in place.
- Theme remix backend: publish a token + variant override bundle, share with a one-line `<ThemeProvider remixUrl="..." />`.
- Sprite-sheet codegen for heavy icon users.

See `OMNIUI_PLAN.md` for the running tracker.

## Prior art

Patterns borrowed and lessons learned from shadcn, Radix, Tamagui, Mantine, react-native-reusables, assistant-ui, and the Anthropic MCP team. Everything good here is theirs. Everything weird is mine.

## License

MIT.
