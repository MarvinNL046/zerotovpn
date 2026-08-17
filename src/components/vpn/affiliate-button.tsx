"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { withNordAffiliateSubId } from "@/lib/affiliate-attribution";
import { VPN_LINKS, type VpnLinkSlug } from "@/lib/vpn-links";

interface AffiliateButtonProps {
  vpnId: string;
  vpnName: string;
  affiliateUrl: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

// Stuurt de klik naar /api/click zonder de navigatie op te houden.
// sendBeacon is hier het juiste gereedschap: de browser levert het verzoek af
// terwijl de pagina al aan het weg-navigeren is.
function getShortIoSlug(affiliateUrl: string): string | null {
  try {
    // Use a fixed base so server rendering and client hydration produce the
    // same attribute. Affiliate destinations are absolute Short.io URLs;
    // the base only makes malformed relative values fail predictably.
    const url = new URL(affiliateUrl, "https://go.zerotovpn.com");
    if (url.hostname !== "go.zerotovpn.com") return null;
    return url.pathname.replace(/^\/+|\/+$/g, "") || null;
  } catch {
    return null;
  }
}

function getOfficialWebsite(vpnId: string): string | null {
  if (!(vpnId in VPN_LINKS)) return null;
  return VPN_LINKS[vpnId as VpnLinkSlug].website;
}

/**
 * TUNE accepts aff_sub as a publisher-controlled placement identifier. Keep
 * the value short, deterministic and free of user data so Nord's conversion
 * export can be joined back to a public page without changing Short.io's path
 * analytics. Short.io merges query parameters into the destination URL.
 */
export function buildAffiliateHref(
  vpnId: string,
  affiliateUrl: string,
  pathname: string,
): string {
  if (vpnId !== "nordvpn") return affiliateUrl;

  return withNordAffiliateSubId(affiliateUrl, pathname);
}

export function trackAffiliateClick(vpnId: string, affiliateUrl: string) {
  let affiliateSubId: string | undefined;
  try {
    affiliateSubId =
      new URL(affiliateUrl, window.location.origin).searchParams.get(
        "aff_sub",
      ) || undefined;
  } catch {
    // A malformed destination must never prevent the affiliate navigation.
  }
  const payload = JSON.stringify({
    vpnId,
    affiliateSlug: getShortIoSlug(affiliateUrl),
    affiliateSubId,
    page: window.location.pathname,
    referrer: document.referrer,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/click",
        new Blob([payload], { type: "application/json" }),
      );
      return;
    }
    // Oudere browsers: keepalive zorgt dat het verzoek de unload overleeft.
    void fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Meten mag nooit een klik kosten.
  }
}

export function AffiliateButton({
  vpnId,
  vpnName,
  affiliateUrl,
  variant = "default",
  size = "default",
  className,
  children,
}: AffiliateButtonProps) {
  const pathname = usePathname() ?? "/";
  if (!affiliateUrl) {
    const officialWebsite = getOfficialWebsite(vpnId);
    if (!officialWebsite) return null;

    return (
      <Button asChild variant={variant} size={size} className={className}>
        <a href={officialWebsite} target="_blank" rel="noopener noreferrer">
          {children || (
            <>
              Visit {vpnName}
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </a>
      </Button>
    );
  }
  const renderedHref = buildAffiliateHref(vpnId, affiliateUrl, pathname);
  // Dit was een <button> met window.open() ná een await fetch(). Twee problemen:
  // de link had geen href — dus onzichtbaar voor crawlers, geen rel-attributen,
  // niet te middenklikken of te kopiëren — en window.open() viel door de await
  // buiten het klik-gebaar, waardoor popup-blokkers 'm konden tegenhouden.
  // Nu is het een echte link: de browser navigeert zelf, meten gebeurt ernaast.
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={renderedHref}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        data-affiliate-slug={getShortIoSlug(affiliateUrl) ?? undefined}
        onClick={(event) => {
          const trackedHref = buildAffiliateHref(
            vpnId,
            affiliateUrl,
            window.location.pathname,
          );
          event.currentTarget.href = trackedHref;
          trackAffiliateClick(vpnId, trackedHref);
        }}
      >
        {children || (
          <>
            Visit {vpnName}
            <ExternalLink className="ml-2 h-4 w-4" />
          </>
        )}
      </a>
    </Button>
  );
}

interface AffiliateTextLinkProps {
  vpnId: string;
  vpnName: string;
  affiliateUrl: string;
  className?: string;
  dataPriceLink?: boolean;
  children: React.ReactNode;
}

/**
 * Inline affiliate link for contextual prices and editorial CTAs.
 * It deliberately shares the same sponsored/nofollow and click tracking
 * contract as the primary button, so every commercial link stays auditable.
 */
export function AffiliateTextLink({
  vpnId,
  affiliateUrl,
  className,
  dataPriceLink,
  children,
}: AffiliateTextLinkProps) {
  const pathname = usePathname() ?? "/";
  if (!affiliateUrl) {
    const officialWebsite = getOfficialWebsite(vpnId);
    if (!officialWebsite) return null;

    return (
      <a
        href={officialWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-price-link={dataPriceLink ? "true" : undefined}
      >
        {children}
      </a>
    );
  }
  const renderedHref = buildAffiliateHref(vpnId, affiliateUrl, pathname);

  return (
    <a
      href={renderedHref}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className={className}
      data-price-link={dataPriceLink ? "true" : undefined}
      data-affiliate-slug={getShortIoSlug(affiliateUrl) ?? undefined}
      onClick={(event) => {
        const trackedHref = buildAffiliateHref(
          vpnId,
          affiliateUrl,
          window.location.pathname,
        );
        event.currentTarget.href = trackedHref;
        trackAffiliateClick(vpnId, trackedHref);
      }}
    >
      {children}
    </a>
  );
}
