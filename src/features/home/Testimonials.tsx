"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  color: string;
  featured: boolean;
  caseStudyUrl?: string;
  revenueIncrease?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "Brandy benar-benar mengubah cara kami bekerja. Pipeline penjualan yang tadinya manual dan kacau, sekarang berjalan otomatis dan terukur. Revenue kami naik 40% dalam 3 bulan pertama.",
    name: "Dewi Rahayu",
    title: "VP Sales",
    company: "PT Maju Bersama",
    initials: "DR",
    color: "var(--brand-blue-mid)",
    featured: true,
    caseStudyUrl: "/customers/maju-bersama",
    revenueIncrease: "+40%",
  },
  {
    id: "t2",
    quote:
      "Setup-nya cepat, tim kami langsung bisa pakai tanpa training panjang. Customer support Brandy juga sangat responsif.",
    name: "Rendra Kusuma",
    title: "CTO",
    company: "Startup Nusantara",
    initials: "RK",
    color: "var(--amber)",
    featured: false,
  },
  {
    id: "t3",
    quote:
      "Data analytics dari Brandy membantu kami memahami perilaku pelanggan secara mendalam. Keputusan marketing kami jadi jauh lebih tepat sasaran.",
    name: "Sari Indah",
    title: "Head of Marketing",
    company: "Digital Nesia",
    initials: "SI",
    color: "var(--teal)",
    featured: false,
  },
  {
    id: "t4",
    quote:
      "Integrasi dengan tools yang sudah kami pakai (Slack, Google Workspace) berjalan mulus. Tidak ada disruption sama sekali saat migrasi.",
    name: "Budi Santoso",
    title: "Operations Director",
    company: "Logistik Prima",
    initials: "BS",
    color: "var(--brand-purple-mid)",
    featured: false,
    caseStudyUrl: "/customers/logistik-prima",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [list, setList] = useState<TestimonialItem[]>(defaultTestimonials);

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.testimonials) {
          setList(data.testimonials);
        }
      })
      .catch((err) => console.error("Error loading testimonials data", err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [list]);

  const featured = list.find((t) => t.featured) || list[0];
  const others = list.filter((t) => t.id !== featured.id);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-dark section-padding"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 reveal">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-600 uppercase tracking-widest mb-4"
            style={{
              background: "rgba(180,83,9,0.15)",
              color: "var(--amber-light)",
              border: "1px solid rgba(180,83,9,0.25)",
            }}
          >
            Cerita Pelanggan
          </span>
          <h2 className="text-heading-xl mb-4 text-white" id="testimonials-heading">
            Dipercaya oleh Tim{" "}
            <span style={{ color: "var(--amber-light)" }}>Terbaik Indonesia</span>
          </h2>
          <p style={{ color: "var(--slate-400)" }} className="text-body-lg">
            Lebih dari 12,000 perusahaan telah merasakan perbedaannya.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="mb-6 reveal">
          <TestimonialCardFeatured t={featured} />
        </div>

        {/* Others — 3 column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {others.map((t, i) => (
            <TestimonialCard
              key={t.id}
              t={t}
              className={`reveal delay-${(i + 1) * 100}`}
            />
          ))}
        </div>

        {/* Link to customers */}
        <div className="text-center reveal">
          <Link
            href="/customers"
            className="inline-flex items-center gap-2 text-sm font-600 transition-colors"
            style={{ color: "var(--amber-light)" }}
          >
            Baca semua studi kasus →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Featured card */
function TestimonialCardFeatured({ t }: { t: TestimonialItem }) {
  return (
    <div
      className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Decorative quote */}
      <span
        className="absolute -top-4 -left-2 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "200px",
          lineHeight: 1,
          color: "white",
          opacity: 0.05,
        }}
        aria-hidden="true"
      >
        "
      </span>

      <div className="relative md:flex md:items-start md:gap-12">
        <blockquote className="flex-1 mb-6 md:mb-0">
          <p
            className="text-pull-quote text-white mb-6 leading-snug"
          >
            "{t.quote}"
          </p>
          <div className="flex items-center gap-4">
            <Avatar name={t.name} initials={t.initials} color={t.color} size="lg" />
            <div>
              <p className="text-base font-700 text-white">{t.name}</p>
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                {t.title} · {t.company}
              </p>
              {t.caseStudyUrl && (
                <Link
                  href={t.caseStudyUrl}
                  className="text-xs font-600 mt-1 inline-flex items-center gap-1"
                  style={{ color: "var(--amber-light)" }}
                >
                  Baca studi kasus →
                </Link>
              )}
            </div>
          </div>
        </blockquote>

        {/* Accent stat */}
        {t.revenueIncrease && (
          <div className="shrink-0 text-center md:text-right">
            <p
              className="text-display-lg"
              style={{ fontFamily: "var(--font-display)", color: "var(--amber-light)" }}
            >
              {t.revenueIncrease}
            </p>
            <p className="text-sm" style={{ color: "var(--slate-400)" }}>
              pertumbuhan revenue
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* Small card */
function TestimonialCard({
  t,
  className,
}: {
  t: TestimonialItem;
  className?: string;
}) {
  return (
    <div
      className={`card-testimonial ${className}`}
    >
      {/* Decorative quote */}
      <span
        className="absolute top-4 right-6 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "120px",
          lineHeight: 1,
          color: "white",
          opacity: 0.06,
        }}
        aria-hidden="true"
      >
        "
      </span>

      <blockquote className="relative">
        <p
          className="text-body-md text-white leading-relaxed mb-6"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          "{t.quote}"
        </p>
        <div className="flex items-center gap-3">
          <Avatar name={t.name} initials={t.initials} color={t.color} size="md" />
          <div>
            <p className="text-sm font-700 text-white">{t.name}</p>
            <p className="text-xs" style={{ color: "var(--slate-400)" }}>
              {t.title} · {t.company}
            </p>
          </div>
        </div>
        {t.caseStudyUrl && (
          <Link
            href={t.caseStudyUrl}
            className="inline-flex items-center gap-1 mt-4 text-xs font-600"
            style={{ color: "var(--amber-light)" }}
          >
            Studi kasus →
          </Link>
        )}
      </blockquote>
    </div>
  );
}

/* Avatar */
function Avatar({
  name,
  initials,
  color,
  size,
}: {
  name: string;
  initials: string;
  color: string;
  size: "md" | "lg";
}) {
  const dim = size === "lg" ? "48px" : "40px";
  const fontSize = size === "lg" ? "16px" : "14px";
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold"
      style={{
        width: dim,
        height: dim,
        background: color,
        color: "white",
        fontSize,
        fontFamily: "var(--font-heading)",
      }}
      aria-label={`Avatar ${name}`}
    >
      {initials}
    </div>
  );
}
