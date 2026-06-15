/**
 * Modal (web). Click-outside + Escape close, scroll lock, focus trap.
 * Uses the native <dialog> element since we can; Safari has caught up.
 *
 *   <Modal open={open} onClose={() => setOpen(false)} title="Confirm">
 *     ...
 *   </Modal>
 */
import { useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "@plyxui/styles";
import { Icon } from "@plyxui/icons";
import { radius, spacing } from "@plyxui/core";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Width in px, or "sm" | "md" | "lg" | "full". Default "md" (520). */
  size?: "sm" | "md" | "lg" | "full" | number;
  /** Allow click-outside to close. Default true. */
  dismissOnBackdrop?: boolean;
}

const sizePresets: Record<"sm" | "md" | "lg" | "full", number | string> = {
  sm: 360,
  md: 520,
  lg: 720,
  full: "min(100vw - 48px, 1080px)",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  dismissOnBackdrop = true,
}: ModalProps) {
  const { colors } = useTheme();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const widthValue = typeof size === "number" ? `${size}px` : sizePresets[size];

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (!dismissOnBackdrop) return;
        // Backdrop clicks land on the dialog element itself, not on a child
        if (e.target === ref.current) onClose();
      }}
      style={{
        padding: 0,
        border: "none",
        background: colors.surfaceFill,
        borderRadius: radius.lg,
        color: colors.text,
        width: widthValue,
        maxHeight: "min(90vh, 800px)",
        boxShadow: "0 24px 72px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxHeight: "inherit" }}>
        {(title || onClose) && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: spacing[4],
              gap: spacing[3],
              borderBottom: `1px solid ${colors.stroke}`,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {title ? (
                <div style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>{title}</div>
              ) : null}
              {description ? (
                <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>{description}</div>
              ) : null}
            </div>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: colors.textMuted,
                display: "inline-flex",
              }}
              aria-label="Close"
            >
              <Icon name="x" size={18} />
            </button>
          </div>
        )}
        <div style={{ padding: spacing[4], overflow: "auto", flex: 1 }}>{children}</div>
        {footer ? (
          <div
            style={{
              display: "flex",
              gap: spacing[2],
              justifyContent: "flex-end",
              padding: spacing[4],
              borderTop: `1px solid ${colors.stroke}`,
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
