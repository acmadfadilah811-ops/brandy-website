"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Check, Minus, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

// Pricing data default
const defaultPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Solusi esensial untuk tim kecil dan startup.",
    monthlyPrice: 19,
    yearlyPrice: 15,
    currency: "USD",
    ctaText: "Mulai Trial Gratis",
    ctaHref: "/demo?plan=starter",
    popular: false,
    dark: false,
    features: [
      { name: "Hingga 5 anggota tim", included: true },
      { name: "Penyimpanan cloud 10 GB", included: true },
      { name: "Dashboard analitik dasar", included: true },
      { name: "Integrasi standar (5 tools)", included: true },
      { name: "Dukungan email 24/5", included: true },
      { name: "Single Sign-On (SSO)", included: false },
      { name: "SLA Uptime & Custom Contract", included: false },
      { name: "Dedicated Account Manager", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Fitur lengkap untuk produktivitas tim yang berkembang.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    currency: "USD",
    ctaText: "Coba Gratis 14 Hari",
    ctaHref: "/demo?plan=growth",
    popular: true,
    dark: false,
    features: [
      { name: "Hingga 25 anggota tim", included: true },
      { name: "Penyimpanan cloud 100 GB", included: true },
      { name: "Dashboard analitik real-time", included: true },
      { name: "Integrasi tak terbatas (50+ tools)", included: true },
      { name: "Dukungan Prioritas 24/7", included: true },
      { name: "Single Sign-On (SSO) & SAML", included: true },
      { name: "SLA Uptime & Custom Contract", included: false },
      { name: "Dedicated Account Manager", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Keamanan, kontrol, dan dukungan tingkat korporasi.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    currency: "USD",
    ctaText: "Hubungi Sales",
    ctaHref: "/contact?inquiry=enterprise",
    popular: false,
    dark: true,
    features: [
      { name: "Anggota tim tak terbatas", included: true },
      { name: "Penyimpanan cloud unlimited", included: true },
      { name: "Analitik kustom & eksport data", included: true },
      { name: "Akses API & webhook kustom", included: true },
      { name: "Dukungan Telepon & Manager Khusus", included: true },
      { name: "Keamanan tingkat militer & Audit Logs", included: true },
      { name: "99.99% Uptime SLA bergaransi", included: true },
      { name: "Dedicated Account Manager", included: true },
    ],
  },
];

const defaultFAQs = [
  {
    id: "faq_1",
    question: "Apakah saya bisa membatalkan langganan kapan saja?",
    answer: "Ya, Anda dapat membatalkan langganan Anda kapan saja melalui dashboard akun Anda. Jika Anda membatalkan, akses Anda akan tetap aktif hingga akhir periode penagihan berjalan.",
  },
  {
    id: "faq_2",
    question: "Bagaimana cara kerja trial gratis 14 hari?",
    answer: "Anda mendapatkan akses penuh ke semua fitur paket Growth selama 14 hari tanpa dipungut biaya. Kami tidak meminta kartu kredit untuk pendaftaran trial. Setelah 14 hari, Anda dapat memilih untuk berlangganan atau akun Anda akan otomatis diturunkan ke paket basic gratis.",
  },
  {
    id: "faq_3",
    question: "Apakah ada biaya tersembunyi?",
    answer: "Tidak ada biaya tersembunyi sama sekali. Harga yang Anda lihat di atas adalah biaya bersih. PPN 11% akan ditambahkan sesuai dengan regulasi perpajakan yang berlaku di Indonesia.",
  },
  {
    id: "faq_4",
    question: "Apakah tersedia harga diskon untuk organisasi non-profit?",
    answer: "Ya! Kami menawarkan diskon khusus sebesar 30% untuk institusi pendidikan, organisasi nirlaba (NGO), dan startup tahap awal. Silakan hubungi tim sales kami untuk proses verifikasi dokumen.",
  },
  {
    id: "faq_5",
    question: "Metode pembayaran apa saja yang didukung?",
    answer: "Kami menerima berbagai metode pembayaran termasuk Kartu Kredit (Visa, MasterCard), Transfer Bank (Virtual Account Mandiri, BCA, BNI, BRI), serta dompet digital populer (GoPay, OVO, Dana).",
  },
];

const comparisonFeatures = [
  {
    category: "Kolaborasi & Pengguna",
    items: [
      { name: "Anggota Tim Maksimal", starter: "5 user", growth: "25 user", enterprise: "Unlimited" },
      { name: "Penyimpanan Bersama", starter: "10 GB", growth: "100 GB", enterprise: "Unlimited" },
      { name: "Kolaborasi Real-Time", starter: true, growth: true, enterprise: true },
      { name: "Multi-workspace", starter: false, growth: true, enterprise: true },
    ],
  },
  {
    category: "Analitik & Laporan",
    items: [
      { name: "Histori Data", starter: "30 Hari", growth: "1 Tahun", enterprise: "Selamanya" },
      { name: "Dashboard Kustom", starter: false, growth: true, enterprise: true },
      { name: "Eksport Laporan (PDF/CSV)", starter: false, growth: true, enterprise: true },
      { name: "Audit Log & Kepatuhan", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    category: "Keamanan & Dukungan",
    items: [
      { name: "Dukungan Pelanggan", starter: "Email 24/5", growth: "Prioritas 24/7", enterprise: "Dukungan Telepon + Dedicated Manager" },
      { name: "SSO & SAML Integration", starter: false, growth: true, enterprise: true },
      { name: "Enkripsi Data (At Rest & In Transit)", starter: true, growth: true, enterprise: true },
      { name: "Garansi Uptime SLA", starter: false, growth: "99.9%", enterprise: "99.99% (Tertulis)" },
    ],
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [data, setData] = useState({
    plans: defaultPlans,
    faqs: defaultFAQs,
  });

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.pricing) {
          setData(resData.pricing);
        }
      })
      .catch((err) => console.error("Error loading pricing page data", err));
  }, []);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "1-10",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── 1. HERO HEADER ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 lg:py-24" aria-label="Hero Pricing">
        {/* Decorative Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />
        
        <div className="container-brand relative z-10 text-center max-w-3xl">
          <span className="badge badge-blue mb-4 inline-flex">
            Pricing Plans
          </span>
          <h1 
            className="text-heading-2xl mb-6 tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Satu Platform, <span className="text-gradient">Harga Transparan</span>
          </h1>
          <p className="text-body-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Mulai dengan trial gratis 14 hari. Pilih paket terbaik untuk meningkatkan 
            efisiensi operasional dan kolaborasi tim Anda. Tanpa komitmen jangka panjang.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center justify-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-600 transition-all",
                billingCycle === "monthly" 
                  ? "bg-white text-slate-950 shadow-sm" 
                  : "text-slate-500 hover:text-slate-950"
              )}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-600 transition-all flex items-center gap-1.5",
                billingCycle === "yearly" 
                  ? "bg-white text-slate-950 shadow-sm" 
                  : "text-slate-500 hover:text-slate-950"
              )}
            >
              Tahunan
              <span className="bg-amber/15 text-amber text-[10px] font-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Hemat 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. PRICING CARDS ──────────────────────────────────────── */}
      <section className="section-padding py-16" aria-label="Daftar Paket Harga">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {data.plans.map((plan) => {
              const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
              
              return (
                <div
                  key={plan.name}
                  className={cn(
                    "rounded-2xl p-8 flex flex-col justify-between transition-all duration-350 relative",
                    plan.dark 
                      ? "bg-slate-950 text-white border-none shadow-xl" 
                      : "bg-white text-slate-950 border border-slate-200 shadow-sm",
                    plan.popular && "ring-2 ring-brand-blue-mid md:scale-[1.03] md:-translate-y-2"
                  )}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <span 
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue-mid text-white text-[11px] font-700 uppercase tracking-widest px-4 py-1 rounded-full shadow-md"
                    >
                      Paling Populer
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <h3 
                        className={cn(
                          "text-xl font-bold mb-2",
                          plan.dark ? "text-white" : "text-slate-900"
                        )}
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {plan.name}
                      </h3>
                      <p className={cn("text-sm leading-relaxed", plan.dark ? "text-slate-400" : "text-slate-500")}>
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 flex items-baseline gap-1.5">
                      <span className={cn("text-xs font-600", plan.dark ? "text-slate-400" : "text-slate-500")}>
                        {plan.currency === "USD" ? "$" : "Rp"}
                      </span>
                      <span 
                        className="text-4xl font-extrabold tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {price}
                      </span>
                      <span className={cn("text-xs", plan.dark ? "text-slate-400" : "text-slate-500")}>
                        /bulan
                      </span>
                    </div>

                    {/* Features Header */}
                    <p 
                      className={cn(
                        "text-xs font-700 uppercase tracking-wider mb-4", 
                        plan.dark ? "text-slate-400" : "text-slate-400"
                      )}
                    >
                      Fitur yang disertakan:
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm">
                          {feature.included ? (
                            <span className="text-teal shrink-0 mt-0.5">
                              <Check size={16} strokeWidth={2.5} />
                            </span>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-700 shrink-0 mt-0.5">
                              <Minus size={16} strokeWidth={2.5} />
                            </span>
                          )}
                          <span className={cn(
                            !feature.included && "opacity-50 line-through",
                            plan.dark ? "text-slate-300" : "text-slate-700"
                          )}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTA */}
                  <div>
                    <ButtonLink
                      href={plan.ctaHref}
                      variant={plan.dark ? "outline-white" : plan.popular ? "primary" : "secondary"}
                      size="lg"
                      className="w-full justify-center"
                    >
                      {plan.ctaText}
                    </ButtonLink>
                    <p className={cn("text-[11px] text-center mt-3", plan.dark ? "text-slate-500" : "text-slate-400")}>
                      {plan.name === "Enterprise" ? "Tanpa komitmen tahunan" : "Mulai instan tanpa kartu kredit"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. DETAILED COMPARISON TABLE ───────────────────────────── */}
      <section className="py-16 bg-white border-t border-b border-slate-100" aria-label="Tabel Perbandingan Fitur Detail">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-heading-xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Perbandingan Fitur Detail
            </h2>
            <p className="text-body-md text-slate-500 max-w-lg mx-auto">
              Bandingkan detail kapabilitas teknis dan fitur dari masing-masing paket langganan Brandy.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50" style={{ borderBottom: "1px solid var(--slate-200)" }}>
                  <th className="p-4 text-sm font-600 text-slate-700 w-1/3">Fitur Utama</th>
                  <th className="p-4 text-sm font-600 text-slate-900 text-center">Starter</th>
                  <th className="p-4 text-sm font-600 text-brand-blue-mid text-center">Growth</th>
                  <th className="p-4 text-sm font-600 text-slate-900 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonFeatures.map((cat, catIdx) => (
                  <Fragment key={catIdx}>
                    {/* Category row */}
                    <tr className="bg-slate-50/50">
                      <td colSpan={4} className="p-4 text-xs font-700 uppercase tracking-widest text-slate-500 bg-slate-50/70">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item, itemIdx) => (
                      <tr key={itemIdx} className="hover:bg-slate-50/30 transition-colors">
                        <td className="p-4 text-sm font-500 text-slate-800">{item.name}</td>
                        <td className="p-4 text-sm text-center text-slate-600">
                          {typeof item.starter === "boolean" ? (
                            item.starter ? <Check size={18} className="text-teal mx-auto" strokeWidth={2.5} /> : <Minus size={18} className="text-slate-300 mx-auto" />
                          ) : (
                            item.starter
                          )}
                        </td>
                        <td className="p-4 text-sm text-center text-slate-600 font-500">
                          {typeof item.growth === "boolean" ? (
                            item.growth ? <Check size={18} className="text-teal mx-auto" strokeWidth={2.5} /> : <Minus size={18} className="text-slate-300 mx-auto" />
                          ) : (
                            item.growth
                          )}
                        </td>
                        <td className="p-4 text-sm text-center text-slate-600">
                          {typeof item.enterprise === "boolean" ? (
                            item.enterprise ? <Check size={18} className="text-teal mx-auto" strokeWidth={2.5} /> : <Minus size={18} className="text-slate-300 mx-auto" />
                          ) : (
                            item.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4. ENTERPRISE CONTACT FORM (DARK SECTION) ────────────────── */}
      <section className="section-padding py-20" style={{ background: "var(--slate-950)", color: "white" }} aria-label="Kontak Kustom Enterprise">
        <div className="container-brand max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Col: Info */}
            <div className="lg:w-1/2">
              <span className="badge badge-amber mb-4 inline-flex">
                Kebutuhan Khusus
              </span>
              <h2 
                className="text-heading-xl text-white mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Butuh Solusi Khusus untuk <span className="text-gradient">Perusahaan Besar?</span>
              </h2>
              <p className="text-body-md text-slate-300 mb-6 leading-relaxed">
                Kami menyediakan penawaran harga kustom, infrastruktur terdedikasi, 
                SLA khusus, dan kepatuhan audit keamanan yang disesuaikan dengan kebutuhan 
                skala enterprise Anda.
              </p>
              <div className="space-y-4">
                {[
                  "On-premise deployment / private cloud hosting",
                  "Single Sign-On (SSO) & integrasi Active Directory",
                  "Dukungan teknis dedicated 24/7 dengan SLA tertulis",
                  "Pelatihan komprehensif untuk onboarding seluruh tim",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-amber/15 text-amber shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Form */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto mb-4">
                      <Check size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Permintaan Terkirim!</h3>
                    <p className="text-sm text-slate-400">
                      Terima kasih atas ketertarikan Anda. Tim sales kami akan menghubungi 
                      Anda dalam waktu maksimal 24 jam kerja.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="ent-name" className="block text-xs font-600 text-slate-300 uppercase tracking-wider mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="ent-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-10 px-4 rounded-lg text-sm bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-deep/30 transition-all"
                        placeholder="Nama Anda"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ent-email" className="block text-xs font-600 text-slate-300 uppercase tracking-wider mb-2">
                          Email Bisnis
                        </label>
                        <input
                          type="email"
                          id="ent-email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-10 px-4 rounded-lg text-sm bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-deep/30 transition-all"
                          placeholder="email@perusahaan.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="ent-company" className="block text-xs font-600 text-slate-300 uppercase tracking-wider mb-2">
                          Nama Perusahaan
                        </label>
                        <input
                          type="text"
                          id="ent-company"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full h-10 px-4 rounded-lg text-sm bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-deep/30 transition-all"
                          placeholder="PT Perusahaan Jaya"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ent-employees" className="block text-xs font-600 text-slate-300 uppercase tracking-wider mb-2">
                        Jumlah Karyawan
                      </label>
                      <select
                        id="ent-employees"
                        value={formData.employees}
                        onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                        className="w-full h-10 px-4 rounded-lg text-sm bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-deep/30 transition-all"
                      >
                        <option value="1-10">1 - 10 orang</option>
                        <option value="11-50">11 - 50 orang</option>
                        <option value="51-200">51 - 200 orang</option>
                        <option value="201-500">201 - 500 orang</option>
                        <option value="500+">Lebih dari 500 orang</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="ent-message" className="block text-xs font-600 text-slate-300 uppercase tracking-wider mb-2">
                        Kebutuhan Khusus / Pesan
                      </label>
                      <textarea
                        id="ent-message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-white/10 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-deep/30 transition-all resize-none"
                        placeholder="Deskripsikan kebutuhan integrasi, deployment, atau volume pengguna Anda..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-amber btn-lg w-full justify-center"
                    >
                      Kirim Permintaan Demo
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. ACCORDION FAQ ───────────────────────────────────────── */}
      <section className="section-padding py-20 bg-white" aria-label="FAQ Penagihan & Harga">
        <div className="container-brand max-w-4xl">
          <div className="text-center mb-16">
            <span className="badge badge-purple mb-4 inline-flex">
              FAQ
            </span>
            <h2 className="text-heading-xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Pertanyaan Umum
            </h2>
            <p className="text-body-md text-slate-500 max-w-lg mx-auto">
              Temukan jawaban atas pertanyaan seputar penagihan, lisensi, dan paket langganan Brandy.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={cn(
                    "border border-slate-200 rounded-xl overflow-hidden transition-all duration-200",
                    isOpen ? "shadow-md border-brand-blue-light" : "hover:border-slate-300"
                  )}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-600 text-slate-900 pr-4 flex items-center gap-2">
                      <HelpCircle size={18} className="text-brand-blue-mid shrink-0" />
                      {faq.question}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 bg-white text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
