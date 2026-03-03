import { and, desc, eq, inArray } from "drizzle-orm";
import { getDb, scrapeJobs } from "@/lib/db";
import type { VpnProvider } from "@/lib/vpn-data-layer";

export type LoggingPolicyGrade = "strict-no-logs" | "minimal-operational-logs" | "unclear";
export type AuditStatus = "recent-audit" | "older-audit" | "no-public-audit";
export type JurisdictionRisk = "low" | "medium" | "high";

export interface VpnTransparencySnapshot {
  slug: string;
  owner: string;
  jurisdiction: string;
  jurisdictionRisk: JurisdictionRisk;
  loggingPolicy: LoggingPolicyGrade;
  auditStatus: AuditStatus;
  averageLatencyMs: number;
  downloadMbps: {
    eu: number;
    us: number;
    asia: number;
  };
  killSwitchReliability: number;
  streamingServicesUnlocked: number;
  torrentAllowed: boolean;
  lastTested: string;
}

export interface VpnIndexRow extends VpnTransparencySnapshot {
  name: string;
  overallRating: number;
  priceMonthly: number;
  speedComposite: number;
  transparencyScore: number;
}

type SnapshotOverride = Partial<Omit<VpnTransparencySnapshot, "slug">>;

type TrustProfile = Pick<
  VpnTransparencySnapshot,
  "owner" | "jurisdiction" | "jurisdictionRisk" | "loggingPolicy" | "auditStatus"
>;

const DEFAULT_LAST_TESTED = "2026-03-03";
const CACHE_TTL_MS = 5 * 60 * 1000;

let overrideCache: { at: number; data: Record<string, SnapshotOverride> } | null = null;

const defaultTrustProfile: TrustProfile = {
  owner: "Research pending",
  jurisdiction: "Research pending",
  jurisdictionRisk: "medium",
  loggingPolicy: "unclear",
  auditStatus: "no-public-audit",
};

const manualTrustProfiles: Record<string, TrustProfile> = {
  nordvpn: {
    owner: "Nord Security",
    jurisdiction: "Panama",
    jurisdictionRisk: "low",
    loggingPolicy: "strict-no-logs",
    auditStatus: "recent-audit",
  },
  surfshark: {
    owner: "Surfshark B.V.",
    jurisdiction: "Netherlands",
    jurisdictionRisk: "medium",
    loggingPolicy: "strict-no-logs",
    auditStatus: "recent-audit",
  },
  expressvpn: {
    owner: "Kape Technologies",
    jurisdiction: "British Virgin Islands",
    jurisdictionRisk: "low",
    loggingPolicy: "strict-no-logs",
    auditStatus: "recent-audit",
  },
  protonvpn: {
    owner: "Proton AG",
    jurisdiction: "Switzerland",
    jurisdictionRisk: "low",
    loggingPolicy: "strict-no-logs",
    auditStatus: "recent-audit",
  },
  cyberghost: {
    owner: "Kape Technologies",
    jurisdiction: "Romania",
    jurisdictionRisk: "medium",
    loggingPolicy: "minimal-operational-logs",
    auditStatus: "older-audit",
  },
  "private-internet-access": {
    owner: "Kape Technologies",
    jurisdiction: "United States",
    jurisdictionRisk: "high",
    loggingPolicy: "strict-no-logs",
    auditStatus: "older-audit",
  },
  mullvad: {
    owner: "Mullvad VPN AB",
    jurisdiction: "Sweden",
    jurisdictionRisk: "medium",
    loggingPolicy: "strict-no-logs",
    auditStatus: "recent-audit",
  },
  ivpn: {
    owner: "Privatus Limited",
    jurisdiction: "Gibraltar",
    jurisdictionRisk: "medium",
    loggingPolicy: "strict-no-logs",
    auditStatus: "recent-audit",
  },
  windscribe: {
    owner: "Windscribe Limited",
    jurisdiction: "Canada",
    jurisdictionRisk: "high",
    loggingPolicy: "minimal-operational-logs",
    auditStatus: "older-audit",
  },
  astrill: {
    owner: "Astrill Systems Corp.",
    jurisdiction: "Seychelles",
    jurisdictionRisk: "low",
    loggingPolicy: "minimal-operational-logs",
    auditStatus: "no-public-audit",
  },
  "hotspot-shield": {
    owner: "Pango Group",
    jurisdiction: "United States",
    jurisdictionRisk: "high",
    loggingPolicy: "minimal-operational-logs",
    auditStatus: "older-audit",
  },
  tunnelbear: {
    owner: "McAfee",
    jurisdiction: "Canada",
    jurisdictionRisk: "high",
    loggingPolicy: "minimal-operational-logs",
    auditStatus: "older-audit",
  },
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function toBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "yes", "1", "allowed"].includes(normalized)) return true;
    if (["false", "no", "0", "blocked", "disallowed"].includes(normalized)) return false;
  }
  return undefined;
}

