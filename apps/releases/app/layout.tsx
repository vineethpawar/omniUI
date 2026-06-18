import type { Metadata } from "next";
import "./globals.css";

const DESCRIPTION =
  "Every published version of omniUI + AI Polish. Download builds, copy install commands.";

export const metadata: Metadata = {
  title: "omniUI releases",
  description: DESCRIPTION,
  metadataBase: new URL("https://omniui-releases.vercel.app"),
  openGraph: {
    title: "omniUI releases",
    description: DESCRIPTION,
    url: "https://omniui-releases.vercel.app",
    siteName: "omniUI",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "omniUI" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omniUI releases",
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
