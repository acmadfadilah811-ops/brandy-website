import { z } from "zod";

export const jobOpeningSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Judul pekerjaan minimal 2 karakter"),
  department: z.string().min(2, "Divisi/Departemen minimal 2 karakter"),
  location: z.string().min(2, "Lokasi minimal 2 karakter"),
  type: z.string().min(1, "Tipe pekerjaan wajib diisi"),
  experience: z.string().min(1, "Kualifikasi pengalaman wajib diisi"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  status: z.enum(["Active", "Draft"]),
});
