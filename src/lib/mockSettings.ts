export interface GlobalSettings {
  companyName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  socialLinkedIn: string;
  socialTwitter: string;
  socialInstagram: string;
  mapsEmbedUrl: string;
  logoDarkUrl?: string;
  logoLightUrl?: string;
}

export const mockSettings: GlobalSettings = {
  companyName: "Brandy",
  tagline: "tumbuh bersama",
  contactEmail: "info@brandy.id",
  contactPhone: "081234567890",
  officeAddress: "Gedung Cyber 2 Lt. 17, Jl. H.R. Rasuna Said Block X-5, Jakarta Selatan 12950, Indonesia",
  socialLinkedIn: "https://linkedin.com/company/brandy",
  socialTwitter: "https://twitter.com/brandy_id",
  socialInstagram: "https://instagram.com/brandy.id",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2672583803155!2d106.8277259746358!3d-6.228453493759958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fa0cf72691%3A0xe510b64beaf7c030!2sCyber%202%20Tower!5e0!3m2!1sen!2sid!4v1718500000000!5m2!1sen!2sid",
  logoDarkUrl: "/logo_brandy_full.png",
  logoLightUrl: "/logo_brandy_full_light.png",
};
