"use client";

import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Youtube, Github } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const footerLinks = [
  {
    title: "Products",
    links: [
      { label: "Brandy Workspace", href: "/products/workspace" },
      { label: "Brandy Analytics", href: "/products/analytics" },
      { label: "Brandy CRM", href: "/products/crm" },
      { label: "Brandy Support", href: "/products/support" },
      { label: "Brandy Automation", href: "/products/automation" },
      { label: "Semua Produk", href: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Tentang Kami", href: "/about" },
      { label: "Karir", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Pelanggan", href: "/customers" },
      { label: "Mitra", href: "/partners" },
      { label: "Press Kit", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Dokumentasi", href: "/docs" },
      { label: "Integrasi", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
      { label: "API Reference", href: "/api-reference" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Bantuan & FAQ", href: "/help" },
      { label: "Hubungi Kami", href: "/contact" },
      { label: "Jadwalkan Demo", href: "/demo" },
      { label: "Kebijakan Privasi", href: "/legal/privacy" },
      { label: "Syarat & Ketentuan", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/brandyid" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/brandyid" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/brandyid" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@brandyid" },
  { icon: Github, label: "GitHub", href: "https://github.com/brandyid" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--slate-950)",
        color: "var(--white)",
      }}
      aria-label="Footer"
    >
      {/* Brand-blue decorative line at top */}
      <div
        className="absolute top-0 inset-x-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, var(--brand-blue-deep), var(--brand-purple-mid), var(--amber))",
        }}
        aria-hidden="true"
      />

      {/* Main footer content */}
      <div className="container-brand pt-16 pb-12">

        {/* Top Row: Logo + Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-12 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center mb-4" aria-label="Brandy — Beranda">
              <Image
                src="/logo_brandy_full_light.png"
                alt="Brandy Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--slate-400)" }}>
              Platform SaaS terkemuka yang membantu bisnis modern meningkatkan
              produktivitas dan efisiensi operasional dengan solusi cloud yang canggih.
            </p>

            {/* Contact info */}
            <div className="mt-5 space-y-2">
              {[
                { icon: MapPin, text: "Jakarta Selatan, Indonesia" },
                { icon: Mail, text: "hello@brandy.id" },
                { icon: Phone, text: "+62 21 1234 5678" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={13} strokeWidth={1.5} style={{ color: "var(--slate-400)" }} aria-hidden="true" />
                  <span className="text-xs" style={{ color: "var(--slate-400)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-sm w-full">
            <h3
              className="text-sm font-700 uppercase tracking-widest mb-1"
              style={{ color: "var(--slate-400)", letterSpacing: "0.1em" }}
            >
              Newsletter
            </h3>
            <p className="text-base font-600 text-white mb-1">
              Insight SaaS terbaik, langsung ke inbox
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--slate-400)" }}>
              Tips, tren industri, dan pembaruan produk terbaru. Tanpa spam.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Form newsletter"
            >
              <input
                type="email"
                id="footer-newsletter-email"
                placeholder="email@perusahaan.com"
                className="flex-1 h-10 px-4 rounded-lg text-sm bg-white/10 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-deep/30 transition-all"
                required
                aria-label="Email untuk newsletter"
              />
              <button
                type="submit"
                className="btn btn-amber btn-md shrink-0"
                id="footer-newsletter-submit"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-2" style={{ color: "var(--slate-400)" }}>
              Dengan subscribe, kamu menyetujui{" "}
              <Link href="/legal/privacy" className="underline hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>{" "}
              kami.
            </p>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4
                className="text-xs font-700 uppercase tracking-widest mb-4"
                style={{ color: "var(--slate-400)", letterSpacing: "0.1em" }}
              >
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-150 hover:text-white"
                      style={{ color: "var(--slate-400)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row: Copyright + Social */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--slate-400)" }}>
            © {new Date().getFullYear()} Brandy Technologies Pte. Ltd. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3" aria-label="Media sosial Brandy">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                style={{ color: "var(--slate-400)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "white";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--slate-400)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
