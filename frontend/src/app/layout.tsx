// @ts-ignore: global stylesheet is handled by Next.js
import "./globals.css";
import type { Metadata } from 'next';
import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/providers/ThemeProvider";
import RouteProgressBar from "@/components/layout/RouteProgressBar";
import { AuthProvider } from "@/context/AuthContext";
import { Modak, Tillana } from 'next/font/google';


const modak = Modak({
  weight: '400',
  subsets: ['latin', 'devanagari'],
  variable: '--font-modak',
});


const tillana = Tillana({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'devanagari'],
  variable: '--font-tillana',
});

export const metadata: Metadata = {
  title: "HamroBBA",
  description: "Learning resources platform for TU BBA students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  return (
    <html lang="en" className={`${modak.variable} ${tillana.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <GoogleOAuthProvider clientId={googleClientId}>
          <ThemeProvider>
            <AuthProvider>
              <Suspense fallback={null}>
                <RouteProgressBar />
              </Suspense>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </AuthProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
