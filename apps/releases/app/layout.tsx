import type { Metadata } from "next";
import "./globals.css";

const DESCRIPTION =
  "Every published version of plyxui + AI Polish. Download builds, copy install commands.";

export const metadata: Metadata = {
  title: "plyxui releases",
  description: DESCRIPTION,
  metadataBase: new URL("https://plyxui-releases.vercel.app"),
  openGraph: {
    title: "plyxui releases",
    description: DESCRIPTION,
    url: "https://plyxui-releases.vercel.app",
    siteName: "plyxui",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "plyxui" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "plyxui releases",
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
