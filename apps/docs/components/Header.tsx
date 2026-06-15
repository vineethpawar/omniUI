"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        (window.localStorage.getItem("plyxui-docs-theme") as "dark" | "light" | null)) ||
      "dark";
    setTheme(stored);
    document.documentElement.dataset["theme"] = stored;
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset["theme"] = next;
    window.localStorage.setItem("plyxui-docs-theme", next);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(var(--bg-rgb, 10,10,10), 0.78)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--stroke-soft)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "14px 28px",
        }}
      >
        {/* Plain anchor (not next/link) so we bypass basePath and go to the
            landing root at plyxui.vercel.app/. When viewed via the docs
            subdomain directly, this still goes to "/" of that domain. */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandMark size={28} />
          <span style={{ fontWeight: 700, letterSpacing: "-0.01em", fontSize: 15 }}>plyxui docs</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "1px 6px",
              borderRadius: 4,
              color: "var(--muted)",
              border: "1px solid var(--stroke)",
              letterSpacing: "0.08em",
            }}
          >
            0.1
          </span>
        </a>
        <div style={{ flex: 1 }} />
        <a
          href="https://plyxui-releases.vercel.app/"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 13.5, color: "var(--muted)" }}
        >
          Releases
        </a>
        <a
          href="https://plyxui.vercel.app/"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 13.5, color: "var(--muted)" }}
        >
          Landing
        </a>
        <a
          href="https://github.com/vineethpawar/plyxui"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 13.5, color: "var(--muted)" }}
        >
          GitHub
        </a>
        <button
          onClick={toggle}
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          aria-label="Toggle theme"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--stroke)",
            color: "var(--text)",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
