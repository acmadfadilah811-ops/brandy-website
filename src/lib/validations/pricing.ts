import { z } from "zod";

export const pricingFeatureSchema = z.object({
  name: z.string().min(1, "Nama fitur tidak boleh kosong"),
  included: z.boolean(),
});

export const pricingPlanSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nama paket minimal 2 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
  monthlyPrice: z.number().nonnegative("Harga bulanan tidak boleh negatif"),
  yearlyPrice: z.number().nonnegative("Harga tahunan tidak boleh negatif"),
  currency: z.string().min(1, "Mata uang wajib diisi"),
  ctaText: z.string().min(2, "Teks CTA minimal 2 karakter"),
  ctaHref: z.string().min(1, "Link CTA wajib diisi"),
  popular: z.boolean(),
  dark: z.boolean(),
  features: z.array(pricingFeatureSchema),
});

export const pricingFAQSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  answer: z.string().min(5, "Jawaban minimal 5 karakter"),
});
