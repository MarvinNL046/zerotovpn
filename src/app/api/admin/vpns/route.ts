import { NextRequest, NextResponse } from "next/server";
import { getAllVpnsFromDb, createVpn, getVpnCount } from "@/lib/db/vpn-service";

// GET /api/admin/vpns - List all VPNs
export async function GET() {
  try {
    const vpns = await getAllVpnsFromDb();
    const count = await getVpnCount();
    return NextResponse.json({ vpns, count });
  } catch (error) {
    console.error("Error fetching VPNs:", error);
    return NextResponse.json(
      { error: "Failed to fetch VPNs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/vpns - Create a new VPN
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.slug || !data.website || !data.affiliateUrl) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, website, affiliateUrl" },
        { status: 400 }
      );
    }

    const vpn = await createVpn({
      name: data.name,
      slug: data.slug,
      logo: data.logo || null,
      screenshot: data.screenshot || null,
      thumbnailImage: data.thumbnailImage || null,
      cardImage: data.cardImage || null,
      ogImage: data.ogImage || null,
      website: data.website,
      affiliateUrl: data.affiliateUrl,
      priceMonthly: data.priceMonthly || 0,
      priceYearly: data.priceYearly || 0,
      priceTwoYear: data.priceTwoYear || null,
      moneyBackDays: data.moneyBackDays || 30,
      freeTier: data.freeTier || false,
      servers: data.servers || 0,
      countries: data.countries || 0,
      maxDevices: data.maxDevices || 1,
      speedScore: data.speedScore || 50,
      securityScore: data.securityScore || 50,
      streamingScore: data.streamingScore || 50,
      protocols: data.protocols || [],
      encryption: data.encryption || "AES-256",
      killSwitch: data.killSwitch ?? true,
      noLogs: data.noLogs ?? true,
      netflixSupport: data.netflixSupport || false,
      torrentSupport: data.torrentSupport || false,
      overallRating: data.overallRating || 3.0,
      editorChoice: data.editorChoice || false,
      shortDescription: data.shortDescription || null,
      pros: data.pros || [],
      cons: data.cons || [],
      featured: data.featured || false,
      sortOrder: data.sortOrder || 999,
    });

    return NextResponse.json({ vpn }, { status: 201 });
  } catch (error) {
    console.error("Error creating VPN:", error);
    return NextResponse.json(
      { error: "Failed to create VPN" },
      { status: 500 }
    );
  }
}
