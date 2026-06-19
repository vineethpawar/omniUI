import { forwardRef } from "react";
import { View } from "react-native";
import { Stack, type StackProps } from "../stack/index.native";

export interface FlexProps extends Omit<StackProps, "direction"> {
  reverse?: boolean;
}

export const Flex = forwardRef<View, FlexProps>(function Flex({ reverse, ...rest }, ref) {
  return <Stack ref={ref} direction={reverse ? "row-reverse" : "row"} {...rest} />;
});
