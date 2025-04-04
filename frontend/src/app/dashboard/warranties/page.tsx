'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultWarranties = [
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
  const [warranties, setWarranties] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [warrantyToDelete, setWarrantyToDelete] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingWarranty, setEditingWarranty] = useState<any>(null);
  
  // Form state for editing
  const [editItem, setEditItem] = useState('');
  const [editExpirationDate, setEditExpirationDate] = useState('');
  const [editPurchaseDate, setEditPurchaseDate] = useState('');
  const [editProvider, setEditProvider] = useState('');
  const [editDetails, setEditDetails] = useState('');
  
  // Load warranties from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWarranties = localStorage.getItem('warranties');
      
      if (storedWarranties) {
        setWarranties(JSON.parse(storedWarranties));
      } else {
        // Initialize with default data if nothing in localStorage
        setWarranties(defaultWarranties);
        localStorage.setItem('warranties', JSON.stringify(defaultWarranties));
      }
    }
  }, []);
  
  // Update warranty statuses based on expiration dates
  useEffect(() => {
    if (warranties.length > 0) {
      const today = new Date();
      
      const updatedWarranties = warranties.map((warranty: any) => {
        const daysRemaining = getDaysRemaining(warranty.expirationDate);
        let status = warranty.status;
        
        if (daysRemaining <= 0) {
          status = 'Expired';
        } else if (daysRemaining <= 30) {
          status = 'Expiring Soon';
        } else {
          status = 'Active';
        }
        
        return { ...warranty, status };
      });
      
      setWarranties(updatedWarranties);
      localStorage.setItem('warranties', JSON.stringify(updatedWarranties));
    }
  }, []);
  
  const filteredItems = warranties.filter((warranty: any) => {
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
  
  // Handle warranty deletion
  const handleDeleteWarranty = (id: number) => {
    setWarrantyToDelete(id);
    setShowDeleteModal(true);
  };
  
  // Confirm deletion
  const confirmDelete = () => {
    if (warrantyToDelete === null) return;
    
    const updatedWarranties = warranties.filter((warranty: any) => warranty.id !== warrantyToDelete);
    setWarranties(updatedWarranties);
    localStorage.setItem('warranties', JSON.stringify(updatedWarranties));
    
    setShowDeleteModal(false);
    setWarrantyToDelete(null);
  };
  
  // Handle warranty editing
  const handleEditWarranty = (warranty: any) => {
    setEditingWarranty(warranty);
    setEditItem(warranty.item);
    setEditExpirationDate(warranty.expirationDate);
    setEditPurchaseDate(warranty.purchaseDate);
    setEditProvider(warranty.provider);
    setEditDetails(warranty.details || '');
    setShowEditModal(true);
  };
  
  // Save edited warranty
  const saveEditedWarranty = () => {
    if (!editingWarranty) return;
    
    const updatedWarranties = warranties.map((warranty: any) => {
      if (warranty.id === editingWarranty.id) {
        const daysRemaining = getDaysRemaining(editExpirationDate);
        let status = 'Active';
        
        if (daysRemaining <= 0) {
          status = 'Expired';
        } else if (daysRemaining <= 30) {
          status = 'Expiring Soon';
        }
        
        return {
          ...warranty,
          item: editItem,
          expirationDate: editExpirationDate,
          purchaseDate: editPurchaseDate,
          provider: editProvider,
          details: editDetails,
          status: status
        };
      }
      return warranty;
    });
    
    setWarranties(updatedWarranties);
    localStorage.setItem('warranties', JSON.stringify(updatedWarranties));
    
    setShowEditModal(false);
    setEditingWarranty(null);
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
            <p className="text-2xl font-semibold mt-1">{warranties.length}</p>
          </div>
          <div className="border border-tron-orange/50 rounded p-4 bg-tron-darkblue/30 text-tron-orange">
            <p className="text-xs tracking-wider opacity-70">EXPIRING SOON</p>
            <p className="text-2xl font-semibold mt-1">{warranties.filter((w: any) => w.status === 'Expiring Soon').length}</p>
          </div>
          <div className="border border-tron-red/50 rounded p-4 bg-tron-darkblue/30 text-tron-red">
            <p className="text-xs tracking-wider opacity-70">EXPIRED</p>
            <p className="text-2xl font-semibold mt-1">{warranties.filter((w: any) => w.status === 'Expired').length}</p>
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
                  filteredItems.map((warranty: any) => {
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
                              onClick={() => handleEditWarranty(warranty)}
                            >
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              className="text-tron-red hover:text-tron-red/70"
                              onClick={() => handleDeleteWarranty(warranty.id)}
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
      
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-tron-darkblue/95 border border-tron-cyan/50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-tron-cyan mb-4">Confirm Deletion</h3>
            <p className="text-tron-cyan/80 mb-6">Are you sure you want to delete this warranty? This action cannot be undone.</p>
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
      
      {/* Edit warranty modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-tron-darkblue/95 border border-tron-cyan/50 rounded-lg p-6 max-w-xl w-full">
            <h3 className="text-xl font-semibold text-tron-cyan mb-4">Edit Warranty</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="editItem" className="block text-sm text-tron-cyan mb-1">ITEM NAME</label>
                <input
                  id="editItem"
                  type="text"
                  value={editItem}
                  onChange={(e) => setEditItem(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter item name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="editProvider" className="block text-sm text-tron-cyan mb-1">PROVIDER</label>
                <input
                  id="editProvider"
                  type="text"
                  value={editProvider}
                  onChange={(e) => setEditProvider(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter warranty provider"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editPurchaseDate" className="block text-sm text-tron-cyan mb-1">PURCHASE DATE</label>
                  <input
                    id="editPurchaseDate"
                    type="date"
                    value={editPurchaseDate}
                    onChange={(e) => setEditPurchaseDate(e.target.value)}
                    className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editExpirationDate" className="block text-sm text-tron-cyan mb-1">EXPIRATION DATE</label>
                  <input
                    id="editExpirationDate"
                    type="date"
                    value={editExpirationDate}
                    onChange={(e) => setEditExpirationDate(e.target.value)}
                    className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="editDetails" className="block text-sm text-tron-cyan mb-1">DETAILS</label>
                <textarea
                  id="editDetails"
                  value={editDetails}
                  onChange={(e) => setEditDetails(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter warranty details"
                  rows={3}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-tron-cyan/50 text-tron-cyan rounded hover:bg-tron-cyan/10"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedWarranty}
                className="px-4 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 