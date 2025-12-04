"use client";

import { useTranslations } from "next-intl";
import { NewsletterForm } from "./newsletter-form";

export function NewsletterFooter() {
  const t = useTranslations("newsletter");

  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold mb-2">{t("footerTitle")}</h4>
        <p className="text-xs text-muted-foreground mb-3">
          {t("footerSubtitle")}
        </p>
      </div>
      <NewsletterForm variant="compact" source="footer" />
    </div>
  );
}
