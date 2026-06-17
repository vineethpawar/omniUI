# @plyxui/forms

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
