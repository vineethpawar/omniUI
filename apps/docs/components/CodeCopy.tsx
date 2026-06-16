"use client";
import { useEffect } from "react";

/**
 * Mounts copy-to-clipboard buttons on every <pre> in the page. Idempotent;
 * re-runs cleanly when the route changes.
 */
export function CodeCopy() {
  useEffect(() => {
    const pres = Array.from(document.querySelectorAll<HTMLPreElement>(".doc pre"));
    const cleanups: Array<() => void> = [];

    for (const pre of pres) {
      if (pre.dataset["copyMounted"] === "1") continue;
      pre.dataset["copyMounted"] = "1";
      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code");
      Object.assign(btn.style, {
        position: "absolute",
        top: "8px",
        right: "8px",
        padding: "2px 9px",
        fontSize: "11px",
        fontFamily: "inherit",
        fontWeight: "600",
        color: "var(--muted)",
        background: "var(--bg)",
        border: "1px solid var(--stroke)",
        borderRadius: "5px",
        cursor: "pointer",
        opacity: "0",
        transition: "opacity 0.15s",
      } as CSSStyleDeclaration);

      const show = () => (btn.style.opacity = "1");
      const hide = () => (btn.style.opacity = "0");
      pre.addEventListener("mouseenter", show);
      pre.addEventListener("mouseleave", hide);
      btn.addEventListener("focus", show);
      btn.addEventListener("blur", hide);

      const onClick = async () => {
        const text = pre.innerText;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "Copied";
          btn.style.color = "var(--orange)";
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.style.color = "var(--muted)";
          }, 1400);
        } catch {
          /* clipboard blocked, no-op */
        }
      };
      btn.addEventListener("click", onClick);
      pre.appendChild(btn);

      cleanups.push(() => {
        pre.removeEventListener("mouseenter", show);
        pre.removeEventListener("mouseleave", hide);
        btn.remove();
        delete pre.dataset["copyMounted"];
      });
    }

    return () => cleanups.forEach((c) => c());
  });

  return null;
}
