'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AddSubscriptionPage() {
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState('Monthly');
  const [startDate, setStartDate] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In a real app, we would redirect to the subscriptions page after successful creation
      window.location.href = '/dashboard/subscriptions';
    }, 1000);
  };
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">ADD SUBSCRIPTION</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">REGISTER NEW SERVICE SUBSCRIPTION</p>
          </div>
          <Link 
            href="/dashboard/subscriptions"
            className="text-tron-cyan hover:text-tron-cyan/70 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            BACK TO SUBSCRIPTIONS
          </Link>
        </div>
      </header>
      
      <div className="p-6 max-w-2xl mx-auto">
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">SUBSCRIPTION DETAILS</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-tron-cyan">SUBSCRIPTION NAME</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter subscription name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="provider" className="block text-sm text-tron-cyan">SERVICE PROVIDER</label>
                <input
                  id="provider"
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  placeholder="Enter provider name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm text-tron-cyan">CATEGORY</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Software">Software</option>
                  <option value="Cloud Services">Cloud Services</option>
                  <option value="Hosting">Hosting</option>
                  <option value="Security">Security</option>
                  <option value="Content">Content</option>
                  <option value="Communication">Communication</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="cost" className="block text-sm text-tron-cyan">COST</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-tron-cyan/70">$</span>
                  </div>
                  <input
                    id="cost"
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded pl-8 px-4 py-2"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="billingCycle" className="block text-sm text-tron-cyan">BILLING CYCLE</label>
                <select
                  id="billingCycle"
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annual">Semi-Annual</option>
                  <option value="Annual">Annual</option>
                  <option value="Biennial">Biennial</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm text-tron-cyan">START DATE</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="renewalDate" className="block text-sm text-tron-cyan">NEXT RENEWAL DATE</label>
                <input
                  id="renewalDate"
                  type="date"
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm text-tron-cyan">NOTES (OPTIONAL)</label>
              <textarea
                id="notes"
                rows={4}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter any additional notes"
              ></textarea>
            </div>
            
            <div className="border-t border-tron-cyan/30 pt-6 mt-6">
              <div className="flex items-center mb-4">
                <input
                  id="autoRenewal"
                  type="checkbox"
                  className="w-4 h-4 text-tron-cyan bg-black border-tron-cyan/50 rounded focus:ring-tron-cyan"
                />
                <label htmlFor="autoRenewal" className="ml-2 text-sm text-tron-cyan">
                  AUTO-RENEWAL ENABLED
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="sendReminder"
                  type="checkbox"
                  className="w-4 h-4 text-tron-cyan bg-black border-tron-cyan/50 rounded focus:ring-tron-cyan"
                />
                <label htmlFor="sendReminder" className="ml-2 text-sm text-tron-cyan">
                  SEND RENEWAL REMINDER (7 DAYS BEFORE)
                </label>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'REGISTERING...' : 'REGISTER SUBSCRIPTION'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 