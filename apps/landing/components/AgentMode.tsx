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
          <a
            href="https://github.com/vineethpawar/ai-polish-desktop"
            target="_blank"
            rel="noreferrer"
            aria-label="ai-polish-desktop on GitHub"
            title="ai-polish-desktop on GitHub"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--stroke)",
              color: "var(--muted)",
              transition: "color 0.15s ease, border-color 0.15s ease, background 0.15s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.18-.02-2.13-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.98 0 1.98.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
