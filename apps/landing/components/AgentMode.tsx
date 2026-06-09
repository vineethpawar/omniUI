export default function AgentMode() {
  return (
    <section className="section" id="agent">
      <p className="eyebrow">Agent layer</p>
      <h2 className="h2">An MCP server. A desktop app. A point of view.</h2>
      <p className="lead" style={{ marginBottom: 32 }}>
        The component library is the foundation. The pieces that make it different are the agent-aware ones.
      </p>
      <div className="grid-2">
        <div className="card">
          <div className="pill" style={{ marginBottom: 14 }}>@omniui/mcp</div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>First-party MCP server</h3>
          <p className="muted" style={{ marginBottom: 14 }}>
            Coding agents talk to omniUI through a structured protocol instead of scraping HTML docs. Tools:
          </p>
          <ul style={{ paddingLeft: 18, color: "var(--muted)" }}>
            <li><span className="code">list_components</span> -- enumerate primitives, comps, layouts.</li>
            <li><span className="code">describe_component</span> -- props, variants, examples.</li>
            <li><span className="code">install_component</span> -- adds the right import + verifies the manifest.</li>
            <li><span className="code">lint_usage</span> -- catches drift from the design system in agent edits.</li>
          </ul>
        </div>
        <div className="card">
          <div className="pill" style={{ marginBottom: 14, borderColor: "var(--purple)", color: "var(--purple)" }}>
            Desktop app
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Paste Figma. Bring your key. Polish.</h3>
          <p className="muted" style={{ marginBottom: 14 }}>
            A bundled Electron app that sits next to your running app. Drop a Figma frame URL, paste your Anthropic key, and the agent edits your design system in place.
          </p>
          <ul style={{ paddingLeft: 18, color: "var(--muted)" }}>
            <li>Trigger your way: keyboard shortcut, button on screen, context menu, sidebar tab.</li>
            <li>Apply or Reject every write before it commits.</li>
            <li>Allowlisted paths. Your repo, your guardrails.</li>
            <li>Bring your own keys. Your code never leaves your machine.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
