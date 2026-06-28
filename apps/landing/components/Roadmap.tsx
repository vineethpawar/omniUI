const ITEMS = [
  { phase: "Shipping", what: "Tokens + theme + 9 primitives (Box, Text, Stack, Flex, Input, Button, Image, Divider, Spinner) on web + native", done: true },
  { phase: "Shipping", what: "Icon registry + seed pack + native SVG variant", done: true },
  { phase: "Shipping", what: "AppShell + Sidebar + ScreenContainer", done: true },
  { phase: "Shipping", what: "Forms: Field, Select, Checkbox, Radio + RadioGroup", done: true },
  { phase: "Shipping", what: "Router-agnostic Navigator (react-router + react-navigation adapters)", done: true },
  { phase: "Shipping", what: "Comps: Modal, Dropdown, Tooltip, Tabs, Toaster, Drawer", done: true },
  { phase: "Shipping", what: "Screens: AuthLayout, EmptyState, ErrorScreen", done: true },
  { phase: "Shipping", what: "Plugins: CommandPalette (Cmd+K launcher)", done: true },
  { phase: "Shipping", what: "tsup builds — pre-bundled dist + full TS intellisense", done: true },
  { phase: "Shipping", what: "Live playgrounds: StackBlitz (web) + Expo Snack (native)", done: true },
  { phase: "Shipping", what: "MDX docs site + changesets-based npm release pipeline", done: true },
  { phase: "Shipping", what: "First-party MCP server (@plyxui/mcp) — list, search, get, install, lint, examples over stdio", done: true },
  { phase: "Shipping", what: "llms.txt at plyxui.com root — structured agent pointer", done: true },
  { phase: "Shipping", what: "Sandpack live previews on every component doc page", done: true },
  { phase: "Shipping", what: "VS Code webview adapter (@plyxui/vscode) — auto-themes to the IDE, hooks for the VS Code API + message channel", done: true },
  { phase: "Next", what: "Theme remix backend + plyxui.dev/r/<short-id> sharing", done: false },
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
