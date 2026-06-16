# Dokumentasi Pembangunan & Deployment Website Brandy
*Tanggal Pembaruan: 17 Juni 2026*

Dokumen ini berfungsi sebagai panduan serah terima (handover) status pembangunan website **Brandy** berdasarkan spesifikasi **PRD 1 (Fungsional)**, **PRD 2 (Desain & UI/UX)**, serta konfigurasi deployment Docker pada VPS.

---

## 1. Kesesuaian dengan PRD & Progress Halaman

Seluruh 14 halaman utama dari sitemap pemasaran (marketing pages) telah selesai dibangun menggunakan **Next.js 16 (App Router)**, **TypeScript**, dan **Tailwind CSS**.

### 📋 Status Sitemap (PRD 1 - Spesifikasi Halaman)
| URL / Rute | Status | Fitur Utama (Sesuai PRD) |
| :--- | :---: | :--- |
| `/` (Beranda) | **Selesai** | Hero Section (Headline Bricolage), Bento Grid Fitur, Langkah Kerja, Integrasi Logo Slider, Testimoni, dan Pricing Teaser. |
| `/about` (Tentang) | **Selesai** | Story, Milestones Interaktif, Core Values (**BRANDY**), Team Leaders (Bayu, Achmad, Septiana), dan Awards. |
| `/products` | **Selesai** | Grid listing produk SaaS Brandy dengan filter kategori dinamis & badge status. |
| `/products/[slug]` | **Selesai** | Halaman detail spesifik produk, metrik ROI, grid spesifikasi teknis, dan embed video tutorial. |
| `/pricing` | **Selesai** | Toggle Billing Bulanan/Tahunan, 3 Tiers Plan, Tabel Perbandingan Fitur mendalam, Form Enterprise, dan FAQ Accordion. |
| `/contact` | **Selesai** | Alamat Kantor Pusat, Hubungi WA & Email, Form Pengiriman Pesan, dan Embed Google Maps. |
| `/demo` | **Selesai** | Form Profil Bisnis & Scheduler Tanggal/Waktu pertemuan interaktif. |
| `/blog` | **Selesai** | Search bar artikel, filter kategori (Tutorial, Insight, Kasus, dll.), dan grid artikel premium. |
| `/blog/[slug]` | **Selesai** | Detail isi artikel, sticky Table of Contents (TOC) sidebar, social share widget, dan bio penulis. |
| `/customers` | **Selesai** | Grid Success Stories, metrik dampak bisnis, layout testimoni 50/50 premium (tanpa bintang kuning). |
| `/integrations` | **Selesai** | Grid library integrasi (Slack, GitHub, dll.) dengan search bar & filter kategori, serta CTA kustom request. |
| `/careers` | **Selesai** | Listing lowongan kerja filter per departemen, benefit grid, dan modal form apply + upload CV. |
| `/legal/privacy` | **Selesai** | Kebijakan privasi detail (GDPR & Data Protection) dengan layout centered narrow yang bersih. |
| `/legal/terms` | **Selesai** | Ketentuan layanan, aturan lisensi, dan fair use policy. |

---

## 2. Aset Visual & Brand (PRD 2 - Spesifikasi UI/UX)

Sesuai dengan berkas **Company Profile Brandy PDF**, kami telah mengintegrasikan elemen brand asli berikut:
1. **Logo & Tagline**:
   * Logo horizontal lengkap yang memuat ikon, teks **brandy**, dan tagline **"tumbuh bersama"** telah diekstrak dan dibersihkan latarnya.
   * Digunakan varian gelap (`logo_brandy_full.png`) di Header putih, dan varian terang (`logo_brandy_full_light.png`) di Footer gelap.
2. **Foto Tim Leaders (Halaman `/about`)**:
   * Foto profil **Bayu Ma'ruf**, **Achmad Fadilah**, dan **Septiana Budi Rahayu** diekstrak langsung dari halaman 9 PDF.
   * Tampilan foto diperbaiki ke rasio vertikal premium (`rounded-2xl`, `w-48 h-60`) dengan class Tailwind `object-cover object-top` untuk menghindari pemotongan area kepala.
