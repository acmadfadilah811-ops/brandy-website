"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, ArrowRight, Quote, ExternalLink, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

interface CaseStudy {
  clientName: string;
  industry: "Technology" | "Finance" | "Logistics" | "Retail" | "Healthcare";
  logoText: string;
  logoBg: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorPhoto: string;
  metricValue: string;
  metricLabel: string;
  storyTitle: string;
  storySummary: string;
  challenge: string;
  solution: string;
}

const caseStudies: CaseStudy[] = [
  {
    clientName: "PT Maju Jaya",
    industry: "Technology",
    logoText: "MJ",
    logoBg: "bg-blue-600",
    quote: "Menggunakan Brandy memotong waktu siklus deployment produk kami sebesar 40%. Kolaborasi antar developer dan manajer proyek menjadi sangat mulus.",
    authorName: "Hendra Wijaya",
    authorTitle: "VP of Engineering di PT Maju Jaya",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    metricValue: "40%",
    metricLabel: "Siklus Proyek Lebih Cepat",
    storyTitle: "Bagaimana PT Maju Jaya Mempercepat Deployment Produk Hingga 40%",
    storySummary: "Sebelum beralih ke Brandy, tim engineering Maju Jaya kesulitan mengonsolidasikan feedback visual dari desainer ke workflow deployment. Brandy menyederhanakan feedback cycle tersebut dalam satu workspace terpusat.",
    challenge: "Komunikasi asinkronus antara UI/UX designer di Bali dan developer team di Jakarta sering kali memicu kesalahpahaman spesifikasi desain.",
    solution: "Mengintegrasikan Brandy Workspace dengan repositori GitHub mereka, memungkinkan feedback di-annotation langsung di atas visual prototype."
  },
  {
    clientName: "Bintang Advertising",
    industry: "Retail",
    logoText: "BA",
    logoBg: "bg-amber-600",
    quote: "Brandy merevolusi cara kami memantau ketersediaan inventori bahan cetak dan melacak status pesanan klien dari hulu ke hilir.",
    authorName: "Bintang Ramadhan",
    authorTitle: "Direktur Operasional Bintang Adv",
    authorPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    metricValue: "10x",
    metricLabel: "Efisiensi Inventori",
    storyTitle: "Digitalisasi Alur Logistik Cetak Bintang Advertising",
    storySummary: "Bintang Advertising menggunakan Brandy CRM & Workspace untuk menyambungkan tim sales dengan admin gudang logistik guna mengotomatisasi order fulfillment bahan baku reklame.",
    challenge: "Pencatatan manual stok bahan vinyl yang memicu overload order pesanan saat stok sebenarnya kosong di gudang.",
    solution: "Penerapan sistem monitoring order real-time dengan integrasi push notification ke staf lapangan melalui Brandy Notify."
  },
  {
    clientName: "Karya Logistik Nusantara",
    industry: "Logistics",
    logoText: "KLN",
    logoBg: "bg-teal-600",
    quote: "Skalabilitas cloud infra yang ditawarkan Brandy menenangkan pikiran kami. Keamanan data tingkat tinggi adalah mutlak untuk pelacakan rute kargo logistik.",
    authorName: "Sarah Wijaya",
    authorTitle: "Chief Technology Officer KL Nusantara",
    authorPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    metricValue: "99.99%",
    metricLabel: "SLA Uptime Terjamin",
    storyTitle: "Menjaga Operasional Kargo 24/7 Tanpa Downtime",
    storySummary: "Sebagai tulang punggung pengiriman logistik antar-pulau, KL Nusantara mengandalkan kestabilan dashboard Brandy Analytics untuk melacak pergerakan ratusan kapal kargo secara real-time.",
    challenge: "Sistem legacy yang sering melambat (delay) saat memproses data GPS dari 500+ kapal kargo secara bersamaan.",
    solution: "Migrasi data feed ke model database terdistribusi Brandy Analytics dengan setup real-time WebSocket connection."
  },
  {
    clientName: "Fintech Prima Mandiri",
    industry: "Finance",
    logoText: "FPM",
    logoBg: "bg-indigo-600",
    quote: "Sertifikasi ISO 27001 dan compliance data ketat dari Brandy adalah alasan utama kami memindahkan seluruh pipeline komunikasi internal ke workspace ini.",
    authorName: "Ahmad Fauzi",
    authorTitle: "Head of Security Fintech Prima",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    metricValue: "100%",
    metricLabel: "Compliance & Data Secure",
    storyTitle: "Mengamankan Kolaborasi Keuangan Skala Enterprise",
    storySummary: "Fintech Prima memigrasikan 1.500 karyawan mereka ke Brandy Enterprise untuk memastikan komunikasi internal yang mematuhi standar enkripsi enkripsi AES-256.",
    challenge: "Bocornya data sensitif transaksi keuangan nasabah akibat penggunaan instant messenger personal untuk koordinasi pekerjaan.",
    solution: "Penerapan Brandy Workspace Enterprise dengan single sign-on (SSO), data retention policy kustom, dan audit log otomatis."
  }
];

