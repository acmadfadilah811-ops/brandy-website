import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { teamMemberSchema } from "@/lib/validations/about";
import { mockAboutData } from "@/lib/mockAbout";

// POST /api/admin/about/team - Add or Edit a team member
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

    const validation = teamMemberSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const member = validation.data;

    if (member.id) {
      // Edit existing
      const index = mockAboutData.leaders.findIndex((l) => l.id === member.id);
      if (index !== -1) {
        mockAboutData.leaders[index] = {
          ...mockAboutData.leaders[index],
          name: member.name,
          role: member.role,
          image: member.image,
          bio: member.bio,
          linkedin: member.linkedin,
        };
      } else {
        return NextResponse.json({ error: "Anggota tim tidak ditemukan." }, { status: 404 });
      }
    } else {
      // Add new
      const ids = mockAboutData.leaders.map((l) => parseInt(l.id) || 0);
      const newId = ids.length > 0 ? (Math.max(...ids) + 1).toString() : "1";
      
      mockAboutData.leaders.push({
        id: newId,
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio,
        linkedin: member.linkedin,
      });
    }

    return NextResponse.json({ success: true, leaders: mockAboutData.leaders });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
