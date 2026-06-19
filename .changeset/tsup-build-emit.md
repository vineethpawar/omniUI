---
"@plyxui/core": minor
"@plyxui/styles": minor
"@plyxui/hooks": minor
"@plyxui/navigator": minor
"@plyxui/icons": minor
"@plyxui/primitives": minor
"@plyxui/forms": minor
"@plyxui/layouts": minor
"@plyxui/comps": minor
"@plyxui/screens": minor
"@plyxui/plugins": minor
---

Wire actual `tsup` builds across every package. Consumers now install
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
      "types":   "./dist/index.native.d.ts",
      "import":  "./dist/index.native.js",
      "require": "./dist/index.native.cjs"
    },
    "types":   "./dist/index.d.ts",
    "import":  "./dist/index.js",
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
