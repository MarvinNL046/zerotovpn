import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * De verticale "uitgelichte VPN"-kaart met zwevende badge, gebruikt in het
 * raster op fastest-vpn, vpn-gaming, vpn-linux, vpn-privacy en vpn-windows.
 * Die vijf hadden dezelfde ~75 regels gekopieerd staan.
 *
 * Derde rijvorm naast RankedVpnRow (horizontaal) en VpnReliabilityRow
 * (stapel + prijskolom). Ze samenvoegen zou betekenen dat één component drie
 * verschillende indelingen moet kunnen; dan legt het niets meer vast.
 *
 * ACCENT: de oude pagina's bouwden de klasse op als
 * `border-${item.badgeColor}-500/50`. Dat werkt vandaag alleen doordat die
 * klassen toevallig elders letterlijk in de codebase staan — Tailwind ziet
 * samengestelde namen niet. Een nieuwe kleur zou dus stil niet renderen.
 * Daarom hier een expliciete tabel: wat er niet in staat, valt terug op neutraal.
 */
const ACCENTS = {
  yellow: "border-yellow-500/50 from-yellow-500/5",
  blue: "border-blue-500/50 from-blue-500/5",
  green: "border-green-500/50 from-green-500/5",
  purple: "border-purple-500/50 from-purple-500/5",
  red: "border-red-500/50 from-red-500/5",
  orange: "border-orange-500/50 from-orange-500/5",
} as const;

export type VpnFeatureCardAccent = keyof typeof ACCENTS;

export function VpnFeatureCard({
  name,
  vpnId,
  affiliateUrl,
  rating,
  accent,
  badge,
  badgeClassName,
  badgeIcon,
  rows,
  features,
  price,
  labels,
}: {
  name: string;
  vpnId: string;
  affiliateUrl: string;
  rating: number;
  accent?: VpnFeatureCardAccent;
  badge?: React.ReactNode;
  badgeClassName?: string;
  badgeIcon?: React.ReactNode;
  /**
   * Label/waarde-regels; per pagina anders (Protocol, Ping, Jurisdictie…).
   * `mono` alleen voor echte meetwaarden — een protocolnaam als
   * "NordLynx (WireGuard)" in een cijferfont zetten leest slechter, niet beter.
   */
  rows: Array<{
    label: string;
    value: React.ReactNode;
    valueClassName?: string;
    mono?: boolean;
  }>;
  features: string[];
  price: React.ReactNode;
  labels: { cta: string };
}) {
  return (
    <Card
      className={cn(
        "relative border-2 bg-gradient-to-b to-transparent",
        accent ? ACCENTS[accent] : "border-border",
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className={badgeClassName}>
            {badgeIcon}
            {badge}
          </Badge>
        </div>
      )}
      <CardContent className="flex flex-col gap-4 pt-8">
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold">{name}</h3>
          <RatingStars rating={rating} size="md" />
        </div>

        <div className="flex flex-col gap-2 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-muted-foreground">{row.label}</span>
              <span
                className={cn(
                  "font-medium",
                  row.mono && "metric",
                  row.valueClassName,
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
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

        <div className="border-t pt-4 text-center">
          <div className="metric mb-3 text-3xl font-bold text-primary">
            {price}
          </div>
          <AffiliateButton
            vpnId={vpnId}
            vpnName={name}
            affiliateUrl={affiliateUrl}
            className="w-full"
          >
            {labels.cta}
          </AffiliateButton>
        </div>
      </CardContent>
    </Card>
  );
}
