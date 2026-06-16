"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle,
  MessageSquare,
  Building,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    topic: "general",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // In production, sync with Supabase or send email endpoint
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 text-center" aria-label="Hero Contact">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10 max-w-3xl">
          <span className="badge badge-blue mb-4 inline-flex">Hubungi Kami</span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mulai Percakapan Baru dengan <span className="text-gradient">Tim Brandy</span>
          </h1>
          <p className="text-body-md text-slate-600 max-w-xl mx-auto">
            Apakah Anda memiliki pertanyaan mengenai produk, penawaran harga, demo, 
            atau peluang kemitraan? Kami siap mendengarkan dan membantu Anda.
          </p>
        </div>
      </section>

      {/* Main split grid section */}
      <section className="py-16" aria-label="Informasi Kontak & Form">
        <div className="container-brand max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Col: Contact Info (span 5) */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-md">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue-light/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-purple-light/10 rounded-full blur-3xl" aria-hidden="true" />
              
              <div className="space-y-10 relative z-10">
                <div>
                  <h2 
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Informasi Kontak
                  </h2>
                  <p className="text-sm text-slate-400">
                    Hubungi kami secara langsung melalui email, telepon, atau kunjungi kantor utama kami di Jakarta.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Kantor Pusat</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        TCC Batavia Tower One, Lt. 32<br />
                        Jl. KH. Mas Mansyur No.121, Karet Tengsin<br />
                        Jakarta Pusat, DKI Jakarta 10220
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber shrink-0 mt-0.5">
                      <Phone size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Telepon & WA</h3>
                      <p className="text-xs text-slate-300">
                        +62 (21) 5098-7788<br />
                        +62 812-9900-1122 (WhatsApp Support)
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber shrink-0 mt-0.5">
                      <Mail size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Email Resmi</h3>
                      <p className="text-xs text-slate-300">
                        support@brandy.id (Customer Support)<br />
                        sales@brandy.id (Enterprise Sales)<br />
                        info@brandy.id (Umum & Kemitraan)
                      </p>
                    </div>
                  </div>

                  {/* Operational Hours */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber shrink-0 mt-0.5">
                      <Clock size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Jam Operasional</h3>
                      <p className="text-xs text-slate-300">
                        Senin - Jumat: 09:00 - 18:00 WIB<br />
                        Sabtu & Minggu: Tutup (Hanya Emergency Support)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Social Media Links */}
              <div className="pt-8 border-t border-white/10 mt-8 relative z-10 flex items-center justify-between">
                <span className="text-xs text-slate-400">© 2026 Brandy Indonesia</span>
                <div className="flex gap-4">
                  <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">Twitter/X</a>
                  <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">Instagram</a>
                </div>
              </div>
            </div>

            {/* Right Col: Contact Form (span 7) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 flex flex-col justify-center shadow-sm">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h2 
                    className="text-2xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Pesan Berhasil Terkirim!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan 
                    akan membalas melalui email dalam waktu 24 jam.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn btn-secondary inline-flex items-center gap-1.5 mt-6"
                  >
                    Kirim Pesan Baru <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 
                      className="text-xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Kirim Pesan Langsung
                    </h2>
                    <p className="text-xs text-slate-500">
                      Silakan isi formulir di bawah ini dan perwakilan tim kami akan segera membalas Anda.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="user-name" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="user-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-10 px-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                        placeholder="e.g., Jane Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="user-email" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                        Email Kerja
                      </label>
                      <input
                        type="email"
                        id="user-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-10 px-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                        placeholder="e.g., jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="user-company" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                        Nama Perusahaan
                      </label>
                      <div className="relative">
                        <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          id="user-company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                          placeholder="e.g., PT Maju Jaya"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="user-topic" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                        Topik Pertanyaan
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          id="user-topic"
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all appearance-none cursor-pointer"
                        >
                          <option value="general">Pertanyaan Umum</option>
                          <option value="sales">Pembelian & Sales</option>
                          <option value="billing">Penagihan & Invoice</option>
                          <option value="partnership">Kemitraan (Partnership)</option>
                          <option value="support">Dukungan Teknis</option>
                        </select>
                        {/* Custom Dropdown Chevron */}
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="user-message" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                      Isi Pesan / Keterangan
                    </label>
                    <textarea
                      id="user-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all resize-none"
                      placeholder="Bagaimana kami bisa membantu Anda? Silakan tulis detail pertanyaan Anda..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full justify-center"
                  >
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Location Block */}
      <section className="pb-20" aria-label="Peta Kantor">
        <div className="container-brand max-w-6xl">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-[350px] relative bg-slate-100">
            {/* Styled Google Maps Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.452674996918!2d106.81591547585097!3d-6.203860060769344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f41b31555555%3A0xe54fb7256193798c!2sTCC%20Batavia!5e0!3m2!1sid!2sid!4v1718534000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor Brandy TCC Batavia"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
