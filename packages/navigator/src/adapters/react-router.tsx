/**
 * react-router-dom v6 + v7 adapter.
 *
 * Renders the OmniRoute table as a <Routes> tree. Wrap with your own Router
 * (BrowserRouter, HashRouter, etc.) outside of this so the consumer can
 * pick the routing mode.
 *
 *   <BrowserRouter>
 *     <OmniRouter routes={routes} fallback={<NotFound />} />
 *   </BrowserRouter>
 */
import { createElement, isValidElement, type ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { type OmniRoute, flattenRoutes } from "../defineRoutes";

export interface OmniRouterProps {
  routes: OmniRoute[];
  fallback?: ReactElement;
}

function renderElement(route: OmniRoute): ReactElement {
  const E = route.element;
  // ComponentType vs zero-arg function: try-component first.
  try {
    const out = createElement(E as React.ComponentType<unknown>);
    if (isValidElement(out)) return out;
  } catch {
    /* fall through */
  }
  // Zero-arg render fn
  return (E as () => ReactElement)();
}

export function OmniRouter({ routes, fallback }: OmniRouterProps) {
  const flat = flattenRoutes(routes);
  return (
    <Routes>
      {flat.map((r) => (
        <Route key={r.name} path={r.path} element={renderElement(r)} />
      ))}
      {fallback ? <Route path="*" element={fallback} /> : null}
    </Routes>
  );
}
