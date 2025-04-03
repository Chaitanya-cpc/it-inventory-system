'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockCategories } from '../page';

// Mock items for each category
const mockItemsByCategory = {
  '1': [ // Computers
    { id: 101, name: 'Dell XPS 15 Laptop', location: 'Office', status: 'Active', lastUpdated: '2023-04-10' },
    { id: 102, name: 'MacBook Pro 16', location: 'Home Office', status: 'Active', lastUpdated: '2023-03-22' },
    { id: 103, name: 'Lenovo ThinkPad', location: 'Meeting Room', status: 'Maintenance', lastUpdated: '2023-02-15' },
    { id: 104, name: 'Custom Desktop PC', location: 'Dev Room', status: 'Active', lastUpdated: '2023-01-30' },
  ],
  '2': [ // Mobile Devices
    { id: 201, name: 'iPhone 13 Pro', location: 'With John', status: 'Active', lastUpdated: '2023-04-05' },
    { id: 202, name: 'Samsung Galaxy S21', location: 'With Sarah', status: 'Active', lastUpdated: '2023-03-12' },
    { id: 203, name: 'iPad Pro 12.9', location: 'Conference Room', status: 'Active', lastUpdated: '2023-02-28' },
  ],
  '3': [ // Peripherals
    { id: 301, name: 'Logitech MX Keys', location: 'Office', status: 'Active', lastUpdated: '2023-04-02' },
    { id: 302, name: 'Logitech MX Master 3', location: 'Office', status: 'Active', lastUpdated: '2023-04-02' },
    { id: 303, name: 'Blue Yeti Microphone', location: 'Meeting Room', status: 'Active', lastUpdated: '2023-03-15' },
    { id: 304, name: 'Webcam Logitech C920', location: 'Conference Room', status: 'Active', lastUpdated: '2023-02-10' },
  ],
  '4': [ // Storage
    { id: 401, name: 'WD 4TB External Drive', location: 'IT Office', status: 'Active', lastUpdated: '2023-03-25' },
    { id: 402, name: 'Synology NAS DS920+', location: 'Server Room', status: 'Active', lastUpdated: '2023-01-18' },
    { id: 403, name: 'Samsung T7 SSD 1TB', location: 'IT Office', status: 'Active', lastUpdated: '2023-02-05' },
  ],
  '5': [ // Networking
    { id: 501, name: 'Cisco Switch', location: 'Server Room', status: 'Active', lastUpdated: '2023-01-10' },
    { id: 502, name: 'Ubiquiti Access Point', location: 'Office Floor', status: 'Active', lastUpdated: '2023-02-22' },
    { id: 503, name: 'Mikrotik Router', location: 'Server Room', status: 'Active', lastUpdated: '2023-03-17' },
  ],
  '6': [ // Accessories
    { id: 601, name: 'USB-C Hub', location: 'Supply Cabinet', status: 'Available', lastUpdated: '2023-04-01' },
    { id: 602, name: 'HDMI Cable Bundle', location: 'Supply Cabinet', status: 'Available', lastUpdated: '2023-04-01' },
    { id: 603, name: 'Laptop Stand', location: 'Supply Cabinet', status: 'Available', lastUpdated: '2023-04-01' },
  ],
  '7': [ // Software
    { id: 701, name: 'Adobe Creative Cloud', location: 'Digital', status: 'Active', lastUpdated: '2023-03-01' },
    { id: 702, name: 'Microsoft Office 365', location: 'Digital', status: 'Active', lastUpdated: '2023-02-15' },
    { id: 703, name: 'Slack Enterprise', location: 'Digital', status: 'Active', lastUpdated: '2023-01-20' },
  ],
  '8': [ // Cloud Services
    { id: 801, name: 'AWS Account', location: 'Digital', status: 'Active', lastUpdated: '2023-03-05' },
    { id: 802, name: 'Google Cloud Platform', location: 'Digital', status: 'Active', lastUpdated: '2023-02-25' },
    { id: 803, name: 'Azure Subscription', location: 'Digital', status: 'Active', lastUpdated: '2023-01-15' },
  ],
  '9': [ // Entertainment
    { id: 901, name: 'PlayStation 5', location: 'Break Room', status: 'Active', lastUpdated: '2023-02-10' },
    { id: 902, name: 'Smart TV 55"', location: 'Meeting Room', status: 'Active', lastUpdated: '2023-01-28' },
    { id: 903, name: 'Bluetooth Speaker', location: 'Break Room', status: 'Active', lastUpdated: '2023-03-20' },
  ],
};

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  const categoryId = params.id;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [category, setCategory] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch the category and its items from an API
    const categoryItems = mockItemsByCategory[categoryId] || [];

    // Find the actual category based on ID
    const categoryNames = [
      'Computers', 'Mobile Devices', 'Peripherals', 'Storage', 
      'Networking', 'Accessories', 'Software', 'Cloud Services', 'Entertainment'
    ];
    
    const categoryName = categoryNames[parseInt(categoryId) - 1] || 'Unknown Category';
    
    setCategory({
      id: parseInt(categoryId),
      name: categoryName,
      itemCount: categoryItems.length,
      description: `Items in the ${categoryName} category`,
    });
    
    setItems(categoryItems);
  }, [categoryId]);
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-tron-green/20 text-tron-green';
      case 'Maintenance':
        return 'bg-tron-orange/20 text-tron-orange';
      case 'Inactive':
        return 'bg-tron-red/20 text-tron-red';
      case 'Available':
        return 'bg-tron-cyan/20 text-tron-cyan';
      default:
        return 'bg-tron-cyan/20 text-tron-cyan';
    }
  };
  
  if (!category) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-tron-cyan">
          <svg className="animate-spin h-8 w-8 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading category data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">{category.name}</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">{category.description || 'CATEGORY INVENTORY ITEMS'}</p>
          </div>
          <Link 
            href="/dashboard/categories"
            className="text-tron-cyan hover:text-tron-cyan/70 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            BACK TO CATEGORIES
          </Link>
        </div>
      </header>
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">TOTAL ITEMS</p>
            <p className="text-2xl font-semibold mt-1">{items.length}</p>
          </div>
          <div className="border border-tron-green/50 rounded p-4 bg-tron-darkblue/30 text-tron-green">
            <p className="text-xs tracking-wider opacity-70">ACTIVE ITEMS</p>
            <p className="text-2xl font-semibold mt-1">{items.filter(item => item.status === 'Active').length}</p>
          </div>
          <div className="border border-tron-orange/50 rounded p-4 bg-tron-darkblue/30 text-tron-orange">
            <p className="text-xs tracking-wider opacity-70">MAINTENANCE</p>
            <p className="text-2xl font-semibold mt-1">{items.filter(item => item.status === 'Maintenance').length}</p>
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
              placeholder={`SEARCH ${category.name.toUpperCase()}...`}
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
              <option value="Maintenance">MAINTENANCE</option>
              <option value="Inactive">INACTIVE</option>
              <option value="Available">AVAILABLE</option>
            </select>
            
            <Link 
              href={`/dashboard/categories/${categoryId}/add`}
              className="inline-flex items-center px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ADD ITEM
            </Link>
          </div>
        </div>
        
        {/* Items table */}
        <div className="border border-tron-cyan/30 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-tron-cyan/30">
              <thead className="bg-tron-darkblue">
                <tr>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Last Updated
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
                    <td colSpan={5} className="px-6 py-4 text-center text-tron-cyan/50">
                      No items found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-tron-darkblue/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {item.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-tron-cyan hover:text-tron-cyan/70"
                            onClick={() => {}}
                            title="View Details"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            className="text-tron-cyan hover:text-tron-cyan/70"
                            onClick={() => {}}
                            title="Edit Item"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            className="text-tron-red hover:text-tron-red/70"
                            onClick={() => {}}
                            title="Delete Item"
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