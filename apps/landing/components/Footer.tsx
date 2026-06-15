import { BrandMark } from "./BrandMark";

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
            <BrandMark size={28} />
            <span style={{ fontWeight: 700 }}>plyxui</span>
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 13 }}>
            <a className="muted" href="/docs/">Docs</a>
            <a className="muted" href="#how">How</a>
            <a className="muted" href="#features">Features</a>
            <a className="muted" href="#agent">AI mode</a>
            <a className="muted" href="#faq">FAQ</a>
            <a className="muted" href="https://github.com/vineethpawar/plyxui">GitHub</a>
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 12 }}>
          Built with{" "}
          <span aria-label="love" role="img" style={{ color: "var(--orange)" }}>❤️</span>{" "}
          by{" "}
          <a
            href="https://github.com/vineethpawar"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--orange)", textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            vineethpawar
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
