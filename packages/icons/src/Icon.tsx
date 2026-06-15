/**
 * Icon (web).
 *
 * Looks the name up in the registry, renders an SVG. Stroke-based by default;
 * filled icons opt in via the IconDef.filled flag.
 *
 * Size + color come from props OR from the active theme:
 *
 *   <Icon name="home" />                          // 20px, currentColor
 *   <Icon name="home" size={28} color="text" />   // 28px, theme token
 *   <Icon name="home" size={28} color="#ff5c00" />// 28px, raw hex
 *
 * If the name isn't registered, we render an empty <svg> (no console noise --
 * the icon component fails silently because in long-lived design systems
 * you'll absolutely hit name typos in PRs and a thrown error helps no one).
 */
import { type CSSProperties } from "react";
import { useTheme } from "@plyxui/styles";
import { type OmniColorTokens } from "@plyxui/core";
import { getIcon, type IconElement, type IconName } from "./registry";

type ThemeColorKey = keyof OmniColorTokens;

export interface IconProps {
  name: IconName | (string & {});
  size?: number;
  /** Theme token name (autocomplete) or any raw CSS color string. */
  color?: ThemeColorKey | (string & {});
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  /** Defaults to true when no aria-label; pass false to keep it visible. */
  decorative?: boolean;
}

function resolveColor(
  color: IconProps["color"],
  themeColors: Record<keyof OmniColorTokens, string>,
): string {
  if (!color) return "currentColor";
  if ((themeColors as Record<string, string>)[color as string] != null) {
    return (themeColors as Record<string, string>)[color as string]!;
  }
  return color as string;
}

function renderElement(el: IconElement, key: number): JSX.Element {
  switch (el.kind) {
    case "path":
      return <path key={key} d={el.d} fillRule={el.fillRule} clipRule={el.clipRule} />;
    case "circle":
      return <circle key={key} cx={el.cx} cy={el.cy} r={el.r} />;
    case "rect":
      return <rect key={key} x={el.x} y={el.y} width={el.width} height={el.height} rx={el.rx} />;
    case "line":
      return <line key={key} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} />;
    case "polyline":
      return <polyline key={key} points={el.points} />;
  }
}

export function Icon({
  name,
  size = 20,
  color,
  strokeWidth = 1.75,
  className,
  style,
  decorative,
  ...rest
}: IconProps) {
  const { colors } = useTheme();
  const def = getIcon(name);
  const resolved = resolveColor(color, colors);
  const isDecorative = decorative ?? rest["aria-label"] == null;

  if (!def) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        style={style}
        aria-hidden={isDecorative ? true : undefined}
      />
    );
  }

  const filled = def.filled === true;
  const viewBox = def.viewBox ?? "0 0 24 24";

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      className={className}
      style={style}
      fill={filled ? resolved : "none"}
      stroke={filled ? "none" : resolved}
      strokeWidth={filled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : "img"}
      aria-label={rest["aria-label"]}
    >
      {def.elements.map(renderElement)}
    </svg>
  );
}
