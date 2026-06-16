"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import {
  ChevronDown,
  Menu,
  X,
  LayoutGrid,
  BarChart3,
  Users,
  Zap,
  MessageSquare,
  Link2,
  BookOpen,
  Bell,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const products = [
  {
    icon: LayoutGrid,
    name: "Brandy Workspace",
    desc: "Manajemen proyek & kolaborasi tim",
    href: "/products/workspace",
  },
  {
    icon: BarChart3,
    name: "Brandy Analytics",
    desc: "Dashboard data real-time untuk bisnis",
    href: "/products/analytics",
  },
  {
    icon: Users,
    name: "Brandy CRM",
    desc: "Kelola pelanggan & pipeline penjualan",
    href: "/products/crm",
  },
  {
    icon: MessageSquare,
    name: "Brandy Support",
    desc: "Customer support & ticketing system",
    href: "/products/support",
  },
  {
    icon: Zap,
    name: "Brandy Automation",
    desc: "Otomatisasi workflow & integrasi",
    href: "/products/automation",
  },
  {
    icon: Bell,
    name: "Brandy Notify",
    desc: "Push notification & komunikasi massal",
    href: "/products/notify",
  },
];

const megaMenuFooterLinks = [
  { label: "Semua Integrasi", href: "/integrations" },
  { label: "Dokumentasi", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
];

const navLinks = [
  { label: "Products", href: "/products", hasMegaMenu: true },
  { label: "Pricing", href: "/pricing", hasMegaMenu: false },
  { label: "Customers", href: "/customers", hasMegaMenu: false },
  { label: "Blog", href: "/blog", hasMegaMenu: false },
  { label: "About", href: "/about", hasMegaMenu: false },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  /* Detect scroll for sticky border */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main Header ─────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all",
          "bg-white/95 backdrop-blur-sm",
          scrolled ? "border-b border-slate-100 shadow-sm" : "border-b border-transparent"
        )}
        style={{ height: "64px" }}
      >
        <div
          className="container-brand h-full flex items-center justify-between gap-8"
          style={{ maxWidth: "var(--max-content)" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Brandy — Beranda"
          >
            <BrandyLogo />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigasi utama"
          >
            {navLinks.map((link) =>
              link.hasMegaMenu ? (
                <div key={link.label} className="relative">
                  <button
                    id="products-menu-trigger"
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg",
                      "text-[15px] font-medium text-slate-700",
                      "hover:text-brand-blue-mid hover:bg-slate-50",
                      "transition-colors duration-150",
                      megaMenuOpen && "text-brand-blue-mid bg-slate-50"
                    )}
                    aria-expanded={megaMenuOpen}
                    aria-haspopup="true"
                    aria-controls="products-mega-menu"
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setMegaMenuOpen(false);
                      }
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        megaMenuOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {megaMenuOpen && (
                    <div
                      id="products-mega-menu"
                      role="region"
                      aria-label="Menu produk"
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-2",
                        "w-[720px] bg-white rounded-xl shadow-lg",
                        "border border-slate-200 overflow-hidden",
                        "animate-fade-in"
                      )}
                      onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                      <div className="flex">
                        {/* Product Grid (3 col) */}
                        <div className="flex-1 p-6 grid grid-cols-2 gap-2">
                          {products.map((product) => (
                            <Link
                              key={product.name}
                              href={product.href}
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-lg",
                                "hover:bg-slate-50 transition-colors duration-150"
                              )}
                              onClick={() => setMegaMenuOpen(false)}
                            >
                              <span
                                className="mt-0.5 p-2 rounded-lg shrink-0"
                                style={{
                                  background: "var(--brand-blue-tint)",
                                  color: "var(--brand-blue-deep)",
                                }}
                              >
                                <product.icon size={16} strokeWidth={1.5} />
                              </span>
                              <span>
                                <span className="block text-sm font-600 text-slate-900 leading-tight">
                                  {product.name}
                                </span>
                                <span className="block text-xs text-slate-500 mt-0.5">
                                  {product.desc}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>

                        {/* Featured Product (1 col) */}
                        <div
                          className="w-[220px] shrink-0 p-6 border-l border-slate-100"
                          style={{ background: "var(--slate-50)" }}
                        >
                          <p className="text-xs font-600 uppercase tracking-widest text-slate-400 mb-4">
                            Produk Unggulan
                          </p>
                          <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                            <div
                              className="h-28 flex items-center justify-center"
                              style={{
                                background: "linear-gradient(135deg, var(--brand-blue-deep), var(--brand-purple-deep))",
                              }}
                            >
                              <BarChart3 size={40} strokeWidth={1.5} color="white" opacity={0.8} />
                            </div>
                            <div className="p-3">
                              <p className="text-sm font-600 text-slate-900">Brandy Analytics</p>
                              <p className="text-xs text-slate-500 mt-1">Dashboard real-time untuk keputusan bisnis lebih cepat</p>
                              <Link
                                href="/products/analytics"
                                className="inline-flex items-center gap-1 text-xs font-600 mt-2"
                                style={{ color: "var(--brand-blue-mid)" }}
                                onClick={() => setMegaMenuOpen(false)}
                              >
                                Pelajari →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Links */}
                      <div
                        className="flex items-center gap-1 px-6 py-3 border-t border-slate-100"
                        style={{ background: "var(--slate-50)" }}
                      >
                        {megaMenuFooterLinks.map((link, i) => (
                          <span key={link.label} className="flex items-center gap-1">
                            {i > 0 && <span className="text-slate-300 text-xs">|</span>}
                            <Link
                              href={link.href}
                              className="text-xs text-slate-500 hover:text-brand-blue-mid transition-colors"
                              onClick={() => setMegaMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg",
                    "text-[15px] font-medium text-slate-700",
                    "hover:text-brand-blue-mid hover:bg-slate-50",
                    "transition-colors duration-150"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ButtonLink href="/login" variant="ghost" size="md">
              Login
            </ButtonLink>
            <ButtonLink href="/demo" variant="primary" size="md" id="header-get-demo-btn">
              Get Demo
            </ButtonLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            className={cn(
              "lg:hidden flex flex-col justify-center items-center",
              "w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors",
              "relative"
            )}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ──────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Menu mobile"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "bg-white flex flex-col",
          "transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "64px" }}
      >
        <nav className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-1">
            {/* Products with accordion */}
            <li>
              <button
                className={cn(
                  "w-full flex items-center justify-between",
                  "px-4 py-4 rounded-xl text-left",
                  "text-base font-600 text-slate-800",
                  "hover:bg-slate-50 transition-colors",
                  "min-h-[52px]"
                )}
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                aria-expanded={mobileProductsOpen}
              >
                Products
                <ChevronDown
                  size={18}
                  className={cn(
                    "transition-transform duration-200",
                    mobileProductsOpen && "rotate-180"
                  )}
                />
              </button>
              {mobileProductsOpen && (
                <ul className="mt-1 ml-4 space-y-1 border-l-2 border-slate-100 pl-4">
                  {products.map((p) => (
                    <li key={p.name}>
                      <Link
                        href={p.href}
                        className="block px-3 py-3 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue-mid transition-colors min-h-[44px] flex items-center"
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {navLinks.filter((l) => !l.hasMegaMenu).map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center px-4 py-4 rounded-xl text-base font-600 text-slate-800 hover:bg-slate-50 transition-colors min-h-[52px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <div className="p-6 border-t border-slate-100 space-y-3">
          <ButtonLink
            href="/demo"
            variant="amber"
            size="lg"
            className="w-full justify-center"
            id="mobile-get-demo-btn"
            onClick={() => setMobileOpen(false)}
          >
            Get Demo Gratis
          </ButtonLink>
          <ButtonLink
            href="/login"
            variant="secondary"
            size="lg"
            className="w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </ButtonLink>
        </div>
      </div>

      {/* Backdrop for mega menu */}
      {megaMenuOpen && (
        <div
          className="fixed inset-0 z-40 hidden lg:block"
          onClick={() => setMegaMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function BrandyLogo() {
  return (
    <Image
      src="/logo_brandy_full.png"
      alt="Brandy Logo"
      width={150}
      height={40}
      className="h-10 w-auto object-contain"
      priority
    />
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="w-5 h-4 flex flex-col justify-between relative">
      <span
        className={cn(
          "block h-0.5 bg-slate-800 rounded-full transition-all duration-300 origin-center",
          open && "rotate-45 translate-y-[7px]"
        )}
      />
      <span
        className={cn(
          "block h-0.5 bg-slate-800 rounded-full transition-all duration-300",
          open && "opacity-0 scale-x-0"
        )}
      />
      <span
        className={cn(
          "block h-0.5 bg-slate-800 rounded-full transition-all duration-300 origin-center",
          open && "-rotate-45 -translate-y-[7px]"
        )}
      />
    </span>
  );
}
