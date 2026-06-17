"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Users, 
  CreditCard, 
  Briefcase, 
  Grid, 
  MessageSquare, 
  Settings, 
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Team Members", href: "/admin/team", icon: Users },
  { name: "Pricing", href: "/admin/pricing", icon: CreditCard },
  { name: "Job Openings", href: "/admin/careers", icon: Briefcase },
  { name: "Integrations", href: "/admin/integrations", icon: Grid },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Global Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isLoginPage = pathname === "/admin/login";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Fetch current logged in user email
  useEffect(() => {
    if (isLoginPage) return;
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "Admin User");
      }
    };
    fetchUser();
  }, [isLoginPage, supabase]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error", err);
    }
  };

  // Skip layout wrapper for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* ── DESKTOP SIDEBAR ────────────────────────────────────────── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 bg-slate-950 text-white shrink-0 border-r border-slate-900 justify-between py-6 px-4">
        <div className="space-y-6">
          {/* Sidebar Brand Logo Header */}
          <div className="flex items-center gap-3 px-2">
            <span className="w-8 h-8 rounded-lg bg-brand-blue-mid flex items-center justify-center font-bold text-white shadow-inner">
              B
            </span>
            <span className="text-base font-bold tracking-tight text-white">
              Brandy CMS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-600 transition-all ${
                    isActive
                      ? "bg-brand-blue-mid/20 text-brand-blue-light border-l-2 border-brand-blue-mid"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout Section */}
        <div className="pt-4 border-t border-slate-900 space-y-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User size={14} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-700 text-slate-200 truncate">
                {userEmail || "Loading..."}
              </p>
              <p className="text-[8px] text-slate-500 uppercase tracking-wider font-700">
                Administrator
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-600 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all"
          >
            <LogOut size={16} />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* ── MOBILE HEADER/NAV ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shrink-0">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            aria-label="Buka menu navigasi"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3 lg:hidden">
            <span className="w-7 h-7 rounded-md bg-brand-blue-mid flex items-center justify-center font-bold text-white text-xs">
              B
            </span>
            <span className="text-sm font-bold text-slate-900">
              Brandy CMS
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-blue-mid font-600 hover:underline flex items-center gap-1"
            >
              Lihat Website ↗
            </a>
          </div>
        </header>

        {/* ── MAIN CONTENT AREA ──────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0">
          {children}
        </main>
      </div>

      {/* ── MOBILE DRAWER NAVIGATION ────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
          />

          {/* Drawer Panel */}
          <aside className="relative flex flex-col w-64 max-w-xs bg-slate-950 text-white h-full justify-between py-6 px-4 shadow-xl z-10 animate-slide-in-right">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-blue-mid flex items-center justify-center font-bold text-white shadow-inner">
                    B
                  </span>
                  <span className="text-base font-bold text-white">
                    Brandy CMS
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                  aria-label="Tutup menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5" aria-label="Mobile Admin Navigation">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-600 transition-all ${
                        isActive
                          ? "bg-brand-blue-mid/20 text-brand-blue-light border-l-2 border-brand-blue-mid"
                          : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer Logout Section */}
            <div className="pt-4 border-t border-slate-900 space-y-3">
              <div className="flex items-center gap-2.5 px-2 py-1.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                  <User size={14} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-700 text-slate-200 truncate">
                    {userEmail || "Loading..."}
                  </p>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider font-700">
                    Administrator
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-600 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all"
              >
                <LogOut size={16} />
                <span>Keluar Sesi</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
