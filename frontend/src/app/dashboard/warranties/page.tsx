'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockWarranties = [
  { 
    id: 1, 
    item: 'Dell XPS 15 Laptop', 
    expirationDate: '2025-06-15', 
    purchaseDate: '2023-06-15',
    status: 'Active',
    provider: 'Dell Premium Support',
    details: 'Covers hardware and technical support'
  },
  { 
    id: 2, 
    item: 'iPhone 13 Pro', 
    expirationDate: '2023-07-22', 
    purchaseDate: '2022-07-22',
    status: 'Expiring Soon',
    provider: 'AppleCare+',
    details: 'Covers hardware and accidental damage'
  },
  { 
    id: 3, 
    item: 'LG OLED TV', 
    expirationDate: '2024-01-10', 
    purchaseDate: '2022-01-10',
    status: 'Active',
    provider: 'LG Extended Warranty',
    details: 'Covers panel and electronic components'
  },
  { 
    id: 4, 
    item: 'Sony WH-1000XM4 Headphones', 
    expirationDate: '2023-08-05', 
    purchaseDate: '2022-08-05',
    status: 'Expiring Soon',
    provider: 'Sony Warranty',
    details: 'Standard manufacturer warranty'
  },
  { 
    id: 5, 
    item: 'Samsung Galaxy S21', 
    expirationDate: '2023-03-15', 
    purchaseDate: '2022-03-15',
    status: 'Expired',
    provider: 'Samsung Care',
    details: 'Covered hardware issues and technical support'
  },
];

export default function WarrantiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const filteredItems = mockWarranties.filter(warranty => {
    const matchesSearch = warranty.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || warranty.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Function to determine days remaining and status
  const getDaysRemaining = (expirationDate: string) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Function to get appropriate color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-tron-green/20 text-tron-green';
      case 'Expiring Soon':
        return 'bg-tron-orange/20 text-tron-orange';
      case 'Expired':
        return 'bg-tron-red/20 text-tron-red';
      default:
        return 'bg-tron-cyan/20 text-tron-cyan';
    }
  };
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">WARRANTIES</h1>
        <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">TRACK YOUR PRODUCT WARRANTIES</p>
      </header>
      
      <div className="p-6 space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">TOTAL WARRANTIES</p>
            <p className="text-2xl font-semibold mt-1">{mockWarranties.length}</p>
          </div>
          <div className="border border-tron-orange/50 rounded p-4 bg-tron-darkblue/30 text-tron-orange">
            <p className="text-xs tracking-wider opacity-70">EXPIRING SOON</p>
            <p className="text-2xl font-semibold mt-1">{mockWarranties.filter(w => w.status === 'Expiring Soon').length}</p>
          </div>
          <div className="border border-tron-red/50 rounded p-4 bg-tron-darkblue/30 text-tron-red">
            <p className="text-xs tracking-wider opacity-70">EXPIRED</p>
            <p className="text-2xl font-semibold mt-1">{mockWarranties.filter(w => w.status === 'Expired').length}</p>
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
              placeholder="SEARCH WARRANTIES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">ALL STATUS</option>
              <option value="Active">ACTIVE</option>
              <option value="Expiring Soon">EXPIRING SOON</option>
              <option value="Expired">EXPIRED</option>
            </select>
            
            <Link 
              href="/dashboard/warranties/add" 
              className="inline-flex items-center px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ADD WARRANTY
            </Link>
          </div>
        </div>
        
        {/* Warranties table */}
        <div className="border border-tron-cyan/30 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-tron-cyan/30">
              <thead className="bg-tron-darkblue">
                <tr>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Purchase Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Expiration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Time Remaining
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
                      No warranties found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((warranty) => {
                    const daysRemaining = getDaysRemaining(warranty.expirationDate);
                    
                    return (
                      <tr key={warranty.id} className="hover:bg-tron-darkblue/50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan">
                          {warranty.item}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                          {warranty.provider}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                          {warranty.purchaseDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                          {warranty.expirationDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                          {daysRemaining > 0 ? `${daysRemaining} days` : 'Expired'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(warranty.status)}`}>
                            {warranty.status.toUpperCase()}
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 