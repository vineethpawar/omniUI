const QA = [
  {
    q: "Is this really cross-platform, or is it a web library with a native escape hatch?",
    a: "Single source tree, deliberate .ts / .native.ts splits per component. Metro resolves .native.tsx automatically. Web bundlers get the .tsx. Both share the same hooks, the same tokens, the same public API. The native variants aren't stubs; they're complete implementations using React Native's primitives.",
  },
  {
    q: "How does the MCP server actually help?",
    a: "Coding agents like Cursor and Claude Code rely on scraping HTML or reading READMEs. That's lossy. The omniUI MCP exposes the component library as structured data: list_components, describe_component (props, variants, examples), install_component, lint_usage. The agent never guesses at a prop name.",
  },
  {
    q: "Where does AI Polish fit in?",
    a: "AI Polish is a sibling project, not part of omniUI. It's a standalone desktop app that pairs nicely with the library: pick a project folder, paste your Anthropic key, hand the agent a Figma frame, every Write or Edit is held for Apply / Reject review. Lives at github.com/vineethpawar/ai-polish-desktop. You can use omniUI without it, and you can use it on any non-omniUI codebase.",
  },
  {
    q: "What if I don't want the agent layer?",
    a: "Don't install @omniui/mcp. The foundation packages have no agent code in them. The component library works without any of the agent-aware bits.",
  },
  {
    q: "Why not just use Tamagui?",
    a: "Tamagui is fantastic at the cross-platform problem and the compiler model is impressive. omniUI bets on a simpler runtime (no compiler), a typed token model that's friendlier for agents, and a first-party MCP. Pick the one that fits your team. They aren't directly competing.",
  },
  {
    q: "What does the remix layer cost?",
    a: "Free during the alpha. The remix backend will be hosted and the public sharing surface lands with 1.0. There will be a team tier with multi-user remix workspaces; the local + single-user flow stays free.",
  },
  {
    q: "Can I use it on a closed-source repo?",
    a: "Yes. The library is MIT. The MCP server runs locally and never phones home.",
  },
  {
    q: "When does 1.0 ship?",
    a: "The library 0.x track stabilizes through the next month. 1.0 lands when the docs are complete, the MCP handlers are real (not stubs), and the remix sharing surface is in beta. Targeting Q3 2026.",
  },
];

export default function Faq() {
  return (
    <section className="section" id="faq">
      <p className="eyebrow">FAQ</p>
      <h2 className="h2">The questions people ask first.</h2>
      <div style={{ marginTop: 40 }}>
        {QA.map((item, i) => (
          <details
            key={i}
            style={{
              borderBottom: "1px solid var(--stroke-soft)",
              padding: "18px 0",
              cursor: "pointer",
            }}
          >
            <summary
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--text)",
                listStyle: "none",
                position: "relative",
                paddingRight: 28,
              }}
            >
              {item.q}
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--orange)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 18,
                }}
              >
                +
              </span>
            </summary>
            <p className="muted" style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.7 }}>
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
