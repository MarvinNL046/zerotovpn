"use client";

import { useCallback, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Database,
  ExternalLink,
  Globe2,
  Info,
  Laptop,
  Loader2,
  Network,
  Play,
  RotateCcw,
  Server,
  ShieldQuestion,
} from "lucide-react";
import { getDnsLeakCopy, type DnsLeakCopy } from "@/data/dns-leak-test";
import styles from "./dns-leak-diagnostic.module.css";

type RouteCheckStatus = "idle" | "running" | "observed" | "error";

type RouteObservation = {
  ip: string;
  city: string;
  country: string;
  network: string;
  vpnDetection: "unsupported";
};

type IpResponse = {
  ip?: unknown;
  city?: unknown;
  country?: unknown;
  isp?: unknown;
  org?: unknown;
  vpnDetection?: unknown;
};

const STATUS_ICONS = {
  idle: CircleDashed,
  running: Loader2,
  observed: Info,
  error: AlertTriangle,
} as const;

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function maskIp(ip: string, fallback: string): string {
  if (!ip || ip === "unknown") return fallback;
  if (ip.includes(".")) {
    const parts = ip.split(".");
    return parts.length === 4 ? `${parts[0]}.${parts[1]}.••.••` : fallback;
  }
  if (ip.includes(":")) {
    const parts = ip.split(":").filter(Boolean).slice(0, 3);
    return parts.length ? `${parts.join(":")}:••••` : fallback;
  }
  return fallback;
}

function parseObservation(data: IpResponse): RouteObservation {
  const ip = readString(data.ip);
  if (!ip) throw new Error("Missing public route");

  return {
    ip,
    city: readString(data.city),
    country: readString(data.country),
    network: readString(data.isp) || readString(data.org),
    vpnDetection: "unsupported",
  };
}