function toStringValue(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  return undefined;
}

function toRisk(value: unknown): JurisdictionRisk | undefined {
  const normalized = toStringValue(value)?.toLowerCase();
  if (!normalized) return undefined;
  if (normalized.includes("low")) return "low";
  if (normalized.includes("medium") || normalized.includes("moderate")) return "medium";
  if (normalized.includes("high")) return "high";
  return undefined;
}

function toLoggingPolicy(value: unknown): LoggingPolicyGrade | undefined {
  const normalized = toStringValue(value)?.toLowerCase();
  if (!normalized) return undefined;
  if (normalized.includes("strict") || normalized.includes("no-log") || normalized.includes("nolog")) {
    return "strict-no-logs";
  }
  if (normalized.includes("minimal") || normalized.includes("operational") || normalized.includes("limited")) {
    return "minimal-operational-logs";
  }
  if (normalized.includes("unclear")) return "unclear";
  return undefined;
}

function toAuditStatus(value: unknown): AuditStatus | undefined {
  const normalized = toStringValue(value)?.toLowerCase();
  if (!normalized) return undefined;
  if (normalized.includes("recent")) return "recent-audit";
  if (normalized.includes("older") || normalized.includes("old") || normalized.includes("past")) {
    return "older-audit";
  }
  if (normalized.includes("no") || normalized.includes("none") || normalized.includes("missing")) {
    return "no-public-audit";
  }
  return undefined;
}

function deriveMetricsFromVpn(vpn: VpnProvider): Pick<
  VpnTransparencySnapshot,
  "averageLatencyMs" | "downloadMbps" | "killSwitchReliability" | "streamingServicesUnlocked" | "torrentAllowed" | "lastTested"
> {
  const eu = clamp(vpn.speedScore, 20, 100);
  const us = clamp(vpn.speedScore - 3, 20, 100);
  const asia = clamp(vpn.speedScore - 8, 15, 100);

  return {
    averageLatencyMs: Math.max(28, Math.round(130 - vpn.speedScore * 0.8)),
    downloadMbps: {
      eu,
      us,
      asia,
    },
    killSwitchReliability: vpn.killSwitch ? 98 : 55,
    streamingServicesUnlocked: clamp(Math.round(vpn.streamingScore / 10), 0, 10),
    torrentAllowed: vpn.torrentSupport,
    lastTested: DEFAULT_LAST_TESTED,
  };
}

function buildBaseSnapshot(vpn: VpnProvider): VpnTransparencySnapshot {
  const trustProfile = manualTrustProfiles[vpn.slug] ?? defaultTrustProfile;
  const metrics = deriveMetricsFromVpn(vpn);

  return {
    slug: vpn.slug,
    ...trustProfile,
    ...metrics,
  };
}

