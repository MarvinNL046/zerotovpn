import { getLocale } from "next-intl/server";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import type { Metadata } from "next";
import { PerformanceAwareAdSense } from "@/components/performance-aware-adsense";
import { ConsentAwareGoogleTags } from "@/components/consent-aware-google-tags";
import "./globals.css";

// Tot nu toe laadde de site géén enkel font: --font-sans verwees naar een
// variabele die nergens werd gezet, dus alles viel terug op de systeem-UI-font.
//
// IBM Plex Sans voor tekst, IBM Plex Mono voor meetwaarden. Die tweede is geen
// sier: snelheden, prijzen en scores staan in tabellen, en cijfers met vaste
// breedte lijnen daar netjes onder elkaar uit. Het past ook bij wat de site
// claimt te zijn — onafhankelijk meten in plaats van nog een neon-VPN-site.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zerotovpn.com"),
  title: "ZeroToVPN",
  description: "Best VPN Reviews & Comparisons",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#071226" />
        <style id="global-focus-ring">{`
          :focus-visible {
            outline: 3px solid #1268f3 !important;
            outline-offset: 3px !important;
          }
          html.dark :focus-visible {
            outline-color: #b8e34a !important;
          }
        `}</style>
        <ConsentAwareGoogleTags />
        <PerformanceAwareAdSense />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
