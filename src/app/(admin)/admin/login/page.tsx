"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic Client-Side Validation
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      setLoading(false);
      return;
    }

    // Prototype Bypass Check
    if (email === "admin@brandy.id" && password === "brandy123") {
      document.cookie = "brandy-mock-admin-session=true; path=/; max-age=28800; SameSite=Strict";
      router.push("/admin/dashboard");
      router.refresh();
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === "Invalid login credentials"
          ? "Email atau password salah."
          : authError.message
        );
        setLoading(false);
        return;
      }

      // Successful login
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError("Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.");
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-slate-50 relative px-4 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }}
    >
      {/* Decorative Blur Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-blue-mid/10 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-brand-blue-mid/10 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-blue-tint border border-brand-blue-light/30 flex items-center justify-center text-brand-blue-mid">
              <ShieldCheck size={28} />
            </div>
          </div>
          <h1 
            className="text-heading-lg font-bold text-slate-900 tracking-tight mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Brandy Admin Panel
          </h1>
          <p className="text-xs text-slate-500">
            Masuk untuk mengelola seluruh data website
          </p>
        </div>

        {error && (
          <div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-error-red flex items-start gap-2.5"
            role="alert"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label 
              htmlFor="email" 
              className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all duration-200"
              placeholder="admin@brandy.id"
              autoComplete="email"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all duration-200"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Masuk Ke Dashboard
            </Button>
          </div>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-slate-100">
          <a 
            href="/" 
            className="text-xs font-500 text-slate-500 hover:text-brand-blue-mid transition-colors inline-flex items-center gap-1"
          >
            ← Kembali ke Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
