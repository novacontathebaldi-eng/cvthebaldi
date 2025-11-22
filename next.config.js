/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'pycvlkcxgfwsquzolkzw.supabase.co' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
};

module.exports = nextConfig;