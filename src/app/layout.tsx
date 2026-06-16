import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brandy.id"),
  title: {
    default: "Brandy — SaaS Solutions for Modern Business",
    template: "%s | Brandy",
  },
  description:
    "Brandy adalah platform SaaS terkemuka yang membantu bisnis modern meningkatkan produktivitas, efisiensi operasional, dan pengalaman pelanggan dengan solusi cloud yang canggih.",
  keywords: [
    "SaaS",
    "software as a service",
    "cloud software",
    "business productivity",
    "brandy",
    "Indonesia SaaS",
  ],
  authors: [{ name: "Brandy" }],
  creator: "Brandy",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://brandy.id",
    siteName: "Brandy",
    title: "Brandy — SaaS Solutions for Modern Business",
    description:
      "Platform SaaS terkemuka untuk bisnis modern Indonesia. Tingkatkan produktivitas, efisiensi, dan pengalaman pelanggan Anda.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brandy — SaaS Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandy — SaaS Solutions for Modern Business",
    description:
      "Platform SaaS terkemuka untuk bisnis modern Indonesia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1A3A8F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 btn btn-primary btn-md z-[9999]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
