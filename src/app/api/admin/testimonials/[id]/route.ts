import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mockTestimonialsData } from "@/lib/mockTestimonials";

// DELETE /api/admin/testimonials/[id] - Delete a testimonial
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
    const index = mockTestimonialsData.findIndex((t) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Testimoni tidak ditemukan." }, { status: 404 });
    }

    mockTestimonialsData.splice(index, 1);

    return NextResponse.json({ success: true, testimonials: mockTestimonialsData });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
