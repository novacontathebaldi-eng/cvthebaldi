
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Output removed to allow Server Actions (Node.js runtime)
  // output: 'export', 
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
