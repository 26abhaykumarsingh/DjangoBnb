import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '137.23.43.24',
        port: '8000',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
