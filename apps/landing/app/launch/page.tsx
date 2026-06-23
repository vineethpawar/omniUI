import type { Metadata } from "next";

const DESC =
  "plyxui is a cross-platform React + React Native component library with a first-party MCP server. 11 packages, pre-bundled dist, full TS intellisense, live Sandpack docs.";

export const metadata: Metadata = {
  title: "plyxui — launched on Product Hunt",
  description: DESC,
  alternates: { canonical: "https://plyxui.com/launch" },
  openGraph: {
    title: "plyxui — launched on Product Hunt",
    description: DESC,
    url: "https://plyxui.com/launch",
    type: "website",
  },
};

export default function LaunchPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "96px 24px 56px" }}>
        <div className="hero-bg" aria-hidden />
        <div style={{ position: "relative", maxWidth: 880, margin: "0 auto", textAlign: "center", zIndex: 1 }}>
          <div className="pill" style={{ marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, background: "var(--orange)", borderRadius: "50%" }} />
            Live on Product Hunt today
          </div>

          <h1 className="h1" style={{ maxWidth: 760, margin: "0 auto 20px" }}>
            One component library.<br />
            <span className="accent">Web, native, agent-aware.</span>
          </h1>
          <p className="lead" style={{ margin: "0 auto 32px", maxWidth: 600 }}>
            React + React Native from one source tree. First-party MCP server so coding agents
            install components by name. Every doc page is a live Sandpack editor.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://www.producthunt.com/posts/plyxui"
              target="_blank"
              rel="noopener"
              className="cta"
            >
              👋 Upvote on Product Hunt
            </a>
            <a href="https://plyxui.com/docs/" className="cta-secondary">
              Read the docs
            </a>
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
      </section>

      {/* ─── Live embed ───────────────────────────────────────── */}
      <section style={{ padding: "0 24px 56px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
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
                />
                live · plyxui dashboard
              </span>
            </div>
            <div style={{ position: "relative", paddingTop: "62%", background: "var(--bg)" }}>
              <iframe
                src="https://stackblitz.com/github/vineethpawar/plyxui-demo?embed=1&file=src/App.tsx&hideNavigation=1&theme=light&view=preview&ctl=0"
                title="plyxui dashboard demo"
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Three reasons ───────────────────────────────────── */}
      <section style={{ padding: "32px 24px 96px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p className="eyebrow" style={{ textAlign: "center", marginBottom: 8 }}>
            Three reasons to upvote
          </p>
          <h2 className="h2" style={{ textAlign: "center", marginBottom: 48 }}>
            What's actually different.
          </h2>
          <div className="grid-3">
            {[
              {
                n: "01",
                title: "Same source tree, web + native",
                body:
                  "Every primitive ships .ts + .native.tsx. Metro picks the right one automatically. No fork between web and mobile teams.",
              },
              {
                n: "02",
                title: "First-party MCP server",
                body:
                  "Drop npx -y @plyxui/mcp into Claude Desktop / Cursor / Cline / Continue. The agent gets list / get / search / install / lint over stdio. The only DS that ships this.",
              },
              {
                n: "03",
                title: "Live, edit-on-the-page docs",
                body:
                  "Every component page opens a real Sandpack editor. Change a prop, see the result, fork it. The library on the docs IS the library you install.",
              },
            ].map((s) => (
              <div key={s.n} className="card">
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--orange)",
                    marginBottom: 12,
                    fontWeight: 700,
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                <p className="muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sandbox CTAs ────────────────────────────────────── */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>Play with it</p>
          <h2 className="h2" style={{ marginBottom: 32 }}>Three ways in.</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <a className="cta" href="https://stackblitz.com/github/vineethpawar/plyxui-demo" target="_blank" rel="noopener">
              Web demo on StackBlitz
            </a>
            <a className="cta-secondary" href="https://snack.expo.dev/rxtGc5Lls8OUbbmv2_RhK" target="_blank" rel="noopener">
              Native demo on Expo Snack
            </a>
            <a className="cta-secondary" href="https://plyxui.com/docs/primitives/box/">
              Live docs preview
            </a>
          </div>

          <p className="muted" style={{ marginTop: 32, maxWidth: 600, margin: "32px auto 0" }}>
            Free. MIT. Built between full-time things. If something's missing,{" "}
            <a href="https://github.com/vineethpawar/plyxui/issues/new" target="_blank" rel="noopener">
              open an issue
            </a>
            {" "}— most "missing" things turn out to be doc gaps, not missing primitives.
          </p>
        </div>
      </section>
    </main>
  );
}
