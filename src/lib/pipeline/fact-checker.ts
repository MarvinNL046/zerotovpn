import { generateContent } from "@/lib/pipeline/ai-provider";

export type ClaimVerdict = "supported" | "contradicted" | "mixed" | "unclear";

export interface FactCheckClaim {
  claim: string;
  importance: "high" | "medium" | "low";
}

export interface FactCheckSource {
  title: string;
  url: string;
  snippet: string;
}

export interface FactCheckResultItem {
  claim: string;
  verdict: ClaimVerdict;
  confidence: number;
  explanation: string;
  sources: FactCheckSource[];
}

export interface FactCheckRunResult {
  checkedAt: string;
  topic: string;
  claimCount: number;
  results: FactCheckResultItem[];
}

export interface FactCheckFixSuggestion {
  claim: string;
  confidence: number;
  recommendation: string;
  proposedReplacement: string;
  sourceUrls: string[];
}

export interface FactCheckTextPatch {
  claim: string;
  oldText: string;
  newText: string;
  reason: string;
  confidence: number;
  sourceUrls: string[];
}

export interface ApplyTextPatchesResult {
  updatedContent: string;
  appliedPatches: FactCheckTextPatch[];
  skippedPatches: Array<{ patch: FactCheckTextPatch; reason: string }>;
}

function getJinaApiKey(): string {
  return process.env.JINA_API_KEY?.trim() || "";
}

function clampConfidence(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value > 1) return Math.max(0, Math.min(1, value / 100));
    return Math.max(0, Math.min(1, value));
  }
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.-]/g, ""));
    if (Number.isFinite(parsed)) {
      if (parsed > 1) return Math.max(0, Math.min(1, parsed / 100));
      return Math.max(0, Math.min(1, parsed));
    }
  }
  return 0.5;
}

function toVerdict(value: unknown): ClaimVerdict {
  if (typeof value !== "string") return "unclear";
  const normalized = value.trim().toLowerCase();
  if (normalized.includes("support")) return "supported";
  if (normalized.includes("contrad")) return "contradicted";
  if (normalized.includes("mixed")) return "mixed";
  return "unclear";
}

function stripCodeFences(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("```")) return trimmed;
  return trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}

function extractJsonObject(raw: string): string {
  const plain = stripCodeFences(raw);
  const start = plain.indexOf("{");
  const end = plain.lastIndexOf("}");
  if (start >= 0 && end > start) return plain.slice(start, end + 1);
  return plain;
}

function normalizeSource(item: Record<string, unknown>): FactCheckSource | null {
  const title = typeof item.title === "string" ? item.title.trim() : "";
  const url = typeof item.url === "string" ? item.url.trim() : "";
  const snippet = typeof item.snippet === "string" ? item.snippet.trim() : "";
  if (!url) return null;
  return {
    title: title || "Untitled source",
    url,
    snippet: snippet.slice(0, 300),
  };
}

async function extractClaims(content: string, topic: string, maxClaims: number): Promise<FactCheckClaim[]> {
  const prompt = [
    "Extract factual claims from the content below that should be fact-checked.",
    "Return only JSON with this shape:",
    '{ "claims": [ { "claim": "string", "importance": "high|medium|low" } ] }',
    `Select at most ${maxClaims} claims.`,
    "Prioritize concrete claims: numbers, legal claims, blocking claims, timeline claims, provider claims.",
    "",
    `Topic: ${topic}`,
    "Content:",
    content.slice(0, 10000),
  ].join("\n");

  const response = await generateContent(prompt, {
    model: "claude-haiku",
    maxTokens: 1600,
    temperature: 0.1,
  });

  const json = JSON.parse(extractJsonObject(response)) as { claims?: unknown };
  if (!Array.isArray(json.claims)) return [];

  const claims: FactCheckClaim[] = [];
  for (const row of json.claims) {
    if (!row || typeof row !== "object" || Array.isArray(row)) continue;
    const record = row as Record<string, unknown>;
    const claim = typeof record.claim === "string" ? record.claim.trim() : "";
    if (!claim) continue;
    const importance =
      record.importance === "high" || record.importance === "medium" || record.importance === "low"
        ? record.importance
        : "medium";
    claims.push({ claim, importance });
  }

  return claims.slice(0, maxClaims);
}

