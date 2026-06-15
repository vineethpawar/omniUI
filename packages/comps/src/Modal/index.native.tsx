import { type ReactNode } from "react";
import { Modal as RNModal, View, TouchableOpacity, type ViewStyle } from "react-native";
import { useTheme } from "@omniui/theme";
import { radius, spacing } from "@omniui/core";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  dismissOnBackdrop?: boolean;
}

export function Modal({ open, onClose, title, description, children, footer, dismissOnBackdrop = true }: ModalProps) {
  const { colors } = useTheme();
  const sheet: ViewStyle = {
    backgroundColor: colors.surfaceFill,
    borderRadius: radius.lg,
    margin: spacing[5],
    padding: spacing[4],
  };
  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={dismissOnBackdrop ? onClose : undefined}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <View style={sheet} onStartShouldSetResponder={() => true}>
          {title ? <View style={{ marginBottom: spacing[3] }}>{title}</View> : null}
          {description ? <View style={{ marginBottom: spacing[3] }}>{description}</View> : null}
          {children}
          {footer ? <View style={{ marginTop: spacing[4] }}>{footer}</View> : null}
        </View>
      </TouchableOpacity>
    </RNModal>
  );
}
