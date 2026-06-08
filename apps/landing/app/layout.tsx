import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "omniUI: cross-platform components for humans and agents.",
  description:
    "Branded tokens, first-party MCP, web + native splits via .ts / .native.ts. The component library that ships with its own AI tool.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
