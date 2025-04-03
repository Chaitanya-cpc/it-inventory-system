'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/components/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const { showToast } = useToast();
  
  // Handle screen resize to collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Mark page as ready
    setPageReady(true);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle sidebar with Alt+S
      if (event.altKey && event.key === 's') {
        setSidebarCollapsed(!sidebarCollapsed);
        event.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarCollapsed]);
  
  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-tron-black text-tron-cyan overflow-hidden">
        <div 
          className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out relative z-10`}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </div>
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="h-16 flex items-center justify-between px-6 border-b border-tron-cyan/30">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-tron-cyan p-2 rounded-md hover:bg-tron-darkblue/20 focus:outline-none"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <button 
                className="text-tron-cyan hover:text-tron-cyan/80"
                onClick={() => showToast({ message: 'No new notifications', type: 'info' })}
                aria-label="Notifications"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <button 
                className="flex items-center text-tron-cyan hover:text-tron-cyan/80"
                onClick={() => showToast({ message: 'User profile not implemented yet', type: 'info' })}
                aria-label="User profile"
              >
                <span className="h-8 w-8 rounded-full border border-tron-cyan flex items-center justify-center text-xs mr-2">FL</span>
                <span className="font-medium tracking-wider hidden md:inline">FLYNN</span>
              </button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto bg-tron-black text-tron-cyan">
            {pageReady ? children : (
              <div className="h-full flex items-center justify-center">
                <div className="text-tron-cyan text-center">
                  <div className="animate-pulse flex space-x-2 items-center">
                    <div className="h-3 w-3 bg-tron-cyan rounded-full"></div>
                    <div className="h-3 w-3 bg-tron-cyan rounded-full"></div>
                    <div className="h-3 w-3 bg-tron-cyan rounded-full"></div>
                  </div>
                  <p className="mt-2">Loading dashboard...</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
} 