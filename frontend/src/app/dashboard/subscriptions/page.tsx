'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockSubscriptions = [
  { 
    id: 1, 
    name: 'Netflix Premium', 
    category: 'Streaming', 
    price: '$19.99',
    billingCycle: 'Monthly',
    nextBilling: '2023-06-15',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Adobe Creative Cloud', 
    category: 'Software', 
    price: '$52.99',
    billingCycle: 'Monthly',
    nextBilling: '2023-06-22',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Spotify Family', 
    category: 'Streaming', 
    price: '$14.99',
    billingCycle: 'Monthly',
    nextBilling: '2023-06-05',
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'Microsoft 365', 
    category: 'Software', 
    price: '$99.99',
    billingCycle: 'Yearly',
    nextBilling: '2023-10-12',
    status: 'Active'
  },
  { 
    id: 5, 
    name: 'iCloud+ 2TB', 
    category: 'Cloud Storage', 
    price: '$9.99',
    billingCycle: 'Monthly',
    nextBilling: '2023-06-18',
    status: 'Active'
  },
  { 
    id: 6, 
    name: 'New York Times', 
    category: 'News', 
    price: '$4.99',
    billingCycle: 'Monthly',
    nextBilling: '2023-06-30',
    status: 'Canceled'
  },
];

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredItems = mockSubscriptions.filter(subscription => {
    const matchesSearch = subscription.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || subscription.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Calculate total monthly cost
  const totalMonthlyCost = mockSubscriptions
    .filter(sub => sub.status === 'Active')
    .reduce((total, sub) => {
      const price = parseFloat(sub.price.replace('$', ''));
      if (sub.billingCycle === 'Monthly') {
        return total + price;
      } else if (sub.billingCycle === 'Yearly') {
        return total + (price / 12);
      }
      return total;
    }, 0);
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">SUBSCRIPTIONS</h1>
        <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">MANAGE YOUR DIGITAL SUBSCRIPTIONS</p>
      </header>
      
      <div className="p-6 space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">TOTAL SUBSCRIPTIONS</p>
            <p className="text-2xl font-semibold mt-1">{mockSubscriptions.filter(sub => sub.status === 'Active').length}</p>
          </div>
          <div className="border border-tron-orange/50 rounded p-4 bg-tron-darkblue/30 text-tron-orange">
            <p className="text-xs tracking-wider opacity-70">MONTHLY COST</p>
            <p className="text-2xl font-semibold mt-1">${totalMonthlyCost.toFixed(2)}</p>
          </div>
          <div className="border border-tron-green/50 rounded p-4 bg-tron-darkblue/30 text-tron-green">
            <p className="text-xs tracking-wider opacity-70">NEXT RENEWAL</p>
            <p className="text-2xl font-semibold mt-1">{
              mockSubscriptions
                .filter(sub => sub.status === 'Active')
                .sort((a, b) => new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime())[0]?.nextBilling || 'N/A'
            }</p>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-tron-cyan/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded"
              placeholder="SEARCH SUBSCRIPTIONS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">ALL CATEGORIES</option>
              <option value="Streaming">STREAMING</option>
              <option value="Software">SOFTWARE</option>
              <option value="Cloud Storage">CLOUD STORAGE</option>
              <option value="News">NEWS</option>
            </select>
            
            <Link 
              href="/dashboard/subscriptions/add" 
              className="inline-flex items-center px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ADD SUBSCRIPTION
            </Link>
          </div>
        </div>
        
        {/* Subscriptions table */}
        <div className="border border-tron-cyan/30 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-tron-cyan/30">
              <thead className="bg-tron-darkblue">
                <tr>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Billing Cycle
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Next Billing
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tron-cyan/30 bg-black">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-tron-cyan/50">
                      No subscriptions found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-tron-darkblue/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan">
                        {subscription.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {subscription.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {subscription.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {subscription.billingCycle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {subscription.nextBilling}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          subscription.status === 'Active' ? 'bg-tron-green/20 text-tron-green' : 'bg-tron-red/20 text-tron-red'
                        }`}>
                          {subscription.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-tron-cyan hover:text-tron-cyan/70"
                            onClick={() => {}}
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            className={`${subscription.status === 'Active' ? 'text-tron-orange' : 'text-tron-green'} hover:opacity-70`}
                            onClick={() => {}}
                          >
                            {subscription.status === 'Active' ? (
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 