import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aboutSchema } from "@/lib/validations/about";
import { mockAboutData } from "@/lib/mockAbout";

// GET /api/admin/about - Fetch Vision, Mission, Values, Milestones, and Leaders (Public)
export async function GET() {
  try {
    // Return standard mock data
    return NextResponse.json({ success: true, about: mockAboutData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/about - Update Vision, Mission, and Core Values (Admin Protected)
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

    // Validate using Zod
    const validation = aboutSchema.safeParse(body);
    if (!validation.success) {
      const errorMap = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validasi gagal.", details: errorMap },
        { status: 400 }
      );
    }

    const { mission, vision, values } = validation.data;

    // Save/update mock in-memory
    mockAboutData.mission = mission;
    mockAboutData.vision = vision;
    mockAboutData.values = values;

    return NextResponse.json({
      success: true,
      message: "Visi, Misi, dan Core Values berhasil diperbarui.",
      about: mockAboutData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
