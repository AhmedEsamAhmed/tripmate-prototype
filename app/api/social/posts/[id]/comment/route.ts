import { NextRequest, NextResponse } from "next/server";
import { addSocialComment } from "@/lib/social-store";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { userId, userDisplayName, comment } = body;
  if (!userId || !userDisplayName || !comment?.trim()) {
    return NextResponse.json({ error: "userId, userDisplayName, and comment are required" }, { status: 400 });
  }
  const c = addSocialComment(params.id, userId, userDisplayName, String(comment).slice(0, 500).trim());
  if (!c) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ comment: c });
}
