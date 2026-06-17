import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jobOpeningSchema } from "@/lib/validations/careers";
import { mockCareersData } from "@/lib/mockCareers";

// GET /api/admin/careers - Fetch all job listings (Public)
export async function GET() {
  try {
    return NextResponse.json({ success: true, careers: mockCareersData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/careers - Add or Edit a job listing (Admin Protected)
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

    const validation = jobOpeningSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const job = validation.data;

    if (job.id) {
      // Edit existing
      const index = mockCareersData.findIndex((j) => j.id === job.id);
      if (index !== -1) {
        mockCareersData[index] = {
          ...mockCareersData[index],
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type,
          experience: job.experience,
          description: job.description,
          status: job.status,
        };
      } else {
        return NextResponse.json({ error: "Posisi pekerjaan tidak ditemukan." }, { status: 404 });
      }
    } else {
      // Add new
      const ids = mockCareersData.map((j) => parseInt(j.id.replace("job_", "")) || 0);
      const newId = ids.length > 0 ? `job_${Math.max(...ids) + 1}` : "job_1";

      mockCareersData.push({
        id: newId,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        description: job.description,
        status: job.status,
      });
    }

    return NextResponse.json({ success: true, careers: mockCareersData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
