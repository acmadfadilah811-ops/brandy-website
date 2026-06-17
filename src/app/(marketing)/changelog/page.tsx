import React from "react";
import { 
  GitCommit, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  updates: {
    type: "feature" | "improvement" | "fix";
    text: string;
  }[];
}

export default function ChangelogPage() {
  const logs: ChangelogEntry[] = [
    {
      version: "v2.0.0",
      date: "17 Juni 2026",
      title: "Pembaruan Besar: Integrasi Admin CMS & Peningkatan Keamanan Sesi",
      description: "Meluncurkan arsitektur core v2 yang memungkinkan pengelolaan penuh seluruh modul konten dari panel admin terpadu tanpa perlu menyentuh file kode.",
      updates: [
        { type: "feature", text: "Dashboard Admin CMS mandiri di rute /admin/dashboard terproteksi Supabase Auth." },
        { type: "feature", text: "Integrasi database dinamis & rendering Server-Side untuk halaman Produk dan Blog." },
        { type: "improvement", text: "Validasi data terpusat menggunakan Zod schemas di seluruh forms API." },
        { type: "fix", text: "Memperbaiki masalah type validator Next.js pada dynamic routes dengan spaces di directory name." }
      ]
    },
    {
      version: "v1.4.0",
      date: "24 Mei 2026",
      title: "Penyempurnaan Modul Karir & Seleksi Paket Harga",
      description: "Fokus pada optimalisasi konversi pengunjung pada landing page rekrutmen serta kemudahan perbandingan skema langganan.",
      updates: [
        { type: "feature", text: "Modal aplikasi CV terintegrasi di halaman Karir dengan validasi tipe berkas PDF/Docx." },
        { type: "improvement", text: "Implementasi selector toggle bulanan/tahunan interaktif pada tabel pricing." },
        { type: "fix", text: "Memperbaiki delay pemuatan visual di perangkat Android lawas saat transisi FAQ." }
      ]
    },
    {
      version: "v1.3.0",
      date: "05 April 2026",
      title: "Optimasi Cache Sisi Server & Keamanan HTTP",
      description: "Penerapan header perlindungan data client serta peningkatan performa visual di atas 90 poin Lighthouse.",
      updates: [
        { type: "improvement", text: "Konfigurasi header Content-Security-Policy (CSP) dan HSTS di next.config.ts." },
        { type: "improvement", text: "Dynamic generation untuk sitemap.xml dan robots.txt guna optimalisasi SEO Google." },
        { type: "fix", text: "Memperbaiki kebocoran data sesi pada redirect auth gate Supabase Middleware." }
      ]
    }
  ];

  const getBadgeClass = (type: "feature" | "improvement" | "fix") => {
    switch (type) {
      case "feature":
        return "badge-blue";
      case "improvement":
        return "badge-purple";
      case "fix":
        return "badge-green";
    }
  };

  const getBadgeLabel = (type: "feature" | "improvement" | "fix") => {
    switch (type) {
      case "feature":
        return "Fitur Baru";
      case "improvement":
        return "Peningkatan";
      case "fix":
        return "Perbaikan";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
        <span className="badge badge-blue">Catatan Rilis</span>
        <h1 
          className="text-heading-2xl font-bold text-slate-900 tracking-tight max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Riwayat Pembaruan Platform
        </h1>
        <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
          Ikuti perkembangan platform SaaS Brandy. Kami merilis pembaruan, optimalisasi performa, dan fitur baru secara berkala demi kenyamanan operasional Anda.
        </p>
      </section>

      {/* ── TIMELINE LOG ENTRIES ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-16 relative">
        {/* Center line decoration */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />

        <div className="space-y-16">
          {logs.map((log, index) => (
            <div 
              key={log.version} 
              className={`flex flex-col md:flex-row items-stretch gap-8 relative ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Center Point Icon */}
              <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-white border-2 border-brand-blue-mid flex items-center justify-center -translate-x-1/2 z-10 shadow-sm hidden md:flex">
                <GitCommit size={14} className="text-brand-blue-mid" />
              </div>

              {/* Date Box (Col 1) */}
              <div className="w-full md:w-1/2 flex md:justify-end md:text-right pr-0 md:pr-8 pl-12 md:pl-0">
                <div className="space-y-1 pt-1.5">
                  <div className="inline-flex items-center gap-1.5 bg-brand-blue-tint text-brand-blue-mid border border-brand-blue-light/30 px-3 py-1 rounded-full text-xs font-800">
                    {log.version}
                  </div>
                  <p className="text-[10px] text-slate-400 font-600 uppercase tracking-widest">{log.date}</p>
                </div>
              </div>

              {/* Details Box (Col 2) */}
              <div className="w-full md:w-1/2 pl-12 md:pl-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {log.title}
                  </h3>
                  <p className="text-[11px] text-slate-550 leading-relaxed">
                    {log.description}
                  </p>

                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    {log.updates.map((update, uIdx) => (
                      <div key={uIdx} className="flex items-start gap-3">
                        <span className={`badge ${getBadgeClass(update.type)} shrink-0 mt-0.5 text-[8px] px-2 py-0.5`}>
                          {getBadgeLabel(update.type)}
                        </span>
                        <span className="text-[11px] text-slate-600 leading-normal">
                          {update.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
