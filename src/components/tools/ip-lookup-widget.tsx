"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  CircleDashed,
  Clock3,
  Copy,
  Eye,
  EyeOff,
  Globe2,
  Info,
  Loader2,
  MapPin,
  Network,
  RefreshCw,
  ShieldQuestion,
} from "lucide-react";
import type { IpCheckerCopy, IpCheckerLocale } from "@/data/ip-checker";
import styles from "./ip-checker.module.css";

type RouteSuccess = {
  ok: true;
  schemaVersion: 1;
  observedAt: string;
  route: {
    ip: string;
    version: 4 | 6;
    scope: "public" | "local_preview";
  };
  geo: {
    status: "available" | "unavailable";
    accuracy: "approximate";
    city: string | null;
    region: string | null;
    country: string | null;
    countryCode: string | null;
    timezone: string | null;
  };
  network: {
    organization: string | null;
    asn: string | null;
  };
  checks: {
    vpn: "not_performed";
    proxy: "not_performed";
    dns: "not_performed";
    webrtc: "not_performed";
    encryption: "not_performed";
  };
};

type ViewState =
  | { status: "loading" }
  | { status: "observed" | "local" | "partial"; result: RouteSuccess }
  | { status: "error" };

function isStringOrNull(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function parseRouteResult(value: unknown): RouteSuccess {
  if (!value || typeof value !== "object") throw new Error("Invalid result");
  const data = value as Record<string, unknown>;
  if (data.ok !== true || data.schemaVersion !== 1) {
    throw new Error("Route unavailable");
  }

  const route = data.route as Record<string, unknown> | undefined;
  const geo = data.geo as Record<string, unknown> | undefined;
  const network = data.network as Record<string, unknown> | undefined;
  const checks = data.checks as Record<string, unknown> | undefined;
  const observedAt = data.observedAt;
  const validIp = typeof route?.ip === "string" && route.ip.length <= 45;
  const validVersion = route?.version === 4 || route?.version === 6;
  const validScope =
    route?.scope === "public" || route?.scope === "local_preview";
  const validGeo =
    (geo?.status === "available" || geo?.status === "unavailable") &&
    geo?.accuracy === "approximate" &&
    isStringOrNull(geo.city) &&
    isStringOrNull(geo.region) &&
    isStringOrNull(geo.country) &&
    isStringOrNull(geo.countryCode) &&
    isStringOrNull(geo.timezone);
  const validNetwork =
    isStringOrNull(network?.organization) && isStringOrNull(network?.asn);
  const validChecks =
    checks?.vpn === "not_performed" &&
    checks?.proxy === "not_performed" &&
    checks?.dns === "not_performed" &&
    checks?.webrtc === "not_performed" &&
    checks?.encryption === "not_performed";

  if (
    !validIp ||
    !validVersion ||
    !validScope ||
    !validGeo ||
    !validNetwork ||
    !validChecks ||
    typeof observedAt !== "string" ||
    Number.isNaN(Date.parse(observedAt))
  ) {
    throw new Error("Invalid route result");
  }

  return value as RouteSuccess;
}

function getLocation(result: RouteSuccess, locale: IpCheckerLocale) {
  let country = result.geo.country;
  if (!country && result.geo.countryCode) {
    try {
      country = new Intl.DisplayNames([locale], { type: "region" }).of(
        result.geo.countryCode,
      ) ?? result.geo.countryCode;
    } catch {
      country = result.geo.countryCode;
    }
  }
  return [result.geo.city, result.geo.region, country]
    .filter(Boolean)
    .join(", ");
}

function maskIp(ip: string, version: 4 | 6) {
  if (version === 4) {
    const parts = ip.split(".");
    return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.•••` : "•••";
  }
  const parts = ip.split(":").filter(Boolean);
  return `${parts.slice(0, 3).join(":")}${parts.length ? ":" : ""}••••:••••`;
}

const statusIcons = {
  loading: Loader2,
  observed: Info,
  local: CircleDashed,
  partial: Info,
  error: AlertTriangle,
} as const;

export function IpLookupWidget({
  copy,
  locale,
}: {
  copy: IpCheckerCopy["tool"];
  locale: IpCheckerLocale;
}) {
  const [state, setState] = useState<ViewState>({ status: "loading" });
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCheck = useCallback(async (signal?: AbortSignal) => {
    setState({ status: "loading" });
    setRevealed(false);
    setCopied(false);
    try {
      const response = await fetch("/api/ip", {
        cache: "no-store",
        credentials: "same-origin",
        signal: signal ?? AbortSignal.timeout(6_000),
      });
      if (!response.ok) throw new Error(`IP route returned ${response.status}`);
      const result = parseRouteResult(await response.json());
      const status =
        result.route.scope === "local_preview"
          ? "local"
          : result.geo.status === "available"
            ? "observed"
            : "partial";
      setState({ status, result });
    } catch {
      setState({ status: "error" });
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6_000);
    void runCheck(controller.signal).finally(() => window.clearTimeout(timeout));
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [runCheck]);

  const result = state.status === "loading" || state.status === "error"
    ? null
    : state.result;
  const location = useMemo(
    () => (result ? getLocation(result, locale) : ""),
    [locale, result],
  );
  const statusCopy =
    state.status === "loading"
      ? { title: copy.loadingTitle, body: copy.loadingBody }
      : state.status === "observed"
        ? { title: copy.observedTitle, body: copy.observedBody }
        : state.status === "local"
          ? { title: copy.localTitle, body: copy.localBody }
          : state.status === "partial"
            ? { title: copy.partialTitle, body: copy.partialBody }
            : { title: copy.errorTitle, body: copy.errorBody };
  const StatusIcon = statusIcons[state.status];

  async function copyAddress() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.route.ip);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      className={styles.lab}
      aria-labelledby="ip-checker-heading"
      aria-busy={state.status === "loading"}
      data-ip-state={state.status}
    >
      <div className={styles.labTopbar}>
        <div>
          <span className={styles.liveDot} aria-hidden="true" />
          {copy.eyebrow}
        </div>
        <span>public-route-v1</span>
      </div>

      <div className={styles.labBody}>
        <header className={styles.toolHeader}>
          <div>
            <p className={styles.consoleKicker}>{copy.eyebrow}</p>
            <h2 id="ip-checker-heading">{copy.title}</h2>
            <p>{copy.intro}</p>
          </div>
          <span className={styles.statusPill} data-state={state.status}>
            <StatusIcon
              aria-hidden="true"
              className={state.status === "loading" ? styles.spin : undefined}
            />
            {statusCopy.title}
          </span>
        </header>

        <p className={styles.srStatus} role="status" aria-live="polite">
          {statusCopy.title}. {statusCopy.body}
        </p>

        {state.status === "loading" ? (
          <div className={styles.loadingPanel}>
            <div className={styles.loadingAddress} aria-hidden="true" />
            <div className={styles.loadingGrid} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>{statusCopy.body}</p>
          </div>
        ) : state.status === "error" ? (
          <div className={styles.errorPanel} role="alert">
            <AlertTriangle aria-hidden="true" />
            <div>
              <h3>{statusCopy.title}</h3>
              <p>{statusCopy.body}</p>
              <button className={styles.primaryButton} onClick={() => void runCheck()}>
                <RefreshCw aria-hidden="true" />
                {copy.retry}
              </button>
            </div>
          </div>
        ) : result ? (
          <div className={styles.resultPanel}>
            <div className={styles.resultStatus} data-state={state.status}>
              <StatusIcon aria-hidden="true" />
              <div>
                <h3>{statusCopy.title}</h3>
                <p>{statusCopy.body}</p>
              </div>
            </div>

            <div className={styles.addressCard}>
              <div>
                <span>
                  {result.route.scope === "local_preview"
                    ? copy.labels.localAddress
                    : copy.labels.publicIp}
                </span>
                <code data-screenshot-sensitive="true">
                  {revealed
                    ? result.route.ip
                    : maskIp(result.route.ip, result.route.version)}
                </code>
              </div>
              <div className={styles.addressActions}>
                <button
                  type="button"
                  onClick={() => setRevealed((value) => !value)}
                  aria-pressed={revealed}
                >
                  {revealed ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  {revealed ? copy.hide : copy.show}
                </button>
                <button type="button" onClick={() => void copyAddress()}>
                  {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                  {copied ? copy.copied : copy.copy}
                </button>
              </div>
            </div>

            <dl className={styles.metricGrid}>
              <div>
                <Globe2 aria-hidden="true" />
                <dt>{copy.labels.addressType}</dt>
                <dd>{`IPv${result.route.version}`}</dd>
              </div>
              <div data-screenshot-sensitive="true">
                <MapPin aria-hidden="true" />
                <dt>{copy.labels.approximateLocation}</dt>
                <dd>
                  {result.route.scope === "local_preview"
                    ? copy.labels.localPreview
                    : location || copy.labels.unavailable}
                </dd>
              </div>
              <div data-screenshot-sensitive="true">
                <Clock3 aria-hidden="true" />
                <dt>{copy.labels.timezone}</dt>
                <dd>{result.geo.timezone || copy.labels.unavailable}</dd>
              </div>
              <div data-screenshot-sensitive="true">
                <Network aria-hidden="true" />
                <dt>{copy.labels.network}</dt>
                <dd>
                  {[result.network.organization, result.network.asn]
                    .filter(Boolean)
                    .join(" · ") || copy.labels.unavailable}
                </dd>
              </div>
              <div>
                <ShieldQuestion aria-hidden="true" />
                <dt>{copy.labels.vpnCheck}</dt>
                <dd>{copy.labels.notPerformed}</dd>
              </div>
              <div>
                <Info aria-hidden="true" />
                <dt>{copy.labels.observedAt}</dt>
                <dd>
                  <time dateTime={result.observedAt}>
                    {new Intl.DateTimeFormat(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(new Date(result.observedAt))}
                  </time>
                </dd>
              </div>
            </dl>

            <div className={styles.resultFooter}>
              <p>{copy.limitation}</p>
              <button className={styles.secondaryButton} onClick={() => void runCheck()}>
                <RefreshCw aria-hidden="true" />
                {copy.refresh}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
