import { z } from "zod";

export const testimonialSchema = z.object({
  id: z.string().optional(),
  quote: z.string().min(10, "Kutipan testimoni minimal 10 karakter"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  title: z.string().min(2, "Jabatan minimal 2 karakter"),
  company: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
  initials: z.string().min(1, "Inisial wajib diisi").max(3, "Inisial maksimal 3 karakter"),
  color: z.string().min(1, "Warna inisial wajib diisi"),
  featured: z.boolean(),
  caseStudyUrl: z.string().optional().or(z.literal("")),
  revenueIncrease: z.string().optional().or(z.literal("")),
});
