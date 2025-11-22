'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the main App component to ensure client-side rendering
// This mimics the SPA behavior within the Next.js App Router
const SpaApp = dynamic(() => import('../App'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-[#2C2C2C] text-[#D4AF37]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <span className="font-serif tracking-widest uppercase text-sm">Loading Art...</span>
      </div>
    </div>
  )
});

export default function Home() {
  return <SpaApp />;
}