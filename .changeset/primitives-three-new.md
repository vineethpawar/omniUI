---
"@plyxui/primitives": minor
---

Three new primitives: `Image`, `Divider`, `Spinner`.

- `Image` wraps the native element with a themed loading skeleton, an
  `aspectRatio` prop, a `radius` token, and a `fallback` slot for when
  the URL 404s. Native uses RN `Image` with the same shape.
- `Divider` is a themed line: horizontal or vertical, optional inline
  label for the OR-style splitter, dashed style available.
- `Spinner` is an indeterminate loading indicator. SVG arc + CSS
  keyframe on web, RN `ActivityIndicator` on native. Five named sizes
  + raw pixels, accessible by default (`role=status`, `aria-label`).

Phase 3 (primitives) is now complete: Box, Text, Stack, Flex, Input,
Button, Image, Divider, Spinner.
