'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddTechPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [vendor, setVendor] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warrantyExpiration, setWarrantyExpiration] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create new tech item object
    const newTechItem = {
      id: Date.now(), // Use timestamp as a simple unique ID
      name: name,
      type: type,
      vendor: vendor,
      purchaseDate: purchaseDate,
      warrantyExpiration: warrantyExpiration,
      serialNumber: serialNumber,
      assignedTo: assignedTo,
      notes: notes,
      status: 'Active'
    };
    
    // Get existing tech items from localStorage or use empty array
    const existingTechItems = JSON.parse(localStorage.getItem('techItems') || '[]');
    
    // Add new tech item to the array
    const updatedTechItems = [...existingTechItems, newTechItem];
    
    // Save back to localStorage
    localStorage.setItem('techItems', JSON.stringify(updatedTechItems));
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard/tech');
    }, 1000);
  };
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">ADD TECHNOLOGY</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">REGISTER NEW TECH EQUIPMENT</p>
          </div>
          <Link 
            href="/dashboard/tech"
            className="text-tron-cyan hover:text-tron-cyan/70 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            BACK TO TECH
          </Link>
        </div>
      </header>
      
      <div className="p-6 max-w-2xl mx-auto">
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">TECH DETAILS</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-tron-cyan">TECH NAME</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter tech name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm text-tron-cyan">TYPE</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Printer">Printer</option>
                  <option value="Scanner">Scanner</option>
                  <option value="Server">Server</option>
                  <option value="Networking">Networking Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="vendor" className="block text-sm text-tron-cyan">VENDOR</label>
                <input
                  id="vendor"
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter vendor name"
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
                <label htmlFor="warrantyExpiration" className="block text-sm text-tron-cyan">WARRANTY EXPIRATION</label>
                <input
                  id="warrantyExpiration"
                  type="date"
                  value={warrantyExpiration}
                  onChange={(e) => setWarrantyExpiration(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="serialNumber" className="block text-sm text-tron-cyan">SERIAL NUMBER</label>
                <input
                  id="serialNumber"
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter serial number"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="assignedTo" className="block text-sm text-tron-cyan">ASSIGNED TO</label>
                <input
                  id="assignedTo"
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter user name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm text-tron-cyan">NOTES (OPTIONAL)</label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter any additional notes"
              ></textarea>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'REGISTERING...' : 'REGISTER TECH ITEM'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 