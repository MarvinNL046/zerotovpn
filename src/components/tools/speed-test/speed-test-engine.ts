export type SpeedRunKind = "baseline" | "vpn" | "unsure";
export type SpeedTestPhase =
  "idle" | "ping" | "download" | "upload" | "complete" | "stopped" | "error";

export interface SpeedObservations {
  downloadMbps: number;
  uploadMbps: number;
  responseTimeMs: number;
  variationMs: number;
}

export type SpeedMeasurementMethod =
  | "browser_fetch_round_trip"
  | "aggregate_download_payload_throughput"
  | "aggregate_upload_payload_throughput";

export interface SpeedMeasurementAudit {
  method: SpeedMeasurementMethod;
  attemptCount: number;
  sampleCount: number;
  requestedBytes: number;
  transferredBytes: number;
  durationMs: number;
  valid: boolean;
}

export interface SpeedTestAudit {
  responseTime: SpeedMeasurementAudit;
  download: SpeedMeasurementAudit;
  upload: SpeedMeasurementAudit;
  totalRequestedBytes: number;
  totalTransferredBytes: number;
  limits: typeof SPEED_TEST_LIMITS;
}

export interface SpeedTestRun extends SpeedObservations {
  id: string;
  kind: SpeedRunKind;
  observedAt: string;
  endpoint: "Cloudflare network edge";
  methodVersion: "browser-speed-2026-08-v3";
  valid: true;
  audit: SpeedTestAudit;
}

export interface SpeedTestProgress {
  phase: Exclude<SpeedTestPhase, "idle" | "complete" | "stopped" | "error">;
  progress: number;
  liveValue?: number;
}

export class SpeedTestFailure extends Error {
  constructor(
    public readonly code:
      "network" | "insufficient_samples" | "invalid_response" | "timeout",
    message: string,
  ) {
    super(message);
    this.name = "SpeedTestFailure";
  }
}

const DOWN_SMALL = "https://speed.cloudflare.com/__down?bytes=0";
const DOWN_ENDPOINT = "https://speed.cloudflare.com/__down";
const UP_ENDPOINT = "https://speed.cloudflare.com/__up";
const DOWNLOAD_WINDOW_MS = 8_000;
const UPLOAD_WINDOW_MS = 6_000;
const DOWNLOAD_CHUNK_BYTES = 10_000_000;
const UPLOAD_CHUNK_BYTES = 250_000;
const MIN_DOWNLOAD_BYTES = 1_000_000;
const MIN_UPLOAD_BYTES = 1_000_000;
const MAX_CONSECUTIVE_TRANSFER_FAILURES = 3;

/**
 * Payload limits, not estimates of full on-the-wire usage. HTTP/TLS overhead is
 * additional. Keeping the limits exported lets the UI disclose the same values
 * that the engine enforces.
 */
export const SPEED_TEST_LIMITS = {
  maxDownloadPayloadBytes: 120_000_000,
  maxUploadPayloadBytes: 40_000_000,
  maxTotalPayloadBytes: 160_000_000,
  responseRequestTimeoutMs: 3_000,
  transferRequestTimeoutMs: 10_000,
  overallTimeoutMs: 30_000,
} as const;

type PayloadDirection = "download" | "upload";

interface PayloadBudget {
  reserve: (direction: PayloadDirection, requestedBytes: number) => number;
  snapshot: () => {
    downloadRequestedBytes: number;
    uploadRequestedBytes: number;
    totalRequestedBytes: number;
  };
}

