/**
 * Toaster (native). Renders the queue from `useToast()` in a corner stack.
 * Same contract as web; uses RN Animated for the enter/exit transition.
 */
import { useEffect, useRef } from "react";
import { Animated, Pressable, Text as RNText, View, type ViewStyle } from "react-native";
import { useToast, type ToastItem, type ToastVariant } from "@plyxui/hooks";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export type ToasterPosition = "top" | "bottom";

export interface ToasterProps {
  position?: ToasterPosition;
  offset?: number;
  max?: number;
  accent?: Partial<Record<ToastVariant, string>>;
}

export function Toaster({ position = "bottom", offset = 24, max = 5, accent }: ToasterProps) {
  const { toasts } = useToast();
  const visible = toasts.slice(-max);

  const containerStyle: ViewStyle = {
    position: "absolute",
    left: spacing[4],
    right: spacing[4],
    flexDirection: position === "bottom" ? "column-reverse" : "column",
    gap: spacing[2],
    ...(position === "bottom" ? { bottom: offset } : { top: offset }),
  };

  return (
    <View pointerEvents="box-none" style={containerStyle}>
      {visible.map((t: ToastItem) => (
        <ToastCard key={t.id} item={t} accent={accent} />
      ))}
    </View>
  );
}

function ToastCard({
  item,
  accent,
}: {
  item: ToastItem;
  accent?: Partial<Record<ToastVariant, string>>;
}) {
  const { colors } = useTheme();
  const { dismiss } = useToast();
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(translate, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [opacity, translate]);

  const variant = item.variant ?? "default";
  const fallback: Record<ToastVariant, string> = {
    default: colors.primaryOrange,
    success: colors.statusSuccess,
    warning: colors.statusWarning,
    error: colors.statusError,
  };
  const accentColor = accent?.[variant] ?? fallback[variant];

  return (
    <Animated.View
      accessibilityRole="alert"
      style={{
        opacity,
        transform: [{ translateY: translate }],
        backgroundColor: colors.surfaceFill,
        borderLeftWidth: 3,
        borderLeftColor: accentColor,
        borderRadius: radius.md,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
      }}
    >
      {item.title ? (
        <RNText style={{ color: colors.text, fontSize: 14, fontWeight: "600" }}>
          {item.title}
        </RNText>
      ) : null}
      {item.description ? (
        <RNText style={{ color: colors.textMuted, fontSize: 13, marginTop: 2 }}>
          {item.description}
        </RNText>
      ) : null}
      <Pressable
        onPress={() => dismiss(item.id)}
        hitSlop={8}
        accessibilityLabel="Dismiss"
        style={{ position: "absolute", top: 6, right: 8, padding: 4 }}
      >
        <RNText style={{ color: colors.textMuted, fontSize: 16, lineHeight: 16 }}>x</RNText>
      </Pressable>
    </Animated.View>
  );
}
