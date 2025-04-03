import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black grid-bg tron-gradient">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-tron-cyan tron-text mb-6 font-orbitron tracking-wider">
            INVENTORY MANAGEMENT SYSTEM
          </h1>
          <p className="text-xl text-tron-cyan/80 mb-12 font-orbitron">
            Track and manage all your assets in the grid
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-black rounded-lg border border-tron-cyan/30 shadow-lg p-6 hover:shadow-tron-cyan/20 transition-all duration-300 group relative">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tron-cyan" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-tron-cyan" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-tron-cyan" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tron-cyan" />
              
              <h2 className="text-2xl font-semibold text-tron-cyan mb-4 font-orbitron tracking-wide">ASSET MANAGEMENT</h2>
              <p className="text-white/80 mb-4 font-orbitron text-sm">
                Organize your tech products, wires, hardware, and more with customizable categories
              </p>
              <Link 
                href="/login" 
                className="inline-block bg-tron-cyan/10 hover:bg-tron-cyan/20 text-tron-cyan border border-tron-cyan/50 hover:border-tron-cyan font-medium py-2 px-4 rounded transition-all duration-300 font-orbitron"
              >
                ACCESS
              </Link>
            </div>
            
            <div className="bg-black rounded-lg border border-tron-cyan/30 shadow-lg p-6 hover:shadow-tron-cyan/20 transition-all duration-300 group relative">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tron-cyan" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-tron-cyan" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-tron-cyan" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tron-cyan" />
              
              <h2 className="text-2xl font-semibold text-tron-cyan mb-4 font-orbitron tracking-wide">SUBSCRIPTION TRACKING</h2>
              <p className="text-white/80 mb-4 font-orbitron text-sm">
                Never miss a renewal with automated notifications for your software and service subscriptions
              </p>
              <Link 
                href="/login" 
                className="inline-block bg-tron-cyan/10 hover:bg-tron-cyan/20 text-tron-cyan border border-tron-cyan/50 hover:border-tron-cyan font-medium py-2 px-4 rounded transition-all duration-300 font-orbitron"
              >
                ACCESS
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black rounded-lg border border-tron-cyan/30 shadow-md p-6 hover:shadow-tron-cyan/20 transition-all duration-300 relative">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-tron-cyan" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-tron-cyan" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-tron-cyan" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-tron-cyan" />
              
              <h3 className="text-xl font-semibold text-tron-cyan mb-3 font-orbitron tracking-wide">TECH PRODUCTS</h3>
              <p className="text-white/70 font-orbitron text-sm">
                Phones, tablets, laptops, earphones with detailed tracking
              </p>
            </div>
            
            <div className="bg-black rounded-lg border border-tron-cyan/30 shadow-md p-6 hover:shadow-tron-cyan/20 transition-all duration-300 relative">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-tron-cyan" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-tron-cyan" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-tron-cyan" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-tron-cyan" />
              
              <h3 className="text-xl font-semibold text-tron-cyan mb-3 font-orbitron tracking-wide">SECURE CREDENTIALS</h3>
              <p className="text-white/70 font-orbitron text-sm">
                Safely store and manage login credentials for various systems
              </p>
            </div>
            
            <div className="bg-black rounded-lg border border-tron-cyan/30 shadow-md p-6 hover:shadow-tron-cyan/20 transition-all duration-300 relative">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-tron-cyan" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-tron-cyan" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-tron-cyan" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-tron-cyan" />
              
              <h3 className="text-xl font-semibold text-tron-cyan mb-3 font-orbitron tracking-wide">WARRANTY TRACKING</h3>
              <p className="text-white/70 font-orbitron text-sm">
                Store warranty information and get reminded before expiration
              </p>
            </div>
          </div>
          
          <Link 
            href="/login" 
            className="inline-block bg-tron-cyan text-black hover:bg-tron-cyan/90 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 font-orbitron tron-glow border border-tron-cyan"
          >
            ENTER THE GRID
          </Link>
        </div>
      </main>
    </div>
  );
} 