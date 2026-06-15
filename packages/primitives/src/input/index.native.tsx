/**
 * Input (native). Matches the web shape; uses TextInput.
 */
import { forwardRef, useState } from "react";
import { TextInput, View, type TextInputProps, type ViewStyle } from "react-native";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export type InputSize = "sm" | "md" | "lg";

const sizeMap: Record<InputSize, { h: number; fontSize: number; padX: number }> = {
  sm: { h: 32, fontSize: 13, padX: spacing[2] },
  md: { h: 40, fontSize: 14, padX: spacing[3] },
  lg: { h: 48, fontSize: 16, padX: spacing[4] },
};

export interface InputProps extends Omit<TextInputProps, "style"> {
  value?: string;
  onChange?: (value: string) => void;
  size?: InputSize;
  invalid?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  style?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { value, onChange, size = "md", invalid, leading, trailing, style, defaultValue, ...rest },
  ref,
) {
  const { colors } = useTheme();
  const [internal, setInternal] = useState<string>(defaultValue ?? "");
  const current = value ?? internal;
  const dims = sizeMap[size];

  const wrap: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    height: dims.h,
    paddingLeft: leading ? spacing[2] : dims.padX,
    paddingRight: trailing ? spacing[2] : dims.padX,
    backgroundColor: colors.surfaceFill,
    borderWidth: 1,
    borderColor: invalid ? colors.statusError : colors.stroke,
    borderRadius: radius.md,
    ...style,
  };

  return (
    <View style={wrap}>
      {leading}
      <TextInput
        ref={ref}
        value={current}
        onChangeText={(t) => {
          if (value === undefined) setInternal(t);
          onChange?.(t);
        }}
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          color: colors.text,
          fontSize: dims.fontSize,
          padding: 0,
        }}
        placeholderTextColor={colors.textMuted}
        {...rest}
      />
      {trailing}
    </View>
  );
});
