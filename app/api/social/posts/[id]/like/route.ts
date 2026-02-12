import { NextRequest, NextResponse } from "next/server";
import { toggleSocialLike } from "@/lib/social-store";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { userId } = body;
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
  const result = toggleSocialLike(params.id, userId);
  return NextResponse.json(result);
}
