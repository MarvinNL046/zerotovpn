"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Upload,
  Activity,
  RotateCcw,
  Share2,
  History,
  Trash2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  timestamp: number;
}

type TestPhase = "idle" | "ping" | "download" | "upload" | "complete";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Compute the median of a sorted (or unsorted) numeric array. */
function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/** Population standard deviation. */
function stddev(values: number[]): number {
  if (values.length < 2) return 0;
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((v) => Math.pow(v - avg, 2));
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
}

/**
 * Map a speed value (Mbps) to a 0–1 position using a logarithmic scale.
 * Scale markings: 0, 10, 50, 100, 250, 500, 1000, 2000
 */
function speedToPosition(speed: number): number {
  return Math.log10(Math.min(speed, 2000) + 1) / Math.log10(2001);
}

/** Generate a random ArrayBuffer of the given size, respecting the 65536 limit per getRandomValues call. */
function randomBytes(size: number): ArrayBuffer {
  const buf = new ArrayBuffer(size);
  const view = new Uint8Array(buf);
  const chunkSize = 65536;
  for (let offset = 0; offset < size; offset += chunkSize) {
    const chunk = new Uint8Array(Math.min(chunkSize, size - offset));
    crypto.getRandomValues(chunk);
    view.set(chunk, offset);
  }
  return buf;
}

// ---------------------------------------------------------------------------
// Speed Test Engine
// ---------------------------------------------------------------------------

async function measurePing(
  signal: AbortSignal
): Promise<{ ping: number; jitter: number }> {
  // Use a tiny download from Cloudflare's speed test endpoint for ping measurement
  // This avoids CORS issues with HEAD requests to cloudflare.com
  const url = "https://speed.cloudflare.com/__down?bytes=0";
  const samples: number[] = [];

  for (let i = 0; i < 20; i++) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    const t0 = performance.now();
    try {
      const res = await fetch(url, { cache: "no-store", signal });
      // Consume response to ensure full round-trip
      await res.text();
      samples.push(performance.now() - t0);
    } catch (e) {
      if (signal.aborted) throw e;
      // Skip failed samples
    }
    if (i < 19) await new Promise((r) => setTimeout(r, 100));
  }

  if (samples.length === 0) return { ping: 0, jitter: 0 };
  return {
    ping: Math.round(median(samples)),
    jitter: Math.round(stddev(samples) * 10) / 10,
  };
}

interface MeasurementCallbacks {
  onSpeedSample: (mbps: number) => void;
  onProgress: (pct: number) => void;
}

/** Download: 10s parallel streams, reports speed every 250ms. */
async function measureDownload(
  signal: AbortSignal,
  callbacks: MeasurementCallbacks
): Promise<number> {
  const DURATION_MS = 10_000;
  const PARALLEL = 6;
  const CHUNK_URL =
    "https://speed.cloudflare.com/__down?bytes=25000000";
  const REPORT_INTERVAL = 250;
  const SLIDING_WINDOW_MS = 3_000;

  // Warmup: 1MB, discarded
  try {
    const warmupRes = await fetch(
      "https://speed.cloudflare.com/__down?bytes=1000000",
      { cache: "no-store", signal }
    );
    if (warmupRes.body) {
      const reader = warmupRes.body.getReader();
      while (true) {
        const { done } = await reader.read();
        if (done) break;
      }
    }
  } catch (e) {
    if (signal.aborted) throw e;
  }

  // Timestamped byte samples for sliding window
  const byteSamples: Array<{ t: number; bytes: number }> = [];
  const speedSamples: number[] = [];
  const startTime = performance.now();
  let lastReportTime = startTime;

  /** Spawn a single download stream and restart on completion (until abort). */
  async function spawnStream(): Promise<void> {
    while (!signal.aborted && performance.now() - startTime < DURATION_MS) {
      try {
        const res = await fetch(CHUNK_URL, { cache: "no-store", signal });
        if (!res.body) return;
        const reader = res.body.getReader();
        while (!signal.aborted && performance.now() - startTime < DURATION_MS) {
          const { done, value } = await reader.read();
          if (done) break;
          const bytes = value?.length ?? 0;
          const now = performance.now();
          byteSamples.push({ t: now, bytes });

          // Report every REPORT_INTERVAL ms
          if (now - lastReportTime >= REPORT_INTERVAL) {
            const windowStart = now - SLIDING_WINDOW_MS;
            const windowBytes = byteSamples
              .filter((s) => s.t >= windowStart)
              .reduce((sum, s) => sum + s.bytes, 0);
            const windowSec = Math.min(
              (now - startTime) / 1000,
              SLIDING_WINDOW_MS / 1000
            );
            if (windowSec > 0) {
              const mbps = (windowBytes * 8) / (windowSec * 1_000_000);
              speedSamples.push(mbps);
              callbacks.onSpeedSample(mbps);
            }
            callbacks.onProgress(
              Math.min(((now - startTime) / DURATION_MS) * 100, 99)
            );
            lastReportTime = now;
          }
        }
        try { reader.cancel(); } catch { /* ignore */ }
      } catch {
        if (signal.aborted) return;
        // Retry after brief pause on non-abort error
        await new Promise((r) => setTimeout(r, 100));
      }
    }
  }

  // Spawn PARALLEL streams concurrently
  await Promise.allSettled(
    Array.from({ length: PARALLEL }, () => spawnStream())
  );

  callbacks.onProgress(100);
  return Math.round(median(speedSamples) * 10) / 10;
}

