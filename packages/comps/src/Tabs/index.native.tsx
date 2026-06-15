/**
 * Tabs (native). Same composition shape, RN Pressable + View.
 */
import { createContext, useContext, useId, type ReactNode } from "react";
import { Pressable, ScrollView, Text as RNText, View, type ViewStyle } from "react-native";
import { useTheme } from "@plyxui/styles";
import { spacing } from "@plyxui/core";

interface TabsContextValue {
  value: string;
  onChange: (next: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab / TabList / TabPanel must be inside <Tabs>");
  return ctx;
};

export interface TabsProps {
  value: string;
  onChange: (next: string) => void;
  children: ReactNode;
  style?: ViewStyle;
}

export function Tabs({ value, onChange, children, style }: TabsProps) {
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ value, onChange, baseId }}>
      <View style={style}>{children}</View>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: ReactNode;
  /** Horizontal scroll the tab row if it overflows the screen. Default true. */
  scrollable?: boolean;
  style?: ViewStyle;
}

export function TabList({ children, scrollable = true, style }: TabListProps) {
  const { colors } = useTheme();
  const row = (
    <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.stroke, ...style }}>
      {children}
    </View>
  );
  return scrollable ? <ScrollView horizontal showsHorizontalScrollIndicator={false}>{row}</ScrollView> : row;
}

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export function Tab({ value, children, disabled }: TabProps) {
  const { value: active, onChange } = useTabs();
  const { colors } = useTheme();
  const isActive = active === value;
  return (
    <Pressable
      onPress={() => !disabled && onChange(value)}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: !!disabled }}
      style={({ pressed }: { pressed: boolean }) => ({
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        borderBottomWidth: 2,
        borderBottomColor: isActive ? colors.primaryOrange : "transparent",
        marginBottom: -1,
        opacity: disabled ? 0.55 : pressed ? 0.7 : 1,
      })}
    >
      <RNText
        style={{
          color: isActive ? colors.text : colors.textMuted,
          fontSize: 14,
          fontWeight: isActive ? "600" : "500",
        }}
      >
        {children}
      </RNText>
    </Pressable>
  );
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  keepMounted?: boolean;
  style?: ViewStyle;
}

export function TabPanel({ value, children, keepMounted, style }: TabPanelProps) {
  const { value: active } = useTabs();
  const isActive = active === value;
  if (!isActive && !keepMounted) return null;
  return (
    <View accessibilityRole="none" style={{ paddingTop: spacing[4], display: isActive ? "flex" : "none", ...style }}>
      {children}
    </View>
  );
}
