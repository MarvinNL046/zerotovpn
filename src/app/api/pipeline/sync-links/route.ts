import { NextRequest, NextResponse } from "next/server";
import { syncAffiliateLinks } from "@/lib/pipeline/affiliate-sync";

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
    const result = await syncAffiliateLinks();

    return NextResponse.json({
      synced: result.synced,
      total: result.total,
    });
  } catch (error) {
    console.error("Pipeline sync-links error:", error);
    return NextResponse.json(
      {
        error: "Sync failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