function StateRail({
  copy,
  active,
}: {
  copy: DnsLeakCopy["tool"];
  active: RouteCheckStatus;
}) {
  return (
    <section className={styles.stateSection} aria-labelledby="dns-state-title">
      <div className={styles.stateIntro}>
        <p className={styles.smallEyebrow}>{copy.statesTitle}</p>
        <p id="dns-state-title">{copy.statesIntro}</p>
      </div>
      <div className={styles.stateRail}>
        {copy.states.map((state) => {
          const Icon = STATUS_ICONS[state.id];
          const isActive = state.id === active;
          return (
            <article
              key={state.id}
              className={styles.stateCard}
              data-state={state.id}
              data-active={isActive ? "true" : "false"}
              aria-current={isActive ? "step" : undefined}
            >
              <Icon
                aria-hidden="true"
                className={
                  state.id === "running" && isActive ? styles.spin : undefined
                }
              />
              <div>
                <strong>{state.label}</strong>
                <p>{state.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RouteDiagram({
  copy,
  active,
}: {
  copy: DnsLeakCopy["tool"]["route"];
  active: boolean;
}) {
  const nodes = [
    { label: copy.device, detail: copy.measured, Icon: Laptop, measured: true },
    {
      label: copy.publicRoute,
      detail: copy.measured,
      Icon: Network,
      measured: true,
    },
    {
      label: copy.resolver,
      detail: copy.notMeasured,
      Icon: Server,
      measured: false,
    },
    {
      label: copy.destination,
      detail: copy.notMeasured,
      Icon: Globe2,
      measured: false,
    },
  ];

  return (
    <figure className={styles.routeDiagram}>
      <figcaption>{copy.title}</figcaption>
      <div className={styles.routeNodes}>
        {nodes.map((node, index) => (
          <div className={styles.routeStep} key={node.label}>
            <div
              className={styles.routeNode}
              data-measured={node.measured && active ? "true" : "false"}
            >
              <node.Icon aria-hidden="true" />
              <strong>{node.label}</strong>
              <span>{node.detail}</span>
            </div>
            {index < nodes.length - 1 ? (
              <ArrowRight className={styles.routeArrow} aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}

export function DnsLeakWidget({
  copy = getDnsLeakCopy("en").tool,
}: {
  copy?: DnsLeakCopy["tool"];
}) {
  const [status, setStatus] = useState<RouteCheckStatus>("idle");
  const [phase, setPhase] = useState(0);
  const [observation, setObservation] = useState<RouteObservation | null>(null);

  const runCheck = useCallback(async () => {
    setStatus("running");
    setPhase(0);
    setObservation(null);

    try {
      const response = await fetch("/api/ip", {
        cache: "no-store",
        signal: AbortSignal.timeout(6_000),
      });
      if (!response.ok)
        throw new Error(`Route check returned ${response.status}`);

      setPhase(1);
      const data = (await response.json()) as IpResponse;
      const nextObservation = parseObservation(data);
      setPhase(2);
      setObservation(nextObservation);
      setStatus("observed");
    } catch {
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setPhase(0);
    setObservation(null);
  }, []);

  const region = observation
    ? [observation.city, observation.country].filter(Boolean).join(", ") ||
      copy.labels.unknown
    : copy.labels.unknown;
  const liveStatus =
    status === "running"
      ? copy.runningTitle
      : status === "observed"
        ? copy.observedTitle
        : status === "idle"
          ? copy.idleTitle
          : "";

  return (
    <div className={styles.toolStack}>
      <section
        className={styles.toolConsole}
        data-status={status}
        aria-labelledby="dns-tool-title"
      >
        <div className={styles.consoleHeader}>
          <div>
            <p className={styles.consoleEyebrow}>{copy.eyebrow}</p>
            <h2 id="dns-tool-title">{copy.title}</h2>
            <p>{copy.intro}</p>
          </div>
          <span className={styles.localOnlyBadge}>
            <Database aria-hidden="true" />
            {copy.labels.notStored}
          </span>
        </div>

        <div className={styles.consoleGrid}>
          <p className="sr-only" aria-atomic="true" aria-live="polite">
            {liveStatus}
          </p>
          <div className={styles.resultPanel}>
            {status === "idle" ? (
              <div className={styles.idleState}>
                <span className={styles.statusIcon} data-tone="info">
                  <ShieldQuestion aria-hidden="true" />
                </span>
                <p className={styles.resultLabel}>{copy.idleTitle}</p>
                <p>{copy.idleBody}</p>
                <button
                  className={styles.primaryButton}
                  type="button"
                  onClick={runCheck}
                >
                  <Play aria-hidden="true" />
                  {copy.start}
                </button>
              </div>
            ) : null}

            {status === "running" ? (
              <div className={styles.runningState}>
                <span className={styles.statusIcon} data-tone="running">
                  <Loader2 className={styles.spin} aria-hidden="true" />
                </span>
                <p className={styles.resultLabel}>{copy.runningTitle}</p>
                <p>{copy.runningBody}</p>
                <ol className={styles.phaseList}>
                  {copy.phases.map((item, index) => (
                    <li
                      key={item}
                      data-phase={
                        index < phase
                          ? "done"
                          : index === phase
                            ? "active"
                            : "waiting"
                      }
                    >
                      {index < phase ? (
                        <CheckCircle2 aria-hidden="true" />
                      ) : index === phase ? (
                        <Loader2 className={styles.spin} aria-hidden="true" />
                      ) : (
                        <CircleDashed aria-hidden="true" />
                      )}
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {status === "observed" && observation ? (
              <div className={styles.observedState}>
                <div className={styles.resultHeadline}>
                  <span className={styles.statusIcon} data-tone="observed">
                    <Info aria-hidden="true" />
                  </span>
                  <div>
                    <p className={styles.resultLabel}>{copy.observedTitle}</p>
                    <p>{copy.observedBody}</p>
                  </div>
                </div>

                <dl className={styles.metricGrid} data-screenshot-sensitive>
                  <div>
                    <dt>{copy.labels.publicIp}</dt>
                    <dd>{maskIp(observation.ip, copy.labels.unknown)}</dd>
                  </div>
                  <div>
                    <dt>{copy.labels.approximateRegion}</dt>
                    <dd>{region}</dd>
                  </div>
                  <div>
                    <dt>{copy.labels.network}</dt>
                    <dd>{observation.network || copy.labels.unknown}</dd>
                  </div>
                  <div>
                    <dt>{copy.labels.vpnSignal}</dt>
                    <dd>{copy.labels.unsupported}</dd>
                  </div>
                  <div>
                    <dt>{copy.labels.dnsResolver}</dt>
                    <dd>{copy.labels.notMeasured}</dd>
                  </div>
                  <div>
                    <dt>{copy.labels.storage}</dt>
                    <dd>{copy.labels.notStored}</dd>
                  </div>
                </dl>

                <p className={styles.externalNote}>{copy.externalNote}</p>
                <div className={styles.resultActions}>
                  <a
                    className={styles.primaryButton}
                    href="https://browserleaks.com/dns"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.openResolverTest}
                    <ExternalLink aria-hidden="true" />
                  </a>
                  <button
                    className={styles.secondaryButton}
                    type="button"
                    onClick={reset}
                  >
                    <RotateCcw aria-hidden="true" />
                    {copy.runAgain}
                  </button>
                </div>
              </div>
            ) : null}

            {status === "error" ? (
              <div className={styles.errorState} role="alert">
                <span className={styles.statusIcon} data-tone="error">
                  <AlertTriangle aria-hidden="true" />
                </span>
                <p className={styles.resultLabel}>{copy.errorTitle}</p>
                <p>{copy.errorBody}</p>
                <button
                  className={styles.primaryButton}
                  type="button"
                  onClick={runCheck}
                >
                  <RotateCcw aria-hidden="true" />
                  {copy.retry}
                </button>
              </div>
            ) : null}
          </div>

          <RouteDiagram copy={copy.route} active={status === "observed"} />
        </div>
      </section>

      <StateRail copy={copy} active={status} />
    </div>
  );
}
