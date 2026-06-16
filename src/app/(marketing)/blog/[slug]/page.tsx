"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Twitter, 
  Linkedin, 
  Share2, 
  Copy, 
  Check, 
  Bookmark,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { mockBlogPosts } from "@/lib/mockBlog";
import { ButtonLink } from "@/components/ui/Button";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;
  const [copied, setCopied] = useState(false);

  // Find the post
  const post = useMemo(() => {
    return mockBlogPosts.find((p) => p.slug === slug);
  }, [slug]);

  if (!post) {
    return notFound();
  }

  // Get related posts (posts in the same category or overall other posts, max 2)
  const relatedPosts = useMemo(() => {
    return mockBlogPosts
      .filter((p) => p.slug !== slug)
      .slice(0, 2);
  }, [slug]);

  // Generate Table of Contents (TOC) based on H2 headings in the body
  const toc = useMemo(() => {
    return post.body
      .filter((block) => block.type === "heading" && block.level === 2)
      .map((block) => {
        const text = block.content as string;
        // Simple slugify for anchors
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        return { text, id };
      });
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* ── 1. ARTICLE HEADER (Centered Narrow) ── */}
      <header className="pt-10 pb-12 border-b border-slate-100" aria-label="Header Artikel">
        <div className="container-brand max-w-4xl">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-600 text-slate-500 hover:text-brand-blue-mid mb-8 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Kembali ke Blog
          </Link>

          {/* Category Badge */}
          <span className="badge badge-blue mb-4 inline-block uppercase tracking-wider text-[10px]">
            {post.category}
          </span>

          {/* Title */}
          <h1 
            className="text-heading-xl md:text-heading-2xl text-slate-900 mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-body-lg text-slate-600 mb-8 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author & Date metadata */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-100">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-500">
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar size={13} /> {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. MAIN CONTENT & SIDEBAR (2-Column Grid) ── */}
      <div className="container-brand max-w-6xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Body (Span 8) */}
          <main className="lg:col-span-8 space-y-6 text-slate-700 leading-relaxed text-sm md:text-base max-w-3xl">
            
            {/* Featured Image */}
            <div className="relative h-[240px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            {/* Dynamic Body Renderer */}
            {post.body.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={index} className="leading-relaxed mb-6 text-slate-700">
                      {block.content}
                    </p>
                  );
                case "heading":
                  const headingText = block.content as string;
                  const id = headingText
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");
                  if (block.level === 2) {
                    return (
                      <h2
                        key={index}
                        id={id}
                        className="text-heading-lg text-slate-900 mt-10 mb-4 tracking-tight scroll-mt-20"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {headingText}
                      </h2>
                    );
                  } else {
                    return (
                      <h3
                        key={index}
                        id={id}
                        className="text-heading-md text-slate-900 mt-8 mb-3 tracking-tight scroll-mt-20"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {headingText}
                      </h3>
                    );
                  }
                case "quote":
                  return (
                    <blockquote
                      key={index}
                      className="border-l-4 border-brand-blue-mid bg-slate-50 px-6 py-4 my-8 rounded-r-xl text-slate-800 italic font-500"
                    >
                      "{block.content}"
                    </blockquote>
                  );
                case "list":
                  const listItems = block.content as string[];
                  return (
                    <ul key={index} className="list-disc list-inside pl-4 mb-6 space-y-2 text-slate-700">
                      {listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                case "code":
                  const codeContent = block.content as string;
                  return (
                    <div key={index} className="my-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-950 p-5 shadow-inner">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-slate-400 mb-3 border-b border-white/5 pb-2">
                        <span>{block.language || "code"}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(codeContent);
                            alert("Kode disalin ke clipboard!");
                          }}
                          className="hover:text-white transition-colors"
                        >
                          Salin
                        </button>
                      </div>
                      <pre className="overflow-x-auto text-xs text-slate-200 font-mono leading-relaxed scrollbar-thin">
                        <code>{codeContent}</code>
                      </pre>
                    </div>
                  );
                default:
                  return null;
              }
            })}

            {/* Tags footer */}
            <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Biography Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mt-12 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-700 uppercase tracking-widest text-brand-blue-mid">
                  Ditulis Oleh
                </span>
                <h4 className="text-base font-bold text-slate-900 leading-tight">
                  {post.author.name}
                </h4>
                <p className="text-xs text-slate-500 font-500">
                  {post.author.role}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar (Span 4) */}
          <aside className="lg:col-span-4 space-y-8" aria-label="Sidebar navigasi artikel">
            
            {/* Table of Contents (TOC) */}
            {toc.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24 shadow-sm hidden lg:block">
                <h4 className="text-xs font-700 uppercase tracking-widest text-slate-400 mb-4">
                  Daftar Isi
                </h4>
                <nav aria-label="Daftar isi artikel">
                  <ul className="space-y-3">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-center gap-1.5 text-xs font-500 text-slate-600 hover:text-brand-blue-mid transition-colors leading-tight"
                        >
                          <ChevronRight size={12} className="shrink-0" />
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Share / Social Buttons */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-[24rem] shadow-sm">
              <h4 className="text-xs font-700 uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5">
                <Share2 size={13} /> Bagikan Artikel
              </h4>
              <div className="grid grid-cols-4 gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center h-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-brand-blue-mid hover:text-white hover:border-brand-blue-mid transition-all"
                  aria-label="Bagikan ke Twitter / X"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center h-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-brand-blue-mid hover:text-white hover:border-brand-blue-mid transition-all"
                  aria-label="Bagikan ke LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center h-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                  aria-label="Bagikan ke WhatsApp"
                >
                  <Share2 size={16} />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="flex justify-center items-center h-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                  aria-label="Salin tautan artikel"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Sidebar Promo CTA */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 relative overflow-hidden shadow-md sticky top-[34rem]">
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-blue-mid/25 blur-2xl pointer-events-none" />
              <h4 className="text-base font-bold mb-2 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Siap Meningkatkan Efisiensi Bisnis?
              </h4>
              <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">
                Bergabunglah dengan ribuan perusahaan sukses yang menggunakan Brandy Analytics untuk mengambil keputusan 10x lebih cepat.
              </p>
              <ButtonLink href="/demo" variant="amber" size="sm" className="w-full justify-center text-xs">
                Hubungi Sales
              </ButtonLink>
            </div>

          </aside>
        </div>
      </div>

      {/* ── 3. RELATED POSTS FOOTER SECTION ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-100 py-16" aria-label="Artikel Terkait">
          <div className="container-brand max-w-5xl">
            <h3 
              className="text-heading-md text-slate-900 mb-8 text-center md:text-left"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Artikel Terkait yang Menarik
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.slug}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col group"
                >
                  <Link href={`/blog/${rPost.slug}`} className="relative block h-40 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={rPost.thumbnail}
                      alt={rPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover group-hover:scale-102 transition-transform duration-350"
                    />
                  </Link>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-700 text-brand-blue-mid uppercase tracking-wider block">
                        {rPost.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-blue-mid transition-colors leading-snug">
                        <Link href={`/blog/${rPost.slug}`}>
                          {rPost.title}
                        </Link>
                      </h4>
                    </div>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-600 text-slate-500 hover:text-brand-blue-mid pt-4 mt-4 border-t border-slate-100 transition-colors"
                    >
                      Baca Selengkapnya <ChevronRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
