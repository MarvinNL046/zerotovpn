"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Globe2,
  MapPin,
  Network,
  ShieldAlert,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { HomepageEditorialCopy } from "@/data/homepage";
import { AffiliateButton } from "@/components/vpn/affiliate-button";
import {
  isNordVpnBannerPromotionAllowed,
  normalizeNordPromotionPath,
} from "@/lib/nordvpn-promotion-context";
import styles from "./homepage-protection-bar.module.css";

interface IpSummary {
  ip: string;
  city: string;
  country: string;
  isp: string;
}

type IpStatus =
  | { state: "loading" }
  | { state: "success"; data: IpSummary }
  | { state: "error" };

interface HomepageProtectionBarProps {
  copy: HomepageEditorialCopy["protectionBar"];
  nordAffiliateUrl: string;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function firstSentence(value: string): string {
  const sentenceEnd = value.search(/[.!?。]/);
  return sentenceEnd >= 0 ? value.slice(0, sentenceEnd + 1) : value;
}

function parseIpSummary(value: unknown): IpSummary | null {
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;
  const ip = readString(record.ip);
  if (!ip) return null;

  return {
    ip,
    city: readString(record.city),
    country: readString(record.country),
    isp: readString(record.isp),
  };
}

export function HomepageProtectionBar({
  copy,
  nordAffiliateUrl,
}: HomepageProtectionBarProps) {
  const [status, setStatus] = useState<IpStatus>({ state: "loading" });
  const pathname = usePathname() ?? "/";
  const normalizedPath = normalizeNordPromotionPath(pathname);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    const timeoutId = window.setTimeout(() => controller.abort(), 5_000);

    async function loadPublicIp() {
      try {
        const response = await fetch("/api/ip", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok)
          throw new Error(`IP lookup returned ${response.status}`);

        const summary = parseIpSummary(await response.json());
        if (!summary) throw new Error("IP lookup returned an invalid response");

        setStatus({ state: "success", data: summary });
      } catch {
        if (mounted) setStatus({ state: "error" });
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    void loadPublicIp();

    return () => {
      mounted = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const isLocalPreview =
    status.state === "success" &&
    (status.data.ip === "unknown" || status.data.country === "Local");
  const location =
    status.state === "success"
      ? [status.data.city, status.data.country].filter(Boolean).join(", ")
      : "";
  const isPublicRoute = status.state === "success" && !isLocalPreview;
  const showNordCta =
    isPublicRoute &&
    Boolean(nordAffiliateUrl) &&
    isNordVpnBannerPromotionAllowed(pathname);
  const showIpCheckerLink = normalizedPath !== "/tools/what-is-my-ip";
  const compactBoundary = firstSentence(copy.disclaimer);
  const compactPartnerDisclosure = firstSentence(copy.partner);

  return (
    <section
      className={
        isPublicRoute
          ? "border-b border-red-950 bg-red-900 text-white"
          : "border-b border-white/10 bg-[#071226] text-white"
      }
      style={
        isPublicRoute
          ? { backgroundColor: "#881337", borderColor: "#4c0519" }
          : undefined
      }
      data-protection-state={
        isPublicRoute
          ? "not-verified"
          : isLocalPreview
            ? "local-preview"
            : status.state
      }
    >
      <div
        className={`${styles.layout} mx-auto max-w-7xl gap-3 px-4 py-3 sm:min-h-[6.5rem] sm:gap-4 sm:px-6 sm:py-4 md:items-center md:gap-6 lg:px-8`}
      >
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <span
              className={
                isPublicRoute
                  ? "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-red-900"
                  : "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#b8e34a] text-[#071226]"
              }
              style={isPublicRoute ? { color: "#881337" } : undefined}
            >
              {isPublicRoute ? (
                <ShieldAlert className="size-5" aria-hidden="true" />
              ) : (
                <Globe2 className="size-5" aria-hidden="true" />
              )}
            </span>

            <div className="min-w-0" aria-live="polite" aria-atomic="true">
              {status.state === "loading" ? (
                <p className="min-h-6 text-sm font-semibold text-white/90">
                  {copy.checking}
                </p>
              ) : null}

              {status.state === "error" ? (
                <p className="min-h-6 text-sm font-semibold text-white/90">
                  {copy.unavailable}
                </p>
              ) : null}

              {status.state === "success" ? (
                <div>
                  <p className="text-base font-black tracking-tight text-white sm:text-lg">
                    {isLocalPreview ? copy.localPreview : copy.visibleIp}
                  </p>

                  <div
                    className="mt-1.5 hidden flex-wrap items-center gap-x-4 gap-y-2 sm:flex"
                    data-screenshot-sensitive
                  >
                    <p className="flex min-w-0 items-center gap-2 text-sm">
                      <Globe2
                        className={
                          isPublicRoute
                            ? "size-4 shrink-0 text-white/75"
                            : "size-4 shrink-0 text-[#66d9ef]"
                        }
                        aria-hidden="true"
                      />
                      <strong className="truncate font-mono text-[#d9ff73]">
                        {status.data.ip}
                      </strong>
                    </p>

                    {location ? (
                      <p className="hidden items-center gap-1.5 text-xs text-white/75 sm:flex">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        <span>{copy.estimatedLocation}:</span>
                        <strong className="font-medium text-white">
                          {location}
                        </strong>
                      </p>
                    ) : null}

                    {status.data.isp ? (
                      <p className="hidden min-w-0 items-center gap-1.5 text-xs text-white/75 md:flex">
                        <Network
                          className="size-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{copy.network}:</span>
                        <strong className="truncate font-medium text-white">
                          {status.data.isp}
                        </strong>
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <p
                className={
                  isPublicRoute
                    ? "mt-1 max-w-4xl text-xs font-medium leading-5 text-white/85"
                    : "mt-1 max-w-4xl text-xs leading-5 text-white/60"
                }
              >
                <span className={styles.compactOnly}>{compactBoundary}</span>
                <span className={styles.fullOnly}>
                  {isPublicRoute && copy.publicDisclaimer
                    ? copy.publicDisclaimer
                    : copy.disclaimer}
                </span>
              </p>
            </div>
          </div>
        </div>

        {showNordCta || showIpCheckerLink ? (
          <div className="flex shrink-0 flex-col items-stretch gap-1.5">
            {showNordCta ? (
              <>
                <AffiliateButton
                  vpnId="nordvpn"
                  vpnName="NordVPN"
                  affiliateUrl={nordAffiliateUrl}
                  size="lg"
                  className="h-11 w-full bg-[#b8e34a] px-5 text-sm font-black text-[#071226] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-[#d0f473] sm:h-12"
                >
                  {copy.cta}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </AffiliateButton>
                <p
                  className={`${styles.partnerDisclosure} font-medium text-white/80`}
                >
                  <span className={styles.compactOnly}>
                    {compactPartnerDisclosure}
                  </span>
                  <span className={styles.fullOnly}>{copy.partner}</span>
                </p>
              </>
            ) : null}

            {showIpCheckerLink ? (
              <Link
                href="/tools/what-is-my-ip"
                className={
                  showNordCta
                    ? `${styles.secondaryWhenWide} min-h-6 items-center justify-center text-xs font-bold text-white underline decoration-white/45 underline-offset-4 transition-colors hover:text-[#d9ff73]`
                    : "inline-flex min-h-11 items-center justify-center rounded-md bg-[#b8e34a] px-4 py-2 text-sm font-bold text-[#071226] transition-colors hover:bg-[#c9ee69] sm:min-h-12"
                }
              >
                {copy.review}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