3. **Core Values (B-R-A-N-D-Y)**:
   * **B**old Innovation, **R**eliability, **A**esthetics & Usability, **N**urturing Partnership, **D**ynamic Adaptation, dan **Y**ield-Driven.

---

## 3. Detail Teknis & Infrastruktur Deployment

Aplikasi saat ini telah berjalan secara mandiri dan production-ready di VPS Anda.

### 🐳 Konfigurasi Docker
* **Standalone Build**: `next.config.ts` diatur menggunakan `output: "standalone"` untuk meminimalkan ukuran Docker image (~150MB) dengan memisahkan file static dan public.
* **Dockerfile**: Menggunakan multi-stage build (`deps` -> `builder` -> `runner`) berbasis `node:20-alpine`.
* **Docker Compose**: Mengikat port container `3000` ke port host `3000` dengan restart policy `always`.

### 🖥️ Status Deployment VPS
* **Alamat IP VPS**: `203.175.125.235`
* **Port Terbuka**: `3000` (Status UFW: *inactive*, Port 3000 sebelumnya kosong, sehingga tidak mengganggu sistem Bintang Advertising).
* **URL Uji Coba**: [http://203.175.125.235:3000](http://203.175.125.235:3000)
* **Verifikasi Kontainer**: Status container `brandy-website` berjalan sehat (*Up*) dan mengembalikan response `HTTP 200 OK` dengan page caching Next.js aktif.

---

## 4. Perbaikan Terakhir yang Dilakukan (Turn Ini)

Sebelum proses build Docker dijalankan di VPS, kami membenahi beberapa isu kompilasi agar build berjalan mulus:
1. **Perbaikan Urutan CSS**: Memindahkan `@import` Google Fonts ke baris paling atas di `globals.css` (Tailwind base rule menolak `@import` jika ditaruh di tengah/bawah file).
2. **TypeScript Tipe Pricing**: Menambahkan properti `currency` pada pricing plans di `/pricing/page.tsx` karena dibaca oleh generator template tapi sebelumnya absen di data objek.
3. **TypeScript Flex CSS**: Mengubah inline style `shrink: 0` menjadi `flexShrink: 0` pada file `PricingTeaser.tsx` agar sesuai standar pengetikan TypeScript React.
4. **Instalasi Paket Docker**: Menggunakan perintah `npm install` alih-alih `npm ci` di Dockerfile untuk menghindari error validasi integritas akibat ketidaksinkronan kecil di file `package-lock.json` bawaan lokal.

---

## 5. Rencana Langkah Selanjutnya (Next Steps)

Untuk kelanjutan proyek besok, berikut adalah daftar prioritas pengembangan selanjutnya:

1. **Koneksi Real ke CMS Sanity (Prioritas Utama)**:
   * Saat ini halaman dinamis `/blog` dan `/products` masih menggunakan *premium mock data* terstruktur.
   * Hubungkan client Next.js menggunakan library `@sanity/client` atau `next-sanity` ke Sanity Studio milik Brandy agar konten dapat dikelola langsung dari editor Sanity.
2. **Implementasi Halaman Sekunder (Prioritas Menengah)**:
   * Membuat halaman `/partners` (Hubungan kemitraan).
   * Membuat halaman `/press` (Galeri pers & kit media).
   * Membuat halaman `/help` (Pusat bantuan & FAQ penuh).
   * Membuat halaman `/changelog` dan `/status` (Monitoring status platform).
3. **Konfigurasi Domain Kustom & SSL (Opsional)**:
   * Jika ingin merilis ke domain khusus (misal: `brandy.id` atau `brandy-adv.com`), buat blok konfigurasi server baru di Nginx VPS `/etc/nginx/sites-available/` untuk mem-proxy domain tersebut ke `http://127.0.0.1:3000`, lalu aktifkan SSL menggunakan Certbot (`certbot --nginx`).
