"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  Check, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Building,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

// Time slots available for booking
const timeSlots = [
  "09:00 WIB",
  "10:00 WIB",
  "11:00 WIB",
  "13:30 WIB",
  "14:30 WIB",
  "15:30 WIB",
  "16:30 WIB"
];

// Days in current calendar month mock (June 2026)
const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
const disabledDays = [6, 7, 13, 14, 20, 21, 27, 28]; // Weekends

export default function DemoPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    employees: "1-10",
    needs: "",
  });

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBookDemo = () => {
    if (selectedDay && selectedTimeSlot) {
      setStep(3);
      // In production, sync with database or Resend API to send confirmations
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-16 text-center" aria-label="Hero Demo">
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10 max-w-3xl">
          <span className="badge badge-purple mb-4 inline-flex">Jadwalkan Demo</span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Lihat Bagaimana Brandy <span className="text-gradient">Bekerja untuk Anda</span>
          </h1>
          <p className="text-body-md text-slate-600 max-w-xl mx-auto">
            Dapatkan demo personalisasi selama 30 menit. Pelajari cara mengoptimalkan kolaborasi 
            tim, menyederhanakan alur kerja, dan mengamankan data bisnis Anda.
          </p>
        </div>
      </section>

      {/* Main interactive section */}
      <section className="py-16" aria-label="Interactive Demo Scheduler">
        <div className="container-brand max-w-5xl">
          {/* Progress bar */}
          <div className="flex items-center justify-center mb-10 max-w-lg mx-auto">
            <div className="flex items-center gap-3">
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border",
                step >= 1 ? "bg-brand-blue-mid border-brand-blue-mid text-white" : "bg-white border-slate-200 text-slate-400"
              )}>
                {step > 1 ? <Check size={14} /> : "1"}
              </span>
              <span className="text-xs font-600 text-slate-700">Profil Tim</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 mx-4 max-w-[80px]" />
            <div className="flex items-center gap-3">
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border",
                step >= 2 ? "bg-brand-blue-mid border-brand-blue-mid text-white" : "bg-white border-slate-200 text-slate-400"
              )}>
                {step > 2 ? <Check size={14} /> : "2"}
              </span>
              <span className="text-xs font-600 text-slate-700 font-500">Pilih Waktu</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 mx-4 max-w-[80px]" />
            <div className="flex items-center gap-3">
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border",
                step >= 3 ? "bg-brand-blue-mid border-brand-blue-mid text-white" : "bg-white border-slate-200 text-slate-400"
              )}>
                3
              </span>
              <span className="text-xs font-600 text-slate-700 font-500">Konfirmasi</span>
            </div>
          </div>

          {/* Step content wrapper */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-4xl mx-auto">
            
            {/* STEP 1: Profile Form */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="p-8 lg:p-12 space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                    Langkah 1: Tentang Bisnis Anda
                  </h2>
                  <p className="text-xs text-slate-500">
                    Bantu kami menyesuaikan demo dengan membagikan informasi dasar profil tim Anda.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="demo-name" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        id="demo-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                        placeholder="e.g., John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="demo-email" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                      Email Bisnis
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        id="demo-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                        placeholder="e.g., john@company.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="demo-company" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                      Nama Perusahaan
                    </label>
                    <div className="relative">
                      <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        id="demo-company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                        placeholder="PT Perusahaan Digital"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="demo-role" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                      Jabatan Anda
                    </label>
                    <div className="relative">
                      <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        id="demo-role"
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                        placeholder="e.g., CTO, VP Ops, Developer"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="demo-employees" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                      Jumlah Karyawan
                    </label>
                    <select
                      id="demo-employees"
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="w-full h-10 px-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all cursor-pointer"
                    >
                      <option value="1-10">1 - 10 orang</option>
                      <option value="11-50">11 - 50 orang</option>
                      <option value="51-200">51 - 200 orang</option>
                      <option value="201-500">201 - 500 orang</option>
                      <option value="500+">Lebih dari 500 orang</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="demo-needs" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                      Fokus Utama Demo
                    </label>
                    <input
                      type="text"
                      id="demo-needs"
                      value={formData.needs}
                      onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                      className="w-full h-10 px-4 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all"
                      placeholder="e.g., Integrasi Slack, Keamanan data, kolaborasi tim"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg gap-2"
                  >
                    Pilih Waktu Demo <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Calendar Booking Mock */}
            {step === 2 && (
              <div className="p-8 lg:p-12 space-y-8">
                <div className="text-center">
                  <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                    Langkah 2: Pilih Hari & Jam Pertemuan
                  </h2>
                  <p className="text-xs text-slate-500">
                    Durasi pertemuan: 30 Menit. Diselenggarakan via Zoom / Google Meet.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Calendar Widget (span 7) */}
                  <div className="lg:col-span-7 border border-slate-200 rounded-xl p-5 bg-white">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                      <span className="text-sm font-bold text-slate-900">Juni 2026</span>
                      <div className="flex gap-1">
                        <button className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-40" disabled>
                          <ChevronLeft size={16} />
                        </button>
                        <button className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-40" disabled>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                      <span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
                    </div>

                    {/* Calendar grid mock */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {/* Blank spaces for offset (say, month starts on Monday) */}
                      <span></span>
                      {daysInMonth.map((day) => {
                        const isDisabled = disabledDays.includes(day);
                        const isSelected = selectedDay === day;
                        
                        return (
                          <button
                            key={day}
                            disabled={isDisabled}
                            onClick={() => setSelectedDay(day)}
                            className={cn(
                              "h-10 rounded-lg flex items-center justify-center text-xs font-600 transition-all focus:outline-none",
                              isDisabled 
                                ? "text-slate-300 cursor-not-allowed bg-slate-50" 
                                : isSelected 
                                  ? "bg-brand-blue-mid text-white shadow-sm font-700" 
                                  : "text-slate-700 hover:bg-slate-100 hover:border-slate-300 border border-transparent"
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots Widget (span 5) */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-xs font-700 uppercase tracking-wider text-slate-500">
                      {selectedDay ? `Slot waktu untuk 16 Juni` : "Pilih tanggal terlebih dahulu"}
                    </h3>

                    {selectedDay ? (
                      <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-1">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={cn(
                                "w-full py-2.5 px-4 text-xs font-600 rounded-lg border text-left transition-all flex items-center justify-between",
                                isSelected 
                                  ? "bg-brand-blue-tint text-brand-blue-mid border-brand-blue-mid font-700" 
                                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                              )}
                            >
                              <span>{slot}</span>
                              {isSelected && <Check size={14} className="text-brand-blue-mid" />}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs">
                        Silakan klik salah satu hari di kalender untuk menampilkan jam yang tersedia.
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="btn btn-ghost gap-1.5"
                  >
                    <ChevronLeft size={16} /> Kembali ke Profil
                  </button>
                  
                  <button
                    onClick={handleBookDemo}
                    disabled={!selectedDay || !selectedTimeSlot}
                    className="btn btn-primary btn-lg"
                  >
                    Konfirmasi & Jadwalkan
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Booking Success */}
            {step === 3 && (
              <div className="p-8 lg:p-12 text-center space-y-6 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto animate-scale-up">
                  <Check size={32} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
                    Pertemuan Anda Telah Terjadwal!
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Halo {formData.name}, kami telah mengirimkan link undangan kalender dan tautan video conference 
                    (Zoom/Meet) ke email Anda: <strong className="text-slate-800">{formData.email}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-left divide-y divide-slate-200 max-w-sm mx-auto text-xs space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 pb-3">
                    <Calendar size={16} className="text-brand-blue-mid shrink-0" />
                    <span>Selasa, 16 Juni 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 py-3">
                    <Clock size={16} className="text-brand-blue-mid shrink-0" />
                    <span>{selectedTimeSlot} (30 Menit)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 pt-3">
                    <Video size={16} className="text-brand-blue-mid shrink-0" />
                    <span>Google Meet (Tautan di email konfirmasi)</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="/"
                    className="btn btn-primary"
                  >
                    Kembali ke Beranda
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