function createPayloadBudget(): PayloadBudget {
  let downloadRequestedBytes = 0;
  let uploadRequestedBytes = 0;

  return {
    reserve(direction, requestedBytes) {
      const totalRequestedBytes = downloadRequestedBytes + uploadRequestedBytes;
      const totalRemaining = Math.max(
        SPEED_TEST_LIMITS.maxTotalPayloadBytes - totalRequestedBytes,
        0,
      );
      const directionRemaining = Math.max(
        direction === "download"
          ? SPEED_TEST_LIMITS.maxDownloadPayloadBytes - downloadRequestedBytes
          : SPEED_TEST_LIMITS.maxUploadPayloadBytes - uploadRequestedBytes,
        0,
      );
      const reservedBytes = Math.max(
        Math.min(requestedBytes, directionRemaining, totalRemaining),
        0,
      );

      if (direction === "download") {
        downloadRequestedBytes += reservedBytes;
      } else {
        uploadRequestedBytes += reservedBytes;
      }

      return reservedBytes;
    },
    snapshot() {
      return {
        downloadRequestedBytes,
        uploadRequestedBytes,
        totalRequestedBytes: downloadRequestedBytes + uploadRequestedBytes,
      };
    },
  };
}

function abortReason(signal: AbortSignal): Error {
  return signal.reason instanceof Error
    ? signal.reason
    : new DOMException("Aborted", "AbortError");
}

async function withRequestTimeout<T>(
  parentSignal: AbortSignal,
  timeoutMs: number,
  operation: (requestSignal: AbortSignal) => Promise<T>,
): Promise<T> {
  const controller = new AbortController();
  let timedOut = false;
  const onParentAbort = () => controller.abort(abortReason(parentSignal));
  const timer = window.setTimeout(() => {
    timedOut = true;
    controller.abort(new DOMException("Request timed out", "TimeoutError"));
  }, timeoutMs);

  if (parentSignal.aborted) {
    window.clearTimeout(timer);
    throw abortReason(parentSignal);
  }
  parentSignal.addEventListener("abort", onParentAbort, { once: true });

  try {
    return await operation(controller.signal);
  } catch (error) {
    if (parentSignal.aborted) throw abortReason(parentSignal);
    if (timedOut) {
      throw new SpeedTestFailure(
        "timeout",
        `Speed endpoint request exceeded ${timeoutMs}ms`,
      );
    }
    if (error instanceof SpeedTestFailure) throw error;
    throw new SpeedTestFailure("network", "Speed endpoint request failed");
  } finally {
    window.clearTimeout(timer);
    parentSignal.removeEventListener("abort", onParentAbort);
  }
}

function speedFetch(
  input: string,
  init: RequestInit,
  signal: AbortSignal,
): Promise<Response> {
  return fetch(input, {
    ...init,
    cache: "no-store",
    credentials: "omit",
    referrerPolicy: "no-referrer",
    signal,
  });
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function meanAbsoluteDifference(values: number[]): number {
  if (values.length < 2) return 0;
  let total = 0;
  for (let index = 1; index < values.length; index += 1) {
    total += Math.abs(values[index] - values[index - 1]);
  }
  return total / (values.length - 1);
}

function rounded(value: number): number {
  return Math.round(value * 10) / 10;
}

function randomBytes(size: number): ArrayBuffer {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  for (let offset = 0; offset < size; offset += 65_536) {
    const chunk = new Uint8Array(Math.min(65_536, size - offset));
    crypto.getRandomValues(chunk);
    view.set(chunk, offset);
  }
  return buffer;
}

function assertResponse(response: Response): void {
  if (!response.ok) {
    throw new SpeedTestFailure(
      "invalid_response",
      `Speed endpoint returned ${response.status}`,
    );
  }
}

async function pause(milliseconds: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) throw abortReason(signal);
  await new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(abortReason(signal));
    };
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, milliseconds);
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

interface ResponseTimeMeasurement {
  responseTimeMs: number;
  variationMs: number;
  audit: SpeedMeasurementAudit;
}

interface ThroughputMeasurement {
  mbps: number;
  audit: SpeedMeasurementAudit;
}

