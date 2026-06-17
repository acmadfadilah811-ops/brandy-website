import { z } from "zod";

export const globalSettingsSchema = z.object({
  companyName: z
    .string({ message: "Nama perusahaan wajib diisi" })
    .min(3, "Nama perusahaan minimal 3 karakter")
    .max(50, "Nama perusahaan maksimal 50 karakter"),
  tagline: z
    .string({ message: "Tagline wajib diisi" })
    .min(5, "Tagline minimal 5 karakter")
    .max(100, "Tagline maksimal 100 karakter"),
  contactEmail: z
    .string({ message: "Email wajib diisi" })
    .email("Format email kontak tidak valid"),
  contactPhone: z
    .string({ message: "Nomor WhatsApp wajib diisi" })
    .min(10, "Nomor WhatsApp minimal 10 digit")
    .max(16, "Nomor WhatsApp maksimal 16 digit"),
  officeAddress: z
    .string({ message: "Alamat kantor wajib diisi" })
    .min(10, "Alamat kantor minimal 10 karakter")
    .max(250, "Alamat kantor maksimal 250 karakter"),
  socialLinkedIn: z
    .string()
    .url("Format URL LinkedIn tidak valid")
    .or(z.literal("")),
  socialTwitter: z
    .string()
    .url("Format URL Twitter tidak valid")
    .or(z.literal("")),
  socialInstagram: z
    .string()
    .url("Format URL Instagram tidak valid")
    .or(z.literal("")),
  mapsEmbedUrl: z
    .string()
    .url("Format URL Embed Google Maps tidak valid")
    .or(z.literal("")),
});

export type GlobalSettingsInput = z.infer<typeof globalSettingsSchema>;
