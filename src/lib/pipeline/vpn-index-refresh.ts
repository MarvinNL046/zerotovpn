import { eq } from "drizzle-orm";
import { getDb, vpnProviders } from "@/lib/db";
import { generateContent } from "@/lib/pipeline/ai-provider";
import {
  saveScrapeJob,
  scrapeAllVpnData,
  type ScrapedPricing,
} from "@/lib/pipeline/scraper";

interface ExtractedPricingRecord {
  vpnSlug: string;
  priceMonthly: number | null;
  priceYearly: number | null;
  priceTwoYear: number | null;
  moneyBackDays: number | null;
  freeTier: boolean | null;
  confidence: number;
  notes: string;
}

interface StoredMonthlyRecord extends ExtractedPricingRecord {
  slug: string;
  scrapedWith: "jina" | "brightdata";
  scrapedAt: string;
  lastTested: string;
}

export interface MonthlyRefreshResult {
  jobId: string;
  totalProviders: number;
  extractedProviders: number;
  pricingUpdatesApplied: number;
  extractionError: string | null;
}

const MIN_CONFIDENCE_TO_PERSIST = 0.55;
const MAX_SIGNAL_LINES = 14;
const MAX_SIGNAL_LENGTH = 1200;

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = value.replace(/[^\d.,-]/g, "").replace(",", ".");
    const parsed = Number(normalized);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function toPrice(value: unknown): number | null {
  const parsed = toNumber(value);
  if (parsed === null) return null;
  if (parsed < 0 || parsed > 500) return null;
  return Math.round(parsed * 100) / 100;
}

function toDays(value: unknown): number | null {
  const parsed = toNumber(value);
  if (parsed === null) return null;
  if (parsed < 0 || parsed > 120) return null;
  return Math.round(parsed);
}

function toBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "yes", "1", "free"].includes(normalized)) return true;
    if (["false", "no", "0", "paid"].includes(normalized)) return false;
  }
  return null;
}

function toConfidence(value: unknown): number {
  const parsed = toNumber(value);
  if (parsed === null) return 0;
  if (parsed > 1) return Math.max(0, Math.min(1, parsed / 100));
  return Math.max(0, Math.min(1, parsed));
}

function toSlug(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const slug = value.trim().toLowerCase();
  return slug.length > 0 ? slug : null;
}

function stripCodeFences(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("```")) return trimmed;
  const withoutStart = trimmed.replace(/^```(?:json)?\s*/i, "");
  return withoutStart.replace(/\s*```$/, "").trim();
}

function extractJsonObject(raw: string): string {
  const plain = stripCodeFences(raw);
  const start = plain.indexOf("{");
  const end = plain.lastIndexOf("}");
  if (start >= 0 && end > start) return plain.slice(start, end + 1);
  return plain;
}

function extractPricingSignals(raw: string): string {
  const signalRegex =
    /(\$|€|£|¥|usd|eur|monthly|month|annual|year|2-year|24-month|money-back|money back|refund|free trial|free plan)/i;

  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/\s+/g, " "))
    .filter(Boolean);

  const picked: string[] = [];
  for (const line of lines) {
    if (!signalRegex.test(line)) continue;
    picked.push(line);
    if (picked.length >= MAX_SIGNAL_LINES) break;
  }

  const compact = picked.length > 0 ? picked.join("\n") : raw.replace(/\s+/g, " ").slice(0, MAX_SIGNAL_LENGTH);
  return compact.slice(0, MAX_SIGNAL_LENGTH);
}

async function extractPricingWithHaiku(
  scraped: ScrapedPricing[]
): Promise<ExtractedPricingRecord[]> {
  const payload = scraped.map((item) => ({
    vpnSlug: item.vpnSlug,
    scrapedWith: item.scrapedWith,
    signals: extractPricingSignals(item.rawContent),
  }));

  const prompt = [
    "Extract structured VPN pricing data from the snippets below.",
    "Return ONLY valid JSON with this exact shape:",
    '{ "providers": [ { "vpnSlug": "string", "priceMonthly": number|null, "priceYearly": number|null, "priceTwoYear": number|null, "moneyBackDays": number|null, "freeTier": boolean|null, "confidence": number, "notes": "string" } ] }',
    "Rules:",
    "- Use null when data is not explicitly visible in the snippet.",
    "- confidence must be between 0 and 1.",
    "- Keep notes short and factual.",
    "- Include one object per vpnSlug from input.",
    "",
    "Input:",
    JSON.stringify(payload),
  ].join("\n");

  const response = await generateContent(prompt, {
    model: "claude-haiku",
    maxTokens: 5000,
    temperature: 0.1,
  });

  const jsonPayload = extractJsonObject(response);
  const parsed = JSON.parse(jsonPayload) as {
    providers?: unknown;
  };

  if (!Array.isArray(parsed.providers)) {
    throw new Error("Haiku response has no providers array");
  }

  const validSlugs = new Set(scraped.map((item) => item.vpnSlug));
  const normalized: ExtractedPricingRecord[] = [];

  for (const row of parsed.providers) {
    if (!row || typeof row !== "object" || Array.isArray(row)) continue;
    const record = row as Record<string, unknown>;
    const vpnSlug = toSlug(record.vpnSlug);
    if (!vpnSlug || !validSlugs.has(vpnSlug)) continue;

    normalized.push({
      vpnSlug,
      priceMonthly: toPrice(record.priceMonthly),
      priceYearly: toPrice(record.priceYearly),
      priceTwoYear: toPrice(record.priceTwoYear),
      moneyBackDays: toDays(record.moneyBackDays),
      freeTier: toBoolean(record.freeTier),
      confidence: toConfidence(record.confidence),
      notes: typeof record.notes === "string" ? record.notes.slice(0, 220) : "",
    });
  }

  const withFallbacks = scraped.map((item) => {
    const match = normalized.find((entry) => entry.vpnSlug === item.vpnSlug);
    if (match) return match;
    return {
      vpnSlug: item.vpnSlug,
      priceMonthly: null,
      priceYearly: null,
      priceTwoYear: null,
      moneyBackDays: null,
      freeTier: null,
      confidence: 0,
      notes: "No structured extraction returned.",
    };
  });

  return withFallbacks;
}

