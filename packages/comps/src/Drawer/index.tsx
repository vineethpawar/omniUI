/**
 * Drawer (web). Edge-anchored panel that slides in from a side.
 *
 *   <Drawer open={open} onClose={() => setOpen(false)} side="right" title="Settings">
 *     ...
 *   </Drawer>
 *
 * Same close behavior as Modal: backdrop click + Escape. Locks body scroll
 * while open. Width/height defaults to a sane size per side; override via
 * `size`.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Width (left/right) or height (top/bottom), in px or CSS string. */
  size?: number | string;
  dismissOnBackdrop?: boolean;
}

const defaultSizes: Record<DrawerSide, number> = {
  left: 360,
  right: 360,
  top: 280,
  bottom: 320,
};

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  footer,
  size,
  dismissOnBackdrop = true,
}: DrawerProps) {
  const { colors } = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Move focus into the panel for a sensible starting point.
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const dim = size ?? defaultSizes[side];
  const isHorizontal = side === "left" || side === "right";

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    background: colors.surfaceFill,
    color: colors.text,
    boxShadow:
      side === "right"
        ? "-8px 0 24px rgba(0,0,0,0.18)"
        : side === "left"
          ? "8px 0 24px rgba(0,0,0,0.18)"
          : side === "bottom"
            ? "0 -8px 24px rgba(0,0,0,0.18)"
            : "0 8px 24px rgba(0,0,0,0.18)",
    display: "flex",
    flexDirection: "column",
    outline: "none",
    transition: "transform 0.22s ease",
    ...(isHorizontal
      ? { top: 0, bottom: 0, width: dim, [side]: 0 }
      : { left: 0, right: 0, height: dim, [side]: 0 }),
    // Rounded inner corners on the side facing the page
    ...(side === "right" ? { borderTopLeftRadius: radius.lg, borderBottomLeftRadius: radius.lg } : {}),
    ...(side === "left" ? { borderTopRightRadius: radius.lg, borderBottomRightRadius: radius.lg } : {}),
    ...(side === "bottom" ? { borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg } : {}),
    ...(side === "top" ? { borderBottomLeftRadius: radius.lg, borderBottomRightRadius: radius.lg } : {}),
  };

  return (
    <>
      <div
        onClick={() => {
          if (dismissOnBackdrop) onClose();
        }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 999,
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        tabIndex={-1}
        style={{ zIndex: 1000, ...panelStyle }}
      >
        {title ? (
          <div
            style={{
              padding: `${spacing[4]}px ${spacing[5]}px`,
              borderBottom: `1px solid ${colors.stroke}`,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {title}
          </div>
        ) : null}
        <div
          style={{
            flex: 1,
            padding: spacing[5],
            overflow: "auto",
          }}
        >
          {children}
        </div>
        {footer ? (
          <div
            style={{
              padding: `${spacing[3]}px ${spacing[5]}px`,
              borderTop: `1px solid ${colors.stroke}`,
              display: "flex",
              justifyContent: "flex-end",
              gap: spacing[2],
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </>
  );
}
