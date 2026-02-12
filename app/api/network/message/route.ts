import { NextRequest, NextResponse } from "next/server";
import { sendNetworkMessage } from "@/lib/network-store";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { senderId, receiverId, message } = body;
  if (!senderId || !receiverId || !message?.trim()) {
    return NextResponse.json({ error: "senderId, receiverId, and message required" }, { status: 400 });
  }
  const msg = sendNetworkMessage(senderId, receiverId, String(message).slice(0, 1000).trim());
  if (!msg) return NextResponse.json({ error: "Send failed" }, { status: 400 });
  return NextResponse.json({ message: msg });
}
