"use client";

import { useEffect, useState } from "react";
import { 
  Save, 
  AlertCircle, 
  Building2, 
  Phone, 
  Share2, 
  MapPin, 
  CheckCircle2,
  Sparkles,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { globalSettingsSchema } from "@/lib/validations/settings";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"identity" | "contact" | "social" | "map" | "logo">("identity");
  
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [socialLinkedIn, setSocialLinkedIn] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [socialInstagram, setSocialInstagram] = useState("");
  const [mapsEmbedUrl, setMapsEmbedUrl] = useState("");
  const [logoDarkUrl, setLogoDarkUrl] = useState("");
  const [logoLightUrl, setLogoLightUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setGeneralError(null);
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) {
        throw new Error("Gagal mengambil data pengaturan.");
      }
      const data = await res.json();
      if (data.settings) {
        setCompanyName(data.settings.companyName || "");
        setTagline(data.settings.tagline || "");
        setContactEmail(data.settings.contactEmail || "");
        setContactPhone(data.settings.contactPhone || "");
        setOfficeAddress(data.settings.officeAddress || "");
        setSocialLinkedIn(data.settings.socialLinkedIn || "");
        setSocialTwitter(data.settings.socialTwitter || "");
        setSocialInstagram(data.settings.socialInstagram || "");
        setMapsEmbedUrl(data.settings.mapsEmbedUrl || "");
        setLogoDarkUrl(data.settings.logoDarkUrl || "");
        setLogoLightUrl(data.settings.logoLightUrl || "");
      }
    } catch (err: any) {
      setGeneralError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    setGeneralError(null);
    setSuccessMsg(null);

    const payload = {
      companyName,
      tagline,
      contactEmail,
      contactPhone,
      officeAddress,
      socialLinkedIn,
      socialTwitter,
      socialInstagram,
      mapsEmbedUrl,
      logoDarkUrl,
      logoLightUrl,
    };

    // Client-side Zod validation
    const validation = globalSettingsSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};
      Object.keys(fieldErrors).forEach((key) => {
        const errorArr = (fieldErrors as Record<string, string[] | undefined>)[key];
        formattedErrors[key] = errorArr?.[0] || "Validasi gagal";
      });
      setErrors(formattedErrors);
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal memperbarui pengaturan.");
      }

      const resData = await res.json();
      setSuccessMsg(resData.message || "Pengaturan berhasil disimpan.");
      
      // Auto-hide success message after 4s
      setTimeout(() => {
        setSuccessMsg(null);
      }, 4000);
    } catch (err: any) {
      setGeneralError(err.message || "Terjadi kesalahan server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div>
        <h1 
          className="text-heading-lg font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Pengaturan Global Website
        </h1>
        <p className="text-xs text-slate-500">
          Ubah konfigurasi dasar nama bisnis, data kontak resmi, profil media sosial, dan tautan integrasi peta.
        </p>
      </div>

      {generalError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-error-red flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-250 rounded-xl text-xs text-success-green flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ── TABS NAVIGATION ─────────────────────────────────────── */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("identity")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-600 border-b-2 transition-all whitespace-nowrap ${
            activeTab === "identity"
              ? "border-slate-900 text-slate-900 font-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Building2 size={14} /> Identitas Bisnis
        </button>
        <button
          onClick={() => setActiveTab("logo")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-600 border-b-2 transition-all whitespace-nowrap ${
            activeTab === "logo"
              ? "border-slate-900 text-slate-900 font-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <ImageIcon size={14} /> Logo Website
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-600 border-b-2 transition-all whitespace-nowrap ${
            activeTab === "contact"
              ? "border-slate-900 text-slate-900 font-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Phone size={14} /> Kontak & Alamat
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-600 border-b-2 transition-all whitespace-nowrap ${
            activeTab === "social"
              ? "border-slate-900 text-slate-900 font-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Share2 size={14} /> Media Sosial
        </button>
        <button
          onClick={() => setActiveTab("map")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-600 border-b-2 transition-all whitespace-nowrap ${
            activeTab === "map"
              ? "border-slate-900 text-slate-900 font-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <MapPin size={14} /> Peta Embed
        </button>
      </div>

      {/* ── FORM CONTAINER ──────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-2xl">
        {loading ? (
          <div className="space-y-4" aria-busy="true">
            <div className="h-4 bg-slate-100 rounded w-1/4 animate-pulse" />
            <div className="h-9 bg-slate-100 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-100 rounded w-1/3 animate-pulse" />
            <div className="h-9 bg-slate-100 rounded w-full animate-pulse" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Tab: Business Identity */}
            {activeTab === "identity" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label htmlFor="companyName" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Nama Perusahaan
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.companyName ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                  />
                  {errors.companyName && <p className="text-[10px] text-error-red mt-1.5">{errors.companyName}</p>}
                </div>

                <div>
                  <label htmlFor="tagline" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Tagline Resmi Perusahaan
                  </label>
                  <input
                    id="tagline"
                    type="text"
                    required
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.tagline ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                  />
                  {errors.tagline && <p className="text-[10px] text-error-red mt-1.5">{errors.tagline}</p>}
                </div>
              </div>
            )}

            {/* Tab: Logo Website */}
            {activeTab === "logo" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label htmlFor="logoDarkUrl" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    URL Logo Gelap (Untuk Background Terang)
                  </label>
                  <input
                    id="logoDarkUrl"
                    type="text"
                    value={logoDarkUrl}
                    onChange={(e) => setLogoDarkUrl(e.target.value)}
                    placeholder="e.g. /logo_brandy_full.png"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all"
                  />
                  {logoDarkUrl && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center h-16">
                      <img src={logoDarkUrl} alt="Dark logo preview" className="max-h-10 object-contain" />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="logoLightUrl" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    URL Logo Terang (Untuk Background Gelap)
                  </label>
                  <input
                    id="logoLightUrl"
                    type="text"
                    value={logoLightUrl}
                    onChange={(e) => setLogoLightUrl(e.target.value)}
                    placeholder="e.g. /logo_brandy_full_light.png"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all"
                  />
                  {logoLightUrl && (
                    <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-900 flex items-center justify-center h-16">
                      <img src={logoLightUrl} alt="Light logo preview" className="max-h-10 object-contain" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Contact & Address */}
            {activeTab === "contact" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label htmlFor="contactEmail" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Email Kontak Utama
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.contactEmail ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                  />
                  {errors.contactEmail && <p className="text-[10px] text-error-red mt-1.5">{errors.contactEmail}</p>}
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Nomor WhatsApp / Kontak (Format angka saja)
                  </label>
                  <input
                    id="contactPhone"
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.contactPhone ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                    placeholder="cth: 081234567890"
                  />
                  {errors.contactPhone && <p className="text-[10px] text-error-red mt-1.5">{errors.contactPhone}</p>}
                </div>

                <div>
                  <label htmlFor="officeAddress" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Alamat Kantor Resmi
                  </label>
                  <textarea
                    id="officeAddress"
                    required
                    rows={3}
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.officeAddress ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                  />
                  {errors.officeAddress && <p className="text-[10px] text-error-red mt-1.5">{errors.officeAddress}</p>}
                </div>
              </div>
            )}

            {/* Tab: Social Networks */}
            {activeTab === "social" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label htmlFor="socialLinkedIn" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    LinkedIn Profil URL
                  </label>
                  <input
                    id="socialLinkedIn"
                    type="text"
                    value={socialLinkedIn}
                    onChange={(e) => setSocialLinkedIn(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.socialLinkedIn ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                    placeholder="https://linkedin.com/company/brandy"
                  />
                  {errors.socialLinkedIn && <p className="text-[10px] text-error-red mt-1.5">{errors.socialLinkedIn}</p>}
                </div>

                <div>
                  <label htmlFor="socialTwitter" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Twitter / X Profil URL
                  </label>
                  <input
                    id="socialTwitter"
                    type="text"
                    value={socialTwitter}
                    onChange={(e) => setSocialTwitter(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.socialTwitter ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                    placeholder="https://twitter.com/brandy_id"
                  />
                  {errors.socialTwitter && <p className="text-[10px] text-error-red mt-1.5">{errors.socialTwitter}</p>}
                </div>

                <div>
                  <label htmlFor="socialInstagram" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Instagram Profil URL
                  </label>
                  <input
                    id="socialInstagram"
                    type="text"
                    value={socialInstagram}
                    onChange={(e) => setSocialInstagram(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.socialInstagram ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                    placeholder="https://instagram.com/brandy.id"
                  />
                  {errors.socialInstagram && <p className="text-[10px] text-error-red mt-1.5">{errors.socialInstagram}</p>}
                </div>
              </div>
            )}

            {/* Tab: Google Maps Embed */}
            {activeTab === "map" && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label htmlFor="mapsEmbedUrl" className="block text-xs font-600 uppercase tracking-wider text-slate-500 mb-2">
                    Google Maps Embed URL (src link dari menu bagikan peta)
                  </label>
                  <input
                    id="mapsEmbedUrl"
                    type="text"
                    value={mapsEmbedUrl}
                    onChange={(e) => setMapsEmbedUrl(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue-mid focus:ring-2 focus:ring-brand-blue-deep/20 transition-all ${
                      errors.mapsEmbedUrl ? "border-error-red focus:ring-red-200/20" : "border-slate-200"
                    }`}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                  {errors.mapsEmbedUrl && <p className="text-[10px] text-error-red mt-1.5">{errors.mapsEmbedUrl}</p>}
                </div>

                {mapsEmbedUrl && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-600 text-slate-400 uppercase tracking-wider">Pratinjau Peta:</p>
                    <div className="border border-slate-200 rounded-lg overflow-hidden h-48 bg-slate-100">
                      <iframe
                        src={mapsEmbedUrl}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        title="Google Maps Brandy Location Preview"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-450 italic flex items-center gap-1">
                <Sparkles size={11} className="text-brand-blue-mid animate-pulse" /> Terproteksi enkripsi SSL
              </span>
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={saving}
                icon={<Save size={14} />}
                iconPosition="left"
              >
                Simpan Konfigurasi
              </Button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
