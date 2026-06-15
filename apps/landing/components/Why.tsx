export default function Why() {
  return (
    <section className="section">
      <p className="eyebrow">Why this exists</p>
      <h2 className="h2">Modern apps want three things from a UI library. Most pick one.</h2>
      <p className="lead" style={{ marginBottom: 40 }}>
        After shipping a few production apps on top of shadcn + Radix + bespoke Electron chrome, the same gaps showed up every time.
      </p>
      <div className="grid-3">
        {[
          {
            title: "Cross-platform is hard.",
            body: "The same components get rewritten for web, Electron, and React Native. Three branches drift. omniUI ships one tree with .ts and .native.ts splits, so the platform-specific code is bounded and the public API is identical.",
          },
          {
            title: "Tokens become strings.",
            body: "Big design systems lose autocomplete on token names, variants, and icons. omniUI tokens are interfaces, augmentable from userland. Names extend; types follow.",
          },
          {
            title: "Coding agents misimplement.",
            body: "Cursor and Claude Code scrape docs and guess. omniUI ships a first-party MCP server so agents list, search, install, and lint components conversationally. The agent and the dev pull from the same source.",
          },
        ].map((c) => (
          <div key={c.title} className="card">
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{c.title}</h3>
            <p className="muted">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
