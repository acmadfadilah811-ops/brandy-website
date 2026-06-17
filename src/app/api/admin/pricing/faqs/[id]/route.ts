import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mockPricingData } from "@/lib/mockPricing";

// DELETE /api/admin/pricing/faqs/[id] - Delete a pricing FAQ
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const index = mockPricingData.faqs.findIndex((f) => f.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "FAQ tidak ditemukan." }, { status: 404 });
    }

    mockPricingData.faqs.splice(index, 1);

    return NextResponse.json({ success: true, faqs: mockPricingData.faqs });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
