"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { blogPostSchema } from "@/lib/validations/blog";

export default function NewBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Insight");
  const [excerpt, setExcerpt] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    // Simple slug generator: lowercase, replace spaces and special chars with hyphen
    const generated = val
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setSlug(generated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);

    // Process tags
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title,
      slug,
      category,
      excerpt,
      bodyText,
      tags,
      seoTitle,
      seoDesc,
    };

    // Client-side Zod validation
    const validation = blogPostSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};
      Object.keys(fieldErrors).forEach((key) => {
        const errorArr = (fieldErrors as Record<string, string[] | undefined>)[key];
        formattedErrors[key] = errorArr?.[0] || "Validasi gagal";
      });
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal menyimpan artikel.");
      }

      alert("Artikel baru berhasil diterbitkan!");
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      setGeneralError(err.message || "Terjadi kesalahan koneksi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* ── BACK & TITLE BAR ─────────────────────────────────────── */}
      <div className="space-y-2">
        <Link 
          href="/admin/blog"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-blue-mid transition-colors font-500"
        >
          <ArrowLeft size={14} /> Kembali ke Daftar Artikel
        </Link>
        <h1 
          className="text-heading-lg font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tulis Artikel Baru
        </h1>
        <p className="text-xs text-slate-500">
          Buat konten pemasaran berkualitas premium untuk mengedukasi calon pengguna SaaS Brandy.
        </p>
      </div>

      {generalError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-error-red flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* ── FORM ─────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Fields (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                Judul Artikel
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.title ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
                placeholder="cth: Mengintegrasikan AI untuk Optimalisasi Pengeluaran Bisnis"
              />
              {errors.title && <p className="text-[10px] text-error-red mt-1.5">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                URL Slug
              </label>
              <input
                id="slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.slug ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
                placeholder="mengintegrasikan-ai-untuk-optimalisasi"
              />
              {errors.slug && <p className="text-[10px] text-error-red mt-1.5">{errors.slug}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                Ringkasan Singkat (Excerpt)
              </label>
              <textarea
                id="excerpt"
                required
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.excerpt ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
                placeholder="Tulis ringkasan singkat artikel dalam 1-2 kalimat (akan ditampilkan di kartu daftar blog)..."
              />
              {errors.excerpt && <p className="text-[10px] text-error-red mt-1.5">{errors.excerpt}</p>}
            </div>

            {/* Body Content */}
            <div>
              <label htmlFor="bodyText" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                Konten Utama (Body Text)
              </label>
              <textarea
                id="bodyText"
                required
                rows={12}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all font-sans ${
                  errors.bodyText ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
                placeholder="Tulis seluruh paragraf dan gagasan artikel Anda di sini..."
              />
              {errors.bodyText && <p className="text-[10px] text-error-red mt-1.5">{errors.bodyText}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Settings (Col Span 1) */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-700 uppercase tracking-widest text-slate-450 border-b border-slate-100 pb-2">
              Kategori & Aset
            </h3>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Kategori Artikel
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all"
              >
                <option value="Insight">Insight</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Studi Kasus">Studi Kasus</option>
                <option value="News">News</option>
              </select>
            </div>

            {/* Tags input */}
            <div>
              <label htmlFor="tags" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Tags (Pisahkan dengan koma)
              </label>
              <input
                id="tags"
                type="text"
                required
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.tags ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
                placeholder="cth: AI, SaaS, Automation"
              />
              {errors.tags && <p className="text-[10px] text-error-red mt-1.5">{errors.tags}</p>}
            </div>
          </div>

          {/* SEO Meta Information */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-700 uppercase tracking-widest text-slate-450 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Sparkles size={13} className="text-brand-blue-mid" /> Optimasi SEO (Opsional)
            </h3>
            
            {/* SEO Title */}
            <div>
              <label htmlFor="seoTitle" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Judul Meta SEO
              </label>
              <input
                id="seoTitle"
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all"
                placeholder="Jika kosong, akan mengikuti judul utama"
                maxLength={70}
              />
              <p className="text-[8px] text-slate-400 text-right mt-1">{seoTitle.length}/70 karakter</p>
            </div>

            {/* SEO Desc */}
            <div>
              <label htmlFor="seoDesc" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Deskripsi Meta SEO
              </label>
              <textarea
                id="seoDesc"
                rows={3}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all"
                placeholder="Jika kosong, akan mengikuti excerpt"
                maxLength={160}
              />
              <p className="text-[8px] text-slate-400 text-right mt-1">{seoDesc.length}/160 karakter</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              loading={loading}
              icon={<Save size={16} />}
              iconPosition="left"
            >
              Terbitkan Artikel
            </Button>
            <Link href="/admin/blog" className="block">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full justify-center"
                disabled={loading}
              >
                Batalkan
              </Button>
            </Link>
          </div>
        </div>

      </form>
    </div>
  );
}
