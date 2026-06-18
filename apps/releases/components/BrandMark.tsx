/**
 * BrandMark. The 3x3 dot matrix with one accent dot.
 * Used wherever the omniUI logo needs to render inline (Header, Sidebar,
 * footer, social previews). Defaults to currentColor for the muted dots
 * so the logo picks up the surrounding text color on light + dark.
 */
import type { CSSProperties } from "react";

export interface BrandMarkProps {
  size?: number;
  accent?: string;
  /** Color for the eight non-accent dots. Default currentColor. */
  base?: string;
  style?: CSSProperties;
}

export function BrandMark({ size = 22, accent = "#FF5C00", base, style }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="omniUI"
      style={{ flexShrink: 0, color: base ?? "currentColor", ...style }}
    >
      <g fill={base ?? "currentColor"}>
        <circle cx="40" cy="40" r="6" />
        <circle cx="60" cy="40" r="6" />
        <circle cx="80" cy="40" r="6" />
        <circle cx="40" cy="60" r="6" />
        <circle cx="80" cy="60" r="6" />
        <circle cx="40" cy="80" r="6" />
        <circle cx="60" cy="80" r="6" />
        <circle cx="80" cy="80" r="6" />
      </g>
      <circle cx="60" cy="60" r="6" fill={accent} />
    </svg>
  );
}
