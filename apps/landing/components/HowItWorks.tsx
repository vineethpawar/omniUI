export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <p className="eyebrow">The idea</p>
      <h2 className="h2">Three packages get you a working app. Two more get you a polished one.</h2>
      <p className="lead" style={{ marginBottom: 56 }}>
        Each package does one thing. Install only the layers you need. The MCP server is independent so the agent-friendly bits ship to anyone, not just plyxui users.
      </p>
      <div className="grid-3">
        {[
          {
            n: "01",
            title: "Foundation",
            body: "@plyxui/core, @plyxui/styles, @plyxui/primitives. Tokens, theming, the 9 primitives (Box, Text, Stack, Flex, Input, Button, Image, Divider, Spinner). Cross-platform.",
          },
          {
            n: "02",
            title: "Polish",
            body: "@plyxui/icons, @plyxui/layouts, @plyxui/forms, @plyxui/comps. Icon registry, AppShell + Sidebar, Field + Select + Checkbox + Radio, Modal + Dropdown + Tooltip + Tabs + Toaster + Drawer.",
          },
          {
            n: "03",
            title: "Agent layer",
            body: "@plyxui/mcp gives coding agents a structured handle on the library. List, describe, install, lint. No HTML scraping.",
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