export default function CustomersPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

  const industries = ["All", "Technology", "Finance", "Logistics", "Retail"];

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter(
      (study) => selectedIndustry === "All" || study.industry === selectedIndustry
    );
  }, [selectedIndustry]);

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-slate-100 py-16 lg:py-24" aria-label="Customers Hero">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />

        <div className="container-brand relative z-10 max-w-4xl text-center">
          <span className="badge badge-amber mb-4 inline-flex items-center gap-1.5">
            <ShieldCheck size={13} /> Kisah Sukses Klien
          </span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Membantu Bisnis Skala <span className="text-gradient">UMKM hingga Enterprise</span> Tumbuh
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Dengarkan langsung dari para pemimpin teknologi, direktur operasional, dan manajer proyek 
            bagaimana Brandy membantu mereka menghemat ribuan jam kerja setiap bulannya.
          </p>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-full text-xs font-600 transition-all border ${
                  selectedIndustry === ind
                    ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                {ind === "All" ? "Semua Industri" : ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED CASE STUDIES (Alternating layouts or uniform premium layout) ── */}
      <section className="py-20" aria-label="Detail Studi Kasus">
        <div className="container-brand max-w-5xl space-y-24">
          {filteredCaseStudies.map((study, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={study.clientName}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-slate-100 pb-16 last:border-b-0 last:pb-0"
              >
                {/* Visual / Metric Panel (Span 5) */}
                <div 
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="bg-slate-950 text-white rounded-2xl p-8 relative overflow-hidden shadow-lg border border-slate-800">
                    {/* Glowing mesh background */}
                    <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-brand-blue-mid/10 blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`w-10 h-10 rounded-lg ${study.logoBg} flex items-center justify-center text-sm font-bold text-white shadow-inner`}>
                        {study.logoText}
                      </span>
                      <span className="text-sm font-bold tracking-tight text-slate-200">
                        {study.clientName}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-700 uppercase tracking-widest text-slate-400 block">
                        Dampak Bisnis Utama
                      </span>
                      <div 
                        className="text-6xl font-extrabold text-amber tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {study.metricValue}
                      </div>
                      <p className="text-sm font-600 text-slate-200">
                        {study.metricLabel}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800 relative">
                      {/* Quotes Mark Decoration */}
                      <span 
                        className="absolute -top-3 -right-2 text-[90px] text-white opacity-[0.04] leading-none font-serif select-none pointer-events-none"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        “
                      </span>
                      <p className="text-xs text-slate-350 italic leading-relaxed relative z-10">
                        "{study.quote}"
                      </p>
                      
                      <div className="flex items-center gap-3 mt-4">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-800">
                          <Image
                            src={study.authorPhoto}
                            alt={study.authorName}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-700 text-slate-200 leading-tight">
                            {study.authorName}
                          </p>
                          <p className="text-[9px] text-slate-400">
                            {study.authorTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Story Panel (Span 7) */}
                <div 
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="text-xs font-700 uppercase tracking-widest text-brand-blue-mid block">
                    Studi Kasus / {study.industry}
                  </span>
                  <h2 
                    className="text-heading-xl text-slate-900 tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {study.storyTitle}
                  </h2>
                  <p className="text-body-md text-slate-600 leading-relaxed">
                    {study.storySummary}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-red-500" /> Tantangan
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <Users size={14} className="text-green-500" /> Solusi Brandy
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. TESTIMONIAL GRID (DARK THEMED CARDS - EXACT PRD2 COMPLIANCE) ── */}
      <section className="py-20" style={{ background: "var(--slate-950)", color: "white" }} aria-label="Testimonial Tambahan">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-16">
            <span className="badge badge-amber mb-4 inline-flex">Social Proof</span>
            <h2 className="text-heading-xl text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Dipercaya oleh Ribuan Profesional
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Testimoni otentik dari developer, product manager, dan eksekutif yang menggunakan Brandy setiap hari.
            </p>
          </div>

          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div 
                key={study.authorName}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Large quotes decoration behind text (PRD2: DM Serif, 120px, opacity 0.15) */}
                <span 
                  className="absolute -top-2 -left-2 text-[120px] text-white opacity-[0.06] leading-none select-none pointer-events-none font-serif"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  “
                </span>

                <div className="relative z-10">
                  <p className="text-sm text-slate-200 leading-relaxed italic mb-8 relative">
                    "{study.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800 relative z-10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700">
                    <Image
                      src={study.authorPhoto}
                      alt={study.authorName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      {study.authorName}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {study.authorTitle}
                    </p>
                  </div>
                  <span className="ml-auto text-xs font-700 text-amber">
                    Rating 5.0
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA BANNER ── */}
      <section className="py-20 bg-white border-t border-slate-100" aria-label="Ajakan Bertindak">
        <div className="container-brand max-w-4xl text-center">
          <h2 className="text-heading-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Siap Menjadi Kisah Sukses Kami Berikutnya?
          </h2>
          <p className="text-body-md text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
            Bergabunglah dengan ribuan perusahaan sukses yang telah mentransformasikan cara mereka 
            mengelola proyek dan melacak metrik pertumbuhan bersama Brandy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/demo" variant="primary" size="lg">
              Jadwalkan Demo Gratis
            </ButtonLink>
            <ButtonLink href="/pricing" variant="ghost" size="lg" className="gap-1.5">
              Lihat Paket Harga <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
