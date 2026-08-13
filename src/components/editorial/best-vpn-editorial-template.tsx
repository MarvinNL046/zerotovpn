import type { ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { RatingStars } from "@/components/vpn/rating-stars";
import { Link } from "@/i18n/navigation";
import type { EditorialContentBrief } from "@/lib/editorial-content-brief";
import type { VpnData } from "@/lib/vpn-data-layer";

export interface EditorialNavItem {
  href: string;
  label: string;
}

interface BestVpnEditorialTemplateProps {
  navigation: readonly EditorialNavItem[];
  navigationAriaLabel?: string;
  disclosureHref?: string;
  disclosureText?: string;
  disclosureLabel?: string;
  brief?: EditorialContentBrief;
  children: ReactNode;
}

/**
 * Shared editorial shell for long-form VPN roundups.
 *
 * The shell keeps the Tom's Guide-inspired jump navigation and the early
 * affiliate disclosure in one audited component. Use it for best-of, country
 * and use-case pages so the SEO and commercial trust layer stays consistent.
 */
export function BestVpnEditorialTemplate({
  navigation,
  navigationAriaLabel = "On this page",
  disclosureHref = "/affiliate-disclosure",
  disclosureText = "Independent editorial ratings · affiliate links may earn us a commission",
  disclosureLabel = "disclosure",
  brief,
  children,
}: BestVpnEditorialTemplateProps) {
  return (
    <>
      <section
        className="sticky top-16 z-30 border-y bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80"
        data-editorial-brief={brief ? "true" : undefined}
        data-primary-keyword={brief?.primaryKeyword}
        data-editorial-intent={brief?.intent}
        data-editorial-cluster={brief?.cluster}
        data-last-reviewed-at={brief?.lastReviewedAt}
        data-affiliate-context={brief?.affiliateContext}
        data-schema-type={brief?.schemaType}
        data-evidence-count={brief ? String(brief.evidence.length) : undefined}
      >
        <div className="container flex items-center gap-4 overflow-x-auto py-3">
          <nav aria-label={navigationAriaLabel} className="flex min-w-max items-center gap-4 text-sm">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={index === 0 ? "font-semibold hover:text-primary" : "hover:text-primary"}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <span className="ml-auto hidden whitespace-nowrap text-xs text-muted-foreground lg:block">
            {disclosureText} ·{" "}
            <Link href={disclosureHref} className="underline underline-offset-2 hover:text-primary">
              {disclosureLabel}
            </Link>
          </span>
        </div>
      </section>
      {children}
    </>
  );
}

type QuickPickTone = "gold" | "green" | "blue";

interface EditorialQuickPickCardProps {
  vpn: VpnData;
  label: string;
  icon: ReactNode;
  tone: QuickPickTone;
}

const toneClasses: Record<QuickPickTone, { border: string; background: string; badge: string }> = {
  gold: {
    border: "border-yellow-500/50",
    background: "from-yellow-500/5",
    badge: "bg-yellow-500 text-yellow-950",
  },
  green: {
    border: "border-green-500/50",
    background: "from-green-500/5",
    badge: "bg-green-500 text-green-950",
  },
  blue: {
    border: "border-blue-500/50",
    background: "from-blue-500/5",
    badge: "bg-blue-500 text-blue-950",
  },
};

/** A reusable top-pick block with contextual price and primary affiliate CTA. */
export function EditorialQuickPickCard({
  vpn,
  label,
  icon,
  tone,
}: EditorialQuickPickCardProps) {
  const styles = toneClasses[tone];
  const price = vpn.priceTwoYear ?? vpn.priceYearly;

  return (
    <Card className={`relative border-2 ${styles.border} bg-gradient-to-b ${styles.background} to-transparent`}>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}>
          {icon}
          {label}
        </span>
      </div>
      <CardContent className="pt-8 text-center space-y-4">
        <div className="flex h-12 items-center justify-center" data-provider-mark="true">
          {vpn.logo ? (
            <Image
              src={vpn.logo}
              alt={`${vpn.name} logo`}
              width={132}
              height={40}
              className="max-h-10 w-auto object-contain"
            />
          ) : (
            <span className="text-sm font-semibold text-muted-foreground">{vpn.name}</span>
          )}
        </div>
        <h3 className="text-2xl font-bold">
          <Link href={`/reviews/${vpn.slug}`} className="hover:text-primary">
            {vpn.name}
          </Link>
        </h3>
        <RatingStars rating={vpn.overallRating} size="md" />
        <p className="text-sm text-muted-foreground">{vpn.shortDescription}</p>
        <div className="text-3xl font-bold text-primary">
          <AffiliateTextLink
            vpnId={vpn.id}
            vpnName={vpn.name}
            affiliateUrl={vpn.affiliateUrl}
            className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
          >
            ${price.toFixed(2)}
          </AffiliateTextLink>
          <span className="text-sm font-normal text-muted-foreground">/mo</span>
        </div>
        <p className="text-xs text-muted-foreground" data-plan-context="true">
          {vpn.priceTwoYear ? "Long-term plan equivalent" : "Annual plan equivalent"}
          {vpn.moneyBackDays > 0 ? ` · ${vpn.moneyBackDays}-day refund window` : " · Check provider refund terms"}
        </p>
        <p className="text-xs text-muted-foreground" data-price-freshness="true">
          Price checked: {vpn.priceLastVerified ?? "not recorded"}
        </p>
        <AffiliateButton
          vpnId={vpn.id}
          vpnName={vpn.name}
          affiliateUrl={vpn.affiliateUrl}
          className="w-full"
        >
          Visit {vpn.name}
        </AffiliateButton>
      </CardContent>
    </Card>
  );
}
