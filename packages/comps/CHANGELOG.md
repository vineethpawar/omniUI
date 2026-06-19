# @plyxui/comps

## 0.3.0

### Minor Changes

- 9a6021c: Wire actual `tsup` builds across every package. Consumers now install
  pre-bundled `dist/*.{js,cjs,d.ts}` instead of raw `.ts` source.

  Three things this changes:

  - **Drop-in for any bundler.** Vite, Next, Webpack, Metro, Rollup,
    esbuild, plain Node — none of them have to TS-compile from
    `node_modules` anymore. Snackager (Expo Snack) and other strict
    bundlers stop failing on `.ts` files in deps.
  - **Proper intellisense.** Every entry point emits a paired `.d.ts`
    (and `.d.cts`) so VS Code / WebStorm autocomplete works the same
    way it does for Mantine, Radix, etc. JSDoc on every exported
    symbol carries through to the type definitions.
  - **Smaller installs.** `dist/` tree-shakes; the published tarball
    drops `~30-40%` for most packages compared to source-publish.

  The exports field of every package now uses the standard pattern:

  ```jsonc
  {
    ".": {
      "react-native": {
        "types": "./dist/index.native.d.ts",
        "import": "./dist/index.native.js",
        "require": "./dist/index.native.cjs"
      },
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
  ```

  Source is still shipped in the tarball (`files: ["dist", "src"]`)
  for sourcemaps + reading the original code, but consumers resolve
  against `dist/`.

  Run `tsup` per package via `npm run build`. Turbo caches the
  output. CI now runs `npx turbo build --filter="@plyxui/*"` before
  `changesets/action` publishes.

### Patch Changes

- Updated dependencies [9a6021c]
  - @plyxui/core@0.3.0
  - @plyxui/styles@0.3.0
  - @plyxui/hooks@0.3.0
  - @plyxui/icons@0.3.0
  - @plyxui/primitives@0.4.0

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
  - @plyxui/styles@0.2.1
  - @plyxui/primitives@0.3.1
  - @plyxui/icons@0.2.1
  - @plyxui/hooks@0.2.1

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
