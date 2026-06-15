/**
 * ErrorScreen. The "something broke" full-window screen.
 *
 *   <ErrorScreen
 *     code={500}
 *     title="Server hiccup"
 *     body="We logged it. Hit retry or head back home."
 *     primary={<Button onClick={retry}>Retry</Button>}
 *     secondary={<Button variant="ghost" as="a" href="/">Home</Button>}
 *   />
 */
import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@plyxui/styles";
import { spacing } from "@plyxui/core";

export interface ErrorScreenProps {
  code?: number | string;
  title: ReactNode;
  body?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  style?: CSSProperties;
}

export function ErrorScreen({ code, title, body, primary, secondary, style }: ErrorScreenProps) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.primaryFill,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing[5],
        ...style,
      }}
    >
      <div style={{ maxWidth: 460, textAlign: "center" }}>
        {code != null ? (
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: colors.textMuted,
              lineHeight: 1,
              marginBottom: spacing[3],
            }}
          >
            {code}
          </div>
        ) : null}
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: spacing[2] }}>
          {title}
        </h1>
        {body ? (
          <p
            style={{
              fontSize: 15,
              color: colors.textMuted,
              lineHeight: 1.6,
              marginBottom: spacing[6],
            }}
          >
            {body}
          </p>
        ) : null}
        {primary || secondary ? (
          <div
            style={{
              display: "flex",
              gap: spacing[2],
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {primary}
            {secondary}
          </div>
        ) : null}
      </div>
    </div>
  );
}
