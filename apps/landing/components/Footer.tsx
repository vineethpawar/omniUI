export default function Footer() {
  return (
    <footer>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: "linear-gradient(135deg, var(--orange), #FF8A3D)",
                boxShadow: "0 0 14px var(--orange-glow)",
              }}
            />
            <span style={{ fontWeight: 700 }}>omniUI</span>
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 13 }}>
            <a className="muted" href="/docs/">Docs</a>
            <a className="muted" href="#how">How</a>
            <a className="muted" href="#features">Features</a>
            <a className="muted" href="#agent">AI mode</a>
            <a className="muted" href="#faq">FAQ</a>
            <a className="muted" href="https://github.com/vineethpawar/omniUI">GitHub</a>
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 12 }}>
          MIT. Built late at night between full-time things. Reach out: @vineethp14 on most places.
        </div>
      </div>
    </footer>
  );
}
