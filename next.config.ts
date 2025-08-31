import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match any request starting with `/api`
        destination: "http://localhost:8000/:path*", // Forward to your backend server
      },
    ];
  },
};

export default nextConfig;