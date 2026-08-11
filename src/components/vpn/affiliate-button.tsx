"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
    const url = new URL(affiliateUrl, window.location.origin);
    if (url.hostname !== "go.zerotovpn.com") return null;
    return url.pathname.replace(/^\/+|\/+$/g, "") || null;
  } catch {
    return null;
  }
}

export function trackAffiliateClick(vpnId: string, affiliateUrl: string) {
  const payload = JSON.stringify({
    vpnId,
    affiliateSlug: getShortIoSlug(affiliateUrl),
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
  // Dit was een <button> met window.open() ná een await fetch(). Twee problemen:
  // de link had geen href — dus onzichtbaar voor crawlers, geen rel-attributen,
  // niet te middenklikken of te kopiëren — en window.open() viel door de await
  // buiten het klik-gebaar, waardoor popup-blokkers 'm konden tegenhouden.
  // Nu is het een echte link: de browser navigeert zelf, meten gebeurt ernaast.
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        data-affiliate-slug={getShortIoSlug(affiliateUrl) ?? undefined}
        onClick={() => trackAffiliateClick(vpnId, affiliateUrl)}
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
  children: React.ReactNode;
}

/**
 * Inline affiliate link for contextual prices and editorial CTAs.
 * It deliberately shares the same sponsored/nofollow and click tracking
 * contract as the primary button, so every commercial link stays auditable.
 */
export function AffiliateTextLink({
  vpnId,
  vpnName,
  affiliateUrl,
  className,
  children,
}: AffiliateTextLinkProps) {
  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className={className}
      aria-label={`Visit ${vpnName}`}
      data-affiliate-slug={getShortIoSlug(affiliateUrl) ?? undefined}
      onClick={() => trackAffiliateClick(vpnId, affiliateUrl)}
    >
      {children}
    </a>
  );
}
