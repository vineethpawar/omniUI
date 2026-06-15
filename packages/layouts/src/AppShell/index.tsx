/**
 * AppShell (web).
 *
 * A full-height flex column with three optional slots: header, main, footer.
 * Pair with Sidebar to get the classic chrome.
 *
 *   <AppShell header={<TitleBar />} sidebar={<Sidebar items={items} />}>
 *     <Outlet />
 *   </AppShell>
 *
 * Doesn't take a router opinion -- consumers compose whichever navigator
 * makes sense for their app. The point of this primitive is the chrome.
 */
import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@plyxui/styles";

export interface AppShellProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  /** Width of the sidebar slot. Default 240. */
  sidebarWidth?: number;
  /** Show a divider between the sidebar and main. Default true. */
  divider?: boolean;
  style?: CSSProperties;
}

export function AppShell({
  header,
  sidebar,
  footer,
  children,
  sidebarWidth = 240,
  divider = true,
  style,
}: AppShellProps) {
  const { colors } = useTheme();
  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: colors.primaryFill,
    color: colors.text,
    overflow: "hidden",
    ...style,
  };
  const mainRowStyle: CSSProperties = {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "row",
  };
  const sidebarStyle: CSSProperties = {
    width: sidebarWidth,
    flexShrink: 0,
    background: colors.surfaceFill,
    borderRight: divider ? `1px solid ${colors.stroke}` : undefined,
    overflowY: "auto",
  };
  const mainStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    overflow: "auto",
  };

  return (
    <div style={containerStyle}>
      {header}
      <div style={mainRowStyle}>
        {sidebar ? <aside style={sidebarStyle}>{sidebar}</aside> : null}
        <main style={mainStyle}>{children}</main>
      </div>
      {footer}
    </div>
  );
}
