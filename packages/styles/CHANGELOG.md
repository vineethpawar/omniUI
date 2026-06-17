# @plyxui/styles

## 0.2.2

### Patch Changes

- 17b380c: Pin `ThemeContext`, `ToastContext`, and the `colorTokens` table to
  `globalThis` singletons. When a bundler (Snackager, Webpack with
  nohoist, etc.) ends up with multiple copies of the same plyxui
  package, each copy normally gets its own React context instance —
  so `<Text>` from `@plyxui/primitives` calls `useTheme()` on a
  different context than the consumer's `<ThemeProvider>` writes to,
  and the hook throws.

  Pinning to `globalThis` makes duplicate copies collapse to one
  shared instance regardless of how many times the package is
  bundled. Internal-only change; the public hook signatures are
  identical.

  This unblocks Expo Snack and any other Metro-style environment
  where Snackager pre-bundles each package independently.

- Updated dependencies [17b380c]
  - @plyxui/core@0.2.2

## 0.2.1

### Patch Changes

- 983fc15: Add `react-native` and `default` conditions to every package's `exports`
  field. Metro is strict about the Node.js exports spec — if `exports` is
  defined but doesn't list a condition Metro understands (it tries
  `react-native` first, then `default`), the resolver errors with
  "Package path . is not exported".

  This unblocks consumers using Metro (Expo Snack, React Native CLI,
  React Native Web bundling through Metro). Web consumers (Vite,
  Next.js, Webpack) were unaffected because they read `import`.

  No source changes — every condition still points at the same source
  files as before. Pure exports-field plumbing.

- Updated dependencies [983fc15]
  - @plyxui/core@0.2.1

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
