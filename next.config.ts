import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn-sanity.io" },
    { protocol: "https", hostname: "lh3.googleusercntent.com" }
  ],
  domains: ['cdn.sanity.io'], // Add Sanity's CDN
},
reactStrictMode: true,
};


export default nextConfig;
