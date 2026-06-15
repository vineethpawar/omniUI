/**
 * Dropdown (web). Headless select-ish thing. Renders a trigger that opens
 * a positioned menu of options. Keyboard support: ArrowDown/Up to move,
 * Enter to commit, Escape to dismiss.
 *
 *   <Dropdown
 *     value={value}
 *     onChange={setValue}
 *     options={[{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }]}
 *   />
 *
 * Mid-fidelity for now -- we'll back this with floating-ui once we add the
 * Tooltip dep. Until then, the menu sits directly under the trigger with
 * a fixed offset and zero overflow handling. Good enough for the docs.
 */
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@omniui/styles";
import { Icon } from "@omniui/icons";
import { radius, spacing } from "@omniui/core";

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
  size?: "sm" | "md" | "lg";
  /** Width override -- by default the trigger sizes to its content. */
  width?: number | string;
}

const sizeMap: Record<NonNullable<DropdownProps["size"]>, { h: number; padX: number; fontSize: number }> = {
  sm: { h: 28, padX: spacing[3], fontSize: 13 },
  md: { h: 36, padX: spacing[4], fontSize: 14 },
  lg: { h: 44, padX: spacing[5], fontSize: 15 },
};

export function Dropdown<T extends string = string>({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled,
  size = "md",
  width,
}: DropdownProps<T>) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number>(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dims = sizeMap[size];
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowDown") setHovered((h) => Math.min(options.length - 1, h + 1));
      else if (e.key === "ArrowUp") setHovered((h) => Math.max(0, h - 1));
      else if (e.key === "Enter" && hovered >= 0) {
        const opt = options[hovered];
        if (opt && !opt.disabled) {
          onChange(opt.value);
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", key);
    };
  }, [open, hovered, options, onChange]);

  return (
    <div ref={wrapRef} style={{ position: "relative", width, display: width ? "block" : "inline-block" }}>
      <button
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: spacing[2],
          height: dims.h,
          padding: `0 ${dims.padX}px`,
          background: colors.surfaceFill,
          border: `1px solid ${colors.stroke}`,
          borderRadius: radius.md,
          color: selected ? colors.text : colors.textMuted,
          fontSize: dims.fontSize,
          fontFamily: "inherit",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.55 : 1,
          minWidth: 120,
          width: width ?? undefined,
          justifyContent: "space-between",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected?.label ?? placeholder}
        </span>
        <Icon name="chevronDown" size={16} color="textMuted" />
      </button>
      {open ? (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: `calc(100% + 4px)`,
            left: 0,
            minWidth: "100%",
            background: colors.surfaceFill,
            border: `1px solid ${colors.stroke}`,
            borderRadius: radius.md,
            boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
            padding: spacing[1],
            zIndex: 100,
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            const isHovered = i === hovered;
            return (
              <div
                key={o.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHovered(i)}
                onClick={() => {
                  if (o.disabled) return;
                  onChange(o.value);
                  setOpen(false);
                }}
                style={{
                  padding: `${spacing[2]}px ${spacing[3]}px`,
                  borderRadius: radius.sm,
                  cursor: o.disabled ? "not-allowed" : "pointer",
                  fontSize: dims.fontSize,
                  color: o.disabled ? colors.textMuted : colors.text,
                  background: isHovered ? colors.containerFill : "transparent",
                  fontWeight: isSelected ? 600 : 400,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing[2],
                  opacity: o.disabled ? 0.55 : 1,
                }}
              >
                {isSelected ? <Icon name="check" size={14} color="primaryOrange" /> : <span style={{ width: 14 }} />}
                {o.label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
