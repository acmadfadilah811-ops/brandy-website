"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Pricing Teaser — PRD2 Bab 9.3
 * Pill toggle bulanan/tahunan, 3 cards (plain / popular border-blue / dark enterprise),
 * Bricolage price number, teal checkmark
 */

const plans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 299000,
    yearlyPrice: 239000,
    desc: "Untuk tim kecil yang baru memulai digitalisasi",
    features: [
      { label: "Hingga 5 pengguna", included: true },
      { label: "3 produk Brandy", included: true },
      { label: "5 GB storage", included: true },
      { label: "Email support", included: true },
      { label: "Analytics dasar", included: true },
      { label: "Custom domain", included: false },
      { label: "API access", included: false },
      { label: "Priority support", included: false },
    ],
    ctaLabel: "Mulai Gratis 14 Hari",
    ctaUrl: "/demo",
    isPopular: false,
    isDark: false,
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 799000,
    yearlyPrice: 639000,
    desc: "Untuk tim yang sedang berkembang dan butuh lebih",
    features: [
      { label: "Hingga 25 pengguna", included: true },
      { label: "Semua produk Brandy", included: true },
      { label: "50 GB storage", included: true },
      { label: "Email & chat support", included: true },
      { label: "Analytics lengkap", included: true },
      { label: "Custom domain", included: true },
      { label: "API access", included: true },
      { label: "Priority support", included: false },
    ],
    ctaLabel: "Mulai Gratis 14 Hari",
    ctaUrl: "/demo",
    isPopular: true,
    isDark: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    desc: "Solusi khusus untuk perusahaan besar",
    features: [
      { label: "Pengguna tidak terbatas", included: true },
      { label: "Semua produk Brandy", included: true },
      { label: "Storage tidak terbatas", included: true },
      { label: "Dedicated support manager", included: true },
      { label: "Analytics & custom reports", included: true },
      { label: "Custom domain & SSO", included: true },
      { label: "API access penuh", included: true },
      { label: "SLA 99.99% uptime", included: true },
    ],
    ctaLabel: "Hubungi Sales",
    ctaUrl: "/contact",
    isPopular: false,
    isDark: true,
  },
];

export default function PricingTeaser() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-padding"
      style={{ background: "var(--slate-50)" }}
      aria-labelledby="pricing-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 reveal">
          <span className="badge badge-amber mb-4" style={{ display: "inline-flex" }}>
            Pricing
          </span>
          <h2 className="text-heading-xl mb-4" id="pricing-heading">
            Harga yang Transparan,{" "}
            <span style={{ color: "var(--brand-blue-deep)" }}>Tidak Ada Biaya Tersembunyi</span>
          </h2>
          <p className="text-body-lg" style={{ color: "var(--slate-600)" }}>
            Mulai gratis 14 hari, tidak perlu kartu kredit.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-10 reveal">
          <span
            className="text-sm font-medium"
            style={{ color: billing === "monthly" ? "var(--slate-950)" : "var(--slate-400)" }}
          >
            Bulanan
          </span>
          <button
            id="billing-toggle"
            role="switch"
            aria-checked={billing === "yearly"}
            aria-label="Toggle billing period"
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex items-center cursor-pointer rounded-full transition-colors duration-200"
            style={{
              width: "52px",
              height: "28px",
              background: billing === "yearly" ? "var(--brand-blue-deep)" : "var(--slate-200)",
            }}
          >
            <span
              className="inline-block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
              style={{
                transform: billing === "yearly" ? "translateX(26px)" : "translateX(4px)",
              }}
            />
          </button>
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-medium"
              style={{ color: billing === "yearly" ? "var(--slate-950)" : "var(--slate-400)" }}
            >
              Tahunan
            </span>
            <span
              className="badge badge-amber text-xs"
              style={{ padding: "2px 8px" }}
            >
              Hemat 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan, i) => {
            const price =
              billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col reveal",
                  `delay-${(i + 1) * 100}`
                )}
                style={{
                  background: plan.isDark ? "var(--slate-950)" : "var(--white)",
                  border: plan.isPopular
                    ? "2px solid var(--brand-blue-mid)"
                    : plan.isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid var(--slate-200)",
                  ...(plan.isPopular && { paddingTop: "32px" }),
                }}
              >
                {/* Popular badge */}
                {plan.isPopular && (
                  <span
                    className="absolute -top-3 right-6 badge badge-popular"
                    style={{ fontSize: "11px" }}
                  >
                    Most Popular
                  </span>
                )}

                {/* Plan info */}
                <div className="mb-5">
                  <h3
                    className="text-heading-sm mb-1"
                    style={{ color: plan.isDark ? "white" : "var(--slate-950)" }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="text-body-sm"
                    style={{ color: plan.isDark ? "var(--slate-400)" : "var(--slate-600)" }}
                  >
                    {plan.desc}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {price !== null ? (
                    <>
                      <span
                        className="text-display-lg block leading-none"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          color: plan.isDark ? "white" : "var(--slate-950)",
                        }}
                      >
                        {formatPrice(price)}
                      </span>
                      <span
                        className="text-body-sm"
                        style={{ color: "var(--slate-400)" }}
                      >
                        /pengguna/bulan
                        {billing === "yearly" && " · dibayar tahunan"}
                      </span>
                    </>
                  ) : (
                    <span
                      className="text-heading-lg block leading-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "white",
                      }}
                    >
                      Custom
                    </span>
                  )}
                </div>

                {/* CTA */}
                <ButtonLink
                  href={plan.ctaUrl}
                  variant={plan.isDark ? "outline-white" : plan.isPopular ? "primary" : "secondary"}
                  size="md"
                  className="w-full justify-center mb-6"
                  id={`pricing-cta-${plan.id}`}
                >
                  {plan.ctaLabel}
                </ButtonLink>

                {/* Feature list */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat.label} className="flex items-center gap-2.5">
                      {feat.included ? (
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          style={{ color: "var(--teal)", flexShrink: 0 }}
                          aria-hidden="true"
                        />
                      ) : (
                        <Minus
                          size={16}
                          strokeWidth={2}
                          style={{ color: "var(--slate-200)", flexShrink: 0 }}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="text-body-sm"
                        style={{
                          color: feat.included
                            ? plan.isDark
                              ? "rgba(255,255,255,0.8)"
                              : "var(--slate-700)"
                            : "var(--slate-400)",
                        }}
                      >
                        {feat.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Link to full pricing */}
        <div className="text-center reveal">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-600 transition-colors"
            style={{ color: "var(--brand-blue-mid)" }}
          >
            Lihat perbandingan fitur lengkap →
          </Link>
        </div>
      </div>
    </section>
  );
}
