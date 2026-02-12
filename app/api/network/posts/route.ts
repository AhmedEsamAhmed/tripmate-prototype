import { NextRequest, NextResponse } from "next/server";
import { getNetworkPosts, addNetworkPost } from "@/lib/network-store";
import type { SupplierNetworkPostType } from "@/types/network";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region") ?? undefined;
    const role = searchParams.get("role") ?? undefined;
    const postType = searchParams.get("postType") as SupplierNetworkPostType | undefined;
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10) || 20, 50);
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const posts = getNetworkPosts({ region, role, postType, limit, offset });
    return NextResponse.json({ posts });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { supplierId, supplierName, supplierLogo, supplierType, postType, content, media = [], location = null } = body;
    if (!supplierId || !supplierName || !supplierType || !postType || !content?.trim()) {
      return NextResponse.json({ error: "supplierId, supplierName, supplierType, postType, and content are required" }, { status: 400 });
    }
    const validTypes: SupplierNetworkPostType[] = ["update", "collaboration_request", "driver_needed", "guide_needed", "referral_opportunity", "news", "question"];
    if (!validTypes.includes(postType)) {
      return NextResponse.json({ error: "Invalid postType" }, { status: 400 });
    }
    const post = addNetworkPost({
      supplierId,
      supplierName,
      supplierLogo: supplierLogo || undefined,
      supplierType,
      postType,
      content: String(content).slice(0, 2000).trim(),
      media: Array.isArray(media) ? media.slice(0, 5) : [],
      location: location ? String(location).slice(0, 100) : null,
    });
    return NextResponse.json({ post });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
