'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create new category object
      const newCategory = {
        id: Date.now(),
        name,
        description,
        itemCount: 0,
        // Default icon path for new category
        icon: "M4 6h16M4 10h16M4 14h16M4 18h16"
      };
      
      // Get existing categories from localStorage
      const existingCategories = JSON.parse(localStorage.getItem('categories') || '[]');
      
      // Add new category
      const updatedCategories = [...existingCategories, newCategory];
      
      // Save back to localStorage
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      
      // Show success message and redirect
      setTimeout(() => {
        setFormSubmitted(true);
        setLoading(false);
        
        // Redirect after showing success message
        setTimeout(() => {
          router.push('/dashboard/categories');
        }, 1500);
      }, 800);
    } catch (err) {
      console.error("Error saving category:", err);
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
          <h1 className="text-xl font-bold mt-4">CATEGORY ADDED SUCCESSFULLY</h1>
          <p className="mt-2 text-tron-cyan/70">Your new category has been created.</p>
          <p className="mt-1 text-tron-cyan/70">Redirecting to categories page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">ADD CATEGORY</h1>
            <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">CREATE A NEW CATEGORY</p>
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
      
      <div className="p-6 max-w-2xl mx-auto">
        <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
          <div className="bg-tron-darkblue p-4">
            <h2 className="text-lg font-medium text-tron-cyan">CATEGORY DETAILS</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-tron-cyan">NAME</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter category name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm text-tron-cyan">DESCRIPTION</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2 h-32"
                placeholder="Enter category description"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="icon" className="block text-sm text-tron-cyan">ICON</label>
              <div className="border border-dashed border-tron-cyan/30 rounded p-6 text-center">
                <svg className="w-12 h-12 mx-auto text-tron-cyan/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-tron-cyan/70">Click to upload an icon or drag and drop</p>
                <input type="file" className="hidden" />
                <button 
                  type="button"
                  className="mt-4 px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition text-sm"
                >
                  SELECT FILE
                </button>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'CREATING...' : 'CREATE CATEGORY'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 