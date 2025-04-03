import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-200">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-800 mb-6">
            Personal Inventory Management
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Track and manage all your assets, subscriptions, credentials, and more in one place
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">Asset Management</h2>
              <p className="text-gray-600 mb-4">
                Organize your tech products, wires, hardware, and more with customizable categories
              </p>
              <Link 
                href="/login" 
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition"
              >
                Get Started
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">Subscription Tracking</h2>
              <p className="text-gray-600 mb-4">
                Never miss a renewal with automated notifications for your software and service subscriptions
              </p>
              <Link 
                href="/login" 
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">Technical Products</h3>
              <p className="text-gray-600">
                Phones, tablets, laptops, earphones, and more with custom subcategories
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">Secure Credentials</h3>
              <p className="text-gray-600">
                Safely store and manage login credentials for your various platforms
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">Warranty Tracking</h3>
              <p className="text-gray-600">
                Store warranty information and get reminded before they expire
              </p>
            </div>
          </div>
          
          <Link 
            href="/login" 
            className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition"
          >
            Sign In to Your Inventory
          </Link>
        </div>
      </main>
    </div>
  );
} 