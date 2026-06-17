export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  ctaText: string;
  ctaHref: string;
  popular: boolean;
  dark: boolean;
  features: PricingFeature[];
}

export interface PricingFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface PricingData {
  plans: PricingPlan[];
  faqs: PricingFAQ[];
}

export const mockPricingData: PricingData = {
  plans: [
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
  ],
  faqs: [
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
  ],
};
