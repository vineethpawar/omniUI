"use client";
import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Pull all h2 / h3 in the doc article and slugify
    const article = document.querySelector("article.doc") || document.querySelector(".doc");
    if (!article) return;
    const found: Heading[] = [];
    article.querySelectorAll<HTMLHeadingElement>("h2, h3").forEach((el) => {
      const text = el.textContent?.trim() ?? "";
      if (!text) return;
      const id =
        el.id ||
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
      if (!el.id) el.id = id;
      found.push({ id, text, level: Number(el.tagName.substring(1)) });
    });
    setHeadings(found);

    // Scroll spy
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    article
      .querySelectorAll<HTMLHeadingElement>("h2, h3")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside
      style={{
        position: "sticky",
        top: 84,
        alignSelf: "flex-start",
        width: 220,
        flexShrink: 0,
        padding: "8px 0",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--dim)",
          marginBottom: 10,
        }}
      >
        On this page
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {headings.map((h) => (
          <li key={h.id} style={{ marginBottom: 4, paddingLeft: h.level === 3 ? 12 : 0 }}>
            <a
              href={`#${h.id}`}
              style={{
                display: "block",
                padding: "4px 8px",
                fontSize: 12.5,
                color: active === h.id ? "var(--orange)" : "var(--muted)",
                borderLeft: active === h.id ? "2px solid var(--orange)" : "2px solid transparent",
                marginLeft: -10,
                transition: "color 0.15s, border-color 0.15s",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
