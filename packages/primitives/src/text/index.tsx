/**
 * Text (web).
 *
 * Sized via a small scale: xs / sm / md / lg / xl. Weight via the
 * same enum we use on RN. Color resolves the same way Icon does --
 * theme token name (autocomplete) or a raw color.
 */
import { forwardRef, type ElementType, type ForwardedRef, type CSSProperties } from "react";
import { useTheme } from "@omniui/styles";
import type { OmniColorTokens, PolymorphicComponentPropsWithRef } from "@omniui/core";

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

const weightMap: Record<TextWeight, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

type TextOwnProps = {
  size?: TextSize;
  weight?: TextWeight;
  color?: ThemeColorKey | (string & {});
  align?: TextAlign;
  truncate?: boolean;
  className?: string;
  style?: CSSProperties;
};

export type TextProps<C extends ElementType = "span"> = PolymorphicComponentPropsWithRef<
  C,
  TextOwnProps
>;

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

function TextImpl<C extends ElementType = "span">(
  { as, size = "md", weight = "regular", color, align, truncate, className, style, children, ...rest }: TextProps<C>,
  ref: ForwardedRef<Element>,
) {
  const Component = (as ?? "span") as ElementType;
  const { colors } = useTheme();
  const dims = sizeMap[size];
  const computed: CSSProperties = {
    fontSize: dims.size,
    lineHeight: `${dims.lineHeight}px`,
    fontWeight: weightMap[weight],
    color: resolveColor(color, colors),
    textAlign: align ?? undefined,
    ...(truncate
      ? { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }
      : null),
    ...style,
  };
  return (
    <Component ref={ref} className={className} style={computed} {...rest}>
      {children}
    </Component>
  );
}

export const Text = forwardRef(TextImpl) as <C extends ElementType = "span">(
  props: TextProps<C>,
) => React.ReactElement | null;
