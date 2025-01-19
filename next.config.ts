import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:id-:lang",
        destination: "/blog?id=:slug&lang=:lang",
      },
    ];
  },
};

export default nextConfig;
