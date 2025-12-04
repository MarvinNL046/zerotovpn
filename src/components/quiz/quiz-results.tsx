"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { VpnProvider } from "@/lib/vpn-data";
import type { VpnData } from "@/lib/db/vpn-service";
import type { QuizAnswers } from "./quiz-wizard";
import { ArrowLeft, RefreshCw, ExternalLink, Star, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type QuizResultsProps = {
  answers: QuizAnswers;
  vpns: (VpnProvider | VpnData)[];
  onBack: () => void;
  onReset: () => void;
  locale?: string;
};

export function QuizResults({
  answers,
  vpns,
  onBack,
  onReset,
}: QuizResultsProps) {
  const t = useTranslations("quiz");

  const scoredVpns = useMemo(() => {
    return vpns
      .map((vpn) => {
        let score = 0;
        let maxScore = 0;

        // Primary Use Case scoring (weight: 30)
        maxScore += 30;
        if (answers.primaryUse === "streaming" && vpn.streamingScore > 85) {
          score += 30 * (vpn.streamingScore / 100);
        } else if (answers.primaryUse === "privacy" && vpn.securityScore > 90) {
          score += 30 * (vpn.securityScore / 100);
        } else if (answers.primaryUse === "gaming" && vpn.speedScore > 85) {
          score += 30 * (vpn.speedScore / 100);
        } else if (answers.primaryUse === "torrenting" && vpn.torrentSupport) {
          score += vpn.torrentSupport ? 25 : 0;
          score += (vpn.speedScore / 100) * 5;
        } else if (answers.primaryUse === "work" && vpn.securityScore > 88) {
          score += 30 * (vpn.securityScore / 100);
        } else {
          // General score for other use cases
          score += 20;
        }

        // Budget scoring (weight: 25)
        maxScore += 25;
        const monthlyPrice = vpn.priceTwoYear || vpn.priceYearly;
        if (answers.budget === "free" && vpn.freeTier) {
          score += 25;
        } else if (answers.budget === "budget" && monthlyPrice <= 4) {
          score += 25;
        } else if (answers.budget === "midrange" && monthlyPrice <= 8) {
          score += 25;
        } else if (answers.budget === "premium" && monthlyPrice >= 8) {
          score += 20; // Premium users less price-sensitive
        } else {
          // Partial points based on how close to budget
          if (answers.budget === "free") score += 0;
          else if (answers.budget === "budget" && monthlyPrice <= 6) score += 15;
          else if (answers.budget === "midrange" && monthlyPrice <= 10)
            score += 15;
          else score += 10;
        }

        // Device count scoring (weight: 20)
        maxScore += 20;
        if (answers.devices === "1-2" && vpn.maxDevices >= 2) {
          score += 20;
        } else if (answers.devices === "3-5" && vpn.maxDevices >= 5) {
          score += 20;
        } else if (answers.devices === "6-10" && vpn.maxDevices >= 10) {
          score += 20;
        } else if (answers.devices === "unlimited" && vpn.maxDevices >= 100) {
          score += 20;
        } else {
          score += 10; // Partial points
        }

        // Speed priority scoring (weight: 15)
        maxScore += 15;
        if (answers.speedPriority === "critical" && vpn.speedScore >= 90) {
          score += 15;
        } else if (answers.speedPriority === "important" && vpn.speedScore >= 80) {
          score += 15;
        } else if (answers.speedPriority === "notPriority") {
          score += 10; // Speed less important
        } else {
          score += (vpn.speedScore / 100) * 15 * 0.5; // Partial speed credit
        }

        // Location scoring (weight: 10)
        maxScore += 10;
        // For now, give points based on server count and country coverage
        if (vpn.countries >= 100) {
          score += 10;
        } else if (vpn.countries >= 60) {
          score += 8;
        } else {
          score += 5;
        }

        // Calculate percentage match
        const matchPercentage = Math.round((score / maxScore) * 100);

        return {
          ...vpn,
          matchScore: score,
          matchPercentage,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3); // Top 3 matches
  }, [answers, vpns]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="px-4 py-1">
          {t("results.badge")}
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold">{t("results.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("results.subtitle")}
        </p>
      </div>

      {/* Results Cards */}
      <div className="grid gap-6">
        {scoredVpns.map((vpn, index) => {
          const pricePerMonth = vpn.priceTwoYear || vpn.priceYearly;
          const savingsPercent = Math.round(
            ((vpn.priceMonthly - pricePerMonth) / vpn.priceMonthly) * 100
          );

          return (
            <Card key={vpn.id} className="p-6 md:p-8 relative overflow-hidden">
              {/* Rank Badge */}
              {index === 0 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {t("results.topMatch")}
                  </Badge>
                </div>
              )}

              <div className="grid md:grid-cols-[200px_1fr] gap-6">
                {/* VPN Logo */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative w-48 h-24 bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                    <Image
                      src={vpn.logo || "/logos/default.svg"}
                      alt={vpn.name}
                      width={150}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {vpn.overallRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* VPN Details */}
                <div className="space-y-4">
                  {/* Match Percentage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {t("results.matchScore")}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {vpn.matchPercentage}%
                      </span>
                    </div>
                    <Progress value={vpn.matchPercentage} className="h-2" />
                  </div>

                  {/* Short Description */}
                  <p className="text-muted-foreground">{vpn.shortDescription || ""}</p>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {vpn.netflixSupport && (
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{t("results.features.netflix")}</span>
                      </div>
                    )}
                    {vpn.torrentSupport && (
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{t("results.features.torrenting")}</span>
                      </div>
                    )}
                    {vpn.killSwitch && (
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{t("results.features.killSwitch")}</span>
                      </div>
                    )}
                    {vpn.noLogs && (
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{t("results.features.noLogs")}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing and CTAs */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          ${pricePerMonth.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      {savingsPercent > 0 && (
                        <Badge variant="secondary" className="mt-1">
                          {t("results.save")} {savingsPercent}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button asChild size="lg" className="w-full sm:w-auto">
                        <a
                          href={vpn.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("results.getDeal")}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        <Link href={`/reviews/${vpn.slug}`}>
                          {t("results.readReview")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("results.modifyAnswers")}
        </Button>
        <Button variant="outline" onClick={onReset} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" />
          {t("results.startOver")}
        </Button>
      </div>
    </div>
  );
}
