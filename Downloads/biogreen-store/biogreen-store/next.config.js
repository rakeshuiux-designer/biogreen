/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tell Next.js not to bundle these Node.js-only packages into
  // the client-side bundle — they're server-only (API routes, Server Components)
  serverExternalPackages: ["pg"],
  images: {
    remotePatterns: [],
  },
  webpack: (config) => {
    // pg has an optional native addon (pg-native) that isn't installed
    // and isn't needed — we only use the pure-JS driver. Tell webpack to
    // ignore it instead of trying (and failing) to resolve it.
    config.resolve.alias = {
      ...config.resolve.alias,
      "pg-native": false,
    };
    return config;
  },
};

module.exports = nextConfig;
