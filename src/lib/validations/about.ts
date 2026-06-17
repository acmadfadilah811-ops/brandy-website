import { z } from "zod";

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  role: z.string().min(2, "Jabatan minimal 2 karakter"),
  image: z.string().min(1, "Foto profil wajib diisi"),
  bio: z.string().min(5, "Bio minimal 5 karakter"),
  linkedin: z.string().url("URL LinkedIn tidak valid").or(z.literal("")),
});

export const milestoneSchema = z.object({
  id: z.string().optional(),
  year: z.string().regex(/^\d{4}$/, "Tahun harus berupa 4 digit angka"),
  title: z.string().min(2, "Judul minimal 2 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

export const coreValueSchema = z.object({
  key: z.string().length(1, "Key harus berupa 1 huruf (B-R-A-N-D-Y)"),
  title: z.string().min(2, "Judul minimal 2 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

export const aboutSchema = z.object({
  mission: z.string().min(5, "Misi minimal 5 karakter"),
  vision: z.string().min(5, "Visi minimal 5 karakter"),
  values: z.array(coreValueSchema),
});
