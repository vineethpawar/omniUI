---
"@plyxui/core": patch
"@plyxui/styles": patch
"@plyxui/primitives": patch
"@plyxui/icons": patch
"@plyxui/hooks": patch
"@plyxui/forms": patch
"@plyxui/layouts": patch
"@plyxui/navigator": patch
"@plyxui/screens": patch
"@plyxui/plugins": patch
"@plyxui/comps": patch
---

Add `react-native` and `default` conditions to every package's `exports`
field. Metro is strict about the Node.js exports spec — if `exports` is
defined but doesn't list a condition Metro understands (it tries
`react-native` first, then `default`), the resolver errors with
"Package path . is not exported".

This unblocks consumers using Metro (Expo Snack, React Native CLI,
React Native Web bundling through Metro). Web consumers (Vite,
Next.js, Webpack) were unaffected because they read `import`.

No source changes — every condition still points at the same source
files as before. Pure exports-field plumbing.