async function jinaSearch(query: string): Promise<FactCheckSource[]> {
  const headers: Record<string, string> = { Accept: "application/json" };
  const jinaApiKey = getJinaApiKey();
  if (jinaApiKey) headers.Authorization = `Bearer ${jinaApiKey}`;

  const response = await fetch(`https://s.jina.ai/${encodeURIComponent(query)}`, {
    method: "GET",
    headers,
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Jina search failed: ${response.status}`);
  }

  const payload = await response.json();
  const items = Array.isArray(payload.data)
    ? payload.data
    : Array.isArray(payload.results)
      ? payload.results
      : [];

  const sources: FactCheckSource[] = [];
  for (const item of items.slice(0, 5)) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const record = item as Record<string, unknown>;
    const source = normalizeSource({
      title: record.title,
      url: record.url,
      snippet: typeof record.description === "string" ? record.description : record.content,
    });
    if (source) sources.push(source);
  }

  return sources;
}

async function classifyClaim(claim: FactCheckClaim, topic: string, sources: FactCheckSource[]): Promise<FactCheckResultItem> {
  if (sources.length === 0) {
    return {
      claim: claim.claim,
      verdict: "unclear",
      confidence: 0.25,
      explanation: "No sources returned by Jina search.",
      sources: [],
    };
  }

  const prompt = [
    "Assess whether the claim is supported by the provided sources.",
    "Return only JSON with this shape:",
    '{ "verdict": "supported|contradicted|mixed|unclear", "confidence": 0.0, "explanation": "string" }',
    "Rules:",
    "- Use only source snippets as evidence.",
    "- If sources conflict, use mixed.",
    "- If evidence is weak, use unclear.",
    "",
    `Topic: ${topic}`,
    `Claim: ${claim.claim}`,
    "Sources:",
    JSON.stringify(sources),
  ].join("\n");

  const response = await generateContent(prompt, {
    model: "claude-haiku",
    maxTokens: 700,
    temperature: 0.1,
  });

  const parsed = JSON.parse(extractJsonObject(response)) as Record<string, unknown>;

  return {
    claim: claim.claim,
    verdict: toVerdict(parsed.verdict),
    confidence: clampConfidence(parsed.confidence),
    explanation:
      typeof parsed.explanation === "string"
        ? parsed.explanation.slice(0, 320)
        : "No explanation returned.",
    sources,
  };
}

export async function factCheckContentWithJina(input: {
  content: string;
  topic?: string;
  maxClaims?: number;
}): Promise<FactCheckRunResult> {
  const topic = input.topic?.trim() || "VPN content";
  const maxClaims = Math.max(1, Math.min(8, input.maxClaims ?? 5));

  const claims = await extractClaims(input.content, topic, maxClaims);
  const selectedClaims = claims.length > 0
    ? claims
    : [{ claim: topic, importance: "high" as const }];

  const results: FactCheckResultItem[] = [];
  for (const claim of selectedClaims) {
    const query = `${claim.claim} ${topic}`;
    const sources = await jinaSearch(query);
    const verdict = await classifyClaim(claim, topic, sources);
    results.push(verdict);
  }

  return {
    checkedAt: new Date().toISOString(),
    topic,
    claimCount: results.length,
    results,
  };
}

function pickFixCandidates(results: FactCheckResultItem[]): FactCheckResultItem[] {
  return results.filter((item) => {
    if (item.verdict === "contradicted" && item.confidence >= 0.55) return true;
    if (item.verdict === "mixed" && item.confidence >= 0.65) return true;
    return false;
  });
}

export async function generateFixSuggestions(input: {
  topic: string;
  content: string;
  results: FactCheckResultItem[];
  maxFixes?: number;
}): Promise<FactCheckFixSuggestion[]> {
  const maxFixes = Math.max(1, Math.min(8, input.maxFixes ?? 5));
  const candidates = pickFixCandidates(input.results).slice(0, maxFixes);
  if (candidates.length === 0) return [];

  const prompt = [
    "You are preparing editorial fixes after fact-checking.",
    "Return only JSON with this shape:",
    '{ "suggestions": [ { "claim": "string", "confidence": 0.0, "recommendation": "string", "proposedReplacement": "string", "sourceUrls": ["https://..."] } ] }',
    "Rules:",
    "- recommendation: one short action sentence for editor.",
    "- proposedReplacement: concise text that can replace or amend the original claim.",
    "- Use only source-backed language; avoid new unsupported facts.",
    "- sourceUrls must come from the provided sources.",
    "",
    `Topic: ${input.topic}`,
    "Flagged claims:",
    JSON.stringify(
      candidates.map((item) => ({
        claim: item.claim,
        verdict: item.verdict,
        confidence: item.confidence,
        sources: item.sources,
      }))
    ),
    "",
    "Original content excerpt:",
    input.content.slice(0, 12000),
  ].join("\n");

  const response = await generateContent(prompt, {
    model: "claude-haiku",
    maxTokens: 1600,
    temperature: 0.1,
  });

  const parsed = JSON.parse(extractJsonObject(response)) as {
    suggestions?: unknown;
  };

  if (!Array.isArray(parsed.suggestions)) return [];

  const suggestions: FactCheckFixSuggestion[] = [];
  for (const row of parsed.suggestions) {
    if (!row || typeof row !== "object" || Array.isArray(row)) continue;
    const item = row as Record<string, unknown>;
    const claim = typeof item.claim === "string" ? item.claim.trim() : "";
    if (!claim) continue;

    const recommendation =
      typeof item.recommendation === "string"
        ? item.recommendation.trim().slice(0, 240)
        : "";
    const proposedReplacement =
      typeof item.proposedReplacement === "string"
        ? item.proposedReplacement.trim().slice(0, 500)
        : "";
    const sourceUrls = Array.isArray(item.sourceUrls)
      ? item.sourceUrls.filter((url): url is string => typeof url === "string").slice(0, 5)
      : [];

    suggestions.push({
      claim,
      confidence: clampConfidence(item.confidence),
      recommendation: recommendation || "Review this claim against the listed sources.",
      proposedReplacement: proposedReplacement || "Revise this claim to match the cited sources.",
      sourceUrls,
    });
  }

  return suggestions.slice(0, maxFixes);
}

export async function generateTextPatchesFromSuggestions(input: {
  topic: string;
  content: string;
  suggestions: FactCheckFixSuggestion[];
  maxPatches?: number;
}): Promise<FactCheckTextPatch[]> {
  const maxPatches = Math.max(1, Math.min(10, input.maxPatches ?? 6));
  const selectedSuggestions = input.suggestions.slice(0, maxPatches);
  if (selectedSuggestions.length === 0) return [];

  const prompt = [
    "Create minimal text patches for an HTML article.",
    "Return only JSON with this shape:",
    '{ "patches": [ { "claim": "string", "oldText": "exact string from content", "newText": "replacement string", "reason": "string", "confidence": 0.0, "sourceUrls": ["https://..."] } ] }',
    "Rules:",
    "- oldText MUST be copied exactly from content (verbatim).",
    "- oldText must be a short sentence or phrase, not whole sections.",
    "- Keep HTML structure intact; do not add/remove tags.",
    "- newText should fix factual accuracy with minimal changes.",
    "- If unsure, skip patch creation.",
    "",
    `Topic: ${input.topic}`,
    "Fix suggestions:",
    JSON.stringify(selectedSuggestions),
    "",
    "HTML content:",
    input.content.slice(0, 14000),
  ].join("\n");

  const response = await generateContent(prompt, {
    model: "claude-haiku",
    maxTokens: 2200,
    temperature: 0.1,
  });

  const parsed = JSON.parse(extractJsonObject(response)) as {
    patches?: unknown;
  };
  if (!Array.isArray(parsed.patches)) return [];

  const patches: FactCheckTextPatch[] = [];
  for (const row of parsed.patches) {
    if (!row || typeof row !== "object" || Array.isArray(row)) continue;
    const item = row as Record<string, unknown>;

    const claim = typeof item.claim === "string" ? item.claim.trim() : "";
    const oldText = typeof item.oldText === "string" ? item.oldText : "";
    const newText = typeof item.newText === "string" ? item.newText : "";
    const reason =
      typeof item.reason === "string"
        ? item.reason.trim().slice(0, 240)
        : "Fact-check update";
    const sourceUrls = Array.isArray(item.sourceUrls)
      ? item.sourceUrls.filter((url): url is string => typeof url === "string").slice(0, 5)
      : [];

    if (!claim || !oldText || !newText) continue;
    if (oldText === newText) continue;
    if (oldText.length < 8 || oldText.length > 1200) continue;
    if (!input.content.includes(oldText)) continue;

    patches.push({
      claim,
      oldText,
      newText,
      reason,
      confidence: clampConfidence(item.confidence),
      sourceUrls,
    });
  }

  return patches.slice(0, maxPatches);
}

export function applyTextPatches(
  content: string,
  patches: FactCheckTextPatch[]
): ApplyTextPatchesResult {
  let updatedContent = content;
  const appliedPatches: FactCheckTextPatch[] = [];
  const skippedPatches: Array<{ patch: FactCheckTextPatch; reason: string }> = [];

  for (const patch of patches) {
    if (!updatedContent.includes(patch.oldText)) {
      skippedPatches.push({
        patch,
        reason: "oldText not found in content",
      });
      continue;
    }

    updatedContent = updatedContent.replace(patch.oldText, patch.newText);
    appliedPatches.push(patch);
  }

  return {
    updatedContent,
    appliedPatches,
    skippedPatches,
  };
}
