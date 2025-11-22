/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'pycvlkcxgfwsquzolkzw.supabase.co' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'user-gen-media-assets.s3.amazonaws.com' },
    ],
  },
  // Nenhuma configuração de output 'export' deve ser adicionada aqui para deploy serverless no Vercel
};

module.exports = nextConfig;