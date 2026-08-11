"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Compass, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface StickyCTABarProps {
  position?: "top" | "bottom";
}

/**
 * A non-commercial, site-owned conversion aid. Affiliate offers belong in
 * contextual editorial placements, not in a global discount banner.
 */
export function StickyCTABar({ position = "bottom" }: StickyCTABarProps) {
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

  if (isDismissed || !isVisible) return null;

  const positionClasses = position === "top" ? "top-0 border-b" : "bottom-0 border-t";

  return (
    <div
      className={`fixed left-0 right-0 ${positionClasses} bg-primary text-primary-foreground z-40 shadow-lg animate-in slide-in-from-bottom duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-primary-foreground/20 rounded-full flex-shrink-0">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg whitespace-nowrap">{footer("quiz")}</span>
                <span className="hidden md:inline text-primary-foreground/90">{footer("bestVpns")}</span>
                <span className="md:hidden text-primary-foreground/90 truncate">{footer("compare")}</span>
              </div>
              <p className="text-sm text-primary-foreground/80 hidden lg:block">{footer("aboutText")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button asChild variant="secondary" size="sm" className="font-bold whitespace-nowrap">
              <Link href="/quiz">
                <span className="hidden sm:inline">{cta("compare")}</span>
                <span className="sm:hidden">{cta("learnMore")}</span>
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
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
