---
"@plyxui/comps": minor
---

Four new comps: `Tooltip`, `Tabs`, `Toaster`, `Drawer`.

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
