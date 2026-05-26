/**
 * Box (web).
 *
 * The single most-used primitive. Polymorphic: renders any HTML element
 * via the `as` prop while preserving the element's native attribute types.
 *
 * ```tsx
 * <Box as="a" href="/x" surface="raised" padding="md">Link</Box>
 * <Box as="button" type="submit" surface="primary">Submit</Box>
 * ```
 *
 * The matching `index.native.tsx` always renders a `<View>` (RN has no
 * polymorphism story worth simulating). `as` is silently ignored on native.
 *
 * Variants resolve via cva for type-safe className output AND via inline
 * styles from the active theme so the primitive works without a stylesheet.
 * Classes are kept as override hooks for consumers who want their own CSS.
 */
import { forwardRef, type ElementType, type ForwardedRef, type CSSProperties } from "react";
import type { PolymorphicComponentPropsWithRef } from "@omniui/core";
import { radius as radiusTokens, spacing } from "@omniui/core";
import { useTheme } from "@omniui/theme";
import { boxConfig, type BoxVariants } from "./config";

type BoxOwnProps = BoxVariants & {
  className?: string;
  style?: CSSProperties;
};

export type BoxProps<C extends ElementType = "div"> = PolymorphicComponentPropsWithRef<
  C,
  BoxOwnProps
>;

function joinClass(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ");
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

function BoxImpl<C extends ElementType = "div">(
  { as, className, style, surface, padding, radius, children, ...rest }: BoxProps<C>,
  ref: ForwardedRef<Element>,
) {
  const Component = (as ?? "div") as ElementType;
  const { colors } = useTheme();
  const variantClass = boxConfig({ surface, padding, radius });

  const surfaceColor =
    surface === "primary"
      ? colors.primaryFill
      : surface === "raised"
        ? colors.surfaceFill
        : surface === "sunken"
          ? colors.containerFill
          : undefined;

  const computed: CSSProperties = {
    boxSizing: "border-box",
    padding: padMap[padding ?? "none"],
    borderRadius: radiusMap[radius ?? "none"],
    ...(surfaceColor ? { backgroundColor: surfaceColor } : null),
    ...style,
  };

  return (
    <Component ref={ref} className={joinClass(variantClass, className)} style={computed} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Forwarded-ref + polymorphic Box.
 *
 * NOTE: React's forwardRef erases polymorphic generics, so the cast below
 * is intentional. The exported type carries the generics; runtime is unchanged.
 */
export const Box = forwardRef(BoxImpl) as <C extends ElementType = "div">(
  props: BoxProps<C>,
) => React.ReactElement | null;
