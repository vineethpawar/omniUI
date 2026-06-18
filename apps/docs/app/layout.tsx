import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { OnThisPage } from "../components/OnThisPage";
import { CodeCopy } from "../components/CodeCopy";
import { getSidebar } from "../lib/mdx";

export const metadata: Metadata = {
  title: "omniUI docs",
  description: "Cross-platform component library. Per-package install. Agent-aware.",
  metadataBase: new URL("https://omniui-docs.vercel.app"),
  openGraph: {
    title: "omniUI docs",
    description: "Cross-platform component library. Per-package install. Agent-aware.",
    url: "https://omniui-docs.vercel.app",
    siteName: "omniUI",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "omniUI" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omniUI docs",
    description: "Cross-platform component library. Per-package install. Agent-aware.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sections = getSidebar();
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        {/* Resolve theme before paint to avoid the flash */}
        <Script id="omniui-theme-init" strategy="beforeInteractive">{`
          try {
            var t = localStorage.getItem('omniui-docs-theme');
            if (t === 'light' || t === 'dark') {
              document.documentElement.dataset.theme = t;
            }
          } catch (e) {}
        `}</Script>

        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <Sidebar sections={sections} />
            <main
              style={{
                flex: 1,
                minWidth: 0,
                overflowY: "auto",
                background: "var(--bg)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 48,
                  maxWidth: 1100,
                  margin: "0 auto",
                  padding: "48px 32px 120px",
                }}
              >
                <article className="doc" style={{ flex: 1, minWidth: 0, maxWidth: 720 }}>
                  {children}
                </article>
                <OnThisPage />
              </div>
            </main>
          </div>
        </div>
        <CodeCopy />
      </body>
    </html>
  );
}
