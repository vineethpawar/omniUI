# @plyxui/plugins

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
  - @plyxui/comps@0.3.0

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
  - @plyxui/comps@0.2.1

## 0.2.0

### Minor Changes

- 351bdc7: Four new packages at 0.1.0:

  - `@plyxui/hooks` — `useDisclosure`, `useClickOutside`, `useMediaQuery`, `useToast` + `ToastProvider`. Pulled out of core so core stays pure-data.
  - `@plyxui/forms` — `Field` wrapper, `Select`, `Checkbox`, `Radio` + `RadioGroup`. Form-grade controls that defer to native browser UX where it helps (accessibility, mobile keyboard).
  - `@plyxui/screens` — drop-in screen scaffolds: `AuthLayout` (centered card with brand), `EmptyState` (icon + headline + body + CTA), `ErrorScreen` (big code, copy, retry).
  - `@plyxui/plugins` — heavyweight opt-in components. Ships with `CommandPalette` (Cmd+K launcher with substring matching + keyboard navigation). DataTable + Chart wrappers planned.

  The package ladder is now eleven items. The auto-install-via-dependencies model means consumers install only the top-most layer they need and get everything below transitively.

### Patch Changes

- Updated dependencies [7eafe46]
- Updated dependencies [351bdc7]
- Updated dependencies [cab0e50]
  - @plyxui/comps@0.2.0
  - @plyxui/hooks@0.2.0
  - @plyxui/core@0.2.0
  - @plyxui/styles@0.2.0
  - @plyxui/primitives@0.2.0
  - @plyxui/icons@0.2.0
