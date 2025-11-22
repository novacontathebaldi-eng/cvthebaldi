/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: output: 'export' must be REMOVED to support Server Actions on Vercel
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'pycvlkcxgfwsquzolkzw.supabase.co' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
  // Ensure no trailing slash issues
  trailingSlash: false,
};

module.exports = nextConfig;