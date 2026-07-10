import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.resolve.alias["@"] = join(__dirname, "src");
    return config;
  }
};

export default nextConfig;
