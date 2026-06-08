export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <p className="eyebrow">The idea</p>
      <h2 className="h2">Three packages get you a working app. Two more get you a polished one.</h2>
      <p className="lead" style={{ marginBottom: 56 }}>
        Each package does one thing. Install only the layers you need. The MCP server is independent so the agent-friendly bits ship to anyone, not just omniUI users.
      </p>
      <div className="grid-3">
        {[
          {
            n: "01",
            title: "Foundation",
            body: "@omniui/core, @omniui/theme, @omniui/primitives. Tokens, theming, Box, Text, Stack, Flex, Input, Button. Cross-platform.",
          },
          {
            n: "02",
            title: "Polish",
            body: "@omniui/icons, @omniui/comps, @omniui/layouts. The icon registry, Modal, Dropdown, AppShell, Sidebar, ScreenContainer.",
          },
          {
            n: "03",
            title: "Agent layer",
            body: "@omniui/mcp + the AI desktop app. Coding agents install components by name. Designers paste a Figma link and tweak.",
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
    </section>
  );
}
