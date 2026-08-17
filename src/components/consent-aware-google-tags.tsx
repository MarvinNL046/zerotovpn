"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const NON_PUBLIC_ROUTE = /^\/(?:admin|handler)(?:\/|$)/i;

/**
 * Keeps Google measurement off the separate operator/authentication surface.
 * Public pages start with every optional storage signal denied; a previously
 * saved Accept choice is applied before the Google configuration runs.
 */
export function ConsentAwareGoogleTags() {
  const pathname = usePathname();

  if (NON_PUBLIC_ROUTE.test(pathname)) return null;

  return (
    <>
      <Script id="google-consent-defaults" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_personalization: 'denied',
            ad_user_data: 'denied'
          });
          try {
            if (localStorage.getItem('cookie-consent') === 'accepted') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_personalization: 'granted',
                ad_user_data: 'granted'
              });
            }
          } catch {}
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
    </>
  );
}
