export default function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
        paddingBottom: 60,
      }}
    >
      <div className="hero-bg" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div className="pill" style={{ marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, background: "var(--orange)", borderRadius: "50%" }} />
          Cross-platform. Agent-aware. Yours to remix.
        </div>
        <h1 className="h1" style={{ maxWidth: 880, margin: "0 auto 24px" }}>
          One component library.<br />
          <span className="accent">Web, native, electron.</span><br />
          Per-package install, agent-aware.
        </h1>
        <p className="lead" style={{ margin: "0 auto 32px", maxWidth: 640 }}>
          omniUI is a typed, branded, cross-platform component library. Same source tree for React and React Native via .ts and .native.ts splits. Install only the packages you need: primitives, styles, icons, layouts, navigator. First-party MCP server so coding agents pick components by name.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#install" className="cta">Get the alpha</a>
          <a href="/docs/" className="cta-secondary">Read the docs</a>
        </div>
        <div
          style={{
            marginTop: 28,
            display: "inline-flex",
            gap: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--muted)",
            background: "var(--surface)",
            border: "1px solid var(--stroke)",
            borderRadius: 8,
            padding: "10px 16px",
          }}
        >
          <span className="accent">$</span>
          <span>npm install @omniui/core @omniui/styles @omniui/primitives</span>
        </div>
      </div>

      <div
        style={{
          maxWidth: 920,
          margin: "56px auto 0",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--stroke)",
            borderRadius: 14,
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 14px",
              borderBottom: "1px solid var(--stroke)",
              background: "var(--elev)",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
            <span style={{ marginLeft: 12, color: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)" }}>
              app.tsx
            </span>
          </div>
          <pre className="codeblock" style={{ borderRadius: 0, border: "none", margin: 0, padding: "20px 24px" }}>
{`import { ThemeProvider } from "@omniui/styles";
import { Box, Text, Button } from "@omniui/primitives";
import { Icon } from "@omniui/icons";

export default function App() {
  return (
    <ThemeProvider>
      <Box surface="primary" padding="lg">
        <Text size="2xl" weight="bold">Hello.</Text>
        <Button iconLeading={<Icon name="plus" />}>
          New session
        </Button>
      </Box>
    </ThemeProvider>
  );
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}
