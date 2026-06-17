import React from "react";
import { 
  Download, 
  Newspaper, 
  Image as ImageIcon, 
  Mail, 
  FileDown, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PressRelease {
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export default function PressPage() {
  const releases: PressRelease[] = [
    {
      date: "17 Juni 2026",
      title: "Brandy Meluncurkan Platform V2 dengan Peningkatan Kolaborasi dan Keamanan Canggih",
      excerpt: "Hari ini Brandy secara resmi memperkenalkan pembaruan sistem besar-besaran (V2) yang mencakup manajemen data real-time, integrasi API yang lebih kaya, serta sertifikasi kepatuhan tingkat enterprise.",
      link: "#"
    },
    {
      date: "12 Januari 2026",
      title: "Brandy Mengumumkan Kemitraan Strategis dengan Penyedia Infrastruktur Cloud Lokal",
      excerpt: "Guna mempercepat adopsi digital bagi UKM dan korporasi tanah air, Brandy berkolaborasi dengan Cloud lokal guna memastikan kedaulatan data dan latency minimum bagi seluruh pengguna.",
      link: "#"
    },
    {
      date: "08 September 2025",
      title: "Brandy Masuk dalam Daftar Top 10 SaaS Startups untuk Pasar B2B di Asia Tenggara",
      excerpt: "Analisis riset pasar regional mengidentifikasi model pertumbuhan Brandy yang solid dengan nilai retensi pelanggan (NDR) mencapai 118% berkat kualitas produk dan stabilitas uptime.",
      link: "#"
    }
  ];

  const assets = [
    {
      name: "Brandy Primary Logo Kit",
      desc: "Berisi logo utama berwarna biru dalam format PNG beresolusi tinggi, SVG, dan EPS.",
      size: "2.4 MB"
    },
    {
      name: "Brandy Icon Only Kit",
      desc: "Berisi logo simbol Brandy (tanpa teks) dalam format SVG dan PNG latar belakang transparan.",
      size: "1.1 MB"
    },
    {
      name: "Panduan Penggunaan Brand (Brand Guidelines)",
      desc: "File PDF panduan resmi penggunaan warna, tipografi, dan penataan logo Brandy.",
      size: "5.8 MB"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
        <span className="badge badge-purple">Hubungan Media</span>
        <h1 
          className="text-heading-2xl font-bold text-slate-900 tracking-tight max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Pusat Informasi & Media Kit Brandy
        </h1>
        <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
          Temukan rilis pers terbaru, unduh aset merek resmi, dan dapatkan informasi terverifikasi mengenai perkembangan platform SaaS Brandy.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* ── LEFT COLUMN: PRESS RELEASES (Col Span 2) ────────────── */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
            <Newspaper className="text-brand-blue-mid" size={20} />
            <h2 className="text-heading-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
              Siaran Pers Terbaru
            </h2>
          </div>

          <div className="space-y-6">
            {releases.map((release, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <span className="text-[10px] font-700 text-slate-400 uppercase tracking-widest">{release.date}</span>
                <h3 className="text-xs font-bold text-slate-900 hover:text-brand-blue-mid transition-colors">
                  <a href={release.link} className="flex items-center justify-between gap-2">
                    {release.title} <ArrowUpRight size={14} className="shrink-0" />
                  </a>
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed">{release.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: DOWNLOADABLE ASSETS & CONTACT ────────── */}
        <div className="space-y-8">
          {/* Media Kit Downloads */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ImageIcon className="text-brand-blue-mid" size={18} />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Unduh Aset Merek</h2>
            </div>
            
            <div className="space-y-4">
              {assets.map((asset, idx) => (
                <div key={idx} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-700 text-slate-800 leading-tight">{asset.name}</span>
                    <span className="text-[9px] font-600 bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded whitespace-nowrap">{asset.size}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">{asset.desc}</p>
                  <button className="text-[9px] font-700 text-brand-blue-mid hover:underline flex items-center gap-1 mt-1">
                    <Download size={10} /> Unduh ZIP
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Media Contact Box */}
          <div className="bg-slate-950 text-white rounded-xl p-6 shadow-sm space-y-4 relative overflow-hidden">
            <div 
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />
            <div className="relative z-10 space-y-3">
              <Mail className="text-amber" size={24} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Hubungi Humas Kami</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Apakah Anda jurnalis atau analis industri yang ingin mewawancarai tim eksekutif Brandy? Silakan hubungi divisi Media Relations kami.
              </p>
              <div className="pt-2">
                <a 
                  href="mailto:press@brandy.id" 
                  className="inline-flex items-center gap-2 text-xs font-600 text-brand-blue-light hover:underline"
                >
                  press@brandy.id <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
