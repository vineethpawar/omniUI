# @plyxui/vscode

## 0.2.0

### Minor Changes

- 2aacedb: New package: `@plyxui/vscode` — drop-in adapter so plyxui runs inside
  a VS Code webview extension and adopts the user's active IDE theme.

  What it ships:

  - **`<VSCodeThemeProvider>`** — root wrapper. Mounts plyxui's
    `ThemeProvider` internally, watches `<body data-vscode-theme-kind>`
    for live light/dark/HC switches, and overrides plyxui's color
    tokens with `var(--vscode-*)` so a `<Button variant="primary">`
    adopts the IDE accent, surfaces blend with the active editor
    background, focus rings respect the user's contrast level.
  - **`useVscodeKind()`** — returns the current `vscode-light` /
    `vscode-dark` / `vscode-high-contrast` / `vscode-high-contrast-light`
    string for code that needs to branch by kind.
  - **`useVscodeApi<TState>()`** — singleton wrapper around
    `acquireVsCodeApi()`. Caches across React mounts (VS Code only
    permits one call per webview). Returns `null` outside an extension
    context so tests + Storybook + the docs site stay green.
  - **`useVscodeMessage<M>(handler)`** — wires `window.message` events
    from the extension host with typed handler ergonomics.

  Plyxui now has three platform targets: web, React Native, and VS Code
  webview. Same component source, three targets.

  Docs at `/docs/getting-started/vscode/`.
