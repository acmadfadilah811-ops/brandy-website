/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Blue
        "brand-blue-deep":    "#1A3A8F",
        "brand-blue-mid":     "#2563EB",
        "brand-blue-light":   "#5B8DEF",
        "brand-blue-tint":    "#EFF6FF",
        // Brand Purple
        "brand-purple-deep":  "#4C1D95",
        "brand-purple-mid":   "#7C3AED",
        "brand-purple-light": "#C4B5FD",
        // Amber
        "amber":              "#B45309",
        "amber-light":        "#FCD34D",
        // Semantic
        "teal":               "#0F766E",
        // Slate overrides
        "slate-950":          "#0F172A",
        "slate-800":          "#1E293B",
        "slate-600":          "#475569",
        "slate-400":          "#94A3B8",
        "slate-200":          "#E2E8F0",
        "slate-100":          "#F1F5F9",
        "slate-50":           "#F8FAFC",
      },
      fontFamily: {
        display:  ["Bricolage Grotesque", "Syne", "system-ui", "sans-serif"],
        heading:  ["Plus Jakarta Sans", "DM Sans", "Arial", "sans-serif"],
        body:     ["Inter", "system-ui", "sans-serif"],
        mono:     ["JetBrains Mono", "Fira Code", "monospace"],
        serif:    ["DM Serif Display", "Georgia", "serif"],
      },
      boxShadow: {
        "sm":    "0 1px 3px rgba(0,0,0,0.08)",
        "md":    "0 4px 12px rgba(0,0,0,0.10)",
        "lg":    "0 4px 24px rgba(0,0,0,0.12)",
        "blue":  "0 4px 14px rgba(26,58,143,0.4)",
        "amber": "0 4px 14px rgba(180,83,9,0.4)",
      },
      borderRadius: {
        "sm":   "6px",
        "md":   "8px",
        "lg":   "12px",
        "xl":   "16px",
        "2xl":  "20px",
        "full": "9999px",
      },
      maxWidth: {
        "content": "1280px",
        "prose":   "720px",
        "narrow":  "560px",
      },
      fontSize: {
        "display-2xl": ["6rem",    { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-xl":  ["4.5rem",  { lineHeight: "1.1",  letterSpacing: "-0.03em" }],
        "display-lg":  ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "heading-xl":  ["3rem",    { lineHeight: "1.2",  letterSpacing: "-0.02em" }],
        "heading-lg":  ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "heading-md":  ["1.875rem",{ lineHeight: "1.3"  }],
        "heading-sm":  ["1.5rem",  { lineHeight: "1.35" }],
        "body-xl":     ["1.25rem", { lineHeight: "1.6"  }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.65" }],
        "body-md":     ["1rem",    { lineHeight: "1.6"  }],
        "body-sm":     ["0.875rem",{ lineHeight: "1.55" }],
        "body-xs":     ["0.75rem", { lineHeight: "1.5",  letterSpacing: "0.02em" }],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.4s cubic-bezier(0,0,0.2,1) forwards",
        "fade-in":    "fadeIn 0.25s cubic-bezier(0,0,0.2,1) forwards",
        "float":      "floatSlow 10s ease-in-out infinite",
        "marquee":    "marquee 30s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":       { transform: "translateY(-20px) rotate(3deg)" },
          "66%":       { transform: "translateY(-10px) rotate(-2deg)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
