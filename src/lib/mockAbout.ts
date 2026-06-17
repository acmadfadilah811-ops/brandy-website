export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface CoreValue {
  key: string; // B, R, A, N, D, Y
  title: string;
  description: string;
}

export interface AboutData {
  mission: string;
  vision: string;
  leaders: TeamMember[];
  milestones: Milestone[];
  values: CoreValue[];
}

export const mockAboutData: AboutData = {
  mission: "Menyediakan infrastruktur kolaborasi SaaS terbaik untuk mempercepat produktivitas bisnis digital di Asia Tenggara.",
  vision: "Menjadi standar utama platform operasi bisnis berbasis cloud yang tepercaya, aman, dan mudah diintegrasikan.",
  leaders: [
    {
      id: "1",
      name: "Bayu Ma'ruf Safii",
      role: "UX/UI & Creative Brand Designer",
      image: "/team/member_1.png",
      bio: "Spesialis desain visual kelas atas dengan keahlian mendalam dalam merancang antarmuka produk digital premium dan identitas brand yang intuitif.",
      linkedin: "https://linkedin.com",
    },
    {
      id: "2",
      name: "Achmad Fadilah",
      role: "AI & Full-Stack Engineer / DevOps Integrator",
      image: "/team/member_2.png",
      bio: "Pakar arsitektur full-stack dan cloud infrastructure. Berfokus pada integrasi model AI cerdas serta otomasi deployment dengan downtime minimum.",
      linkedin: "https://linkedin.com",
    },
    {
      id: "3",
      name: "Septiana Budi Rahayu",
      role: "DevRel / Development Relationships",
      image: "/team/member_3.png",
      bio: "Penghubung komunitas developer Brandy. Bertanggung jawab atas technical partnership, edukasi publik, serta dokumentasi standar integrasi API.",
      linkedin: "https://linkedin.com",
    },
  ],
  milestones: [
    {
      id: "1",
      year: "2021",
      title: "Awal Mula Brandy",
      description: "Brandy didirikan oleh sekelompok insinyur perangkat lunak di Jakarta dengan misi menyederhanakan kolaborasi tim untuk bisnis lokal.",
    },
    {
      id: "2",
      year: "2022",
      title: "Pendanaan Seed & Rilis V1",
      description: "Menerima pendanaan awal sebesar $1.5M dari East Ventures dan secara resmi meluncurkan platform SaaS Brandy versi 1.0 ke pasar.",
    },
    {
      id: "3",
      year: "2023",
      title: "Ekspansi Regional",
      description: "Membuka kantor cabang di Singapura dan memperluas layanan ke Malaysia dan Filipina. Pengguna tumbuh hingga 5.000+ organisasi.",
    },
    {
      id: "4",
      year: "2024",
      title: "Brandy Enterprise & AI",
      description: "Meluncurkan solusi Enterprise dengan keamanan tingkat militer dan fitur automasi cerdas berbasis kecerdasan buatan (AI).",
    },
    {
      id: "5",
      year: "2025",
      title: "Memimpin Pasar Asia Tenggara",
      description: "Dipercaya oleh lebih dari 12.000 perusahaan aktif dengan tingkat retensi pelanggan mencapai 98% secara regional.",
    },
  ],
  values: [
    {
      key: "B",
      title: "Bold Innovation (Inovasi Berani)",
      description: "Kami tidak pernah berhenti bereksperimen dengan teknologi dan pendekatan arsitektur terbaru demi menghasilkan performa produk digital yang optimal.",
    },
    {
      key: "R",
      title: "Reliability (Keandalan)",
      description: "Menjadi mitra yang dapat dipercaya. Setiap deployment server dipastikan aman, minim downtime, dengan proteksi data yang ketat.",
    },
    {
      key: "A",
      title: "Aesthetics & Usability (Estetika & Kemudahan)",
      description: "Setiap baris kode dan piksel desain dibuat dengan ketelitian tinggi. Produk digital Brandy tidak hanya fungsional, tetapi juga memanjakan mata.",
    },
    {
      key: "N",
      title: "Nurturing Partnership (Kemitraan)",
      description: "Membangun hubungan jangka panjang dengan klien lewat dukungan teknis pasca-rilis, transparansi komunikasi, dan konsultasi gratis.",
    },
    {
      key: "D",
      title: "Dynamic Adaptation (Adaptasi Dinamis)",
      description: "Fleksibel terhadap kebutuhan pasar, masukan dari pengguna, serta perubahan cepat lanskap teknologi digital dunia.",
    },
    {
      key: "Y",
      title: "Yield-Driven (Berorientasi pada Hasil)",
      description: "Fokus pada solusi teknologi yang memberikan efisiensi operasional dan peningkatan profitabilitas (ROI) yang nyata bagi bisnis klien kami.",
    },
  ],
};
