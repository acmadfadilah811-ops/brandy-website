import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({ message: "Nama produk wajib diisi" })
    .min(3, "Nama produk minimal 3 karakter")
    .max(50, "Nama produk maksimal 50 karakter"),
  slug: z
    .string({ message: "Slug wajib diisi" })
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Format slug tidak valid (hanya huruf kecil, angka, dan tanda hubung)"),
  tagline: z
    .string({ message: "Tagline wajib diisi" })
    .min(10, "Tagline minimal 10 karakter")
    .max(150, "Tagline maksimal 150 karakter"),
  description: z
    .string({ message: "Deskripsi wajib diisi" })
    .min(20, "Deskripsi minimal 20 karakter")
    .max(600, "Deskripsi maksimal 600 karakter"),
  iconName: z
    .string({ message: "Ikon wajib diisi" })
    .default("Package"),
  category: z.enum(["Collaboration", "Sales", "Data", "Infrastructure"], {
    message: "Kategori tidak valid",
  }),
  badge: z
    .string()
    .optional()
    .or(z.literal("")),
  color: z
    .string()
    .default("text-blue-600 bg-blue-50 border-blue-200"),
  roiTitle: z
    .string({ message: "Judul ROI wajib diisi" })
    .min(5, "Judul ROI terlalu pendek"),
  roiDesc: z
    .string({ message: "Deskripsi ROI wajib diisi" })
    .min(10, "Deskripsi ROI terlalu pendek"),
  roiMetric: z
    .string({ message: "Metrik ROI wajib diisi" })
    .min(1, "Metrik ROI tidak boleh kosong"),
  videoUrl: z
    .string()
    .url("Format URL video demo tidak valid")
    .default("https://www.youtube.com/embed/dQw4w9WgXcQ"),
  features: z
    .array(
      z.object({
        iconName: z.string().default("Zap"),
        title: z.string().min(2, "Judul fitur minimal 2 karakter"),
        desc: z.string().min(5, "Deskripsi fitur terlalu pendek"),
      })
    )
    .min(1, "Minimal tentukan 1 fitur unggulan"),
  integrations: z
    .array(z.string())
    .default([]),
  specs: z
    .array(
      z.object({
        label: z.string().min(2, "Label spesifikasi minimal 2 karakter"),
        value: z.string().min(1, "Nilai spesifikasi tidak boleh kosong"),
      })
    )
    .default([]),
});

export type ProductInput = z.infer<typeof productSchema>;
