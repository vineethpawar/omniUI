# @plyxui/primitives

## 0.3.0

### Minor Changes

- 903acf5: Three new primitives: `Image`, `Divider`, `Spinner`.

  - `Image` wraps the native element with a themed loading skeleton, an
    `aspectRatio` prop, a `radius` token, and a `fallback` slot for when
    the URL 404s. Native uses RN `Image` with the same shape.
  - `Divider` is a themed line: horizontal or vertical, optional inline
    label for the OR-style splitter, dashed style available.
  - `Spinner` is an indeterminate loading indicator. SVG arc + CSS
    keyframe on web, RN `ActivityIndicator` on native. Five named sizes
    - raw pixels, accessible by default (`role=status`, `aria-label`).

  Phase 3 (primitives) is now complete: Box, Text, Stack, Flex, Input,
  Button, Image, Divider, Spinner.

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
  - @plyxui/styles@0.2.0
