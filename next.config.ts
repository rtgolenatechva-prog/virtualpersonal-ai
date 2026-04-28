import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "www.virtualpersonal.ai" }],
        destination: "https://virtualpersonal.ai/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
