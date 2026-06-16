export interface Author {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  excerpt: string;
  category: "Tutorial" | "Insight" | "Studi Kasus" | "News";
  tags: string[];
  body: Array<{
    type: "paragraph" | "heading" | "quote" | "list" | "code";
    content: string | string[];
    level?: number; // for headings
    language?: string; // for code blocks
  }>;
  seoTitle: string;
  seoDesc: string;
}

export const authors: Record<string, Author> = {
  bayu: {
    name: "Bayu Ma'ruf Safii",
    role: "UX/UI & Creative Brand Designer",
    image: "/team/member_1.png",
    bio: "Spesialis desain visual kelas atas dengan keahlian mendalam dalam merancang antarmuka produk digital premium dan identitas brand yang intuitif.",
  },
  achmad: {
    name: "Achmad Fadilah",
    role: "AI & Full-Stack Engineer / DevOps Integrator",
    image: "/team/member_2.png",
    bio: "Pakar arsitektur full-stack dan cloud infrastructure. Berfokus pada integrasi model AI cerdas serta otomasi deployment dengan downtime minimum.",
  },
  septiana: {
    name: "Septiana Budi Rahayu",
    role: "DevRel / Development Relationships",
    image: "/team/member_3.png",
    bio: "Penghubung komunitas developer Brandy. Bertanggung jawab atas technical partnership, edukasi publik, serta dokumentasi standar integrasi API.",
  },
};

