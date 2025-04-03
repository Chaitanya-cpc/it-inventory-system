'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Simple sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Simplified mobile sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 flex ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <SimpleSidebar pathname={pathname} />
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className={`hidden md:flex md:flex-shrink-0 ${sidebarOpen ? 'md:w-64' : 'md:w-16'}`}>
        <div className="flex flex-col w-full">
          <SimpleSidebar pathname={pathname} isCollapsed={!sidebarOpen} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}

// Simplified sidebar component for the example
function SimpleSidebar({ pathname, isCollapsed = false }: { pathname: string, isCollapsed?: boolean }) {
  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="h-0 flex-1 flex flex-col bg-white shadow overflow-y-auto">
      <div className="flex-1 flex flex-col pt-5 pb-4">
        <div className="flex items-center flex-shrink-0 px-4 mb-5">
          <h1 className={`text-xl font-bold text-primary-800 ${isCollapsed ? 'hidden' : ''}`}>Inventory</h1>
          {isCollapsed && (
            <span className="text-xl font-bold text-primary-800">I</span>
          )}
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {/* Dashboard link */}
          <a
            href="/dashboard"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isLinkActive('/dashboard') 
                ? 'bg-primary-100 text-primary-900' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg 
              className={`mr-3 h-6 w-6 ${isLinkActive('/dashboard') ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            {!isCollapsed && <span>Dashboard</span>}
          </a>
          
          {/* Assets link */}
          <a
            href="/assets"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isLinkActive('/assets') 
                ? 'bg-primary-100 text-primary-900' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg 
              className={`mr-3 h-6 w-6 ${isLinkActive('/assets') ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" 
              />
            </svg>
            {!isCollapsed && <span>Assets</span>}
          </a>
          
          {/* Subscriptions link */}
          <a
            href="/subscriptions"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isLinkActive('/subscriptions') 
                ? 'bg-primary-100 text-primary-900' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg 
              className={`mr-3 h-6 w-6 ${isLinkActive('/subscriptions') ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            {!isCollapsed && <span>Subscriptions</span>}
          </a>
          
          {/* Credentials link */}
          <a
            href="/credentials"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isLinkActive('/credentials') 
                ? 'bg-primary-100 text-primary-900' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg 
              className={`mr-3 h-6 w-6 ${isLinkActive('/credentials') ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
              />
            </svg>
            {!isCollapsed && <span>Credentials</span>}
          </a>
        </nav>
      </div>
      
      {/* User profile */}
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <svg 
                className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">User Name</p>
                <a href="/logout" className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 