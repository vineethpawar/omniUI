/**
 * Sidebar isn't a thing on native; expose a stub so the import doesn't
 * blow up. Consumers should reach for a bottom-tab navigator instead --
 * the recommended pattern is in the docs.
 */
import type { ReactNode } from "react";

export interface SidebarItem {
  label: string;
  icon?: string;
  active?: boolean;
  onSelect?: () => void;
  badge?: string | number;
  section?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  header?: ReactNode;
  footer?: ReactNode;
}

export function Sidebar(_props: SidebarProps): null {
  if (__DEV__) {
    console.warn(
      "@omniui/layouts: <Sidebar /> is web-only. On native, use the tab navigator pattern from @omniui/navigator.",
    );
  }
  return null;
}
