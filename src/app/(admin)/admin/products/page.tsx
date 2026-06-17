"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  AlertCircle,
  Package,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getIconComponent } from "@/lib/mockProducts";

interface Product {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  badge?: string;
  iconName: string;
  color: string;
}

export default function AdminProductsListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) {
        throw new Error("Gagal mengambil data produk.");
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (slug: string) => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal menghapus produk.");
      }
      // Update local state
      setProducts(products.filter((p) => p.slug !== slug));
      setDeletingSlug(null);
      alert("Produk berhasil dihapus.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const categories = ["All", "Collaboration", "Sales", "Data", "Infrastructure"];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* ── TOP ACTION BAR ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 
            className="text-heading-lg font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Manajemen Produk SaaS
          </h1>
          <p className="text-xs text-slate-500">
            Kelola katalog produk, spesifikasi teknis, fitur unggulan, dan benefit ROI bisnis.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button 
            variant="primary" 
            size="md" 
            icon={<Plus size={16} />}
            iconPosition="left"
          >
            Tambah Produk Baru
          </Button>
        </Link>
      </div>

      {/* ── SEARCH & FILTER SECTION ───────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-blue-mid">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk berdasarkan nama..."
            className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 justify-end w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-600 border transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:bg-slate-50"
              }`}
            >
              {cat === "All" ? "Semua Kategori" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE / CONTENT CONTAINER ─────────────────────────────── */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-error-red flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          /* Loading Skeletons */
          <div className="p-6 space-y-4" aria-busy="true">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="space-y-2 w-3/4">
                  <div className="h-4 bg-slate-100 rounded w-1/3 animate-pulse" />
                  <div className="h-3 bg-slate-100 rounded w-1/5 animate-pulse" />
                </div>
                <div className="h-8 bg-slate-100 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty state */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs font-600 text-slate-800">Tidak ada produk ditemukan</p>
              <p className="text-[10px] text-slate-400">Silakan tambahkan produk baru ke dalam katalog.</p>
            </div>
          </div>
        ) : (
          /* Data Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-700 text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Nama Produk & Ikon</th>
                  <th className="px-6 py-3.5">Tagline</th>
                  <th className="px-6 py-3.5">Kategori</th>
                  <th className="px-6 py-3.5">Badge Promo</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map((prod) => {
                  const Icon = getIconComponent(prod.iconName);
                  const colorParts = prod.color.split(" ");
                  return (
                    <tr key={prod.slug} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Colored Icon box */}
                          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 shadow-sm ${colorParts[0]} ${colorParts[1]} ${colorParts[2] || ""}`}>
                            <Icon size={18} strokeWidth={1.5} />
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-700 text-slate-900">{prod.name}</p>
                            <p className="text-[10px] text-slate-400">/products/{prod.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                        {prod.tagline}
                      </td>
                      <td className="px-6 py-4">
                        <span className="badge badge-blue">{prod.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        {prod.badge ? (
                          <span className="badge badge-amber">{prod.badge}</span>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a 
                            href={`/products/${prod.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-all"
                            title="Lihat halaman publik"
                          >
                            <ExternalLink size={14} />
                          </a>
                          <Link href={`/admin/products/edit/${prod.slug}`}>
                            <button 
                              className="p-1.5 text-blue-600 hover:text-blue-700 rounded hover:bg-blue-50 transition-all"
                              title="Edit produk"
                            >
                              <Edit size={14} />
                            </button>
                          </Link>
                          <button 
                            onClick={() => setDeletingSlug(prod.slug)}
                            className="p-1.5 text-red-600 hover:text-red-700 rounded hover:bg-red-50 transition-all"
                            title="Hapus produk"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── DELETE MODAL CONFIRMATION ─────────────────────────────── */}
      {deletingSlug && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div 
            onClick={() => setDeletingSlug(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
          />
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-sm w-full relative z-10 animate-fade-in space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hapus Produk</h3>
                <p className="text-[10px] text-slate-500">Aksi ini bersifat permanen.</p>
              </div>
            </div>

            <p className="text-xs text-slate-650 leading-relaxed">
              Apakah Anda yakin ingin menghapus produk <strong className="text-slate-800">"{deletingSlug}"</strong>? Seluruh data spesifikasi dan fitur akan hilang.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setDeletingSlug(null)}
                disabled={deleteLoading}
              >
                Batal
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleDelete(deletingSlug)}
                loading={deleteLoading}
              >
                Hapus Produk
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
