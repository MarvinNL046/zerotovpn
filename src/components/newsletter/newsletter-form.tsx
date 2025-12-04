"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Mail } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "compact" | "inline";
  source?: string;
  className?: string;
}

export function NewsletterForm({
  variant = "default",
  source = "website",
  className = ""
}: NewsletterFormProps) {
  const t = useTranslations("newsletter");
  const params = useParams();
  const locale = params.locale as string || "en";

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !consent) {
      setStatus("error");
      setErrorMessage(t("consentRequired"));
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          language: locale,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("error"));
      }

      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-green-600 dark:text-green-400 ${className}`}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <Check className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold">{t("success")}</p>
          <p className="text-sm text-muted-foreground">{t("checkEmail")}</p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading || !consent}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t("subscribe")
            )}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`consent-${source}`}
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            disabled={isLoading}
          />
          <Label
            htmlFor={`consent-${source}`}
            className="text-xs text-muted-foreground cursor-pointer"
          >
            {t("consent")}
          </Label>
        </div>
        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        )}
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`consent-${source}`}
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
              disabled={isLoading}
            />
            <Label
              htmlFor={`consent-${source}`}
              className="text-xs text-muted-foreground cursor-pointer"
            >
              {t("consent")}
            </Label>
          </div>
          <Button type="submit" disabled={isLoading || !consent} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("subscribing")}
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                {t("subscribe")}
              </>
            )}
          </Button>
          {status === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          )}
        </form>
      </div>
    );
  }

  // Default variant
  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`email-${source}`}>{t("emailLabel")}</Label>
          <Input
            id={`email-${source}`}
            type="email"
            placeholder={t("placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id={`consent-${source}`}
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            disabled={isLoading}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor={`consent-${source}`}
              className="text-sm font-normal cursor-pointer"
            >
              {t("consent")}
            </Label>
            <p className="text-xs text-muted-foreground">
              {t("privacy")}
            </p>
          </div>
        </div>

        <Button type="submit" disabled={isLoading || !consent} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("subscribing")}
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              {t("subscribe")}
            </>
          )}
        </Button>

        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
