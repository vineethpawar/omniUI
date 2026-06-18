/**
 * Divider (native). RN View with a border.
 */
import type { ReactNode } from "react";
import { Text as RNText, View, type ViewStyle } from "react-native";
import { useTheme } from "@plyxui/styles";
import { spacing } from "@plyxui/core";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  inset?: number;
  color?: string;
  thickness?: number;
  style?: ViewStyle;
}

export function Divider({
  orientation = "horizontal",
  label,
  inset = 0,
  color,
  thickness = 1,
  style,
}: DividerProps) {
  const { colors } = useTheme();
  const lineColor = color ?? colors.stroke;

  if (orientation === "vertical") {
    return (
      <View
        accessibilityRole="none"
        style={{
          alignSelf: "stretch",
          width: thickness,
          backgroundColor: lineColor,
          marginVertical: inset,
          ...style,
        }}
      />
    );
  }

  if (label) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[3],
          marginHorizontal: inset,
          ...style,
        }}
      >
        <View style={{ flex: 1, height: thickness, backgroundColor: lineColor }} />
        {typeof label === "string" ? (
          <RNText style={{ color: colors.textMuted, fontSize: 12, fontWeight: "500" }}>
            {label}
          </RNText>
        ) : (
          label
        )}
        <View style={{ flex: 1, height: thickness, backgroundColor: lineColor }} />
      </View>
    );
  }

  return (
    <View
      style={{
        height: thickness,
        backgroundColor: lineColor,
        marginHorizontal: inset,
        ...style,
      }}
    />
  );
}
