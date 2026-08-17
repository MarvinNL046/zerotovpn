"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { COOKIE_CONSENT_CHANGE_EVENT } from "@/components/cookie-consent";

const EDITORIAL_DETAIL_PATH =
  /^\/(?:[a-z]{2}\/)?(?:blog|reviews|compare|best|countries|guides)\/[^/]+\/?$/i;

export function PerformanceAwareAdSense() {
  const pathname = usePathname();
  const [hasAdConsent, setHasAdConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setHasAdConsent(localStorage.getItem("cookie-consent") === "accepted");
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "cookie-consent") syncConsent();
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Keep local development and screenshot QA deterministic. Production keeps
  // the normal ad loader on editorial routes.
  if (process.env.NODE_ENV !== "production") return null;

  // Ads load only beside long-form editorial detail pages. Trust, policy,
  // account, directory and interactive-tool routes stay free of ad requests.
  if (!EDITORIAL_DETAIL_PATH.test(pathname)) return null;

  if (!hasAdConsent) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9667530069853985"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
