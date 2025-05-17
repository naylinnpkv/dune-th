import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    COINCAP_API_KEY: process.env.COINCAP_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;
