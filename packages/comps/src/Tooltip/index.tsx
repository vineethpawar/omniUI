/**
 * Tooltip (web). Hover- or focus-triggered popover with a short label.
 *
 *   <Tooltip label="Save the document">
 *     <Button iconLeading={<Icon name="save" />} />
 *   </Tooltip>
 *
 * Mid-fidelity positioning: places the tooltip on a configurable side
 * relative to the trigger, falls back to the opposite side if it would
 * clip the viewport. No collision detection beyond that. Reach for
 * floating-ui when this isn't enough (one peer dep, drop-in upgrade).
 *
 * Accessibility: the trigger receives an aria-describedby that points
 * at the tooltip node. Tooltip body uses role=tooltip. Escape dismisses.
 */
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { useTheme } from "@plyxui/styles";
import { radius, spacing } from "@plyxui/core";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  label: ReactNode;
  /** Single React element. Tooltip wraps it via cloneElement to attach handlers. */
  children: ReactElement;
  /** Preferred side. Auto-flips if it would clip. Default "top". */
  side?: TooltipSide;
  /** Open delay in ms. Default 250. */
  delay?: number;
  /** Force-open (for testing / controlled cases). */
  open?: boolean;
  /** Render-time disable (useful for conditional tooltips). */
  disabled?: boolean;
}

interface Position {
  top: number;
  left: number;
  side: TooltipSide;
}

const GAP = 8; // px between trigger + tooltip

export function Tooltip({
  label,
  children,
  side = "top",
  delay = 250,
  open: controlled,
  disabled,
}: TooltipProps) {
  const { colors } = useTheme();
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlled ?? internalOpen;

  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [pos, setPos] = useState<Position | null>(null);

  const cancelTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const show = useCallback(() => {
    if (disabled) return;
    cancelTimer();
    timerRef.current = setTimeout(() => setInternalOpen(true), delay);
  }, [delay, disabled]);
  const hide = useCallback(() => {
    cancelTimer();
    setInternalOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide]);

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const tRect = trigger.getBoundingClientRect();
    const ttRect = tooltip.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const positions: Record<TooltipSide, Position> = {
      top: {
        top: tRect.top - ttRect.height - GAP,
        left: tRect.left + (tRect.width - ttRect.width) / 2,
        side: "top",
      },
      bottom: {
        top: tRect.bottom + GAP,
        left: tRect.left + (tRect.width - ttRect.width) / 2,
        side: "bottom",
      },
      left: {
        top: tRect.top + (tRect.height - ttRect.height) / 2,
        left: tRect.left - ttRect.width - GAP,
        side: "left",
      },
      right: {
        top: tRect.top + (tRect.height - ttRect.height) / 2,
        left: tRect.right + GAP,
        side: "right",
      },
    };

    const fits = (p: Position): boolean =>
      p.top >= 0 && p.left >= 0 && p.top + ttRect.height <= vh && p.left + ttRect.width <= vw;

    const opposite: Record<TooltipSide, TooltipSide> = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left",
    };

    const primary = positions[side];
    const next = fits(primary) ? primary : positions[opposite[side]];
    // Clamp to viewport edges
    next.left = Math.max(4, Math.min(next.left, vw - ttRect.width - 4));
    next.top = Math.max(4, Math.min(next.top, vh - ttRect.height - 4));
    setPos(next);
  }, [open, side]);

  if (!isValidElement(children)) {
    // Single-element trigger required; pass children through unchanged so the
    // app keeps rendering instead of crashing.
    return <>{children}</>;
  }

  const child = children as ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    "aria-describedby"?: string;
  }>;

  const trigger = cloneElement(child, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
    },
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      child.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      child.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      child.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      child.props.onBlur?.(e);
    },
    "aria-describedby": open ? id : child.props["aria-describedby"],
  });

  const baseStyle: CSSProperties = {
    position: "fixed",
    zIndex: 1000,
    background: colors.text,
    color: colors.surfaceFill,
    padding: `${spacing[1]}px ${spacing[2]}px`,
    borderRadius: radius.sm,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.4,
    maxWidth: 240,
    pointerEvents: "none",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    opacity: pos ? 1 : 0,
    transition: "opacity 0.12s ease",
    top: pos?.top ?? -9999,
    left: pos?.left ?? -9999,
  };

  return (
    <>
      {trigger}
      {open ? (
        <div ref={tooltipRef} role="tooltip" id={id} style={baseStyle}>
          {label}
        </div>
      ) : null}
    </>
  );
}
