import { createClient } from "next-sanity";
import { sanityConfig } from "./client";

export const sanityWriteClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false, // Bypass CDN for read-after-write consistency
});

export const isSanityWriteConfigured = () => {
  return (
    process.env.SANITY_API_WRITE_TOKEN &&
    process.env.SANITY_API_WRITE_TOKEN !== "your-sanity-write-token"
  );
};
