"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Compass, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface StickyCTABarProps {
  position?: "top" | "bottom";
}

const COMPARISON_DETAIL_PATH_RE = /\/compare\/[^/]+\/?$/;
const QUIZ_PATH_RE = /^\/(?:[a-z]{2}\/)?quiz\/?$/;
const DNS_DIAGNOSTIC_PATH_RE = /^\/(?:[a-z]{2}\/)?tools\/dns-leak-test\/?$/;
const IP_CHECKER_PATH_RE = /^\/(?:[a-z]{2}\/)?tools\/what-is-my-ip\/?$/;
const SPEED_TEST_PATH_RE = /^\/(?:[a-z]{2}\/)?speed-test\/?$/;
const TOOLS_HUB_PATH_RE = /^\/(?:[a-z]{2}\/)?tools\/?$/;

/**
 * A non-commercial, site-owned conversion aid. Affiliate offers belong in
 * contextual editorial placements, not in a global promotion banner.
 */
export function StickyCTABar({ position = "bottom" }: StickyCTABarProps) {
  const pathname = usePathname() ?? "/";
  const sticky = useTranslations("stickyBar");
  const footer = useTranslations("footer");
  const cta = useTranslations("cta");
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("stickyBarDismissed");
    if (dismissed) {
      // Intentional setState in effect to restore session state from storage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("stickyBarDismissed", "true");
  };

  const isComparisonDetail = COMPARISON_DETAIL_PATH_RE.test(pathname);
  const isQuizPage = QUIZ_PATH_RE.test(pathname);
  const isDnsDiagnostic = DNS_DIAGNOSTIC_PATH_RE.test(pathname);
  const isIpChecker = IP_CHECKER_PATH_RE.test(pathname);
  const isSpeedTest = SPEED_TEST_PATH_RE.test(pathname);
  const isToolsHub = TOOLS_HUB_PATH_RE.test(pathname);

  if (
    isComparisonDetail ||
    isQuizPage ||
    isDnsDiagnostic ||
    isIpChecker ||
    isSpeedTest ||
    isToolsHub ||
    isDismissed ||
    !isVisible
  ) {
    return null;
  }

  const positionClasses =
    position === "top" ? "top-0 border-b" : "bottom-0 border-t";

  return (
    <div
      className={`fixed left-0 right-0 ${positionClasses} z-40 animate-in border-white/10 bg-[#071226] text-white shadow-lg duration-300 slide-in-from-bottom`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[#b8e34a] sm:flex">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg whitespace-nowrap">
                  {footer("quiz")}
                </span>
                <span className="hidden text-slate-200 md:inline">
                  {footer("bestVpns")}
                </span>
                <span className="truncate text-slate-200 md:hidden">
                  {footer("compare")}
                </span>
              </div>
              <p className="hidden text-sm text-slate-300 lg:block">
                {footer("aboutText")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              asChild
              size="sm"
              className="whitespace-nowrap bg-[#b8e34a] font-bold text-[#0b1736] hover:bg-[#c8ee67]"
            >
              <Link href="/quiz">
                <span className="hidden sm:inline">{cta("compare")}</span>
                <span className="sm:hidden">{cta("learnMore")}</span>
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
            <button
              onClick={handleDismiss}
              className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={sticky("dismiss")}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
