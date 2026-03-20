"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsent() {
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-4 shadow-lg sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              We use cookies for analytics and advertising. By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
              <Link href="/cookie-policy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                Cookie Policy
              </Link>
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={reject}>
              Reject
            </Button>
            <Button size="sm" onClick={accept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
