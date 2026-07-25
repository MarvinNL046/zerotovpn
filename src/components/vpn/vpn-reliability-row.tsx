import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { CheckCircle } from "lucide-react";

/**
 * De "werkt het daar?"-rij van de landen-listicles onder /best
 * (china, india, indonesia, japan, russia, turkey — plus iran en uae met een
 * eigen variant). Zes van die pagina's hadden deze 74 regels byte-identiek
 * gekopieerd.
 *
 * Bewust een ander component dan RankedVpnRow: die zet naam, meetwaarden en
 * prijs naast elkaar, terwijl deze links een verticale stapel toont
 * (uitleg, betrouwbaarheidsbalk, kenmerken) met rechts een prijskolom. Dat in
 * één component persen zou óf het ontwerp van deze pagina's veranderen, óf zo
 * veel schakelaars vragen dat het component niets meer vastlegt.
 *
 * Alle teksten komen binnen als props: deze pagina's gebruiken een eigen
 * `content`-object per taal, geen next-intl-sleutels.
 */
export function VpnReliabilityRow({
  name,
  slug,
  affiliateUrl,
  rating,
  rank,
  whyWorks,
  reliability,
  features,
  price,
  labels,
  reviewHref,
}: {
  name: string;
  slug: string;
  affiliateUrl: string;
  rating: number;
  rank?: number;
  whyWorks: string;
  /** Percentage 0-100. */
  reliability: number;
  features: string[];
  /** Al opgemaakt, bv. "$3.49". */
  price: string;
  labels: {
    whyItWorks: string;
    reliability: string;
    startingAt: string;
    perMonth: string;
    cta: string;
    review?: string;
  };
  reviewHref?: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-3">
              {rank != null && (
                <span className="metric text-3xl font-bold text-muted-foreground">
                  {rank}
                </span>
              )}
              <h3 className="text-2xl font-bold">{name}</h3>
            </div>

            <RatingStars rating={rating} size="lg" showValue />

            <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/20">
              <CheckCircle
                className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-500"
                aria-hidden="true"
              />
              <div>
                <div className="font-semibold text-green-900 dark:text-green-100">
                  {labels.whyItWorks}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  {whyWorks}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{labels.reliability}</span>
              <div
                className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
                role="img"
                // Sommige vertalingen eindigen al op een dubbelepunt.
                aria-label={`${labels.reliability.replace(/:\s*$/, "")}: ${reliability}%`}
              >
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${reliability}%` }}
                />
              </div>
              <span className="metric text-sm font-bold">{reliability}%</span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle
                    className="size-4 shrink-0 text-green-600 dark:text-green-500"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:w-64 lg:shrink-0 lg:border-l lg:pl-6 lg:text-center">
            <div>
              <div className="text-sm text-muted-foreground">
                {labels.startingAt}
              </div>
              <div className="metric text-4xl font-bold text-primary">
                {price}
              </div>
              <div className="text-sm text-muted-foreground">
                {labels.perMonth}
              </div>
            </div>
            <AffiliateButton
              vpnId={slug}
              vpnName={name}
              affiliateUrl={affiliateUrl}
              className="w-full"
              size="lg"
            >
              {labels.cta}
            </AffiliateButton>
            {labels.review && reviewHref && (
              <Link
                href={reviewHref}
                className="text-center text-xs text-primary hover:underline"
              >
                {labels.review}
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
