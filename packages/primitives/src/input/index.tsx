/**
 * Input (web). Single-line text input with built-in theme styling and a
 * size scale that matches the Button + Text primitives.
 *
 * Controlled and uncontrolled both work. We deliberately don't bundle a
 * Field wrapper here -- that lives in layouts because the label + helper
 * positioning is design-system-specific.
 */
import { forwardRef, useState, type ChangeEvent, type CSSProperties } from "react";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export type InputSize = "sm" | "md" | "lg";

const sizeMap: Record<InputSize, { h: number; fontSize: number; padX: number }> = {
  sm: { h: 28, fontSize: 13, padX: spacing[2] },
  md: { h: 36, fontSize: 14, padX: spacing[3] },
  lg: { h: 44, fontSize: 16, padX: spacing[4] },
};

export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: InputSize;
  invalid?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  className?: string;
  style?: CSSProperties;
  /** Optional left ornament -- typically an Icon. */
  leading?: React.ReactNode;
  /** Optional right ornament. */
  trailing?: React.ReactNode;
  autoFocus?: boolean;
  id?: string;
  name?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  "aria-label"?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    value,
    defaultValue,
    onChange,
    placeholder,
    size = "md",
    invalid,
    disabled,
    type = "text",
    className,
    style,
    leading,
    trailing,
    autoFocus,
    id,
    name,
    inputMode,
    ...aria
  },
  ref,
) {
  const { colors } = useTheme();
  const [internal, setInternal] = useState<string>(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const dims = sizeMap[size];

  const wrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    height: dims.h,
    paddingLeft: leading ? spacing[2] : dims.padX,
    paddingRight: trailing ? spacing[2] : dims.padX,
    background: colors.surfaceFill,
    border: `1px solid ${invalid ? colors.statusError : colors.stroke}`,
    borderRadius: radius.md,
    color: colors.text,
    opacity: disabled ? 0.55 : 1,
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    ...style,
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: colors.text,
    fontSize: dims.fontSize,
    fontFamily: "inherit",
    padding: 0,
  };

  return (
    <div className={className} style={wrapStyle}>
      {leading}
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={current}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.value);
          onChange?.(e.target.value, e);
        }}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        inputMode={inputMode}
        aria-invalid={invalid || undefined}
        aria-label={aria["aria-label"]}
        style={inputStyle}
      />
      {trailing}
    </div>
  );
});
