import React from "react";
import { 
  CheckCircle, 
  Activity, 
  Database, 
  Cpu, 
  Network, 
  ServerCrash,
  Sparkles
} from "lucide-react";

interface ServiceStatus {
  name: string;
  uptime: string;
  status: "operational" | "degraded" | "outage";
  desc: string;
  icon: any;
}

export default function StatusPage() {
  const services: ServiceStatus[] = [
    {
      name: "Brandy Core API",
      uptime: "99.99%",
      status: "operational",
      desc: "Menangani otorisasi sesi, routing data, dan transaksi API pelanggan.",
      icon: Cpu
    },
    {
      name: "Brandy Database Services",
      uptime: "99.97%",
      status: "operational",
      desc: "Layanan database utama relasional Supabase di regional Asia Pasifik.",
      icon: Database
    },
    {
      name: "Brandy CDN & Asset Delivery",
      uptime: "100.00%",
      status: "operational",
      desc: "Pengiriman gambar, stylesheet global, dan JavaScript bundling via edge nodes.",
      icon: Network
    },
    {
      name: "Admin CMS Portal",
      uptime: "99.98%",
      status: "operational",
      desc: "Antarmuka manajemen data internal dan editor konten untuk tim pengelola.",
      icon: Activity
    }
  ];

  // Helper arrays for drawing simulated 30-day uptime bars (green segments)
  const barSegments = Array.from({ length: 30 }, (_, i) => {
    // Make 1 or 2 bars slightly amber for visual flavor (e.g. at index 8)
    if (i === 8) return "amber";
    return "green";
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      
      {/* ── TOP BANNER STATUS ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-250 px-4 py-2 rounded-full text-success-green font-700 text-xs shadow-sm">
          <CheckCircle size={16} className="animate-pulse" />
          <span>Semua Sistem Beroperasi Normal</span>
        </div>
        
        <h1 
          className="text-heading-2xl font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Status Operasional Brandy
        </h1>
        <p className="text-body-lg text-slate-600 max-w-xl mx-auto">
          Pemantauan real-time ketersediaan sistem dan reliabilitas layanan cloud Brandy di seluruh regional.
        </p>
      </section>

      {/* ── SYSTEM SERVICES GRID ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 mt-16 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div key={srv.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-blue-mid">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{srv.name}</h3>
                      <p className="text-[9px] text-slate-400 font-600">{srv.uptime} Uptime</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-700 uppercase tracking-widest bg-emerald-50 text-success-green border border-emerald-200 px-2 py-0.5 rounded-full">
                    Operational
                  </span>
                </div>

                <p className="text-[11px] text-slate-550 leading-relaxed">
                  {srv.desc}
                </p>

                {/* Simulated Uptime Bar (30-day historical) */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[8px] text-slate-400 font-600">
                    <span>30 Hari Lalu</span>
                    <span>Uptime 100%</span>
                    <span>Hari Ini</span>
                  </div>
                  <div className="flex gap-0.5 h-6">
                    {barSegments.map((type, idx) => (
                      <div 
                        key={idx}
                        className={`flex-1 rounded-sm transition-all duration-300 hover:scale-y-110 cursor-pointer ${
                          type === "amber" 
                            ? "bg-amber/70 hover:bg-amber" 
                            : "bg-teal/70 hover:bg-teal"
                        }`}
                        title={type === "amber" ? "Hari 22: Gangguan Kecil (98.2% Uptime)" : `Hari ${idx + 1}: Operational (100% Uptime)`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── INCIDENT HISTORY ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-705 uppercase tracking-widest text-slate-800 border-b border-slate-100 pb-2">
            Riwayat Insiden Sistem
          </h2>
          
          <div className="py-6 text-center space-y-2">
            <ServerCrash className="mx-auto text-slate-300" size={32} />
            <p className="text-xs font-700 text-slate-805">Tidak ada insiden yang dilaporkan</p>
            <p className="text-[10px] text-slate-400">Seluruh modul dan kluster database beroperasi optimal dalam 30 hari terakhir.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
