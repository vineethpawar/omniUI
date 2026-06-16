"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarSection } from "../lib/mdx";

export function Sidebar({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  return (
    <aside
      style={{
        width: 248,
        flexShrink: 0,
        background: "var(--bg)",
        borderRight: "1px solid var(--stroke-soft)",
        padding: "32px 16px",
        overflowY: "auto",
        height: "calc(100vh - 56px)",
        position: "sticky",
        top: 56,
      }}
    >
      {sections.map((s) => (
        <div key={s.name} style={{ marginBottom: 22 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--dim)",
              padding: "0 10px 10px",
            }}
          >
            {sectionLabel(s.name)}
          </div>
          {s.entries.map((e) => {
            const href = `/${e.slug.join("/")}/`;
            const active = pathname === href;
            return (
              <Link
                key={e.slug.join("/")}
                href={href}
                style={{
                  display: "block",
                  padding: "5px 10px",
                  borderRadius: 6,
                  fontSize: 13.5,
                  color: active ? "var(--text)" : "var(--muted)",
                  fontWeight: active ? 600 : 400,
                  background: active ? "var(--surface)" : "transparent",
                  borderLeft: active
                    ? "2px solid var(--orange)"
                    : "2px solid transparent",
                  marginLeft: -2,
                  transition: "background 0.15s, color 0.15s, border-color 0.15s",
                }}
              >
                {e.title}
              </Link>
            );
          })}
        </div>
      ))}
      <div style={{ height: 60 }} />
    </aside>
  );
}

function sectionLabel(name: string): string {
  // Pretty-print section folder names: "getting-started" -> "Getting started"
  return name
    .split(/[-_]/)
    .map((p, i) => (i === 0 ? p[0]!.toUpperCase() + p.slice(1) : p))
    .join(" ");
}
