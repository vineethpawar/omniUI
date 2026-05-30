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

Phase 0 wrapped, phase 1 hardening in flight.

- `@omniui/core`: design tokens (colors, spacing, radius), polymorphic type helper, headless hooks. Module-augmentable, see below.
- `@omniui/theme`: ThemeProvider for web and React Native, shared `useTheme()`. Follows OS preference until the user picks; persists once they do.
- `@omniui/primitives`: `Box` (polymorphic web, View-backed native). More on the way; tracker in `OMNIUI_PLAN.md`.
- `@omniui/mcp`: scaffolded MCP server. Tool signatures defined; handler impls are the next big chunk of work.

Not on npm yet. The 0.1 release targets the end of week 3 instead of week 2; module augmentation work pushed the schedule by a few days.

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
│   └── playground-web/      vite app, quick way to see Box render
├── packages/
│   ├── core/                tokens + types + hooks, zero DOM, zero RN
│   ├── theme/               ThemeProvider with web + native splits
│   ├── primitives/          Box (more coming)
│   └── mcp/                 MCP server stub for agent installs
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

- Week 1: foundation hardening, build pipeline, intellisense audit
- Week 2: MCP server, llms.txt, shadcn registry, docs site
- Week 3: agent UI components (ToolCall, AgentTrace, Citation, etc.) + RN parity for top 3

## Prior art

Patterns borrowed and lessons learned from shadcn, Radix, Tamagui, Mantine, react-native-reusables, assistant-ui, and the Anthropic MCP team. Everything good here is theirs. Everything weird is mine.

## License

MIT.
