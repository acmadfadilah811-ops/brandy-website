"use client";

import Link from "next/link";

const integrations = [
  { name: "Slack", category: "Communication" },
  { name: "Google Workspace", category: "Productivity" },
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "Marketing" },
  { name: "Zoom", category: "Video" },
  { name: "Zapier", category: "Automation" },
  { name: "Stripe", category: "Payment" },
  { name: "Mailchimp", category: "Email" },
  { name: "GitHub", category: "Development" },
  { name: "Jira", category: "Project Mgmt" },
  { name: "Notion", category: "Documentation" },
  { name: "WhatsApp", category: "Messaging" },
];

export default function IntegrationShowcase() {
  return (
    <section
      id="integrations"
      className="section-padding"
      style={{ background: "var(--white)" }}
      aria-labelledby="integrations-heading"
    >
      <div className="container-brand">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left: Text */}
          <div className="lg:w-5/12 mb-12 lg:mb-0">
            <span className="badge badge-blue mb-4" style={{ display: "inline-flex" }}>
              Integrasi
            </span>
            <h2 className="text-heading-xl mb-4" id="integrations-heading">
              Terhubung dengan{" "}
              <span style={{ color: "var(--brand-blue-deep)" }}>
                50+ Tools Favorit
              </span>{" "}
              Kamu
            </h2>
            <p
              className="text-body-lg mb-6"
              style={{ color: "var(--slate-600)" }}
            >
              Brandy berintegrasi mulus dengan tools yang sudah kamu gunakan.
              Tidak perlu mengganti workflow, cukup tambahkan Brandy ke
              ekosistem yang ada.
            </p>
            <Link
              href="/integrations"
              className="btn btn-secondary btn-md inline-flex"
            >
              Lihat Semua Integrasi →
            </Link>
          </div>

          {/* Right: Integration grid */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="rounded-xl p-4 flex flex-col items-center text-center transition-all duration-200 group cursor-pointer"
                  style={{
                    border: "1px solid var(--slate-200)",
                    background: "var(--slate-50)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--brand-blue-mid)";
                    el.style.background = "var(--brand-blue-tint)";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--slate-200)";
                    el.style.background = "var(--slate-50)";
                    el.style.transform = "";
                    el.style.boxShadow = "";
                  }}
                >
                  {/* Logo placeholder */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-xs font-bold"
                    style={{
                      background: "var(--slate-200)",
                      color: "var(--slate-600)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {integration.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span
                    className="text-xs font-600 leading-tight"
                    style={{ color: "var(--slate-700)" }}
                  >
                    {integration.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Stat callout */}
            <div
              className="mt-4 rounded-xl p-4 flex items-center gap-4"
              style={{
                background: "linear-gradient(135deg, var(--brand-blue-deep), var(--brand-purple-deep))",
              }}
            >
              <div>
                <p
                  className="text-display-lg text-white leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  50+
                </p>
              </div>
              <div>
                <p className="text-sm font-600 text-white">Integrasi tersedia</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  dan terus bertambah setiap bulan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
