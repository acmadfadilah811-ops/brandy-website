import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";
import { sanityClient } from "@/lib/sanity/client";
import { productSchema } from "@/lib/validations/product";
import { mockProducts } from "@/lib/mockProducts";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// PUT /api/admin/products/[slug] - Update a product
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validate with Zod
    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      const errorMap = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validasi gagal.", details: errorMap },
        { status: 400 }
      );
    }

    const data = validation.data;

    if (isSanityWriteConfigured()) {
      // Find document ID by slug
      const docId = await sanityClient.fetch(
        `*[_type == "product" && slug.current == $slug][0]._id`,
        { slug }
      );

      if (!docId) {
        return NextResponse.json(
          { error: "Produk tidak ditemukan di Sanity CMS." },
          { status: 404 }
        );
      }

      const result = await sanityWriteClient
        .patch(docId)
        .set({
          name: data.name,
          tagline: data.tagline,
          description: data.description,
          iconName: data.iconName,
          category: data.category,
          badge: data.badge || "",
          color: data.color,
          roiTitle: data.roiTitle,
          roiDesc: data.roiDesc,
          roiMetric: data.roiMetric,
          videoUrl: data.videoUrl,
          features: data.features.map(f => ({
            _type: "object",
            iconName: f.iconName,
            title: f.title,
            desc: f.desc,
          })),
          integrations: data.integrations,
          specs: data.specs.map(s => ({
            _type: "object",
            label: s.label,
            value: s.value,
          })),
        })
        .commit();

      return NextResponse.json({
        success: true,
        message: "Produk berhasil diperbarui di Sanity CMS.",
        product: result,
      });
    } else {
      // Mock Fallback
      const index = mockProducts.findIndex((p) => p.slug === slug);
      if (index === -1) {
        return NextResponse.json(
          { error: "Produk tidak ditemukan." },
          { status: 404 }
        );
      }

      mockProducts[index] = {
        ...mockProducts[index],
        ...data,
        badge: data.badge || "",
      };

      return NextResponse.json({
        success: true,
        message: "Mode Demo: Produk berhasil diperbarui di memori lokal.",
        product: mockProducts[index],
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[slug] - Delete a product
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    if (isSanityWriteConfigured()) {
      // Find document ID by slug
      const docId = await sanityClient.fetch(
        `*[_type == "product" && slug.current == $slug][0]._id`,
        { slug }
      );

      if (!docId) {
        return NextResponse.json(
          { error: "Produk tidak ditemukan di Sanity CMS." },
          { status: 404 }
        );
      }

      await sanityWriteClient.delete(docId);

      return NextResponse.json({
        success: true,
        message: "Produk berhasil dihapus dari Sanity CMS.",
      });
    } else {
      // Mock Fallback
      const index = mockProducts.findIndex((p) => p.slug === slug);
      if (index === -1) {
        return NextResponse.json(
          { error: "Produk tidak ditemukan." },
          { status: 404 }
        );
      }

      mockProducts.splice(index, 1);

      return NextResponse.json({
        success: true,
        message: "Mode Demo: Produk berhasil dihapus dari memori lokal.",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