/** Upload: 8s parallel POSTs, reports speed every 250ms. */
async function measureUpload(
  signal: AbortSignal,
  callbacks: MeasurementCallbacks
): Promise<number> {
  const DURATION_MS = 8_000;
  const PARALLEL = 4;
  const UPLOAD_URL = "https://speed.cloudflare.com/__up";
  const BLOB_SIZE = 2_000_000; // 2MB per POST
  const REPORT_INTERVAL = 250;

  // Warmup: 256KB
  try {
    await fetch(UPLOAD_URL, {
      method: "POST",
      body: new Blob([randomBytes(256_000)]),
      cache: "no-store",
      signal,
    });
  } catch (e) {
    if (signal.aborted) throw e;
  }

  const startTime = performance.now();
  // Track cumulative bytes sent, used for interval-based speed calculation
  let cumulativeBytes = 0;
  let lastReportTime = startTime;
  let lastReportBytes = 0;
  const speedSamples: number[] = [];

  async function spawnPost(): Promise<void> {
    while (!signal.aborted && performance.now() - startTime < DURATION_MS) {
      const blob = new Blob([randomBytes(BLOB_SIZE)]);
      try {
        await fetch(UPLOAD_URL, {
          method: "POST",
          body: blob,
          cache: "no-store",
          signal,
        });
        cumulativeBytes += BLOB_SIZE;

        const now = performance.now();
        if (now - lastReportTime >= REPORT_INTERVAL) {
          const intervalBytes = cumulativeBytes - lastReportBytes;
          const intervalSec = (now - lastReportTime) / 1000;
          if (intervalSec > 0) {
            const mbps = (intervalBytes * 8) / (intervalSec * 1_000_000);
            speedSamples.push(mbps);
            callbacks.onSpeedSample(mbps);
          }
          callbacks.onProgress(
            Math.min(((now - startTime) / DURATION_MS) * 100, 99)
          );
          lastReportTime = now;
          lastReportBytes = cumulativeBytes;
        }
      } catch {
        if (signal.aborted) return;
        await new Promise((r) => setTimeout(r, 100));
      }
    }
  }

  await Promise.allSettled(
    Array.from({ length: PARALLEL }, () => spawnPost())
  );

  callbacks.onProgress(100);
  return Math.round(median(speedSamples) * 10) / 10;
}

// ---------------------------------------------------------------------------
// Gauge SVG Component
// ---------------------------------------------------------------------------

const GAUGE_RADIUS = 85;
const GAUGE_CENTER = 100;
// 240-degree arc from -210deg to 30deg (top-right to top-left, opening downward)
const ARC_DEGREES = 240;
const ARC_START_ANGLE = 150; // degrees from positive x-axis (clockwise SVG)
const ARC_END_ANGLE = ARC_START_ANGLE + ARC_DEGREES;

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const [sx, sy] = polarToCartesian(cx, cy, r, startAngle);
  const [ex, ey] = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
}

interface GaugeProps {
  speed: number; // current display speed (animated)
  phase: TestPhase;
  phaseText: string;
}

