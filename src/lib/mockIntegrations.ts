export interface IntegrationItem {
  id: string;
  name: string;
  category: "Collaboration" | "Analytics" | "CRM" | "Marketing" | "DevOps";
  logoText: string;
  logoBg: string;
  description: string;
  isPopular?: boolean;
}

export const mockIntegrationsData: IntegrationItem[] = [
  {
    id: "int_1",
    name: "Slack",
    category: "Collaboration",
    logoText: "SL",
    logoBg: "bg-purple-600",
    description: "Kirim notifikasi real-time dan peringatan anomali data langsung ke channel tim Anda.",
    isPopular: true,
  },
  {
    id: "int_2",
    name: "Salesforce",
    category: "CRM",
    logoText: "SF",
    logoBg: "bg-sky-500",
    description: "Sinkronisasikan data transaksi keuangan dan metrik interaksi pelanggan secara otomatis.",
    isPopular: true,
  },
  {
    id: "int_3",
    name: "GitHub",
    category: "DevOps",
    logoText: "GH",
    logoBg: "bg-slate-900",
    description: "Hubungkan repositori kode untuk melacak kecepatan deployment dan siklus rilis visual.",
    isPopular: true,
  },
  {
    id: "int_4",
    name: "HubSpot",
    category: "CRM",
    logoText: "HS",
    logoBg: "bg-orange-500",
    description: "Kelola leads pemasaran dan pipeline penjualan Anda tanpa hambatan sinkronisasi data.",
    isPopular: true,
  },
  {
    id: "int_5",
    name: "Mailchimp",
    category: "Marketing",
    logoText: "MC",
    logoBg: "bg-yellow-500",
    description: "Ekspor daftar pelanggan dan kelola kampanye email blast otomatis berdasarkan aktivitas user.",
    isPopular: false,
  },
  {
    id: "int_6",
    name: "Discord",
    category: "Collaboration",
    logoText: "DC",
    logoBg: "bg-indigo-600",
    description: "Terima notifikasi webhook instan dan integrasikan bot monitoring untuk tim internal.",
    isPopular: false,
  },
  {
    id: "int_7",
    name: "Jira Software",
    category: "Collaboration",
    logoText: "JR",
    logoBg: "bg-blue-500",
    description: "Sambungkan feedback visual dari workspace ke papan tugas backlog developer secara langsung.",
    isPopular: false,
  },
  {
    id: "int_8",
    name: "Google Workspace",
    category: "Collaboration",
    logoText: "GW",
    logoBg: "bg-red-500",
    description: "Sinkronisasikan kalender, email, dan kelola otentikasi login pengguna dengan Google SSO.",
    isPopular: false,
  },
  {
    id: "int_9",
    name: "Tableau",
    category: "Analytics",
    logoText: "TB",
    logoBg: "bg-blue-400",
    description: "Impor visualisasi grafik analitik yang kaya untuk pelaporan statistik dewan direksi.",
    isPopular: false,
  },
];
