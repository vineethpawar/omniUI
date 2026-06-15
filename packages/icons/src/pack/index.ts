/**
 * Seed pack. 20 strokeable icons covering the cases we use everywhere:
 * navigation chrome, status, content actions, file ops.
 *
 * Import this pack once at app boot:
 *
 * ```ts
 * import { registerIcons } from "@plyxui/icons";
 * import { seedPack } from "@plyxui/icons/pack";
 * registerIcons(seedPack);
 * ```
 *
 * Then augment the registry shape so name autocomplete kicks in:
 *
 * ```ts
 * declare module "@plyxui/icons" {
 *   interface IconRegistryShape {
 *     home: import("@plyxui/icons").IconDef;
 *     // ... or just import the seedPackKeys helper below
 *   }
 * }
 * ```
 *
 * Icon paths are lucide-shaped (24x24 viewBox, 2px nominal stroke) so visual
 * weights are consistent. Drawn by hand for the foundation; the codegen
 * script in the roadmap will replace this with a copy of lucide proper.
 */
import type { IconDef } from "../registry";

export const seedPack = {
  home: {
    elements: [
      { kind: "path", d: "M3 11l9-8 9 8" },
      { kind: "path", d: "M5 10v10h4v-6h6v6h4V10" },
    ],
  },
  search: {
    elements: [
      { kind: "circle", cx: 11, cy: 11, r: 7 },
      { kind: "line", x1: 21, y1: 21, x2: 16.65, y2: 16.65 },
    ],
  },
  settings: {
    elements: [
      { kind: "circle", cx: 12, cy: 12, r: 3 },
      { kind: "path", d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" },
    ],
  },
  bell: {
    elements: [
      { kind: "path", d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" },
      { kind: "path", d: "M13.73 21a2 2 0 0 1-3.46 0" },
    ],
  },
  user: {
    elements: [
      { kind: "path", d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
      { kind: "circle", cx: 12, cy: 7, r: 4 },
    ],
  },
  menu: {
    elements: [
      { kind: "line", x1: 3, y1: 6, x2: 21, y2: 6 },
      { kind: "line", x1: 3, y1: 12, x2: 21, y2: 12 },
      { kind: "line", x1: 3, y1: 18, x2: 21, y2: 18 },
    ],
  },
  x: {
    elements: [
      { kind: "line", x1: 18, y1: 6, x2: 6, y2: 18 },
      { kind: "line", x1: 6, y1: 6, x2: 18, y2: 18 },
    ],
  },
  check: {
    elements: [
      { kind: "polyline", points: "20 6 9 17 4 12" },
    ],
  },
  chevronDown: {
    elements: [
      { kind: "polyline", points: "6 9 12 15 18 9" },
    ],
  },
  chevronRight: {
    elements: [
      { kind: "polyline", points: "9 18 15 12 9 6" },
    ],
  },
  arrowLeft: {
    elements: [
      { kind: "line", x1: 19, y1: 12, x2: 5, y2: 12 },
      { kind: "polyline", points: "12 19 5 12 12 5" },
    ],
  },
  arrowRight: {
    elements: [
      { kind: "line", x1: 5, y1: 12, x2: 19, y2: 12 },
      { kind: "polyline", points: "12 5 19 12 12 19" },
    ],
  },
  plus: {
    elements: [
      { kind: "line", x1: 12, y1: 5, x2: 12, y2: 19 },
      { kind: "line", x1: 5, y1: 12, x2: 19, y2: 12 },
    ],
  },
  minus: {
    elements: [
      { kind: "line", x1: 5, y1: 12, x2: 19, y2: 12 },
    ],
  },
  trash: {
    elements: [
      { kind: "polyline", points: "3 6 5 6 21 6" },
      { kind: "path", d: "M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" },
      { kind: "path", d: "M10 11v6" },
      { kind: "path", d: "M14 11v6" },
    ],
  },
  download: {
    elements: [
      { kind: "path", d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" },
      { kind: "polyline", points: "7 10 12 15 17 10" },
      { kind: "line", x1: 12, y1: 15, x2: 12, y2: 3 },
    ],
  },
  upload: {
    elements: [
      { kind: "path", d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" },
      { kind: "polyline", points: "17 8 12 3 7 8" },
      { kind: "line", x1: 12, y1: 3, x2: 12, y2: 15 },
    ],
  },
  copy: {
    elements: [
      { kind: "rect", x: 9, y: 9, width: 13, height: 13, rx: 2 },
      { kind: "path", d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" },
    ],
  },
  share: {
    elements: [
      { kind: "circle", cx: 18, cy: 5, r: 3 },
      { kind: "circle", cx: 6, cy: 12, r: 3 },
      { kind: "circle", cx: 18, cy: 19, r: 3 },
      { kind: "line", x1: 8.59, y1: 13.51, x2: 15.42, y2: 17.49 },
      { kind: "line", x1: 15.41, y1: 6.51, x2: 8.59, y2: 10.49 },
    ],
  },
  externalLink: {
    elements: [
      { kind: "path", d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
      { kind: "polyline", points: "15 3 21 3 21 9" },
      { kind: "line", x1: 10, y1: 14, x2: 21, y2: 3 },
    ],
  },
} satisfies Record<string, IconDef>;

export type SeedPackName = keyof typeof seedPack;
