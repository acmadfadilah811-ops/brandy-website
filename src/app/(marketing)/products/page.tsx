"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Users, 
  BarChart3, 
  Database, 
  CreditCard, 
  FileText,
  ArrowRight,
  Filter,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

// Products Mock Data
const products = [
  {
    name: "Brandy Workspace",
    slug: "workspace",
    tagline: "Kolaborasi tim modern dalam satu ruang kerja digital terpadu.",
    description: "Satukan chat, tugas, dokumen, dan jadwal tim Anda dalam satu dasbor responsif. Mengurangi kebutuhan rapat koordinasi hingga 40% dan mempercepat peluncuran proyek.",
    icon: Users,
    category: "Collaboration",
    badge: "Populer",
    color: "border-blue-500 text-blue-600 bg-blue-50",
  },
  {
    name: "Brandy CRM",
    slug: "crm",
    tagline: "Optimalkan relasi pelanggan & percepat siklus penjualan.",
    description: "Kelola kontak, rekam histori komunikasi otomatis, lacak pipeline penjualan, dan kirim proposal pembayaran secara langsung. Membantu tim sales menutup lebih banyak transaksi.",
    icon: Briefcase,
    category: "Sales",
    badge: "Terlaris",
    color: "border-amber-500 text-amber-600 bg-amber-50",
  },
  {
    name: "Brandy Analytics",
    slug: "analytics",
    tagline: "Visualisasikan performa bisnis Anda secara real-time.",
    description: "Hubungkan berbagai sumber data bisnis Anda ke satu platform analitik cerdas. Ambil keputusan berbasis data dengan bantuan prediksi AI dan report otomatis.",
    icon: BarChart3,
    category: "Data",
    badge: "AI Powered",
    color: "border-teal-500 text-teal-600 bg-teal-50",
  },
  {
    name: "Brandy Devops",
    slug: "devops",
    tagline: "Automasi CI/CD & monitor performa server serverless.",
    description: "Sistem automasi pengujian, kompilasi, dan deployment kode ke cloud. Dapatkan laporan error instan, grafik load server, dan optimalisasi biaya cloud computing.",
    icon: Database,
    category: "Infrastructure",
    badge: "Developer Tool",
    color: "border-purple-500 text-purple-600 bg-purple-50",
  },
  {
    name: "Brandy Pay",
    slug: "pay",
    tagline: "Kelola invoice, billing, & gerbang pembayaran digital.",
    description: "Rancang pricing page, tagih pelanggan dengan subscription billing otomatis, dan terima transfer virtual account atau kartu kredit secara mudah.",
    icon: CreditCard,
    category: "Sales",
    badge: "Keuangan",
    color: "border-emerald-500 text-emerald-600 bg-emerald-50",
  },
  {
    name: "Brandy Docs",
    slug: "docs",
    tagline: "Dokumentasi tim & knowledge base kolaboratif.",
    description: "Buat panduan operasional (SOP), wiki internal, atau catatan teknis bersama dengan rich text editor instan. Dilengkapi dengan pencarian berbasis semantik.",
    icon: FileText,
    category: "Collaboration",
    badge: "Gratis",
    color: "border-slate-500 text-slate-600 bg-slate-50",
  },
];

const categories = ["All", "Collaboration", "Sales", "Data", "Infrastructure"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
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
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
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

      {/* Main listing section */}
      <section className="py-16" aria-label="Daftar Produk">
        <div className="container-brand max-w-6xl">
          
          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-500">
              <Filter size={16} />
              Filter Kategori:
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-600 border transition-all",
                    selectedCategory === cat
                      ? "bg-brand-blue-mid text-white border-brand-blue-mid shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  )}
                >
                  {cat === "All" ? "Semua Produk" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const IconComponent = p.icon;
              return (
                <div
                  key={p.slug}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-blue-mid/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={cn(
                        "w-12 h-12 rounded-xl border flex items-center justify-center shrink-0",
                        p.color.split(" ").slice(0, 2).join(" ")
                      )}>
                        <IconComponent size={24} strokeWidth={1.5} />
                      </div>
                      
                      <span className={cn(
                        "text-[10px] font-700 uppercase tracking-wider px-2.5 py-0.5 rounded-full",
                        p.color.split(" ")[2],
                        p.color.split(" ")[1]
                      )}>
                        {p.badge}
                      </span>
                    </div>

                    <h3 
                      className="text-lg font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {p.name}
                    </h3>
                    
                    <p className="text-xs font-500 text-brand-blue-mid mb-3 leading-snug">
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
              <p className="text-slate-500 text-sm">Tidak ada produk ditemukan untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Try Brandy Banner (Dark Section) */}
      <section className="py-20" style={{ background: "var(--slate-950)", color: "white" }} aria-label="Coba Brandy Banner">
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
          <p className="text-body-md text-slate-300 max-w-xl mx-auto leading-relaxed">
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
