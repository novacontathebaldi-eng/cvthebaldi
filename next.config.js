
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export' removed to allow Server Actions
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'pycvlkcxgfwsquzolkzw.supabase.co' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
  // SPA-like behavior optimization
  trailingSlash: false,
};

module.exports = nextConfig;
