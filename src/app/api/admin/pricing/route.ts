import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { pricingPlanSchema } from "@/lib/validations/pricing";
import { mockPricingData } from "@/lib/mockPricing";

// GET /api/admin/pricing - Fetch pricing plans and FAQs (Public)
export async function GET() {
  try {
    return NextResponse.json({ success: true, pricing: mockPricingData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/pricing - Update pricing plan details (Admin Protected)
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

    const validation = pricingPlanSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const plan = validation.data;

    const index = mockPricingData.plans.findIndex((p) => p.id === plan.id);
    if (index !== -1) {
      mockPricingData.plans[index] = {
        ...mockPricingData.plans[index],
        name: plan.name,
        description: plan.description,
        monthlyPrice: plan.monthlyPrice,
        yearlyPrice: plan.yearlyPrice,
        currency: plan.currency,
        ctaText: plan.ctaText,
        ctaHref: plan.ctaHref,
        popular: plan.popular,
        dark: plan.dark,
        features: plan.features,
      };
    } else {
      return NextResponse.json({ error: "Paket harga tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ success: true, plans: mockPricingData.plans });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
