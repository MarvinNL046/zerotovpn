import { NextRequest, NextResponse } from "next/server";
import { getVpnByIdFromDb, updateVpn, deleteVpn } from "@/lib/db/vpn-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/admin/vpns/[id] - Get single VPN
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const vpn = await getVpnByIdFromDb(id);

    if (!vpn) {
      return NextResponse.json({ error: "VPN not found" }, { status: 404 });
    }

    return NextResponse.json({ vpn });
  } catch (error) {
    console.error("Error fetching VPN:", error);
    return NextResponse.json(
      { error: "Failed to fetch VPN" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/vpns/[id] - Update VPN
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const data = await request.json();

    // Check if VPN exists
    const existing = await getVpnByIdFromDb(id);
    if (!existing) {
      return NextResponse.json({ error: "VPN not found" }, { status: 404 });
    }

    const vpn = await updateVpn(id, data);
    return NextResponse.json({ vpn });
  } catch (error) {
    console.error("Error updating VPN:", error);
    return NextResponse.json(
      { error: "Failed to update VPN" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/vpns/[id] - Delete VPN
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Check if VPN exists
    const existing = await getVpnByIdFromDb(id);
    if (!existing) {
      return NextResponse.json({ error: "VPN not found" }, { status: 404 });
    }

    await deleteVpn(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting VPN:", error);
    return NextResponse.json(
      { error: "Failed to delete VPN" },
      { status: 500 }
    );
  }
}
