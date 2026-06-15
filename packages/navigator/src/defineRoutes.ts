/**
 * defineRoutes -- the same routes table for web and native.
 *
 *   const routes = defineRoutes([
 *     { name: "home",     path: "/",           icon: "home",     title: "Home",     element: () => <Home /> },
 *     { name: "subjects", path: "/subjects",   icon: "user",     title: "Subjects", element: () => <Subjects /> },
 *     { name: "settings", path: "/settings",   icon: "settings", title: "Settings", element: () => <Settings /> },
 *   ]);
 *
 *   // web:
 *   import { OmniRouter } from "@omniui/navigator/react-router";
 *   <OmniRouter routes={routes} />
 *
 *   // native:
 *   import { OmniNavigator } from "@omniui/navigator/react-navigation";
 *   <OmniNavigator routes={routes} />
 *
 * Each platform adapter pulls only what it needs. The routes table itself
 * is the single source of truth for sidebar labels, tab labels, deep links,
 * and breadcrumbs.
 */
import type { ComponentType, ReactElement } from "react";

export interface OmniRoute {
  /** Stable id used by adapters; usually the screen key. */
  name: string;
  /** Web URL path. Native ignores this except for deep linking. */
  path: string;
  title: string;
  /** Icon name from the @omniui/icons registry. Drives Sidebar + tabs. */
  icon?: string;
  /** A render function. Lazy by default; consumers can wrap in React.lazy. */
  element: ComponentType<unknown> | (() => ReactElement);
  /** Hide from navigation chrome (deep-linkable but not surfaced). */
  hidden?: boolean;
  /** Authentication required. Adapters can read this to redirect to /signIn. */
  protected?: boolean;
  /** Nested routes. Adapters flatten them onto the parent path. */
  children?: OmniRoute[];
}

export function defineRoutes(routes: OmniRoute[]): OmniRoute[] {
  return routes;
}

/**
 * Flatten nested routes into a single array, preserving paths. Used by
 * adapters that need a flat lookup table (eg. matching the current URL
 * against a path).
 */
export function flattenRoutes(routes: OmniRoute[], prefix = ""): OmniRoute[] {
  const out: OmniRoute[] = [];
  for (const r of routes) {
    const path = prefix ? `${prefix.replace(/\/+$/, "")}/${r.path.replace(/^\/+/, "")}` : r.path;
    out.push({ ...r, path });
    if (r.children) out.push(...flattenRoutes(r.children, path));
  }
  return out;
}

/**
 * Routes to surface in nav chrome. Drops hidden + section-only entries.
 */
export function visibleRoutes(routes: OmniRoute[]): OmniRoute[] {
  return routes.filter((r) => !r.hidden);
}
