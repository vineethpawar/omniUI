export default function AgentMode() {
  return (
    <section className="section" id="agent">
      <p className="eyebrow">Agent layer</p>
      <h2 className="h2">A first-party MCP server.</h2>
      <p className="lead" style={{ marginBottom: 32 }}>
        Coding agents talk to omniUI through a structured protocol instead of scraping HTML docs. The library and the agent pull from the same source.
      </p>
      <div className="grid-2">
        <div className="card">
          <div className="pill" style={{ marginBottom: 14 }}>@omniui/mcp</div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>The tools</h3>
          <ul style={{ paddingLeft: 18, color: "var(--muted)" }}>
            <li><span className="code">list_components</span> -- enumerate primitives, comps, layouts.</li>
            <li><span className="code">describe_component</span> -- props, variants, examples.</li>
            <li><span className="code">install_component</span> -- adds the right import + verifies the manifest.</li>
            <li><span className="code">lint_usage</span> -- catches drift from the design system in agent edits.</li>
          </ul>
        </div>
        <div className="card">
          <div className="pill" style={{ marginBottom: 14, borderColor: "var(--purple)", color: "var(--purple)" }}>
            See also
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>AI Polish</h3>
          <p className="muted" style={{ marginBottom: 14 }}>
            A sibling project: a standalone desktop app that pairs nicely with omniUI. Pick a project folder, paste your Anthropic key, hand the agent a Figma frame. Every <span className="code">Write</span> or <span className="code">Edit</span> is held for Apply / Reject review before it touches a file.
          </p>
          <p className="muted" style={{ marginBottom: 0 }}>
            Repo:{" "}
            <a href="https://github.com/vineethpawar/ai-polish-desktop" style={{ color: "var(--orange)" }}>
              github.com/vineethpawar/ai-polish-desktop
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
