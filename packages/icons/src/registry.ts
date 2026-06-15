/**
 * Icon registry. Icons aren't imported per-file by consumers; they look them
 * up by name. That works the way you'd want:
 *
 *   <Icon name="home" />
 *
 * with full autocomplete, by extending the IconName union via module
 * augmentation. The seed pack ships in `@omniui/icons/pack`; bring your own
 * by registering at app boot.
 *
 * Why a registry instead of tree-shakeable per-icon imports? Three reasons.
 * One, names autocomplete -- the agent benefit and the dev benefit overlap
 * here. Two, screen-attached features (search, theming, swap-by-name) all
 * need to enumerate icons, which is awkward with per-icon imports. Three,
 * the sprite-sheet codegen later in the roadmap needs a centralized table.
 */

import type { ReactNode } from "react";

/**
 * An icon is a piece of SVG-shaped data. We keep it data-only rather than a
 * JSX node so the native renderer can re-tree it via react-native-svg's
 * primitive elements (Path, Circle, Rect) without DOM trickery.
 */
export type IconElement =
  | { kind: "path"; d: string; fillRule?: "nonzero" | "evenodd"; clipRule?: "nonzero" | "evenodd" }
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "rect"; x: number; y: number; width: number; height: number; rx?: number }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number }
  | { kind: "polyline"; points: string };

export interface IconDef {
  /** Default 24, matches lucide / heroicons. Override per icon if you must. */
  viewBox?: string;
  size?: number;
  /** Stroke-based by default. Set `filled: true` for solid icons. */
  filled?: boolean;
  elements: IconElement[];
}

/**
 * The shipped name union. Extend from userland:
 *
 * ```ts
 * declare module "@omniui/icons" {
 *   interface IconRegistryShape {
 *     "company/squiggle": IconDef;
 *     "x-bud/pinout": IconDef;
 *   }
 * }
 * ```
 */
export interface IconRegistryShape {
  // Augmented by the pack export -- see `pack/index.ts`. Keeping this empty
  // by default so consumers who skip the pack don't pay for it in types.
}

export type IconName = keyof IconRegistryShape & string;

const registry: Record<string, IconDef> = {};

/**
 * Register a batch of icons. Idempotent: re-registering a name replaces
 * the previous def (useful for live design-system tweaks).
 */
export function registerIcons(batch: Record<string, IconDef>): void {
  for (const [name, def] of Object.entries(batch)) {
    registry[name] = def;
  }
}

export function getIcon(name: string): IconDef | undefined {
  return registry[name];
}

export function listIcons(): string[] {
  return Object.keys(registry);
}

/**
 * For codegen tools: list the registered names + viewBoxes.
 */
export function snapshotRegistry(): Array<{ name: string; def: IconDef }> {
  return Object.entries(registry).map(([name, def]) => ({ name, def }));
}

/** Re-exported for the Icon component (web + native both pull from here). */
export type RenderableIcon = { def: IconDef; node: ReactNode };
