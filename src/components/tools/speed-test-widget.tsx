"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  Check,
  Clipboard,
  Download,
  FileDown,
  Gauge,
  HardDrive,
  Info,
  Play,
  RotateCcw,
  Square,
  Timer,
  Trash2,
  Upload,
  Wifi,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { SpeedTestWidgetCopy } from "@/data/speed-test";
import {
  runSpeedTest,
  SPEED_TEST_LIMITS,
  type SpeedRunKind,
  type SpeedTestPhase,
  type SpeedTestProgress,
  type SpeedTestRun,
} from "@/components/tools/speed-test/speed-test-engine";
import styles from "@/components/tools/speed-test-lab.module.css";

const STORAGE_KEY = "zerotovpn-speed-runs-v3";
const HISTORY_LIMIT = 10;

type QaSpeedState = "running" | "complete" | "error";

function createQaRun(
  kind: SpeedRunKind,
  values: {
    downloadMbps: number;
    uploadMbps: number;
    responseTimeMs: number;
    variationMs: number;
  },
): SpeedTestRun {
  return {
    id: `qa-speed-${kind}`,
    kind,
    observedAt: "2026-08-16T12:00:00.000Z",
    endpoint: "Cloudflare network edge",
    methodVersion: "browser-speed-2026-08-v3",
    valid: true,
    ...values,
    audit: {
      responseTime: {
        method: "browser_fetch_round_trip",
        attemptCount: 12,
        sampleCount: 12,
        requestedBytes: 0,
        transferredBytes: 0,
        durationMs: 1420,
        valid: true,
      },
      download: {
        method: "aggregate_download_payload_throughput",
        attemptCount: 8,
        sampleCount: 18,
        requestedBytes: 96_000_000,
        transferredBytes: 96_000_000,
        durationMs: 8000,
        valid: true,
      },
      upload: {
        method: "aggregate_upload_payload_throughput",
        attemptCount: 80,
        sampleCount: 80,
        requestedBytes: 20_000_000,
        transferredBytes: 20_000_000,
        durationMs: 6000,
        valid: true,
      },
      totalRequestedBytes: 116_000_000,
      totalTransferredBytes: 116_000_000,
      limits: SPEED_TEST_LIMITS,
    },
  };
}

function isStoredRun(value: unknown): value is SpeedTestRun {
  if (!value || typeof value !== "object") return false;
  const run = value as Partial<SpeedTestRun>;
  return (
    typeof run.id === "string" &&
    (run.kind === "baseline" || run.kind === "vpn" || run.kind === "unsure") &&
    typeof run.observedAt === "string" &&
    typeof run.downloadMbps === "number" &&
    run.downloadMbps > 0 &&
    typeof run.uploadMbps === "number" &&
    run.uploadMbps > 0 &&
    typeof run.responseTimeMs === "number" &&
    run.responseTimeMs > 0 &&
    typeof run.variationMs === "number" &&
    run.variationMs >= 0 &&
    run.valid === true &&
    run.methodVersion === "browser-speed-2026-08-v3" &&
    typeof run.audit === "object" &&
    run.audit !== null &&
    run.audit.responseTime?.valid === true &&
    run.audit.download?.valid === true &&
    run.audit.upload?.valid === true
  );
}

function readHistory(): SpeedTestRun[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(isStoredRun).slice(0, HISTORY_LIMIT)
      : [];
  } catch {
    return [];
  }
}

function saveHistory(runs: SpeedTestRun[]): boolean {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(runs.slice(0, HISTORY_LIMIT)),
    );
    return true;
  } catch {
    // A completed result remains visible when local storage is unavailable.
    return false;
  }
}

function formatNumber(
  value: number,
  digits = 1,
  locale: "en" | "nl" = "en",
): string {
  return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

function formatTime(iso: string, locale: "en" | "nl"): string {
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function phaseIndex(phase: SpeedTestPhase): number {
  if (phase === "ping") return 1;
  if (phase === "download") return 2;
  if (phase === "upload") return 3;
  if (phase === "complete") return 4;
  return 0;
}

function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  locale,
}: {
  icon: typeof Download;
  label: string;
  value: number | null;
  unit: string;
  locale: "en" | "nl";
}) {
  return (
    <div className={styles.metricCard}>
      <span className={styles.metricIcon} aria-hidden="true">
        <Icon />
      </span>
      <span>{label}</span>
      <strong>{value === null ? "—" : formatNumber(value, 1, locale)}</strong>
      <small>{value === null ? "" : unit}</small>
    </div>
  );
}

