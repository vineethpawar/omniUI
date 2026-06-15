/**
 * BrandMark. The 3x3 dot matrix with one accent dot.
 * Used wherever the plyxui logo renders inline (Header, Sidebar, footer).
 * Defaults to currentColor for the eight muted dots so the logo picks up
 * the surrounding text color on light + dark.
 */
import type { CSSProperties } from "react";

export interface BrandMarkProps {
  size?: number;
  accent?: string;
  /** Color for the eight non-accent dots. Default currentColor. */
  base?: string;
  style?: CSSProperties;
}

export function BrandMark({ size = 28, accent = "#FF5C00", base, style }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="plyxui"
      style={{ flexShrink: 0, color: base ?? "currentColor", display: "block", ...style }}
    >
      <g fill={base ?? "currentColor"}>
        <circle cx="5"  cy="5"  r="2.4" />
        <circle cx="12" cy="5"  r="2.4" />
        <circle cx="19" cy="5"  r="2.4" />
        <circle cx="5"  cy="12" r="2.4" />
        <circle cx="19" cy="12" r="2.4" />
        <circle cx="5"  cy="19" r="2.4" />
        <circle cx="12" cy="19" r="2.4" />
        <circle cx="19" cy="19" r="2.4" />
      </g>
      <circle cx="12" cy="12" r="2.4" fill={accent} />
    </svg>
  );
}
