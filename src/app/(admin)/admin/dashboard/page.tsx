"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Package, 
  Users, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  Settings,
  ShieldCheck
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  href: string;
}

function StatCard({ title, value, icon: Icon, color, href }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-600 uppercase tracking-wider text-slate-500">{title}</span>
        <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-800 text-slate-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          {value}
        </h3>
        <Link 
          href={href} 
          className="text-xs text-brand-blue-mid font-600 hover:underline inline-flex items-center gap-1"
        >
          Kelola Data <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const supabase = createClient();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.email?.split("@")[0] || "Admin");
      }
    };
    fetchUser();
  }, [supabase]);

  // Static stats for mock view before database setup
  const stats = [
    { title: "Artikel Blog", value: 4, icon: FileText, color: "text-blue-600 bg-blue-50 border border-blue-100", href: "/admin/blog" },
    { title: "Produk SaaS", value: 6, icon: Package, color: "text-emerald-600 bg-emerald-50 border border-emerald-100", href: "/admin/products" },
    { title: "Anggota Tim", value: 3, icon: Users, color: "text-purple-600 bg-purple-50 border border-purple-100", href: "/admin/team" },
    { title: "Lowongan Kerja", value: 4, icon: Briefcase, color: "text-amber-600 bg-amber-50 border border-amber-100", href: "/admin/careers" },
  ];

  return (
    <div className="space-y-8">
      {/* ── WELCOME BANNER ────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge badge-blue">Sistem Aktif</span>
            <span className="text-[10px] text-slate-400 font-500">v2.1 Stable</span>
          </div>
          <h1 
            className="text-heading-lg font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Selamat Datang, <span className="capitalize text-brand-blue-mid">{userName || "Administrator"}</span>!
          </h1>
          <p className="text-xs text-slate-500 max-w-md">
            Gunakan panel admin ini untuk mengubah teks marketing, blog, pimpinan tim, lowongan karir, dan konfigurasi data SaaS Brandy secara instan tanpa menyentuh kode.
          </p>
        </div>
        <div className="shrink-0 flex gap-3">
          <Link 
            href="/admin/settings"
            className="btn btn-secondary btn-sm inline-flex items-center gap-1.5"
          >
            <Settings size={14} /> Pengaturan Global
          </Link>
          <a 
            href="/" 
            target="_blank" 
            className="btn btn-primary btn-sm inline-flex items-center gap-1.5"
          >
            <ShieldCheck size={14} /> Kunjungi Situs
          </a>
        </div>
      </div>

      {/* ── STATS GRID ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* ── QUICK ACTIONS & RECENT WORK ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick actions list */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm lg:col-span-2 space-y-6">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            Aksi Cepat Manajemen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/admin/blog"
              className="p-4 border border-slate-200 rounded-lg hover:border-brand-blue-mid/40 hover:bg-slate-50 transition-all flex items-start gap-3"
            >
              <div className="p-2 rounded-md bg-blue-50 text-brand-blue-mid">
                <FileText size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Tulis Artikel Baru</h4>
                <p className="text-[10px] text-slate-500">Publikasikan insight atau tutorial terbaru ke blog Brandy</p>
              </div>
            </Link>
            <Link 
              href="/admin/careers"
              className="p-4 border border-slate-200 rounded-lg hover:border-brand-blue-mid/40 hover:bg-slate-50 transition-all flex items-start gap-3"
            >
              <div className="p-2 rounded-md bg-amber-50 text-amber">
                <Briefcase size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Buka Lowongan Kerja</h4>
                <p className="text-[10px] text-slate-500">Tambahkan kebutuhan divisi baru ke listing karir</p>
              </div>
            </Link>
            <Link 
              href="/admin/products"
              className="p-4 border border-slate-200 rounded-lg hover:border-brand-blue-mid/40 hover:bg-slate-50 transition-all flex items-start gap-3"
            >
              <div className="p-2 rounded-md bg-emerald-50 text-emerald">
                <Package size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Edit Fitur Produk</h4>
                <p className="text-[10px] text-slate-500">Sesuaikan metrik ROI, deskripsi, atau integrasi SaaS</p>
              </div>
            </Link>
            <Link 
              href="/admin/team"
              className="p-4 border border-slate-200 rounded-lg hover:border-brand-blue-mid/40 hover:bg-slate-50 transition-all flex items-start gap-3"
            >
              <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                <Users size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Kelola Staff / Tim</h4>
                <p className="text-[10px] text-slate-500">Ubah profil pemimpin, foto, dan posisi pimpinan</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System info status card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
              Status Sistem & VPS
            </h2>
            <div className="divide-y divide-slate-100">
              <div className="py-2.5 flex justify-between text-xs">
                <span className="text-slate-500 font-500">Uptime Server</span>
                <span className="text-slate-800 font-600 text-right flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 99.98%
                </span>
              </div>
              <div className="py-2.5 flex justify-between text-xs">
                <span className="text-slate-500 font-500">Status Database</span>
                <span className="text-slate-800 font-600 text-right text-emerald-600">Terhubung</span>
              </div>
              <div className="py-2.5 flex justify-between text-xs">
                <span className="text-slate-500 font-500">Caching Engine</span>
                <span className="text-slate-800 font-600 text-right text-brand-blue-mid">Active (ISR)</span>
              </div>
              <div className="py-2.5 flex justify-between text-xs">
                <span className="text-slate-500 font-500">IP Host VPS</span>
                <span className="text-slate-800 font-600 text-right">203.175.125.235</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[10px] text-slate-500 leading-relaxed flex items-center gap-2">
            <TrendingUp size={14} className="text-brand-blue-mid shrink-0" />
            <span>Semua metrik sistem berjalan optimal di server UFW-inactive port 3000.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
