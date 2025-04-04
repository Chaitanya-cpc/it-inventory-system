'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultHardwareItems = [
  { id: 1, name: 'Dell XPS 15 Laptop', category: 'Computer', status: 'Active', location: 'Office', purchaseDate: '2022-05-15', warranty: '2025-05-15' },
  { id: 2, name: 'Corsair K70 Keyboard', category: 'Peripheral', status: 'Active', location: 'Office', purchaseDate: '2021-11-03', warranty: '2023-11-03' },
  { id: 3, name: 'Cisco Router 2900', category: 'Network', status: 'Active', location: 'Server Room', purchaseDate: '2020-07-22', warranty: '2023-07-22' },
  { id: 4, name: 'HP LaserJet Printer', category: 'Printer', status: 'Maintenance', location: 'Office', purchaseDate: '2019-03-10', warranty: '2022-03-10' },
  { id: 5, name: 'Logitech MX Master Mouse', category: 'Peripheral', status: 'Active', location: 'Office', purchaseDate: '2022-01-05', warranty: '2024-01-05' },
  { id: 6, name: 'Raspberry Pi 4', category: 'Computer', status: 'Inactive', location: 'Lab', purchaseDate: '2021-09-18', warranty: '2023-09-18' },
  { id: 7, name: 'Netgear Switch 24-Port', category: 'Network', status: 'Active', location: 'Server Room', purchaseDate: '2020-11-30', warranty: '2023-11-30' },
  { id: 8, name: 'Dell U2720Q Monitor', category: 'Display', status: 'Active', location: 'Office', purchaseDate: '2021-06-14', warranty: '2024-06-14' },
];

export default function HardwarePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [hardwareItems, setHardwareItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  
  // Load hardware items from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('hardwareItems');
      
      if (storedItems) {
        setHardwareItems(JSON.parse(storedItems));
      } else {
        // Initialize with default data if nothing in localStorage
        setHardwareItems(defaultHardwareItems);
        localStorage.setItem('hardwareItems', JSON.stringify(defaultHardwareItems));
      }
    }
  }, []);
  
  const filteredItems = hardwareItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const categories = Array.from(new Set(hardwareItems.map(item => item.category)));
  const statuses = Array.from(new Set(hardwareItems.map(item => item.status)));

  // Format date to display in MM/DD/YYYY format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  
  // Calculate if warranty is expired
  const isExpired = (dateString: string) => {
    const today = new Date();
    const warrantyDate = new Date(dateString);
    return today > warrantyDate;
  };
  
  // Handle item deletion
  const handleDeleteItem = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };
  
  // Confirm deletion
  const confirmDelete = () => {
    if (itemToDelete === null) return;
    
    const updatedItems = hardwareItems.filter(item => item.id !== itemToDelete);
    setHardwareItems(updatedItems);
    localStorage.setItem('hardwareItems', JSON.stringify(updatedItems));
    
    setShowDeleteModal(false);
    setItemToDelete(null);
  };
  
  // Handle status change
  const changeItemStatus = (id: number, newStatus: string) => {
    const updatedItems = hardwareItems.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    setHardwareItems(updatedItems);
    localStorage.setItem('hardwareItems', JSON.stringify(updatedItems));
  };
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">HARDWARE</h1>
        <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">SYSTEM COMPONENTS</p>
      </header>
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">TOTAL HARDWARE</p>
            <p className="text-2xl font-semibold mt-1">{hardwareItems.length}</p>
          </div>
          <div className="border border-tron-green/50 rounded p-4 bg-tron-darkblue/30 text-tron-green">
            <p className="text-xs tracking-wider opacity-70">ACTIVE</p>
            <p className="text-2xl font-semibold mt-1">{hardwareItems.filter(item => item.status === 'Active').length}</p>
          </div>
          <div className="border border-tron-orange/50 rounded p-4 bg-tron-darkblue/30 text-tron-orange">
            <p className="text-xs tracking-wider opacity-70">MAINTENANCE</p>
            <p className="text-2xl font-semibold mt-1">{hardwareItems.filter(item => item.status === 'Maintenance').length}</p>
          </div>
          <div className="border border-tron-red/50 rounded p-4 bg-tron-darkblue/30 text-tron-red">
            <p className="text-xs tracking-wider opacity-70">INACTIVE</p>
            <p className="text-2xl font-semibold mt-1">{hardwareItems.filter(item => item.status === 'Inactive').length}</p>
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
              placeholder="SEARCH HARDWARE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">ALL CATEGORIES</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category.toUpperCase()}</option>
              ))}
            </select>
            
            <select
              className="bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-3 py-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">ALL STATUS</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status.toUpperCase()}</option>
              ))}
            </select>
            
            <Link 
              href="/dashboard/hardware/add" 
              className="inline-flex items-center px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ADD HARDWARE
            </Link>
          </div>
        </div>
        
        {/* Hardware table */}
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
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Purchase Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Warranty Until
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
                      No hardware found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-tron-darkblue/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan">
                        <Link href={`/dashboard/hardware/${item.id}`} className="hover:underline">{item.name}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {formatDate(item.purchaseDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`${isExpired(item.warranty) ? 'text-tron-red' : 'text-tron-green'}`}>
                          {formatDate(item.warranty)}
                        </span>
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/dashboard/hardware/${item.id}`}
                            className="text-tron-cyan hover:text-tron-cyan/70"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </Link>
                          <button
                            className="text-tron-red hover:text-tron-red/70"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div className="relative group">
                            <button className="text-tron-cyan hover:text-tron-cyan/70">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-black border border-tron-cyan/30 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-10">
                              <div className="py-1">
                                {item.status !== 'Active' && (
                                  <button
                                    onClick={() => changeItemStatus(item.id, 'Active')}
                                    className="block w-full text-left px-4 py-2 text-sm text-tron-green hover:bg-tron-darkblue/50"
                                  >
                                    Set to Active
                                  </button>
                                )}
                                {item.status !== 'Maintenance' && (
                                  <button
                                    onClick={() => changeItemStatus(item.id, 'Maintenance')}
                                    className="block w-full text-left px-4 py-2 text-sm text-tron-orange hover:bg-tron-darkblue/50"
                                  >
                                    Set to Maintenance
                                  </button>
                                )}
                                {item.status !== 'Inactive' && (
                                  <button
                                    onClick={() => changeItemStatus(item.id, 'Inactive')}
                                    className="block w-full text-left px-4 py-2 text-sm text-tron-red hover:bg-tron-darkblue/50"
                                  >
                                    Set to Inactive
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
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
      
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-tron-darkblue/95 border border-tron-cyan/50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-tron-cyan mb-4">Confirm Deletion</h3>
            <p className="text-tron-cyan/80 mb-6">Are you sure you want to delete this hardware item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-tron-cyan/50 text-tron-cyan rounded hover:bg-tron-cyan/10"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-tron-red text-white rounded hover:bg-tron-red/90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 