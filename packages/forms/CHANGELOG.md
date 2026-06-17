# @plyxui/forms

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

## 0.2.0

### Minor Changes

- 351bdc7: Four new packages at 0.1.0:

  - `@plyxui/hooks` — `useDisclosure`, `useClickOutside`, `useMediaQuery`, `useToast` + `ToastProvider`. Pulled out of core so core stays pure-data.
  - `@plyxui/forms` — `Field` wrapper, `Select`, `Checkbox`, `Radio` + `RadioGroup`. Form-grade controls that defer to native browser UX where it helps (accessibility, mobile keyboard).
  - `@plyxui/screens` — drop-in screen scaffolds: `AuthLayout` (centered card with brand), `EmptyState` (icon + headline + body + CTA), `ErrorScreen` (big code, copy, retry).
  - `@plyxui/plugins` — heavyweight opt-in components. Ships with `CommandPalette` (Cmd+K launcher with substring matching + keyboard navigation). DataTable + Chart wrappers planned.

  The package ladder is now eleven items. The auto-install-via-dependencies model means consumers install only the top-most layer they need and get everything below transitively.

### Patch Changes

- Updated dependencies [cab0e50]
  - @plyxui/core@0.2.0
  - @plyxui/styles@0.2.0
  - @plyxui/primitives@0.2.0
