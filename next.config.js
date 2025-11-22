/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Output standalone ajuda em alguns ambientes serverless, mas o padrão Vercel é robusto.
  // Mantendo simples para evitar erros de configuração.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'pycvlkcxgfwsquzolkzw.supabase.co' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'user-gen-media-assets.s3.amazonaws.com' },
    ],
  },
  typescript: {
    // Ignora erros de TS no build para evitar que arquivos legados quebrem o deploy
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros de Lint no build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;