import { z } from "zod";

export const integrationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nama integrasi minimal 2 karakter"),
  category: z.enum(["Collaboration", "Analytics", "CRM", "Marketing", "DevOps"]),
  logoText: z.string().min(1, "Logo inisial wajib diisi").max(3, "Logo inisial maksimal 3 karakter"),
  logoBg: z.string().min(1, "Background CSS class wajib diisi"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
  isPopular: z.boolean().optional(),
});
