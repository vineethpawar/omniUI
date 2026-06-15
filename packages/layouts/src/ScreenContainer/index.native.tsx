import type { ReactNode } from "react";
import { ScrollView, View, type ViewStyle } from "react-native";
import { useTheme } from "@plyxui/styles";
import { spacing } from "@plyxui/core";

export interface ScreenContainerProps {
  children: ReactNode;
  padX?: 0 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  padY?: 0 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  style?: ViewStyle;
  scrollable?: boolean;
}

export function ScreenContainer({ children, padX = 4, padY = 4, style, scrollable = true }: ScreenContainerProps) {
  const { colors } = useTheme();
  const padding: ViewStyle = {
    paddingHorizontal: spacing[padX],
    paddingVertical: spacing[padY],
  };
  if (scrollable) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.primaryFill }} contentContainerStyle={{ ...padding, ...style }}>
        {children}
      </ScrollView>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryFill, ...padding, ...style }}>{children}</View>
  );
}
