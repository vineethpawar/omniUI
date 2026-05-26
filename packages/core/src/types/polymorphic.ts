/**
 * Polymorphic component types. Based on the Radix `Slot` + react-aria pattern,
 * trimmed to what we actually use.
 *
 * Lets a primitive accept an `as` prop and forward the right HTML attrs:
 *
 * ```tsx
 * <Box as="a" href="/x" />   // href type-checks
 * <Box as="button" type="submit" />
 * ```
 *
 * On native, `as` is ignored. We mirror the API surface where it makes
 * sense; we don't pretend platforms are identical when they aren't.
 */
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
} from "react";

type AsProp<C extends ElementType> = { as?: C };

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
  C extends ElementType,
  Props = object,
> = PropsWithoutRef<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = object,
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

export type PolymorphicForwardRef<
  DefaultElement extends ElementType,
  Props,
> = <C extends ElementType = DefaultElement>(
  props: PolymorphicComponentPropsWithRef<C, Props>,
) => ReactElement | null;
