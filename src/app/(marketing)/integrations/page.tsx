"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Puzzle, ArrowRight, ExternalLink, HelpCircle, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

interface IntegrationItem {
  id?: string;
  name: string;
  category: "Collaboration" | "Analytics" | "CRM" | "Marketing" | "DevOps";
  logoText: string;
  logoBg: string;
  description: string;
  isPopular?: boolean;
}

const defaultIntegrations: IntegrationItem[] = [
  {
    name: "Slack",
    category: "Collaboration",
    logoText: "SL",
    logoBg: "bg-purple-600",
    description: "Kirim notifikasi real-time dan peringatan anomali data langsung ke channel tim Anda.",
    isPopular: true,
  },
  {
    name: "Salesforce",
    category: "CRM",
    logoText: "SF",
    logoBg: "bg-sky-500",
    description: "Sinkronisasikan data transaksi keuangan dan metrik interaksi pelanggan secara otomatis.",
    isPopular: true,
  },
  {
    name: "GitHub",
    category: "DevOps",
    logoText: "GH",
    logoBg: "bg-slate-900",
    description: "Hubungkan repositori kode untuk melacak kecepatan deployment dan siklus rilis visual.",
    isPopular: true,
  },
  {
    name: "HubSpot",
    category: "CRM",
    logoText: "HS",
    logoBg: "bg-orange-500",
    description: "Kelola leads pemasaran dan pipeline penjualan Anda tanpa hambatan sinkronisasi data.",
    isPopular: true,
  },
  {
    name: "Mailchimp",
    category: "Marketing",
    logoText: "MC",
    logoBg: "bg-yellow-500",
    description: "Ekspor daftar pelanggan dan kelola kampanye email blast otomatis berdasarkan aktivitas user.",
  },
  {
    name: "Discord",
    category: "Collaboration",
    logoText: "DC",
    logoBg: "bg-indigo-600",
    description: "Terima notifikasi webhook instan dan integrasikan bot monitoring untuk tim internal.",
  },
  {
    name: "Jira Software",
    category: "Collaboration",
    logoText: "JR",
    logoBg: "bg-blue-500",
    description: "Sambungkan feedback visual dari workspace ke papan tugas backlog developer secara langsung.",
  },
  {
    name: "Google Workspace",
    category: "Collaboration",
    logoText: "GW",
    logoBg: "bg-red-500",
    description: "Sinkronisasikan kalender, email, dan kelola otentikasi login pengguna dengan Google SSO.",
  },
  {
    name: "Tableau",
    category: "Analytics",
    logoText: "TB",
    logoBg: "bg-blue-400",
    description: "Impor visualisasi grafik analitik yang kaya untuk pelaporan statistik dewan direksi.",
  }
];

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(defaultIntegrations);

  useEffect(() => {
    fetch("/api/admin/integrations")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.integrations) {
          setIntegrations(resData.integrations);
        }
      })
      .catch((err) => console.error("Error loading integrations data", err));
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(integrations.map((item) => item.category)));
    return ["All", ...uniqueCats];
  }, [integrations]);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [integrations, searchQuery, selectedCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-slate-100 py-16 lg:py-24" aria-label="Integrations Hero">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />

        <div className="container-brand relative z-10 max-w-4xl text-center">
          <span className="badge badge-purple mb-4 inline-flex items-center gap-1.5">
            <Puzzle size={13} /> Ekosistem Integrasi
          </span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Hubungkan Brandy dengan <span className="text-gradient">Seluruh Alat Kerja Anda</span>
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Brandy berintegrasi secara mulus dengan platform kolaborasi, analitik, CRM, dan DevOps terkemuka 
            untuk menyederhanakan pemindahan data tanpa coding manual.
          </p>

          {/* Search Bar & Filters wrapper */}
          <div className="max-w-xl mx-auto space-y-6">
            {/* Search Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-blue-mid transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari alat integrasi (Slack, GitHub, HubSpot...)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:bg-white transition-all shadow-sm"
                aria-label="Cari integrasi"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-600 transition-all border ${
                    selectedCategory === cat
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {cat === "All" ? "Semua Alat" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTEGRATIONS GRID SECTION (Contained) ── */}
      <section className="py-20" aria-label="Konektor Integrasi">
        <div className="container-brand max-w-5xl">
          {filteredIntegrations.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 max-w-xl mx-auto">
              <p className="text-slate-500 font-500 mb-2">Integrasi tidak ditemukan.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs text-brand-blue-mid font-600 hover:underline"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((item) => (
                <div 
                  key={item.name}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-brand-blue-mid/45 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {item.isPopular && (
                    <span className="absolute top-4 right-4 bg-blue-50 text-brand-blue-mid text-[9px] font-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Populer
                    </span>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-lg ${item.logoBg} flex items-center justify-center text-sm font-bold text-white shadow-inner shrink-0`}>
                        {item.logoText}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {item.name}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-600 uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-700 text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Check size={11} className="text-green-500" /> Tersedia
                    </span>
                    <Link
                      href="/contact"
                      className="text-xs font-600 text-slate-600 hover:text-brand-blue-mid flex items-center gap-1 transition-colors"
                    >
                      Hubungkan <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CUSTOM INTEGRATIONS REQUEST (Bento-like Dark Callout) ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-100" aria-label="Custom Integrations Callout">
        <div className="container-brand max-w-4xl bg-slate-950 text-white rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-lg">
          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-brand-blue-mid/20 blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="badge badge-amber mb-2 inline-block">Enterprise Only</span>
              <h2 className="text-heading-xl text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Butuh Konektor Kustom untuk Sistem Internal Anda?
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                Tim software engineer kami dapat menuliskan API wrapper dan webhook kustom untuk menyambungkan Brandy 
                dengan database internal, private cloud server, atau software legacy (kuno) milik perusahaan Anda.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <ButtonLink href="/contact" variant="amber" size="md" className="gap-1.5 w-full lg:w-auto justify-center">
                Minta Integrasi Kustom <ExternalLink size={14} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
