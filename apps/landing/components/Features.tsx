const FEATURES = [
  { title: "Branded tokens", body: "Tokens are interfaces, not enums. Augment from userland; the rest of the library autocompletes against your brand." },
  { title: "Polymorphic Box", body: "as=button, as=a, as=anything. Native attributes type-check. Works exactly as you expect." },
  { title: ".ts / .native.ts splits", body: "Metro picks native, Webpack/Vite/Next/Electron pick web. Same public API, sane platform-specific internals." },
  { title: "VS Code webview-ready", body: "@plyxui/vscode auto-themes to the IDE — light, dark, both high-contrast variants. Components inherit the user's active editor accent. CSP-safe." },
  { title: "Icon registry", body: "Names autocomplete, names extend. Built around a typed registry, not per-file imports." },
  { title: "Router-agnostic", body: "defineRoutes() once, render with the react-router or react-navigation adapter. Same routes table powers Sidebar + tabs." },
  { title: "Layouts that compose", body: "AppShell, Sidebar, ScreenContainer. No router opinion. Drop in anywhere." },
  { title: "Modal and Dropdown", body: "Web uses the native <dialog>. Dropdown is keyboard-aware. Native ports trail by a small margin and are catching up fast." },
  { title: "First-party MCP", body: "@plyxui/mcp gives coding agents a structured handle on the library. List, search, install, lint without scraping HTML." },
  { title: "OS theme follow", body: "ThemeProvider follows prefers-color-scheme until the user explicitly picks. Then it stops listening, by design." },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <p className="eyebrow">What's in the box</p>
      <h2 className="h2">Ten choices the next library you reach for probably didn't make.</h2>
      <p className="lead" style={{ marginBottom: 48 }}>
        Each of these is shipping in the alpha. Not the roadmap.
      </p>
      <div className="grid-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card">
            <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</h3>
            <p className="muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
