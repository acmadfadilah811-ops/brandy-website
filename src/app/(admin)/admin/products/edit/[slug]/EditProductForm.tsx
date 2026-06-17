"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { productSchema } from "@/lib/validations/product";
import { Product } from "@/lib/mockProducts";

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [slug] = useState(product.slug); // Slug is read-only during edit
  const [tagline, setTagline] = useState(product.tagline);
  const [description, setDescription] = useState(product.description);
  const [iconName, setIconName] = useState(product.iconName || "Package");
  const [category, setCategory] = useState<any>(product.category || "Collaboration");
  const [badge, setBadge] = useState(product.badge || "");
  const [color, setColor] = useState(product.color || "text-blue-600 bg-blue-50 border-blue-200");
  
  // ROI fields
  const [roiTitle, setRoiTitle] = useState(product.roiTitle || "");
  const [roiDesc, setRoiDesc] = useState(product.roiDesc || "");
  const [roiMetric, setRoiMetric] = useState(product.roiMetric || "");
  const [videoUrl, setVideoUrl] = useState(product.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ");

  // Arrays
  const [features, setFeatures] = useState<any[]>(
    product.features && product.features.length > 0
      ? product.features
      : [{ iconName: "Zap", title: "", desc: "" }]
  );
  const [integrationsInput, setIntegrationsInput] = useState(
    product.integrations ? product.integrations.join(", ") : ""
  );
  const [specs, setSpecs] = useState<any[]>(
    product.specs && product.specs.length > 0
      ? product.specs
      : [{ label: "", value: "" }]
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const addFeature = () => {
    setFeatures([...features, { iconName: "Zap", title: "", desc: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const next = [...features];
    next[index] = { ...next[index], [field]: value };
    setFeatures(next);
  };

  const addSpec = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpec = (index: number, field: string, value: string) => {
    const next = [...specs];
    next[index] = { ...next[index], [field]: value };
    setSpecs(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);

    const integrations = integrationsInput
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const payload = {
      name,
      slug,
      tagline,
      description,
      iconName,
      category,
      badge,
      color,
      roiTitle,
      roiDesc,
      roiMetric,
      videoUrl,
      features,
      integrations,
      specs,
    };

    // Zod validation
    const validation = productSchema.safeParse(payload);
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
      const res = await fetch(`/api/admin/products/${product.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal memperbarui produk.");
      }

      alert("Produk berhasil diperbarui!");
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setGeneralError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  // Color preset options
  const colorPresets = [
    { label: "Blue / Workspace", value: "text-blue-600 bg-blue-50 border-blue-200" },
    { label: "Amber / CRM", value: "text-amber-600 bg-amber-50 border-amber-200" },
    { label: "Teal / Analytics", value: "text-teal-600 bg-teal-50 border-teal-200" },
    { label: "Purple / Devops", value: "text-purple-600 bg-purple-50 border-purple-200" },
    { label: "Emerald / Pay", value: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Slate / Docs", value: "text-slate-605 bg-slate-50 border-slate-200" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="space-y-2">
        <Link 
          href="/admin/products"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-blue-mid transition-colors font-500"
        >
          <ArrowLeft size={14} /> Kembali ke Katalog Produk
        </Link>
        <h1 
          className="text-heading-lg font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ubah Produk: {product.name}
        </h1>
        <p className="text-xs text-slate-500">
          Ubah deskripsi, spesifikasi teknis, fitur utama, dan diagram bisnis produk ini.
        </p>
      </div>

      {generalError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-error-red flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-705 uppercase tracking-widest text-slate-800 border-b border-slate-100 pb-2">
              Informasi Umum
            </h3>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                Nama Produk
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.name ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
              />
              {errors.name && <p className="text-[10px] text-error-red mt-1.5">{errors.name}</p>}
            </div>

            {/* Slug (Disabled for Edit) */}
            <div>
              <label htmlFor="slug" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                URL Slug (Tidak dapat diubah demi konsistensi link SEO)
              </label>
              <input
                id="slug"
                type="text"
                disabled
                value={slug}
                className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-lg px-4 py-2.5 text-xs cursor-not-allowed"
              />
            </div>

            {/* Tagline */}
            <div>
              <label htmlFor="tagline" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                Tagline Produk
              </label>
              <input
                id="tagline"
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.tagline ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
              />
              {errors.tagline && <p className="text-[10px] text-error-red mt-1.5">{errors.tagline}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                Deskripsi Produk Lengkap
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.description ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
              />
              {errors.description && <p className="text-[10px] text-error-red mt-1.5">{errors.description}</p>}
            </div>
          </div>

          {/* Business ROI details */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-705 uppercase tracking-widest text-slate-800 border-b border-slate-100 pb-2">
              Dampak Bisnis & Matrik ROI
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="roiMetric" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                  Metrik ROI Utama (Besar)
                </label>
                <input
                  id="roiMetric"
                  type="text"
                  required
                  value={roiMetric}
                  onChange={(e) => setRoiMetric(e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                    errors.roiMetric ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                  }`}
                />
                {errors.roiMetric && <p className="text-[10px] text-error-red mt-1.5">{errors.roiMetric}</p>}
              </div>

              <div>
                <label htmlFor="roiTitle" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                  Judul Dampak ROI
                </label>
                <input
                  id="roiTitle"
                  type="text"
                  required
                  value={roiTitle}
                  onChange={(e) => setRoiTitle(e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                    errors.roiTitle ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                  }`}
                />
                {errors.roiTitle && <p className="text-[10px] text-error-red mt-1.5">{errors.roiTitle}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="roiDesc" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                Deskripsi Dampak ROI Bisnis
              </label>
              <textarea
                id="roiDesc"
                required
                rows={3}
                value={roiDesc}
                onChange={(e) => setRoiDesc(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.roiDesc ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
              />
              {errors.roiDesc && <p className="text-[10px] text-error-red mt-1.5">{errors.roiDesc}</p>}
            </div>

            <div>
              <label htmlFor="videoUrl" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                URL Embed Video Demo YouTube (Opsional)
              </label>
              <input
                id="videoUrl"
                type="text"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                  errors.videoUrl ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                }`}
              />
              {errors.videoUrl && <p className="text-[10px] text-error-red mt-1.5">{errors.videoUrl}</p>}
            </div>
          </div>

          {/* Features Dynamic Fields */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-705 uppercase tracking-widest text-slate-800">
                Fitur Unggulan Produk
              </h3>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1.5 text-[10px] font-700 text-brand-blue-mid hover:underline"
              >
                <Plus size={12} /> Tambah Fitur
              </button>
            </div>

            {errors.features && <p className="text-xs text-error-red">{errors.features}</p>}

            <div className="space-y-4">
              {features.map((feat, index) => (
                <div key={index} className="p-4 border border-slate-100 rounded-lg bg-slate-50/50 space-y-3 relative">
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      title="Hapus Fitur"
                    >
                      <Trash size={14} />
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-600 text-slate-500 mb-1">Nama Ikon Lucide</label>
                      <input
                        type="text"
                        required
                        value={feat.iconName}
                        onChange={(e) => updateFeature(index, "iconName", e.target.value)}
                        className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-blue-mid"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-600 text-slate-500 mb-1">Judul Fitur</label>
                      <input
                        type="text"
                        required
                        value={feat.title}
                        onChange={(e) => updateFeature(index, "title", e.target.value)}
                        className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-blue-mid"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-600 text-slate-500 mb-1">Deskripsi Pendek Fitur</label>
                    <textarea
                      required
                      rows={2}
                      value={feat.desc}
                      onChange={(e) => updateFeature(index, "desc", e.target.value)}
                      className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-blue-mid"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings (Col Span 1) */}
        <div className="space-y-6">
          
          {/* Metadata Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-705 uppercase tracking-widest text-slate-450 border-b border-slate-100 pb-2">
              Kategori & Visual
            </h3>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid transition-all"
              >
                <option value="Collaboration">Collaboration</option>
                <option value="Sales">Sales</option>
                <option value="Data">Data</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            {/* Icon Name */}
            <div>
              <label htmlFor="iconName" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Ikon Utama (Lucide Name)
              </label>
              <input
                id="iconName"
                type="text"
                required
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid transition-all"
              />
            </div>

            {/* Color Presets selection */}
            <div>
              <label className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Preset Desain & Warna
              </label>
              <div className="space-y-1.5">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setColor(preset.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-[10px] font-600 transition-all ${
                      color === preset.value
                        ? "border-slate-800 bg-slate-50 font-700"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Badge Promo */}
            <div>
              <label htmlFor="badge" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Badge Promo (Opsional)
              </label>
              <input
                id="badge"
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid transition-all"
              />
            </div>
          </div>

          {/* Integrations & Specs Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-705 uppercase tracking-widest text-slate-450 border-b border-slate-100 pb-2">
              Spesifikasi & API
            </h3>

            {/* Integrations comma list */}
            <div>
              <label htmlFor="integrations" className="block text-[10px] font-600 uppercase tracking-wider text-slate-400 mb-1.5">
                Koneksi Integrasi (Pisahkan dengan koma)
              </label>
              <input
                id="integrations"
                type="text"
                value={integrationsInput}
                onChange={(e) => setIntegrationsInput(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid transition-all"
              />
            </div>

            {/* Dynamic Specs list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-600 uppercase tracking-wider text-slate-400">
                  Spesifikasi Teknis
                </label>
                <button
                  type="button"
                  onClick={addSpec}
                  className="text-[9px] font-700 text-brand-blue-mid hover:underline flex items-center gap-0.5"
                >
                  <Plus size={10} /> Tambah Spec
                </button>
              </div>

              <div className="space-y-2">
                {specs.map((sp, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      required
                      value={sp.label}
                      onChange={(e) => updateSpec(idx, "label", e.target.value)}
                      placeholder="Label"
                      className="w-1/2 border border-slate-200 rounded px-2 py-1 text-[10px] focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={sp.value}
                      onChange={(e) => updateSpec(idx, "value", e.target.value)}
                      placeholder="Value"
                      className="w-1/2 border border-slate-200 rounded px-2 py-1 text-[10px] focus:outline-none"
                    />
                    {specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpec(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
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
              Simpan Perubahan
            </Button>
            <Link href="/admin/products" className="block">
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
