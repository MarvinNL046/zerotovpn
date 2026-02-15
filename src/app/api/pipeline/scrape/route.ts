import { NextRequest, NextResponse } from "next/server";
import {
  scrapeVpnPricing,
  scrapeVpnNews,
  scrapeAllVpnData,
  scrapeCountryVpnData,
  saveScrapeJob,
} from "@/lib/pipeline/scraper";

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

  try {
    const body = await request.json();
    const { type, vpnSlug, countrySlug } = body as {
      type: "vpn-data" | "pricing" | "news" | "country-vpn";
      vpnSlug?: string;
      countrySlug?: string;
    };

    if (!type) {
      return NextResponse.json(
        { error: "Missing required field: type" },
        { status: 400 }
      );
    }

    const startedAt = new Date();
    let results: unknown;
    let source: string;

    switch (type) {
      case "vpn-data": {
        source = "all-vpn-pricing-pages";
        results = await scrapeAllVpnData();
        break;
      }
      case "pricing": {
        if (!vpnSlug) {
          return NextResponse.json(
            { error: "vpnSlug is required for pricing scrape" },
            { status: 400 }
          );
        }
        source = `pricing:${vpnSlug}`;
        results = await scrapeVpnPricing(vpnSlug);
        break;
      }
      case "news": {
        source = "vpn-news-sources";
        results = await scrapeVpnNews();
        break;
      }
      case "country-vpn": {
        if (!countrySlug) {
          return NextResponse.json(
            { error: "countrySlug is required for country-vpn scrape" },
            { status: 400 }
          );
        }
        source = `country-vpn:${countrySlug}`;
        results = await scrapeCountryVpnData(countrySlug);
        break;
      }
      default:
        return NextResponse.json(
          { error: `Invalid type: ${type}` },
          { status: 400 }
        );
    }

    const jobId = await saveScrapeJob({
      type,
      source,
      vpnSlug: vpnSlug || countrySlug,
      status: "completed",
      result: JSON.stringify(results),
      startedAt,
      completedAt: new Date(),
    });

    return NextResponse.json({
      jobId,
      status: "completed",
      results,
    });
  } catch (error) {
    console.error("Pipeline scrape error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Try to save the failed job
    try {
      await saveScrapeJob({
        type: "unknown",
        source: "error",
        status: "failed",
        error: errorMessage,
        startedAt: new Date(),
        completedAt: new Date(),
      });
    } catch {
      // Ignore save errors
    }

    return NextResponse.json(
      { error: "Scrape failed", details: errorMessage },
      { status: 500 }
    );
  }
}
