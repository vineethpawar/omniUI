/**
 * Flex (web). Stack with `direction="row"` baked in.
 *
 *   <Flex gap={2} align="center">...</Flex>
 *
 * Trivial wrapper, but I find myself reaching for `<Flex>` constantly
 * and `<Stack direction="row">` reads worse.
 */
import { forwardRef, type ForwardedRef } from "react";
import { Stack, type StackProps } from "../stack";

export interface FlexProps extends Omit<StackProps, "direction"> {
  reverse?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { reverse, ...rest },
  ref,
) {
  return <Stack ref={ref} direction={reverse ? "row-reverse" : "row"} {...rest} />;
});
