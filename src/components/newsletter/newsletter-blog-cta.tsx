"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NewsletterForm } from "./newsletter-form";

export function NewsletterBlogCTA() {
  const t = useTranslations("newsletter");

  return (
    <Card className="my-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="text-xl font-bold">{t("blogCtaTitle")}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {t("blogCtaSubtitle")}
            </p>
          </div>

          <div className="w-full max-w-md">
            <NewsletterForm variant="compact" source="blog" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
