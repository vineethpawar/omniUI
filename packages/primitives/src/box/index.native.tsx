/**
 * Box (React Native).
 *
 * Always renders a `<View>`. The `as` prop from the web variant exists in
 * the type for API parity but is ignored at runtime. Variants resolve to
 * StyleSheet entries instead of className.
 */
import { forwardRef, type Ref } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { radius as radiusTokens, spacing } from "@plyxui/core";
import { useTheme } from "@plyxui/styles";
import type { BoxVariants } from "./config";

export interface BoxProps extends BoxVariants {
  style?: ViewStyle;
  children?: React.ReactNode;
  /** Web parity only. Ignored on native. */
  as?: unknown;
}

const padMap: Record<NonNullable<BoxVariants["padding"]>, number> = {
  none: 0,
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
};

const radiusMap: Record<NonNullable<BoxVariants["radius"]>, number> = {
  none: 0,
  sm: radiusTokens.sm,
  md: radiusTokens.md,
  lg: radiusTokens.lg,
  pill: radiusTokens.pill,
};

export const Box = forwardRef<View, BoxProps>(function Box(
  { surface = "none", padding = "none", radius = "none", style, children },
  ref: Ref<View>,
) {
  const { colors } = useTheme();

  const surfaceStyle: ViewStyle =
    surface === "primary"
      ? { backgroundColor: colors.primaryFill }
      : surface === "raised"
        ? { backgroundColor: colors.surfaceFill }
        : surface === "sunken"
          ? { backgroundColor: colors.containerFill }
          : {};

  return (
    <View
      ref={ref}
      style={StyleSheet.flatten([
        surfaceStyle,
        { padding: padMap[padding], borderRadius: radiusMap[radius] },
        style,
      ])}
    >
      {children}
    </View>
  );
});
