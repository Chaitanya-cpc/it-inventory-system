'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';

export default function AddWarrantyPage() {
  const router = useRouter();
  const [item, setItem] = useState('');
  const [provider, setProvider] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [status, setStatus] = useState('Active');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleFileChange = (file: File | null) => {
    setDocument(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Calculate warranty status based on expiration date
      const today = new Date();
      const expiry = new Date(expirationDate);
      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let warrantyStatus = status;
      // Auto-correct the status based on dates
      if (diffDays <= 0) {
        warrantyStatus = 'Expired';
      } else if (diffDays <= 30) {
        warrantyStatus = 'Expiring Soon';
      } else {
        warrantyStatus = 'Active';
      }
      
      // Create new warranty object
      const newWarranty = {
        id: Date.now(),
        item,
        provider,
        purchaseDate,
        expirationDate,
        status: warrantyStatus,
        details,
        // We can't actually store File objects in localStorage,
        // but in a real app this would be uploaded to a server
        documentName: document ? document.name : null
      };
      
      // Get existing warranties from localStorage
      const existingWarranties = JSON.parse(localStorage.getItem('warranties') || '[]');
      
      // Add new warranty
      const updatedWarranties = [...existingWarranties, newWarranty];
      
      // Save back to localStorage
      localStorage.setItem('warranties', JSON.stringify(updatedWarranties));
      
      // Show success message and redirect
      setTimeout(() => {
        setFormSubmitted(true);
        setLoading(false);
        
        // Redirect after showing success message
        setTimeout(() => {
          router.push('/dashboard/warranties');
        }, 1500);
      }, 800);
    } catch (err) {
      console.error("Error saving warranty:", err);
      setLoading(false);
    }
  };
  
  if (formSubmitted) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-tron-cyan text-center p-8 border border-tron-cyan/30 bg-black rounded max-w-md">
          <svg className="mx-auto h-16 w-16 text-tron-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-xl font-bold mt-4">WARRANTY REGISTERED SUCCESSFULLY</h1>
          <p className="mt-2 text-tron-cyan/70">Your warranty information has been saved to the system.</p>
          <p className="mt-1 text-tron-cyan/70">Redirecting to warranties page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">ADD WARRANTY</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">REGISTER NEW WARRANTY RECORD</p>
          </div>
          <Link 
            href="/dashboard/warranties"
            className="text-tron-cyan hover:text-tron-cyan/70 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            BACK TO WARRANTIES
          </Link>
        </div>
      </header>
      
      <div className="p-6 max-w-2xl mx-auto">
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">WARRANTY DETAILS</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="item" className="block text-sm text-tron-cyan">ITEM NAME</label>
              <input
                id="item"
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter item name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="provider" className="block text-sm text-tron-cyan">WARRANTY PROVIDER</label>
              <input
                id="provider"
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter warranty provider"
                required
              />
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
                <label htmlFor="expirationDate" className="block text-sm text-tron-cyan">EXPIRATION DATE</label>
                <input
                  id="expirationDate"
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                />
              </div>
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
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
                <option value="Renewed">Renewed</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="details" className="block text-sm text-tron-cyan">WARRANTY DETAILS</label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter warranty details, coverage information, etc."
              ></textarea>
            </div>
            
            <FileUpload
              id="warranty-document"
              label="WARRANTY DOCUMENT (OPTIONAL)" 
              onFileChange={handleFileChange}
              accept="application/pdf,image/*"
            />
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'REGISTERING...' : 'REGISTER WARRANTY'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 