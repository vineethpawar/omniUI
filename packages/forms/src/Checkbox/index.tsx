/**
 * Checkbox (web). Native input under the hood, custom box on top.
 */
import { forwardRef, type CSSProperties, type ChangeEvent } from "react";
import { useTheme } from "@plyxui/styles";
import { spacing, radius } from "@plyxui/core";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  name?: string;
  value?: string;
  size?: "sm" | "md";
  style?: CSSProperties;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, defaultChecked, onChange, disabled, label, name, value, size = "md", style },
  ref,
) {
  const { colors } = useTheme();
  const dim = size === "sm" ? 14 : 16;
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing[2],
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          width: dim,
          height: dim,
          borderRadius: radius.sm,
          border: `1px solid ${colors.stroke}`,
          background: checked ? colors.primaryOrange : colors.surfaceFill,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, border-color 0.15s",
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.checked, e)}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "inherit",
            margin: 0,
          }}
        />
        {checked ? (
          <svg width={dim - 4} height={dim - 4} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polyline
              points="20 6 9 17 4 12"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ) : null}
      </span>
      {label ? (
        <span style={{ fontSize: 14, color: colors.text }}>{label}</span>
      ) : null}
    </label>
  );
});
