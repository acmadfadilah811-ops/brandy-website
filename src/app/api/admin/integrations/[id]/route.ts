import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mockIntegrationsData } from "@/lib/mockIntegrations";

// DELETE /api/admin/integrations/[id] - Delete an integration
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
    const index = mockIntegrationsData.findIndex((i) => i.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Konektor tidak ditemukan." }, { status: 404 });
    }

    mockIntegrationsData.splice(index, 1);

    return NextResponse.json({ success: true, integrations: mockIntegrationsData });
  } catch (error: any) {
    return NextResponse.json({ error: "Terjadi kesalahan server.", details: error.message }, { status: 500 });
  }
}