function mergeOverrides(base: SnapshotOverride, incoming: SnapshotOverride): SnapshotOverride {
  const mergedDownloadRaw = {
    ...(base.downloadMbps ?? {}),
    ...(incoming.downloadMbps ?? {}),
  };
  const hasDownload =
    mergedDownloadRaw.eu !== undefined ||
    mergedDownloadRaw.us !== undefined ||
    mergedDownloadRaw.asia !== undefined;

  const mergedDownload = hasDownload
    ? {
        eu: mergedDownloadRaw.eu ?? mergedDownloadRaw.us ?? mergedDownloadRaw.asia ?? 70,
        us: mergedDownloadRaw.us ?? mergedDownloadRaw.eu ?? mergedDownloadRaw.asia ?? 70,
        asia: mergedDownloadRaw.asia ?? mergedDownloadRaw.us ?? mergedDownloadRaw.eu ?? 65,
      }
    : undefined;

  return {
    ...base,
    ...incoming,
    downloadMbps: mergedDownload,
  };
}

function applyOverride(snapshot: VpnTransparencySnapshot, override?: SnapshotOverride): VpnTransparencySnapshot {
  if (!override) return snapshot;

  const mergedDownloadRaw = {
    ...snapshot.downloadMbps,
    ...(override.downloadMbps ?? {}),
  };
  const mergedDownload = {
    eu: mergedDownloadRaw.eu ?? snapshot.downloadMbps.eu,
    us: mergedDownloadRaw.us ?? snapshot.downloadMbps.us,
    asia: mergedDownloadRaw.asia ?? snapshot.downloadMbps.asia,
  };

  return {
    ...snapshot,
    ...override,
    downloadMbps: mergedDownload,
  };
}

function getRecordValue(record: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    if (key in record) return record[key];
  }
  return undefined;
}

function parseDownloadMbps(record: Record<string, unknown>): SnapshotOverride["downloadMbps"] {
  const nested = getRecordValue(record, ["downloadMbps", "download", "speeds"]);
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    const nestedRecord = nested as Record<string, unknown>;
    const eu = toNumber(getRecordValue(nestedRecord, ["eu", "europe", "europeMbps"]));
    const us = toNumber(getRecordValue(nestedRecord, ["us", "usa", "northAmerica", "northAmericaMbps"]));
    const asia = toNumber(getRecordValue(nestedRecord, ["asia", "apac", "asiaMbps"]));

    if (eu !== undefined || us !== undefined || asia !== undefined) {
      return {
        eu: eu ?? us ?? asia ?? 70,
        us: us ?? eu ?? asia ?? 70,
        asia: asia ?? us ?? eu ?? 65,
      };
    }
  }

  const eu = toNumber(getRecordValue(record, ["downloadEu", "downloadSpeedEu", "speedEu", "euMbps"]));
  const us = toNumber(getRecordValue(record, ["downloadUs", "downloadSpeedUs", "speedUs", "usMbps"]));
  const asia = toNumber(getRecordValue(record, ["downloadAsia", "downloadSpeedAsia", "speedAsia", "asiaMbps"]));

  if (eu !== undefined || us !== undefined || asia !== undefined) {
    return {
      eu: eu ?? us ?? asia ?? 70,
      us: us ?? eu ?? asia ?? 70,
      asia: asia ?? us ?? eu ?? 65,
    };
  }

  return undefined;
}

