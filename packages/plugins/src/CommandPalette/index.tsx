/**
 * CommandPalette. Cmd+K style fuzzy-search launcher.
 *
 *   <CommandPalette
 *     open={open}
 *     onClose={() => setOpen(false)}
 *     items={[
 *       { id: "home", label: "Go home", group: "Navigate", onSelect: () => navigate("/") },
 *       { id: "settings", label: "Open settings", group: "Navigate", onSelect: () => navigate("/settings") },
 *       { id: "logout", label: "Sign out", group: "Account", onSelect: signOut },
 *     ]}
 *   />
 *
 * Mid-fidelity matching: substring + lowercase, no fancy fuzzy yet. Good
 * enough for sub-200-item lists; swap in fzf-style scoring once we feel
 * the latency.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@omniui/styles";
import { spacing, radius } from "@omniui/core";
import { Icon, type IconName } from "@omniui/icons";

export interface CommandItem {
  id: string;
  label: string;
  /** Optional logical group (e.g. "Navigate", "Account"). */
  group?: string;
  /** Optional icon name from the @omniui/icons registry. */
  icon?: IconName | (string & {});
  /** Optional keywords to broaden the substring match. */
  keywords?: string[];
  onSelect: () => void;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  /** Width in px. Default 560. */
  width?: number;
}

function score(query: string, item: CommandItem): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const hay = [item.label, ...(item.keywords ?? [])].join(" ").toLowerCase();
  if (hay.startsWith(q)) return 3;
  if (hay.includes(q)) return 2;
  return 0;
}

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = "Type a command…",
  width = 560,
}: CommandPaletteProps) {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  const ranked = useMemo(() => {
    const scored = items
      .map((it) => ({ item: it, s: score(query, it) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);
    return scored.map((x) => x.item);
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(ranked.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = ranked[active];
        if (it && !it.disabled) {
          it.onSelect();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, ranked, active, onClose]);

  if (!open) return null;

  const grouped = new Map<string, CommandItem[]>();
  for (const item of ranked) {
    const g = item.group ?? "";
    if (!grouped.has(g)) grouped.set(g, []);
    grouped.get(g)!.push(item);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 200,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "12vh 16px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: width,
          background: colors.surfaceFill,
          border: `1px solid ${colors.stroke}`,
          borderRadius: radius.lg,
          boxShadow: "0 24px 72px rgba(0,0,0,0.35)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "70vh",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: spacing[3], gap: spacing[2], borderBottom: `1px solid ${colors.stroke}` }}>
          <Icon name="search" size={18} color="textMuted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={placeholder}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: colors.text,
              fontSize: 15,
              fontFamily: "inherit",
              padding: 0,
            }}
          />
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: spacing[1] }}>
          {ranked.length === 0 ? (
            <div
              style={{
                padding: spacing[5],
                textAlign: "center",
                fontSize: 13,
                color: colors.textMuted,
              }}
            >
              Nothing matches.
            </div>
          ) : null}
          {Array.from(grouped.entries()).map(([group, list]) => (
            <div key={group || "_"} style={{ marginBottom: spacing[1] }}>
              {group ? (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: colors.textMuted,
                    padding: `${spacing[2]}px ${spacing[3]}px ${spacing[1]}px`,
                  }}
                >
                  {group}
                </div>
              ) : null}
              {list.map((it) => {
                const idx = ranked.indexOf(it);
                const isActive = idx === active;
                return (
                  <button
                    key={it.id}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => {
                      if (it.disabled) return;
                      it.onSelect();
                      onClose();
                    }}
                    disabled={it.disabled}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: spacing[3],
                      padding: `${spacing[2]}px ${spacing[3]}px`,
                      background: isActive ? colors.containerFill : "transparent",
                      border: "none",
                      borderRadius: radius.sm,
                      color: it.disabled ? colors.textMuted : colors.text,
                      fontSize: 14,
                      fontFamily: "inherit",
                      cursor: it.disabled ? "not-allowed" : "pointer",
                      textAlign: "left",
                    }}
                  >
                    {it.icon ? <Icon name={it.icon} size={16} color="textMuted" /> : null}
                    <span style={{ flex: 1 }}>{it.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
