/**
 * Button (web). Variants: primary, ghost, link, danger. Size + iconLeading/Trailing.
 *
 * Renders as a native <button>; if you need a navigation link, pass `as="a"`.
 */
import { forwardRef, type ElementType, type CSSProperties, type ForwardedRef } from "react";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";
import type { PolymorphicComponentPropsWithRef } from "@plyxui/core";

export type ButtonVariant = "primary" | "ghost" | "link" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const sizeMap: Record<ButtonSize, { h: number; padX: number; fontSize: number }> = {
  sm: { h: 28, padX: spacing[3], fontSize: 13 },
  md: { h: 36, padX: spacing[4], fontSize: 14 },
  lg: { h: 44, padX: spacing[5], fontSize: 15 },
};

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export type ButtonProps<C extends ElementType = "button"> = PolymorphicComponentPropsWithRef<
  C,
  ButtonOwnProps
>;

function variantStyle(
  variant: ButtonVariant,
  colors: { primaryOrange: string; surfaceFill: string; text: string; stroke: string; statusError: string },
): CSSProperties {
  switch (variant) {
    case "primary":
      return { background: colors.primaryOrange, color: "#FFFFFF", border: "1px solid transparent" };
    case "ghost":
      return { background: "transparent", color: colors.text, border: `1px solid ${colors.stroke}` };
    case "link":
      return { background: "transparent", color: colors.primaryOrange, border: "1px solid transparent", padding: 0, height: "auto" };
    case "danger":
      return { background: colors.statusError, color: "#FFFFFF", border: "1px solid transparent" };
  }
}

function ButtonImpl<C extends ElementType = "button">(
  {
    as,
    variant = "primary",
    size = "md",
    loading,
    disabled,
    iconLeading,
    iconTrailing,
    fullWidth,
    className,
    style,
    children,
    ...rest
  }: ButtonProps<C>,
  ref: ForwardedRef<Element>,
) {
  const Component = (as ?? "button") as ElementType;
  const { colors } = useTheme();
  const dims = sizeMap[size];
  const computed: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    height: variant === "link" ? "auto" : dims.h,
    padding: variant === "link" ? 0 : `0 ${dims.padX}px`,
    fontSize: dims.fontSize,
    fontWeight: 600,
    fontFamily: "inherit",
    borderRadius: variant === "link" ? 0 : radius.md,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    width: fullWidth ? "100%" : undefined,
    transition: "filter 0.15s ease, transform 0.05s ease, background 0.15s ease",
    ...variantStyle(variant, colors),
    ...style,
  };
  return (
    <Component
      ref={ref}
      className={className}
      style={computed}
      disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {iconLeading}
      {children}
      {iconTrailing}
    </Component>
  );
}

export const Button = forwardRef(ButtonImpl) as <C extends ElementType = "button">(
  props: ButtonProps<C>,
) => React.ReactElement | null;
