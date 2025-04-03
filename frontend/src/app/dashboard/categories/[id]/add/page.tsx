'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/Toast';
import FileUpload from '@/components/FileUpload';
import { mockApiCall } from '@/utils/ServerResponse';

// Mock categories data for reference
const mockCategories = [
  { id: 'storage', name: 'Storage', description: 'Storage devices and media' },
  { id: 'network', name: 'Network', description: 'Network equipment and devices' },
  { id: 'computers', name: 'Computers', description: 'Desktops and laptop computers' },
  { id: 'peripherals', name: 'Peripherals', description: 'Keyboards, mice, and other accessories' },
  { id: 'displays', name: 'Displays', description: 'Monitors and display equipment' }
];

export default function AddItemToCategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<any>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [location, setLocation] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warranty, setWarranty] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { showToast } = useToast();
  
  useEffect(() => {
    // Simulate loading category details
    const loadCategory = async () => {
      try {
        // Find the category matching the ID parameter
        const foundCategory = mockCategories.find(c => c.id === params.id);
        
        if (foundCategory) {
          setCategory(foundCategory);
        } else {
          showToast({ 
            message: 'Category not found', 
            type: 'error' 
          });
        }
      } catch (error) {
        showToast({ 
          message: 'Error loading category', 
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadCategory();
  }, [params.id, showToast]);
  
  const handleFileChange = (file: File | null) => {
    setImage(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Create form data for submission
      const formData = {
        categoryId: params.id,
        name,
        status,
        location,
        assignedTo,
        serialNumber,
        purchaseDate,
        warranty,
        notes,
        image
      };
      
      // Simulate API call to add item to category
      await mockApiCall(`/api/categories/${params.id}/items`, 'POST', formData);
      
      setFormSubmitted(true);
      showToast({ 
        message: 'Item added successfully', 
        type: 'success'
      });
      
      // Redirect after showing success message
      setTimeout(() => {
        window.location.href = `/dashboard/categories/${params.id}`;
      }, 2000);
    } catch (error) {
      showToast({ 
        message: 'Failed to add item', 
        type: 'error'
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-tron-cyan text-center">
          <div className="animate-pulse flex space-x-2 items-center">
            <div className="h-3 w-3 bg-tron-cyan rounded-full"></div>
            <div className="h-3 w-3 bg-tron-cyan rounded-full"></div>
            <div className="h-3 w-3 bg-tron-cyan rounded-full"></div>
          </div>
          <p className="mt-2">Loading category information...</p>
        </div>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-tron-cyan text-center">
          <svg className="mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-bold mt-4">Category Not Found</h1>
          <p className="mt-2 text-tron-cyan/70">The category you are looking for does not exist or has been removed.</p>
          <Link href="/dashboard/categories" className="mt-4 inline-block px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition">
            RETURN TO CATEGORIES
          </Link>
        </div>
      </div>
    );
  }
  
  if (formSubmitted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-tron-cyan text-center p-8 border border-tron-cyan/30 bg-black rounded max-w-md">
          <svg className="mx-auto h-16 w-16 text-tron-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-xl font-bold mt-4">ITEM ADDED SUCCESSFULLY</h1>
          <p className="mt-2 text-tron-cyan/70">The item has been added to {category.name}.</p>
          <p className="mt-1 text-tron-cyan/70">Redirecting to category page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">ADD TO {category.name.toUpperCase()}</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">Add a new item to this category</p>
          </div>
          <Link 
            href={`/dashboard/categories/${params.id}`}
            className="text-tron-cyan hover:text-tron-cyan/70 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            BACK TO {category.name.toUpperCase()}
          </Link>
        </div>
      </header>
      
      <div className="p-6 max-w-2xl mx-auto">
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">ITEM DETAILS</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-tron-cyan">ITEM NAME</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter item name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm text-tron-cyan">STATUS</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm text-tron-cyan">LOCATION</label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Where is this item located?"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="assignedTo" className="block text-sm text-tron-cyan">ASSIGNED TO</label>
                <input
                  id="assignedTo"
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Person or department assigned to this item"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="serialNumber" className="block text-sm text-tron-cyan">SERIAL NUMBER</label>
                <input
                  id="serialNumber"
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter serial number"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="purchaseDate" className="block text-sm text-tron-cyan">PURCHASE DATE</label>
                <input
                  id="purchaseDate"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="warranty" className="block text-sm text-tron-cyan">WARRANTY EXPIRATION</label>
                <input
                  id="warranty"
                  type="date"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm text-tron-cyan">NOTES (OPTIONAL)</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter any additional information about this item"
              ></textarea>
            </div>
            
            <FileUpload
              id="item-image"
              label="ITEM IMAGE (OPTIONAL)"
              onFileChange={handleFileChange}
              accept="image/*"
            />
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'ADDING ITEM...' : 'ADD ITEM'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 