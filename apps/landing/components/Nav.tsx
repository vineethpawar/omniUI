"use client";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";

const LINKS: Array<{ href: string; label: string }> = [
  { href: "#how", label: "How" },
  { href: "#features", label: "Features" },
  { href: "#agent", label: "AI mode" },
  { href: "#remix", label: "Remix" },
  { href: "/docs/", label: "Docs" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close the menu on hash-link click and on resize-to-desktop
  useEffect(() => {
    if (!open) return;
    const closeOnAnchor = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.tagName === "A") setOpen(false);
    };
    const closeOnResize = () => {
      if (window.innerWidth >= 720) setOpen(false);
    };
    document.addEventListener("click", closeOnAnchor);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("click", closeOnAnchor);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open]);

  return (
    <div className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <BrandMark size={32} />
          <span className="nav-name">omniUI</span>
          <span className="nav-beta">BETA</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="muted nav-link">
              {l.label}
            </a>
          ))}
          <a href="#install" className="cta nav-cta">
            Get started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <div className="nav-panel" data-open={open}>
        <div className="nav-panel-inner">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-panel-link">
              {l.label}
            </a>
          ))}
          <a href="#install" className="cta" style={{ marginTop: 6 }}>
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}
