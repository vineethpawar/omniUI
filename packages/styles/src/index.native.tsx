/**
 * React Native ThemeProvider.
 *
 * Reads the system mode via the Appearance API and exposes the same
 * `useTheme()` surface as the web variant. Persistence is a TODO: we
 * intentionally don't pull in AsyncStorage at the package level so apps
 * can wire whatever storage they want.
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
import { Appearance, type ColorSchemeName } from "react-native";
import {
  colorTokens,
  resolveColors,
  type OmniColorTokens,
  type ThemeVariant,
} from "@plyxui/core";

type ResolvedColors = Record<keyof OmniColorTokens, string>;

export interface ThemeContextValue {
  mode: ThemeVariant;
  colors: ResolvedColors;
  setMode: (mode: ThemeVariant) => void;
  toggleTheme: () => void;
  refreshColors: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function fromColorScheme(scheme: ColorSchemeName): ThemeVariant {
  return scheme === "light" ? "light" : "dark";
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeVariant;
}

export function ThemeProvider({ children, defaultMode }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeVariant>(
    () => defaultMode ?? fromColorScheme(Appearance.getColorScheme()),
  );
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (defaultMode) return; // explicit prop wins, don't track system
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setMode(fromColorScheme(colorScheme));
    });
    return () => sub.remove();
  }, [defaultMode]);

  const colors = useMemo(() => resolveColors(mode), [mode, version]);
  const toggleTheme = useCallback(() => setMode((m) => (m === "dark" ? "light" : "dark")), []);
  const refreshColors = useCallback(() => setVersion((v) => v + 1), []);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, colors, setMode, toggleTheme, refreshColors }),
    [mode, colors, toggleTheme, refreshColors],
  );

  // Silence "value not read in this build" for the rare consumer of colorTokens
  // outside the hook; keeps tree-shaker honest.
  void colorTokens;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider />");
  }
  return ctx;
}
