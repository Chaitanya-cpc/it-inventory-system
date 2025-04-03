'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Here you could also log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center p-8 border border-tron-cyan/30 rounded-lg bg-tron-darkblue/20 max-w-lg">
            <svg 
              className="mx-auto h-16 w-16 text-tron-red" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <h1 className="mt-4 text-2xl font-semibold text-tron-cyan">System Error</h1>
            <p className="mt-2 text-tron-cyan/70">
              The system has encountered an unexpected error.
            </p>
            {this.state.error && (
              <div className="mt-4 p-3 bg-black/50 rounded border border-tron-red/30 text-tron-red/80 text-sm text-left overflow-auto">
                <p className="font-mono">{this.state.error.toString()}</p>
              </div>
            )}
            <div className="mt-6 flex justify-center space-x-4">
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition"
              >
                RELOAD PAGE
              </button>
              <Link 
                href="/dashboard" 
                className="px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
              >
                RETURN TO DASHBOARD
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 