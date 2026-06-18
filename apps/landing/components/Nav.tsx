import { BrandMark } from "./BrandMark";

export default function Nav() {
  return (
    <div className="nav">
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandMark size={26} />
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>omniUI</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 999,
              border: "1px solid var(--stroke)",
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            BETA
          </span>
        </a>
        <div style={{ flex: 1 }} />
        <a href="#how" className="muted" style={{ fontSize: 14, fontWeight: 500 }}>How</a>
        <a href="#features" className="muted" style={{ fontSize: 14, fontWeight: 500 }}>Features</a>
        <a href="#agent" className="muted" style={{ fontSize: 14, fontWeight: 500 }}>AI mode</a>
        <a href="#remix" className="muted" style={{ fontSize: 14, fontWeight: 500 }}>Remix</a>
        <a href="/docs/" className="muted" style={{ fontSize: 14, fontWeight: 500 }}>Docs</a>
        <a href="#install" className="cta" style={{ padding: "8px 16px", fontSize: 13 }}>
          Get started
        </a>
      </div>
    </div>
  );
}
