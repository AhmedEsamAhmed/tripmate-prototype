import { NextRequest, NextResponse } from "next/server";
import { getConnections } from "@/lib/network-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supplierId = searchParams.get("supplierId");
  if (!supplierId) return NextResponse.json({ error: "supplierId required" }, { status: 400 });
  const connections = getConnections(supplierId);
  return NextResponse.json({ connections });
}
