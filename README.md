<p align="center">
  <img src="./logo.svg" width="84" height="84" alt="omniUI" />
</p>

<h1 align="center">omniUI</h1>

<p align="center">
  A component library that tries to be equally good for humans and AI agents.
</p>

<p align="center">
  <a href="https://omniui-one.vercel.app">Landing</a> &middot;
  <a href="https://omniui-docs.vercel.app">Docs</a> &middot;
  <a href="https://omniui-releases.vercel.app">Releases</a> &middot;
  <a href="https://github.com/vineethpawar/ai-polish-desktop">AI Polish (sibling)</a>
</p>

---

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

0.1 cut across eleven packages. Tracker in `OMNIUI_PLAN.md`, full ladder at <https://omniui-docs.vercel.app/getting-started/ladder/>.

### Foundation

- `@omniui/core` — tokens (colors, spacing, radius), polymorphic helpers, module-augmentable token interfaces.
- `@omniui/styles` — ThemeProvider + useTheme. Follows OS preference until you toggle. Electron title-bar bridge baked in.
- `@omniui/primitives` — Box, Text, Stack, Flex, Input, Button. Web + native parity.
- `@omniui/icons` — registry-based Icon, augmentable name union, seed pack of 20.
- `@omniui/hooks` — useDisclosure, useClickOutside, useMediaQuery, useToast.

### Mid-rung

- `@omniui/layouts` — AppShell, Sidebar, ScreenContainer.
- `@omniui/navigator` — router-agnostic defineRoutes + react-router / react-navigation adapters.
- `@omniui/forms` — Field, Select, Checkbox, Radio + RadioGroup.
- `@omniui/comps` — Modal, Dropdown. Tooltip + Tabs + Toast next.

### High-rung

- `@omniui/screens` — AuthLayout, EmptyState, ErrorScreen.
- `@omniui/plugins` — CommandPalette. DataTable + Chart next.

### Tooling

- `@omniui/mcp` — first-party MCP server. Tool surface defined; real handlers next.

Not on npm yet. The 0.1 publish is gated on adding `NPM_TOKEN` to the repo secrets; the release workflow (`.github/workflows/release.yml`) is already wired via `changesets/action`.

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
│   ├── docs/                next + MDX docs site → omniui-docs.vercel.app
│   ├── landing/             product page → omniui-one.vercel.app
│   └── releases/            release index → omniui-releases.vercel.app
├── packages/
│   ├── core/                tokens + types, zero DOM, zero RN
│   ├── styles/              ThemeProvider with web + native splits
│   ├── primitives/          Box, Text, Stack, Flex, Input, Button
│   ├── hooks/               useDisclosure, useClickOutside, useToast
│   ├── icons/               Icon component + registry + seed pack
│   ├── layouts/             AppShell, Sidebar, ScreenContainer
│   ├── navigator/           router-agnostic + adapters
│   ├── forms/               Field, Select, Checkbox, Radio
│   ├── comps/               Modal, Dropdown (more coming)
│   ├── screens/             AuthLayout, EmptyState, ErrorScreen
│   ├── plugins/             CommandPalette (heavyweight stuff)
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
- Theme remix backend: publish a token + variant override bundle, share with a one-line `<ThemeProvider remixUrl="..." />`.
- Sprite-sheet codegen for heavy icon users.

See `OMNIUI_PLAN.md` for the running tracker.

## Related

- **[AI Polish](https://github.com/vineethpawar/ai-polish-desktop)** — sibling desktop app. Pick a project folder, paste an Anthropic key, hand the agent a Figma frame. Pairs nicely with omniUI but works on any codebase.

## Prior art

Patterns borrowed and lessons learned from shadcn, Radix, Tamagui, Mantine, react-native-reusables, assistant-ui, and the Anthropic MCP team. Everything good here is theirs. Everything weird is mine.

## License

MIT.