function RunKindLabel({
  kind,
  copy,
}: {
  kind: SpeedRunKind;
  copy: SpeedTestWidgetCopy;
}) {
  return (
    <span className={styles.runKind} data-kind={kind}>
      {kind === "baseline"
        ? copy.baseline
        : kind === "vpn"
          ? copy.vpn
          : copy.unsure}
    </span>
  );
}

export function SpeedTestWidget({
  copy,
  locale,
}: {
  copy: SpeedTestWidgetCopy;
  locale: "en" | "nl";
}) {
  const radioName = useId();
  const [kind, setKind] = useState<SpeedRunKind>("baseline");
  const [phase, setPhase] = useState<SpeedTestPhase>("idle");
  const [progress, setProgress] = useState<SpeedTestProgress | null>(null);
  const [result, setResult] = useState<SpeedTestRun | null>(null);
  const [history, setHistory] = useState<SpeedTestRun[]>([]);
  const [historyReady, setHistoryReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [comparisonConfirmed, setComparisonConfirmed] = useState(false);
  const [storageSaved, setStorageSaved] = useState<boolean | null>(null);
  const [qaState, setQaState] = useState<QaSpeedState | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const requestedQaState =
      process.env.NODE_ENV !== "production"
        ? new URLSearchParams(window.location.search).get("qa-speed-state")
        : null;
    if (
      requestedQaState === "running" ||
      requestedQaState === "complete" ||
      requestedQaState === "error"
    ) {
      setQaState(requestedQaState);
      if (requestedQaState === "running") {
        setPhase("download");
        setProgress({ phase: "download", progress: 63, liveValue: 78.4 });
      } else if (requestedQaState === "complete") {
        const baseline = createQaRun("baseline", {
          downloadMbps: 101.2,
          uploadMbps: 38.4,
          responseTimeMs: 18.2,
          variationMs: 2.4,
        });
        const vpn = createQaRun("vpn", {
          downloadMbps: 82.4,
          uploadMbps: 32.8,
          responseTimeMs: 24.6,
          variationMs: 3.1,
        });
        setKind("vpn");
        setHistory([vpn, baseline]);
        setResult(vpn);
        setPhase("complete");
        setStorageSaved(true);
      } else {
        setPhase("error");
      }
      setHistoryReady(true);
    } else {
      setHistory(readHistory());
      setHistoryReady(true);
    }
    return () => controllerRef.current?.abort();
  }, []);

  const running =
    phase === "ping" || phase === "download" || phase === "upload";
  const statusText =
    phase === "error"
      ? copy.errorTitle
      : phase === "stopped"
        ? copy.stoppedStatus
        : phase === "complete"
          ? storageSaved === false
            ? copy.completeUnsavedStatus
            : copy.completeStatus
          : running
            ? copy.runningStatus
            : copy.idleStatus;
  const currentStep = phaseIndex(phase);
  const latestBaseline = history.find((run) => run.kind === "baseline") ?? null;
  const latestVpn = history.find((run) => run.kind === "vpn") ?? null;
  const liveValue = progress?.liveValue ?? null;
  const dialValue = result?.downloadMbps ?? liveValue;
  const dialLabel = result
    ? copy.download
    : phase === "upload"
      ? copy.upload
      : phase === "download"
        ? copy.download
        : copy.phaseIdle;

  const start = useCallback(async () => {
    controllerRef.current?.abort();
    setQaState(null);
    const controller = new AbortController();
    controllerRef.current = controller;
    setResult(null);
    setProgress({ phase: "ping", progress: 0 });
    setPhase("ping");
    setCopied(false);
    setStorageSaved(null);

    try {
      const completed = await runSpeedTest(kind, controller.signal, (next) => {
        setProgress(next);
        setPhase(next.phase);
      });
      const nextHistory = [completed, ...readHistory()].slice(0, HISTORY_LIMIT);
      const saved = saveHistory(nextHistory);
      setStorageSaved(saved);
      setHistory(
        saved ? nextHistory : [completed, ...history].slice(0, HISTORY_LIMIT),
      );
      setHistoryReady(true);
      setComparisonConfirmed(false);
      setResult(completed);
      setProgress(null);
      setPhase("complete");
    } catch (error) {
      setProgress(null);
      setPhase(
        error instanceof DOMException && error.name === "AbortError"
          ? "stopped"
          : "error",
      );
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  }, [history, kind]);

  const shareResult = useCallback(async () => {
    if (!result) return;
    const text = `${copy.download}: ${formatNumber(result.downloadMbps, 1, locale)} Mbps · ${copy.upload}: ${formatNumber(result.uploadMbps, 1, locale)} Mbps · ${copy.ping}: ${formatNumber(result.responseTimeMs, 1, locale)} ms · ${copy.jitter}: ${formatNumber(result.variationMs, 1, locale)} ms`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [copy, locale, result]);

  const exportCsv = useCallback(() => {
    if (!history.length) return;
    const rows = [
      [
        "observed_at",
        "run_type",
        "download_mbps",
        "upload_mbps",
        "response_time_ms",
        "variation_ms",
        "endpoint",
        "method_version",
        "total_requested_bytes",
        "total_transferred_bytes",
        "response_samples",
        "download_samples",
        "upload_samples",
      ],
      ...history.map((run) => [
        run.observedAt,
        run.kind,
        String(run.downloadMbps),
        String(run.uploadMbps),
        String(run.responseTimeMs),
        String(run.variationMs),
        run.endpoint,
        run.methodVersion,
        String(run.audit.totalRequestedBytes),
        String(run.audit.totalTransferredBytes),
        String(run.audit.responseTime.sampleCount),
        String(run.audit.download.sampleCount),
        String(run.audit.upload.sampleCount),
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `zerotovpn-speed-runs-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [history]);

  const clearHistory = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* state still clears */
    }
    setHistory([]);
    setResult(null);
    setPhase("idle");
    setComparisonConfirmed(false);
    setConfirmClear(false);
  }, []);

  const kinds: Array<{
    value: SpeedRunKind;
    label: string;
    help: string;
    Icon: typeof Wifi;
  }> = [
    {
      value: "baseline",
      label: copy.baseline,
      help: copy.baselineHelp,
      Icon: Wifi,
    },
    { value: "vpn", label: copy.vpn, help: copy.vpnHelp, Icon: Gauge },
    { value: "unsure", label: copy.unsure, help: copy.unsureHelp, Icon: Info },
  ];
  const phases = [
    { label: copy.phaseIdle, help: copy.phaseIdleHelp },
    { label: copy.phasePing, help: copy.phasePingHelp },
    { label: copy.phaseDownload, help: copy.phaseDownloadHelp },
    { label: copy.phaseUpload, help: copy.phaseUploadHelp },
    { label: copy.phaseComplete, help: copy.phaseCompleteHelp },
  ];

  return (
    <section
      className={styles.lab}
      aria-labelledby="speed-lab-title"
      data-result-origin={qaState ? "fixture" : result ? "live" : "none"}
      data-speed-phase={phase}
    >
      <div className={styles.labTopbar}>
        <div>
          <span className={styles.liveDot} aria-hidden="true" />
          {copy.title}
        </div>
        <span>{copy.contextMethodValue}</span>
      </div>

      <div className={styles.labGrid}>
        <div className={styles.console} aria-busy={running}>
          <header className={styles.consoleHeader}>
            <div>
              <p className={styles.consoleKicker}>
                {locale === "nl"
                  ? "ZeroToVPN-netwerklab"
                  : "ZeroToVPN network lab"}
              </p>
              <h2 id="speed-lab-title">{copy.title}</h2>
              <p>{copy.intro}</p>
            </div>
            <span className={styles.statusPill} data-state={phase}>
              {statusText}
            </span>
          </header>

          <div className={styles.gaugeArea}>
            <div
              className={styles.gaugeDial}
              data-running={running}
              style={
                {
                  "--progress": `${progress?.progress ?? (result ? 100 : 0)}%`,
                } as React.CSSProperties
              }
            >
              <div className={styles.gaugeCenter}>
                <span>{dialLabel}</span>
                <strong>
                  {dialValue === null
                    ? "—"
                    : formatNumber(dialValue, 1, locale)}
                </strong>
                <small>{dialValue === null ? "" : copy.mbps}</small>
              </div>
            </div>

            <div className={styles.metricsGrid}>
              <MetricCard
                icon={Download}
                label={copy.download}
                value={result?.downloadMbps ?? null}
                unit={copy.mbps}
                locale={locale}
              />
              <MetricCard
                icon={Upload}
                label={copy.upload}
                value={result?.uploadMbps ?? null}
                unit={copy.mbps}
                locale={locale}
              />
              <MetricCard
                icon={Timer}
                label={copy.ping}
                value={result?.responseTimeMs ?? null}
                unit={copy.ms}
                locale={locale}
              />
              <MetricCard
                icon={Activity}
                label={copy.jitter}
                value={result?.variationMs ?? null}
                unit={copy.ms}
                locale={locale}
              />
            </div>
          </div>

          <div className={styles.phaseRail} aria-label={copy.runningStatus}>
            {phases.map((item, index) => (
              <div
                className={styles.phaseItem}
                data-active={index === currentStep}
                data-complete={index < currentStep || phase === "complete"}
                key={item.label}
              >
                <span>
                  {index < currentStep || phase === "complete" ? (
                    <Check />
                  ) : (
                    index + 1
                  )}
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.help}</small>
                </div>
              </div>
            ))}
          </div>

          {running && progress ? (
            <span
              className="sr-only"
              role="progressbar"
              aria-label={statusText}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress.progress)}
            />
          ) : null}

          <p
            className={styles.liveStatus}
            aria-live="polite"
            aria-atomic="true"
          >
            {phase === "error"
              ? `${copy.errorTitle}. ${copy.errorBody}`
              : statusText}
          </p>
        </div>

        <aside className={styles.controls} aria-label={copy.contextTitle}>
          <div className={styles.contextPanel}>
            <h3>{copy.contextTitle}</h3>
            <dl>
              <div>
                <dt>{copy.contextEndpoint}</dt>
                <dd>{copy.contextEndpointValue}</dd>
              </div>
              <div>
                <dt>{copy.contextMethod}</dt>
                <dd>{copy.contextMethodValue}</dd>
              </div>
              <div>
                <dt>{copy.contextStorage}</dt>
                <dd>{copy.contextStorageValue}</dd>
              </div>
            </dl>
          </div>

          <fieldset className={styles.runKinds} disabled={running}>
            <legend>{copy.runKindLabel}</legend>
            {kinds.map(({ value, label, help, Icon }) => (
              <label className={styles.runKindChoice} key={value}>
                <input
                  type="radio"
                  name={radioName}
                  value={value}
                  checked={kind === value}
                  onChange={() => setKind(value)}
                />
                <span className={styles.choiceIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{help}</small>
                </span>
                <Check className={styles.choiceCheck} aria-hidden="true" />
              </label>
            ))}
          </fieldset>

          <div className={styles.dataNotice}>
            <HardDrive aria-hidden="true" />
            <div>
              <strong>{copy.dataUseNote}</strong>
              <p>{copy.privacyNote}</p>
              <Link href="/privacy-policy">{copy.privacyLink}</Link>
            </div>
          </div>

          {running ? (
            <button
              className={styles.stopButton}
              type="button"
              onClick={() => controllerRef.current?.abort()}
            >
              <Square aria-hidden="true" />
              {copy.stop}
            </button>
          ) : (
            <button
              className={styles.startButton}
              type="button"
              onClick={start}
            >
              {phase === "error" ? (
                <RotateCcw aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
              {phase === "error"
                ? copy.retry
                : result
                  ? copy.testAgain
                  : copy.start}
            </button>
          )}
          {result ? (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={shareResult}
            >
              {copied ? (
                <Check aria-hidden="true" />
              ) : (
                <Clipboard aria-hidden="true" />
              )}
              {copied ? copy.copied : copy.share}
            </button>
          ) : null}
        </aside>
      </div>

      <div className={styles.comparison} id="compare">
        <header>
          <p className={styles.consoleKicker}>{copy.comparisonTitle}</p>
          <h2>{copy.comparisonTitle}</h2>
          <p>{copy.comparisonIntro}</p>
        </header>
        {!latestBaseline ? (
          <div className={styles.comparisonEmpty}>
            {copy.comparisonMissingBaseline}
          </div>
        ) : !latestVpn ? (
          <div className={styles.comparisonEmpty}>
            {copy.comparisonMissingVpn}
          </div>
        ) : (
          <>
            <label className={styles.comparisonConfirm}>
              <input
                type="checkbox"
                checked={comparisonConfirmed}
                onChange={(event) =>
                  setComparisonConfirmed(event.currentTarget.checked)
                }
              />
              <span>{copy.comparisonConfirm}</span>
            </label>
            {comparisonConfirmed ? (
              <div className={styles.comparisonResults}>
                <div>
                  <span>{copy.comparisonDownload}</span>
                  <strong>
                    {formatNumber(
                      (latestVpn.downloadMbps / latestBaseline.downloadMbps) *
                        100,
                      0,
                      locale,
                    )}
                    %
                  </strong>
                  <small>{copy.retained}</small>
                </div>
                <div>
                  <span>{copy.comparisonUpload}</span>
                  <strong>
                    {formatNumber(
                      (latestVpn.uploadMbps / latestBaseline.uploadMbps) * 100,
                      0,
                      locale,
                    )}
                    %
                  </strong>
                  <small>{copy.retained}</small>
                </div>
                <div>
                  <span>{copy.comparisonPing}</span>
                  <strong>
                    {latestVpn.responseTimeMs - latestBaseline.responseTimeMs >=
                    0
                      ? "+"
                      : ""}
                    {formatNumber(
                      latestVpn.responseTimeMs - latestBaseline.responseTimeMs,
                      1,
                      locale,
                    )}{" "}
                    ms
                  </strong>
                  <small>{copy.changedBy}</small>
                </div>
              </div>
            ) : (
              <div className={styles.comparisonEmpty}>
                {copy.comparisonUnconfirmed}
              </div>
            )}
          </>
        )}
        <p className={styles.boundaryNote}>{copy.comparisonBoundary}</p>
      </div>

      <div className={styles.history}>
        <header className={styles.historyHeader}>
          <div>
            <h2>{copy.historyTitle}</h2>
            <p>{copy.historyIntro}</p>
          </div>
          <div className={styles.historyActions}>
            <button
              type="button"
              onClick={exportCsv}
              disabled={!historyReady || !history.length}
            >
              <FileDown aria-hidden="true" />
              {copy.exportCsv}
            </button>
            {!confirmClear ? (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                disabled={!historyReady || !history.length}
              >
                <Trash2 aria-hidden="true" />
                {copy.clear}
              </button>
            ) : (
              <>
                <button
                  className={styles.dangerButton}
                  type="button"
                  onClick={clearHistory}
                >
                  {copy.confirmClear}
                </button>
                <button type="button" onClick={() => setConfirmClear(false)}>
                  {copy.cancelClear}
                </button>
              </>
            )}
          </div>
        </header>
        {!historyReady || !history.length ? (
          <p className={styles.historyEmpty}>{copy.historyEmpty}</p>
        ) : (
          <div className={styles.historyList}>
            {history.map((run) => (
              <article className={styles.historyRun} key={run.id}>
                <div className={styles.historyMeta}>
                  <RunKindLabel kind={run.kind} copy={copy} />
                  <time dateTime={run.observedAt}>
                    {formatTime(run.observedAt, locale)}
                  </time>
                </div>
                <dl>
                  <div>
                    <dt>{copy.download}</dt>
                    <dd>
                      {formatNumber(run.downloadMbps, 1, locale)} {copy.mbps}
                    </dd>
                  </div>
                  <div>
                    <dt>{copy.upload}</dt>
                    <dd>
                      {formatNumber(run.uploadMbps, 1, locale)} {copy.mbps}
                    </dd>
                  </div>
                  <div>
                    <dt>{copy.ping}</dt>
                    <dd>
                      {formatNumber(run.responseTimeMs, 1, locale)} {copy.ms}
                    </dd>
                  </div>
                  <div>
                    <dt>{copy.jitter}</dt>
                    <dd>
                      {formatNumber(run.variationMs, 1, locale)} {copy.ms}
                    </dd>
                  </div>
                </dl>
                <span className={styles.localBadge}>{copy.localOnly}</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
