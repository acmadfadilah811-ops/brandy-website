"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  LayoutGrid, BarChart3, Users, Zap, MessageSquare, Bell,
} from "lucide-react";

/**
 * Feature Highlights — Bento Grid
 * PRD2 Bab 9.2: Bento grid (NOT 3 identical columns), different accent colors per card
 */

const features = [
  {
    id: "workspace",
    icon: LayoutGrid,
    title: "Workspace Terintegrasi",
    desc: "Kelola proyek, tugas, dan kolaborasi tim dalam satu tampilan yang terorganisir. Tidak perlu berpindah-pindah aplikasi.",
    accent: "var(--brand-blue-deep)",
    accentBg: "var(--brand-blue-tint)",
    size: "large", // span 2 columns
    href: "/products/workspace",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics Real-time",
    desc: "Ambil keputusan lebih cepat dengan data yang selalu up-to-date.",
    accent: "var(--amber)",
    accentBg: "rgba(180,83,9,0.08)",
    size: "small",
    href: "/products/analytics",
  },
  {
    id: "crm",
    icon: Users,
    title: "CRM Cerdas",
    desc: "Pipeline penjualan yang intuitif dengan AI scoring otomatis.",
    accent: "var(--teal)",
    accentBg: "rgba(15,118,110,0.08)",
    size: "small",
    href: "/products/crm",
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automation Workflow",
    desc: "Otomatiskan pekerjaan berulang dan fokus pada hal yang benar-benar penting.",
    accent: "var(--brand-purple-mid)",
    accentBg: "rgba(124,58,237,0.08)",
    size: "small",
    href: "/products/automation",
  },
  {
    id: "support",
    icon: MessageSquare,
    title: "Customer Support",
    desc: "Sistem tiket yang powerful dengan chatbot AI untuk respons 24/7.",
    accent: "var(--brand-blue-mid)",
    accentBg: "rgba(37,99,235,0.08)",
    size: "small",
    href: "/products/support",
  },
  {
    id: "notify",
    icon: Bell,
    title: "Smart Notifications",
    desc: "Kirim pesan ke jutaan pengguna dengan personalisasi tinggi.",
    accent: "var(--amber)",
    accentBg: "rgba(180,83,9,0.08)",
    size: "small",
    href: "/products/notify",
  },
];

export default function FeatureHighlights() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const large = features.find((f) => f.size === "large")!;
  const smalls = features.filter((f) => f.size === "small");

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding"
      style={{ background: "var(--white)" }}
      aria-labelledby="features-heading"
    >
      <div className="container-brand">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span
            className="badge badge-amber mb-4"
            style={{ display: "inline-flex" }}
          >
            ✦ Fitur Unggulan
          </span>
          <h2 className="text-heading-xl mb-4" id="features-heading">
            Semua yang Kamu Butuhkan,{" "}
            <span style={{ color: "var(--brand-blue-deep)" }}>
              Dalam Satu Platform
            </span>
          </h2>
          <p className="text-body-lg" style={{ color: "var(--slate-600)" }}>
            Dari manajemen proyek hingga analitik bisnis, Brandy menyediakan
            ekosistem lengkap yang dirancang untuk pertumbuhan.
          </p>
        </div>

        {/* Bento Grid — Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large card (span 2) */}
          <FeatureCard
            feature={large}
            className="md:col-span-2 reveal"
            large
          />

          {/* Small cards */}
          {smalls.slice(0, 4).map((f, i) => (
            <FeatureCard
              key={f.id}
              feature={f}
              className={`reveal delay-${(i + 1) * 100}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 reveal">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-600 transition-colors duration-150"
            style={{ color: "var(--brand-blue-mid)" }}
          >
            Lihat Semua Fitur →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Card                                                        */
/* ------------------------------------------------------------------ */
function FeatureCard({
  feature,
  className = "",
  large = false,
}: {
  feature: (typeof features)[0];
  className?: string;
  large?: boolean;
}) {
  const Icon = feature.icon;

  return (
    <Link
      href={feature.href}
      className={`card-feature group block ${className}`}
      style={{
        borderLeft: `3px solid ${feature.accent}`,
      }}
    >
      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
        style={{
          background: feature.accentBg,
          color: feature.accent,
        }}
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>

      {/* Text */}
      <h3
        className="mb-2"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: large ? "var(--text-heading-sm)" : "20px",
          fontWeight: 600,
          color: "var(--slate-950)",
        }}
      >
        {feature.title}
      </h3>
      <p
        className="text-body-md leading-relaxed"
        style={{
          color: "var(--slate-600)",
          display: "-webkit-box",
          WebkitLineClamp: large ? 4 : 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {feature.desc}
      </p>

      {/* Arrow on hover */}
      <span
        className="inline-flex items-center gap-1 mt-3 text-sm font-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: feature.accent }}
        aria-hidden="true"
      >
        Pelajari lebih →
      </span>
    </Link>
  );
}
