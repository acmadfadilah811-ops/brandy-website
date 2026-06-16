"use client";

import { useEffect, useRef } from "react";
import { Search, Settings, Rocket } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Pilih Produk yang Sesuai",
    desc: "Eksplorasi ekosistem produk Brandy dan pilih kombinasi yang paling sesuai dengan kebutuhan tim dan bisnis kamu.",
    visual: "Setup",
  },
  {
    num: "02",
    icon: Settings,
    title: "Setup dalam Hitungan Menit",
    desc: "Onboarding dipandu langkah demi langkah. Import data lama, undang tim, dan konfigurasikan workflow dalam waktu singkat.",
    visual: "Configure",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Mulai Tumbuh Bersama",
    desc: "Pantau performa, otomatiskan tugas berulang, dan ambil keputusan berdasarkan data real-time. Brandy berkembang bersama bisnismu.",
    visual: "Grow",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-padding"
      style={{ background: "var(--slate-50)" }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <span className="badge badge-blue mb-4" style={{ display: "inline-flex" }}>
            Cara Kerja
          </span>
          <h2 className="text-heading-xl mb-4" id="how-it-works-heading">
            Mulai dalam{" "}
            <span style={{ color: "var(--brand-blue-deep)" }}>3 Langkah Mudah</span>
          </h2>
          <p className="text-body-lg" style={{ color: "var(--slate-600)" }}>
            Tidak perlu keahlian teknis. Brandy dirancang untuk semua orang di tim kamu.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`reveal delay-${(i + 1) * 100} relative`}
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-0 h-[1px]"
                    style={{
                      background: "linear-gradient(90deg, var(--brand-blue-deep), var(--brand-blue-tint))",
                      zIndex: 0,
                    }}
                    aria-hidden="true"
                  />
                )}

                <div className="relative text-center">
                  {/* Step number + icon */}
                  <div className="flex flex-col items-center mb-5">
                    <div
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-2"
                      style={{
                        background: "linear-gradient(135deg, var(--brand-blue-deep), var(--brand-purple-mid))",
                        boxShadow: "var(--shadow-blue)",
                      }}
                    >
                      <Icon size={24} strokeWidth={1.5} color="white" />
                      {/* Number badge */}
                      <span
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: "var(--amber)",
                          color: "white",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-heading-sm mb-3">{step.title}</h3>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--slate-600)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <ButtonLink
            href="/demo"
            variant="primary"
            size="lg"
            id="how-it-works-cta"
          >
            Coba Sekarang — Gratis 14 Hari
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
