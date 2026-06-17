import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { milestoneSchema } from "@/lib/validations/about";
import { mockAboutData } from "@/lib/mockAbout";

// POST /api/admin/about/milestones - Add or Edit a milestone
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

    const validation = milestoneSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const milestone = validation.data;

    if (milestone.id) {
      // Edit existing
      const index = mockAboutData.milestones.findIndex((m) => m.id === milestone.id);
      if (index !== -1) {
        mockAboutData.milestones[index] = {
          ...mockAboutData.milestones[index],
          year: milestone.year,
          title: milestone.title,
          description: milestone.description,
        };
      } else {
        return NextResponse.json({ error: "Milestone tidak ditemukan." }, { status: 404 });
      }
    } else {
      // Add new
      const ids = mockAboutData.milestones.map((m) => parseInt(m.id) || 0);
      const newId = ids.length > 0 ? (Math.max(...ids) + 1).toString() : "1";

      mockAboutData.milestones.push({
        id: newId,
        year: milestone.year,
        title: milestone.title,
        description: milestone.description,
      });
    }

    return NextResponse.json({ success: true, milestones: mockAboutData.milestones });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
