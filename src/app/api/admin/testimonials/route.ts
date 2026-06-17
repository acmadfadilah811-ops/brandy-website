import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { testimonialSchema } from "@/lib/validations/testimonials";
import { mockTestimonialsData } from "@/lib/mockTestimonials";

// GET /api/admin/testimonials - Fetch all testimonials (Public)
export async function GET() {
  try {
    return NextResponse.json({ success: true, testimonials: mockTestimonialsData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/testimonials - Add or Edit a testimonial (Admin Protected)
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

    const validation = testimonialSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const testimonial = validation.data;

    // If this testimonial is marked featured, we must make sure all others are unfeatured
    if (testimonial.featured) {
      mockTestimonialsData.forEach((t) => {
        t.featured = false;
      });
    }

    if (testimonial.id) {
      // Edit existing
      const index = mockTestimonialsData.findIndex((t) => t.id === testimonial.id);
      if (index !== -1) {
        mockTestimonialsData[index] = {
          ...mockTestimonialsData[index],
          quote: testimonial.quote,
          name: testimonial.name,
          title: testimonial.title,
          company: testimonial.company,
          initials: testimonial.initials,
          color: testimonial.color,
          featured: testimonial.featured,
          caseStudyUrl: testimonial.caseStudyUrl || undefined,
          revenueIncrease: testimonial.revenueIncrease || undefined,
        };
      } else {
        return NextResponse.json({ error: "Testimoni tidak ditemukan." }, { status: 404 });
      }
    } else {
      // Add new
      const ids = mockTestimonialsData.map((t) => parseInt(t.id.replace("t", "")) || 0);
      const newId = ids.length > 0 ? `t${Math.max(...ids) + 1}` : "t1";

      mockTestimonialsData.push({
        id: newId,
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        company: testimonial.company,
        initials: testimonial.initials,
        color: testimonial.color,
        featured: testimonial.featured,
        caseStudyUrl: testimonial.caseStudyUrl || undefined,
        revenueIncrease: testimonial.revenueIncrease || undefined,
      });
    }

    return NextResponse.json({ success: true, testimonials: mockTestimonialsData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
