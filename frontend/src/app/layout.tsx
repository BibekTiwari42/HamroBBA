
// @ts-ignore: global stylesheet is handled by Next.js
import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "HamroBBA",
  description:
    "Learning resources platform for TU BBA students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}