async function persistPricingUpdates(
  extracted: ExtractedPricingRecord[]
): Promise<number> {
  const db = getDb();
  let updates = 0;

  for (const record of extracted) {
    if (record.confidence < MIN_CONFIDENCE_TO_PERSIST) continue;

    const updateData: {
      priceMonthly?: string;
      priceYearly?: string;
      priceTwoYear?: string;
      moneyBackDays?: number;
      freeTier?: boolean;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (record.priceMonthly !== null) {
      updateData.priceMonthly = record.priceMonthly.toFixed(2);
    }
    if (record.priceYearly !== null) {
      updateData.priceYearly = record.priceYearly.toFixed(2);
    }
    if (record.priceTwoYear !== null) {
      updateData.priceTwoYear = record.priceTwoYear.toFixed(2);
    }
    if (record.moneyBackDays !== null) {
      updateData.moneyBackDays = record.moneyBackDays;
    }
    if (record.freeTier !== null) {
      updateData.freeTier = record.freeTier;
    }

    const hasPersistableFields =
      updateData.priceMonthly !== undefined ||
      updateData.priceYearly !== undefined ||
      updateData.priceTwoYear !== undefined ||
      updateData.moneyBackDays !== undefined ||
      updateData.freeTier !== undefined;

    if (!hasPersistableFields) continue;

    const updated = await db
      .update(vpnProviders)
      .set(updateData)
      .where(eq(vpnProviders.slug, record.vpnSlug))
      .returning({ slug: vpnProviders.slug });

    if (updated.length > 0) {
      updates += 1;
    }
  }

  return updates;
}

function mergeForStorage(
  scraped: ScrapedPricing[],
  extracted: ExtractedPricingRecord[],
  stamp: string
): StoredMonthlyRecord[] {
  const map = new Map(extracted.map((item) => [item.vpnSlug, item]));

  return scraped.map((item) => {
    const extractedData = map.get(item.vpnSlug);
    return {
      slug: item.vpnSlug,
      vpnSlug: item.vpnSlug,
      scrapedWith: item.scrapedWith,
      scrapedAt: stamp,
      lastTested: stamp.slice(0, 10),
      priceMonthly: extractedData?.priceMonthly ?? null,
      priceYearly: extractedData?.priceYearly ?? null,
      priceTwoYear: extractedData?.priceTwoYear ?? null,
      moneyBackDays: extractedData?.moneyBackDays ?? null,
      freeTier: extractedData?.freeTier ?? null,
      confidence: extractedData?.confidence ?? 0,
      notes: extractedData?.notes ?? "",
    };
  });
}

export async function runMonthlyVpnIndexRefresh(): Promise<MonthlyRefreshResult> {
  const startedAt = new Date();

  try {
    const scraped = await scrapeAllVpnData();

    let extracted: ExtractedPricingRecord[] = [];
    let extractionError: string | null = null;

    try {
      extracted = await extractPricingWithHaiku(scraped);
    } catch (error) {
      extractionError =
        error instanceof Error ? error.message : "Unknown extraction error";
      extracted = scraped.map((item) => ({
        vpnSlug: item.vpnSlug,
        priceMonthly: null,
        priceYearly: null,
        priceTwoYear: null,
        moneyBackDays: null,
        freeTier: null,
        confidence: 0,
        notes: "Haiku extraction failed.",
      }));
    }

    const pricingUpdatesApplied = await persistPricingUpdates(extracted);
    const stamp = new Date().toISOString();
    const results = mergeForStorage(scraped, extracted, stamp);

    const jobId = await saveScrapeJob({
      type: "vpn-data",
      source: "cron:monthly-vpn-index-refresh",
      status: "completed",
      result: JSON.stringify({
        results,
        meta: {
          runType: "monthly-index-refresh",
          extractedProviders: extracted.filter((item) => item.confidence > 0).length,
          pricingUpdatesApplied,
          extractionError,
          haikuModel: "claude-haiku-4-5-20251001",
        },
      }),
      startedAt,
      completedAt: new Date(),
    });

    return {
      jobId,
      totalProviders: scraped.length,
      extractedProviders: extracted.filter((item) => item.confidence > 0).length,
      pricingUpdatesApplied,
      extractionError,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown refresh error";

    await saveScrapeJob({
      type: "vpn-data",
      source: "cron:monthly-vpn-index-refresh",
      status: "failed",
      error: message,
      startedAt,
      completedAt: new Date(),
    });

    throw error;
  }
}
