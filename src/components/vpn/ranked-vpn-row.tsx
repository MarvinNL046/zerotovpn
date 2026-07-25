import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { VpnLogo } from "@/components/ui/vpn-logo";
import { RatingStars } from "./rating-stars";
import { AffiliateButton } from "./affiliate-button";
import { cn } from "@/lib/utils";

/**
 * De horizontale "ranked VPN"-rij van de lijstpagina's.
 *
 * Deze rij staat met de hand uitgeschreven in 22 statische landenpagina's en
 * 35 /best-pagina's — samen ~4.900 regels JSX. Een inventarisatie liet zien dat
 * het geen één vorm is maar acht varianten, dus dit component legt alleen vast
 * wat ze écht delen en laat de rest over aan props:
 *
 * - `stats` in plaats van vaste velden: elke /best-pagina verzint zijn eigen
 *   cellen (protocol, ping, jurisdictie, chip, app-grootte…). Twee pagina's
 *   met dezelfde statistieken bestaan nauwelijks.
 * - `labels` in plaats van eigen vertalingen: 49 pagina's gebruiken een eigen
 *   `content`-object zonder next-intl-sleutels, de andere 8 gebruiken elk een
 *   andere namespace. Het component kan dus nooit zelf vertalen.
 * - géén doorgestreepte prijs of kortingsbadge: die komen in geen van de 57
 *   pagina's voor. Niet toevoegen wat er niet is.
 * - logo, rang, badge en reviewlink zijn allemaal optioneel, want minder dan de
 *   helft van de pagina's toont ze.
 */
export function RankedVpnRow({
  name,
  slug,
  vpnId,
  affiliateUrl,
  rating,
  rank,
  logo = false,
  badge,
  price,
  priceNote,
  priceClassName,
  stats = [],
  middle,
  labels,
  highlight = false,
  children,
  className,
}: {
  name: string;
  slug?: string;
  /** Voor klik-tracking. Bewust expliciet: sommige pagina's geven vpn.id door,
   *  andere vpn.slug of een letterlijke string. */
  vpnId: string;
  affiliateUrl: string;
  rating?: number;
  rank?: number;
  logo?: boolean;
  /** Onderscheidingslabel rechtsboven, bv. "Beste voor streaming". */
  badge?: React.ReactNode;
  /** Al opgemaakt, want de helft van de pagina's bewaart een string als
   *  "$2.99/mo" en de andere helft rekent met priceTwoYear. */
  price: React.ReactNode;
  /** Kleine regel onder de prijs, bv. "2-year plan" op /best/vpn-cheap. */
  priceNote?: React.ReactNode;
  /** Accentkleur van de prijs; verschilt per paginathema (rood op /vpn-netflix,
   *  oranje elders). */
  priceClassName?: string;
  /** Eenvoudige label-boven-waarde cellen. */
  stats?: Array<{ label: string; value: React.ReactNode }>;
  /**
   * Vrij middendeel, voor pagina's die geen label/waarde-raster tonen maar
   * bijvoorbeeld icoon-met-tekst of vinkjes. Vervangt `stats` als het gezet is.
   * Dit slot bestaat omdat de inventarisatie liet zien dat vrijwel geen twee
   * lijstpagina's dezelfde cellen tonen — dat forceren in één vorm zou de
   * pagina's slechter maken, niet consistenter.
   */
  middle?: React.ReactNode;
  labels: { cta: string; review?: string };
  highlight?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-6",
        highlight && "border-2 border-primary",
        className,
      )}
    >
      {badge && (
        <div className="absolute right-0 top-0">
          <Badge className="rounded-none rounded-bl-lg px-3 py-1">{badge}</Badge>
        </div>
      )}

      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="flex shrink-0 items-center gap-4">
          {rank != null && (
            <span className="metric text-2xl font-bold text-muted-foreground">
              {rank}
            </span>
          )}
          {logo && (
            <div className="rounded-lg bg-white p-3 dark:bg-gray-800">
              <VpnLogo name={name} size="lg" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            {rating != null && <RatingStars rating={rating} size="sm" />}
          </div>
        </div>

        {middle ? (
          <div className="flex-1">{middle}</div>
        ) : (
          stats.length > 0 && (
          // .metric = IBM Plex Mono met tabular-nums, zodat de waarden tussen
          // de rijen uitlijnen in plaats van per regel te verspringen.
          <div
            className={cn(
              "grid flex-1 gap-4 text-center",
              stats.length >= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3",
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="metric font-bold">{stat.value}</div>
              </div>
            ))}
            </div>
          )
        )}

        <div className="flex shrink-0 flex-col items-center gap-2">
          <div
            className={cn(
              "metric text-2xl font-bold",
              priceClassName ?? "text-primary",
            )}
          >
            {price}
          </div>
          {priceNote && (
            <span className="text-xs text-muted-foreground">{priceNote}</span>
          )}
          <div className="flex w-full flex-col gap-2">
            <AffiliateButton
              vpnId={vpnId}
              vpnName={name}
              affiliateUrl={affiliateUrl}
              size="sm"
            >
              {labels.cta}
            </AffiliateButton>
            {labels.review && slug && (
              <Link
                href={`/reviews/${slug}`}
                className="text-center text-xs text-primary hover:underline"
              >
                {labels.review}
              </Link>
            )}
          </div>
        </div>
      </div>

      {children && <div className="mt-4 border-t pt-4">{children}</div>}
    </Card>
  );
}
