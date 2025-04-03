'use client';

import Link from 'next/link';

// Mock data (in a real app, this would come from the API)
const mockStats = {
  total_assets: 42,
  total_categories: 12,
  expiring_warranties: 3,
  expiring_subscriptions: 2,
};

const mockRecentAssets = [
  { id: 1, name: 'MacBook Pro M1', category: 'Tech Products', added: '2023-03-15' },
  { id: 2, name: 'HDMI Cable', category: 'Wires & Cables', added: '2023-03-10' },
  { id: 3, name: 'External SSD', category: 'Hardware', added: '2023-03-05' },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your inventory dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Assets</h2>
          <p className="text-3xl font-bold text-primary-600 mt-2">{mockStats.total_assets}</p>
          <Link href="/assets" className="text-sm text-primary-500 hover:text-primary-700 mt-4 block">
            View all assets &rarr;
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
          <p className="text-3xl font-bold text-primary-600 mt-2">{mockStats.total_categories}</p>
          <Link href="/categories" className="text-sm text-primary-500 hover:text-primary-700 mt-4 block">
            Manage categories &rarr;
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Expiring Warranties</h2>
          <p className="text-3xl font-bold text-orange-500 mt-2">{mockStats.expiring_warranties}</p>
          <Link href="/warranties" className="text-sm text-primary-500 hover:text-primary-700 mt-4 block">
            View expiring warranties &rarr;
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Expiring Subscriptions</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">{mockStats.expiring_subscriptions}</p>
          <Link href="/subscriptions" className="text-sm text-primary-500 hover:text-primary-700 mt-4 block">
            View expiring subscriptions &rarr;
          </Link>
        </div>
      </div>

      {/* Recently Added Assets */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recently Added Assets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added On
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecentAssets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {asset.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.added}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/assets/${asset.id}`} className="text-primary-600 hover:text-primary-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t text-center">
          <Link href="/assets" className="text-sm font-medium text-primary-600 hover:text-primary-800">
            View All Assets
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link 
              href="/assets/new" 
              className="flex items-center text-sm text-gray-700 hover:text-primary-600 p-2 hover:bg-gray-50 rounded"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mr-3">
                +
              </span>
              Add new asset
            </Link>
            <Link 
              href="/categories/new" 
              className="flex items-center text-sm text-gray-700 hover:text-primary-600 p-2 hover:bg-gray-50 rounded"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mr-3">
                +
              </span>
              Create new category
            </Link>
            <Link 
              href="/subscriptions/new" 
              className="flex items-center text-sm text-gray-700 hover:text-primary-600 p-2 hover:bg-gray-50 rounded"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mr-3">
                +
              </span>
              Add new subscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 