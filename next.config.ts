import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_COINCAP_API_KEY: process.env.NEXT_PUBLIC_COINCAP_API_KEY,
  },
};

export default nextConfig;
