/**
 * Drawer (native). RN Modal as the backdrop host, Animated slide-in panel.
 */
import { useEffect, useRef, type ReactNode } from "react";
import {
  Animated,
  Dimensions,
  Modal as RNModal,
  Pressable,
  Text as RNText,
  View,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: number;
  dismissOnBackdrop?: boolean;
}

const defaults: Record<DrawerSide, number> = { left: 320, right: 320, top: 280, bottom: 320 };

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  footer,
  size,
  dismissOnBackdrop = true,
}: DrawerProps) {
  const { colors } = useTheme();
  const dim = size ?? defaults[side];
  const offset = useRef(new Animated.Value(dim)).current;
  const win = Dimensions.get("window");

  useEffect(() => {
    Animated.timing(offset, {
      toValue: open ? 0 : dim,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [open, offset, dim]);

  const transform: ViewStyle["transform"] =
    side === "right"
      ? [{ translateX: offset }]
      : side === "left"
        ? [{ translateX: Animated.multiply(offset, -1) as unknown as number }]
        : side === "bottom"
          ? [{ translateY: offset }]
          : [{ translateY: Animated.multiply(offset, -1) as unknown as number }];

  const isHorizontal = side === "left" || side === "right";

  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={() => dismissOnBackdrop && onClose()}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
      >
        <Animated.View
          // stop touches from bubbling to the backdrop
          onStartShouldSetResponder={() => true}
          style={{
            position: "absolute",
            backgroundColor: colors.surfaceFill,
            transform,
            ...(isHorizontal
              ? {
                  top: 0,
                  bottom: 0,
                  width: dim,
                  ...(side === "right" ? { right: 0 } : { left: 0 }),
                  ...(side === "right"
                    ? { borderTopLeftRadius: radius.lg, borderBottomLeftRadius: radius.lg }
                    : { borderTopRightRadius: radius.lg, borderBottomRightRadius: radius.lg }),
                }
              : {
                  left: 0,
                  right: 0,
                  height: dim,
                  ...(side === "bottom" ? { bottom: 0 } : { top: 0 }),
                  ...(side === "bottom"
                    ? { borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg }
                    : { borderBottomLeftRadius: radius.lg, borderBottomRightRadius: radius.lg }),
                }),
          }}
        >
          {title ? (
            <View
              style={{
                paddingHorizontal: spacing[5],
                paddingVertical: spacing[4],
                borderBottomWidth: 1,
                borderBottomColor: colors.stroke,
              }}
            >
              <RNText style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>
                {title}
              </RNText>
            </View>
          ) : null}
          <View style={{ flex: 1, padding: spacing[5] }}>{children}</View>
          {footer ? (
            <View
              style={{
                paddingHorizontal: spacing[5],
                paddingVertical: spacing[3],
                borderTopWidth: 1,
                borderTopColor: colors.stroke,
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: spacing[2],
              }}
            >
              {footer}
            </View>
          ) : null}
        </Animated.View>
      </Pressable>
    </RNModal>
  );
}
