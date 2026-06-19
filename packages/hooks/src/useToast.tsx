/**
 * Headless toast queue. The hook + provider; rendering is up to the
 * consumer (or @plyxui/comps Toast once that lands).
 *
 *   <ToastProvider>
 *     <App />
 *   </ToastProvider>
 *
 *   const { toast } = useToast();
 *   toast({ title: "Saved", variant: "success" });
 *
 * No dependencies on DOM or RN. Consumers render the queue however
 * fits their platform.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant = "default" | "success" | "warning" | "error";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss after this many ms. 0 = sticky. Default 4000. */
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  toast: (input: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

// Pin the context to globalThis. When Snackager pre-bundles each plyxui
// package, it can end up with multiple copies of @plyxui/hooks (one
// inlined into @plyxui/comps, one in the consumer). Without this, the
// Toaster's useToast() sees a different context than the consumer's
// ToastProvider, and the hook throws.
const GLOBAL_KEY = "__plyxui_toast_context_v1__";
type Global = typeof globalThis & { [GLOBAL_KEY]?: React.Context<ToastContextValue | null> };
const g = globalThis as Global;
const ToastContext: React.Context<ToastContextValue | null> =
  g[GLOBAL_KEY] ?? (g[GLOBAL_KEY] = createContext<ToastContextValue | null>(null));

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
    setToasts((ts) => ts.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (input: Omit<ToastItem, "id">) => {
      const id = uid();
      const next: ToastItem = { id, duration: 4000, variant: "default", ...input };
      setToasts((ts) => [...ts, next]);
      if (next.duration && next.duration > 0) {
        const handle = setTimeout(() => dismiss(id), next.duration);
        timers.current.set(id, handle);
      }
      return id;
    },
    [dismiss],
  );

  const clear = useCallback(() => {
    for (const t of timers.current.values()) clearTimeout(t);
    timers.current.clear();
    setToasts([]);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, toast, dismiss, clear }),
    [toasts, toast, dismiss, clear],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider />");
  }
  return ctx;
}
