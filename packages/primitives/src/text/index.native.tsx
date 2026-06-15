/**
 * Text (native). Same prop shape, RN Text under the hood.
 */
import { forwardRef, type ForwardedRef } from "react";
import { Text as RNText, type TextStyle, type TextProps as RNTextProps } from "react-native";
import { useTheme } from "@plyxui/styles";
import type { OmniColorTokens } from "@plyxui/core";

type ThemeColorKey = keyof OmniColorTokens;

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextAlign = "start" | "center" | "end";

const sizeMap: Record<TextSize, { size: number; lineHeight: number }> = {
  xs:   { size: 11, lineHeight: 16 },
  sm:   { size: 13, lineHeight: 18 },
  md:   { size: 15, lineHeight: 22 },
  lg:   { size: 18, lineHeight: 26 },
  xl:   { size: 22, lineHeight: 30 },
  "2xl":{ size: 28, lineHeight: 36 },
  "3xl":{ size: 36, lineHeight: 44 },
};

const weightMap: Record<TextWeight, TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

const alignMap: Record<TextAlign, TextStyle["textAlign"]> = {
  start: "left",
  center: "center",
  end: "right",
};

export interface TextProps extends Omit<RNTextProps, "style"> {
  size?: TextSize;
  weight?: TextWeight;
  color?: ThemeColorKey | (string & {});
  align?: TextAlign;
  truncate?: boolean;
  style?: TextStyle;
}

function resolveColor(
  color: TextProps["color"],
  themeColors: Record<keyof OmniColorTokens, string>,
): string {
  if (!color) return themeColors.text;
  if ((themeColors as Record<string, string>)[color as string] != null) {
    return (themeColors as Record<string, string>)[color as string]!;
  }
  return color as string;
}

export const Text = forwardRef<RNText, TextProps>(function Text(
  { size = "md", weight = "regular", color, align, truncate, style, ...rest },
  ref,
) {
  const { colors } = useTheme();
  const dims = sizeMap[size];
  const computed: TextStyle = {
    fontSize: dims.size,
    lineHeight: dims.lineHeight,
    fontWeight: weightMap[weight],
    color: resolveColor(color, colors),
    ...(align ? { textAlign: alignMap[align] } : null),
    ...style,
  };
  return (
    <RNText
      ref={ref}
      numberOfLines={truncate ? 1 : rest.numberOfLines}
      style={computed}
      {...rest}
    />
  );
});
