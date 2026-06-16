import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "omniUI releases",
  description: "Every published version of omniUI + AI Polish. Download builds, copy install commands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
