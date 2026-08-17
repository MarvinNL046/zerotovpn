"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const COOKIE_CONSENT_CHANGE_EVENT = "zerotovpn:cookie-consent-change";

export function CookieConsent() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale === "nl" ? "nl" : "en";
  const copy =
    locale === "nl"
      ? {
          label: "Cookievoorkeuren",
          body: "We vragen toestemming voor optionele opslag voor statistieken en advertenties. Zonder akkoord blijft die opslag uit.",
          policy: "Cookiebeleid",
          reject: "Weigeren",
          accept: "Accepteren",
        }
      : {
          label: "Cookie preferences",
          body: "We ask before allowing optional analytics and advertising storage. Without consent, that storage stays off.",
          policy: "Cookie policy",
          reject: "Reject",
          accept: "Accept",
        };
  const policyHref = locale === "nl" ? "/nl/cookie-policy" : "/cookie-policy";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: "accepted" }),
    );
    setVisible(false);
    // Enable Google consent mode
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_personalization: "granted",
        ad_user_data: "granted",
      });
    }
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: "rejected" }),
    );
    setVisible(false);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_personalization: "denied",
        ad_user_data: "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <section
      aria-label={copy.label}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300"
    >
      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-4 shadow-lg sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {copy.body}{" "}
              <Link
                href={policyHref}
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {copy.policy}
              </Link>
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="min-h-12 px-4"
              onClick={reject}
            >
              {copy.reject}
            </Button>
            <Button size="sm" className="min-h-12 px-4" onClick={accept}>
              {copy.accept}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
