/**
 * Button (native). Same shape, RN Pressable + Text.
 */
import { forwardRef, type ReactNode } from "react";
import { Pressable, Text as RNText, View, type ViewStyle, type TextStyle } from "react-native";
import { useTheme } from "@omniui/theme";
import { radius, spacing } from "@omniui/core";

export type ButtonVariant = "primary" | "ghost" | "link" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const sizeMap: Record<ButtonSize, { h: number; padX: number; fontSize: number }> = {
  sm: { h: 32, padX: spacing[3], fontSize: 13 },
  md: { h: 40, padX: spacing[4], fontSize: 14 },
  lg: { h: 48, padX: spacing[5], fontSize: 15 },
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
}

function variantStyles(
  variant: ButtonVariant,
  colors: { primaryOrange: string; text: string; stroke: string; statusError: string },
): { container: ViewStyle; text: TextStyle } {
  switch (variant) {
    case "primary":
      return { container: { backgroundColor: colors.primaryOrange }, text: { color: "#FFFFFF" } };
    case "ghost":
      return { container: { borderWidth: 1, borderColor: colors.stroke }, text: { color: colors.text } };
    case "link":
      return { container: {}, text: { color: colors.primaryOrange } };
    case "danger":
      return { container: { backgroundColor: colors.statusError }, text: { color: "#FFFFFF" } };
  }
}

export const Button = forwardRef<View, ButtonProps>(function Button(
  { variant = "primary", size = "md", onPress, loading, disabled, iconLeading, iconTrailing, fullWidth, children, style },
  ref,
) {
  const { colors } = useTheme();
  const dims = sizeMap[size];
  const { container, text } = variantStyles(variant, colors);

  const composed: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    height: variant === "link" ? undefined : dims.h,
    paddingHorizontal: variant === "link" ? 0 : dims.padX,
    borderRadius: variant === "link" ? 0 : radius.md,
    opacity: disabled ? 0.55 : 1,
    width: fullWidth ? "100%" : undefined,
    ...container,
    ...style,
  };

  return (
    <Pressable
      ref={ref}
      onPress={loading || disabled ? undefined : onPress}
      disabled={loading || disabled}
      style={({ pressed }) => ({
        ...composed,
        opacity: pressed && !disabled ? 0.85 : composed.opacity,
      })}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
    >
      {iconLeading}
      <RNText style={{ fontSize: dims.fontSize, fontWeight: "600", ...text }}>{children}</RNText>
      {iconTrailing}
    </Pressable>
  );
});
