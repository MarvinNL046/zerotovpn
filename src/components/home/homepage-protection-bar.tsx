"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Globe2, MapPin, Network, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { HomepageEditorialCopy } from "@/data/homepage";

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
  announcement: HomepageEditorialCopy["announcement"];
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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
  announcement,
}: HomepageProtectionBarProps) {
  const [status, setStatus] = useState<IpStatus>({ state: "loading" });

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

  return (
    <section className="border-b border-white/10 bg-[#071226] text-white">
      <div className="mx-auto grid min-h-[8.5rem] max-w-7xl gap-4 px-4 py-4 sm:min-h-[6.5rem] sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#b8e34a] text-[#071226]">
              <ShieldCheck className="size-5" aria-hidden="true" />
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
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-2"
                  data-screenshot-sensitive
                >
                  <p className="flex min-w-0 items-center gap-2 text-sm">
                    <Globe2
                      className="size-4 shrink-0 text-[#66d9ef]"
                      aria-hidden="true"
                    />
                    <span className="text-white/70">
                      {isLocalPreview ? copy.localPreview : copy.visibleIp}:
                    </span>
                    <strong className="truncate font-mono text-[#b8e34a]">
                      {status.data.ip}
                    </strong>
                  </p>

                  {location ? (
                    <p className="hidden items-center gap-1.5 text-xs text-white/70 sm:flex">
                      <MapPin
                        className="size-3.5 text-[#66d9ef]"
                        aria-hidden="true"
                      />
                      <span>{copy.estimatedLocation}:</span>
                      <strong className="font-medium text-white">
                        {location}
                      </strong>
                    </p>
                  ) : null}

                  {status.data.isp ? (
                    <p className="hidden min-w-0 items-center gap-1.5 text-xs text-white/70 md:flex">
                      <Network
                        className="size-3.5 shrink-0 text-[#66d9ef]"
                        aria-hidden="true"
                      />
                      <span>{copy.network}:</span>
                      <strong className="truncate font-medium text-white">
                        {status.data.isp}
                      </strong>
                    </p>
                  ) : null}
                </div>
              ) : null}

              <p className="mt-1 max-w-4xl text-xs leading-5 text-white/60">
                {copy.disclaimer}
              </p>
            </div>
          </div>

          <Link
            href="/reports"
            className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 pl-12 text-xs font-semibold text-white/80 transition-colors hover:text-[#b8e34a]"
          >
            <span className="text-[#b8e34a]">{announcement.label}:</span>
            <span>{announcement.text}</span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[#66d9ef]">
              {announcement.cta}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-3 pl-12 lg:flex-col lg:items-end lg:pl-0">
          <Link
            href="/tools/what-is-my-ip"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#b8e34a] px-4 py-2 text-sm font-bold text-[#071226] transition-colors hover:bg-[#c9ee69]"
          >
            {copy.review}
          </Link>
        </div>
      </div>
    </section>
  );
}
