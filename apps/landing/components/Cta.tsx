export default function Cta() {
  return (
    <section className="section">
      <div
        style={{
          background: "radial-gradient(ellipse 800px 500px at 50% 50%, var(--orange-soft), transparent 70%), var(--surface)",
          border: "1px solid var(--orange)",
          borderRadius: 20,
          padding: "64px 36px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="pill" style={{ marginBottom: 20 }}>
          Free alpha. BYOK. macOS. Windows. Linux.
        </div>
        <h2 className="h2" style={{ margin: "0 auto 18px", maxWidth: 720 }}>
          Stop rewriting components three times.
        </h2>
        <p className="lead" style={{ margin: "0 auto 32px", maxWidth: 600 }}>
          Install the foundation. Try one screen. Decide if the agent-aware bits are for you.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://github.com/vineethpawar/omniUI" className="cta">View on GitHub</a>
          <a href="https://omniui-docs.vercel.app" className="cta-secondary">Read the docs</a>
        </div>
      </div>
    </section>
  );
}
