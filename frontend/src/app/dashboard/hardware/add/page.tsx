'use client';

import { useState } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';
import { createFormData, mockApiCall } from '@/utils/ServerResponse';

export default function AddHardwarePage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warranty, setWarranty] = useState('');
  const [status, setStatus] = useState('Active');
  const [serialNumber, setSerialNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (file: File | null) => {
    setImage(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = {
      name,
      category,
      location,
      purchaseDate,
      warranty,
      status,
      serialNumber,
      notes,
      image
    };
    
    try {
      // In a real app, we would send this to an actual API
      await mockApiCall('/api/hardware', 'POST', formData);
      
      setFormSubmitted(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        window.location.href = '/dashboard/hardware';
      }, 2000);
    } catch (err) {
      setError('An error occurred while saving the hardware. Please try again.');
      console.error(err);
    } finally {
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
          <h1 className="text-xl font-bold mt-4">HARDWARE ADDED SUCCESSFULLY</h1>
          <p className="mt-2 text-tron-cyan/70">Your hardware information has been saved to the system.</p>
          <p className="mt-1 text-tron-cyan/70">Redirecting to hardware page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">ADD HARDWARE</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">REGISTER NEW HARDWARE ITEM</p>
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
      
      <div className="p-6 max-w-2xl mx-auto">
        {error && (
          <div className="mb-6 bg-tron-darkblue/30 border border-tron-red/50 text-tron-red p-4 rounded flex items-center">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p>{error}</p>
          </div>
        )}
        
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">HARDWARE DETAILS</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-tron-cyan">HARDWARE NAME</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter hardware name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm text-tron-cyan">CATEGORY</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Computer">Computer</option>
                  <option value="Peripheral">Peripheral</option>
                  <option value="Network">Network</option>
                  <option value="Storage">Storage</option>
                  <option value="Display">Display</option>
                  <option value="Printer">Printer</option>
                  <option value="Server">Server</option>
                  <option value="Other">Other</option>
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
                  placeholder="Where is this hardware located?"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="serialNumber" className="block text-sm text-tron-cyan">SERIAL NUMBER</label>
              <input
                id="serialNumber"
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter hardware serial number"
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
                <option value="On Loan">On Loan</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm text-tron-cyan">NOTES (OPTIONAL)</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter any additional information about this hardware"
              ></textarea>
            </div>
            
            <FileUpload
              id="hardware-image"
              label="HARDWARE IMAGE (OPTIONAL)"
              onFileChange={handleFileChange}
              accept="image/*"
            />
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'ADDING HARDWARE...' : 'ADD HARDWARE'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 