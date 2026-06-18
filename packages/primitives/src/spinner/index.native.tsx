/**
 * Spinner (native). RN's ActivityIndicator dressed in the same prop shape.
 */
import { ActivityIndicator, type ViewStyle } from "react-native";
import { useTheme } from "@plyxui/styles";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<SpinnerSize, "small" | "large" | number> = {
  xs: 12,
  sm: "small",
  md: 20,
  lg: "large",
  xl: 40,
};

export interface SpinnerProps {
  size?: SpinnerSize | number;
  color?: string;
  thickness?: number;
  label?: string | null;
  style?: ViewStyle;
}

export function Spinner({ size = "md", color, label = "Loading", style }: SpinnerProps) {
  const { colors } = useTheme();
  const rnSize: "small" | "large" | number =
    typeof size === "number" ? size : sizeMap[size];

  return (
    <ActivityIndicator
      size={rnSize}
      color={color ?? colors.primaryOrange}
      accessibilityLabel={label ?? undefined}
      style={style}
    />
  );
}
