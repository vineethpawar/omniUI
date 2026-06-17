/**
 * EmptyState. The "no data yet" screen. Big icon, headline, supporting copy,
 * optional CTA.
 *
 *   <EmptyState
 *     icon="inbox"
 *     title="No messages yet"
 *     body="When someone reaches out, they'll show up here."
 *     action={<Button onClick={invite}>Invite a friend</Button>}
 *   />
 */
import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@omniui/styles";
import { Icon, type IconName } from "@omniui/icons";
import { spacing } from "@omniui/core";

export interface EmptyStateProps {
  icon?: IconName | (string & {});
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  style?: CSSProperties;
}

export function EmptyState({ icon, title, body, action, style }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: spacing[10],
        gap: spacing[3],
        color: colors.text,
        ...style,
      }}
    >
      {icon ? (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: colors.containerFill,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.textMuted,
          }}
        >
          <Icon name={icon} size={26} color="textMuted" />
        </div>
      ) : null}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.text }}>{title}</h2>
      {body ? (
        <p style={{ fontSize: 14, color: colors.textMuted, maxWidth: 360, lineHeight: 1.55 }}>
          {body}
        </p>
      ) : null}
      {action ? <div style={{ marginTop: spacing[3] }}>{action}</div> : null}
    </div>
  );
}
