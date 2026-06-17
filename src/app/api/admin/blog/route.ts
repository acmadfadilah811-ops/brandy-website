import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";
import { blogPostSchema } from "@/lib/validations/blog";
import { mockBlogPosts, authors } from "@/lib/mockBlog";

// GET /api/admin/blog - List all articles
export async function GET() {
  try {
    // 1. Auth check
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Sesi login tidak valid atau kadaluarsa." },
        { status: 401 }
      );
    }

    // Return the posts (in a real production app we would read from Sanity,
    // but here we can return the mock posts which are currently active)
    return NextResponse.json({ success: true, posts: mockBlogPosts });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog - Create new article
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user via Supabase
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan masuk terlebih dahulu." },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await req.json();

    // 3. Validate input with Zod
    const validation = blogPostSchema.safeParse(body);
    if (!validation.success) {
      const errorMap = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validasi gagal.", details: errorMap },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 4. Save to Sanity CMS if configured, else fallback to mock in-memory
    if (isSanityWriteConfigured()) {
      const doc = {
        _type: "post",
        title: data.title,
        slug: {
          _type: "slug",
          current: data.slug,
        },
        category: data.category,
        excerpt: data.excerpt,
        publishedAt: data.publishedAt,
        readTime: data.readTime,
        tags: data.tags,
        body: [
          {
            _type: "block",
            style: "normal",
            children: [{ _type: "span", text: data.bodyText }],
          },
        ],
        seoTitle: data.seoTitle || data.title,
        seoDesc: data.seoDesc || data.excerpt,
      };

      const result = await sanityWriteClient.create(doc);
      return NextResponse.json({
        success: true,
        message: "Artikel berhasil ditambahkan ke Sanity CMS.",
        post: result,
      });
    } else {
      // Mock Fallback: Push to mockBlogPosts in-memory array (persisted during active process)
      const newMockPost = {
        title: data.title,
        slug: data.slug,
        author: authors.achmad, // Default author
        publishedAt: data.publishedAt,
        readTime: data.readTime,
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450", // Default placeholder
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags,
        body: [
          { type: "paragraph" as const, content: data.bodyText }
        ],
        seoTitle: data.seoTitle || data.title,
        seoDesc: data.seoDesc || data.excerpt,
      };

      mockBlogPosts.unshift(newMockPost);

      return NextResponse.json({
        success: true,
        message: "Mode Demo: Artikel berhasil disimpan ke memori lokal.",
        post: newMockPost,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
