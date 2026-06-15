import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";
import { getSidebar } from "../lib/mdx";

export const metadata: Metadata = {
  title: "omniUI docs",
  description: "Cross-platform component library that gets out of the way for humans and agents alike.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sections = getSidebar();
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <Sidebar sections={sections} />
          <main
            style={{
              flex: 1,
              minWidth: 0,
              overflowY: "auto",
              padding: "0 48px",
              background: "var(--bg)",
            }}
          >
            <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 0 120px" }} className="doc">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
