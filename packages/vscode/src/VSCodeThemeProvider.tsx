/**
 * VSCodeThemeProvider — runs plyxui inside a VS Code webview extension.
 *
 * Two jobs:
 *
 *  1. Mirror VS Code's active theme kind into plyxui's `ThemeProvider`.
 *     VS Code annotates `<body data-vscode-theme-kind="...">` with one
 *     of `vscode-light`, `vscode-dark`, `vscode-high-contrast`, or
 *     `vscode-high-contrast-light`. We watch that attribute and call
 *     `setMode` whenever it changes — your components light/dark
 *     toggle in lockstep with the user's IDE.
 *
 *  2. Override key plyxui color tokens with `var(--vscode-*)` so a
 *     `<Button variant="primary">` adopts the IDE's accent, a
 *     `<Box surface="raised">` blends with the active editor
 *     background, focus rings respect the user's contrast level, etc.
 *
 * Usage:
 *
 *   import { VSCodeThemeProvider } from "@plyxui/vscode";
 *
 *   createRoot(document.getElementById("root")!).render(
 *     <VSCodeThemeProvider>
 *       <App />
 *     </VSCodeThemeProvider>
 *   );
 *
 * No ThemeProvider from `@plyxui/styles` needed alongside — this one
 * mounts plyxui's provider internally.
 */
import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider, useTheme } from "@plyxui/styles";
import { registerColorTokens } from "@plyxui/core";

type VscodeKind =
  | "vscode-light"
  | "vscode-dark"
  | "vscode-high-contrast"
  | "vscode-high-contrast-light";

function kindToMode(kind: string | null | undefined): "light" | "dark" {
  if (!kind) return "dark";
  return kind === "vscode-light" || kind === "vscode-high-contrast-light" ? "light" : "dark";
}

function readKind(): VscodeKind | null {
  if (typeof document === "undefined") return null;
  return (document.body.getAttribute("data-vscode-theme-kind") as VscodeKind | null) ?? null;
}

/**
 * Map VS Code's CSS variables onto plyxui's token table. The values are
 * literal `var(...)` strings — they resolve against the active theme
 * because VS Code re-paints those vars whenever the user switches themes.
 *
 * We register both light/dark so the same vars work regardless of which
 * mode plyxui resolved to (VS Code's vars are kind-aware on their own).
 */
function registerVscodeBridge(): void {
  const v = (name: string, fallback: string): { light: string; dark: string } => ({
    light: `var(${name}, ${fallback})`,
    dark: `var(${name}, ${fallback})`,
  });

  registerColorTokens({
    primaryFill:    v("--vscode-editor-background", "#1e1e1e"),
    surfaceFill:    v("--vscode-sideBar-background", "#252526"),
    containerFill:  v("--vscode-input-background", "#3c3c3c"),
    stroke:         v("--vscode-panel-border", "#3a3a3a"),
    text:           v("--vscode-foreground", "#cccccc"),
    textMuted:      v("--vscode-descriptionForeground", "#999999"),
    primaryOrange:  v("--vscode-button-background", "#0e639c"),
    primaryAccent:  v("--vscode-focusBorder", "#007fd4"),
    statusSuccess:  v("--vscode-testing-iconPassed", "#22A861"),
    statusError:    v("--vscode-errorForeground", "#f48771"),
    statusWarning:  v("--vscode-editorWarning-foreground", "#cca700"),
  });
}

// Side-effect on import: register the bridge once so even consumers who
// reach for raw `colorTokens` see VS Code colors. The plyxui-core token
// table lives on globalThis, so this is idempotent across duplicate
// bundles.
registerVscodeBridge();

interface VSCodeThemeProviderProps {
  children: ReactNode;
  /** Force a mode (skip the body attribute watch). Useful for SSR + tests. */
  forceMode?: "light" | "dark";
}

export function VSCodeThemeProvider({ children, forceMode }: VSCodeThemeProviderProps) {
  return (
    <ThemeProvider defaultMode={forceMode ?? kindToMode(readKind())}>
      <KindSync forceMode={forceMode} />
      {children}
    </ThemeProvider>
  );
}

/**
 * Watches `<body data-vscode-theme-kind>` and pushes mode changes into
 * plyxui's provider as the user flips themes in VS Code.
 */
function KindSync({ forceMode }: { forceMode?: "light" | "dark" }) {
  const { setMode } = useTheme();
  const [kind, setKind] = useState<string | null>(readKind());

  useEffect(() => {
    if (forceMode) return;
    if (typeof document === "undefined") return;
    const obs = new MutationObserver(() => setKind(readKind()));
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-vscode-theme-kind"] });
    return () => obs.disconnect();
  }, [forceMode]);

  useEffect(() => {
    if (forceMode) return;
    setMode(kindToMode(kind));
  }, [kind, forceMode, setMode]);

  return null;
}

/** Read the current VS Code theme kind directly. */
export function useVscodeKind(): VscodeKind | null {
  const [kind, setKind] = useState<VscodeKind | null>(readKind());
  useEffect(() => {
    if (typeof document === "undefined") return;
    const obs = new MutationObserver(() => setKind(readKind()));
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-vscode-theme-kind"] });
    return () => obs.disconnect();
  }, []);
  return kind;
}
