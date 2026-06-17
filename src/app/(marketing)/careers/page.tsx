"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Check, 
  Monitor, 
  Heart, 
  GraduationCap, 
  Laptop,
  Upload,
  X
} from "lucide-react";

interface JobRole {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status?: "Active" | "Draft";
}

const defaultJobOpenings: JobRole[] = [
  {
    id: "job_1",
    title: "Senior AI & NLP Engineer",
    department: "Engineering",
    location: "Jakarta / Remote",
    type: "Remote",
    experience: "3-5 Tahun",
    description: "Merancang dan melatih model NLP kustom untuk integrasi analitik percakapan dan asisten virtual otomatis di platform Brandy."
  },
  {
    id: "job_2",
    title: "Senior UX/UI Designer",
    department: "Product & Design",
    location: "Jakarta / Hybrid",
    type: "Hybrid",
    experience: "3+ Tahun",
    description: "Memimpin perancangan sistem desain (design system) premium Brandy, visualisasi data interaktif, dan kolaborasi workflow produk."
  },
  {
    id: "job_3",
    title: "Technical Writer & DevRel Specialist",
    department: "DevRel",
    location: "Jakarta / Hybrid",
    type: "Hybrid",
    experience: "2+ Tahun",
    description: "Menulis panduan integrasi API teknis, mengelola forum komunitas developer, dan membangun kemitraan teknologi strategis."
  },
  {
    id: "job_4",
    title: "SaaS Product Manager",
    department: "Product & Design",
    location: "Jakarta",
    type: "Full-time",
    experience: "4+ Tahun",
    description: "Mengembangkan roadmap produk, melakukan riset pengguna, serta memimpin kolaborasi tim engineering untuk merilis fitur tepat waktu."
  }
];

