import Link from "next/link";

const CARDS = [
  {
    title: "Getting started",
    body: "Install, the 30-second example, and what to read next.",
    href: "/getting-started/",
  },
  {
    title: "Theming",
    body: "ThemeProvider, useTheme, module-augmentable tokens, runtime registration.",
    href: "/styles/provider/",
  },
  {
    title: "Primitives",
    body: "Box, Text, Stack, Flex, Input, Button. Web + native parity.",
    href: "/primitives/box/",
  },
  {
    title: "Icons",
    body: "Registry-based Icon component, the seed pack, codegen plans.",
    href: "/icons/icon/",
  },
  {
    title: "Layouts + Navigator",
    body: "AppShell, Sidebar, ScreenContainer + the router-agnostic adapter.",
    href: "/layouts/app-shell/",
  },
  {
    title: "MCP",
    body: "First-party MCP server. Coding agents install components by name.",
    href: "/mcp/overview/",
  },
];

export default function Home() {
  return (
    <>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--orange)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>
        Documentation
      </div>
      <h1>omniUI</h1>
      <p style={{ fontSize: 17, color: "var(--muted)" }}>
        Cross-platform component library that gets out of the way for humans and agents alike. React + React Native via .ts / .native.ts. Branded tokens, autocomplete-as-spec, first-party MCP.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginTop: 36 }}>
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              display: "block",
              padding: 20,
              borderRadius: 12,
              border: "1px solid var(--stroke)",
              background: "var(--surface)",
              transition: "border-color 0.2s ease",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
            <div style={{ fontSize: 13.5, color: "var(--muted)" }}>{c.body}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
