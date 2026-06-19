/**
 * Icon (native).
 *
 * Mirrors the web API but rebuilds via react-native-svg primitives. We require
 * `react-native-svg` as an OPTIONAL peer; consumers who don't install it just
 * get an empty View placeholder at the right size, which is what RN apps do
 * during native-module setup anyway.
 */
import { useTheme } from "@plyxui/styles";
import { type OmniColorTokens } from "@plyxui/core";
import { getIcon, type IconElement, type IconName } from "./registry";

type ThemeColorKey = keyof OmniColorTokens;

export interface IconProps {
  name: IconName | (string & {});
  size?: number;
  color?: ThemeColorKey | (string & {});
  strokeWidth?: number;
  accessibilityLabel?: string;
}

// `react-native-svg` is loaded lazily so a misconfigured native build doesn't
// crash the whole bundle at import time. The first render that needs it does
// the lookup; later renders memoize on the require cache.
type SvgModule = {
  Svg: React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>;
  Path: React.ComponentType<Record<string, unknown>>;
  Circle: React.ComponentType<Record<string, unknown>>;
  Rect: React.ComponentType<Record<string, unknown>>;
  Line: React.ComponentType<Record<string, unknown>>;
  Polyline: React.ComponentType<Record<string, unknown>>;
};

// Dynamic require so the package builds without react-native-svg installed.
declare const require: (id: string) => unknown;

let svgModule: SvgModule | null | undefined;
function loadSvg(): SvgModule | null {
  if (svgModule !== undefined) return svgModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    svgModule = require("react-native-svg") as SvgModule;
  } catch {
    svgModule = null;
  }
  return svgModule;
}

function resolveColor(
  color: IconProps["color"],
  themeColors: Record<keyof OmniColorTokens, string>,
): string {
  if (!color) return themeColors.text;
  if ((themeColors as Record<string, string>)[color as string] != null) {
    return (themeColors as Record<string, string>)[color as string]!;
  }
  return color as string;
}

function renderElement(svg: SvgModule, el: IconElement, key: number, props: Record<string, unknown>): React.ReactElement {
  const { Path, Circle, Rect, Line, Polyline } = svg;
  switch (el.kind) {
    case "path":
      return <Path key={key} {...props} d={el.d} fillRule={el.fillRule} clipRule={el.clipRule} />;
    case "circle":
      return <Circle key={key} {...props} cx={el.cx} cy={el.cy} r={el.r} />;
    case "rect":
      return <Rect key={key} {...props} x={el.x} y={el.y} width={el.width} height={el.height} rx={el.rx} />;
    case "line":
      return <Line key={key} {...props} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} />;
    case "polyline":
      return <Polyline key={key} {...props} points={el.points} />;
  }
}

export function Icon({ name, size = 20, color, strokeWidth = 1.75, accessibilityLabel }: IconProps) {
  const { colors } = useTheme();
  const def = getIcon(name);
  const svg = loadSvg();

  // No react-native-svg available; render a sized View placeholder so layout
  // still works while the project sets up native deps.
  if (!svg) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { View } = require("react-native") as { View: React.ComponentType<Record<string, unknown>> };
    return <View style={{ width: size, height: size }} accessibilityLabel={accessibilityLabel} />;
  }
  if (!def) {
    return <svg.Svg width={size} height={size} viewBox="0 0 24 24" />;
  }

  const resolved = resolveColor(color, colors);
  const filled = def.filled === true;
  const sharedProps: Record<string, unknown> = filled
    ? { fill: resolved }
    : {
        fill: "none",
        stroke: resolved,
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      };

  return (
    <svg.Svg
      width={size}
      height={size}
      viewBox={def.viewBox ?? "0 0 24 24"}
      accessibilityLabel={accessibilityLabel}
    >
      {def.elements.map((el, i) => renderElement(svg, el, i, sharedProps))}
    </svg.Svg>
  );
}
