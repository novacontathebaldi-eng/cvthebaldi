import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import React from 'react';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Melissa Pelussi Art | Contemporary Art Luxembourg',
  description: 'Contemporary Art Store by Melissa Pelussi. Luxury art, prints, and digital assets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-light dark:bg-primary text-primary dark:text-white transition-colors duration-300 overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}