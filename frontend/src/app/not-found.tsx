'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-tron-cyan mb-2">404</h1>
          <div className="w-full h-1 bg-tron-cyan mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-semibold text-tron-cyan mb-2">PAGE NOT FOUND</h2>
          <p className="text-tron-cyan/70">The page you are looking for doesn't exist or has been moved.</p>
        </div>
        
        <div className="grid grid-flow-col auto-cols-max gap-4 justify-center mb-8">
          <div className="w-3 h-3 bg-tron-cyan rounded-full animate-pulse delay-75"></div>
          <div className="w-3 h-3 bg-tron-cyan rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-tron-cyan rounded-full animate-pulse delay-300"></div>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="inline-block w-full px-6 py-3 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition"
          >
            RETURN TO DASHBOARD
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-block w-full px-6 py-3 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
          >
            GO BACK
          </button>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tron-cyan to-transparent"></div>
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tron-cyan to-transparent"></div>
      <div className="fixed top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-tron-cyan to-transparent"></div>
      <div className="fixed top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-tron-cyan to-transparent"></div>
    </div>
  );
} 