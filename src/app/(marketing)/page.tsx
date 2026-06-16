import type { Metadata } from "next";
import HeroSection from "@/features/home/HeroSection";
import TrustedBy from "@/features/home/TrustedBy";
import FeatureHighlights from "@/features/home/FeatureHighlights";
import HowItWorks from "@/features/home/HowItWorks";
import PricingTeaser from "@/features/home/PricingTeaser";
import Testimonials from "@/features/home/Testimonials";
import IntegrationShowcase from "@/features/home/IntegrationShowcase";
import CTABanner from "@/features/home/CTABanner";

export const metadata: Metadata = {
  title: "Brandy — SaaS Solutions for Modern Business",
  description:
    "Platform SaaS terkemuka untuk bisnis modern Indonesia. Kelola tim, data, dan pelanggan dalam satu ekosistem yang terintegrasi. Mulai gratis 14 hari.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trusted By — logo bar */}
      <TrustedBy />

      {/* 3. Feature Highlights — Bento Grid */}
      <FeatureHighlights />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Testimonials (dark section) */}
      <Testimonials />

      {/* 6. Pricing Teaser */}
      <PricingTeaser />

      {/* 7. Integration Showcase */}
      <IntegrationShowcase />

      {/* 8. CTA Banner (dark section) */}
      <CTABanner />
    </>
  );
}
