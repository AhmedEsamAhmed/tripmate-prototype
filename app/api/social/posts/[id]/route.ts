import { NextRequest, NextResponse } from "next/server";
import { getSocialPost, updateSocialPost, deleteSocialPost } from "@/lib/social-store";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const post = getSocialPost(params.id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const post = getSocialPost(params.id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  const body = await request.json();
  const { userId, caption, location, images, hashtags, supplierTaggedId } = body;
  if (userId !== post.userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const updates: Parameters<typeof updateSocialPost>[1] = {};
  if (caption !== undefined) updates.caption = String(caption).slice(0, 2000).trim();
  if (location !== undefined) updates.location = String(location).slice(0, 100);
  if (images !== undefined) updates.images = Array.isArray(images) ? images.slice(0, 5) : post.images;
  if (hashtags !== undefined) updates.hashtags = Array.isArray(hashtags) ? hashtags.map((h: string) => String(h).slice(0, 50)) : post.hashtags;
  if (supplierTaggedId !== undefined) updates.supplierTaggedId = supplierTaggedId || null;
  const updated = updateSocialPost(params.id, updates);
  return NextResponse.json({ post: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const post = getSocialPost(params.id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (userId !== post.userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const ok = deleteSocialPost(params.id);
  if (!ok) return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}
