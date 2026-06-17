import { useEffect, useRef, type RefObject } from "react";

/**
 * Fires `handler` when a click lands outside the returned ref.
 *
 *   const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
 *   return <div ref={ref}>...</div>;
 *
 * Web-only by design. On native, gesture handling is per-platform and
 * doesn't generalize to a hook like this.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  active = true,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;
    const listener = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, active]);
  return ref;
}
