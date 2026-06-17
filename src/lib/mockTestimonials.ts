export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  color: string;
  featured: boolean;
  caseStudyUrl?: string;
  revenueIncrease?: string; // e.g. "+40%"
}

export const mockTestimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "Brandy benar-benar mengubah cara kami bekerja. Pipeline penjualan yang tadinya manual dan kacau, sekarang berjalan otomatis dan terukur. Revenue kami naik 40% dalam 3 bulan pertama.",
    name: "Dewi Rahayu",
    title: "VP Sales",
    company: "PT Maju Bersama",
    initials: "DR",
    color: "var(--brand-blue-mid)",
    featured: true,
    caseStudyUrl: "/customers/maju-bersama",
    revenueIncrease: "+40%",
  },
  {
    id: "t2",
    quote:
      "Setup-nya cepat, tim kami langsung bisa pakai tanpa training panjang. Customer support Brandy juga sangat responsif.",
    name: "Rendra Kusuma",
    title: "CTO",
    company: "Startup Nusantara",
    initials: "RK",
    color: "var(--amber)",
    featured: false,
  },
  {
    id: "t3",
    quote:
      "Data analytics dari Brandy membantu kami memahami perilaku pelanggan secara mendalam. Keputusan marketing kami jadi jauh lebih tepat sasaran.",
    name: "Sari Indah",
    title: "Head of Marketing",
    company: "Digital Nesia",
    initials: "SI",
    color: "var(--teal)",
    featured: false,
  },
  {
    id: "t4",
    quote:
      "Integrasi dengan tools yang sudah kami pakai (Slack, Google Workspace) berjalan mulus. Tidak ada disruption sama sekali saat migrasi.",
    name: "Budi Santoso",
    title: "Operations Director",
    company: "Logistik Prima",
    initials: "BS",
    color: "var(--brand-purple-mid)",
    featured: false,
    caseStudyUrl: "/customers/logistik-prima",
  },
];
