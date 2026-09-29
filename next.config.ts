import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'djangobnb.duckdns.org',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
