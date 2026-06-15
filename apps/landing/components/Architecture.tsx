export default function Architecture() {
  return (
    <section className="section">
      <p className="eyebrow">Under the hood</p>
      <h2 className="h2">A turborepo with intentional seams.</h2>
      <p className="lead" style={{ marginBottom: 32 }}>
        Each package is its own npm artifact. Each is small enough to read in an afternoon. Each ships on its own changeset cadence.
      </p>
      <pre className="codeblock" style={{ marginBottom: 32 }}>
{`omniUI/
├── apps/
│   ├── playground-web/      sandbox with the live primitives
│   ├── docs/                next.js + MDX docs site
│   └── landing/             this site
├── packages/
│   ├── core/                tokens, polymorphic types, hooks
│   ├── theme/               ThemeProvider, useTheme (web + native)
│   ├── primitives/          Box, Text, Stack, Flex, Input, Button
│   ├── icons/               Icon component + augmentable registry
│   ├── layouts/             AppShell, Sidebar, ScreenContainer
│   ├── navigator/           router-agnostic adapter
│   ├── comps/               Modal, Dropdown
│   └── mcp/                 first-party MCP server
├── turbo.json
└── tsconfig.base.json`}
      </pre>
      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>One source tree</h3>
          <p className="muted">
            Web components live in <span className="code">index.tsx</span>. Native variants live in <span className="code">index.native.tsx</span>. Metro resolves automatically. No runtime branching, no platform flag, no compiler magic.
          </p>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Augmentable types</h3>
          <p className="muted">
            Every interface that ships -- token names, icon names, route shapes -- is augmentable from userland. <span className="code">declare module</span> + a runtime register call, and your brand becomes part of the type surface.
          </p>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>cva for variants</h3>
          <p className="muted">
            class-variance-authority handles className composition. Small, no compiler, drops out of the way the moment a consumer wants their own CSS.
          </p>
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>No styled-components</h3>
          <p className="muted">
            Runtime CSS-in-JS is a hot loop in big design systems. omniUI uses the style prop + cva. Faster on cold start; cheaper to debug.
          </p>
        </div>
      </div>
    </section>
  );
}
