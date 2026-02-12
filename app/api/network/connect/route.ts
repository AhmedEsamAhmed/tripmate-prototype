import { NextRequest, NextResponse } from "next/server";
import { requestConnection } from "@/lib/network-store";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { fromSupplierId, toSupplierId } = body;
  if (!fromSupplierId || !toSupplierId) {
    return NextResponse.json({ error: "fromSupplierId and toSupplierId required" }, { status: 400 });
  }
  const conn = requestConnection(fromSupplierId, toSupplierId);
  if (!conn) return NextResponse.json({ error: "Already connected or invalid" }, { status: 400 });
  return NextResponse.json({ connection: conn });
}
