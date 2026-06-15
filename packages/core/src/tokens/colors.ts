/**
 * Color tokens.
 *
 * Each token has a `light` and `dark` value. The ThemeProvider resolves
 * these at runtime and exposes the active palette via `useTheme().colors`.
 *
 * Extending tokens from userland:
 *
 * ```ts
 * declare module "@plyxui/core" {
 *   interface OmniColorTokens {
 *     brandTeal: string;
 *   }
 * }
 * ```
 *
 * Then add the runtime value with `registerColorTokens({ brandTeal: { ... } })`
 * before the app mounts.
 */

export type ThemeVariant = "light" | "dark";

export type ColorPair = { light: string; dark: string };

/**
 * Built-in token keys. Extend via module augmentation (see file header).
 */
export interface OmniColorTokens {
  primaryFill: string;
  surfaceFill: string;
  containerFill: string;
  stroke: string;
  text: string;
  textMuted: string;
  primaryOrange: string;
  primaryAccent: string;
  statusSuccess: string;
  statusError: string;
  statusWarning: string;
}

/**
 * Default token table. The light + dark values here mirror what I've shipped
 * in BCI tooling for over a year; they survive both bright clinical rooms
 * and dim recording booths. Tweak liberally.
 */
export const colorTokens: Record<keyof OmniColorTokens, ColorPair> = {
  primaryFill:    { light: "#FBF6F3", dark: "#111111" },
  surfaceFill:    { light: "#FFFFFF", dark: "#22201F" },
  containerFill:  { light: "#F3E7E1", dark: "#191919" },
  stroke:         { light: "#A7A4A2", dark: "#3A3735" },
  text:           { light: "#010101", dark: "#FFFFFF" },
  textMuted:      { light: "#6A6663", dark: "#A7A4A2" },
  primaryOrange:  { light: "#FF5C00", dark: "#FF5C00" },
  primaryAccent:  { light: "#5B54F0", dark: "#6366F1" },
  statusSuccess:  { light: "#22A861", dark: "#299764" },
  statusError:    { light: "#DC3545", dark: "#E05146" },
  statusWarning:  { light: "#F0A500", dark: "#F2B143" },
};

/**
 * Resolve the active palette for a theme mode.
 */
export function resolveColors(mode: ThemeVariant): Record<keyof OmniColorTokens, string> {
  const out = {} as Record<keyof OmniColorTokens, string>;
  for (const key of Object.keys(colorTokens) as Array<keyof OmniColorTokens>) {
    out[key] = colorTokens[key][mode];
  }
  return out;
}

/**
 * camelCase token key to CSS variable: `primaryFill` -> `--omni-color-primary-fill`.
 */
export function toCssVarName(key: string): string {
  return `--omni-color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}

/**
 * Register brand tokens at runtime. Pair with a `declare module` augmentation
 * to get full TS support; see README "Extending tokens".
 *
 * Call before `<ThemeProvider>` mounts. If you mutate after mount, follow up
 * with `useTheme().refreshColors()` to nudge consumers.
 */
export function registerColorTokens(extra: Record<string, ColorPair>): void {
  Object.assign(colorTokens, extra);
}
