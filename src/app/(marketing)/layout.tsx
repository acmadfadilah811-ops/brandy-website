import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Marketing layout — wraps all public pages with Header + Footer
 * The Header is sticky (fixed), so we add top padding to push content down
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 flex flex-col" style={{ paddingTop: "64px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
