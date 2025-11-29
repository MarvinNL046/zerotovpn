import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { vpnProviders } from "@/lib/vpn-data";

// POST /api/admin/seed - Seed the database with VPN data
export async function POST() {
  try {
    // Check if database is available
    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured", details: "DATABASE_URL not set" },
        { status: 503 }
      );
    }

    // Check if we already have data
    const existingCount = await prisma.vpnProvider.count();

    if (existingCount > 0) {
      return NextResponse.json(
        {
          message: "Database already has VPN data",
          count: existingCount,
          seeded: false
        },
        { status: 200 }
      );
    }

    // Seed VPN providers
    const results = [];
    for (const vpn of vpnProviders) {
      const created = await prisma.vpnProvider.create({
        data: {
          name: vpn.name,
          slug: vpn.slug,
          logo: vpn.logo,
          screenshot: vpn.screenshot,
          thumbnailImage: vpn.thumbnailImage,
          cardImage: vpn.cardImage,
          ogImage: vpn.ogImage,
          website: vpn.website,
          affiliateUrl: vpn.affiliateUrl,
          priceMonthly: vpn.priceMonthly,
          priceYearly: vpn.priceYearly,
          priceTwoYear: vpn.priceTwoYear ?? null,
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
          overallRating: vpn.overallRating,
          editorChoice: vpn.editorChoice,
          shortDescription: vpn.shortDescription,
          pros: vpn.pros,
          cons: vpn.cons,
          featured: vpn.featured,
          sortOrder: vpn.sortOrder,
        },
      });
      results.push(created.name);
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
    // Check if database is available
    if (!prisma) {
      return NextResponse.json({
        count: 0,
        isEmpty: true,
        staticDataCount: vpnProviders.length,
        databaseAvailable: false,
      });
    }

    const count = await prisma.vpnProvider.count();
    return NextResponse.json({
      count,
      isEmpty: count === 0,
      staticDataCount: vpnProviders.length,
    });
  } catch (error) {
    console.error("Error checking seed status:", error);
    return NextResponse.json(
      { error: "Failed to check seed status" },
      { status: 500 }
    );
  }
}
