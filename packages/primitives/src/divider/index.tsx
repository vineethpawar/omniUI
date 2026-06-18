/**
 * Divider (web). A line. Horizontal by default; pass orientation="vertical"
 * to split a row. Optional inline label sits in the middle.
 *
 *   <Divider />
 *   <Divider label="OR" />
 *   <Flex>...<Divider orientation="vertical" />...</Flex>
 */
import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@plyxui/styles";
import { spacing } from "@plyxui/core";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  /** Inline label split-mode. Only meaningful for horizontal. */
  label?: ReactNode;
  /** Indent the line from the edge. Pixels. */
  inset?: number;
  /** Override the line color. Defaults to colors.stroke. */
  color?: string;
  /** Line thickness in pixels. Default 1. */
  thickness?: number;
  /** "dashed" or "solid". Default "solid". */
  style?: "solid" | "dashed";
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  inset = 0,
  color,
  thickness = 1,
  style: variant = "solid",
  className,
}: DividerProps) {
  const { colors } = useTheme();
  const lineColor = color ?? colors.stroke;

  if (orientation === "vertical") {
    const style: CSSProperties = {
      alignSelf: "stretch",
      width: thickness,
      borderLeft: `${thickness}px ${variant} ${lineColor}`,
      marginTop: inset,
      marginBottom: inset,
    };
    return <div role="separator" aria-orientation="vertical" className={className} style={style} />;
  }

  if (label) {
    return (
      <div
        role="separator"
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing[3],
          color: colors.textMuted,
          fontSize: 12,
          fontWeight: 500,
          marginLeft: inset,
          marginRight: inset,
        }}
      >
        <span style={{ flex: 1, borderTop: `${thickness}px ${variant} ${lineColor}` }} />
        <span>{label}</span>
        <span style={{ flex: 1, borderTop: `${thickness}px ${variant} ${lineColor}` }} />
      </div>
    );
  }

  return (
    <hr
      className={className}
      style={{
        border: 0,
        borderTop: `${thickness}px ${variant} ${lineColor}`,
        marginLeft: inset,
        marginRight: inset,
        marginTop: 0,
        marginBottom: 0,
        height: 0,
      }}
    />
  );
}
