/**
 * AuthLayout. The classic "centered card with brand above" layout used by
 * sign-in, sign-up, forgot-password, magic-link confirm, etc.
 *
 *   <AuthLayout title="Sign in" subtitle="Welcome back." brand={<Logo />}>
 *     <SignInForm />
 *   </AuthLayout>
 */
import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@omniui/styles";
import { spacing, radius } from "@omniui/core";

export interface AuthLayoutProps {
  title: ReactNode;
  subtitle?: ReactNode;
  brand?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  /** Card width in px. Default 400. */
  width?: number;
  style?: CSSProperties;
}

export function AuthLayout({
  title,
  subtitle,
  brand,
  footer,
  children,
  width = 400,
  style,
}: AuthLayoutProps) {
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
      <div style={{ width: "100%", maxWidth: width }}>
        {brand ? (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: spacing[6] }}>
            {brand}
          </div>
        ) : null}
        <div
          style={{
            background: colors.surfaceFill,
            border: `1px solid ${colors.stroke}`,
            borderRadius: radius.lg,
            padding: spacing[6],
          }}
        >
          <div style={{ marginBottom: spacing[5] }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: spacing[1] }}>
              {title}
            </h1>
            {subtitle ? (
              <div style={{ fontSize: 14, color: colors.textMuted }}>{subtitle}</div>
            ) : null}
          </div>
          {children}
        </div>
        {footer ? (
          <div
            style={{
              marginTop: spacing[5],
              textAlign: "center",
              fontSize: 13,
              color: colors.textMuted,
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
