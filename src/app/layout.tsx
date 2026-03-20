import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";
import { getLocale } from "next-intl/server";
import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zerotovpn.com"),
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
  type StackProviderApp = NonNullable<React.ComponentProps<typeof StackProvider>["app"]>;
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
        <Script id="google-consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_personalization: 'denied',
              ad_user_data: 'denied',
              wait_for_update: 500
            });
            var cc = localStorage.getItem('cookie-consent');
            if (cc === 'accepted') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_personalization: 'granted',
                ad_user_data: 'granted'
              });
            }
          `}
        </Script>
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9667530069853985"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {stackServerApp ? (
          <StackProvider app={stackServerApp as unknown as StackProviderApp}>
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
