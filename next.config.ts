import type { NextConfig } from "next";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },

      {
        protocol: "https",
        hostname: "d23k61tiwy13nu.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
