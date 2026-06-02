/**
 * Stack (web). Flex container with a `gap` that maps to the spacing scale.
 *
 *   <Stack gap={4}>...</Stack>             // 16px gap, column by default
 *   <Stack direction="row" gap={2} align="center">
 *
 * For tighter shorthands -- horizontal layout, single line, etc. -- use Flex
 * which wraps this with sensible defaults.
 */
import { forwardRef, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { spacing, type SpacingKey } from "@omniui/core";

export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

const alignMap: Record<StackAlign, CSSProperties["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};
const justifyMap: Record<StackJustify, CSSProperties["justifyContent"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

export interface StackProps {
  direction?: StackDirection;
  gap?: SpacingKey;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  inline?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = "column", gap = 0, align, justify, wrap, inline, className, style, children },
  ref,
) {
  const computed: CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexDirection: direction,
    gap: spacing[gap],
    alignItems: align ? alignMap[align] : undefined,
    justifyContent: justify ? justifyMap[justify] : undefined,
    flexWrap: wrap ? "wrap" : undefined,
    ...style,
  };
  return (
    <div ref={ref} className={className} style={computed}>
      {children}
    </div>
  );
});
