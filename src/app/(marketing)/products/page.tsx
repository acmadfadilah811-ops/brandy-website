import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllProducts } from "@/lib/sanity/products";
import { getIconComponent } from "@/lib/mockProducts";
import ProductFilters from "./ProductFilters";
import { ButtonLink } from "@/components/ui/Button";

export const revalidate = 60; // Caching: ISR revalidate every 60s (PRD Bagian 4)

export const metadata = {
  title: "Produk Ekosistem Brandy — Solusi SaaS Enterprise",
  description: "Jelajahi rangkaian perangkat lunak SaaS terintegrasi kami yang dirancang untuk meningkatkan kolaborasi tim, produktivitas kerja, dan skalabilitas bisnis Anda.",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category = "All" } = await searchParams;
  const categories = ["All", "Collaboration", "Sales", "Data", "Infrastructure"];

  // Fetch all products (Sanity CMS with local mock fallback)
  const products = await getAllProducts();

  // Filter products on the server
  const filteredProducts = category === "All"
    ? products
    : products.filter(p => p.category === category);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── 1. HERO HEADER (PRD Bagian 11 & 12) ── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 text-center" aria-label="Hero Products">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10 max-w-3xl">
          <span className="badge badge-blue mb-4 inline-flex">Produk Brandy</span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight animate-fade-in"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Satu Ekosistem untuk <span className="text-gradient">Seluruh Operasional Bisnis</span>
          </h1>
          <p className="text-body-md text-slate-600 max-w-2xl mx-auto">
            Jelajahi rangkaian perangkat lunak SaaS terintegrasi kami yang dirancang 
            untuk meningkatkan kolaborasi tim, produktivitas kerja, dan skalabilitas bisnis Anda.
          </p>
        </div>
      </section>

      {/* ── 2. MAIN PRODUCT LISTING SECTION ── */}
      <section className="py-16" aria-label="Daftar Produk">
        <div className="container-brand max-w-6xl">
          
          {/* Category Filter Controls client component */}
          <ProductFilters 
            categories={categories}
            selectedCategory={category}
          />

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const IconComponent = getIconComponent(p.iconName);
              const colorClasses = p.color || "text-blue-600 bg-blue-50 border-blue-200";
              const borderAndColor = colorClasses.split(" ");
              
              return (
                <div
                  key={p.slug}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-blue-mid/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon and Badge Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${borderAndColor[0]} ${borderAndColor[1]} ${borderAndColor[2] || ""}`}>
                        <IconComponent size={24} strokeWidth={1.5} />
                      </div>
                      
                      {p.badge && (
                        <span className={`text-[10px] font-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full ${borderAndColor[1]} ${borderAndColor[0]}`}>
                          {p.badge}
                        </span>
                      )}
                    </div>

                    <h3 
                      className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-blue-mid transition-colors"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {p.name}
                    </h3>
                    
                    <p className="text-xs font-550 text-brand-blue-mid mb-3 leading-snug">
                      {p.tagline}
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-[10px] text-slate-400 font-500">Kategori: {p.category}</span>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-xs font-600 text-brand-blue-mid hover:text-brand-blue-deep flex items-center gap-1 group/link transition-colors"
                    >
                      Detail Produk <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-slate-500 text-xs">Tidak ada produk ditemukan untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CALL TO ACTION CONTAINER (Dark Section) ── */}
      <section className="py-20 bg-slate-950 text-white" aria-label="Coba Brandy Banner">
        <div className="container-brand max-w-4xl text-center space-y-6">
          <div className="inline-flex w-12 h-12 rounded-full bg-amber/15 text-amber items-center justify-center mb-2 mx-auto">
            <Sparkles size={20} />
          </div>
          <h2 
            className="text-heading-xl text-white tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Siap Meningkatkan Efisiensi Bisnis Anda?
          </h2>
          <p className="text-body-md text-slate-350 max-w-xl mx-auto leading-relaxed">
            Dapatkan akses penuh ke seluruh ekosistem produk Brandy secara gratis selama 14 hari. 
            Tanpa perlu komitmen atau pendaftaran kartu kredit.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/demo" variant="amber" size="lg">
              Mulai Uji Coba Gratis
            </ButtonLink>
            <ButtonLink href="/pricing" variant="outline-white" size="lg">
              Lihat Detail Paket Harga
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
