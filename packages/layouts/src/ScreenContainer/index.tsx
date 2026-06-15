/**
 * ScreenContainer. The wrapper every screen should start with. Centers
 * content, applies a max-width, and sets the page padding.
 *
 *   <ScreenContainer>
 *     <Text size="2xl" weight="bold">Subjects</Text>
 *     ...
 *   </ScreenContainer>
 */
import type { CSSProperties, ReactNode } from "react";
import { spacing } from "@plyxui/core";
import { useTheme } from "@plyxui/styles";

export interface ScreenContainerProps {
  children: ReactNode;
  /** Max content width in px. Default 1200. */
  maxWidth?: number;
  /** Horizontal padding token. Default 6 = 24px. */
  padX?: 0 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  /** Vertical padding token. Default 6. */
  padY?: 0 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  style?: CSSProperties;
}

export function ScreenContainer({
  children,
  maxWidth = 1200,
  padX = 6,
  padY = 6,
  style,
}: ScreenContainerProps) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        minHeight: "100%",
        background: colors.primaryFill,
        color: colors.text,
        padding: `${spacing[padY]}px ${spacing[padX]}px`,
        ...style,
      }}
    >
      <div style={{ maxWidth, margin: "0 auto" }}>{children}</div>
    </div>
  );
}
