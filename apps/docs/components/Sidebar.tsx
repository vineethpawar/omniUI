"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SidebarSection } from "../lib/mdx";

export function Sidebar({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change, on Escape, and on resize-up to desktop
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onResize = () => { if (window.innerWidth >= 900) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Mobile open button — pinned bottom-left so it never overlaps the chrome */}
      <button
        className="sidebar-toggle"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
        <span>Menu</span>
      </button>

      {/* Backdrop */}
      <div
        className="sidebar-backdrop"
        data-open={open}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside className="sidebar" data-open={open}>
        <div className="sidebar-mobile-header">
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Navigation
          </span>
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            style={{
              background: "transparent",
              border: "1px solid var(--stroke)",
              color: "var(--text)",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 13,
            }}
          >
            ✕
          </button>
        </div>

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
                    borderLeft: active ? "2px solid var(--orange)" : "2px solid transparent",
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
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function sectionLabel(name: string): string {
  return name
    .split(/[-_]/)
    .map((p, i) => (i === 0 ? (p[0] ?? "").toUpperCase() + p.slice(1) : p))
    .join(" ");
}
