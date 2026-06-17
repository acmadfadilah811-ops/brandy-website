export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: "Active" | "Draft";
}

export const mockCareersData: JobOpening[] = [
  {
    id: "job_1",
    title: "Senior AI & NLP Engineer",
    department: "Engineering",
    location: "Jakarta / Remote",
    type: "Remote",
    experience: "3-5 Tahun",
    description: "Merancang dan melatih model NLP kustom untuk integrasi analitik percakapan dan asisten virtual otomatis di platform Brandy.",
    status: "Active",
  },
  {
    id: "job_2",
    title: "Senior UX/UI Designer",
    department: "Product & Design",
    location: "Jakarta / Hybrid",
    type: "Hybrid",
    experience: "3+ Tahun",
    description: "Memimpin perancangan sistem desain (design system) premium Brandy, visualisasi data interaktif, dan kolaborasi workflow produk.",
    status: "Active",
  },
  {
    id: "job_3",
    title: "Technical Writer & DevRel Specialist",
    department: "DevRel",
    location: "Jakarta / Hybrid",
    type: "Hybrid",
    experience: "2+ Tahun",
    description: "Menulis panduan integrasi API teknis, mengelola forum komunitas developer, dan membangun kemitraan teknologi strategis.",
    status: "Active",
  },
  {
    id: "job_4",
    title: "SaaS Product Manager",
    department: "Product & Design",
    location: "Jakarta",
    type: "Full-time",
    experience: "4+ Tahun",
    description: "Mengembangkan roadmap produk, melakukan riset pengguna, serta memimpin kolaborasi tim engineering untuk merilis fitur tepat waktu.",
    status: "Active",
  },
];
