'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';

export default function HardwareDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [hardware, setHardware] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notFound, setNotFound] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warranty, setWarranty] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);
  
  useEffect(() => {
    // Load hardware from localStorage
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('hardwareItems');
      
      if (storedItems) {
        try {
          const items = JSON.parse(storedItems);
          const foundItem = items.find((item: any) => item.id.toString() === params.id);
          
          if (foundItem) {
            setHardware(foundItem);
            // Initialize form state
            setName(foundItem.name || '');
            setCategory(foundItem.category || '');
            setStatus(foundItem.status || 'Active');
            setLocation(foundItem.location || '');
            setSerialNumber(foundItem.serialNumber || '');
            setPurchaseDate(foundItem.purchaseDate || '');
            setWarranty(foundItem.warranty || '');
            setNotes(foundItem.notes || '');
          } else {
            setNotFound(true);
          }
        } catch (err) {
          console.error("Error parsing hardware items:", err);
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    }
  }, [params.id]);
  
  // Format date to display in MM/DD/YYYY format
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  
  // Calculate if warranty is expired
  const isExpired = (dateString: string) => {
    if (!dateString) return true;
    const today = new Date();
    const warrantyDate = new Date(dateString);
    return today > warrantyDate;
  };
  
  // Calculate days until expiration
  const daysUntilExpiration = (dateString: string) => {
    if (!dateString) return 0;
    const today = new Date();
    const warrantyDate = new Date(dateString);
    const timeDiff = warrantyDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  const handleFileChange = (file: File | null) => {
    setImage(file);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Update hardware data
    const updatedHardware = {
      ...hardware,
      name,
      category,
      status,
      location,
      serialNumber,
      purchaseDate,
      warranty,
      notes,
    };
    
    try {
      // Get all hardware items 
      const storedItems = localStorage.getItem('hardwareItems');
      if (storedItems) {
        const items = JSON.parse(storedItems);
        
        // Update the specific item
        const updatedItems = items.map((item: any) => {
          if (item.id.toString() === params.id) {
            return updatedHardware;
          }
          return item;
        });
        
        // Save back to localStorage
        localStorage.setItem('hardwareItems', JSON.stringify(updatedItems));
        
        // Update local state
        setHardware(updatedHardware);
        setLoading(false);
        setEditMode(false);
        setFormSubmitted(true);
        
        // Reset form submitted status after showing message
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Error updating hardware:", err);
      setLoading(false);
    }
  };
  
  // Handle hardware deletion
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this hardware item? This action cannot be undone.")) {
      try {
        // Get all hardware items
        const storedItems = localStorage.getItem('hardwareItems');
        if (storedItems) {
          const items = JSON.parse(storedItems);
          
          // Filter out the item to delete
          const updatedItems = items.filter((item: any) => item.id.toString() !== params.id);
          
          // Save back to localStorage
          localStorage.setItem('hardwareItems', JSON.stringify(updatedItems));
          
          // Redirect to hardware list
          router.push('/dashboard/hardware');
        }
      } catch (err) {
        console.error("Error deleting hardware:", err);
      }
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
          <p className="mt-2">Loading hardware information...</p>
        </div>
      </div>
    );
  }
  
  if (notFound || !hardware) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-tron-cyan text-center">
          <svg className="mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-bold mt-4">Hardware Not Found</h1>
          <p className="mt-2 text-tron-cyan/70">The hardware item you are looking for does not exist or has been removed.</p>
          <Link href="/dashboard/hardware" className="mt-4 inline-block px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition">
            RETURN TO HARDWARE
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">{hardware.name}</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">{hardware.category} - {hardware.serialNumber}</p>
          </div>
          <Link 
            href="/dashboard/hardware"
            className="text-tron-cyan hover:text-tron-cyan/70 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            BACK TO HARDWARE
          </Link>
        </div>
      </header>
      
      <div className="p-6 space-y-6">
        {formSubmitted && (
          <div className="bg-tron-darkblue/30 border border-tron-cyan/30 text-tron-cyan p-4 rounded flex items-center">
            <svg className="w-5 h-5 mr-2 text-tron-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>Hardware information updated successfully!</p>
          </div>
        )}
        
        {/* Hardware status card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">STATUS</p>
            <div className="flex items-center mt-1">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                hardware.status === 'Active' ? 'bg-tron-green' :
                hardware.status === 'Maintenance' ? 'bg-tron-orange' :
                'bg-tron-red'
              }`}></span>
              <p className="font-semibold">{hardware.status.toUpperCase()}</p>
            </div>
          </div>
          
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">LOCATION</p>
            <p className="font-semibold mt-1">{hardware.location}</p>
          </div>
          
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">PURCHASE DATE</p>
            <p className="font-semibold mt-1">{formatDate(hardware.purchaseDate)}</p>
          </div>
          
          <div className={`border rounded p-4 bg-tron-darkblue/30 ${
            isExpired(hardware.warranty) ? 'border-tron-red/50 text-tron-red' : 'border-tron-green/50 text-tron-green'
          }`}>
            <p className="text-xs tracking-wider opacity-70">WARRANTY</p>
            <p className="font-semibold mt-1">
              {isExpired(hardware.warranty) 
                ? 'EXPIRED'
                : `${daysUntilExpiration(hardware.warranty)} DAYS LEFT`
              }
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition flex items-center"
          >
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            {editMode ? 'CANCEL EDIT' : 'EDIT HARDWARE'}
          </button>
          
          {!editMode && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-tron-red text-tron-red bg-black hover:bg-tron-red/10 rounded transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              DELETE HARDWARE
            </button>
          )}
        </div>
        
        {/* Hardware details */}
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">{editMode ? 'EDIT HARDWARE' : 'HARDWARE DETAILS'}</h2>
          </div>
          
          {editMode ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm text-tron-cyan">NAME</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm text-tron-cyan">CATEGORY</label>
                  <input
                    id="category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                    required
                  />
                </div>
                
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
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm text-tron-cyan">LOCATION</label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
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
                <label htmlFor="notes" className="block text-sm text-tron-cyan">NOTES</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                ></textarea>
              </div>
              
              <FileUpload
                id="hardware-image"
                label="HARDWARE IMAGE (OPTIONAL)"
                onFileChange={handleFileChange}
                accept="image/*"
                initialPreview={hardware.image}
              />
              
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition"
                  disabled={loading}
                >
                  {loading ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
              </div>
            </form>
          ) : (
            <div className="divide-y divide-tron-cyan/30">
              {hardware.image && (
                <div className="p-6 flex justify-center">
                  <img 
                    src={hardware.image} 
                    alt={hardware.name} 
                    className="max-h-60 border border-tron-cyan/30 rounded" 
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-tron-cyan/30">
                <div className="p-6">
                  <h3 className="text-sm text-tron-cyan/70 uppercase mb-2">Category</h3>
                  <p className="text-tron-cyan">{hardware.category}</p>
                </div>
                <div className="p-6">
                  <h3 className="text-sm text-tron-cyan/70 uppercase mb-2">Serial Number</h3>
                  <p className="text-tron-cyan">{hardware.serialNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-tron-cyan/30">
                <div className="p-6">
                  <h3 className="text-sm text-tron-cyan/70 uppercase mb-2">Purchase Date</h3>
                  <p className="text-tron-cyan">{formatDate(hardware.purchaseDate)}</p>
                </div>
                <div className="p-6">
                  <h3 className="text-sm text-tron-cyan/70 uppercase mb-2">Warranty Expiration</h3>
                  <p className={isExpired(hardware.warranty) ? 'text-tron-red' : 'text-tron-green'}>
                    {formatDate(hardware.warranty)}
                    {isExpired(hardware.warranty) 
                      ? ' (Expired)'
                      : ` (${daysUntilExpiration(hardware.warranty)} days left)`
                    }
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-sm text-tron-cyan/70 uppercase mb-2">Notes</h3>
                <p className="text-tron-cyan">{hardware.notes || 'No notes available.'}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Maintenance History (Placeholder) */}
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">MAINTENANCE HISTORY</h2>
          </div>
          
          <div className="p-6">
            <p className="text-tron-cyan/70 text-center py-8">No maintenance records available for this hardware.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 