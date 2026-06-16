import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata = {
  title: "Syarat & Ketentuan - Brandy",
  description: "Syarat dan ketentuan penggunaan platform SaaS Brandy.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      {/* ── 1. HEADER SECTION (Centered Narrow) ── */}
      <header className="max-w-[720px] mx-auto px-6 text-center mb-16" aria-label="Terms Header">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue-mid flex items-center justify-center mx-auto mb-6 border border-blue-100">
          <Scale size={22} strokeWidth={1.5} />
        </div>
        <h1 
          className="text-heading-xl text-slate-900 mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Syarat & Ketentuan Penggunaan
        </h1>
        <p className="text-xs text-slate-400">
          Terakhir Diperbarui: 16 Juni 2026
        </p>
      </header>

      {/* ── 2. LEGAL TEXT BODY (Centered Narrow Layout) ── */}
      <main className="max-w-[720px] mx-auto px-6 prose prose-slate text-slate-600 text-xs md:text-sm leading-relaxed space-y-8">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            1. Penerimaan Syarat Ketentuan
          </h2>
          <p>
            Dengan mendaftar, mengakses, atau menggunakan platform SaaS Brandy, Anda menyetujui untuk terikat secara sah oleh 
            Syarat & Ketentuan Penggunaan ini. Jika Anda tidak menyetujui salah satu pasal di dalam dokumen ini, Anda tidak diperkenankan 
            untuk mengakses atau menggunakan layanan kami.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            2. Hak Lisensi & Penggunaan Akun
          </h2>
          <p>
            Tergantung pada paket berlangganan Anda, Brandy memberikan lisensi non-eksklusif, non-transferabel, 
            dan terbatas untuk mengakses platform kami demi kebutuhan operasional bisnis internal Anda. Anda bertanggung jawab penuh 
            untuk menjaga kerahasiaan password login Anda dan memantau semua aktivitas yang terjadi di bawah akun Anda.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            3. Siklus Tagihan, Pembayaran & Refund
          </h2>
          <p>
            Semua biaya berlangganan ditagihkan di muka pada awal setiap periode (bulanan atau tahunan) sesuai pilihan paket Anda. 
            Harga sudah termasuk pajak yang berlaku kecuali dinyatakan sebaliknya secara tertulis. Seluruh pembayaran bersifat final 
            dan tidak dapat di-refund (non-refundable) kecuali jika terjadi kegagalan sistem mayor yang diverifikasi oleh audit internal kami.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            4. Kebijakan Batasan Penggunaan (Fair Use Policy)
          </h2>
          <p>
            Anda setuju untuk tidak menyalahgunakan platform kami, termasuk namun tidak terbatas pada:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1.5">
            <li>Mengirimkan virus, spyware, malware, atau script berbahaya ke server Brandy.</li>
            <li>Melakukan rekayasa balik (reverse engineering) atau mencoba membongkar kode sumber (source code) platform.</li>
            <li>Menggunakan Brandy untuk melanggar hukum hak cipta pihak ketiga atau mentransmisikan data terlarang.</li>
            <li>Mencoba memintas limitasi API rate limiting atau merusak stabilitas server (DDoS).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            5. Batasan Tanggung Jawab
          </h2>
          <p>
            Brandy disediakan "sebagaimana adanya" (as-is) dan "sebagaimana tersedia" (as-available) tanpa jaminan apa pun, 
            baik tersurat maupun tersirat. Dalam keadaan apa pun kami tidak bertanggung jawab atas kerugian tidak langsung, kerugian keuntungan, 
            atau hilangnya data yang timbul akibat ketidakmampuan Anda menggunakan platform kami.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            6. Hukum yang Mengatur
          </h2>
          <p>
            Syarat & Ketentuan Penggunaan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap perselisihan 
            yang timbul dari atau terkait dengan penggunaan layanan Brandy akan diselesaikan secara musyawarah, dan jika gagal, 
            akan diajukan ke Pengadilan Negeri Jakarta Pusat.
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
