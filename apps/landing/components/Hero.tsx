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
          <span className="accent">Web, native, VS Code.</span><br />
          Per-package install, agent-aware.
        </h1>
        <p className="lead" style={{ margin: "0 auto 32px", maxWidth: 640 }}>
          plyxui is a typed, branded, cross-platform component library. Same source tree for React and React Native via .ts and .native.ts splits. Install only the packages you need: primitives, styles, icons, layouts, navigator. First-party MCP server so coding agents pick components by name.
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
          <span>npm install @plyxui/core @plyxui/styles @plyxui/primitives</span>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1080,
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
            <span
              style={{
                marginLeft: 12,
                color: "var(--muted)",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#28C840",
                  boxShadow: "0 0 0 3px rgba(40,200,64,0.18)",
                }}
                aria-hidden
              />
              live · plyxui dashboard demo
            </span>
            <a
              href="https://stackblitz.com/github/vineethpawar/plyxui-demo"
              target="_blank"
              rel="noopener"
              style={{
                marginLeft: "auto",
                color: "var(--muted)",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                textDecoration: "none",
              }}
            >
              Open in StackBlitz →
            </a>
          </div>
          <div style={{ position: "relative", paddingTop: "62%", background: "var(--bg)" }}>
            {/* Live, interactive dashboard built with @plyxui/*. WebContainer
                boots npm install + vite dev in the browser; what visitors see
                here IS the package, not a screenshot. ~12-15s cold boot the
                first time. */}
            <iframe
              src="https://stackblitz.com/github/vineethpawar/plyxui-demo?embed=1&file=src/App.tsx&hideNavigation=1&theme=light&view=preview&ctl=0"
              title="plyxui dashboard demo"
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: 14,
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          What you're seeing is the live StackBlitz boot of <a href="https://github.com/vineethpawar/plyxui-demo" target="_blank" rel="noopener">plyxui-demo</a> —
          one Vite app, no monorepo, every component from <code>@plyxui/*</code>. Native sibling on <a href="https://snack.expo.dev/rxtGc5Lls8OUbbmv2_RhK" target="_blank" rel="noopener">Expo Snack</a>.
        </p>
      </div>
    </section>
  );
}
