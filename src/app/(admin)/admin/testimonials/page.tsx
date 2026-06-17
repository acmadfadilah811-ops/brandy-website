"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Save, 
  X,
  Star,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  color: string;
  featured: boolean;
  caseStudyUrl?: string;
  revenueIncrease?: string;
}

const AVATAR_COLOR_OPTIONS = [
  { name: "Brandy Blue", value: "var(--brand-blue-mid)" },
  { name: "Amber", value: "var(--amber)" },
  { name: "Teal", value: "var(--teal)" },
  { name: "Brandy Purple", value: "var(--brand-purple-mid)" },
  { name: "Emerald", value: "var(--emerald-600)" },
  { name: "Sky Blue", value: "var(--sky-500)" },
];

export default function AdminTestimonialsPage() {
  const [list, setList] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<TestimonialItem> | null>(null);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success && data.testimonials) {
        setList(data.testimonials);
      } else {
        setErrorMsg("Gagal memuat data testimoni.");
      }
    } catch (err: any) {
      setErrorMsg("Koneksi gagal: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Clear alerts
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  // Handle Save
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.quote || !editingTestimonial?.name || !editingTestimonial?.title || !editingTestimonial?.company || !editingTestimonial?.initials || !editingTestimonial?.color) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTestimonial),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setList(data.testimonials);
        setModalOpen(false);
        setEditingTestimonial(null);
        setSuccessMsg("Testimoni pelanggan berhasil disimpan.");
      } else {
        setErrorMsg(data.error || "Gagal menyimpan testimoni.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setList(data.testimonials);
        setSuccessMsg("Testimoni berhasil dihapus.");
      } else {
        setErrorMsg(data.error || "Gagal menghapus testimoni.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-mid" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
            Manajemen Testimoni & Ulasan Pelanggan
          </h1>
          <p className="text-sm text-slate-500">
            Kelola kutipan ulasan, inisial & warna avatar, tautan studi kasus, serta pilih satu ulasan utama (Featured).
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial({ quote: "", name: "", title: "", company: "", initials: "", color: "var(--brand-blue-mid)", featured: false, caseStudyUrl: "", revenueIncrease: "" });
            setModalOpen(true);
          }}
          className="btn btn-primary btn-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus size={14} /> Tambah Testimoni
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="rounded-lg bg-teal/10 p-4 text-sm text-teal border border-teal/20 animate-fade-in">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="rounded-lg bg-rose-50 p-4 text-sm text-rose-600 border border-rose-100 animate-fade-in">
          {errorMsg}
        </div>
      )}

      {/* Testimonials list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((item) => (
          <div 
            key={item.id}
            className={`rounded-xl border p-6 flex flex-col justify-between relative transition-shadow ${
              item.featured 
                ? "bg-slate-950 text-white border-transparent shadow-xl ring-2 ring-brand-blue-mid/45" 
                : "bg-white text-slate-950 border-slate-200 shadow-sm"
            }`}
          >
            {item.featured && (
              <span className="absolute top-4 right-4 bg-brand-blue-mid text-white text-[9px] font-700 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Star size={10} className="fill-white" /> Featured (Utama)
              </span>
            )}

            <div className="space-y-4">
              <p className={`text-sm italic leading-relaxed ${item.featured ? "text-slate-200 font-500" : "text-slate-600"}`}>
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${item.featured ? "text-white" : "text-slate-900"}`}>{item.name}</h4>
                  <p className="text-xs text-slate-400 font-500">{item.title} · {item.company}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex flex-col gap-1 text-[10px] text-slate-400">
                {item.caseStudyUrl && (
                  <span className="flex items-center gap-1">
                    <LinkIcon size={10} /> {item.caseStudyUrl}
                  </span>
                )}
                {item.revenueIncrease && (
                  <span className="text-amber-500 font-600">
                    Revenue: {item.revenueIncrease}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingTestimonial(item);
                    setModalOpen(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-brand-blue-mid transition-colors"
                  title="Edit"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD/EDIT TESTIMONIAL MODAL */}
      {modalOpen && editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {editingTestimonial.id ? "Edit Testimoni Pelanggan" : "Tambah Testimoni Baru"}
              </h3>
              <button onClick={() => { setModalOpen(false); setEditingTestimonial(null); }} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="test-name" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    id="test-name"
                    value={editingTestimonial.name || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    placeholder="e.g. Dewi Rahayu"
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="test-initials" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Inisial Avatar</label>
                  <input
                    type="text"
                    id="test-initials"
                    value={editingTestimonial.initials || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, initials: e.target.value })}
                    placeholder="e.g. DR"
                    maxLength={3}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid text-center"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="test-title" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Jabatan (Title)</label>
                  <input
                    type="text"
                    id="test-title"
                    value={editingTestimonial.title || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, title: e.target.value })}
                    placeholder="e.g. VP Sales"
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="test-company" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Nama Perusahaan</label>
                  <input
                    type="text"
                    id="test-company"
                    value={editingTestimonial.company || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    placeholder="e.g. PT Maju Bersama"
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="test-color" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Warna Avatar</label>
                  <select
                    id="test-color"
                    value={editingTestimonial.color || "var(--brand-blue-mid)"}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, color: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  >
                    {AVATAR_COLOR_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center pl-4 pt-8">
                  <label className="flex items-center gap-1.5 text-xs font-600 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTestimonial.featured || false}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, featured: e.target.checked })}
                      className="rounded border-slate-300 text-brand-blue-mid focus:ring-brand-blue-mid/25"
                    />
                    Jadikan Ulasan Utama (Featured)?
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="test-caseStudy" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Link Studi Kasus (Opsional)</label>
                  <input
                    type="text"
                    id="test-caseStudy"
                    value={editingTestimonial.caseStudyUrl || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, caseStudyUrl: e.target.value })}
                    placeholder="/customers/..."
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  />
                </div>
                <div>
                  <label htmlFor="test-revenue" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Stat Kenaikan Revenue (Opsional)</label>
                  <input
                    type="text"
                    id="test-revenue"
                    value={editingTestimonial.revenueIncrease || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, revenueIncrease: e.target.value })}
                    placeholder="e.g. +40%"
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="test-quote" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Kutipan Review</label>
                <textarea
                  id="test-quote"
                  rows={4}
                  value={editingTestimonial.quote || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  placeholder="Kutipan testimoni pelanggan..."
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingTestimonial(null);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-primary btn-sm flex items-center gap-1.5"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
