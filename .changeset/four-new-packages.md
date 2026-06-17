---
"@omniui/hooks": minor
"@omniui/forms": minor
"@omniui/screens": minor
"@omniui/plugins": minor
---

Four new packages at 0.1.0:

- `@omniui/hooks` — `useDisclosure`, `useClickOutside`, `useMediaQuery`, `useToast` + `ToastProvider`. Pulled out of core so core stays pure-data.
- `@omniui/forms` — `Field` wrapper, `Select`, `Checkbox`, `Radio` + `RadioGroup`. Form-grade controls that defer to native browser UX where it helps (accessibility, mobile keyboard).
- `@omniui/screens` — drop-in screen scaffolds: `AuthLayout` (centered card with brand), `EmptyState` (icon + headline + body + CTA), `ErrorScreen` (big code, copy, retry).
- `@omniui/plugins` — heavyweight opt-in components. Ships with `CommandPalette` (Cmd+K launcher with substring matching + keyboard navigation). DataTable + Chart wrappers planned.

The package ladder is now eleven items. The auto-install-via-dependencies model means consumers install only the top-most layer they need and get everything below transitively.
