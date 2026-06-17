"use client";

import { useState } from "react";
import { Share2, Twitter, Linkedin, Copy, Check } from "lucide-react";

interface BlogShareProps {
  url: string;
  title: string;
}

export default function BlogShare({ url, title }: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrlEncoded = encodeURIComponent(url);
  const shareTitleEncoded = encodeURIComponent(title);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-[24rem] shadow-sm">
      <h4 className="text-xs font-700 uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5">
        <Share2 size={13} /> Bagikan Artikel
      </h4>
      <div className="grid grid-cols-4 gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrlEncoded}&text=${shareTitleEncoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center h-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-brand-blue-mid hover:text-white hover:border-brand-blue-mid transition-all"
          aria-label="Bagikan ke Twitter / X"
        >
          <Twitter size={16} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?url=${shareUrlEncoded}&title=${shareTitleEncoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center h-10 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-brand-blue-mid hover:text-white hover:border-brand-blue-mid transition-all"
          aria-label="Bagikan ke LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${shareTitleEncoded}%20${shareUrlEncoded}`}
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
  );
}
