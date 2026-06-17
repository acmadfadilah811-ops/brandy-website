"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function BlogFilters({
  categories,
  initialSearch,
  initialCategory,
}: {
  categories: string[];
  initialSearch: string;
  initialCategory: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [isPending, startTransition] = useTransition();

  // Sync state with props when navigating back/forward
  useEffect(() => {
    setSearch(initialSearch);
    setCategory(initialCategory);
  }, [initialSearch, initialCategory]);

  // Debounced URL updates for search input
  useEffect(() => {
    if (search === initialSearch) return;

    const timer = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category && category !== "All") params.set("category", category);
        router.push(`/blog?${params.toString()}`);
      });
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [search, category, initialSearch, router]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    startTransition(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (newCategory && newCategory !== "All") params.set("category", newCategory);
      router.push(`/blog?${params.toString()}`);
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-blue-mid transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari artikel berdasarkan judul, topik, atau kata kunci..."
          className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:bg-white transition-all shadow-sm ${
            isPending ? "opacity-75" : ""
          }`}
          aria-label="Cari artikel blog"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-xs font-600 transition-all border ${
              category === cat
                ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            {cat === "All" ? "Semua Artikel" : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