function parseOverrideItem(record: Record<string, unknown>, fallbackDate: string): { slug: string; override: SnapshotOverride } | null {
  const slug =
    toStringValue(getRecordValue(record, ["vpnSlug", "slug", "id", "providerSlug"]))?.toLowerCase() ?? null;

  if (!slug) return null;

  const override: SnapshotOverride = {};

  const owner = toStringValue(getRecordValue(record, ["owner", "ownership", "company", "parentCompany"]));
  if (owner) override.owner = owner;

  const jurisdiction = toStringValue(getRecordValue(record, ["jurisdiction", "country", "legalJurisdiction"]));
  if (jurisdiction) override.jurisdiction = jurisdiction;

  const risk = toRisk(getRecordValue(record, ["jurisdictionRisk", "legalRisk"]));
  if (risk) override.jurisdictionRisk = risk;

  const logging = toLoggingPolicy(getRecordValue(record, ["loggingPolicy", "logs", "logPolicy"]));
  if (logging) override.loggingPolicy = logging;

  const audit = toAuditStatus(getRecordValue(record, ["auditStatus", "audit", "audited"]));
  if (audit) override.auditStatus = audit;

  const latency = toNumber(getRecordValue(record, ["averageLatencyMs", "latencyMs", "pingMs", "latency"]));
  if (latency !== undefined) override.averageLatencyMs = Math.round(latency);

  const downloadMbps = parseDownloadMbps(record);
  if (downloadMbps) override.downloadMbps = downloadMbps;

  const killReliability = toNumber(
    getRecordValue(record, ["killSwitchReliability", "killSwitchScore", "killswitchReliability"])
  );
  if (killReliability !== undefined) override.killSwitchReliability = clamp(Math.round(killReliability));

  const streamingUnlocks = toNumber(
    getRecordValue(record, ["streamingServicesUnlocked", "streamingUnlocks", "streamingScoreServices"])
  );
  if (streamingUnlocks !== undefined) {
    override.streamingServicesUnlocked = clamp(Math.round(streamingUnlocks), 0, 10);
  }

  const torrentAllowed = toBoolean(getRecordValue(record, ["torrentAllowed", "torrentSupport", "p2pAllowed"]));
  if (torrentAllowed !== undefined) override.torrentAllowed = torrentAllowed;

  const testedAt =
    toStringValue(getRecordValue(record, ["lastTested", "testedAt", "scrapedAt", "updatedAt"])) ?? fallbackDate;
  override.lastTested = testedAt.slice(0, 10);

  return { slug, override };
}

async function getPipelineOverrides(): Promise<Record<string, SnapshotOverride>> {
  const now = Date.now();
  if (overrideCache && now - overrideCache.at < CACHE_TTL_MS) {
    return overrideCache.data;
  }

  try {
    const db = getDb();
    const jobs = await db
      .select({
        result: scrapeJobs.result,
        completedAt: scrapeJobs.completedAt,
        createdAt: scrapeJobs.createdAt,
      })
      .from(scrapeJobs)
      .where(
        and(
          eq(scrapeJobs.status, "completed"),
          inArray(scrapeJobs.type, ["vpn-data", "pricing"])
        )
      )
      .orderBy(desc(scrapeJobs.createdAt))
      .limit(40);

    const merged: Record<string, SnapshotOverride> = {};

    for (const job of jobs) {
      if (!job.result) continue;

      let parsed: unknown;
      try {
        parsed = JSON.parse(job.result);
      } catch {
        continue;
      }

      const fallbackDate = (job.completedAt ?? job.createdAt).toISOString().slice(0, 10);
      const items = Array.isArray(parsed)
        ? parsed
        : parsed && typeof parsed === "object" && Array.isArray((parsed as Record<string, unknown>).results)
          ? ((parsed as Record<string, unknown>).results as unknown[])
          : [parsed];

      for (const item of items) {
        if (!item || typeof item !== "object" || Array.isArray(item)) continue;
        const normalized = parseOverrideItem(item as Record<string, unknown>, fallbackDate);
        if (!normalized) continue;

        const existing = merged[normalized.slug] ?? {};
        merged[normalized.slug] = mergeOverrides(existing, normalized.override);
      }
    }

    overrideCache = { at: now, data: merged };
    return merged;
  } catch {
    return {};
  }
}

function scoreFromLoggingPolicy(policy: LoggingPolicyGrade): number {
  if (policy === "strict-no-logs") return 100;
  if (policy === "minimal-operational-logs") return 70;
  return 40;
}

function scoreFromAuditStatus(status: AuditStatus): number {
  if (status === "recent-audit") return 100;
  if (status === "older-audit") return 80;
  return 45;
}

