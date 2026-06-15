/**
 * Select (web). Native <select> with theme-aware chrome.
 *
 * The fancier popover-style version lives in @plyxui/comps Dropdown; this
 * is the form-grade equivalent for cases where native a11y + mobile UX
 * matters more than custom styling.
 */
import { forwardRef, type ChangeEvent, type CSSProperties } from "react";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
  name?: string;
  id?: string;
  style?: CSSProperties;
}

const sizeMap: Record<NonNullable<SelectProps["size"]>, { h: number; pad: number; fs: number }> = {
  sm: { h: 28, pad: spacing[2], fs: 13 },
  md: { h: 36, pad: spacing[3], fs: 14 },
  lg: { h: 44, pad: spacing[4], fs: 15 },
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { value, defaultValue, onChange, options, placeholder, disabled, invalid, size = "md", name, id, style },
  ref,
) {
  const { colors } = useTheme();
  const dim = sizeMap[size];
  return (
    <select
      ref={ref}
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value, e)}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      style={{
        height: dim.h,
        padding: `0 ${dim.pad}px`,
        background: colors.surfaceFill,
        border: `1px solid ${invalid ? colors.statusError : colors.stroke}`,
        borderRadius: radius.md,
        color: colors.text,
        fontFamily: "inherit",
        fontSize: dim.fs,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(
          colors.textMuted,
        )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `right ${dim.pad}px center`,
        paddingRight: dim.pad * 2 + 16,
        ...style,
      }}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {options.map((o) => (
        <option key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </option>
      ))}
    </select>
  );
});
