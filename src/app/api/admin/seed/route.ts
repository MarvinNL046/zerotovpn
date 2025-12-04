import { NextResponse } from "next/server";
import { getDb, vpnProviders as vpnProvidersTable } from "@/lib/db";
import { vpnProviders } from "@/lib/vpn-data";
import { count } from "drizzle-orm";

// POST /api/admin/seed - Seed the database with VPN data
export async function POST() {
  try {
    const db = getDb();

    // Check if we already have data
    const existingResult = await db
      .select({ count: count() })
      .from(vpnProvidersTable);
    const existingCount = existingResult[0]?.count ?? 0;

    if (existingCount > 0) {
      return NextResponse.json(
        {
          message: "Database already has VPN data",
          count: existingCount,
          seeded: false,
        },
        { status: 200 }
      );
    }

    // Seed VPN providers
    const results = [];
    for (const vpn of vpnProviders) {
      const created = await db
        .insert(vpnProvidersTable)
        .values({
          name: vpn.name,
          slug: vpn.slug,
          logo: vpn.logo,
          screenshot: vpn.screenshot,
          thumbnailImage: vpn.thumbnailImage,
          cardImage: vpn.cardImage,
          ogImage: vpn.ogImage,
          website: vpn.website,
          affiliateUrl: vpn.affiliateUrl,
          priceMonthly: String(vpn.priceMonthly),
          priceYearly: String(vpn.priceYearly),
          priceTwoYear: vpn.priceTwoYear ? String(vpn.priceTwoYear) : null,
          moneyBackDays: vpn.moneyBackDays,
          freeTier: vpn.freeTier,
          servers: vpn.servers,
          countries: vpn.countries,
          maxDevices: vpn.maxDevices,
          speedScore: vpn.speedScore,
          securityScore: vpn.securityScore,
          streamingScore: vpn.streamingScore,
          protocols: vpn.protocols,
          encryption: vpn.encryption,
          killSwitch: vpn.killSwitch,
          noLogs: vpn.noLogs,
          netflixSupport: vpn.netflixSupport,
          torrentSupport: vpn.torrentSupport,
          overallRating: String(vpn.overallRating),
          editorChoice: vpn.editorChoice,
          shortDescription: vpn.shortDescription,
          pros: vpn.pros,
          cons: vpn.cons,
          featured: vpn.featured,
          sortOrder: vpn.sortOrder,
        })
        .returning();
      results.push(created[0].name);
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      count: results.length,
      seeded: true,
      vpns: results,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}

// GET /api/admin/seed - Check seed status
export async function GET() {
  try {
    const db = getDb();
    const result = await db
      .select({ count: count() })
      .from(vpnProvidersTable);
    const dbCount = result[0]?.count ?? 0;

    return NextResponse.json({
      count: dbCount,
      isEmpty: dbCount === 0,
      staticDataCount: vpnProviders.length,
      databaseAvailable: true,
    });
  } catch (error) {
    console.error("Error checking seed status:", error);
    return NextResponse.json({
      count: 0,
      isEmpty: true,
      staticDataCount: vpnProviders.length,
      databaseAvailable: false,
      error: String(error),
    });
  }
}
