import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

/**
 * CTA Banner — Bottom dark section
 * PRD2 Bab 7.2: Dark section for homepage bottom CTA
 * Bold single sentence + amber CTA
 */
export default function CTABanner() {
  return (
    <section
      id="cta-bottom"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--brand-blue-deep) 0%, var(--brand-purple-deep) 100%)",
        padding: "var(--space-24) 0",
      }}
      aria-labelledby="cta-banner-heading"
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
        aria-hidden="true"
      />

      {/* Decorative circles */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(180,83,9,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(91,141,239,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="container-brand relative z-10 text-center">
        {/* Eyebrow */}
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-600 uppercase tracking-widest mb-6"
          style={{
            background: "rgba(180,83,9,0.2)",
            color: "var(--amber-light)",
            border: "1px solid rgba(180,83,9,0.3)",
          }}
        >
          ✦ Mulai Hari Ini
        </span>

        {/* Headline */}
        <h2
          className="text-display-xl text-white mb-6 max-w-3xl mx-auto"
          id="cta-banner-heading"
        >
          Siap Membawa Bisnis Kamu ke{" "}
          <span style={{ color: "var(--amber-light)" }}>Level Berikutnya?</span>
        </h2>

        <p
          className="text-body-xl mb-10 max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Bergabung dengan 12,000+ tim yang telah mempercayakan operasional
          bisnis mereka kepada Brandy.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ButtonLink
            href="/demo"
            variant="amber"
            size="xl"
            id="cta-banner-mulai-gratis"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Mulai Gratis 14 Hari
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline-white"
            size="xl"
            id="cta-banner-hubungi-sales"
          >
            Hubungi Sales
          </ButtonLink>
        </div>

        {/* Fine print */}
        <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.45)" }}>
          Tidak perlu kartu kredit · Setup 5 menit · Cancel kapan saja
        </p>
      </div>
    </section>
  );
}
