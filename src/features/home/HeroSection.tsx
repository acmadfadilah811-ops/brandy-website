"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Play } from "lucide-react";

/**
 * Hero Section — PRD2 Bab 6.1
 * Dark radial gradient bg, animated float shapes, large display headline,
 * amber CTA + ghost secondary, social proof bar, dashboard preview
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  /* Parallax on scroll */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bg = hero.querySelector<HTMLElement>(".hero-bg-layer");
      if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "calc(100vh - 64px)",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, #1A3A8F 0%, #0F172A 70%)",
      }}
      aria-label="Hero section"
    >
      {/* ── Background parallax layer ── */}
      <div className="hero-bg-layer absolute inset-0" aria-hidden="true">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating abstract shapes */}
        <div
          className="animate-float absolute"
          style={{
            top: "15%", left: "5%",
            width: "500px", height: "500px",
            borderRadius: "60% 40% 70% 30%",
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDelay: "0s",
            animationDuration: "12s",
          }}
        />
        <div
          className="animate-float absolute"
          style={{
            top: "40%", right: "8%",
            width: "400px", height: "400px",
            borderRadius: "40% 60% 30% 70%",
            background: "radial-gradient(circle, rgba(180,83,9,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "3s",
            animationDuration: "10s",
          }}
        />
        <div
          className="animate-float absolute"
          style={{
            bottom: "20%", left: "35%",
            width: "350px", height: "350px",
            borderRadius: "50% 50% 40% 60%",
            background: "radial-gradient(circle, rgba(91,141,239,0.1) 0%, transparent 70%)",
            filter: "blur(70px)",
            animationDelay: "6s",
            animationDuration: "14s",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="container-brand relative z-10 py-24 w-full">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Badge pill */}
          <div
            className="animate-fade-in-up mb-8"
            style={{ animationFillMode: "both" }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(180,83,9,0.12)",
                color: "var(--amber-light)",
                border: "1px solid rgba(180,83,9,0.3)",
              }}
            >
              <span>✦</span>
              <span>Platform SaaS #1 untuk Tim Indonesia</span>
              <span>✦</span>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-display-2xl text-white mb-6 animate-fade-in-up delay-100"
            style={{ animationFillMode: "both" }}
          >
            Satu Platform untuk{" "}
            <span
              className="text-gradient-blue"
              style={{
                background: "linear-gradient(135deg, #5B8DEF, #C4B5FD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Semua Kebutuhan
            </span>{" "}
            Bisnis Modern
          </h1>

          {/* Sub-headline */}
          <p
            className="text-body-xl max-w-xl mb-10 animate-fade-in-up delay-200"
            style={{
              color: "var(--slate-400)",
              animationFillMode: "both",
            }}
          >
            Kelola tim, data, dan pelanggan dalam satu ekosistem terintegrasi.
            Mulai gratis, scale tanpa batas.
          </p>

          {/* CTA Group */}
          <div
            className="flex flex-col sm:flex-row items-center gap-3 mb-10 animate-fade-in-up delay-300"
            style={{ animationFillMode: "both" }}
          >
            <ButtonLink
              href="/demo"
              variant="amber"
              size="xl"
              id="hero-cta-mulai-gratis"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Mulai Gratis 14 Hari
            </ButtonLink>
            <ButtonLink
              href="#how-it-works"
              variant="outline-white"
              size="xl"
              id="hero-cta-lihat-demo"
              icon={<Play size={16} />}
              iconPosition="left"
            >
              Lihat Demo
            </ButtonLink>
          </div>

          {/* Social proof bar */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-16 animate-fade-in-up delay-400"
            style={{
              color: "var(--slate-400)",
              fontSize: "14px",
              animationFillMode: "both",
            }}
          >
            {[
              "12,000+ perusahaan",
              "99.9% uptime",
              "Rated 4.9/5",
            ].map((stat, i) => (
              <span key={stat} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    className="hidden sm:inline"
                    style={{ color: "rgba(148,163,184,0.3)" }}
                  >
                    |
                  </span>
                )}
                <span>{stat}</span>
              </span>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div
            className="w-full max-w-4xl animate-fade-in-up delay-500"
            style={{
              animationFillMode: "both",
              perspective: "1500px",
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                transform: "rotateX(8deg)",
                transformOrigin: "center top",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              {/* Browser chrome mock */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: "rgba(15,23,42,0.95)" }}
              >
                <div className="flex gap-1.5">
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((color) => (
                    <div
                      key={color}
                      className="w-3 h-3 rounded-full"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                <div
                  className="flex-1 mx-4 h-6 rounded-md flex items-center justify-center text-xs"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "var(--slate-400)",
                    letterSpacing: "0.02em",
                  }}
                >
                  app.brandy.id/dashboard
                </div>
              </div>

              {/* Dashboard content mockup */}
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard Mockup                                                    */
/* ------------------------------------------------------------------ */
function DashboardMockup() {
  const metrics = [
    { label: "Total Revenue", value: "Rp 2.4M", change: "+18%", up: true },
    { label: "Active Users", value: "12,847", change: "+7%", up: true },
    { label: "Conversions", value: "3.6%", change: "+0.4%", up: true },
    { label: "Churn Rate", value: "0.8%", change: "-0.2%", up: false },
  ];

  return (
    <div
      className="p-6"
      style={{ background: "var(--slate-800)", minHeight: "360px" }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs" style={{ color: "var(--slate-400)" }}>
            Dashboard Overview
          </p>
          <p className="text-base font-600 text-white">Juni 2025</p>
        </div>
        <div className="flex gap-2">
          {["7 Hari", "30 Hari", "90 Hari"].map((t, i) => (
            <span
              key={t}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{
                background: i === 1 ? "var(--brand-blue-deep)" : "rgba(255,255,255,0.06)",
                color: i === 1 ? "white" : "var(--slate-400)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--slate-400)" }}>
              {m.label}
            </p>
            <p
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {m.value}
            </p>
            <span
              className="text-xs font-medium"
              style={{ color: m.up ? "var(--teal)" : "var(--red)" }}
            >
              {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Chart mockup */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 95, 70, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background:
                  i === 10
                    ? "var(--amber)"
                    : `linear-gradient(to top, var(--brand-blue-deep), var(--brand-blue-light))`,
                opacity: i === 10 ? 1 : 0.7,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((m) => (
            <span key={m} className="text-xs" style={{ color: "var(--slate-400)" }}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
