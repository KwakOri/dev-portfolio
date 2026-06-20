import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CINE-FOLIO",
  description: "A cinema-inspired multilingual portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
