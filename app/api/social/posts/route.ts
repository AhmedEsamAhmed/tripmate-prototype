import { NextRequest, NextResponse } from "next/server";
import { getSocialPosts, addSocialPost } from "@/lib/social-store";

const MAX_IMAGES = 5;
const MAX_CAPTION = 2000;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location") ?? undefined;
    const tag = searchParams.get("tag") ?? undefined;
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10) || 20, 50);
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const posts = getSocialPosts({ location, tag, limit, offset });
    return NextResponse.json({ posts });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userDisplayName, userAvatar, location, caption, images = [], supplierTaggedId = null, hashtags = [] } = body;
    if (!userId || !userDisplayName || !caption?.trim()) {
      return NextResponse.json({ error: "userId, userDisplayName, and caption are required" }, { status: 400 });
    }
    const imgList = Array.isArray(images) ? images.slice(0, MAX_IMAGES) : [];
    const captionTrim = String(caption).slice(0, MAX_CAPTION).trim();
    const hashtagList = Array.isArray(hashtags) ? hashtags.map((h: string) => String(h).slice(0, 50)) : [];
    const post = addSocialPost({
      userId,
      userDisplayName,
      userAvatar: userAvatar || undefined,
      location: location?.trim()?.slice(0, 100) || "Unknown",
      caption: captionTrim,
      images: imgList,
      supplierTaggedId: supplierTaggedId || null,
      hashtags: hashtagList,
    });
    return NextResponse.json({ post });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
