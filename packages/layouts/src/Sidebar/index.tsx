/**
 * Sidebar (web). Takes a list of `SidebarItem`s and renders a navigation
 * column. Each item carries an icon name (lookup in the @omniui/icons
 * registry), a label, and an `active` boolean the consumer derives from
 * their router.
 *
 *   <Sidebar
 *     items={routes.map(r => ({
 *       label: r.title,
 *       icon: r.icon,
 *       active: r.path === currentPath,
 *       onSelect: () => navigate(r.path),
 *     }))}
 *   />
 */
import type { CSSProperties } from "react";
import { useTheme } from "@omniui/styles";
import { Icon, type IconName } from "@omniui/icons";
import { spacing, radius } from "@omniui/core";

export interface SidebarItem {
  label: string;
  icon?: IconName | (string & {});
  active?: boolean;
  onSelect?: () => void;
  /** Optional badge (number or text). */
  badge?: string | number;
  /** If set, the item renders as a section header rather than a click target. */
  section?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  /** Optional brand block above the items. */
  header?: React.ReactNode;
  /** Optional footer below the items (eg user profile). */
  footer?: React.ReactNode;
  style?: CSSProperties;
}

export function Sidebar({ items, header, footer, style }: SidebarProps) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: spacing[3],
        gap: spacing[3],
        ...style,
      }}
    >
      {header}
      <nav style={{ display: "flex", flexDirection: "column", gap: spacing[1], flex: 1 }}>
        {items.map((it, i) =>
          it.section ? (
            <div
              key={`s-${i}`}
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: colors.textMuted,
                padding: `${spacing[3]}px ${spacing[2]}px ${spacing[1]}px`,
              }}
            >
              {it.label}
            </div>
          ) : (
            <button
              key={`i-${i}`}
              onClick={it.onSelect}
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing[3],
                padding: `${spacing[2]}px ${spacing[3]}px`,
                border: "none",
                background: it.active ? colors.containerFill : "transparent",
                color: it.active ? colors.text : colors.textMuted,
                borderRadius: radius.md,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: it.active ? 600 : 500,
                fontFamily: "inherit",
                textAlign: "left",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              {it.icon ? <Icon name={it.icon} size={18} color={it.active ? "primaryOrange" : "textMuted"} /> : null}
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge != null ? (
                <span
                  style={{
                    background: colors.primaryOrange,
                    color: "#FFFFFF",
                    borderRadius: radius.pill,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "1px 8px",
                  }}
                >
                  {it.badge}
                </span>
              ) : null}
            </button>
          ),
        )}
      </nav>
      {footer}
    </div>
  );
}
