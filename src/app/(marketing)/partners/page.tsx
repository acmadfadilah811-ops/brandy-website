"use client";

import React, { useState } from "react";
import { 
  Handshake, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award, 
  Zap, 
  Sparkles, 
  Send 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PartnersPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState("referral");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const benefits = [
    {
      icon: <Award className="text-amber" size={24} />,
      title: "Skema Revenue Share Menarik",
      desc: "Dapatkan komisi berkelanjutan hingga 25% dari setiap rujukan pelanggan yang berlangganan Brandy."
    },
    {
      icon: <Zap className="text-brand-blue-mid" size={24} />,
      title: "Integrasi API Eksklusif",
      desc: "Akses API sandbox prioritas tinggi untuk membangun konektor kustom di platform SaaS Brandy."
    },
    {
      icon: <Users className="text-teal" size={24} />,
      title: "Pelatihan & Sertifikasi",
      desc: "Dukungan pelatihan teknis berkelanjutan serta sertifikasi resmi dari tim insinyur Brandy."
    }
  ];

  const partnerTypes = [
    {
      id: "referral",
      title: "Mitra Rujukan (Referral)",
      desc: "Sesuai untuk influencer bisnis, konsultan independen, dan penasihat IT yang merekomendasikan solusi Brandy."
    },
    {
      id: "technology",
      title: "Mitra Teknologi",
      desc: "Sesuai untuk developer SaaS, platform komunikasi, dan penyedia software yang ingin berintegrasi via API."
    },
    {
      id: "agency",
      title: "Mitra Agensi & Solusi",
      desc: "Sesuai untuk agensi pemasaran digital, integrasi sistem (SI), dan konsultan transformasi digital."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
        <span className="badge badge-blue">Program Kemitraan</span>
        <h1 
          className="text-heading-2xl font-bold text-slate-900 tracking-tight max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tumbuh Bersama Brandy Ekosistem
        </h1>
        <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
          Bergabunglah dengan ratusan agensi, integrator sistem, dan developer di Indonesia yang memperluas pasar mereka melalui platform SaaS Brandy.
        </p>
      </section>

      {/* ── BENEFITS SECTION ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-xs text-slate-550 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERSHIP TYPOLOGIES ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24">
        <div className="bg-slate-950 text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Decorative Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          <div className="relative z-10 space-y-8">
            <div className="max-w-xl">
              <span className="badge badge-amber">Model Kemitraan</span>
              <h2 className="text-heading-xl font-bold tracking-tight mt-3 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Pilih Jalur Kemitraan Anda
              </h2>
              <p className="text-xs text-slate-400">
                Kami menyediakan fleksibilitas penuh bagi setiap jenis mitra untuk mengoptimalkan potensi pertumbuhan bisnis mereka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partnerTypes.map((type) => (
                <div key={type.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-brand-blue-mid transition-colors">
                  <div>
                    <h3 className="text-xs font-bold text-white mb-2">{type.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{type.desc}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setPartnerType(type.id);
                      const el = document.getElementById("partner-form");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[10px] font-700 text-brand-blue-light hover:underline flex items-center gap-1.5"
                  >
                    Daftar Sekarang <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP REGISTRATION FORM ───────────────────────── */}
      <section id="partner-form" className="max-w-3xl mx-auto px-6 mt-24">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
          <div className="text-center space-y-2">
            <Handshake className="mx-auto text-brand-blue-mid" size={32} />
            <h2 className="text-heading-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
              Daftar Program Kemitraan
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Lengkapi formulir di bawah ini. Tim Partnership Brandy akan menghubungi Anda dalam 2x24 jam kerja.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 animate-fade-in">
              <CheckCircle className="text-success-green mx-auto" size={36} />
              <h3 className="text-sm font-bold text-slate-900">Pendaftaran Terkirim!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Terima kasih atas minat Anda. Kami telah menerima permohonan kemitraan Anda dan akan segera memprosesnya.
              </p>
              <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                Kirim Pendaftaran Lain
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-600 uppercase tracking-wider text-slate-500 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20"
                    placeholder="cth: Budi Santoso"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-[10px] font-600 uppercase tracking-wider text-slate-500 mb-1.5">
                    Nama Perusahaan / Agensi
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20"
                    placeholder="cth: PT Solusi Digital"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] font-600 uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Bisnis Resmi
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20"
                  placeholder="budi@solusidigital.com"
                />
              </div>

              <div>
                <label htmlFor="partnerType" className="block text-[10px] font-600 uppercase tracking-wider text-slate-500 mb-1.5">
                  Tipe Kemitraan yang Diinginkan
                </label>
                <select
                  id="partnerType"
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-brand-blue-mid"
                >
                  <option value="referral">Mitra Rujukan (Referral) - Komisi 25%</option>
                  <option value="technology">Mitra Teknologi - Integrasi API</option>
                  <option value="agency">Mitra Agensi & Solusi - Layanan Lengkap</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-600 uppercase tracking-wider text-slate-500 mb-1.5">
                  Ceritakan Singkat Rencana Kolaborasi Anda
                </label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20"
                  placeholder="Tuliskan tujuan kemitraan, portofolio singkat, atau target pelanggan yang ingin disasar..."
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  loading={loading}
                  icon={<Send size={16} />}
                  iconPosition="left"
                >
                  Kirim Permohonan Mitra
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
