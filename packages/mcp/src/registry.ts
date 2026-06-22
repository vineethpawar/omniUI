/**
 * The plyxui component registry — the single source of truth the MCP
 * server hands back to agents. Hand-curated rather than scraped from
 * `dist/` because each entry carries human-written prop notes and
 * canonical examples that wouldn't survive a `.d.ts` round-trip.
 *
 * Adding a component: drop a new entry in `COMPONENTS` and the tool
 * outputs pick it up. Keep the entry next to the implementation's
 * source path in the comment so future drift is easy to spot.
 *
 * `installCommand` reflects how a real consumer adds the component —
 * `npm install @plyxui/<pkg>` plus an import line, since packages
 * ship pre-bundled dist (no copy-source step like shadcn).
 */
import type { ComponentDetail, ComponentSummary } from "./tools";

interface Entry extends ComponentDetail {
  pkg: string;
  importPath: string;
}

export const COMPONENTS: Entry[] = [
  // ─── primitives ────────────────────────────────────────────────
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Box",
    category: "primitives",
    description: "Polymorphic layout primitive. Web uses any HTML element via `as`; native uses View.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/box/index.tsx",
    tokens: ["primaryFill", "surfaceFill", "containerFill"],
    props: [
      { name: "as", type: "ElementType", required: false, description: "HTML element to render (web only)." },
      { name: "surface", type: '"none" | "primary" | "raised" | "sunken"', required: false },
      { name: "padding", type: '"none" | "sm" | "md" | "lg"', required: false },
      { name: "radius", type: '"none" | "sm" | "md" | "lg" | "pill"', required: false },
      { name: "style", type: "CSSProperties | ViewStyle", required: false },
    ],
    examples: [
      { title: "Basic surface card", code: '<Box surface="raised" padding="md" radius="lg">Hello</Box>' },
      { title: "Polymorphic as button", code: '<Box as="button" onClick={...} surface="primary" padding="sm">Click</Box>' },
    ],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Text",
    category: "primitives",
    description: "Typed text primitive with size + weight + align variants.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/text/index.tsx",
    tokens: ["text", "textMuted"],
    props: [
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"', required: false },
      { name: "weight", type: '"regular" | "medium" | "semibold" | "bold"', required: false },
      { name: "align", type: '"start" | "center" | "end" | "justify"', required: false },
    ],
    examples: [
      { title: "Heading", code: '<Text size="xl" weight="semibold">Welcome back</Text>' },
      { title: "Muted body", code: '<Text size="sm" style={{ color: colors.textMuted }}>Subtitle</Text>' },
    ],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Stack",
    category: "primitives",
    description: "Vertical or horizontal stack with gap + align + justify.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/stack/index.tsx",
    tokens: [],
    props: [
      { name: "direction", type: '"vertical" | "horizontal" | "row" | "column" | "row-reverse" | "column-reverse"', required: false },
      { name: "gap", type: "SpacingKey", required: false, description: "0, 0.5, 1 … 24 — matches Tailwind scale (×4px)." },
      { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', required: false },
      { name: "justify", type: '"start" | "center" | "end" | "between" | "around" | "evenly"', required: false },
    ],
    examples: [{ title: "Vertical list", code: '<Stack direction="vertical" gap={3}>{items.map(i => <Item key={i.id} {...i} />)}</Stack>' }],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Flex",
    category: "primitives",
    description: "Row-direction Stack. Shorthand for `<Stack direction='row' />` — comes up enough to deserve its own name.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/flex/index.tsx",
    tokens: [],
    props: [
      { name: "gap", type: "SpacingKey", required: false },
      { name: "align", type: '"start" | "center" | "end" | "stretch"', required: false },
      { name: "justify", type: '"start" | "center" | "end" | "between"', required: false },
      { name: "reverse", type: "boolean", required: false },
    ],
    examples: [{ title: "Header row", code: '<Flex align="center" justify="between"><Logo /><UserAvatar /></Flex>' }],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Input",
    category: "primitives",
    description: "Themed text input with leading + trailing slots and three size variants.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/input/index.tsx",
    tokens: ["surfaceFill", "stroke", "text"],
    props: [
      { name: "value", type: "string", required: false },
      { name: "onChange", type: "(value: string) => void", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "size", type: '"sm" | "md" | "lg"', required: false },
      { name: "invalid", type: "boolean", required: false },
      { name: "leading", type: "ReactNode", required: false },
      { name: "trailing", type: "ReactNode", required: false },
    ],
    examples: [
      { title: "Controlled", code: '<Input value={email} onChange={setEmail} placeholder="you@example.com" />' },
      { title: "With icon", code: '<Input leading={<Icon name="search" />} placeholder="Search…" />' },
    ],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Button",
    category: "primitives",
    description: "Polymorphic button. Variants: primary, ghost, link, danger. Loading + icon slots.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/button/index.tsx",
    tokens: ["primaryOrange", "surfaceFill", "text", "stroke", "statusError"],
    props: [
      { name: "variant", type: '"primary" | "ghost" | "link" | "danger"', required: false },
      { name: "size", type: '"sm" | "md" | "lg"', required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "iconLeading", type: "ReactNode", required: false },
      { name: "iconTrailing", type: "ReactNode", required: false },
      { name: "fullWidth", type: "boolean", required: false },
    ],
    examples: [{ title: "Primary CTA", code: '<Button variant="primary" onClick={save}>Save</Button>' }],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Image",
    category: "primitives",
    description: "Themed image with loading skeleton, radius tokens, and a fallback slot.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/image/index.tsx",
    tokens: ["containerFill"],
    props: [
      { name: "src", type: "string", required: true },
      { name: "alt", type: "string", required: true },
      { name: "width", type: "number | string", required: false },
      { name: "height", type: "number | string", required: false },
      { name: "aspectRatio", type: "string | number", required: false, description: "Wins over width+height when both set." },
      { name: "fit", type: '"cover" | "contain" | "fill" | "none"', required: false },
      { name: "radius", type: "RadiusKey | number", required: false },
      { name: "fallback", type: "ReactNode", required: false },
    ],
    examples: [{ title: "Avatar with fallback", code: '<Image src={user.avatar} alt={user.name} width={40} height={40} radius="pill" fallback={<Initials name={user.name} />} />' }],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Divider",
    category: "primitives",
    description: "Themed line. Horizontal or vertical, optional inline label.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/divider/index.tsx",
    tokens: ["stroke"],
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', required: false },
      { name: "label", type: "ReactNode", required: false, description: "Inline split-mode (horizontal only)." },
      { name: "thickness", type: "number", required: false },
      { name: "style", type: '"solid" | "dashed"', required: false },
    ],
    examples: [
      { title: "Section separator", code: "<Divider />" },
      { title: "OR splitter", code: '<Divider label="OR" />' },
    ],
  },
  {
    pkg: "@plyxui/primitives",
    importPath: "@plyxui/primitives",
    name: "Spinner",
    category: "primitives",
    description: "Indeterminate loading indicator. SVG arc on web, ActivityIndicator on native.",
    platforms: ["web", "native"],
    source: "packages/primitives/src/spinner/index.tsx",
    tokens: ["primaryOrange"],
    props: [
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | number', required: false },
      { name: "color", type: "string", required: false },
      { name: "label", type: "string | null", required: false, description: '"Loading" by default; null to suppress aria.' },
    ],
    examples: [{ title: "Inside a Button", code: '<Button loading iconLeading={<Spinner size="sm" />}>Saving…</Button>' }],
  },

  // ─── icons ────────────────────────────────────────────────────
  {
    pkg: "@plyxui/icons",
    importPath: "@plyxui/icons",
    name: "Icon",
    category: "comps",
    description: "Icon component backed by an augmentable registry. Stroke-based by default.",
    platforms: ["web", "native"],
    source: "packages/icons/src/Icon.tsx",
    tokens: [],
    props: [
      { name: "name", type: "IconName", required: true },
      { name: "size", type: "number", required: false },
      { name: "color", type: "string", required: false, description: 'Theme token key or raw hex.' },
    ],
    examples: [{ title: "Themed", code: '<Icon name="home" size={20} color="text" />' }],
  },

  // ─── forms ────────────────────────────────────────────────────
  {
    pkg: "@plyxui/forms",
    importPath: "@plyxui/forms",
    name: "Field",
    category: "comps",
    description: "Label + helper + error wrapper. Controls inherit `invalid` via context.",
    platforms: ["web"],
    source: "packages/forms/src/Field/index.tsx",
    tokens: ["text", "textMuted", "statusError"],
    props: [
      { name: "label", type: "ReactNode", required: false },
      { name: "helper", type: "ReactNode", required: false },
      { name: "error", type: "ReactNode", required: false },
      { name: "required", type: "boolean", required: false },
    ],
    examples: [{ title: "Email field with helper", code: '<Field label="Email" helper="We never share it." error={errors.email}>\n  <Input value={email} onChange={setEmail} />\n</Field>' }],
  },
  {
    pkg: "@plyxui/forms",
    importPath: "@plyxui/forms",
    name: "Select",
    category: "comps",
    description: "Native select with theme-styled chrome. Defers to OS UI for accessibility.",
    platforms: ["web"],
    source: "packages/forms/src/Select/index.tsx",
    tokens: ["surfaceFill", "stroke", "text"],
    props: [
      { name: "value", type: "string", required: false },
      { name: "onChange", type: "(value: string) => void", required: false },
      { name: "options", type: "Array<{ value: string; label: string; disabled?: boolean }>", required: true },
      { name: "placeholder", type: "string", required: false },
    ],
    examples: [{ title: "Plan picker", code: '<Select value={plan} onChange={setPlan} options={[\n  { value: "free", label: "Free" },\n  { value: "pro", label: "Pro" },\n]} />' }],
  },
  {
    pkg: "@plyxui/forms",
    importPath: "@plyxui/forms",
    name: "Checkbox",
    category: "comps",
    description: "Themed checkbox with optional label. Controlled or uncontrolled.",
    platforms: ["web"],
    source: "packages/forms/src/Checkbox/index.tsx",
    tokens: ["primaryOrange", "surfaceFill", "stroke"],
    props: [
      { name: "checked", type: "boolean", required: false },
      { name: "onChange", type: "(checked: boolean) => void", required: false },
      { name: "label", type: "ReactNode", required: false },
      { name: "size", type: '"sm" | "md" | "lg"', required: false },
    ],
    examples: [{ title: "With label", code: '<Checkbox checked={subscribed} onChange={setSubscribed} label="Send marketing emails" />' }],
  },
  {
    pkg: "@plyxui/forms",
    importPath: "@plyxui/forms",
    name: "Radio",
    category: "comps",
    description: "Radio button. Pair with RadioGroup for the radio set.",
    platforms: ["web"],
    source: "packages/forms/src/Radio/index.tsx",
    tokens: ["primaryOrange", "surfaceFill", "stroke"],
    props: [
      { name: "value", type: "string", required: true },
      { name: "label", type: "ReactNode", required: false },
      { name: "disabled", type: "boolean", required: false },
    ],
    examples: [{ title: "Radio group", code: '<RadioGroup value={mode} onChange={setMode}>\n  <Radio value="light" label="Light" />\n  <Radio value="dark" label="Dark" />\n</RadioGroup>' }],
  },

  // ─── comps ────────────────────────────────────────────────────
  {
    pkg: "@plyxui/comps",
    importPath: "@plyxui/comps",
    name: "Modal",
    category: "comps",
    description: "Centered modal dialog. Backdrop + Escape + body-scroll lock.",
    platforms: ["web", "native"],
    source: "packages/comps/src/Modal/index.tsx",
    tokens: ["surfaceFill", "stroke", "text"],
    props: [
      { name: "open", type: "boolean", required: true },
      { name: "onClose", type: "() => void", required: true },
      { name: "title", type: "ReactNode", required: false },
      { name: "description", type: "ReactNode", required: false },
      { name: "footer", type: "ReactNode", required: false },
      { name: "size", type: '"sm" | "md" | "lg" | "full" | number', required: false },
    ],
    examples: [{ title: "Confirm dialog", code: '<Modal open={open} onClose={() => setOpen(false)} title="Delete?" footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button variant="danger" onClick={confirm}>Delete</Button></>}>\n  This can\'t be undone.\n</Modal>' }],
  },
  {
    pkg: "@plyxui/comps",
    importPath: "@plyxui/comps",
    name: "Dropdown",
    category: "comps",
    description: "Single-select popover. Click trigger, pick option, fires onChange.",
    platforms: ["web", "native"],
    source: "packages/comps/src/Dropdown/index.tsx",
    tokens: ["surfaceFill", "stroke"],
    props: [
      { name: "value", type: "string", required: false },
      { name: "onChange", type: "(value: string) => void", required: false },
      { name: "options", type: "DropdownOption[]", required: true },
      { name: "placeholder", type: "string", required: false },
    ],
    examples: [{ title: "Sort picker", code: '<Dropdown value={sort} onChange={setSort} options={[{ value: "new", label: "Newest" }, { value: "top", label: "Top" }]} />' }],
  },
  {
    pkg: "@plyxui/comps",
    importPath: "@plyxui/comps",
    name: "Tooltip",
    category: "comps",
    description: "Hover or focus a trigger to surface a short label. Auto-flips at viewport edges.",
    platforms: ["web"],
    source: "packages/comps/src/Tooltip/index.tsx",
    tokens: ["text", "surfaceFill"],
    props: [
      { name: "label", type: "ReactNode", required: true },
      { name: "children", type: "ReactElement", required: true, description: "A single trigger element." },
      { name: "side", type: '"top" | "bottom" | "left" | "right"', required: false },
      { name: "delay", type: "number", required: false },
    ],
    examples: [{ title: "Icon button tooltip", code: '<Tooltip label="Save">\n  <Button iconLeading={<Icon name="save" />} aria-label="Save" />\n</Tooltip>' }],
  },
  {
    pkg: "@plyxui/comps",
    importPath: "@plyxui/comps",
    name: "Tabs",
    category: "comps",
    description: "Composable Tabs / TabList / Tab / TabPanel. Arrow-key nav, ARIA roles wired.",
    platforms: ["web", "native"],
    source: "packages/comps/src/Tabs/index.tsx",
    tokens: ["text", "textMuted", "primaryOrange", "stroke"],
    props: [
      { name: "value", type: "string", required: true },
      { name: "onChange", type: "(next: string) => void", required: true },
      { name: "children", type: "ReactNode", required: true },
    ],
    examples: [{ title: "Three-tab switch", code: '<Tabs value={tab} onChange={setTab}>\n  <TabList>\n    <Tab value="overview">Overview</Tab>\n    <Tab value="usage">Usage</Tab>\n    <Tab value="props">Props</Tab>\n  </TabList>\n  <TabPanel value="overview">…</TabPanel>\n</Tabs>' }],
  },
  {
    pkg: "@plyxui/comps",
    importPath: "@plyxui/comps",
    name: "Toaster",
    category: "comps",
    description: "Renderer for the headless toast queue in @plyxui/hooks. Mount once near root.",
    platforms: ["web", "native"],
    source: "packages/comps/src/Toast/index.tsx",
    tokens: ["surfaceFill", "primaryOrange", "statusSuccess", "statusError"],
    props: [
      { name: "position", type: '"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"', required: false },
      { name: "offset", type: "number", required: false },
      { name: "max", type: "number", required: false },
    ],
    examples: [{ title: "App root", code: '<ToastProvider>\n  <Routes />\n  <Toaster position="bottom-right" />\n</ToastProvider>' }],
  },
  {
    pkg: "@plyxui/comps",
    importPath: "@plyxui/comps",
    name: "Drawer",
    category: "comps",
    description: "Side-anchored panel. Same controlled shape as Modal.",
    platforms: ["web", "native"],
    source: "packages/comps/src/Drawer/index.tsx",
    tokens: ["surfaceFill", "stroke"],
    props: [
      { name: "open", type: "boolean", required: true },
      { name: "onClose", type: "() => void", required: true },
      { name: "side", type: '"left" | "right" | "top" | "bottom"', required: false },
      { name: "size", type: "number | string", required: false },
    ],
    examples: [{ title: "Right-side settings", code: '<Drawer open={open} onClose={() => setOpen(false)} side="right" title="Settings">\n  …\n</Drawer>' }],
  },

  // ─── layouts ──────────────────────────────────────────────────
  {
    pkg: "@plyxui/layouts",
    importPath: "@plyxui/layouts",
    name: "AppShell",
    category: "comps",
    description: "Full-height shell: header + sidebar + main + footer slots.",
    platforms: ["web", "native"],
    source: "packages/layouts/src/AppShell/index.tsx",
    tokens: ["primaryFill", "stroke"],
    props: [
      { name: "header", type: "ReactNode", required: false },
      { name: "sidebar", type: "ReactNode", required: false },
      { name: "footer", type: "ReactNode", required: false },
      { name: "sidebarWidth", type: "number", required: false },
    ],
    examples: [{ title: "Classic chrome", code: '<AppShell header={<TitleBar />} sidebar={<Sidebar items={items} />}>\n  <Outlet />\n</AppShell>' }],
  },
  {
    pkg: "@plyxui/layouts",
    importPath: "@plyxui/layouts",
    name: "Sidebar",
    category: "comps",
    description: "Navigation column. Each item carries an icon, label, optional badge, click handler.",
    platforms: ["web", "native"],
    source: "packages/layouts/src/Sidebar/index.tsx",
    tokens: ["surfaceFill", "stroke", "text", "textMuted"],
    props: [
      { name: "items", type: "SidebarItem[]", required: true },
      { name: "header", type: "ReactNode", required: false },
      { name: "footer", type: "ReactNode", required: false },
    ],
    examples: [{ title: "Driven by routes", code: '<Sidebar items={routes.map(r => ({ label: r.title, icon: r.icon, active: r.path === pathname, onSelect: () => navigate(r.path) }))} />' }],
  },

  // ─── screens ──────────────────────────────────────────────────
  {
    pkg: "@plyxui/screens",
    importPath: "@plyxui/screens",
    name: "EmptyState",
    category: "comps",
    description: "Centered empty-state card: icon + headline + body + CTA.",
    platforms: ["web"],
    source: "packages/screens/src/EmptyState/index.tsx",
    tokens: ["surfaceFill", "textMuted"],
    props: [
      { name: "icon", type: "IconName | ReactNode", required: false },
      { name: "title", type: "ReactNode", required: true },
      { name: "body", type: "ReactNode", required: false },
      { name: "cta", type: "ReactNode", required: false },
    ],
    examples: [{ title: "No results", code: '<EmptyState icon="inbox" title="No messages yet" body="When someone writes you, it lands here." cta={<Button>Invite</Button>} />' }],
  },

  // ─── plugins ──────────────────────────────────────────────────
  {
    pkg: "@plyxui/plugins",
    importPath: "@plyxui/plugins",
    name: "CommandPalette",
    category: "comps",
    description: "Cmd+K launcher with substring search and keyboard navigation.",
    platforms: ["web"],
    source: "packages/plugins/src/CommandPalette/index.tsx",
    tokens: ["surfaceFill", "stroke", "text", "textMuted"],
    props: [
      { name: "items", type: "CommandItem[]", required: true },
      { name: "open", type: "boolean", required: true },
      { name: "onClose", type: "() => void", required: true },
      { name: "placeholder", type: "string", required: false },
    ],
    examples: [{ title: "Cmd+K", code: '<CommandPalette open={open} onClose={() => setOpen(false)} items={commands.map(c => ({ id: c.id, label: c.label, onSelect: c.run }))} />' }],
  },
];

export function summarize(entry: Entry): ComponentSummary {
  return {
    name: entry.name,
    category: entry.category,
    description: entry.description,
    platforms: entry.platforms,
  };
}

export function findComponent(name: string): Entry | undefined {
  const lower = name.toLowerCase();
  return COMPONENTS.find((c) => c.name.toLowerCase() === lower);
}

/** Word-overlap scoring. Cheap, deterministic, good enough for ~25 entries. */
export function searchComponents(query: string, limit = 10): Entry[] {
  const q = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (q.length === 0) return [];
  const scored = COMPONENTS.map((entry) => {
    const hay = `${entry.name} ${entry.description} ${entry.props.map((p) => p.name).join(" ")}`.toLowerCase();
    let score = 0;
    for (const term of q) {
      if (entry.name.toLowerCase() === term) score += 8;
      else if (entry.name.toLowerCase().includes(term)) score += 4;
      if (hay.includes(term)) score += 1;
    }
    return { entry, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((r) => r.entry);
}
