"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Star, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ClientLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Silakan masukkan email dan password Anda.");
      setLoading(false);
      return;
    }

    // Prototype bypass for client login
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Save session cookie
      document.cookie = "brandy-user-session=true; path=/; max-age=3600; SameSite=Strict";
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-950 text-white font-sans overflow-hidden">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 text-xs font-600 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} /> Kembali ke Beranda
      </Link>

      {/* Left Column - Form (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-12 relative z-10 bg-slate-950 border-r border-slate-900">
        <div className="my-auto max-w-sm w-full mx-auto space-y-8">
          <div>
            <Image
              src="/logo_brandy_full_light.png"
              alt="Brandy Logo"
              width={130}
              height={32}
              className="h-8 w-auto object-contain mb-8"
            />
            <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Selamat datang kembali
            </h1>
            <p className="text-xs text-slate-400">
              Masuk untuk mengakses workspace Brandy dan data bisnis Anda
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="p-6 bg-teal-500/10 border border-teal-500/20 rounded-xl text-center space-y-2 animate-scale-in">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
                <LogIn size={20} />
              </div>
              <h3 className="text-sm font-bold text-white">Login Berhasil!</h3>
              <p className="text-xs text-slate-450">Mempersiapkan workspace Anda...</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-600 uppercase tracking-wider text-slate-400 mb-2">
                  Alamat Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                    <Mail size={16} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue-mid focus:ring-1 focus:ring-brand-blue-mid/30 transition-all placeholder:text-slate-650"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-xs font-600 uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  <a href="#" className="text-[10px] text-brand-blue-light hover:underline">Lupa password?</a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                    <Lock size={16} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password Anda"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue-mid focus:ring-1 focus:ring-brand-blue-mid/30 transition-all placeholder:text-slate-650"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full justify-center text-xs h-10 font-600"
                >
                  Masuk ke Akun
                </Button>
              </div>
            </form>
          )}

          <div className="text-center text-xs text-slate-500">
            Belum memiliki akun?{" "}
            <Link href="/demo" className="text-brand-blue-light font-500 hover:underline">
              Coba gratis sekarang
            </Link>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-600">
          © {new Date().getFullYear()} Brandy Technologies. Seluruh hak cipta dilindungi.
        </div>
      </div>

      {/* Right Column - Decorative Premium Showcase (7 cols) */}
      <div 
        className="hidden lg:col-span-7 lg:flex flex-col justify-between p-16 relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 70% 30%, #1e1b4b 0%, #020617 70%)"
        }}
      >
        {/* Animated Glow Elements */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-blue-mid/10 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-brand-purple-mid/10 blur-3xl animate-pulse pointer-events-none" />
        
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 self-end bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-4 flex items-center gap-2 text-xs">
          <Star size={14} className="fill-amber text-amber" />
          <span>Direkomendasikan oleh <strong>10,000+</strong> tim bisnis global</span>
        </div>

        <div className="my-auto max-w-lg space-y-6 relative z-10">
          <h2 
            className="text-display-sm font-bold leading-tight" 
            style={{ fontFamily: "var(--font-heading)", background: "linear-gradient(to right, #ffffff, var(--slate-400))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Akselerasi Pertumbuhan & Produktivitas Bisnis Anda
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Kelola proyek, pantau analitik real-time, dan hubungkan pelanggan Anda dalam satu platform yang aman, cepat, dan modern.
          </p>

          {/* Quick Mock Dashboard Widget */}
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <span className="text-xs font-700 text-slate-350">Workspace Overview</span>
              <span className="text-[10px] text-teal bg-teal/10 px-2 py-0.5 rounded-full font-600">Active</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-900">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 mb-1">MEMBER</span>
                <span className="text-sm font-700">14 Active</span>
              </div>
              <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-900">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 mb-1">TASK DONE</span>
                <span className="text-sm font-700 text-teal">94.8%</span>
              </div>
              <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-900">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 mb-1">ROI STATUS</span>
                <span className="text-sm font-700 text-amber">+32.4%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 relative z-10">
          Butuh bantuan? <a href="/help" className="text-slate-400 hover:text-white hover:underline">Hubungi Support</a>
        </div>
      </div>
    </div>
  );
}
