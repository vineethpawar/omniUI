/**
 * Web ThemeProvider.
 *
 * Drives the active palette as CSS custom properties on `documentElement`,
 * persists the mode to `localStorage`, and syncs the title bar with Electron
 * if the host exposes `window.electronAPI.setThemeColors`.
 *
 * The native variant lives in `index.native.tsx`. Metro picks that one for
 * React Native; Webpack / Vite / Next / Electron renderer all use this file.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  colorTokens,
  resolveColors,
  toCssVarName,
  type OmniColorTokens,
  type ThemeVariant,
} from "@plyxui/core";

const STORAGE_KEY = "plyxui-theme-mode";

type ResolvedColors = Record<keyof OmniColorTokens, string>;

export interface ThemeContextValue {
  mode: ThemeVariant;
  colors: ResolvedColors;
  setMode: (mode: ThemeVariant) => void;
  toggleTheme: () => void;
  /** Bump after mutating colorTokens at runtime (design system configurator). */
  refreshColors: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialMode(): ThemeVariant {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  // Fall back to the OS preference when the user hasn't picked one yet.
  // Defaults to dark if matchMedia isn't there (some older Electron renderers,
  // jsdom in unit tests).
  if (typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return "dark";
}

function applyCssVariables(mode: ThemeVariant): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const key of Object.keys(colorTokens) as Array<keyof OmniColorTokens>) {
    root.style.setProperty(toCssVarName(key), colorTokens[key][mode]);
  }
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeVariant;
}

export function ThemeProvider({ children, defaultMode }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeVariant>(() => defaultMode ?? getInitialMode());
  const [version, setVersion] = useState(0);
  const [userPicked, setUserPicked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) != null;
  });

  // Track OS-level theme changes while the user hasn't explicitly chosen.
  // The moment they hit toggleTheme / setMode, we stop following the OS.
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    if (userPicked) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => setMode(e.matches ? "light" : "dark");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [userPicked]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (userPicked) window.localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset["theme"] = mode;
    document.documentElement.style.colorScheme = mode;
    applyCssVariables(mode);

    // Optional Electron title bar sync. Only fires if the host exposes the API.
    type ElectronBridge = {
      setThemeColors?: (c: { bg: string; text: string }) => void;
    };
    const api = (window as unknown as { electronAPI?: ElectronBridge }).electronAPI;
    if (api?.setThemeColors) {
      api.setThemeColors({
        bg: colorTokens.primaryFill[mode],
        text: colorTokens.text[mode],
      });
      document.body.classList.add("plyxui-electron");
    }
  }, [mode, version]);

  const colors = useMemo(() => resolveColors(mode), [mode, version]);

  const setModeExplicit = useCallback((next: ThemeVariant) => {
    setUserPicked(true);
    setMode(next);
  }, []);
  const toggleTheme = useCallback(() => {
    setUserPicked(true);
    setMode((m) => (m === "dark" ? "light" : "dark"));
  }, []);
  const refreshColors = useCallback(() => setVersion((v) => v + 1), []);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, colors, setMode: setModeExplicit, toggleTheme, refreshColors }),
    [mode, colors, setModeExplicit, toggleTheme, refreshColors],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider />");
  }
  return ctx;
}
