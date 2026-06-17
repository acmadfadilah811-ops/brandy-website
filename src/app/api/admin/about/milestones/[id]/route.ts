import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mockAboutData } from "@/lib/mockAbout";

// DELETE /api/admin/about/milestones/[id] - Delete a milestone
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
    const index = mockAboutData.milestones.findIndex((m) => m.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Milestone tidak ditemukan." }, { status: 404 });
    }

    mockAboutData.milestones.splice(index, 1);

    return NextResponse.json({ success: true, milestones: mockAboutData.milestones });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
