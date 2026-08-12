"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

const SESSION_KEY = "exitIntentShown";
const PERMANENT_DISMISS_KEY = "exitIntentDismissed";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

/** Owned-media newsletter prompt shown on exit intent. */
export function ExitIntentPopup() {
  const t = useTranslations("newsletter");
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionShown = sessionStorage.getItem(SESSION_KEY);
    const permanentDismiss = localStorage.getItem(PERMANENT_DISMISS_KEY);

    if (permanentDismiss) {
      const dismissTime = Number.parseInt(permanentDismiss, 10);
      if (Date.now() - dismissTime < DISMISS_DURATION_MS) return;
      localStorage.removeItem(PERMANENT_DISMISS_KEY);
    }

    if (sessionShown) {
      // Intentional setState in effect to restore session state from storage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem(SESSION_KEY, "true");
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleDontShowAgain = () => {
    localStorage.setItem(PERMANENT_DISMISS_KEY, Date.now().toString());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[500px] max-w-[calc(100%-2rem)]"
        data-email-collection-only="true"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
            {t("popupTitle")}
          </DialogTitle>
          <DialogDescription className="text-center">{t("popupSubtitle")}</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 shadow-lg">
          <NewsletterForm variant="default" source="exit-intent" />
        </div>

        <div className="text-center">
          <button
            onClick={handleDontShowAgain}
            className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            {t("dontShowAgain")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
