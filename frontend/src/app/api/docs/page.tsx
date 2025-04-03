'use client';

import Link from 'next/link';

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-black text-tron-cyan">
      <header className="px-6 py-4 border-b border-tron-cyan/30 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">API DOCUMENTATION</h1>
          <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">INTEGRATION GUIDE FOR DEVELOPERS</p>
        </div>
        <Link
          href="/dashboard/settings"
          className="text-tron-cyan hover:text-tron-cyan/70 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          BACK TO SETTINGS
        </Link>
      </header>

      <main className="max-w-5xl mx-auto py-10 px-6">
        <div className="border border-tron-cyan/30 rounded overflow-hidden mb-10">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">OVERVIEW</h2>
          </div>
          <div className="p-6 bg-black">
            <p className="text-tron-cyan/80 mb-4">
              The TRON Inventory System API allows external applications to access and modify inventory data. 
              All API endpoints require authentication using an API key, which can be generated in the settings panel.
            </p>
            <div className="bg-tron-darkblue/30 border border-tron-cyan/20 rounded p-4 my-4">
              <p className="text-tron-cyan/90 font-mono">BASE URL: https://api.troninventory.system/v1</p>
            </div>
            <p className="text-tron-cyan/80">
              All requests must include your API key in the Authorization header:
            </p>
            <div className="bg-tron-darkblue/30 border border-tron-cyan/20 rounded p-4 my-4 font-mono text-tron-cyan/90">
              <p>Authorization: Bearer YOUR_API_KEY</p>
            </div>
          </div>
        </div>

        <div className="border border-tron-cyan/30 rounded overflow-hidden mb-10">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">ENDPOINTS</h2>
          </div>
          <div className="divide-y divide-tron-cyan/20">
            {/* Hardware Endpoints */}
            <div className="p-6 bg-black">
              <h3 className="text-xl text-tron-cyan mb-4">Hardware</h3>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-green/20 text-tron-green px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                  <code className="text-tron-cyan/90 font-mono">/hardware</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Get a list of all hardware items</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-green/20 text-tron-green px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                  <code className="text-tron-cyan/90 font-mono">/hardware/:id</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Get details for a specific hardware item</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-blue/20 text-tron-blue px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                  <code className="text-tron-cyan/90 font-mono">/hardware</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Create a new hardware item</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-orange/20 text-tron-orange px-2 py-1 rounded text-xs font-bold mr-2">PUT</span>
                  <code className="text-tron-cyan/90 font-mono">/hardware/:id</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Update an existing hardware item</p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-tron-red/20 text-tron-red px-2 py-1 rounded text-xs font-bold mr-2">DELETE</span>
                  <code className="text-tron-cyan/90 font-mono">/hardware/:id</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Delete a hardware item</p>
              </div>
            </div>
            
            {/* Warranties Endpoints */}
            <div className="p-6 bg-black">
              <h3 className="text-xl text-tron-cyan mb-4">Warranties</h3>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-green/20 text-tron-green px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                  <code className="text-tron-cyan/90 font-mono">/warranties</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Get a list of all warranties</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-green/20 text-tron-green px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                  <code className="text-tron-cyan/90 font-mono">/warranties/:id</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Get details for a specific warranty</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-blue/20 text-tron-blue px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                  <code className="text-tron-cyan/90 font-mono">/warranties</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Create a new warranty</p>
              </div>
            </div>
            
            {/* Subscriptions Endpoints */}
            <div className="p-6 bg-black">
              <h3 className="text-xl text-tron-cyan mb-4">Subscriptions</h3>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-green/20 text-tron-green px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                  <code className="text-tron-cyan/90 font-mono">/subscriptions</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Get a list of all subscriptions</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-tron-green/20 text-tron-green px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                  <code className="text-tron-cyan/90 font-mono">/subscriptions/:id</code>
                </div>
                <p className="text-tron-cyan/80 ml-14">Get details for a specific subscription</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-tron-cyan/30 rounded overflow-hidden">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">AUTHENTICATION</h2>
          </div>
          <div className="p-6 bg-black">
            <p className="text-tron-cyan/80 mb-4">
              To authenticate with the API, generate an API key in the Settings page under the API Access tab.
              All API requests must include this key in the Authorization header.
            </p>
            
            <div className="bg-tron-darkblue/30 border border-tron-cyan/20 rounded p-4 my-4">
              <p className="text-tron-cyan/90 mb-2 font-bold">EXAMPLE REQUEST:</p>
              <pre className="text-tron-cyan/90 font-mono">
{`fetch('https://api.troninventory.system/v1/hardware', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer TRN_a1b2c3d4e5f6g7h8i9j0',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 