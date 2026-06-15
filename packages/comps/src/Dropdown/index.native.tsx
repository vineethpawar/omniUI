/**
 * Dropdown (native). Native picker UX varies wildly per platform; we ship
 * a minimal bottom-sheet-style picker that doesn't pretend to match iOS
 * or Android's native pickers. Replace with a native-only variant once
 * we wire up a per-platform implementation.
 */
import { useState } from "react";
import { Modal, Pressable, Text as RNText, View } from "react-native";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export interface DropdownOption<T extends string = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface DropdownProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  placeholder?: string;
  disabled?: boolean;
}

export function Dropdown<T extends string = string>({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled,
}: DropdownProps<T>) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        style={{
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[2],
          backgroundColor: colors.surfaceFill,
          borderWidth: 1,
          borderColor: colors.stroke,
          borderRadius: radius.md,
          opacity: disabled ? 0.55 : 1,
        }}
      >
        <RNText style={{ color: selected ? colors.text : colors.textMuted, fontSize: 14 }}>
          {selected?.label ?? placeholder}
        </RNText>
      </Pressable>
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}
          onPress={() => setOpen(false)}
        >
          <View style={{ backgroundColor: colors.surfaceFill, padding: spacing[4], borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg }}>
            {options.map((o) => (
              <Pressable
                key={o.value}
                onPress={() => {
                  if (o.disabled) return;
                  onChange(o.value);
                  setOpen(false);
                }}
                style={{
                  paddingVertical: spacing[3],
                  borderBottomWidth: 1,
                  borderBottomColor: colors.stroke,
                  opacity: o.disabled ? 0.5 : 1,
                }}
              >
                <RNText style={{ color: colors.text, fontSize: 16, fontWeight: o.value === value ? "600" : "400" }}>
                  {o.label}
                </RNText>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
