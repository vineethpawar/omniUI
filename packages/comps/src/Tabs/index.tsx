/**
 * Tabs (web).
 *
 *   <Tabs value={tab} onChange={setTab}>
 *     <TabList>
 *       <Tab value="overview">Overview</Tab>
 *       <Tab value="usage">Usage</Tab>
 *       <Tab value="props">Props</Tab>
 *     </TabList>
 *     <TabPanel value="overview">...</TabPanel>
 *     <TabPanel value="usage">...</TabPanel>
 *     <TabPanel value="props">...</TabPanel>
 *   </Tabs>
 *
 * Composition over a single component on purpose: lets the consumer
 * inject anything between TabList and the panels (a search bar, a
 * filter row), or render the panels somewhere else entirely.
 */
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useTheme } from "@plyxui/styles";
import { spacing } from "@plyxui/core";

interface TabsContextValue {
  value: string;
  onChange: (next: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab / TabList / TabPanel must be inside <Tabs>");
  return ctx;
}

export interface TabsProps {
  value: string;
  onChange: (next: string) => void;
  children: ReactNode;
  style?: CSSProperties;
}

export function Tabs({ value, onChange, children, style }: TabsProps) {
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ value, onChange, baseId }}>
      <div style={style}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: ReactNode;
  /** Visual style. Default "line" — underlined active tab. "pill" wraps each tab in a rounded fill. */
  variant?: "line" | "pill";
  /** "fill" stretches tabs across the row. */
  fill?: boolean;
  style?: CSSProperties;
}

export function TabList({ children, variant = "line", fill, style }: TabListProps) {
  const { colors } = useTheme();
  const listRef = useRef<HTMLDivElement>(null);

  // Arrow-key navigation across tabs.
  const onKey = useCallback((e: React.KeyboardEvent) => {
    const list = listRef.current;
    if (!list) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const idx = tabs.findIndex((t) => t === document.activeElement);
    if (idx === -1) return;
    const next = e.key === "ArrowRight"
      ? tabs[(idx + 1) % tabs.length]
      : tabs[(idx - 1 + tabs.length) % tabs.length];
    next?.focus();
    next?.click();
  }, []);

  return (
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={onKey}
      data-variant={variant}
      style={{
        display: "flex",
        gap: variant === "line" ? 0 : spacing[1],
        borderBottom: variant === "line" ? `1px solid ${colors.stroke}` : undefined,
        ...style,
      }}
    >
      {fill ? <div style={{ display: "flex", flex: 1 }}>{children}</div> : children}
    </div>
  );
}

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export function Tab({ value, children, disabled }: TabProps) {
  const { value: active, onChange, baseId } = useTabs();
  const { colors } = useTheme();
  const isActive = active === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;
  // Hint TabList's variant via parent's data attr
  return (
    <button
      role="tab"
      id={tabId}
      aria-controls={panelId}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => onChange(value)}
      style={{
        padding: `${spacing[2]}px ${spacing[3]}px`,
        background: "transparent",
        border: "none",
        borderBottom: isActive ? `2px solid ${colors.primaryOrange}` : "2px solid transparent",
        marginBottom: -1, // overlap the TabList's border for a clean active state
        color: isActive ? colors.text : colors.textMuted,
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: isActive ? 600 : 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "color 0.15s ease, border-color 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  /** If true, panel renders even when inactive (hidden via display:none). Useful for keeping inputs mounted. */
  keepMounted?: boolean;
  style?: CSSProperties;
}

export function TabPanel({ value, children, keepMounted, style }: TabPanelProps) {
  const { value: active, baseId } = useTabs();
  const isActive = active === value;
  if (!isActive && !keepMounted) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isActive}
      style={{ paddingTop: spacing[4], ...style }}
    >
      {children}
    </div>
  );
}
