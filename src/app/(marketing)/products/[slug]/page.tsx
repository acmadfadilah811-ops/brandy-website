import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Users, 
  Briefcase, 
  BarChart3, 
  Database, 
  CreditCard, 
  FileText,
  Check, 
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Tv,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { getProductBySlug } from "@/lib/sanity/products";
import { getIconComponent } from "@/lib/mockProducts";

export const revalidate = 60; // Caching: ISR revalidate every 60s (PRD Bagian 4)

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ── SEO & METADATA GENERATOR ─────────────────────────────────────────
export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
    };
  }

  return {
    title: `${product.name} — Brandy SaaS Solutions`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const IconComponent = getIconComponent(product.iconName);
  const colorClasses = product.color || "text-blue-600 bg-blue-50 border-blue-200";
  const borderAndColor = colorClasses.split(" ");

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── 1. PRODUCT DETAIL HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 lg:py-24" aria-label="Hero Product Detail">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />

        <div className="container-brand relative z-10 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left: Info */}
            <div className="lg:w-3/5 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <span className="badge badge-blue">{product.category}</span>
                <span className="text-xs text-slate-400 font-500">Produk Resmi Brandy</span>
              </div>
              
              <h1 
                className="text-heading-2xl text-slate-900 tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {product.name}
              </h1>
              
              <p className="text-body-lg text-brand-blue-mid font-600 leading-snug">
                {product.tagline}
              </p>

              <p className="text-body-md text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <ButtonLink href="/demo" variant="primary" size="lg">
                  Coba Gratis 14 Hari
                </ButtonLink>
                <ButtonLink href="/pricing" variant="secondary" size="lg">
                  Lihat Harga Paket
                </ButtonLink>
              </div>
            </div>

            {/* Right: Icon Preview */}
            <div className="lg:w-2/5 flex justify-center">
              <div className={cn(
                "w-48 h-48 rounded-3xl border-2 flex items-center justify-center shadow-lg animate-float",
                product.color
              )}>
                <IconComponent size={96} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ROI / BUSINESS BENEFITS (Asymmetric 50/50) ────────────────── */}
      <section className="py-20 bg-slate-50" aria-label="Manfaat Bisnis">
        <div className="container-brand max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Metric Block */}
            <div className="bg-slate-950 text-white rounded-2xl p-10 text-center relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-light/10 rounded-full blur-2xl" aria-hidden="true" />
              <div 
                className="text-7xl font-extrabold text-amber mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {product.roiMetric}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{product.roiTitle}</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Hasil rata-rata yang dilaporkan oleh pelanggan kami setelah migrasi sistem ke Brandy.
              </p>
            </div>

            {/* Description Block */}
            <div className="space-y-6">
              <span className="text-xs font-700 uppercase tracking-widest text-brand-blue-mid">Dampak Bisnis</span>
              <h2 className="text-heading-xl text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {product.roiTitle}
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed">
                {product.roiDesc}
              </p>
              
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-xs text-slate-700 font-500">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                    <Check size={12} />
                  </span>
                  Integrasi instan dengan alur kerja yang sudah ada.
                </li>
                <li className="flex items-center gap-3 text-xs text-slate-700 font-500">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                    <Check size={12} />
                  </span>
                  Visualisasi metrik performa secara real-time.
                </li>
                <li className="flex items-center gap-3 text-xs text-slate-700 font-500">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                    <Check size={12} />
                  </span>
                  Dukungan pelanggan prioritas 24/7 SLA korporat.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURE HIGHLIGHTS (Bento Grid) ───────────────────────── */}
      <section className="py-20 bg-white" aria-label="Fitur Utama">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-16">
            <span className="badge badge-blue mb-4 inline-flex">Fitur Unggulan</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Kemampuan Inti {product.name}
            </h2>
            <p className="text-body-md text-slate-500 max-w-md mx-auto">
              Fitur lengkap yang membantu mempermudah pengoperasian sistem dan kolaborasi harian tim Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.features.map((feat, idx) => {
              const FeatIcon = getIconComponent(feat.iconName);
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-brand-blue-mid/45 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-blue-mid mb-4 shadow-sm">
                    <FeatIcon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. EMBEDDED DEMO VIDEO CONTAINER ────────────────────────── */}
      <section className="py-20 bg-slate-50" aria-label="Demo Video">
        <div className="container-brand max-w-4xl text-center">
          <div className="mb-10">
            <span className="badge badge-amber mb-4 inline-flex">Video Demo</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Saksikan Demo Singkat {product.name}
            </h2>
            <p className="text-body-md text-slate-500 max-w-md mx-auto">
              Lihat sekilas antarmuka pengguna (UI) dan cara termudah mengoperasikan fitur-fitur utamanya.
            </p>
          </div>

          <div className="relative border border-slate-200 rounded-2xl overflow-hidden aspect-video bg-slate-950 shadow-md">
            <iframe
              src={product.videoUrl}
              title={`Demo video ${product.name}`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* ── 5. SPECIFICATIONS & INTEGRATIONS (2-Column Grid) ─────────── */}
      <section className="py-20 bg-white" aria-label="Integrasi dan Spesifikasi Teknis">
        <div className="container-brand max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Integrations */}
            <div className="space-y-6">
              <h3 
                className="text-heading-lg text-slate-900 border-b border-slate-100 pb-4" 
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ekosistem Integrasi API
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Brandy dirancang untuk berkolaborasi dengan tumpukan teknologi Anda. Hubungkan produk ini dengan aplikasi luar secara instan dengan satu klik setup:
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {product.integrations.map((intName) => (
                  <span 
                    key={intName}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-650 px-3.5 py-1.5 rounded-lg shadow-sm hover:border-slate-350 transition-colors"
                  >
                    {intName}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Technical Specs */}
            <div className="space-y-6">
              <h3 
                className="text-heading-lg text-slate-900 border-b border-slate-100 pb-4" 
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Spesifikasi Teknis
              </h3>
              
              <div className="divide-y divide-slate-100">
                {product.specs.map((spec, index) => (
                  <div key={index} className="py-3 flex items-start justify-between text-xs gap-6">
                    <span className="text-slate-400 font-550 shrink-0">{spec.label}</span>
                    <span className="text-slate-800 font-600 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. FLOATING CONTEXT BAR (Bottom CTA) ─────────────────────── */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800" aria-label="CTA Footer">
        <div className="container-brand max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Dapatkan Akses Penuh ke {product.name}
            </h3>
            <p className="text-xs text-slate-400">
              Evaluasi kinerja sistem dan integrasi tim Anda secara langsung selama 14 hari penuh.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <ButtonLink href="/demo" variant="amber" size="md">
              Hubungi Sales
            </ButtonLink>
            <Link 
              href="/products"
              className="text-xs text-white hover:text-amber font-600 transition-colors inline-flex items-center gap-1 group"
            >
              Lihat Produk Lain <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
