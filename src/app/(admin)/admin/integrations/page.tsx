"use client";

import { useState, useEffect } from "react";
import { 
  Puzzle, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Save, 
  X,
  Layers,
  Sparkles
} from "lucide-react";

interface IntegrationItem {
  id: string;
  name: string;
  category: "Collaboration" | "Analytics" | "CRM" | "Marketing" | "DevOps";
  logoText: string;
  logoBg: string;
  description: string;
  isPopular?: boolean;
}

const LOGO_BG_OPTIONS = [
  { name: "Purple", value: "bg-purple-600" },
  { name: "Sky Blue", value: "bg-sky-500" },
  { name: "Slate Black", value: "bg-slate-900" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Yellow", value: "bg-yellow-500" },
  { name: "Indigo", value: "bg-indigo-600" },
  { name: "Royal Blue", value: "bg-blue-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Cyan", value: "bg-blue-400" },
  { name: "Emerald Green", value: "bg-emerald-600" },
  { name: "Teal", value: "bg-teal-600" },
];

export default function AdminIntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInt, setEditingInt] = useState<Partial<IntegrationItem> | null>(null);

  // Fetch integrations
  const fetchIntegrations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/integrations");
      const data = await res.json();
      if (data.success && data.integrations) {
        setIntegrations(data.integrations);
      } else {
        setErrorMsg("Gagal memuat data integrations.");
      }
    } catch (err: any) {
      setErrorMsg("Koneksi gagal: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
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
  const handleSaveIntegration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInt?.name || !editingInt?.category || !editingInt?.logoText || !editingInt?.logoBg || !editingInt?.description) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingInt),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIntegrations(data.integrations);
        setModalOpen(false);
        setEditingInt(null);
        setSuccessMsg("Konektor integrasi berhasil disimpan.");
      } else {
        setErrorMsg(data.error || "Gagal menyimpan konektor.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDeleteIntegration = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konektor integrasi ini?")) return;
    try {
      const res = await fetch(`/api/admin/integrations/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIntegrations(data.integrations);
        setSuccessMsg("Konektor integrasi berhasil dihapus.");
      } else {
        setErrorMsg(data.error || "Gagal menghapus konektor.");
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
            Manajemen Integrasi Platform
          </h1>
          <p className="text-sm text-slate-500">
            Hubungkan Brandy dengan aplikasi eksternal (Slack, GitHub, Salesforce) untuk mendukung otomatisasi data pengguna.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingInt({ name: "", category: "Collaboration", logoText: "", logoBg: "bg-purple-600", description: "", isPopular: false });
            setModalOpen(true);
          }}
          className="btn btn-primary btn-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus size={14} /> Tambah Integrasi
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

      {/* Grid Cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow group"
          >
            {item.isPopular && (
              <span className="absolute top-4 right-4 bg-blue-50 text-brand-blue-mid text-[9px] font-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Populer
              </span>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`w-9 h-9 rounded-lg ${item.logoBg} flex items-center justify-center text-xs font-bold text-white shadow-inner shrink-0`}>
                  {item.logoText}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                  <span className="text-[10px] text-slate-400 font-600 uppercase tracking-wide">{item.category}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed min-h-[40px] line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-700 text-slate-400 uppercase tracking-widest">
                ID: {item.id}
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingInt(item);
                    setModalOpen(true);
                  }}
                  className="p-1 text-slate-400 hover:text-brand-blue-mid transition-colors"
                  title="Edit"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDeleteIntegration(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD/EDIT INTEGRATION MODAL */}
      {modalOpen && editingInt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {editingInt.id ? "Edit Konektor Integrasi" : "Tambah Konektor Baru"}
              </h3>
              <button onClick={() => { setModalOpen(false); setEditingInt(null); }} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveIntegration} className="space-y-4">
              <div>
                <label htmlFor="int-name" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Nama Aplikasi / Layanan</label>
                <input
                  type="text"
                  id="int-name"
                  value={editingInt.name || ""}
                  onChange={(e) => setEditingInt({ ...editingInt, name: e.target.value })}
                  placeholder="e.g. Slack"
                  className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="int-category" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Kategori</label>
                  <select
                    id="int-category"
                    value={editingInt.category || "Collaboration"}
                    onChange={(e) => setEditingInt({ ...editingInt, category: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  >
                    <option value="Collaboration">Collaboration</option>
                    <option value="Analytics">Analytics</option>
                    <option value="CRM">CRM</option>
                    <option value="Marketing">Marketing</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
                
                <div className="flex items-center pl-4 pt-8">
                  <label className="flex items-center gap-1.5 text-xs font-600 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingInt.isPopular || false}
                      onChange={(e) => setEditingInt({ ...editingInt, isPopular: e.target.checked })}
                      className="rounded border-slate-300 text-brand-blue-mid focus:ring-brand-blue-mid/25"
                    />
                    Populer?
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="int-logoText" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Inisial Logo (1-3 Karakter)</label>
                  <input
                    type="text"
                    id="int-logoText"
                    value={editingInt.logoText || ""}
                    onChange={(e) => setEditingInt({ ...editingInt, logoText: e.target.value })}
                    placeholder="e.g. SL"
                    maxLength={3}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="int-logoBg" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Warna Latar Logo</label>
                  <select
                    id="int-logoBg"
                    value={editingInt.logoBg || "bg-purple-600"}
                    onChange={(e) => setEditingInt({ ...editingInt, logoBg: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  >
                    {LOGO_BG_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="int-desc" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Deskripsi Kegunaan</label>
                <textarea
                  id="int-desc"
                  rows={3}
                  value={editingInt.description || ""}
                  onChange={(e) => setEditingInt({ ...editingInt, description: e.target.value })}
                  placeholder="Jelaskan cara kerja integrasi dan apa yang dikirim ke aplikasi eksternal..."
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingInt(null);
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
                  Simpan Integrasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