function scoreFromJurisdictionRisk(risk: JurisdictionRisk): number {
  if (risk === "low") return 92;
  if (risk === "medium") return 72;
  return 45;
}

function speedComposite(snapshot: VpnTransparencySnapshot): number {
  const avg = (snapshot.downloadMbps.eu + snapshot.downloadMbps.us + snapshot.downloadMbps.asia) / 3;
  return clamp(avg);
}

function latencyScore(latencyMs: number): number {
  if (latencyMs <= 35) return 100;
  if (latencyMs <= 50) return 90;
  if (latencyMs <= 65) return 80;
  if (latencyMs <= 80) return 70;
  return 55;
}

function streamingScore(unlockedServices: number): number {
  return clamp((unlockedServices / 10) * 100);
}

function ownershipScore(owner: string): number {
  return owner === "Research pending" ? 45 : 90;
}

function torrentScore(torrentAllowed: boolean): number {
  return torrentAllowed ? 100 : 30;
}

export function getTransparencyScore(snapshot: VpnTransparencySnapshot): number {
  const score =
    speedComposite(snapshot) * 0.24 +
    latencyScore(snapshot.averageLatencyMs) * 0.1 +
    scoreFromLoggingPolicy(snapshot.loggingPolicy) * 0.14 +
    ownershipScore(snapshot.owner) * 0.08 +
    scoreFromJurisdictionRisk(snapshot.jurisdictionRisk) * 0.09 +
    scoreFromAuditStatus(snapshot.auditStatus) * 0.1 +
    streamingScore(snapshot.streamingServicesUnlocked) * 0.11 +
    torrentScore(snapshot.torrentAllowed) * 0.07 +
    clamp(snapshot.killSwitchReliability) * 0.07;

  return Math.round(clamp(score));
}

export function getTransparencySnapshot(slug: string): VpnTransparencySnapshot {
  const trustProfile = manualTrustProfiles[slug] ?? defaultTrustProfile;
  return {
    slug,
    ...trustProfile,
    averageLatencyMs: 75,
    downloadMbps: { eu: 72, us: 68, asia: 60 },
    killSwitchReliability: 94,
    streamingServicesUnlocked: 5,
    torrentAllowed: false,
    lastTested: DEFAULT_LAST_TESTED,
  };
}

export async function getTransparencySnapshotForVpn(vpn: VpnProvider): Promise<VpnTransparencySnapshot> {
  const base = buildBaseSnapshot(vpn);
  const overrides = await getPipelineOverrides();
  return applyOverride(base, overrides[vpn.slug]);
}

export async function getVpnIndexRows(vpns: VpnProvider[]): Promise<VpnIndexRow[]> {
  const overrides = await getPipelineOverrides();

  return vpns
    .map((vpn) => {
      const snapshot = applyOverride(buildBaseSnapshot(vpn), overrides[vpn.slug]);
      return {
        ...snapshot,
        name: vpn.name,
        overallRating: vpn.overallRating,
        priceMonthly: vpn.priceTwoYear ?? vpn.priceYearly,
        speedComposite: Math.round(speedComposite(snapshot)),
        transparencyScore: getTransparencyScore(snapshot),
      };
    })
    .sort((a, b) => b.transparencyScore - a.transparencyScore);
}

export function formatLoggingPolicy(policy: LoggingPolicyGrade): string {
  if (policy === "strict-no-logs") return "Strict no-logs";
  if (policy === "minimal-operational-logs") return "Minimal operational logs";
  return "Unclear / limited disclosure";
}

export function formatAuditStatus(status: AuditStatus): string {
  if (status === "recent-audit") return "Recent external audit";
  if (status === "older-audit") return "External audit (older)";
  return "No public audit";
}

export function formatJurisdictionRisk(risk: JurisdictionRisk): string {
  if (risk === "low") return "Lower legal exposure";
  if (risk === "medium") return "Moderate legal exposure";
  return "Higher legal exposure";
}
