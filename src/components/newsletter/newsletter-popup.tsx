"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { NewsletterForm } from "./newsletter-form";

const SESSION_KEY = "newsletterPopupShown";
const PERMANENT_DISMISS_KEY = "newsletterPopupDismissed";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const SHOW_DELAY_MS = 30000; // 30 seconds

export function NewsletterPopup() {
  const t = useTranslations("newsletter");
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionShown = sessionStorage.getItem(SESSION_KEY);
    const permanentDismiss = localStorage.getItem(PERMANENT_DISMISS_KEY);

    // Check if permanently dismissed and still within 30 days
    if (permanentDismiss) {
      const dismissTime = parseInt(permanentDismiss, 10);
      const now = Date.now();
      if (now - dismissTime < DISMISS_DURATION_MS) {
        return; // Still within dismiss period
      } else {
        // Dismiss period expired, remove it
        localStorage.removeItem(PERMANENT_DISMISS_KEY);
      }
    }

    if (sessionShown) {
      setHasShown(true);
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem(SESSION_KEY, "true");
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem(PERMANENT_DISMISS_KEY, Date.now().toString());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] max-w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t("popupTitle")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("popupSubtitle")}
          </DialogDescription>
        </DialogHeader>

        {/* Gradient background accent */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-lg" />

        <div className="py-4">
          <NewsletterForm variant="default" source="popup" />
        </div>

        {/* Don't show again link */}
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
