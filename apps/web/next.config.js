// So we can test deploy previews preview
if (process.env.VERCEL_URL && !process.env.NEXT_PUBLIC_WEBAPP_URL) {
  process.env.NEXT_PUBLIC_WEBAPP_URL = "https://" + process.env.VERCEL_URL;
}

const plugins = [];
if (process.env.ANALYZE === "true") {
  // only load dependency if env `ANALYZE` was set
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  plugins.push(withBundleAnalyzer);
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false,
    };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV !== "development",
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== "development",
  },
  reactStrictMode: true,
};

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
