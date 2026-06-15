export default function Remix() {
  return (
    <section className="section" id="remix">
      <p className="eyebrow">The remix layer</p>
      <h2 className="h2">Themes are remixable. Sharing is one link.</h2>
      <p className="lead" style={{ marginBottom: 32 }}>
        Tokens are the primary unit. Component variant overrides are the secondary unit. Bundle both and you have a remix: a complete look that drops into another app's ThemeProvider with one line.
      </p>
      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>What a remix is</h3>
          <pre className="codeblock" style={{ margin: 0 }}>
{`{
  "name": "Warm October",
  "tokens": {
    "primaryOrange": { "light": "#FF7A30", "dark": "#FFA260" },
    "primaryFill":   { "light": "#FFF7EE", "dark": "#1A0F08" }
  },
  "overrides": {
    "Button": { "primary": { "borderRadius": "pill" } }
  }
}`}
          </pre>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>How sharing works</h3>
          <p className="muted" style={{ marginBottom: 14 }}>
            Publish a remix and you get a stable link. Anyone running omniUI can apply it with a single prop:
          </p>
          <pre className="codeblock" style={{ margin: 0 }}>
{`<ThemeProvider remixUrl="https://omniui.dev/r/warm-oct" />`}
          </pre>
          <p className="muted" style={{ marginTop: 14 }}>
            Creators can lock a remix (always pull the latest) or open it (consumers can fork and tweak locally). The sharing surface is built on uiverse-style discovery; the consumer experience is one line.
          </p>
        </div>
      </div>
      <p className="muted" style={{ marginTop: 24, fontSize: 14 }}>
        The remix backend is the next milestone. Today, remixes work as local json bundles; the public sharing surface lands with 1.0.
      </p>
    </section>
  );
}
