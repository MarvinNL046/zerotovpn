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

export function AffiliateButton({
  vpnId,
  vpnName,
  affiliateUrl,
  variant = "default",
  size = "default",
  className,
  children,
}: AffiliateButtonProps) {
  const handleClick = async () => {
    // Track the click
    try {
      await fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vpnId,
          page: window.location.pathname,
          referrer: document.referrer,
        }),
      });
    } catch (error) {
      // Silently fail - don't block the user
      console.error("Failed to track click:", error);
    }

    // Open affiliate link in new tab
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {children || (
        <>
          Visit {vpnName}
          <ExternalLink className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