function SpeedometerGauge({ speed, phase, phaseText }: GaugeProps) {
  const position = speedToPosition(speed); // 0–1
  const needleAngle = ARC_START_ANGLE + position * ARC_DEGREES;
  const [nx, ny] = polarToCartesian(
    GAUGE_CENTER,
    GAUGE_CENTER,
    GAUGE_RADIUS - 18,
    needleAngle
  );

  // Arc path for the colored progress
  const filledEndAngle = ARC_START_ANGLE + position * ARC_DEGREES;

  // Scale markings
  const markings = [0, 10, 50, 100, 250, 500, 1000, 2000];

  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        aria-label={`Speed: ${speed} Mbps`}
      >
        <defs>
          {/* Gradient along arc direction */}
          <linearGradient id="gaugeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="30%" stopColor="#f97316" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="needleGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc track */}
        <path
          d={describeArc(
            GAUGE_CENTER,
            GAUGE_CENTER,
            GAUGE_RADIUS,
            ARC_START_ANGLE,
            ARC_END_ANGLE
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className="text-muted/30"
        />

        {/* Colored progress arc */}
        {position > 0.001 && (
          <path
            d={describeArc(
              GAUGE_CENTER,
              GAUGE_CENTER,
              GAUGE_RADIUS,
              ARC_START_ANGLE,
              filledEndAngle
            )}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />
        )}

        {/* Scale markings */}
        {markings.map((mark) => {
          const pos = speedToPosition(mark);
          const angle = ARC_START_ANGLE + pos * ARC_DEGREES;
          const [ox, oy] = polarToCartesian(
            GAUGE_CENTER,
            GAUGE_CENTER,
            GAUGE_RADIUS + 14,
            angle
          );
          const [ix, iy] = polarToCartesian(
            GAUGE_CENTER,
            GAUGE_CENTER,
            GAUGE_RADIUS + 5,
            angle
          );
          const [tx, ty] = polarToCartesian(
            GAUGE_CENTER,
            GAUGE_CENTER,
            GAUGE_RADIUS + 22,
            angle
          );
          return (
            <g key={mark}>
              <line
                x1={ix}
                y1={iy}
                x2={ox}
                y2={oy}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-muted-foreground/40"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="6"
                className="fill-muted-foreground/60"
              >
                {mark === 0 ? "0" : mark >= 1000 ? `${mark / 1000}G` : `${mark}`}
              </text>
            </g>
          );
        })}

        {/* Needle */}
        <line
          x1={GAUGE_CENTER}
          y1={GAUGE_CENTER}
          x2={nx}
          y2={ny}
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          filter={speed > 0 ? "url(#needleGlow)" : undefined}
          className="transition-none"
        />
        {/* Needle hub */}
        <circle
          cx={GAUGE_CENTER}
          cy={GAUGE_CENTER}
          r="5"
          className="fill-primary"
        />
        <circle
          cx={GAUGE_CENTER}
          cy={GAUGE_CENTER}
          r="2.5"
          className="fill-background"
        />

        {/* Center speed readout */}
        <text
          x={GAUGE_CENTER}
          y={GAUGE_CENTER + 28}
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          className="fill-foreground tabular-nums"
        >
          {speed.toFixed(1)}
        </text>
        <text
          x={GAUGE_CENTER}
          y={GAUGE_CENTER + 40}
          textAnchor="middle"
          fontSize="9"
          className="fill-muted-foreground"
        >
          Mbps
        </text>

        {/* Phase text below speed */}
        {phase !== "idle" && phase !== "complete" && (
          <text
            x={GAUGE_CENTER}
            y={GAUGE_CENTER + 55}
            textAnchor="middle"
            fontSize="7"
            className="fill-muted-foreground"
          >
            {phaseText}
          </text>
        )}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Widget
// ---------------------------------------------------------------------------

export function SpeedTestWidget() {
  const t = useTranslations("speedTest");

  // State machine
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [progress, setProgress] = useState(0); // 0–100 for current phase

  // Live speed for needle animation
  const [displaySpeed, setDisplaySpeed] = useState(0);
  const displaySpeedRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const targetSpeedRef = useRef(0);

  // Final results
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);

  // History — initialized lazily from localStorage to avoid setState in effect
  const [history, setHistory] = useState<SpeedTestResult[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("speedTestHistory");
      return raw ? (JSON.parse(raw) as SpeedTestResult[]) : [];
    } catch {
      return [];
    }
  });

  // Share feedback
  const [copied, setCopied] = useState(false);

  // Abort controller
  const abortRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // -------------------------------------------------------------------------
  // Smooth needle animation with requestAnimationFrame
  // -------------------------------------------------------------------------
  const animateTo = useCallback((target: number) => {
    targetSpeedRef.current = Math.min(target, 2000);

    const tick = () => {
      const current = displaySpeedRef.current;
      const goal = targetSpeedRef.current;
      const diff = goal - current;

      // Ease out: move 12% of remaining distance per frame
      const next = Math.abs(diff) < 0.05 ? goal : current + diff * 0.12;
      displaySpeedRef.current = next;
      setDisplaySpeed(Math.round(next * 10) / 10);

      if (Math.abs(next - goal) > 0.05) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const resetNeedle = useCallback(
    (duration = 600) => {
      targetSpeedRef.current = 0;
      const startVal = displaySpeedRef.current;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = startVal * (1 - eased);
        displaySpeedRef.current = val;
        setDisplaySpeed(Math.round(val * 10) / 10);
        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        }
      };

      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(tick);
    },
    []
  );

  // -------------------------------------------------------------------------
  // Run test
  // -------------------------------------------------------------------------
  const runTest = useCallback(async () => {
    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    // Reset
    setPhase("ping");
    setProgress(0);
    setPing(0);
    setJitter(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    displaySpeedRef.current = 0;
    setDisplaySpeed(0);

    try {
      // ---- PING ----
      setPhase("ping");
      const pingResult = await measurePing(signal);
      setPing(pingResult.ping);
      setJitter(pingResult.jitter);
      setProgress(100);

      // ---- DOWNLOAD ----
      await resetNeedle(300);
      await new Promise((r) => setTimeout(r, 200));
      setPhase("download");
      setProgress(0);

      const dlSpeed = await measureDownload(signal, {
        onSpeedSample: (mbps) => animateTo(mbps),
        onProgress: (pct) => setProgress(pct),
      });
      setDownloadSpeed(dlSpeed);
      animateTo(dlSpeed);

      // Brief pause + reset before upload
      await new Promise((r) => setTimeout(r, 600));
      resetNeedle(400);
      await new Promise((r) => setTimeout(r, 500));

      // ---- UPLOAD ----
      setPhase("upload");
      setProgress(0);

      const ulSpeed = await measureUpload(signal, {
        onSpeedSample: (mbps) => animateTo(mbps),
        onProgress: (pct) => setProgress(pct),
      });
      setUploadSpeed(ulSpeed);
      animateTo(ulSpeed);

      // ---- COMPLETE ----
      setPhase("complete");

      const result: SpeedTestResult = {
        downloadSpeed: dlSpeed,
        uploadSpeed: ulSpeed,
        ping: pingResult.ping,
        jitter: pingResult.jitter,
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        const next = [result, ...prev].slice(0, 10);
        try {
          localStorage.setItem("speedTestHistory", JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    } catch (e) {
      if (!signal.aborted) {
        console.error("Speed test error:", e);
      }
      setPhase("idle");
      resetNeedle(400);
    }
  }, [animateTo, resetNeedle]);

  const stopTest = useCallback(() => {
    abortRef.current?.abort();
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setPhase("idle");
    resetNeedle(400);
  }, [resetNeedle]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem("speedTestHistory");
    } catch {
      // ignore
    }
  }, []);

  const shareResults = useCallback(async () => {
    const text = `Internet Speed Test Results:
Download: ${downloadSpeed} Mbps
Upload: ${uploadSpeed} Mbps
Ping: ${ping} ms
Jitter: ${jitter} ms

Tested on ZeroToVPN.com`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  }, [downloadSpeed, uploadSpeed, ping, jitter]);

  // -------------------------------------------------------------------------
  // Derived state
  // -------------------------------------------------------------------------
  const isRunning = phase === "ping" || phase === "download" || phase === "upload";

  const getSpeedRating = (dl: number) => {
    if (dl >= 100) return { label: t("veryFast"), color: "bg-green-500/20 text-green-600 dark:text-green-400" };
    if (dl >= 50) return { label: t("fast"), color: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" };
    if (dl >= 10) return { label: t("moderate"), color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" };
    return { label: t("slow"), color: "bg-red-500/20 text-red-600 dark:text-red-400" };
  };

  const phaseLabel = () => {
    switch (phase) {
      case "ping": return t("testingPing");
      case "download": return t("testingDownload");
      case "upload": return t("testingUpload");
      default: return "";
    }
  };

  // Animated phase dots
  const [dotCount, setDotCount] = useState(1);
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setDotCount((d) => (d % 3) + 1), 500);
    return () => clearInterval(id);
  }, [isRunning]);

  const phaseTextWithDots = isRunning
    ? phaseLabel() + ".".repeat(dotCount)
    : "";

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <CardContent className="p-6 sm:p-8 space-y-6">

        {/* Gauge */}
        <SpeedometerGauge
          speed={displaySpeed}
          phase={phase}
          phaseText={phaseTextWithDots}
        />

        {/* Phase progress bar */}
        {isRunning && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{phaseLabel()}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Live metric indicators */}
        <div className="grid grid-cols-3 gap-3">
          {/* Ping indicator */}
          <div
            className={cn(
              "flex flex-col items-center p-3 rounded-xl border transition-all duration-300",
              phase === "ping"
                ? "border-cyan-500/50 bg-cyan-500/10"
                : "border-border bg-muted/30"
            )}
          >
            <Activity
              className={cn(
                "h-4 w-4 mb-1",
                phase === "ping"
                  ? "text-cyan-500 animate-pulse"
                  : "text-muted-foreground"
              )}
            />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {t("ping")}
            </span>
            <span
              className={cn(
                "text-lg font-bold tabular-nums",
                ping > 0 ? "text-foreground" : "text-muted-foreground/40"
              )}
            >
              {ping > 0 ? ping : "—"}
            </span>
            <span className="text-[10px] text-muted-foreground">{t("ms")}</span>
          </div>

          {/* Download indicator */}
          <div
            className={cn(
              "flex flex-col items-center p-3 rounded-xl border transition-all duration-300",
              phase === "download"
                ? "border-green-500/50 bg-green-500/10"
                : "border-border bg-muted/30"
            )}
          >
            <Download
              className={cn(
                "h-4 w-4 mb-1",
                phase === "download"
                  ? "text-green-500 animate-bounce"
                  : "text-muted-foreground"
              )}
            />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {t("download")}
            </span>
            <span
              className={cn(
                "text-lg font-bold tabular-nums",
                downloadSpeed > 0
                  ? "text-foreground"
                  : "text-muted-foreground/40"
              )}
            >
              {downloadSpeed > 0 ? downloadSpeed.toFixed(1) : "—"}
            </span>
            <span className="text-[10px] text-muted-foreground">{t("mbps")}</span>
          </div>

          {/* Upload indicator */}
          <div
            className={cn(
              "flex flex-col items-center p-3 rounded-xl border transition-all duration-300",
              phase === "upload"
                ? "border-purple-500/50 bg-purple-500/10"
                : "border-border bg-muted/30"
            )}
          >
            <Upload
              className={cn(
                "h-4 w-4 mb-1",
                phase === "upload"
                  ? "text-purple-500 animate-bounce"
                  : "text-muted-foreground"
              )}
            />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {t("upload")}
            </span>
            <span
              className={cn(
                "text-lg font-bold tabular-nums",
                uploadSpeed > 0
                  ? "text-foreground"
                  : "text-muted-foreground/40"
              )}
            >
              {uploadSpeed > 0 ? uploadSpeed.toFixed(1) : "—"}
            </span>
            <span className="text-[10px] text-muted-foreground">{t("mbps")}</span>
          </div>
        </div>

        {/* GO / Stop / Retest button */}
        <div className="flex justify-center">
          {phase === "idle" ? (
            <button
              onClick={runTest}
              className={cn(
                "w-28 h-28 rounded-full font-black text-2xl text-white",
                "bg-gradient-to-br from-blue-500 to-cyan-500",
                "hover:from-blue-400 hover:to-cyan-400",
                "shadow-lg shadow-blue-500/30",
                "hover:scale-105 active:scale-95",
                "transition-transform duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              )}
            >
              {t("go")}
            </button>
          ) : phase === "complete" ? (
            <Button
              onClick={runTest}
              size="lg"
              className="rounded-full gap-2 px-8"
            >
              <RotateCcw className="h-4 w-4" />
              {t("testAgain")}
            </Button>
          ) : (
            <button
              onClick={stopTest}
              className={cn(
                "w-28 h-28 rounded-full font-bold text-sm",
                "border-2 border-border bg-card text-muted-foreground",
                "hover:bg-muted hover:text-foreground",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
              )}
            >
              <span className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest opacity-60">
                  {phase === "ping"
                    ? t("ping")
                    : phase === "download"
                    ? t("download")
                    : t("upload")}
                </span>
                <span className="text-lg">
                  {"●".repeat(dotCount) + "○".repeat(3 - dotCount)}
                </span>
                <span className="text-[9px] opacity-50">tap to stop</span>
              </span>
            </button>
          )}
        </div>

        {/* Results panel */}
        {phase === "complete" && (
          <div className="space-y-4">
            {/* 4-metric result grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Download */}
              <div className="flex flex-col items-center p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                <Download className="h-4 w-4 text-green-500 mb-1" />
                <span className="text-2xl font-black tabular-nums text-foreground">
                  {downloadSpeed.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("download")} {t("mbps")}
                </span>
              </div>
              {/* Upload */}
              <div className="flex flex-col items-center p-4 rounded-xl border border-purple-500/20 bg-purple-500/5">
                <Upload className="h-4 w-4 text-purple-500 mb-1" />
                <span className="text-2xl font-black tabular-nums text-foreground">
                  {uploadSpeed.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("upload")} {t("mbps")}
                </span>
              </div>
              {/* Ping */}
              <div className="flex flex-col items-center p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                <Activity className="h-4 w-4 text-cyan-500 mb-1" />
                <span className="text-2xl font-black tabular-nums text-foreground">
                  {ping}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("ping")} {t("ms")}
                </span>
              </div>
              {/* Jitter */}
              <div className="flex flex-col items-center p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
                <Zap className="h-4 w-4 text-orange-500 mb-1" />
                <span className="text-2xl font-black tabular-nums text-foreground">
                  {jitter}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("jitter")} {t("ms")}
                </span>
              </div>
            </div>

            {/* Speed rating badge */}
            {(() => {
              const rating = getSpeedRating(downloadSpeed);
              return (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {t("speedScore")}:
                  </span>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-semibold",
                      rating.color
                    )}
                  >
                    {rating.label}
                  </span>
                </div>
              );
            })()}

            {/* VPN compare prompt */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground">
              <Zap className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>{t("comparePrompt")}</span>
            </div>

            {/* Before/after comparison (last 2 results) */}
            {history.length >= 2 && (
              <div className="p-3 rounded-xl border border-border bg-muted/30 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("compareWithVpn")}
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[history[1], history[0]].map((result, idx) => (
                    <div
                      key={result.timestamp}
                      className="space-y-1 p-2 rounded-lg bg-card border border-border"
                    >
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {idx === 0 ? "Before" : "After"}
                      </p>
                      <p className="font-bold">
                        <span className="text-green-500">
                          ↓ {result.downloadSpeed}
                        </span>{" "}
                        <span className="text-purple-500">
                          ↑ {result.uploadSpeed}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {result.ping} {t("ms")} ping
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={shareResults}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                {copied ? t("copied") : t("share")}
              </Button>
            </div>
          </div>
        )}

        {/* History panel */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <History className="h-4 w-4" />
                {t("history")}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-muted-foreground hover:text-destructive h-7 px-2"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                <span className="text-xs">{t("clearHistory")}</span>
              </Button>
            </div>

            <div className="space-y-1.5 max-h-44 overflow-y-auto">
              {history.slice(0, 5).map((test) => (
                <div
                  key={test.timestamp}
                  className="flex items-center justify-between text-xs bg-muted/30 rounded-lg px-3 py-2 border border-border/50"
                >
                  <span className="text-muted-foreground tabular-nums">
                    {new Date(test.timestamp).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <div className="flex gap-3 font-medium tabular-nums">
                    <span className="text-green-500">
                      ↓ {test.downloadSpeed}
                    </span>
                    <span className="text-purple-500">
                      ↑ {test.uploadSpeed}
                    </span>
                    <span className="text-cyan-500">{test.ping} ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty history message */}
        {history.length === 0 && phase === "idle" && (
          <p className="text-center text-xs text-muted-foreground/60 pt-2">
            {t("noHistory")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
