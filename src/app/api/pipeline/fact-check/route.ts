import { NextRequest, NextResponse } from "next/server";
import { ensurePipelineApiEnv } from "@/lib/pipeline/env-fallback";
import { factCheckContentWithJina } from "@/lib/pipeline/fact-checker";
import { scrapeUrl, saveScrapeJob } from "@/lib/pipeline/scraper";

export const maxDuration = 180;

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key");
  return key === process.env.PIPELINE_SECRET;
}

export async function POST(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = new Date();

  try {
    const body = await request.json();
    const {
      content: rawContent,
      topic,
      sourceUrl,
      maxClaims,
    } = body as {
      content?: string;
      topic?: string;
      sourceUrl?: string;
      maxClaims?: number;
    };

    const envStatus = ensurePipelineApiEnv();
    if (envStatus.missing.includes("JINA_API_KEY")) {
      return NextResponse.json(
        { error: "JINA_API_KEY is not configured" },
        { status: 500 }
      );
    }

    let content = rawContent?.trim() || "";
    let scrapedWith: "jina" | "brightdata" | null = null;

    if (!content && sourceUrl) {
      const scraped = await scrapeUrl(sourceUrl);
      content = scraped.content;
      scrapedWith = scraped.provider;
    }

    if (!content) {
      return NextResponse.json(
        { error: "Provide content or sourceUrl" },
        { status: 400 }
      );
    }

    const factCheck = await factCheckContentWithJina({
      content,
      topic: topic || sourceUrl || "VPN content",
      maxClaims,
    });

    const jobId = await saveScrapeJob({
      type: "fact-check",
      source: sourceUrl || "manual-content",
      status: "completed",
      result: JSON.stringify({
        ...factCheck,
        sourceUrl: sourceUrl || null,
        scrapedWith,
      }),
      startedAt,
      completedAt: new Date(),
    });

    return NextResponse.json({
      jobId,
      status: "completed",
      factCheck,
      sourceUrl: sourceUrl || null,
      scrapedWith,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown fact-check error";

    try {
      await saveScrapeJob({
        type: "fact-check",
        source: "error",
        status: "failed",
        error: message,
        startedAt,
        completedAt: new Date(),
      });
    } catch {
      // Ignore logging errors.
    }

    return NextResponse.json(
      { error: "Fact-check failed", details: message },
      { status: 500 }
    );
  }
}
