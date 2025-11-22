'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white p-6 text-center">
          <h1 className="text-3xl font-serif mb-4 text-accent">Something went wrong</h1>
          <p className="text-gray-400 mb-4 max-w-md">We are having trouble loading the gallery. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-accent text-white rounded hover:bg-[#b59328] transition-colors uppercase tracking-widest text-sm"
          >
            Refresh Page
          </button>
          <pre className="mt-8 p-4 bg-black/50 rounded text-left text-xs text-red-400 overflow-auto max-w-full">
            {this.state.error?.message || 'Unknown Error'}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

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
  return (
    <ErrorBoundary>
      <SpaApp />
    </ErrorBoundary>
  );
}