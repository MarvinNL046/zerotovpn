import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";
import { getLocale } from "next-intl/server";
import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroToVPN",
  description: "Best VPN Reviews & Comparisons",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let locale = "en";
  try {
    locale = await getLocale();
  } catch {
    // Admin routes and non-locale routes default to "en"
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-66TC4XX08D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-66TC4XX08D');
          `}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {stackServerApp ? (
          <StackProvider app={stackServerApp as any}>
            <StackTheme>
              {children}
            </StackTheme>
          </StackProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
