import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mockCareersData } from "@/lib/mockCareers";

// DELETE /api/admin/careers/[id] - Delete a job listing
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
    const index = mockCareersData.findIndex((j) => j.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Posisi pekerjaan tidak ditemukan." }, { status: 404 });
    }

    mockCareersData.splice(index, 1);

    return NextResponse.json({ success: true, careers: mockCareersData });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
