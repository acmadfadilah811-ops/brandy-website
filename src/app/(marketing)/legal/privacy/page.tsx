import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi - Brandy",
  description: "Kebijakan Privasi dan perlindungan data pelanggan untuk layanan SaaS Brandy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      {/* ── 1. HEADER SECTION (Centered Narrow) ── */}
      <header className="max-w-[720px] mx-auto px-6 text-center mb-16" aria-label="Privacy Header">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue-mid flex items-center justify-center mx-auto mb-6 border border-blue-100">
          <Shield size={22} strokeWidth={1.5} />
        </div>
        <h1 
          className="text-heading-xl text-slate-900 mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Kebijakan Privasi
        </h1>
        <p className="text-xs text-slate-400">
          Terakhir Diperbarui: 16 Juni 2026
        </p>
      </header>

      {/* ── 2. LEGAL TEXT BODY (Centered Narrow Layout) ── */}
      <main className="max-w-[720px] mx-auto px-6 prose prose-slate text-slate-600 text-xs md:text-sm leading-relaxed space-y-8">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            1. Pendahuluan
          </h2>
          <p>
            Brandy ("kami", "perusahaan") berkomitmen penuh untuk melindungi privasi dan keamanan data pribadi 
            pengguna ("Anda", "pelanggan"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, 
            menyimpan, dan membagikan informasi Anda saat Anda menggunakan website dan platform SaaS Brandy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            2. Informasi yang Kami Kumpulkan
          </h2>
          <p>
            Kami mengumpulkan informasi yang Anda berikan secara langsung saat berinteraksi dengan layanan kami:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5">
            <li>
              <strong>Data Profil Akun:</strong> Nama lengkap, alamat email pekerjaan, nama perusahaan, nomor telepon, 
              dan detail otentikasi login (SSO).
            </li>
            <li>
              <strong>Data Transaksi:</strong> Informasi billing, alamat penagihan, dan metode pembayaran (kami tidak menyimpan 
              informasi kartu kredit secara langsung; transaksi diproses via payment gateway bersertifikat PCI-DSS).
            </li>
            <li>
              <strong>Data Aktivitas Sistem:</strong> Log aktivitas server, riwayat kolaborasi proyek, data anomali, 
              serta interaksi di dalam dashboard Brandy.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            3. Penggunaan Informasi
          </h2>
          <p>
            Kami memproses data Anda untuk tujuan legalitas operasional berikut:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5">
            <li>Menyediakan, memelihara, dan mengoptimalkan performa platform SaaS Brandy.</li>
            <li>Memproses transaksi pembayaran berlangganan bulanan / tahunan Anda.</li>
            <li>Mengirimkan notifikasi sistem penting, pembaruan keamanan, dan dukungan teknis (support).</li>
            <li>Mendeteksi, mencegah, dan mengatasi aktivitas penipuan atau ancaman cyber security.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            4. Perlindungan & Enkripsi Data
          </h2>
          <p>
            Sesuai dengan komitmen Keandalan (Reliability) Brandy, data Anda disimpan di infrastruktur cloud server terenkripsi 
            dengan standar industri AES-256. Akses internal ke data pelanggan dikontrol ketat melalui protokol otentikasi multi-faktor 
            (MFA) dan dipantau 24/7.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            5. Hak-Hak Pengguna (GDPR Compliance)
          </h2>
          <p>
            Anda memiliki hak penuh untuk mengakses, memperbarui, membatasi pemrosesan, atau meminta penghapusan permanen 
            seluruh data pribadi Anda dari database kami. Anda dapat mengirimkan permohonan penghapusan akun 
            melalui email resmi di bawah.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            6. Kontak Hubung
          </h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau masalah keamanan data, silakan hubungi 
            tim Perlindungan Data kami di:
          </p>
          <p className="font-600 text-slate-900">
            Email: security@brandy.id / legal@brandy.id
          </p>
        </section>

        <div className="pt-8 border-t border-slate-100 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-600 text-slate-500 hover:text-brand-blue-mid transition-colors"
          >
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}
