import type { NextConfig } from "next";

import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: root,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-eu.ssl-images-amazon.com" },
      { protocol: "https", hostname: "cdnjs.cloudflare.com" },
    ],
  },
  webpack(config) {
    const cloneDir = path.join(root, "src/clone");
    for (const rule of config.module.rules) {
      if (typeof rule === "object" && rule !== null && "oneOf" in rule && Array.isArray(rule.oneOf)) {
        rule.oneOf.unshift({
          test: /\.(png|jpe?g|gif|webp|svg|ico)$/i,
          include: cloneDir,
          type: "asset/resource",
        });
        break;
      }
    }
    return config;
  },
};

export default nextConfig;