const benefits = [
  {
    icon: Monitor,
    title: "Kerja Remote / Fleksibel",
    description: "Kami percaya hasil kerja lebih penting daripada kehadiran fisik di kantor. Tentukan sendiri jam kerja produktif Anda."
  },
  {
    icon: Laptop,
    title: "Perangkat Kerja Premium",
    description: "Dapatkan dukungan budget kerja untuk membeli MacBook Pro, monitor 4K, keyboard ergonomis, dan kursi kerja ternama."
  },
  {
    icon: Heart,
    title: "Kesehatan Menyeluruh",
    description: "Asuransi kesehatan swasta kelas A mencakup rawat jalan, rawat inap, kacamata, perawatan gigi, hingga kesehatan mental."
  },
  {
    icon: GraduationCap,
    title: "Budget Belajar Tahunan",
    description: "Kami mendanai sertifikasi profesional, kursus online di Udemy/Coursera, buku teks, hingga tiket menghadiri konferensi tech."
  }
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [activeJob, setActiveJob] = useState<JobRole | null>(null);
  const [applied, setApplied] = useState(false);
  const [jobs, setJobs] = useState<JobRole[]>(defaultJobOpenings);

  useEffect(() => {
    fetch("/api/admin/careers")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.careers) {
          // Only show active job listings on public site
          const activeJobs = resData.careers.filter((j: any) => j.status === "Active");
          setJobs(activeJobs);
        }
      })
      .catch((err) => console.error("Error loading careers data", err));
  }, []);

  const departments = useMemo(() => {
    const uniqueDepts = Array.from(new Set(jobs.map((j) => j.department)));
    return ["All", ...uniqueDepts];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) => selectedDept === "All" || job.department === selectedDept
    );
  }, [jobs, selectedDept]);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setActiveJob(null);
    }, 2500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-slate-100 py-16 lg:py-24" aria-label="Careers Hero">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />

        <div className="container-brand relative z-10 max-w-4xl text-center">
          <span className="badge badge-blue mb-4 inline-flex items-center gap-1.5">
            <Briefcase size={13} /> Bergabung Bersama Kami
          </span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Membangun Masa Depan <span className="text-gradient">Kolaborasi Kerja</span>
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Brandy adalah tim yang terdiri dari para profesional kreatif, berani melakukan inovasi, 
            dan berkomitmen menghadirkan produk dengan performa serta estetika kelas dunia.
          </p>

          <a 
            href="#lowongan"
            className="inline-flex items-center gap-2 text-xs font-700 bg-slate-950 text-white rounded-lg px-6 py-3 shadow-md hover:bg-slate-900 transition-colors"
          >
            Lihat Lowongan Terbuka <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ── 2. BENEFITS & PERKS (Bento style grid cards) ── */}
      <section className="py-20 bg-slate-50" aria-label="Fasilitas & Keuntungan Karyawan">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-16">
            <span className="badge badge-amber mb-4 inline-flex">Benefits & Perks</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Fasilitas Terbaik untuk Mendukung Produktivitas Anda
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Kami peduli dengan kesejahteraan, perkembangan karir, dan keseimbangan hidup Anda di dalam maupun luar pekerjaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((b) => {
              const IconComp = b.icon;
              return (
                <div 
                  key={b.title}
                  className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex gap-5"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-brand-blue-mid flex items-center justify-center border border-blue-100 shrink-0">
                    <IconComp size={24} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. JOB LISTINGS SECTION (Interactive Search/Filter) ── */}
      <section id="lowongan" className="py-20 scroll-mt-12" aria-label="Lowongan Pekerjaan Aktif">
        <div className="container-brand max-w-5xl">
          <div className="text-center mb-12">
            <span className="badge badge-purple mb-4 inline-flex">Lowongan Kerja</span>
            <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Temukan Karir Impian Anda
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Jelajahi posisi terbuka di bawah ini. Cari peran yang sesuai dengan keahlian Anda.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-600 transition-all border ${
                  selectedDept === dept
                    ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                {dept === "All" ? "Semua Divisi" : dept}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-500 text-xs font-500">Tidak ada posisi terbuka untuk divisi ini saat ini.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div 
                  key={job.title}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-brand-blue-mid transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-600 uppercase tracking-wide">
                      {job.department}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue-mid transition-colors">
                      {job.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {job.type}
                      </span>
                      <span>• Pengalaman: {job.experience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveJob(job)}
                    className="self-start md:self-auto bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-950 text-xs font-700 px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-950 transition-all shadow-sm shrink-0"
                  >
                    Lamar Sekarang
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── 4. APPLICATIONS MODAL ── */}
      {activeJob && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl border border-slate-100 animate-in fade-in-50 zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Tutup form lamaran"
            >
              <X size={18} />
            </button>

            {applied ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto border border-green-200">
                  <Check size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900">Lamaran Terkirim!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Terima kasih telah melamar posisi <strong>{activeJob.title}</strong> di Brandy. 
                  Tim recruitment kami akan meninjau CV Anda dan menghubungi Anda dalam 3-5 hari kerja.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-700 uppercase tracking-widest text-brand-blue-mid">Form Lamaran Kerja</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{activeJob.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{activeJob.department} • {activeJob.location}</p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-600 text-slate-500 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-brand-blue-mid"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-600 text-slate-500 mb-1">Email Aktif</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-brand-blue-mid"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-600 text-slate-500 mb-1">Nomor Telepon/WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="+62 8..."
                      className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-brand-blue-mid"
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-[11px] font-600 text-slate-500 mb-1">Link Portfolio / LinkedIn (Opsional)</label>
                    <input
                      type="url"
                      id="portfolio"
                      placeholder="https://..."
                      className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-brand-blue-mid"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-600 text-slate-500 mb-1">Unggah CV / Resume (PDF, maks 5MB)</label>
                    <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors relative group">
                      <input
                        type="file"
                        accept=".pdf"
                        required
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload size={20} className="text-slate-400 mx-auto mb-2 group-hover:text-brand-blue-mid transition-colors" />
                      <p className="text-[11px] text-slate-600 font-500">Pilih file PDF dari komputer Anda</p>
                      <p className="text-[9px] text-slate-400 mt-1">Hanya mendukung format .pdf</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-700 py-2.5 rounded-lg transition-colors shadow-md"
                  >
                    Kirim Lamaran Pekerjaan
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 5. SPECULATIVE APPLICATION (Footer Callout) ── */}
      <section className="py-20 border-t border-slate-100" aria-label="Lamaran Spekulatif">
        <div className="container-brand max-w-4xl text-center">
          <h2 className="text-heading-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Tidak Menemukan Peran yang Cocok?
          </h2>
          <p className="text-body-md text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
            Kami selalu mencari individu berbakat, antusias, dan menyukai tantangan teknologi digital. 
            Kirimkan CV dan portofolio spekulatif Anda kepada kami.
          </p>
          <a
            href="mailto:careers@brandy.id"
            className="inline-flex items-center gap-2 text-xs font-700 bg-slate-50 hover:bg-slate-100 text-slate-950 border border-slate-200 rounded-lg px-6 py-3 transition-all shadow-sm"
          >
            Hubungi Kami: careers@brandy.id <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