async function measureResponseTime(
  signal: AbortSignal,
  report: (value: SpeedTestProgress) => void,
): Promise<ResponseTimeMeasurement> {
  const samples: number[] = [];
  const attempts = 12;
  const phaseStartedAt = performance.now();
  let attemptsMade = 0;
  let lastFailure: SpeedTestFailure | null = null;

  for (let index = 0; index < attempts; index += 1) {
    if (signal.aborted) throw abortReason(signal);
    attemptsMade += 1;
    const startedAt = performance.now();
    try {
      await withRequestTimeout(
        signal,
        SPEED_TEST_LIMITS.responseRequestTimeoutMs,
        async (requestSignal) => {
          const response = await speedFetch(
            `${DOWN_SMALL}&nonce=${crypto.randomUUID()}`,
            {},
            requestSignal,
          );
          assertResponse(response);
          await response.arrayBuffer();
        },
      );
      samples.push(performance.now() - startedAt);
    } catch (error) {
      if (signal.aborted) throw abortReason(signal);
      if (error instanceof SpeedTestFailure) lastFailure = error;
    }
    report({ phase: "ping", progress: ((index + 1) / attempts) * 100 });
    if (index < attempts - 1) await pause(90, signal);
  }

  if (samples.length < 6) {
    if (samples.length === 0 && lastFailure) throw lastFailure;
    throw new SpeedTestFailure(
      "insufficient_samples",
      "Not enough response-time samples completed",
    );
  }

  return {
    responseTimeMs: rounded(median(samples)),
    variationMs: rounded(meanAbsoluteDifference(samples)),
    audit: {
      method: "browser_fetch_round_trip",
      attemptCount: attemptsMade,
      sampleCount: samples.length,
      requestedBytes: 0,
      transferredBytes: 0,
      durationMs: Math.round(performance.now() - phaseStartedAt),
      valid: true,
    },
  };
}

