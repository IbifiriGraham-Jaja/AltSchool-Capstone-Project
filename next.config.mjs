/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ongmpgjzqnlmluersqku.supabase.co",
      },
    ],
  },
};

export default nextConfig;