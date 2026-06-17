"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Milestone as MilestoneIcon, 
  Target, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Save, 
  Linkedin, 
  Sparkles, 
  Shield, 
  Heart, 
  Globe 
} from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
}

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface CoreValue {
  key: string;
  title: string;
  description: string;
}

export default function AdminTeamPage() {
  const [activeTab, setActiveTab] = useState<"team" | "values" | "milestones">("team");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Global State
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [values, setValues] = useState<CoreValue[]>([]);
  const [leaders, setLeaders] = useState<TeamMember[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  // Modals
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);

  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Partial<Milestone> | null>(null);

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/about");
      const data = await res.json();
      if (data.success && data.about) {
        setMission(data.about.mission || "");
        setVision(data.about.vision || "");
        setValues(data.about.values || []);
        setLeaders(data.about.leaders || []);
        setMilestones(data.about.milestones || []);
      } else {
        setErrorMsg("Gagal memuat data CMS About.");
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

  // Clear messages
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  // Handle Save Visi, Misi & Values
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mission, vision, values }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("Visi, Misi, dan Core Values berhasil disimpan.");
      } else {
        setErrorMsg(data.error || "Gagal menyimpan data.");
      }
    } catch (err: any) {
      setErrorMsg("Gagal menyimpan data: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Save Member
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name || !editingMember?.role || !editingMember?.image || !editingMember?.bio) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/about/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeaders(data.leaders);
        setMemberModalOpen(false);
        setEditingMember(null);
        setSuccessMsg("Profil anggota tim berhasil disimpan.");
      } else {
        setErrorMsg(data.error || "Gagal menyimpan data anggota.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Member
  const handleDeleteMember = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) return;
    try {
      const res = await fetch(`/api/admin/about/team/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeaders(data.leaders);
        setSuccessMsg("Anggota tim berhasil dihapus.");
      } else {
        setErrorMsg(data.error || "Gagal menghapus anggota.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    }
  };

  // Handle Save Milestone
  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone?.year || !editingMilestone?.title || !editingMilestone?.description) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/about/milestones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMilestone),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMilestones(data.milestones);
        setMilestoneModalOpen(false);
        setEditingMilestone(null);
        setSuccessMsg("Milestone berhasil disimpan.");
      } else {
        setErrorMsg(data.error || "Gagal menyimpan milestone.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Milestone
  const handleDeleteMilestone = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus milestone ini?")) return;
    try {
      const res = await fetch(`/api/admin/about/milestones/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMilestones(data.milestones);
        setSuccessMsg("Milestone berhasil dihapus.");
      } else {
        setErrorMsg(data.error || "Gagal menghapus milestone.");
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
            Manajemen Tim & Profil Perusahaan
          </h1>
          <p className="text-sm text-slate-500">
            Kelola Visi-Misi, Tim Kepemimpinan, Core Values, dan Milestones Brandy.
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
      <div className="flex border-b border-slate-200 gap-1 bg-white p-1 rounded-xl border max-w-md">
        {[
          { id: "team", label: "Anggota Tim", icon: Users },
          { id: "values", label: "Visi, Misi & Values", icon: Target },
          { id: "milestones", label: "Milestones", icon: MilestoneIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* TAB 1: TEAM MEMBERS */}
      {activeTab === "team" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
              Daftar Anggota Tim ({leaders.length})
            </h2>
            <button
              onClick={() => {
                setEditingMember({ name: "", role: "", image: "/team/member_1.png", bio: "", linkedin: "" });
                setMemberModalOpen(true);
              }}
              className="btn btn-primary btn-sm flex items-center gap-1.5"
            >
              <Plus size={14} /> Tambah Anggota
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src={member.image || "/team/member_1.png"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                    <p className="text-xs text-brand-blue-mid font-500">{member.role}</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{member.bio}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
                  {member.linkedin ? (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-blue-mid transition-colors">
                      <Linkedin size={14} />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No LinkedIn</span>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingMember(member);
                        setMemberModalOpen(true);
                      }}
                      className="p-1 text-slate-400 hover:text-brand-blue-mid transition-colors"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VISI, MISI & VALUES */}
      {activeTab === "values" && (
        <form onSubmit={handleSaveAbout} className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="input-mission" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                Misi Perusahaan
              </label>
              <textarea
                id="input-mission"
                rows={3}
                required
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all resize-none"
              />
            </div>
            <div>
              <label htmlFor="input-vision" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">
                Visi Perusahaan
              </label>
              <textarea
                id="input-vision"
                rows={3}
                required
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid focus:ring-3 focus:ring-brand-blue-mid/15 transition-all resize-none"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-sm font-700 uppercase tracking-wider text-slate-700 mb-4">
              Core Values Brandy (B-R-A-N-D-Y)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((val, idx) => (
                <div key={val.key} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                      {val.key}
                    </span>
                    <input
                      type="text"
                      value={val.title}
                      onChange={(e) => {
                        const updated = [...values];
                        updated[idx].title = e.target.value;
                        setValues(updated);
                      }}
                      className="flex-1 h-8 px-2.5 rounded border border-slate-300 text-xs font-bold bg-white focus:outline-none focus:border-brand-blue-mid"
                      placeholder="Judul Value"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={val.description}
                    onChange={(e) => {
                      const updated = [...values];
                      updated[idx].description = e.target.value;
                      setValues(updated);
                    }}
                    className="w-full p-2.5 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-brand-blue-mid resize-none"
                    placeholder="Deskripsi Value..."
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary flex items-center gap-1.5"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={14} />}
              Simpan Visi, Misi & Values
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: MILESTONES */}
      {activeTab === "milestones" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
              Timeline Perjalanan Perusahaan ({milestones.length})
            </h2>
            <button
              onClick={() => {
                setEditingMilestone({ year: "", title: "", description: "" });
                setMilestoneModalOpen(true);
              }}
              className="btn btn-primary btn-sm flex items-center gap-1.5"
            >
              <Plus size={14} /> Tambah Milestone
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            {milestones.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">Belum ada milestone.</p>
            ) : (
              <div className="relative border-l border-slate-200 pl-6 space-y-6">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="relative group">
                    {/* Circle Node */}
                    <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-4 border-white shadow-sm" />
                    
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-amber bg-amber/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Tahun {milestone.year}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{milestone.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">{milestone.description}</p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingMilestone(milestone);
                            setMilestoneModalOpen(true);
                          }}
                          className="p-1 text-slate-400 hover:text-brand-blue-mid transition-colors"
                          title="Edit"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteMilestone(milestone.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TEAM MEMBER MODAL */}
      {memberModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-6 animate-scale-in">
            <h3 className="text-lg font-bold text-slate-900">
              {editingMember.id ? "Edit Anggota Tim" : "Tambah Anggota Tim Baru"}
            </h3>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="member-name" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    id="member-name"
                    value={editingMember.name || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="member-role" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Jabatan / Peran</label>
                  <input
                    type="text"
                    id="member-role"
                    value={editingMember.role || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="member-image" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Path Foto Profil</label>
                  <input
                    type="text"
                    id="member-image"
                    value={editingMember.image || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="member-linkedin" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">LinkedIn URL (Opsional)</label>
                  <input
                    type="text"
                    id="member-linkedin"
                    value={editingMember.linkedin || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="member-bio" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Bio Singkat</label>
                <textarea
                  id="member-bio"
                  rows={3}
                  value={editingMember.bio || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMemberModalOpen(false);
                    setEditingMember(null);
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

      {/* MILESTONE MODAL */}
      {milestoneModalOpen && editingMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-xl space-y-6 animate-scale-in">
            <h3 className="text-lg font-bold text-slate-900">
              {editingMilestone.id ? "Edit Milestone" : "Tambah Milestone Baru"}
            </h3>

            <form onSubmit={handleSaveMilestone} className="space-y-4">
              <div>
                <label htmlFor="milestone-year" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Tahun</label>
                <input
                  type="text"
                  id="milestone-year"
                  value={editingMilestone.year || ""}
                  onChange={(e) => setEditingMilestone({ ...editingMilestone, year: e.target.value })}
                  placeholder="e.g. 2026"
                  maxLength={4}
                  className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  required
                />
              </div>

              <div>
                <label htmlFor="milestone-title" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Judul Pencapaian</label>
                <input
                  type="text"
                  id="milestone-title"
                  value={editingMilestone.title || ""}
                  onChange={(e) => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid"
                  required
                />
              </div>

              <div>
                <label htmlFor="milestone-desc" className="block text-xs font-600 text-slate-700 uppercase tracking-wider mb-2">Keterangan / Detail</label>
                <textarea
                  id="milestone-desc"
                  rows={3}
                  value={editingMilestone.description || ""}
                  onChange={(e) => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-blue-mid resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMilestoneModalOpen(false);
                    setEditingMilestone(null);
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
