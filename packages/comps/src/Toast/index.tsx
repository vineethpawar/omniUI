/**
 * Toast (web). Renders the queue from `useToast()` in a corner stack.
 *
 *   <ToastProvider>          // from @plyxui/hooks
 *     <App />
 *     <Toaster position="bottom-right" />
 *   </ToastProvider>
 *
 *   // somewhere in App:
 *   const { toast } = useToast();
 *   toast({ title: "Saved", variant: "success" });
 *
 * The renderer is intentionally separate from the queue so the same
 * provider can power any visual — a banner, a snackbar, a custom one
 * the consumer writes themselves.
 */
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useToast, type ToastItem, type ToastVariant } from "@plyxui/hooks";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export type ToasterPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface ToasterProps {
  /** Where the stack lives. Default "bottom-right". */
  position?: ToasterPosition;
  /** Pixel offset from the chosen corner. Default 16. */
  offset?: number;
  /** Cap visible toasts. Older ones drop. Default 5. */
  max?: number;
  /** Override per-variant accent (orange/green/red). */
  accent?: Partial<Record<ToastVariant, string>>;
}

export function Toaster({ position = "bottom-right", offset = 16, max = 5, accent }: ToasterProps) {
  const { toasts } = useToast();
  const visible = toasts.slice(-max);

  const containerStyle: CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    pointerEvents: "none",
    display: "flex",
    flexDirection: position.startsWith("bottom") ? "column-reverse" : "column",
    alignItems: position.endsWith("left") ? "flex-start" : position.endsWith("right") ? "flex-end" : "center",
    gap: spacing[2],
    ...edge(position, offset),
  };

  return (
    <div style={containerStyle} aria-live="polite" aria-relevant="additions">
      {visible.map((t: ToastItem) => (
        <ToastCard key={t.id} item={t} accent={accent} />
      ))}
    </div>
  );
}

function edge(pos: ToasterPosition, off: number): CSSProperties {
  const s: CSSProperties = {};
  if (pos.startsWith("top")) s.top = off;
  else s.bottom = off;
  if (pos.endsWith("left")) s.left = off;
  else if (pos.endsWith("right")) s.right = off;
  else {
    s.left = "50%";
    s.transform = "translateX(-50%)";
  }
  return s;
}

function ToastCard({
  item,
  accent,
}: {
  item: ToastItem;
  accent?: Partial<Record<ToastVariant, string>>;
}): ReactNode {
  const { colors } = useTheme();
  const { dismiss } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger the enter transition next frame
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const variant = item.variant ?? "default";
  const fallback: Record<ToastVariant, string> = {
    default: colors.primaryOrange,
    success: colors.statusSuccess,
    warning: colors.statusWarning,
    error: colors.statusError,
  };
  const accentColor = accent?.[variant] ?? fallback[variant];

  return (
    <div
      role="status"
      style={{
        pointerEvents: "auto",
        minWidth: 280,
        maxWidth: 380,
        background: colors.surfaceFill,
        color: colors.text,
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: radius.md,
        padding: `${spacing[3]}px ${spacing[4]}px`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        transform: mounted ? "translateY(0)" : "translateY(8px)",
        opacity: mounted ? 1 : 0,
        transition: "transform 0.18s ease, opacity 0.18s ease",
      }}
    >
      {item.title ? (
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: item.description ? 2 : 0 }}>
          {item.title}
        </div>
      ) : null}
      {item.description ? (
        <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.4 }}>
          {item.description}
        </div>
      ) : null}
      <button
        onClick={() => dismiss(item.id)}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          top: 6,
          right: 8,
          background: "transparent",
          border: "none",
          color: colors.textMuted,
          fontSize: 16,
          lineHeight: 1,
          cursor: "pointer",
          padding: 4,
        }}
      >
        x
      </button>
    </div>
  );
}
