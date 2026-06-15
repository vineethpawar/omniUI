/**
 * Stack (native). Same prop shape, RN View under the hood.
 *
 * `gap` is supported natively on RN 0.71+; we use it directly.
 */
import { forwardRef, type ReactNode } from "react";
import { View, type ViewStyle, type ViewProps } from "react-native";
import { spacing, type SpacingKey } from "@omniui/core";

export type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

const alignMap: Record<StackAlign, ViewStyle["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};
const justifyMap: Record<StackJustify, ViewStyle["justifyContent"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

export interface StackProps extends Omit<ViewProps, "style"> {
  direction?: StackDirection;
  gap?: SpacingKey;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  style?: ViewStyle;
  children?: ReactNode;
}

export const Stack = forwardRef<View, StackProps>(function Stack(
  { direction = "column", gap = 0, align, justify, wrap, style, children, ...rest },
  ref,
) {
  const computed: ViewStyle = {
    flexDirection: direction,
    gap: spacing[gap],
    ...(align ? { alignItems: alignMap[align] } : null),
    ...(justify ? { justifyContent: justifyMap[justify] } : null),
    ...(wrap ? { flexWrap: "wrap" } : null),
    ...style,
  };
  return (
    <View ref={ref} style={computed} {...rest}>
      {children}
    </View>
  );
});
