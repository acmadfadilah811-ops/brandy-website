import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { pricingFAQSchema } from "@/lib/validations/pricing";
import { mockPricingData } from "@/lib/mockPricing";

// POST /api/admin/pricing/faqs - Add or Edit a pricing FAQ
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

    const validation = pricingFAQSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const faq = validation.data;

    if (faq.id) {
      // Edit existing
      const index = mockPricingData.faqs.findIndex((f) => f.id === faq.id);
      if (index !== -1) {
        mockPricingData.faqs[index] = {
          ...mockPricingData.faqs[index],
          question: faq.question,
          answer: faq.answer,
        };
      } else {
        return NextResponse.json({ error: "FAQ tidak ditemukan." }, { status: 404 });
      }
    } else {
      // Add new
      const ids = mockPricingData.faqs.map((f) => parseInt(f.id.replace("faq_", "")) || 0);
      const newId = ids.length > 0 ? `faq_${Math.max(...ids) + 1}` : "faq_1";

      mockPricingData.faqs.push({
        id: newId,
        question: faq.question,
        answer: faq.answer,
      });
    }

    return NextResponse.json({ success: true, faqs: mockPricingData.faqs });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
