import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";
import { sanityClient } from "@/lib/sanity/client";
import { globalSettingsSchema } from "@/lib/validations/settings";
import { mockSettings } from "@/lib/mockSettings";

// GET /api/admin/settings - Get current site configurations (Public)
export async function GET() {
  try {
    if (isSanityWriteConfigured()) {
      const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
      if (settings) {
        return NextResponse.json({ success: true, settings });
      }
    }

    return NextResponse.json({ success: true, settings: mockSettings });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/settings - Update site configurations
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

    // Validate using Zod schema
    const validation = globalSettingsSchema.safeParse(body);
    if (!validation.success) {
      const errorMap = validation.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validasi gagal.", details: errorMap },
        { status: 400 }
      );
    }

    const data = validation.data;

    if (isSanityWriteConfigured()) {
      // Find existing settings document
      const doc = await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
      
      if (doc) {
        const result = await sanityWriteClient
          .patch(doc._id)
          .set({
            companyName: data.companyName,
            tagline: data.tagline,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            officeAddress: data.officeAddress,
            socialLinkedIn: data.socialLinkedIn,
            socialTwitter: data.socialTwitter,
            socialInstagram: data.socialInstagram,
            mapsEmbedUrl: data.mapsEmbedUrl,
            logoDarkUrl: data.logoDarkUrl,
            logoLightUrl: data.logoLightUrl,
          })
          .commit();

        return NextResponse.json({
          success: true,
          message: "Pengaturan global berhasil diperbarui di Sanity CMS.",
          settings: result,
        });
      } else {
        const result = await sanityWriteClient.create({
          _type: "siteSettings",
          companyName: data.companyName,
          tagline: data.tagline,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          officeAddress: data.officeAddress,
          socialLinkedIn: data.socialLinkedIn,
          socialTwitter: data.socialTwitter,
          socialInstagram: data.socialInstagram,
          mapsEmbedUrl: data.mapsEmbedUrl,
          logoDarkUrl: data.logoDarkUrl,
          logoLightUrl: data.logoLightUrl,
        });

        return NextResponse.json({
          success: true,
          message: "Pengaturan global berhasil dibuat di Sanity CMS.",
          settings: result,
        });
      }
    } else {
      // Fallback update mock in-memory
      Object.assign(mockSettings, data);

      return NextResponse.json({
        success: true,
        message: "Mode Demo: Pengaturan global berhasil disimpan ke memori lokal.",
        settings: mockSettings,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server.", details: error.message },
      { status: 500 }
    );
  }
}
