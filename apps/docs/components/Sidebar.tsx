import Link from "next/link";
import type { SidebarSection } from "../lib/mdx";

export function Sidebar({ sections }: { sections: SidebarSection[] }) {
  return (
    <aside
      style={{
        width: 260,
        flexShrink: 0,
        background: "var(--bg)",
        borderRight: "1px solid var(--stroke-soft)",
        padding: "28px 18px",
        overflowY: "auto",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 28,
          padding: "0 8px",
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: "linear-gradient(135deg, var(--orange), #FF8A3D)",
            boxShadow: "0 0 14px rgba(255,92,0,0.4)",
          }}
        />
        <span style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>omniUI</span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: 6,
            color: "var(--muted)",
            border: "1px solid var(--stroke)",
          }}
        >
          0.0
        </span>
      </Link>
      {sections.map((s) => (
        <div key={s.name} style={{ marginBottom: 22 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--dim)",
              padding: "0 8px 8px",
            }}
          >
            {s.name.replace(/-/g, " ")}
          </div>
          {s.entries.map((e) => (
            <Link
              key={e.slug.join("/")}
              href={`/${e.slug.join("/")}/`}
              style={{
                display: "block",
                padding: "6px 8px",
                borderRadius: 6,
                fontSize: 13.5,
                color: "var(--muted)",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              {e.title}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
