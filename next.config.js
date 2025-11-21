/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'firebasestorage.googleapis.com', 'pycvlkcxgfwsquzolkzw.supabase.co'],
  },
  // SPA-like behavior optimization
  trailingSlash: false,
};

module.exports = nextConfig;