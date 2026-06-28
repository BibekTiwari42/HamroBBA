// @ts-ignore: global stylesheet is handled by Next.js
import "./globals.css";
import type { Metadata } from 'next';
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "HamroBBA",
  description: "Learning resources platform for TU BBA students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Added global background, text colors, and smooth transition properties here */}
      <body className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}