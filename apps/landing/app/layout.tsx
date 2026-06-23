import type { Metadata } from "next";
import "./globals.css";

const DESCRIPTION =
  "Cross-platform component library. Per-package install. Branded tokens. First-party MCP. Web + native splits via .ts / .native.ts.";

// OG card is a hand-authored SVG (and a PNG fallback) in public/ —
// static export mode means we can't lean on Next's ImageResponse here.
export const metadata: Metadata = {
  title: "plyxui: cross-platform components for humans and agents",
  description: DESCRIPTION,
  metadataBase: new URL("https://plyxui.com"),
  openGraph: {
    title: "plyxui",
    description: DESCRIPTION,
    url: "https://plyxui.com",
    siteName: "plyxui",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "plyxui" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "plyxui",
    description: DESCRIPTION,
    creator: "@vineethp14",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