async function readDownloadStream(
  response: Response,
  signal: AbortSignal,
  addBytes: (bytes: number) => void,
  endsAt: number,
  maxBytes: number,
): Promise<number> {
  if (!response.body) {
    throw new SpeedTestFailure("invalid_response", "Download body is missing");
  }
  const reader = response.body.getReader();
  let receivedBytes = 0;
  try {
    while (
      !signal.aborted &&
      performance.now() < endsAt &&
      receivedBytes < maxBytes
    ) {
      const { done, value } = await reader.read();
      if (done) break;
      const acceptedBytes = Math.min(
        value?.byteLength ?? 0,
        maxBytes - receivedBytes,
      );
      receivedBytes += acceptedBytes;
      addBytes(acceptedBytes);
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  return receivedBytes;
}

async function measureDownload(
  signal: AbortSignal,
  report: (value: SpeedTestProgress) => void,
  budget: PayloadBudget,
): Promise<ThroughputMeasurement> {
  let bytes = 0;
  let attemptCount = 0;
  let contributingRequestCount = 0;
  let lastFailure: SpeedTestFailure | null = null;
  const startedAt = performance.now();
  const endsAt = startedAt + DOWNLOAD_WINDOW_MS;
  let previousBytes = 0;
  let previousAt = startedAt;

  const reporter = window.setInterval(() => {
    const now = performance.now();
    const seconds = (now - previousAt) / 1000;
    const mbps =
      seconds > 0 ? ((bytes - previousBytes) * 8) / seconds / 1_000_000 : 0;
    report({
      phase: "download",
      progress: Math.min(((now - startedAt) / DOWNLOAD_WINDOW_MS) * 100, 99),
      liveValue: rounded(mbps),
    });
    previousBytes = bytes;
    previousAt = now;
  }, 300);

  async function stream(): Promise<void> {
    let consecutiveFailures = 0;
    while (!signal.aborted && performance.now() < endsAt) {
      const requestedBytes = budget.reserve("download", DOWNLOAD_CHUNK_BYTES);
      if (requestedBytes === 0) return;
      attemptCount += 1;
      let requestBytes = 0;

      try {
        await withRequestTimeout(
          signal,
          SPEED_TEST_LIMITS.transferRequestTimeoutMs,
          async (requestSignal) => {
            const response = await speedFetch(
              `${DOWN_ENDPOINT}?bytes=${requestedBytes}&nonce=${crypto.randomUUID()}`,
              {},
              requestSignal,
            );
            assertResponse(response);
            await readDownloadStream(
              response,
              requestSignal,
              (value) => {
                requestBytes += value;
                bytes = Math.min(
                  bytes + value,
                  SPEED_TEST_LIMITS.maxDownloadPayloadBytes,
                );
              },
              endsAt,
              requestedBytes,
            );
          },
        );
        consecutiveFailures = 0;
      } catch (error) {
        if (signal.aborted) throw abortReason(signal);
        if (error instanceof SpeedTestFailure) {
          lastFailure = error;
          consecutiveFailures += 1;
          if (consecutiveFailures >= MAX_CONSECUTIVE_TRANSFER_FAILURES) {
            return;
          }
        } else {
          throw error;
        }
      } finally {
        if (requestBytes > 0) contributingRequestCount += 1;
      }
    }
  }

  try {
    const settled = await Promise.allSettled([
      stream(),
      stream(),
      stream(),
      stream(),
    ]);
    if (signal.aborted) throw abortReason(signal);
    if (bytes < MIN_DOWNLOAD_BYTES) {
      const firstFailure = settled.find(
        (item): item is PromiseRejectedResult => item.status === "rejected",
      );
      if (bytes === 0 && firstFailure?.reason instanceof SpeedTestFailure) {
        throw firstFailure.reason;
      }
      if (bytes === 0 && lastFailure) throw lastFailure;
      throw new SpeedTestFailure(
        "insufficient_samples",
        "Not enough download data completed",
      );
    }
  } finally {
    window.clearInterval(reporter);
  }

  const durationMs = Math.round(performance.now() - startedAt);
  const elapsedSeconds = Math.max(durationMs / 1000, 0.001);
  const mbps = rounded((bytes * 8) / elapsedSeconds / 1_000_000);
  const requestedBytes = budget.snapshot().downloadRequestedBytes;
  report({ phase: "download", progress: 100, liveValue: mbps });
  return {
    mbps,
    audit: {
      method: "aggregate_download_payload_throughput",
      attemptCount,
      sampleCount: contributingRequestCount,
      requestedBytes,
      transferredBytes: bytes,
      durationMs,
      valid: true,
    },
  };
}

async function measureUpload(
  signal: AbortSignal,
  report: (value: SpeedTestProgress) => void,
  budget: PayloadBudget,
): Promise<ThroughputMeasurement> {
  let completedBytes = 0;
  let attemptCount = 0;
  let completedRequestCount = 0;
  let lastFailure: SpeedTestFailure | null = null;
  const startedAt = performance.now();
  const endsAt = startedAt + UPLOAD_WINDOW_MS;
  let previousBytes = 0;
  let previousAt = startedAt;

  const reporter = window.setInterval(() => {
    const now = performance.now();
    const seconds = (now - previousAt) / 1000;
    const mbps =
      seconds > 0
        ? ((completedBytes - previousBytes) * 8) / seconds / 1_000_000
        : 0;
    report({
      phase: "upload",
      progress: Math.min(((now - startedAt) / UPLOAD_WINDOW_MS) * 100, 99),
      liveValue: rounded(mbps),
    });
    previousBytes = completedBytes;
    previousAt = now;
  }, 400);

  async function stream(): Promise<void> {
    let consecutiveFailures = 0;
    while (!signal.aborted && performance.now() < endsAt) {
      const requestedBytes = budget.reserve("upload", UPLOAD_CHUNK_BYTES);
      if (requestedBytes === 0) return;
      attemptCount += 1;
      const payload = randomBytes(requestedBytes);

      try {
        await withRequestTimeout(
          signal,
          SPEED_TEST_LIMITS.transferRequestTimeoutMs,
          async (requestSignal) => {
            const response = await speedFetch(
              UP_ENDPOINT,
              { method: "POST", body: payload },
              requestSignal,
            );
            assertResponse(response);
            await response.text();
          },
        );
        completedBytes += payload.byteLength;
        completedRequestCount += 1;
        consecutiveFailures = 0;
      } catch (error) {
        if (signal.aborted) throw abortReason(signal);
        if (error instanceof SpeedTestFailure) {
          lastFailure = error;
          consecutiveFailures += 1;
          if (consecutiveFailures >= MAX_CONSECUTIVE_TRANSFER_FAILURES) {
            return;
          }
          continue;
        }
        throw error;
      }
    }
  }

  try {
    const settled = await Promise.allSettled([stream(), stream(), stream()]);
    if (signal.aborted) throw abortReason(signal);
    if (completedBytes < MIN_UPLOAD_BYTES) {
      const firstFailure = settled.find(
        (item): item is PromiseRejectedResult => item.status === "rejected",
      );
      if (
        completedBytes === 0 &&
        firstFailure?.reason instanceof SpeedTestFailure
      ) {
        throw firstFailure.reason;
      }
      if (completedBytes === 0 && lastFailure) throw lastFailure;
      throw new SpeedTestFailure(
        "insufficient_samples",
        "Not enough upload data completed",
      );
    }
  } finally {
    window.clearInterval(reporter);
  }

  const durationMs = Math.round(performance.now() - startedAt);
  const elapsedSeconds = Math.max(durationMs / 1000, 0.1);
  const overall = (completedBytes * 8) / elapsedSeconds / 1_000_000;
  const mbps = rounded(overall);
  const requestedBytes = budget.snapshot().uploadRequestedBytes;
  report({ phase: "upload", progress: 100, liveValue: mbps });
  return {
    mbps,
    audit: {
      method: "aggregate_upload_payload_throughput",
      attemptCount,
      sampleCount: completedRequestCount,
      requestedBytes,
      transferredBytes: completedBytes,
      durationMs,
      valid: true,
    },
  };
}

export async function runSpeedTest(
  kind: SpeedRunKind,
  signal: AbortSignal,
  report: (value: SpeedTestProgress) => void,
): Promise<SpeedTestRun> {
  if (signal.aborted) throw abortReason(signal);

  const runController = new AbortController();
  const budget = createPayloadBudget();
  let overallTimedOut = false;
  const onCallerAbort = () => runController.abort(abortReason(signal));
  const overallTimer = window.setTimeout(() => {
    overallTimedOut = true;
    runController.abort(new DOMException("Test timed out", "TimeoutError"));
  }, SPEED_TEST_LIMITS.overallTimeoutMs);
  signal.addEventListener("abort", onCallerAbort, { once: true });

  try {
    report({ phase: "ping", progress: 0 });
    const response = await measureResponseTime(runController.signal, report);
    report({ phase: "download", progress: 0 });
    const download = await measureDownload(
      runController.signal,
      report,
      budget,
    );
    report({ phase: "upload", progress: 0 });
    const upload = await measureUpload(runController.signal, report, budget);
    if (runController.signal.aborted) throw abortReason(runController.signal);
    const payload = budget.snapshot();

    return {
      id: crypto.randomUUID(),
      kind,
      downloadMbps: download.mbps,
      uploadMbps: upload.mbps,
      responseTimeMs: response.responseTimeMs,
      variationMs: response.variationMs,
      observedAt: new Date().toISOString(),
      endpoint: "Cloudflare network edge",
      methodVersion: "browser-speed-2026-08-v3",
      valid: true,
      audit: {
        responseTime: response.audit,
        download: download.audit,
        upload: upload.audit,
        totalRequestedBytes: payload.totalRequestedBytes,
        totalTransferredBytes:
          download.audit.transferredBytes + upload.audit.transferredBytes,
        limits: SPEED_TEST_LIMITS,
      },
    };
  } catch (error) {
    if (overallTimedOut) {
      throw new SpeedTestFailure(
        "timeout",
        `Speed test exceeded ${SPEED_TEST_LIMITS.overallTimeoutMs}ms`,
      );
    }
    if (signal.aborted) throw abortReason(signal);
    throw error;
  } finally {
    window.clearTimeout(overallTimer);
    signal.removeEventListener("abort", onCallerAbort);
  }
}
