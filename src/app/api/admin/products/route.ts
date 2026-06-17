import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";
import { productSchema } from "@/lib/validations/product";
import { mockProducts } from "@/lib/mockProducts";

// GET /api/admin/products - List all products
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Sesi login tidak valid." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, products: mockProducts });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - Create a new product
export async function POST(req: NextRequest) {
  try {
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
      const doc = {
        _type: "product",
        name: data.name,
        slug: {
          _type: "slug",
          current: data.slug,
        },
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
      };

      const result = await sanityWriteClient.create(doc);
      return NextResponse.json({
        success: true,
        message: "Produk berhasil ditambahkan ke Sanity CMS.",
        product: result,
      });
    } else {
      // Fallback Mock
      const newMockProduct = {
        ...data,
        badge: data.badge || "",
      };

      mockProducts.unshift(newMockProduct);

      return NextResponse.json({
        success: true,
        message: "Mode Demo: Produk berhasil disimpan ke memori lokal.",
        product: newMockProduct,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
