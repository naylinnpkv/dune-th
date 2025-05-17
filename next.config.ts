import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    COINCAP_API_KEY: process.env.COINCAP_API_KEY,
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
