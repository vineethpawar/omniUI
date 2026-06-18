import type { Metadata } from "next";
import "./globals.css";

const DESCRIPTION =
  "Cross-platform component library. Per-package install. Branded tokens. First-party MCP. Web + native splits via .ts / .native.ts.";

export const metadata: Metadata = {
  title: "omniUI: cross-platform components for humans and agents",
  description: DESCRIPTION,
  metadataBase: new URL("https://omniui-one.vercel.app"),
  openGraph: {
    title: "omniUI",
    description: DESCRIPTION,
    url: "https://omniui-one.vercel.app",
    siteName: "omniUI",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "omniUI" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omniUI",
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
