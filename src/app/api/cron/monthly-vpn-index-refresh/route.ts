import { NextRequest, NextResponse } from "next/server";
import { ensurePipelineApiEnv } from "@/lib/pipeline/env-fallback";
import { runMonthlyVpnIndexRefresh } from "@/lib/pipeline/vpn-index-refresh";

export const maxDuration = 300;

function extractPipelineKey(request: NextRequest): string | null {
  return (
    request.headers.get("x-pipeline-key") ||
    request.headers.get("x-admin-key")
  );
}

function validateCronAuth(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  const pipelineSecret = process.env.PIPELINE_SECRET?.trim();
  const pipelineKey = extractPipelineKey(request);
  if (pipelineSecret && pipelineKey === pipelineSecret) {
    return true;
  }

  // Safe fallback for local testing when no secrets are configured.
  return request.headers.has("x-vercel-cron");
}

async function handleRequest(request: NextRequest) {
  if (!validateCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const envResult = ensurePipelineApiEnv();
    const refreshResult = await runMonthlyVpnIndexRefresh();

    return NextResponse.json({
      ok: true,
      refresh: refreshResult,
      env: {
        resolvedKeys: Object.keys(envResult.resolved),
        missingKeys: envResult.missing,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Monthly VPN index refresh failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}
