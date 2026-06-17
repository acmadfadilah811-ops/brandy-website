import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";
import { sanityClient } from "@/lib/sanity/client";
import { blogPostSchema } from "@/lib/validations/blog";
import { mockBlogPosts } from "@/lib/mockBlog";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// PUT /api/admin/blog/[slug] - Update an article
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // 1. Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await req.json();

    // 3. Validate with Zod
    const validation = blogPostSchema.safeParse(body);
    if (!validation.success) {
      const errorMap = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validasi gagal.", details: errorMap },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 4. Update Sanity CMS or fallback mock
    if (isSanityWriteConfigured()) {
      // Find document ID by slug
      const docId = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]._id`,
        { slug }
      );

      if (!docId) {
        return NextResponse.json(
          { error: "Artikel tidak ditemukan di Sanity CMS." },
          { status: 404 }
        );
      }

      const result = await sanityWriteClient
        .patch(docId)
        .set({
          title: data.title,
          category: data.category,
          excerpt: data.excerpt,
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
        })
        .commit();

      return NextResponse.json({
        success: true,
        message: "Artikel berhasil diperbarui di Sanity CMS.",
        post: result,
      });
    } else {
      // Mock Fallback
      const index = mockBlogPosts.findIndex((p) => p.slug === slug);
      if (index === -1) {
        return NextResponse.json(
          { error: "Artikel tidak ditemukan." },
          { status: 404 }
        );
      }

      mockBlogPosts[index] = {
        ...mockBlogPosts[index],
        title: data.title,
        category: data.category,
        excerpt: data.excerpt,
        tags: data.tags,
        body: [
          { type: "paragraph", content: data.bodyText }
        ],
        seoTitle: data.seoTitle || data.title,
        seoDesc: data.seoDesc || data.excerpt,
      };

      return NextResponse.json({
        success: true,
        message: "Mode Demo: Artikel berhasil diperbarui di memori lokal.",
        post: mockBlogPosts[index],
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/[slug] - Delete an article
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // 1. Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    // 2. Delete Sanity CMS or fallback mock
    if (isSanityWriteConfigured()) {
      // Find document ID by slug
      const docId = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]._id`,
        { slug }
      );

      if (!docId) {
        return NextResponse.json(
          { error: "Artikel tidak ditemukan di Sanity CMS." },
          { status: 404 }
        );
      }

      await sanityWriteClient.delete(docId);

      return NextResponse.json({
        success: true,
        message: "Artikel berhasil dihapus dari Sanity CMS.",
      });
    } else {
      // Mock Fallback
      const index = mockBlogPosts.findIndex((p) => p.slug === slug);
      if (index === -1) {
        return NextResponse.json(
          { error: "Artikel tidak ditemukan." },
          { status: 404 }
        );
      }

      mockBlogPosts.splice(index, 1);

      return NextResponse.json({
        success: true,
        message: "Mode Demo: Artikel berhasil dihapus dari memori lokal.",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
