'use client';

import React, { Component, ReactNode } from 'react';
import dynamic from 'next/dynamic';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

// Error Boundary Component
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Application Critical Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 text-center z-[9999] relative">
          <div className="w-16 h-16 mb-6 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif mb-2 text-white">Something went wrong</h1>
          <p className="text-gray-400 mb-8 max-w-md">The gallery encountered an unexpected error. Please reload to try again.</p>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-accent text-white rounded-full hover:bg-[#b59328] transition-colors uppercase tracking-widest text-xs font-bold"
          >
            Reload Page
          </button>
          
          <div className="mt-12 p-4 bg-white/5 rounded-lg text-left max-w-2xl w-full overflow-auto max-h-48 border border-white/10">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Error Details (For Support):</p>
            <pre className="text-xs text-red-400 font-mono whitespace-pre-wrap">
                {this.state.error?.toString() || 'Unknown Error'}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const SpaApp = dynamic(() => import('../App'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] text-[#D4AF37] z-[9999]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
            <div className="w-16 h-16 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif font-bold text-lg text-white">M</span>
            </div>
        </div>
        <span className="font-serif tracking-[0.2em] uppercase text-xs text-white/50">Loading Gallery...</span>
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