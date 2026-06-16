"use client";

/**
 * Trusted By — Logo marquee bar
 * PRD2 Bab 9.1: grayscale logos, marquee scroll mobile, static desktop
 */

const logos = [
  { name: "Tokopedia", abbr: "TPDIA" },
  { name: "Gojek", abbr: "GJEK" },
  { name: "Traveloka", abbr: "TRVLK" },
  { name: "Bukalapak", abbr: "BKLPK" },
  { name: "OVO", abbr: "OVO" },
  { name: "Ruangguru", abbr: "RG" },
  { name: "Shopee", abbr: "SHPE" },
  { name: "Tiket.com", abbr: "TKT" },
];

export default function TrustedBy() {
  return (
    <section
      className="py-10"
      style={{
        background: "var(--white)",
        borderTop: "1px solid var(--slate-100)",
        borderBottom: "1px solid var(--slate-100)",
      }}
      aria-label="Dipercaya oleh perusahaan terkemuka"
    >
      <div className="container-brand">
        {/* Label */}
        <p
          className="text-center text-xs font-600 uppercase tracking-widest mb-6"
          style={{ color: "var(--slate-400)", letterSpacing: "0.08em" }}
        >
          Dipercaya oleh 12,000+ perusahaan di Indonesia
        </p>

        {/* Mobile: Marquee */}
        <div className="relative overflow-hidden md:hidden">
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
            {[...logos, ...logos].map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} name={logo.name} abbr={logo.abbr} />
            ))}
          </div>
        </div>

        {/* Desktop: Static grid */}
        <div className="hidden md:flex items-center justify-center gap-10 flex-wrap">
          {logos.map((logo) => (
            <LogoItem key={logo.name} name={logo.name} abbr={logo.abbr} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div
      className="inline-flex items-center justify-center shrink-0 mx-6 md:mx-0"
      style={{ height: "28px" }}
      title={name}
    >
      {/* Placeholder logo — will be replaced with actual SVG logos */}
      <span
        className="text-sm font-bold tracking-wide select-none transition-all duration-300"
        style={{
          color: "var(--slate-400)",
          filter: "grayscale(100%)",
          opacity: 0.5,
          fontFamily: "var(--font-heading)",
          letterSpacing: "0.05em",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "1";
          (e.currentTarget as HTMLElement).style.color = "var(--slate-700)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "0.5";
          (e.currentTarget as HTMLElement).style.color = "var(--slate-400)";
        }}
      >
        {name}
      </span>
    </div>
  );
}
