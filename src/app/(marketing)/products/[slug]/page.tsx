"use client";

import { use, useState } from "react";
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
  Tv
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

// Details Mock Database for products
const productsData: Record<string, {
  name: string;
  tagline: string;
  category: string;
  icon: any;
  color: string;
  description: string;
  roiTitle: string;
  roiDesc: string;
  roiMetric: string;
  videoUrl: string;
  features: { icon: any; title: string; desc: string }[];
  integrations: string[];
  specs: { label: string; value: string }[];
}> = {
  workspace: {
    name: "Brandy Workspace",
    tagline: "Kolaborasi tim modern dalam satu ruang kerja digital terpadu.",
    category: "Collaboration",
    icon: Users,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    description: "Satukan chat, tugas, dokumen, dan jadwal tim Anda dalam satu dasbor responsif. Brandy Workspace dirancang untuk menghilangkan miskomunikasi, meminimalkan rapat status harian, dan memastikan setiap anggota tim selalu sinkron secara real-time.",
    roiTitle: "Peningkatan Produktivitas Terukur",
    roiDesc: "Tim yang beralih ke Brandy Workspace melaporkan penurunan 40% waktu rapat koordinasi dan peningkatan 35% kecepatan penyelesaian proyek.",
    roiMetric: "35%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    features: [
      { icon: Users, title: "Manajemen Tugas Terpadu", desc: "Buat, delegasikan, dan lacak tugas dengan kanban board interaktif." },
      { icon: Zap, title: "Chat Saluran Kontekstual", desc: "Hubungkan diskusi langsung di dalam file proyek atau dokumen terkait." },
      { icon: Globe, title: "Kalender Bersama", desc: "Jadwalkan rapat dan sinkronkan agenda kerja tim secara visual." },
    ],
    integrations: ["Slack", "Google Drive", "Zoom", "GitHub", "Figma"],
    specs: [
      { label: "Platform", value: "Browser-Based, Desktop App (Windows/Mac/Linux), Mobile Web" },
      { label: "Batas Lampiran", value: "Hingga 500MB per berkas (Paket Growth)" },
      { label: "Enkripsi", value: "AES-256 tingkat militer untuk semua dokumen" },
    ],
  },
  crm: {
    name: "Brandy CRM",
    tagline: "Optimalkan relasi pelanggan & percepat siklus penjualan.",
    category: "Sales",
    icon: Briefcase,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    description: "Kelola kontak, rekam histori komunikasi otomatis, lacak pipeline penjualan, dan kirim proposal pembayaran secara langsung. Brandy CRM memberi visualisasi pipeline yang bersih sehingga tim sales Anda bisa fokus menutup kesepakatan.",
    roiTitle: "Pertumbuhan Penjualan yang Nyata",
    roiDesc: "Pengguna kami melaporkan peningkatan konversi leads sebesar 28% dalam 3 bulan pertama berkat visualisasi deal pipeline yang otomatis.",
    roiMetric: "28%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { icon: Briefcase, title: "Deal Pipeline visual", desc: "Seret dan letakkan kartu prospek sepanjang tahapan deal Anda." },
      { icon: Users, title: "Profil Kontak 360 Derajat", desc: "Lihat semua riwayat interaksi, email, dan catatan pelanggan di satu tempat." },
      { icon: CreditCard, title: "Invoice Terintegrasi", desc: "Kirim tagihan pembayaran digital langsung dari log kesepakatan." },
    ],
    integrations: ["WhatsApp Business API", "Gmail", "HubSpot", "Xendit", "Mailchimp"],
    specs: [
      { label: "Kapasitas Kontak", value: "Hingga 50.000 kontak (Paket Growth)" },
      { label: "Sync Email", value: "IMAP/SMTP dua arah otomatis" },
      { label: "Ekspor Data", value: "Format CSV dan Excel kapan saja" },
    ],
  },
  analytics: {
    name: "Brandy Analytics",
    tagline: "Visualisasikan performa bisnis Anda secara real-time.",
    category: "Data",
    icon: BarChart3,
    color: "text-teal-600 bg-teal-50 border-teal-200",
    description: "Hubungkan berbagai sumber data bisnis Anda ke satu platform analitik cerdas. Ambil keputusan berbasis data dengan bantuan prediksi kecerdasan buatan (AI) yang disederhanakan tanpa rumit.",
    roiTitle: "Keputusan Berbasis Data Lebih Cepat",
    roiDesc: "Mengurangi waktu yang dibutuhkan untuk membuat laporan mingguan departemen dari 4 jam menjadi hanya 5 menit secara otomatis.",
    roiMetric: "98%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { icon: BarChart3, title: "Dasbor Kustom Drag & Drop", desc: "Buat visualisasi grafik dan matriks yang paling relevan bagi tim Anda." },
      { icon: Zap, title: "AI Predictive Insights", desc: "Identifikasi tren penjualan dan peringatan anomali pengeluaran otomatis." },
      { icon: Database, title: "Konektor Data Cepat", desc: "Hubungkan database SQL, Google Sheets, atau API analytics lainnya." },
    ],
    integrations: ["PostgreSQL", "Google BigQuery", "Mixpanel", "Salesforce", "Stripe"],
    specs: [
      { label: "Pembaruan Data", value: "Real-time / Instant Sync (interval 5 menit)" },
      { label: "Batas Baris Data", value: "Hingga 10 Juta baris per dasbor" },
      { label: "Keamanan Sertifikasi", value: "Kepatuhan SOC2 Type II" },
    ],
  },
  devops: {
    name: "Brandy Devops",
    tagline: "Automasi CI/CD & monitor performa server serverless.",
    category: "Infrastructure",
    icon: Database,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    description: "Sistem automasi pengujian, kompilasi, dan deployment kode ke cloud. Dapatkan laporan error instan, grafik load server, dan optimalisasi biaya cloud computing secara proaktif.",
    roiTitle: "Stabilitas Aplikasi Maksimal",
    roiDesc: "Mempercepat proses rilis kode (deployment) hingga 10x lipat sembari menurunkan tingkat kegagalan deploy di produksi sebesar 75%.",
    roiMetric: "10x",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { icon: Database, title: "CI/CD Pipeline Cepat", desc: "Kompilasi dan jalankan pengujian aplikasi secara paralel di cloud tercepat." },
      { icon: Shield, title: "Pemantau Error Proaktif", desc: "Kirim peringatan instan ke Slack ketika mendeteksi error runtime di produksi." },
      { icon: Zap, title: "Optimalisasi Biaya Cloud", desc: "Rekomendasi otomatis untuk mematikan server idle dan menghemat anggaran." },
    ],
    integrations: ["GitHub", "GitLab", "AWS", "Vercel", "Slack"],
    specs: [
      { label: "Waktu Bangun Bebas", value: "2.500 menit build-time gratis per bulan" },
      { label: "Sistem Operasi", value: "Ubuntu Linux, macOS, dan Windows containers" },
      { label: "Keandalan", value: "Jaminan SLA runner hingga 99.95% uptime" },
    ],
  },
  pay: {
    name: "Brandy Pay",
    tagline: "Kelola invoice, billing, & gerbang pembayaran digital.",
    category: "Sales",
    icon: CreditCard,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    description: "Rancang pricing page, tagih pelanggan dengan subscription billing otomatis, dan terima transfer virtual account atau kartu kredit secara mudah dan aman di Indonesia.",
    roiTitle: "Aliran Kas Lebih Lancar",
    roiDesc: "Mempercepat waktu pembayaran invoice rata-rata dari 14 hari menjadi kurang dari 48 jam berkat link bayar otomatis.",
    roiMetric: "48h",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { icon: CreditCard, title: "Link Pembayaran Instan", desc: "Buat link bayar unik dan bagikan langsung lewat WhatsApp atau Email." },
      { icon: Zap, title: "Penagihan Langganan (Subscription)", desc: "Debet otomatis mingguan, bulanan, atau tahunan untuk bisnis keanggotaan." },
      { icon: Shield, title: "Deteksi Fraud Cerdas", desc: "Saring transaksi kartu kredit mencurigakan sebelum diproses perbankan." },
    ],
    integrations: ["Midtrans", "Xendit", "Stripe", "BCA Virtual Account", "GoPay"],
    specs: [
      { label: "Biaya Transaksi", value: "Mulai dari 1.5% per transaksi sukses (VA Flat Rp4.000)" },
      { label: "Sertifikasi Keamanan", value: "PCI-DSS Level 1 compliant" },
      { label: "Mata Uang Didukung", value: "IDR, USD, SGD, MYR" },
    ],
  },
  docs: {
    name: "Brandy Docs",
    tagline: "Dokumentasi tim & knowledge base kolaboratif.",
    category: "Collaboration",
    icon: FileText,
    color: "text-slate-600 bg-slate-50 border-slate-200",
    description: "Buat panduan operasional (SOP), wiki internal, atau catatan teknis bersama dengan rich text editor instan. Membantu mentransfer ilmu pengetahuan tim secara terstruktur.",
    roiTitle: "Onboarding Karyawan Lebih Cepat",
    roiDesc: "Memotong waktu pelatihan onboarding karyawan baru hingga 50% karena panduan kerja terdokumentasi rapi dan mudah dicari.",
    roiMetric: "50%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { icon: FileText, title: "Rich Text Editor Instan", desc: "Tulis dengan format Markdown, sematkan gambar, tabel, dan kode pemrograman." },
      { icon: Users, title: "Kolaborasi Multi-penulis", desc: "Tulis bersama tim secara real-time dengan melacak riwayat revisi berkas." },
      { icon: Zap, title: "Semantic Search AI", desc: "Cari informasi di ribuan dokumen dengan pertanyaan bahasa alami biasa." },
    ],
    integrations: ["Slack", "Notion (Import)", "Confluence (Import)", "Jira", "GitHub"],
    specs: [
      { label: "Format Berkas", value: "Ekspor PDF, Markdown, HTML, JSON" },
      { label: "Struktur Dokumen", value: "Pohon folder bersarang tak terbatas (Nested tree)" },
      { label: "Pembatasan Hak Akses", value: "Read-only, Editor, Admin per folder/file" },
    ],
  },
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = productsData[slug];

  if (!product) {
    notFound();
  }

  const IconComponent = product.icon;

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
              <h2 className="text-heading-xl text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                Mengapa Memilih {product.name}?
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed">
                {product.roiDesc} Perangkat lunak kami dioptimalkan secara mendalam untuk kecepatan render, 
                stabilitas operasional, serta pemenuhan standar regulasi keamanan data terkini di Indonesia.
              </p>
              <div className="space-y-3 pt-2">
                {["Dukungan migrasi data gratis dari platform lama Anda", "Pelatihan khusus onboarding tim internal", "Keamanan enkripsi bersertifikat SOC2"].map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal/15 text-teal flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-sm text-slate-700 font-500">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DETAILED FEATURES LIST ─────────────────────────────── */}
      <section className="py-20 bg-white border-t border-b border-slate-100" aria-label="Detail Fitur">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-16">
            <span className="badge badge-purple mb-4 inline-flex">Fitur Unggulan</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Dirancang dengan Presisi Teknis
            </h2>
            <p className="text-body-md text-slate-500 max-w-md mx-auto">
              Fitur lengkap yang membantu mempermudah pengoperasian sistem dan kolaborasi harian tim Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.features.map((feat, idx) => {
              const FeatIcon = feat.icon;
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

      {/* ── 5. INTEGRATIONS & SYSTEM SPECS ──────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100" aria-label="Integrasi & Spesifikasi Teknis">
        <div className="container-brand max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Integrations Supported */}
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-700 uppercase tracking-widest text-brand-blue-mid">Konektivitas</span>
                <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Terintegrasi dengan Tools Populer Anda
                </h2>
                <p className="text-body-md text-slate-600 leading-relaxed">
                  {product.name} mendukung sinkronisasi data dua arah otomatis dengan berbagai 
                  tools operasional harian yang sudah tim Anda gunakan saat ini.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {product.integrations.map((int, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-600 text-slate-700 shadow-sm"
                  >
                    {int}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                Spesifikasi & Detail Teknis
              </h3>
              
              <div className="divide-y divide-slate-200">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="py-3.5 flex justify-between gap-4 text-xs">
                    <span className="font-600 text-slate-500 w-1/3">{spec.label}</span>
                    <span className="text-slate-800 text-right w-2/3 font-500">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. BOTTOM CTA BANNER ───────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--slate-950)", color: "white" }} aria-label="bottom cta">
        <div className="container-brand max-w-4xl text-center space-y-6">
          <h2 className="text-heading-xl text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Mulai Transformasi Digital Tim Anda Hari Ini
          </h2>
          <p className="text-body-md text-slate-300 max-w-xl mx-auto leading-relaxed">
            Dapatkan pengalaman kolaborasi, kecepatan, dan produktivitas terbaik dengan {product.name}. 
            Trial gratis selama 14 hari penuh.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/demo" variant="amber" size="lg">
              Mulai Trial Gratis 14 Hari
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-white" size="lg">
              Hubungi Tim Sales
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
