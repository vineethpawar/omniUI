/**
 * Tooltip on native is a long-press affordance, not a hover one — the
 * gesture model is fundamentally different. For now this is a pass-through
 * that renders the child unchanged so consumers can use the same JSX on
 * both platforms; the proper RN gesture-handler-backed version is on the
 * roadmap.
 */
import type { ReactElement, ReactNode } from "react";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  label: ReactNode;
  children: ReactElement;
  side?: TooltipSide;
  delay?: number;
  open?: boolean;
  disabled?: boolean;
}

export function Tooltip({ children }: TooltipProps): ReactElement {
  return children;
}
