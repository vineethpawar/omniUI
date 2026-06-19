---
"@plyxui/core": patch
"@plyxui/styles": patch
"@plyxui/hooks": patch
---

Pin `ThemeContext`, `ToastContext`, and the `colorTokens` table to
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
