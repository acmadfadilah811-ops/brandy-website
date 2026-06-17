import * as Icons from "lucide-react";

export interface Product {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string; // Stored as string name, cth: "Users", "Briefcase"
  category: "Collaboration" | "Sales" | "Data" | "Infrastructure";
  badge: string;
  color: string;
  roiTitle: string;
  roiDesc: string;
  roiMetric: string;
  videoUrl: string;
  features: { iconName: string; title: string; desc: string }[];
  integrations: string[];
  specs: { label: string; value: string }[];
}

export const getIconComponent = (name: string) => {
  const Icon = (Icons as any)[name] || Icons.Package;
  return Icon;
};

export const mockProducts: Product[] = [
  {
    name: "Brandy Workspace",
    slug: "workspace",
    tagline: "Kolaborasi tim modern dalam satu ruang kerja digital terpadu.",
    description: "Satukan chat, tugas, dokumen, dan jadwal tim Anda dalam satu dasbor responsif. Mengurangi kebutuhan rapat koordinasi hingga 40% dan mempercepat peluncuran proyek.",
    iconName: "Users",
    category: "Collaboration",
    badge: "Populer",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    roiTitle: "Peningkatan Produktivitas Terukur",
    roiDesc: "Tim yang beralih ke Brandy Workspace melaporkan penurunan 40% waktu rapat koordinasi dan peningkatan 35% kecepatan penyelesaian proyek.",
    roiMetric: "35%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { iconName: "Users", title: "Manajemen Tugas Terpadu", desc: "Buat, delegasikan, dan lacak tugas dengan kanban board interaktif." },
      { iconName: "Zap", title: "Chat Saluran Kontekstual", desc: "Hubungkan diskusi langsung di dalam file proyek atau dokumen terkait." },
      { iconName: "Globe", title: "Kalender Bersama", desc: "Jadwalkan rapat dan sinkronkan agenda kerja tim secara visual." },
    ],
    integrations: ["Slack", "Google Drive", "Zoom", "GitHub", "Figma"],
    specs: [
      { label: "Platform", value: "Browser-Based, Desktop App (Windows/Mac/Linux), Mobile Web" },
      { label: "Batas Lampiran", value: "Hingga 500MB per berkas (Paket Growth)" },
      { label: "Enkripsi", value: "AES-256 tingkat militer untuk semua dokumen" },
    ],
  },
  {
    name: "Brandy CRM",
    slug: "crm",
    tagline: "Optimalkan relasi pelanggan & percepat siklus penjualan.",
    description: "Kelola kontak, rekam histori komunikasi otomatis, lacak pipeline penjualan, dan kirim proposal pembayaran secara langsung. Membantu tim sales menutup lebih banyak transaksi.",
    iconName: "Briefcase",
    category: "Sales",
    badge: "Terlaris",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    roiTitle: "Pertumbuhan Penjualan yang Nyata",
    roiDesc: "Pengguna kami melaporkan peningkatan konversi leads sebesar 28% dalam 3 bulan pertama berkat visualisasi deal pipeline yang otomatis.",
    roiMetric: "28%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { iconName: "Briefcase", title: "Deal Pipeline visual", desc: "Seret dan letakkan kartu prospek sepanjang tahapan deal Anda." },
      { iconName: "Users", title: "Profil Kontak 360 Derajat", desc: "Lihat semua riwayat interaksi, email, dan catatan pelanggan di satu tempat." },
      { iconName: "CreditCard", title: "Invoice Terintegrasi", desc: "Kirim tagihan pembayaran digital langsung dari log kesepakatan." },
    ],
    integrations: ["WhatsApp Business API", "Gmail", "HubSpot", "Xendit", "Mailchimp"],
    specs: [
      { label: "Kapasitas Kontak", value: "Hingga 50.000 kontak (Paket Growth)" },
      { label: "Sync Email", value: "IMAP/SMTP dua arah otomatis" },
      { label: "Ekspor Data", value: "Format CSV dan Excel kapan saja" },
    ],
  },
  {
    name: "Brandy Analytics",
    slug: "analytics",
    tagline: "Visualisasikan performa bisnis Anda secara real-time.",
    description: "Hubungkan berbagai sumber data bisnis Anda ke satu platform analitik cerdas. Ambil keputusan berbasis data dengan bantuan prediksi AI dan report otomatis.",
    iconName: "BarChart3",
    category: "Data",
    badge: "AI Powered",
    color: "text-teal-600 bg-teal-50 border-teal-200",
    roiTitle: "Keputusan Berbasis Data Lebih Cepat",
    roiDesc: "Mengurangi waktu yang dibutuhkan untuk membuat laporan mingguan departemen dari 4 jam menjadi hanya 5 menit secara otomatis.",
    roiMetric: "98%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { iconName: "BarChart3", title: "Dasbor Kustom Drag & Drop", desc: "Buat visualisasi grafik dan matriks yang paling relevan bagi tim Anda." },
      { iconName: "Zap", title: "AI Predictive Insights", desc: "Identifikasi tren penjualan dan peringatan anomali pengeluaran otomatis." },
      { iconName: "Database", title: "Konektor Data Cepat", desc: "Hubungkan database SQL, Google Sheets, atau API analytics lainnya." },
    ],
    integrations: ["PostgreSQL", "Google Analytics", "MySQL", "HubSpot", "Salesforce"],
    specs: [
      { label: "Kecepatan Kueri", value: "Di bawah 100ms untuk dataset hingga 10 Juta baris" },
      { label: "Konektor Database", value: "Lebih dari 15+ database didukung secara bawaan" },
      { label: "Eksplorasi AI", value: "Dilengkapi LLM untuk query bahasa alami ke SQL" },
    ],
  },
  {
    name: "Brandy Devops",
    slug: "devops",
    tagline: "Automasi CI/CD & monitor performa server serverless.",
    description: "Sistem automasi pengujian, kompilasi, dan deployment kode ke cloud. Dapatkan laporan error instan, grafik load server, dan optimalisasi biaya cloud computing.",
    iconName: "Database",
    category: "Infrastructure",
    badge: "Developer Tool",
    color: "text-purple-600 bg-purple-50 border-purple-200",
    roiTitle: "Kecepatan Deployment Meningkat",
    roiDesc: "Mempersingkat siklus deployment harian dari 45 menit menjadi hanya 3 menit dengan zero downtime.",
    roiMetric: "15x",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { iconName: "Database", title: "CI/CD Pipeline Cerdas", desc: "Automasi pengujian unit test dan pembentukan image container docker." },
      { iconName: "Zap", title: "Serverless Monitoring", desc: "Lacak performa request cloud function Anda per milidetik." },
      { iconName: "Shield", title: "Vulnerability Scanning", desc: "Deteksi celah keamanan pada dependencies secara otomatis sebelum deployment." },
    ],
    integrations: ["Docker", "Kubernetes", "AWS Lambda", "Google Cloud Run", "GitHub Actions"],
    specs: [
      { label: "Bandwidth Bulanan", value: "Tak terbatas untuk seluruh deployment" },
      { label: "SLA Uptime", value: "Jaminan ketersediaan server 99.99%" },
      { label: "Platform Cloud", value: "AWS, GCP, Azure, DigitalOcean, Vercel" },
    ],
  },
  {
    name: "Brandy Pay",
    slug: "pay",
    tagline: "Kelola invoice, billing, & gerbang pembayaran digital.",
    description: "Rancang pricing page, tagih pelanggan dengan subscription billing otomatis, dan terima transfer virtual account atau kartu kredit secara mudah.",
    iconName: "CreditCard",
    category: "Sales",
    badge: "Keuangan",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    roiTitle: "Arus Kas Lebih Lancar",
    roiDesc: "Mempercepat pembayaran tagihan klien hingga 60% berkat notifikasi invoice otomatis dan gerbang transfer satu klik.",
    roiMetric: "60%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { iconName: "CreditCard", title: "Subscription Billing", desc: "Kelola tagihan berulang mingguan, bulanan, atau tahunan secara otomatis." },
      { iconName: "Users", title: "Multi-Currency Gateway", desc: "Terima pembayaran dalam mata uang Rupiah, USD, SGD, dan EUR." },
      { iconName: "FileText", title: "Laporan Pajak Otomatis", desc: "Kalkulasi PPN dan hasilkan invoice faktur pajak yang siap lapor." },
    ],
    integrations: ["Stripe", "Xendit", "Midtrans", "PayPal", "QuickBooks"],
    specs: [
      { label: "Keamanan Kartu", value: "Sertifikasi PCI-DSS Level 1 terakreditasi" },
      { label: "Metode Bayar", value: "Virtual Account, Kartu Kredit, QRIS, E-Wallet" },
      { label: "Payout Settlement", value: "Settlement harian otomatis ke rekening bank terdaftar" },
    ],
  },
  {
    name: "Brandy Docs",
    slug: "docs",
    tagline: "Dokumentasi tim & knowledge base kolaboratif.",
    description: "Buat panduan operasional (SOP), wiki internal, atau catatan teknis bersama dengan rich text editor instan. Dilengkapi dengan pencarian berbasis semantik.",
    iconName: "FileText",
    category: "Collaboration",
    badge: "Gratis",
    color: "text-slate-605 bg-slate-50 border-slate-200",
    roiTitle: "Onboarding Karyawan Lebih Cepat",
    roiDesc: "Mempersingkat waktu transfer ilmu (knowledge transfer) karyawan baru hingga 50% melalui basis pengetahuan terstruktur.",
    roiMetric: "50%",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: [
      { iconName: "FileText", title: "Real-time Collaborative Editor", desc: "Tulis dokumen bersama rekan kerja dengan penanda kursor langsung." },
      { iconName: "Search", title: "Pencarian Semantik AI", desc: "Temukan jawaban kontekstual dari tumpukan berkas dokumen tim Anda." },
      { iconName: "Shield", title: "Manajemen Hak Akses", desc: "Batasi hak baca/tulis dokumen per departemen atau level jabatan." },
    ],
    integrations: ["Slack", "Notion (Import)", "Confluence (Import)", "Jira", "GitHub"],
    specs: [
      { label: "Format Berkas", value: "Ekspor PDF, Markdown, HTML, JSON" },
      { label: "Struktur Dokumen", value: "Pohon folder bersarang tak terbatas (Nested tree)" },
      { label: "Pembatasan Hak Akses", value: "Read-only, Editor, Admin per folder/file" },
    ],
  },
];
