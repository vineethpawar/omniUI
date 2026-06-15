import type { Metadata } from "next";
import "./globals.css";

const DESCRIPTION =
  "Cross-platform component library. Per-package install. Branded tokens. First-party MCP. Web + native splits via .ts / .native.ts.";

export const metadata: Metadata = {
  title: "plyxui: cross-platform components for humans and agents",
  description: DESCRIPTION,
  metadataBase: new URL("https://plyxui.vercel.app"),
  openGraph: {
    title: "plyxui",
    description: DESCRIPTION,
    url: "https://plyxui.vercel.app",
    siteName: "plyxui",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "plyxui" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "plyxui",
    description: DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
