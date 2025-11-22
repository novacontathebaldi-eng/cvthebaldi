import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import React from 'react';
import './globals.css';
import Providers from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Melissa Pelussi Art | Contemporary Art Luxembourg',
  description: 'Contemporary Art Store by Melissa Pelussi. Luxury art, prints, and digital assets. Based in Luxembourg.',
  keywords: ['art', 'contemporary art', 'luxembourg', 'abstract', 'digital art', 'melissa pelussi'],
  authors: [{ name: 'Melissa Pelussi' }],
  creator: 'Melissa Pelussi',
  openGraph: {
    type: 'website',
    locale: 'fr_LU',
    url: 'https://pelussi.th3lab.me',
    title: 'Melissa Pelussi Art | Contemporary Art Luxembourg',
    description: 'Contemporary Art Store by Melissa Pelussi. Luxury art, prints, and digital assets.',
    siteName: 'Melissa Pelussi Art',
    images: [
      {
        url: 'https://picsum.photos/seed/og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Melissa Pelussi Art',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body 
        className="bg-light dark:bg-[#0a0a0a] text-primary dark:text-white transition-colors duration-300 overflow-x-hidden font-sans"
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}