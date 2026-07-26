import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * De brede "mini-review"-kaart van de apparaatpagina's (free-vpn, vpn-android,
 * vpn-ipad, vpn-iphone, vpn-mobile, vpn-tablet, …).
 *
 * Deze acht pagina's hadden hun kaarten volledig met de hand uitgeschreven —
 * ~80 regels per kaart, 25 kaarten in totaal — en dat is precies waarom de
 * cijfers uiteen waren gelopen: NordVPN stond hier op 4,65 terwijl de rest van
 * de site 4,8 zegt, en ExpressVPN op $6,67 tegenover $3,49 elders. Losse kopieën
 * kunnen niet meebewegen. De prijs en het cijfer komen daarom niet meer uit de
 * pagina maar uit vpn-data.
 *
 * Vierde vorm naast RankedVpnRow, VpnReliabilityRow en VpnFeatureCard. Die drie
 * zijn rijen in een lijst; dit is een kaart met een lopende beschrijving en
 * plus-/minpunten, en heeft dus een eigen indeling.
 */
const ACCENTS = {
  green: "border-green-500/50",
  blue: "border-blue-500/50",
  purple: "border-purple-500/50",
  orange: "border-orange-500/50",
  yellow: "border-yellow-500/50",
  red: "border-red-500/50",
} as const;

export type VpnReviewCardAccent = keyof typeof ACCENTS;

/** Vorm van de scorebadge. Pagina's zetten dit expliciet op dit type, anders
 *  versmalt TypeScript de lijst tot één variant en wordt de andere tak
 *  onbereikbaar op pagina's die maar één vorm gebruiken. */
export type VpnReviewScoreKind = "percent" | "outOfFive" | "literal";

export function VpnReviewCard({
  rank,
  name,
  vpnId,
  affiliateUrl,
  accent,
  badge,
  badgeClassName,
  badgeIcon,
  score,
  scoreIcon,
  scoreMono = true,
  scoreClassName,
  rating,
  description,
  stats,
  pros,
  cons,
  labels,
}: {
  rank: number;
  name: string;
  vpnId: string;
  affiliateUrl: string;
  accent?: VpnReviewCardAccent;
  /** Onderscheiding die half over de bovenrand hangt, bv. "Beste voor Android". */
  badge?: React.ReactNode;
  badgeClassName?: string;
  badgeIcon?: React.ReactNode;
  /**
   * Score naast de titel; niet elke pagina toont er een, en de vorm verschilt:
   * de meeste tonen een percentage, vpn-ipad een sterretje met "4,8/5".
   * Beide worden afgeleid van hetzelfde cijfer uit vpn-data.
   */
  score?: React.ReactNode;
  scoreIcon?: React.ReactNode;
  /** Cijferfont. Uit voor badges met vrije tekst — die leest slechter
   *  in een font dat op uitlijnende cijfers is gemaakt. */
  scoreMono?: boolean;
  scoreClassName?: string;
  /** Sterren rechts in de kop. Sommige pagina's tonen alleen de score. */
  rating?: number;
  description: React.ReactNode;
  /**
   * Vier cellen met icoon, label en waarde. Per pagina anders — een
   * tabletpagina toont schermformaat, een mobielpagina batterijverbruik — dus
   * dit blijft data van de pagina en niet van het component.
   */
  stats: Array<{
    icon: React.ReactNode;
    label: React.ReactNode;
    value: React.ReactNode;
    valueClassName?: string;
  }>;
  pros: string[];
  cons: string[];
  labels: {
    pros: React.ReactNode;
    cons: React.ReactNode;
    cta: React.ReactNode;
  };
}) {
  return (
    <Card className={cn("relative border-2", accent ? ACCENTS[accent] : "border-border")}>
      {badge && (
        <div className="absolute -top-3 left-8">
          <Badge className={badgeClassName}>
            {badgeIcon}
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <h3 className="flex items-center gap-3">
              <span className="metric">{rank}.</span> {name}
            </h3>
            {score != null && (
              <Badge variant="outline" className={scoreClassName}>
                {scoreIcon}
                <span className={scoreMono ? "metric" : undefined}>{score}</span>
              </Badge>
            )}
          </CardTitle>
          {rating != null && <RatingStars rating={rating} />}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <p className="text-muted-foreground">{description}</p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              {stat.icon}
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={cn("font-semibold", stat.valueClassName)}>
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-semibold text-green-600 dark:text-green-500">
              {labels.pros}
            </h4>
            <ul className="flex flex-col gap-2">
              {pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm">
                  <CheckCircle
                    className="mt-0.5 size-4 shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-orange-600 dark:text-orange-500">
              {labels.cons}
            </h4>
            <ul className="flex flex-col gap-2">
              {cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm">
                  <XCircle
                    className="mt-0.5 size-4 shrink-0 text-orange-500"
                    aria-hidden="true"
                  />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AffiliateButton
          vpnId={vpnId}
          vpnName={name}
          affiliateUrl={affiliateUrl}
          size="lg"
        >
          {labels.cta}
        </AffiliateButton>
      </CardContent>
    </Card>
  );
}
