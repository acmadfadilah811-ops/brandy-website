import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { integrationSchema } from "@/lib/validations/integrations";
import { mockIntegrationsData } from "@/lib/mockIntegrations";

// GET /api/admin/integrations - Fetch all integrations (Public)
export async function GET() {
  try {
    return NextResponse.json({ success: true, integrations: mockIntegrationsData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/integrations - Add or Edit an integration connector (Admin Protected)
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

    const validation = integrationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validasi gagal.", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const integration = validation.data;

    if (integration.id) {
      // Edit existing
      const index = mockIntegrationsData.findIndex((i) => i.id === integration.id);
      if (index !== -1) {
        mockIntegrationsData[index] = {
          ...mockIntegrationsData[index],
          name: integration.name,
          category: integration.category,
          logoText: integration.logoText,
          logoBg: integration.logoBg,
          description: integration.description,
          isPopular: integration.isPopular,
        };
      } else {
        return NextResponse.json({ error: "Konektor tidak ditemukan." }, { status: 404 });
      }
    } else {
      // Add new
      const ids = mockIntegrationsData.map((i) => parseInt(i.id.replace("int_", "")) || 0);
      const newId = ids.length > 0 ? `int_${Math.max(...ids) + 1}` : "int_1";

      mockIntegrationsData.push({
        id: newId,
        name: integration.name,
        category: integration.category,
        logoText: integration.logoText,
        logoBg: integration.logoBg,
        description: integration.description,
        isPopular: integration.isPopular,
      });
    }

    return NextResponse.json({ success: true, integrations: mockIntegrationsData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
