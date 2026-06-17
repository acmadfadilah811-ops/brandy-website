"use client";

import React, { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  Key, 
  CreditCard, 
  Cable, 
  Layers, 
  MessageCircle, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  id: number;
  cat: string;
  q: string;
  a: string;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "Semua Kategori", icon: <HelpCircle size={16} /> },
    { id: "account", name: "Akun & Keamanan", icon: <Key size={16} /> },
    { id: "billing", name: "Pembayaran & Invoice", icon: <CreditCard size={16} /> },
    { id: "integration", name: "Integrasi & API", icon: <Cable size={16} /> },
    { id: "features", name: "Fitur Platform", icon: <Layers size={16} /> }
  ];

  const faqs: FAQItem[] = [
    {
      id: 1,
      cat: "account",
      q: "Bagaimana cara mengaktifkan Otentikasi Dua Faktor (2FA)?",
      a: "Anda dapat mengaktifkan 2FA dengan masuk ke Pengaturan Akun > Keamanan > Otentikasi Dua Faktor. Ikuti petunjuk untuk memindai kode QR menggunakan aplikasi otentikator seperti Google Authenticator atau Microsoft Authenticator."
    },
    {
      id: 2,
      cat: "billing",
      q: "Apakah saya bisa melakukan upgrade atau downgrade paket langganan kapan saja?",
      a: "Ya, Anda bisa mengubah paket langganan Anda kapan saja melalui dashboard Admin Tagihan. Untuk upgrade, penyesuaian biaya prorata akan dihitung otomatis. Untuk downgrade, perubahan paket akan aktif pada siklus tagihan bulan berikutnya."
    },
    {
      id: 3,
      cat: "integration",
      q: "Bagaimana cara menyambungkan Slack dengan ruang kerja Brandy?",
      a: "Buka menu Integrasi di sidebar kiri Brandy, pilih Slack dari daftar konektor, dan klik 'Hubungkan'. Anda akan diarahkan ke halaman otorisasi Slack untuk menyetujui akses ruang kerja Brandy ke channel Slack pilihan Anda."
    },
    {
      id: 4,
      cat: "features",
      q: "Berapa kapasitas penyimpanan maksimum untuk paket Brandy Business?",
      a: "Paket Brandy Business memberikan penyimpanan cloud terenkripsi sebesar 100 GB per pengguna. Jika tim Anda memerlukan kuota tambahan, Anda dapat membeli add-on penyimpanan melalui panel tagihan atau menghubungi tim Account Executive kami."
    },
    {
      id: 5,
      cat: "account",
      q: "Bagaimana cara melakukan reset kata sandi jika saya lupa?",
      a: "Pada halaman masuk login, klik tautan 'Lupa Kata Sandi?'. Masukkan alamat email terdaftar Anda, dan kami akan mengirimkan email berisi instruksi aman untuk mereset kata sandi Anda."
    },
    {
      id: 6,
      cat: "integration",
      q: "Apakah Brandy mendukung Webhook kustom?",
      a: "Tentu. Kami menyediakan Webhook keluar (Outgoing Webhooks) untuk memberitahukan server Anda secara real-time mengenai aktivitas di ruang kerja Brandy. Dokumentasi payload lengkap dapat diakses di portal Developer Brandy."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "all" || faq.cat === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      
      {/* ── HERO SEARCH SECTION ──────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <span className="badge badge-blue">Pusat Bantuan</span>
        <h1 
          className="text-heading-2xl font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Bagaimana Kami Bisa Membantu Anda?
        </h1>
        
        {/* Help Search box */}
        <div className="relative w-full max-w-xl mx-auto group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-blue-mid">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel bantuan, pertanyaan, atau topik..."
            className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-4 focus:ring-brand-blue-deep/10 shadow-sm transition-all"
          />
        </div>
      </section>

      {/* ── CATEGORY PILLS ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 mt-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-600 border transition-all ${
                selectedCat === cat.id
                  ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ ACCORDION LIST ──────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 mt-16 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-6 space-y-2">
            <HelpCircle className="mx-auto text-slate-300" size={32} />
            <h3 className="text-xs font-bold text-slate-800">Tidak ada artikel bantuan ditemukan</h3>
            <p className="text-[11px] text-slate-400">Silakan coba kata kunci lain atau pilih kategori yang berbeda.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-200 ${
                  isOpen ? "border-brand-blue-mid ring-1 ring-brand-blue-mid/10" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-700 text-xs text-slate-900 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-blue-mid" : ""}`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-50 animate-fade-in leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* ── CUSTOMER SERVICE CALLOUT ────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 mt-20">
        <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          />
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Butuh Bantuan Lebih Lanjut?</h3>
            <p className="text-[11px] text-slate-400 max-w-sm">
              Tim Technical Support kami siap mendampingi Anda 24/7 menyelesaikan setiap kendala operasional.
            </p>
          </div>
          
          <a href="/contact" className="relative z-10 shrink-0">
            <Button
              variant="amber"
              size="md"
              icon={<MessageCircle size={14} />}
              iconPosition="left"
            >
              Hubungi Support
            </Button>
          </a>
        </div>
      </section>

    </div>
  );
}
