"use client";

import { useState, useEffect } from "react";
import { 
  Briefcase, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Save, 
  MapPin, 
  Clock, 
  X,
  FileText
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: "Active" | "Draft";
}

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobOpening> | null>(null);

  // Fetch jobs
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/careers");
      const data = await res.json();
      if (data.success && data.careers) {
        setJobs(data.careers);
      } else {
        setErrorMsg("Gagal memuat data lowongan.");
      }
    } catch (err: any) {
      setErrorMsg("Koneksi gagal: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
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
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.title || !editingJob?.department || !editingJob?.location || !editingJob?.type || !editingJob?.experience || !editingJob?.description) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setJobs(data.careers);
        setModalOpen(false);
        setEditingJob(null);
        setSuccessMsg("Lowongan pekerjaan berhasil disimpan.");
      } else {
        setErrorMsg(data.error || "Gagal menyimpan lowongan.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDeleteJob = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus lowongan pekerjaan ini?")) return;
    try {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setJobs(data.careers);
        setSuccessMsg("Lowongan pekerjaan berhasil dihapus.");
      } else {
        setErrorMsg(data.error || "Gagal menghapus lowongan.");
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
            Manajemen Lowongan Pekerjaan (Careers)
          </h1>
          <p className="text-sm text-slate-500">
            Publikasikan lowongan kerja baru, atur status (Active/Draft), dan kelola kualifikasi pelamar.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingJob({ title: "", department: "Engineering", location: "Jakarta", type: "Full-time", experience: "2+ Tahun", description: "", status: "Active" });
            setModalOpen(true);
          }}
          className="btn btn-primary btn-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus size={14} /> Tambah Lowongan
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

      {/* Jobs Table/List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <FileText className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-sm">Belum ada lowongan pekerjaan terdaftar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-xs font-700 text-slate-500 uppercase tracking-wider">Posisi Pekerjaan</th>
                  <th className="p-4 text-xs font-700 text-slate-500 uppercase tracking-wider">Divisi</th>
                  <th className="p-4 text-xs font-700 text-slate-500 uppercase tracking-wider">Lokasi / Tipe</th>
                  <th className="p-4 text-xs font-700 text-slate-500 uppercase tracking-wider">Pengalaman</th>
                  <th className="p-4 text-xs font-700 text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-700 text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{job.title}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-xs">{job.description}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-600">
                        {job.department}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-500 text-slate-700 flex items-center gap-1">
                        <MapPin size={11} /> {job.location}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock size={11} /> {job.type}
                      </div>
                    </td>
                    <td className="p-4 text-xs font-500 text-slate-600">
                      {job.experience}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-700 uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        job.status === "Active" 
                          ? "bg-teal/10 text-teal" 
                          : "bg-amber/10 text-amber"
                      }`}>
                        {job.status === "Active" ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setEditingJob(job);
                            setModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-brand-blue-mid transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD/EDIT JOB MODAL */}
      {modalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingJob.id ? "Edit Lowongan Pekerjaan" : "Tambah Lowongan Pekerjaan Baru"}
              </h3>
              <button onClick={() => { setModalOpen(false); setEditingJob(null); }} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label htmlFor="job-title" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Nama Posisi / Pekerjaan</label>
                <input
                  type="text"
                  id="job-title"
                  value={editingJob.title || ""}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  placeholder="e.g. Senior AI Engineer"
                  className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="job-dept" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Divisi / Departemen</label>
                  <input
                    type="text"
                    id="job-dept"
                    value={editingJob.department || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    placeholder="e.g. Engineering"
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="job-status" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Status Publikasi</label>
                  <select
                    id="job-status"
                    value={editingJob.status || "Active"}
                    onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  >
                    <option value="Active">Active (Tampil di Publik)</option>
                    <option value="Draft">Draft (Disembunyikan)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="job-location" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Lokasi Kerja</label>
                  <input
                    type="text"
                    id="job-location"
                    value={editingJob.location || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    placeholder="e.g. Jakarta / Remote"
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="job-type" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Tipe Jam Kerja</label>
                  <select
                    id="job-type"
                    value={editingJob.type || "Full-time"}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="job-exp" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Pengalaman Minimal</label>
                  <input
                    type="text"
                    id="job-exp"
                    value={editingJob.experience || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    placeholder="e.g. 3+ Tahun"
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="job-desc" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Deskripsi Tanggung Jawab & Kualifikasi</label>
                <textarea
                  id="job-desc"
                  rows={4}
                  value={editingJob.description || ""}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  placeholder="Jelaskan peran kerja, skill teknis yang dibutuhkan, dan benefit tambahan..."
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingJob(null);
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
                  Simpan Lowongan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
