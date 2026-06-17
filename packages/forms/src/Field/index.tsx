/**
 * Field. Label + helper + error wrapper around any control.
 *
 *   <Field label="Email" helper="We never share it." error={errors.email}>
 *     <Input value={email} onChange={(v) => setEmail(v)} />
 *   </Field>
 *
 * The control inherits the field's `invalid` state via React context so
 * children like Input can change their border without prop drilling.
 */
import { createContext, useContext, useId, type CSSProperties, type ReactNode } from "react";
import { useTheme } from "@omniui/styles";
import { spacing } from "@omniui/core";

interface FieldContextValue {
  id: string;
  invalid: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export function useField(): FieldContextValue | null {
  return useContext(FieldContext);
}

export interface FieldProps {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

export function Field({ label, helper, error, required, children, style }: FieldProps) {
  const { colors } = useTheme();
  const id = useId();
  const invalid = !!error;
  return (
    <FieldContext.Provider value={{ id, invalid }}>
      <div style={{ display: "flex", flexDirection: "column", gap: spacing[1], ...style }}>
        {label ? (
          <label
            htmlFor={id}
            style={{ fontSize: 13, fontWeight: 600, color: colors.text }}
          >
            {label}
            {required ? <span style={{ color: colors.statusError, marginLeft: 4 }}>*</span> : null}
          </label>
        ) : null}
        {children}
        {error ? (
          <div style={{ fontSize: 12, color: colors.statusError }}>{error}</div>
        ) : helper ? (
          <div style={{ fontSize: 12, color: colors.textMuted }}>{helper}</div>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}
