import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dejahoe.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "dejahoe.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
