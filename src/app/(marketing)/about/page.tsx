"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Shield, 
  Users, 
  Zap, 
  Globe, 
  Heart, 
  Target, 
  Linkedin, 
  ArrowRight,
  Award,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

// Milestones / Timeline default
const defaultMilestones = [
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
];

// Core Values mapping (B-R-A-N-D-Y)
const valueIcons: Record<string, any> = {
  B: Sparkles,
  R: Shield,
  A: Heart,
  N: Users,
  D: Globe,
  Y: Target,
};

const valueColors: Record<string, string> = {
  B: "border-blue-500",
  R: "border-teal-500",
  A: "border-amber-500",
  N: "border-purple-500",
  D: "border-indigo-500",
  Y: "border-red-500",
};

// Default Values
const defaultValues = [
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
];

// Leadership Team default
const defaultLeaders = [
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
];

export default function AboutPage() {
  const [activeTimelineYear, setActiveTimelineYear] = useState("2021");
  const [data, setData] = useState({
    mission: "Menyediakan infrastruktur kolaborasi SaaS terbaik untuk mempercepat produktivitas bisnis digital di Asia Tenggara.",
    vision: "Menjadi standar utama platform operasi bisnis berbasis cloud yang tepercaya, aman, dan mudah diintegrasikan.",
    leaders: defaultLeaders,
    milestones: defaultMilestones,
    values: defaultValues,
  });

  useEffect(() => {
    fetch("/api/admin/about")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.about) {
          setData(resData.about);
          if (resData.about.milestones?.length > 0) {
            const years = resData.about.milestones.map((m: any) => m.year);
            if (!years.includes(activeTimelineYear)) {
              setActiveTimelineYear(years[0]);
            }
          }
        }
      })
      .catch((err) => console.error("Error loading about page data", err));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-slate-100 py-16 lg:py-24" aria-label="Hero About">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />

        <div className="container-brand relative z-10 max-w-4xl text-center">
          <span className="badge badge-blue mb-4 inline-flex">
            Tentang Brandy
          </span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Membantu Tim Berkolaborasi Tanpa <span className="text-gradient">Batas Geografis</span>
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            Kami percaya bahwa perangkat lunak yang dirancang secara presisi dapat memberdayakan 
            bisnis dari segala skala untuk bekerja lebih cepat, lebih pintar, dan lebih terintegrasi.
          </p>
        </div>
      </section>

      {/* ── 2. STORY SECTION ── */}
      <section className="py-20" aria-label="Sejarah Perusahaan">
        <div className="container-brand max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-mid to-brand-purple-mid rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition-all duration-350" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=500"
                  alt="Tim Brandy sedang bekerja kolaboratif"
                  width={800}
                  height={500}
                  className="object-cover w-full h-[320px] lg:h-[400px]"
                />
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-xs font-700 uppercase tracking-widest text-brand-blue-mid">
                Cerita Kami
              </span>
              <h2 
                className="text-heading-xl text-slate-900"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Dari Garasi Kecil Hingga Skala Regional
              </h2>
              <p className="text-body-md text-slate-600 leading-relaxed">
                Brandy didirikan pada tahun 2021 dengan satu premis sederhana: tim yang bekerja di berbagai 
                tempat dan sistem yang terfragmentasi memperlambat inovasi bisnis. Kami ingin membangun satu 
                ruang kerja berbasis cloud yang sangat responsif, intuitif, dan menyenangkan untuk digunakan.
              </p>
              <p className="text-body-md text-slate-600 leading-relaxed">
                Hari ini, kami melayani ribuan bisnis di Asia Tenggara, mulai dari UMKM lokal yang sedang berkembang 
                hingga korporasi multinasional berskala besar. Kami tetap berkomitmen pada DNA awal kami: rekayasa 
                perangkat lunak yang presisi, performa yang cepat, dan antarmuka yang ramah pengguna.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Misi Kami</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {data.mission}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Visi Kami</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {data.vision}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. TIMELINE SECTION (Milestones) ── */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100" aria-label="Milestones Perusahaan">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-12">
            <span className="badge badge-purple mb-4 inline-flex">Timeline</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Perjalanan Penting Kami
            </h2>
            <p className="text-body-md text-slate-500 max-w-md mx-auto">
              Langkah demi langkah bagaimana kami tumbuh dan bertransformasi melayani kebutuhan kolaborasi modern.
            </p>
          </div>

          {/* Timeline navigation */}
          <div className="flex justify-start md:justify-center overflow-x-auto pb-4 gap-2 border-b border-slate-200 mb-8 max-w-3xl mx-auto scrollbar-none">
            {data.milestones.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTimelineYear(m.year)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-600 border transition-all shrink-0",
                  activeTimelineYear === m.year
                    ? "bg-brand-blue-mid text-white border-brand-blue-mid shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                )}
              >
                Tahun {m.year}
              </button>
            ))}
          </div>

          {/* Timeline content display */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-3xl mx-auto min-h-[180px] flex flex-col justify-center transition-all duration-300">
            {data.milestones.map((m) => {
              if (m.year !== activeTimelineYear) return null;
              return (
                <div key={m.id} className="space-y-4 animate-fade-in">
                  <span className="text-xs font-bold text-amber bg-amber/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Milestone {m.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                    {m.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. VALUES & CULTURE ── */}
      <section className="py-20" aria-label="Nilai-nilai Utama Perusahaan">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-16">
            <span className="badge badge-amber mb-4 inline-flex">Nilai Utama</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Prinsip yang Menggerakkan Kami
            </h2>
            <p className="text-body-md text-slate-500 max-w-lg mx-auto">
              Bagaimana kami berinteraksi satu sama lain, memperlakukan pengguna kami, dan merancang perangkat lunak kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.values.map((v, idx) => {
              const IconComp = valueIcons[v.key] || Award;
              const borderCol = valueColors[v.key] || "border-slate-500";
              return (
                <div
                  key={idx}
                  className={cn(
                    "bg-white rounded-xl p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-l-4",
                    borderCol
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 text-brand-blue-mid mb-5">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. STATS SECTION ── */}
      <section className="py-20" style={{ background: "var(--slate-950)", color: "white" }} aria-label="Statistik Utama">
        <div className="container-brand max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <span className="text-[12px] font-700 uppercase tracking-widest text-slate-400 block">
                Pelanggan Aktif
              </span>
              <div 
                className="text-5xl font-extrabold text-amber"
                style={{ fontFamily: "var(--font-display)" }}
              >
                12,000+
              </div>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto">
                Organisasi mempercayakan operasional bisnisnya pada Brandy.
              </p>
            </div>

            <div className="space-y-3 border-t md:border-t-0 md:border-l md:border-r border-slate-800 pt-8 md:pt-0">
              <span className="text-[12px] font-700 uppercase tracking-widest text-slate-400 block">
                SLA Uptime
              </span>
              <div 
                className="text-5xl font-extrabold text-amber"
                style={{ fontFamily: "var(--font-display)" }}
              >
                99.99%
              </div>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto">
                Komitmen keandalan server dengan jaminan keamanan tingkat tinggi.
              </p>
            </div>

            <div className="space-y-3 border-t md:border-t-0 pt-8 md:pt-0">
              <span className="text-[12px] font-700 uppercase tracking-widest text-slate-400 block">
                Ekspansi Negara
              </span>
              <div 
                className="text-5xl font-extrabold text-amber"
                style={{ fontFamily: "var(--font-display)" }}
              >
                5+
              </div>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto">
                Negara di Asia Tenggara didukung dengan infrastruktur terlokalisasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. LEADERSHIP TEAM SECTION ── */}
      <section className="py-20" aria-label="Tim Kepemimpinan Brandy">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-16">
            <span className="badge badge-blue mb-4 inline-flex">Kepemimpinan</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Dibalik Layar Brandy
            </h2>
            <p className="text-body-md text-slate-500 max-w-lg mx-auto">
              Dipimpin oleh para profesional berpengalaman yang bertekad membawa efisiensi operasional terbaik untuk bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {data.leaders.map((leader, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center">
                {/* Photo Container */}
                <div className="relative w-48 h-60 rounded-2xl overflow-hidden mb-5 border border-slate-200 group-hover:border-brand-blue-mid transition-all duration-350 shadow-sm shrink-0">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={220}
                    height={280}
                    className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-350"
                  />
                </div>

                <h3 className="font-bold text-slate-900 text-base" style={{ fontFamily: "var(--font-heading)" }}>
                  {leader.name}
                </h3>
                <span className="text-xs text-brand-blue-mid font-500 mb-3 block">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[230px] mb-4">
                  {leader.bio}
                </p>
                {leader.linkedin && (
                  <Link
                    href={leader.linkedin}
                    target="_blank"
                    className="text-slate-400 hover:text-brand-blue-mid transition-colors"
                    aria-label={`LinkedIn profil ${leader.name}`}
                  >
                    <Linkedin size={16} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. AWARDS & PRESS SECTION ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-100" aria-label="Penghargaan dan Liputan Media">
        <div className="container-brand max-w-5xl text-center">
          <p className="text-xs font-700 uppercase tracking-widest text-slate-400 mb-8">
            Sertifikasi & Liputan Media Terkemuka
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16 opacity-60">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <Award className="text-brand-blue-mid shrink-0" size={24} />
              <span>Gartner Leader 2025</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <Shield className="text-teal shrink-0" size={24} />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
              <Sparkles className="text-amber shrink-0" size={24} />
              <span>G2 High Performer APAC</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. JOIN TEAM CTA BANNER ── */}
      <section className="py-20 border-t border-slate-100" aria-label="Ajakan Bergabung">
        <div className="container-brand max-w-4xl text-center">
          <h2 className="text-heading-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Ingin Membentuk Masa Depan Kolaborasi SaaS?
          </h2>
          <p className="text-body-md text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Kami selalu mencari profesional berbakat, penuh rasa ingin tahu, dan berdedikasi 
            tinggi untuk bergabung dengan tim global kami. Mari berkembang bersama Brandy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/careers" variant="primary" size="lg">
              Lihat Lowongan Pekerjaan
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost" size="lg" className="gap-1.5">
              Hubungi Kami <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
