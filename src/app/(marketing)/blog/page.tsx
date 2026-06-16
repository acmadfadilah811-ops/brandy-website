"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { mockBlogPosts } from "@/lib/mockBlog";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Tutorial", "Insight", "Studi Kasus", "News"];

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HEADER SECTION (Centered Narrow/Contained) ── */}
      <section className="relative overflow-hidden border-b border-slate-100 py-16 lg:py-24" aria-label="Blog Header">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--slate-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          aria-hidden="true"
        />

        <div className="container-brand relative z-10 max-w-4xl text-center">
          <span className="badge badge-blue mb-4 inline-flex items-center gap-1.5">
            <BookOpen size={13} /> Blog & Insights
          </span>
          <h1 
            className="text-heading-2xl text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pikiran, Strategi, & <span className="text-gradient">Inovasi Rekayasa</span> Kami
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Dapatkan panduan rekayasa perangkat lunak kustom, analisis model kecerdasan buatan, 
            estetika UI/UX premium, serta update industri dari tim inti Brandy.
          </p>

          {/* Search Bar & Category Filters wrapper */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Search Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-blue-mid transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel berdasarkan judul, topik, atau kata kunci..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue-mid focus:bg-white transition-all shadow-sm"
                aria-label="Cari artikel blog"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-600 transition-all border ${
                    selectedCategory === category
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {category === "All" ? "Semua Artikel" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BLOG GRID LISTING SECTION (Contained) ── */}
      <section className="py-20" aria-label="Daftar Artikel Blog">
        <div className="container-brand max-w-6xl">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 max-w-2xl mx-auto">
              <p className="text-slate-500 font-500 mb-2">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs text-brand-blue-mid font-600 hover:underline"
              >
                Reset Filter & Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.slug}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-350 transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail Cover */}
                  <Link href={`/blog/${post.slug}`} className="relative block h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-350"
                    />
                    {/* Category Tag overlay */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-700 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                  </Link>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {post.publishedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue-mid transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-100">
                          <Image
                            src={post.author.image}
                            alt={post.author.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-[11px] font-600 text-slate-800 leading-tight">
                            {post.author.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {post.author.role}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-slate-400 group-hover:text-brand-blue-mid transition-colors p-1"
                        aria-label={`Baca artikel: ${post.title}`}
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. NEWSLETTER BANNER (Dark Container Section) ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100" aria-label="Berlangganan Newsletter">
        <div className="container-brand max-w-4xl bg-slate-950 rounded-2xl p-8 lg:p-12 text-center text-white relative overflow-hidden shadow-lg">
          {/* Glowing accent background */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-brand-blue-mid/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-brand-purple-mid/20 blur-3xl pointer-events-none" />

          <span className="badge badge-amber mb-4 inline-flex">Newsletter</span>
          <h2 className="text-heading-xl text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Dapatkan Insight Terbaik Langsung di Inbox Anda
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Bergabunglah dengan 5,000+ developer dan pemimpin bisnis untuk menerima newsletter dua mingguan 
            kami mengenai rekayasa sistem, desain, dan tren SaaS.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Terima kasih! Alamat email Anda telah didaftarkan ke mailing list Brandy.");
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Masukkan email pekerjaan Anda"
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber focus:bg-white/15 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-amber hover:bg-amber-dark text-slate-950 text-xs font-700 rounded-lg px-6 py-2.5 transition-all shrink-0 shadow-sm"
            >
              Berlangganan
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
