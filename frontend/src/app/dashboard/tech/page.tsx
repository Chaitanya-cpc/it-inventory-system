'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockTechItems = [
  { id: 1, name: 'Dell XPS 15 Laptop', category: 'Computers', status: 'Active', lastChecked: '2023-05-10', location: 'Office' },
  { id: 2, name: 'iPhone 13 Pro', category: 'Mobile Devices', status: 'Active', lastChecked: '2023-05-12', location: 'Personal' },
  { id: 3, name: 'Samsung T5 SSD 1TB', category: 'Storage', status: 'Active', lastChecked: '2023-04-22', location: 'Office' },
  { id: 4, name: 'Logitech MX Master 3', category: 'Peripherals', status: 'Active', lastChecked: '2023-05-05', location: 'Office' },
  { id: 5, name: 'iPad Pro 12.9"', category: 'Mobile Devices', status: 'Maintenance', lastChecked: '2023-05-01', location: 'Personal' },
  { id: 6, name: 'Raspberry Pi 4', category: 'Computers', status: 'Inactive', lastChecked: '2023-03-15', location: 'Lab' },
];

export default function TechProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredItems = mockTechItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">TECH PRODUCTS</h1>
        <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">MANAGE YOUR TECHNOLOGY ASSETS</p>
      </header>
      
      <div className="p-6 space-y-6">
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
              placeholder="SEARCH TECH ITEMS..."
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
              <option value="Computers">COMPUTERS</option>
              <option value="Mobile Devices">MOBILE DEVICES</option>
              <option value="Storage">STORAGE</option>
              <option value="Peripherals">PERIPHERALS</option>
            </select>
            
            <Link 
              href="/dashboard/tech/add" 
              className="inline-flex items-center px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ADD ITEM
            </Link>
          </div>
        </div>
        
        {/* Tech items table */}
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Last Checked
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-right text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tron-cyan/30 bg-black">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-tron-cyan/50">
                      No tech items found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-tron-darkblue/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === 'Active' ? 'bg-tron-green/20 text-tron-green' :
                          item.status === 'Maintenance' ? 'bg-tron-orange/20 text-tron-orange' :
                          'bg-tron-red/20 text-tron-red'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {item.lastChecked}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {item.location}
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
                            className="text-tron-red hover:text-tron-red/70"
                            onClick={() => {}}
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
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