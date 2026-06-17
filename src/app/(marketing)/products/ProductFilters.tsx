"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";

export default function ProductFilters({
  categories,
  selectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (cat: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (cat !== "All") {
        params.set("category", cat);
      }
      router.push(`/products?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-slate-200">
      <div className="flex items-center gap-2 text-slate-500 text-xs font-600 uppercase tracking-wider">
        <Filter size={14} />
        Filter Kategori:
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-xs font-600 border transition-all ${
              selectedCategory === cat
                ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                : "bg-white text-slate-650 border-slate-200 hover:border-slate-350 hover:bg-slate-50"
            } ${isPending ? "opacity-75" : ""}`}
          >
            {cat === "All" ? "Semua Produk" : cat}
          </button>
        ))}
      </div>
    </div>
  );
}
