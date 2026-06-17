"use client";

import { useState, useEffect } from "react";
import { 
  CreditCard, 
  HelpCircle, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Save, 
  Check, 
  Minus, 
  Sparkles, 
  Eye 
} from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  ctaText: string;
  ctaHref: string;
  popular: boolean;
  dark: boolean;
  features: PricingFeature[];
}

interface PricingFAQ {
  id: string;
  question: string;
  answer: string;
}

export default function AdminPricingPage() {
  const [activeTab, setActiveTab] = useState<"plans" | "faqs">("plans");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Global State
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [faqs, setFaqs] = useState<PricingFAQ[]>([]);

  // Modals / Editing States
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<PricingFAQ> | null>(null);

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/pricing");
      const data = await res.json();
      if (data.success && data.pricing) {
        setPlans(data.pricing.plans || []);
        setFaqs(data.pricing.faqs || []);
      } else {
        setErrorMsg("Gagal memuat data pricing.");
      }
    } catch (err: any) {
      setErrorMsg("Koneksi gagal: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  // Handle Save Plan
  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlan),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPlans(data.plans);
        setEditingPlan(null);
        setSuccessMsg(`Paket ${editingPlan.name} berhasil diperbarui.`);
      } else {
        setErrorMsg(data.error || "Gagal menyimpan perubahan.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Feature editing helpers
  const handleAddFeature = () => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, { name: "Fitur baru...", included: true }],
    });
  };

  const handleUpdateFeature = (idx: number, name: string) => {
    if (!editingPlan) return;
    const updated = [...editingPlan.features];
    updated[idx].name = name;
    setEditingPlan({ ...editingPlan, features: updated });
  };

  const handleToggleFeatureIncluded = (idx: number) => {
    if (!editingPlan) return;
    const updated = [...editingPlan.features];
    updated[idx].included = !updated[idx].included;
    setEditingPlan({ ...editingPlan, features: updated });
  };

  const handleRemoveFeature = (idx: number) => {
    if (!editingPlan) return;
    const updated = [...editingPlan.features];
    updated.splice(idx, 1);
    setEditingPlan({ ...editingPlan, features: updated });
  };

  // FAQ CRUD helpers
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/pricing/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFaq),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs(data.faqs);
        setFaqModalOpen(false);
        setEditingFaq(null);
        setSuccessMsg("FAQ penagihan berhasil disimpan.");
      } else {
        setErrorMsg(data.error || "Gagal menyimpan FAQ.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) return;
    try {
      const res = await fetch(`/api/admin/pricing/faqs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs(data.faqs);
        setSuccessMsg("FAQ berhasil dihapus.");
      } else {
        setErrorMsg(data.error || "Gagal menghapus FAQ.");
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
            Manajemen Paket & Harga Langganan
          </h1>
          <p className="text-sm text-slate-500">
            Kelola detail harga bulanan/tahunan, daftar fitur, dan FAQ penagihan.
          </p>
        </div>
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

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 gap-1 bg-white p-1 rounded-xl border max-w-sm">
        {[
          { id: "plans", label: "Paket Langganan", icon: CreditCard },
          { id: "faqs", label: "Pertanyaan Umum (FAQ)", icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setEditingPlan(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-600 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PLANS */}
      {activeTab === "plans" && !editingPlan && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`rounded-2xl p-6 flex flex-col justify-between border relative ${
                plan.dark 
                  ? "bg-slate-950 text-white border-transparent shadow-xl" 
                  : "bg-white text-slate-950 border-slate-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue-mid text-white text-[10px] font-700 uppercase tracking-widest px-3 py-0.5 rounded-full">
                  Paling Populer
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-lg font-bold ${plan.dark ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="p-1 text-slate-400 hover:text-brand-blue-mid transition-colors"
                    title="Edit Paket"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
                
                <p className={`text-xs mb-4 ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xl font-bold">{plan.currency === "USD" ? "$" : "Rp"}</span>
                  <span className="text-3xl font-extrabold tracking-tight">{plan.monthlyPrice}</span>
                  <span className="text-xs opacity-60">/bln (Bulanan)</span>
                </div>

                <div className="flex items-baseline gap-1 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className="text-xl font-bold">{plan.currency === "USD" ? "$" : "Rp"}</span>
                  <span className="text-3xl font-extrabold tracking-tight">{plan.yearlyPrice}</span>
                  <span className="text-xs opacity-60">/bln (Tahunan)</span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs">
                  {plan.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {f.included ? (
                        <Check size={14} className="text-teal shrink-0" />
                      ) : (
                        <Minus size={14} className="text-slate-300 dark:text-slate-700 shrink-0" />
                      )}
                      <span className={!f.included ? "opacity-45 line-through" : ""}>{f.name}</span>
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li className="text-[10px] text-slate-400 italic">
                      + {plan.features.length - 5} fitur lainnya...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT PLAN DETAIL VIEW */}
      {activeTab === "plans" && editingPlan && (
        <form onSubmit={handleSavePlan} className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Edit Detail Paket: {editingPlan.name}
            </h3>
            <button
              type="button"
              onClick={() => setEditingPlan(null)}
              className="text-xs font-600 text-slate-500 hover:text-slate-900"
            >
              Batal & Kembali
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="plan-name" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Nama Paket</label>
              <input
                type="text"
                id="plan-name"
                value={editingPlan.name}
                onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                required
              />
            </div>
            <div>
              <label htmlFor="plan-desc" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Deskripsi Ringkas</label>
              <input
                type="text"
                id="plan-desc"
                value={editingPlan.description}
                onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="plan-currency" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Mata Uang</label>
                <input
                  type="text"
                  id="plan-currency"
                  value={editingPlan.currency}
                  onChange={(e) => setEditingPlan({ ...editingPlan, currency: e.target.value })}
                  placeholder="e.g. USD / IDR"
                  className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  required
                />
              </div>
              <div className="flex gap-4 pt-8 pl-4">
                <label className="flex items-center gap-1.5 text-xs font-600 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.popular}
                    onChange={(e) => setEditingPlan({ ...editingPlan, popular: e.target.checked })}
                    className="rounded border-slate-300 text-brand-blue-mid focus:ring-brand-blue-mid/25"
                  />
                  Popular?
                </label>
                <label className="flex items-center gap-1.5 text-xs font-600 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.dark}
                    onChange={(e) => setEditingPlan({ ...editingPlan, dark: e.target.checked })}
                    className="rounded border-slate-300 text-brand-blue-mid focus:ring-brand-blue-mid/25"
                  />
                  Dark Theme?
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-slate-100 pt-6">
            <div>
              <label htmlFor="plan-mprice" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Harga Bulanan</label>
              <input
                type="number"
                id="plan-mprice"
                value={editingPlan.monthlyPrice}
                onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPrice: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                required
              />
            </div>
            <div>
              <label htmlFor="plan-yprice" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Harga Tahunan</label>
              <input
                type="number"
                id="plan-yprice"
                value={editingPlan.yearlyPrice}
                onChange={(e) => setEditingPlan({ ...editingPlan, yearlyPrice: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                required
              />
            </div>
            <div>
              <label htmlFor="plan-ctatext" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Teks Tombol CTA</label>
              <input
                type="text"
                id="plan-ctatext"
                value={editingPlan.ctaText}
                onChange={(e) => setEditingPlan({ ...editingPlan, ctaText: e.target.value })}
                className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                required
              />
            </div>
            <div>
              <label htmlFor="plan-ctahref" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Link CTA</label>
              <input
                type="text"
                id="plan-ctahref"
                value={editingPlan.ctaHref}
                onChange={(e) => setEditingPlan({ ...editingPlan, ctaHref: e.target.value })}
                className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                required
              />
            </div>
          </div>

          {/* Features Editor */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-700 uppercase tracking-wider text-slate-700">Daftar Fitur Paket</h4>
              <button
                type="button"
                onClick={handleAddFeature}
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
              >
                <Plus size={12} /> Tambah Fitur
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editingPlan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <input
                    type="checkbox"
                    checked={feature.included}
                    onChange={() => handleToggleFeatureIncluded(idx)}
                    className="rounded border-slate-300 text-teal focus:ring-teal/25 cursor-pointer"
                    title={feature.included ? "Termasuk dalam paket" : "Tidak termasuk dalam paket"}
                  />
                  <input
                    type="text"
                    value={feature.name}
                    onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                    className="flex-1 h-8 px-2.5 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-brand-blue-mid"
                    placeholder="Nama Fitur"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingPlan(null)}
              className="btn btn-secondary"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary flex items-center gap-1.5"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={14} />}
              Simpan Paket Harga
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: FAQS */}
      {activeTab === "faqs" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
              Pertanyaan Umum Penagihan ({faqs.length})
            </h2>
            <button
              onClick={() => {
                setEditingFaq({ question: "", answer: "" });
                setFaqModalOpen(true);
              }}
              className="btn btn-primary btn-sm flex items-center gap-1.5"
            >
              <Plus size={14} /> Tambah FAQ
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            {faqs.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">Belum ada FAQ penagihan.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {faqs.map((faq) => (
                  <div key={faq.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{faq.answer}</p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingFaq(faq);
                          setFaqModalOpen(true);
                        }}
                        className="p-1 text-slate-400 hover:text-brand-blue-mid transition-colors"
                        title="Edit FAQ"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Hapus FAQ"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAQ MODAL */}
      {faqModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-6 animate-scale-in">
            <h3 className="text-lg font-bold text-slate-900">
              {editingFaq.id ? "Edit Pertanyaan FAQ" : "Tambah Pertanyaan FAQ Baru"}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label htmlFor="faq-question" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Pertanyaan</label>
                <input
                  type="text"
                  id="faq-question"
                  value={editingFaq.question || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  required
                />
              </div>

              <div>
                <label htmlFor="faq-answer" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Jawaban</label>
                <textarea
                  id="faq-answer"
                  rows={4}
                  value={editingFaq.answer || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setFaqModalOpen(false);
                    setEditingFaq(null);
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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
