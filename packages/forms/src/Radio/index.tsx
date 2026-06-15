/**
 * Radio + RadioGroup (web).
 *
 *   <RadioGroup value={mode} onChange={setMode}>
 *     <Radio value="light" label="Light" />
 *     <Radio value="dark" label="Dark" />
 *   </RadioGroup>
 */
import {
  createContext,
  useContext,
  useId,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useTheme } from "@plyxui/styles";
import { spacing } from "@plyxui/core";

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  direction?: "row" | "column";
  children: ReactNode;
  style?: CSSProperties;
}

export function RadioGroup({
  value,
  onChange,
  name,
  disabled = false,
  direction = "column",
  children,
  style,
}: RadioGroupProps) {
  const fallbackName = useId();
  return (
    <RadioGroupContext.Provider
      value={{ name: name ?? fallbackName, value, onChange, disabled }}
    >
      <div
        role="radiogroup"
        style={{
          display: "flex",
          flexDirection: direction,
          gap: direction === "row" ? spacing[4] : spacing[2],
          ...style,
        }}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export function Radio({ value, label, disabled }: RadioProps) {
  const { colors } = useTheme();
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("<Radio /> must be inside <RadioGroup />");
  }
  const checked = ctx.value === value;
  const isDisabled = disabled || ctx.disabled;
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing[2],
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.55 : 1,
      }}
    >
      <span
        style={{
          position: "relative",
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: `1px solid ${checked ? colors.primaryOrange : colors.stroke}`,
          background: colors.surfaceFill,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.15s",
        }}
      >
        <input
          type="radio"
          name={ctx.name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={() => ctx.onChange(value)}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "inherit",
            margin: 0,
          }}
        />
        {checked ? (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.primaryOrange,
            }}
          />
        ) : null}
      </span>
      {label ? <span style={{ fontSize: 14, color: colors.text }}>{label}</span> : null}
    </label>
  );
}