export const mockBlogPosts: BlogPost[] = [
  {
    title: "Mengintegrasikan Model Machine Learning untuk Analisis Churn SaaS Prediktif",
    slug: "mengintegrasikan-ml-untuk-analisis-churn-saas-prediktif",
    author: authors.achmad,
    publishedAt: "15 Juni 2026",
    readTime: "8 min read",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450",
    excerpt: "Bagaimana tim engineering Brandy memanfaatkan algoritma regresi logistik dan neural network untuk memprediksi retensi pengguna dengan tingkat akurasi 98%.",
    category: "Insight",
    tags: ["Machine Learning", "SaaS Analytics", "Python", "Data Science"],
    body: [
      {
        type: "paragraph",
        content: "Di era digital yang serba cepat ini, mengelola retensi pelanggan (customer retention) adalah kunci utama keberlanjutan bisnis Software as a Service (SaaS). Berbeda dengan model bisnis transaksional tradisional, model berlangganan sangat bergantung pada kepuasan jangka panjang pengguna. Jika pengguna pergi (churn), biaya akuisisi pelanggan (CAC) yang tinggi akan menguras margin keuntungan Anda."
      },
      {
        type: "paragraph",
        content: "Di Brandy, kami mengembangkan mesin AI prediktif yang tertanam langsung di dalam Brandy Analytics. Pada artikel ini, kita akan membahas arsitektur teknis bagaimana kami membangun, melatih, dan menyebarkan model Machine Learning (ML) untuk mengidentifikasi sinyal-sinyal churn sebelum pengguna benar-benar menekan tombol batalkan."
      },
      {
        type: "heading",
        level: 2,
        content: "1. Mengidentifikasi Fitur Churn (Feature Engineering)"
      },
      {
        type: "paragraph",
        content: "Sebelum melatih model, langkah terpenting adalah mengumpulkan data historis aktivitas pengguna dan mengidentifikasi metrik apa saja yang berkorelasi kuat dengan keputusan churn. Beberapa metrik (features) yang kami gunakan meliputi:"
      },
      {
        type: "list",
        content: [
          "Frekuensi Login Harian/Mingguan: Penurunan frekuensi login adalah indikator pertama hilangnya minat.",
          "Waktu Sesi Rata-rata: Berapa lama pengguna menghabiskan waktu di dalam dashboard per sesi.",
          "Penggunaan Fitur Spesifik: Apakah pengguna menggunakan fitur inti (seperti membuat report atau menambahkan annotasi tim).",
          "Jumlah Tiket Support: Tingkat kesulitan yang dilaporkan oleh user berbanding lurus dengan kepuasan mereka."
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "2. Memilih Algoritma yang Tepat"
      },
      {
        type: "paragraph",
        content: "Kami membandingkan beberapa algoritma klasifikasi, termasuk Logistic Regression, Random Forest, dan XGBoost. Untuk kebutuhan real-time scoring di platform SaaS, kami menemukan bahwa XGBoost memberikan keseimbangan terbaik antara akurasi prediksi (98.2%) dan kecepatan inferensi (di bawah 10ms per query)."
      },
      {
        type: "code",
        language: "python",
        content: `import xgboost as xgb
from sklearn.model_selection import train_test_split

# Persiapan dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Inisialisasi XGBoost Classifier
model = xgb.XGBClassifier(
    max_depth=5,
    learning_rate=0.1,
    n_estimators=100,
    objective='binary:logistic'
)

# Pelatihan model
model.fit(X_train, y_train)`
      },
      {
        type: "quote",
        content: "Prediksi churn yang efektif bukan sekadar mengetahui SIAPA yang akan pergi, melainkan MENGAPA mereka pergi dan BAGAIMANA kita bisa mencegahnya secara otomatis."
      },
      {
        type: "heading",
        level: 2,
        content: "3. Otomatisasi Tindakan Pencegahan (Actionable Churn)"
      },
      {
        type: "paragraph",
        content: "Mengetahui skor risiko churn dari pengguna tidak akan berguna tanpa aksi nyata. Brandy mengintegrasikan model ML ini dengan sistem otomasi notifikasi. Saat model mendeteksi pengguna enterprise memiliki risiko churn di atas 75%, sistem akan secara otomatis memicu alur kerja:"
      },
      {
        type: "list",
        content: [
          "Mengirim peringatan instan ke channel Slack tim Customer Success.",
          "Memicu email personalisasi dari Account Manager yang menawarkan sesi training gratis.",
          "Menampilkan penawaran upgrade/diskon diskrit di dalam dashboard web pengguna."
        ]
      },
      {
        type: "paragraph",
        content: "Dengan pendekatan proaktif ini, Brandy berhasil membantu klien menekan angka churn bulanan hingga 35%, secara langsung meningkatkan Customer Lifetime Value (LTV) mereka."
      }
    ],
    seoTitle: "Integrasi Machine Learning untuk Churn SaaS - Brandy Blog",
    seoDesc: "Panduan teknis membangun model prediksi churn pelanggan SaaS menggunakan XGBoost dan mengintegrasikannya dengan automation tool untuk menurunkan angka churn."
  },
  {
    title: "Panduan Praktis Desain Antarmuka Premium untuk Dashboard Data Kompleks",
    slug: "panduan-praktis-desain-antarmuka-premium-dashboard-data-kompleks",
    author: authors.bayu,
    publishedAt: "12 Juni 2026",
    readTime: "6 min read",
    thumbnail: "https://images.unsplash.com/photo-1541462608141-2758574e8416?auto=format&fit=crop&q=80&w=800&h=450",
    excerpt: "Cara merancang visualisasi data yang memanjakan mata tanpa mengorbankan keterbacaan metrik. Studi kasus proses perancangan layout bento grid Brandy Analytics.",
    category: "Tutorial",
    tags: ["UI/UX Design", "Figma", "Data Visualization", "Bento Grid"],
    body: [
      {
        type: "paragraph",
        content: "Merancang dashboard data yang menyajikan ribuan metrik secara real-time adalah tantangan terbesar bagi seorang Product Designer. Banyak produk SaaS terjebak dalam dua ekstrem: terlalu sederhana sehingga miskin data, atau terlalu padat sehingga memicu kelelahan kognitif bagi pengguna."
      },
      {
        type: "paragraph",
        content: "Saat merancang Brandy Analytics, fokus utama kami adalah membangun estetika premium yang terasa 'hidup' namun tetap mempertahankan keterbacaan data yang superior. Berikut adalah prinsip-prinsip desain antarmuka dashboard yang kami terapkan di Brandy."
      },
      {
        type: "heading",
        level: 2,
        content: "1. Terapkan Bento Grid Layout untuk Informasi Hierarkis"
      },
      {
        type: "paragraph",
        content: "Alih-alih menggunakan grid 3 kolom identik yang monoton, Bento Grid memungkinkan kita mengelompokkan informasi secara dinamis berdasarkan prioritas data. Card yang memuat metrik utama (seperti Monthly Recurring Revenue) diberi ukuran yang lebih lebar (span 2 kolom) sedangkan metrik penunjang ditaruh di card yang lebih kecil."
      },
      {
        type: "quote",
        content: "Bento grid membagi ruang secara harmonis. Pengguna dapat langsung menangkap pola data penting dalam 2 detik pertama melihat layar."
      },
      {
        type: "heading",
        level: 2,
        content: "2. Palet Warna Kontras untuk Visualisasi Grafik"
      },
      {
        type: "paragraph",
        content: "Hindari penggunaan warna pelangi yang terlalu ramai pada grafik chart Anda. Gunakan satu warna primer dominan (misalnya deep blue untuk Brandy) dan satu warna aksen hangat (seperti amber untuk garis anomali atau data penting). Dengan menyederhanakan warna, titik-titik data yang butuh perhatian segera akan terlihat sangat menonjol."
      },
      {
        type: "heading",
        level: 2,
        content: "3. Micro-interactions untuk Konteks Tambahan"
      },
      {
        type: "paragraph",
        content: "Desain premium terletak pada detail terkecil. Di Brandy, hover state pada setiap bar grafik memicu tooltip melayang yang mulus dengan transisi 150ms. Angka di dalam chart juga melakukan count-up halus dari 0 saat pertama kali dimuat. Ini memberi perasaan bahwa aplikasi sangat responsif dan 'bernapas'."
      }
    ],
    seoTitle: "Desain UI/UX Premium Dashboard Data Kompleks - Brandy Blog",
    seoDesc: "Pelajari cara merancang visualisasi data premium dan dashboard bento grid yang estetik, modern, serta ramah pengguna untuk platform SaaS Anda."
  },
  {
    title: "Mengapa Kemitraan Strategis & Integrasi API adalah Katalis Pertumbuhan SaaS",
    slug: "mengapa-kemitraan-strategis-integrasi-api-katalis-pertumbuhan-saas",
    author: authors.septiana,
    publishedAt: "8 Juni 2026",
    readTime: "5 min read",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=450",
    excerpt: "Menganalisis pergeseran paradigma bisnis modern di mana produk SaaS tidak lagi bersaing secara tertutup, melainkan berkolaborasi melalui ekosistem integrasi.",
    category: "Insight",
    tags: ["SaaS Growth", "API Integration", "Partnership", "Developer Relations"],
    body: [
      {
        type: "paragraph",
        content: "Tidak ada produk perangkat lunak yang dapat berdiri sendiri di era modern. Pengguna enterprise saat ini menggunakan rata-rata 80+ aplikasi SaaS yang berbeda untuk menjalankan operasional bisnis mereka setiap hari. Jika produk Anda memaksa mereka memindahkan data secara manual atau menolak berintegrasi, Anda berada di jalan pintas menuju churn."
      },
      {
        type: "paragraph",
        content: "Di Brandy, kami melihat integrasi API pihak ketiga bukan hanya sekadar fitur teknis, melainkan katalis pertumbuhan bisnis (growth engine). Melalui ketersediaan konektor Slack, Salesforce, Google Workspace, dan HubSpot, kami membantu tim operasional bekerja 10x lebih cepat."
      },
      {
        type: "heading",
        level: 2,
        content: "1. Menurunkan Hambatan Adopsi (Lower Friction)"
      },
      {
        type: "paragraph",
        content: "Saat calon pelanggan mengevaluasi Brandy, pertanyaan pertama mereka hampir selalu: 'Apakah ini bisa terhubung dengan sistem CRM kami saat ini?' Dengan menjawab 'Ya, dalam sekali klik', kami mengeliminasi 90% keraguan departemen IT mereka untuk menyetujui anggaran langganan Brandy."
      },
      {
        type: "heading",
        level: 2,
        content: "2. Membangun Ekosistem Developer Relations"
      },
      {
        type: "paragraph",
        content: "Membuka API publik kami agar developer eksternal dapat menulis plugin kustom di atas Brandy adalah keputusan terbaik kami. Ini menciptakan efek jaringan (network effect) di mana Brandy menjadi bagian integral dari infrastruktur inti perusahaan klien kami, membuatnya hampir tidak mungkin digantikan."
      }
    ],
    seoTitle: "Integrasi API Katalis Pertumbuhan Bisnis SaaS - Brandy Blog",
    seoDesc: "Temukan bagaimana ekosistem integrasi API dan kemitraan teknologi strategis dapat meningkatkan retensi pelanggan dan memperluas pangsa pasar SaaS Anda."
  },
  {
    title: "Brandy Dinobatkan sebagai 'High Performer' di G2 Grid Asia Pasifik 2026",
    slug: "brandy-dinobatkan-sebagai-high-performer-g2-grid-asia-pasifik-2026",
    author: authors.septiana,
    publishedAt: "1 Juni 2026",
    readTime: "4 min read",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=450",
    excerpt: "Pencapaian luar biasa tim Brandy di kuartal kedua tahun ini. Terima kasih kepada seluruh pengguna aktif atas review positif dan feedback yang membangun.",
    category: "News",
    tags: ["Brandy News", "G2 Award", "SaaS Recognition", "Achievements"],
    body: [
      {
        type: "paragraph",
        content: "Kami memiliki kabar gembira yang sangat membanggakan untuk dibagikan kepada seluruh komunitas pengguna Brandy. Di Laporan Kuartal G2 Grid untuk Asia Pasifik (APAC) yang baru saja dirilis, Brandy resmi dinobatkan sebagai 'High Performer' dalam kategori Manajemen Operasi Proyek dan Kolaborasi Tim."
      },
      {
        type: "paragraph",
        content: "G2 adalah marketplace software tepercaya di dunia yang memeringkat produk berdasarkan kepuasan pengguna dari review nyata serta pangsa pasar yang objektif. Penghargaan ini menegaskan komitmen kami dalam membangun solusi kolaborasi digital yang premium, andal, dan berorientasi pada hasil."
      },
      {
        type: "quote",
        content: "Penghargaan ini didedikasikan sepenuhnya untuk 12.000+ pengguna aktif kami yang terus mempercayakan Brandy untuk mengelola kolaborasi tim mereka setiap hari."
      },
      {
        type: "heading",
        level: 2,
        content: "Fokus Kami untuk Semester Kedua 2026"
      },
      {
        type: "paragraph",
        content: "Pencapaian ini tidak membuat kami berpuas diri. Kami akan terus meluncurkan pembaruan produk secara agresif. Fokus roadmap kami untuk beberapa bulan ke depan meliputi penguatan model enkripsi data enterprise dan penambahan module AI automasi workflow."
      }
    ],
    seoTitle: "Brandy High Performer G2 Grid Asia Pasifik 2026 - Brandy Blog",
    seoDesc: "Brandy dinobatkan sebagai High Performer di laporan G2 Grid kuartal 2 tahun 2026. Baca selengkapnya tentang pencapaian dan rencana roadmap kami."
  }
];
