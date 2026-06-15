/**
 * AppShell (native). No sidebar slot on native; we tab-bar instead, but
 * that pattern lives in the navigator. This component just lays out
 * header + body + footer for screens that want a chrome.
 */
import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";
import { useTheme } from "@omniui/theme";

export interface AppShellProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  style?: ViewStyle;
}

export function AppShell({ header, footer, children, style }: AppShellProps) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryFill, ...style }}>
      {header}
      <View style={{ flex: 1 }}>{children}</View>
      {footer}
    </View>
  );
}
