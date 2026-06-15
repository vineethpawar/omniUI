const ITEMS = [
  { phase: "Shipping", what: "Tokens + theme + Box + Text + Stack + Flex + Input + Button (web + native)", done: true },
  { phase: "Shipping", what: "Icon registry + 20 seed icons + native variant", done: true },
  { phase: "Shipping", what: "AppShell + Sidebar + ScreenContainer", done: true },
  { phase: "Shipping", what: "Router-agnostic Navigator (react-router + react-navigation adapters)", done: true },
  { phase: "Shipping", what: "Modal + Dropdown (web first, native trailing)", done: true },
  { phase: "Shipping", what: "MDX docs site", done: true },
  { phase: "Next", what: "MCP server handlers + llms.txt at the docs root", done: false },
  { phase: "Next", what: "Tooltip, Tabs, Toast, Drawer", done: false },
  { phase: "Next", what: "Sandpack live previews per comp on the docs site", done: false },
  { phase: "Soon", what: "Theme remix backend + omniui.dev/r/<short-id> sharing", done: false },
  { phase: "Soon", what: "Sprite-sheet codegen for heavy icon users", done: false },
  { phase: "Soon", what: "Team mode: shared remix workspaces", done: false },
];

export default function Roadmap() {
  return (
    <section className="section">
      <p className="eyebrow">Where it's going</p>
      <h2 className="h2">A roadmap, not a wishlist.</h2>
      <p className="lead" style={{ marginBottom: 36 }}>
        Everything in Shipping is in the current branch. Next items land before 1.0. Soon is the post-launch slate.
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Phase</th>
            <th>What</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ITEMS.map((it, i) => (
            <tr key={i}>
              <td>
                <span
                  className="pill"
                  style={{
                    borderColor: it.done ? "#2EB872" : it.phase === "Next" ? "var(--orange)" : "var(--purple)",
                    color: it.done ? "#2EB872" : it.phase === "Next" ? "var(--orange)" : "var(--purple)",
                  }}
                >
                  {it.phase}
                </span>
              </td>
              <td>{it.what}</td>
              <td>{it.done ? "live" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
