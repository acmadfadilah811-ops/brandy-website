import { z } from "zod";

export const blogPostSchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(5, "Judul minimal terdiri dari 5 karakter")
    .max(120, "Judul maksimal terdiri dari 120 karakter"),
  slug: z
    .string({ message: "Slug wajib diisi" })
    .min(3, "Slug minimal terdiri dari 3 karakter")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Format slug tidak valid (hanya huruf kecil, angka, dan tanda hubung)"),
  category: z.enum(["Tutorial", "Insight", "Studi Kasus", "News"], {
    message: "Kategori tidak valid",
  }),
  excerpt: z
    .string({ message: "Kutipan (excerpt) wajib diisi" })
    .min(10, "Kutipan minimal terdiri dari 10 karakter")
    .max(300, "Kutipan maksimal terdiri dari 300 karakter"),
  readTime: z
    .string()
    .default("5 min read"),
  publishedAt: z
    .string()
    .default(() => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    }),
  tags: z
    .array(z.string().min(1, "Tag tidak boleh kosong"))
    .min(1, "Minimal pilih 1 tag"),
  bodyText: z
    .string({ message: "Konten artikel wajib diisi" })
    .min(20, "Konten artikel terlalu pendek"),
  seoTitle: z
    .string()
    .max(70, "Judul SEO maksimal 70 karakter")
    .optional()
    .or(z.literal("")),
  seoDesc: z
    .string()
    .max(160, "Deskripsi SEO maksimal 160 karakter")
    .optional()
    .or(z.literal("")),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
