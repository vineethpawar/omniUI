/**
 * Spinner (web). Indeterminate loading indicator built on an SVG arc +
 * a CSS keyframe. Theme-colored by default, override with `color`.
 *
 *   <Spinner />
 *   <Spinner size="lg" color={colors.primaryOrange} />
 *   <Button loading={isSaving} iconLeading={<Spinner size="sm" />}>Save</Button>
 *
 * Renders an aria-label by default so the loading state is announced to
 * screen readers; pass `label={null}` to suppress when there's already a
 * visible "Loading…" text alongside.
 */
import { useTheme } from "@plyxui/styles";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
  xl: 40,
};

export interface SpinnerProps {
  size?: SpinnerSize | number;
  /** Defaults to primaryOrange. */
  color?: string;
  /** Stroke thickness as a fraction of size. Default 0.12. */
  thickness?: number;
  /** Screen-reader label. Default "Loading". Pass null to suppress. */
  label?: string | null;
  className?: string;
}

// Inject the keyframes once per page. Avoids a global stylesheet dependency.
const KEYFRAMES_ID = "plyxui-spinner-keyframes";
function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
@keyframes plyxui-spin {
  to { transform: rotate(360deg); }
}`;
  document.head.appendChild(style);
}

export function Spinner({
  size = "md",
  color,
  thickness = 0.12,
  label = "Loading",
  className,
}: SpinnerProps) {
  ensureKeyframes();
  const { colors } = useTheme();
  const px = typeof size === "number" ? size : sizeMap[size];
  const stroke = Math.max(1, Math.round(px * thickness));
  const finalColor = color ?? colors.primaryOrange;
  const r = (px - stroke) / 2;
  const c = px / 2;
  const circumference = 2 * Math.PI * r;
  // Show ~25% of the ring at any time.
  const dash = circumference * 0.25;

  return (
    <span
      role={label ? "status" : "presentation"}
      aria-label={label ?? undefined}
      className={className}
      style={{
        display: "inline-block",
        width: px,
        height: px,
        animation: "plyxui-spin 0.7s linear infinite",
        color: finalColor,
        lineHeight: 0,
      }}
    >
      <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} fill="none">
        <circle cx={c} cy={c} r={r} stroke="currentColor" strokeOpacity={0.18} strokeWidth={stroke} />
        <circle
          cx={c}
          cy={c}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${c} ${c})`}
        />
      </svg>
    </span>
  );
}
