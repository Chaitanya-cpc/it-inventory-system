'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export const defaultCategories = [
  { 
    id: 1, 
    name: 'Computers', 
    itemCount: 12,
    description: 'Laptops, desktops, and servers',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  { 
    id: 2, 
    name: 'Mobile Devices', 
    itemCount: 8,
    description: 'Smartphones, tablets, and wearables',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  { 
    id: 3, 
    name: 'Peripherals', 
    itemCount: 15,
    description: 'Keyboards, mice, webcams',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.121 17.242A7.5 7.5 0 0112 19.5c-2.12 0-4.07-.74-5.605-1.97M15.121 17.242A7.5 7.5 0 1016.5 12c0 1.405-.396 2.722-1.08 3.833L15.121 17.242zM4.5 12l3-3m-3 3l3 3m6-6l3-3m-3 3l3 3" />
      </svg>
    ),
  },
  { 
    id: 4, 
    name: 'Storage', 
    itemCount: 6,
    description: 'External drives, SSDs, NAS',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  { 
    id: 5, 
    name: 'Networking', 
    itemCount: 7,
    description: 'Routers, switches, access points',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  { 
    id: 6, 
    name: 'Accessories', 
    itemCount: 21,
    description: 'Cables, adapters, cases',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  { 
    id: 7, 
    name: 'Software', 
    itemCount: 18,
    description: 'Purchased applications and licenses',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  { 
    id: 8, 
    name: 'Cloud Services', 
    itemCount: 5,
    description: 'Hosting, storage, and SaaS',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  { 
    id: 9, 
    name: 'Entertainment', 
    itemCount: 9,
    description: 'Gaming consoles, media players',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  
  // Load categories from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCategories = localStorage.getItem('categories');
      
      if (storedCategories) {
        // Parse the JSON but convert the icon strings back to JSX elements
        const parsedCategories = JSON.parse(storedCategories);
        setCategories(parsedCategories);
      } else {
        // Store default categories in localStorage
        const categoriesToStore = defaultCategories.map(category => ({
          ...category,
          // Convert SVG icon to string for storage
          icon: category.icon ? 
            typeof category.icon === 'string' ? 
            category.icon : 
            (category.icon.props?.children?.props?.d || '')
            : ''
        }));
        
        localStorage.setItem('categories', JSON.stringify(categoriesToStore));
        setCategories(categoriesToStore);
      }
    }
  }, []);
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalItems = categories.reduce((sum, category) => sum + category.itemCount, 0);
  
  // Handle category deletion
  const handleDeleteCategory = (id: number) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };
  
  // Confirm deletion
  const confirmDelete = () => {
    if (categoryToDelete === null) return;
    
    const updatedCategories = categories.filter(category => category.id !== categoryToDelete);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };
  
  // Handle category editing
  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
    setShowEditModal(true);
  };
  
  // Save edited category
  const saveEditedCategory = () => {
    if (!editingCategory) return;
    
    const updatedCategories = categories.map(category => {
      if (category.id === editingCategory.id) {
        return {
          ...category,
          name: editName,
          description: editDescription
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    setShowEditModal(false);
    setEditingCategory(null);
  };
  
  // Generate SVG icon for a category
  const renderCategoryIcon = (category: any) => {
    if (typeof category.icon === 'object') {
      // It's already a JSX element
      return category.icon;
    } else if (typeof category.icon === 'string' && category.icon.includes('path')) {
      // It's an SVG string
      return category.icon;
    } else {
      // It's a path string or empty, create a default icon
      return (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon || "M4 6h16M4 10h16M4 14h16M4 18h16"} />
        </svg>
      );
    }
  };
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">CATEGORIES</h1>
        <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">ORGANIZE YOUR INVENTORY ITEMS</p>
      </header>
      
      <div className="p-6 space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">TOTAL CATEGORIES</p>
            <p className="text-2xl font-semibold mt-1">{categories.length}</p>
          </div>
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">TOTAL ITEMS</p>
            <p className="text-2xl font-semibold mt-1">{totalItems}</p>
          </div>
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">AVERAGE ITEMS PER CATEGORY</p>
            <p className="text-2xl font-semibold mt-1">{categories.length ? Math.round(totalItems / categories.length) : 0}</p>
          </div>
        </div>
        
        {/* Search and add */}
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
              placeholder="SEARCH CATEGORIES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`inline-flex items-center px-4 py-2 border ${editMode ? 'border-tron-orange text-tron-orange bg-tron-orange/10' : 'border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10'} rounded transition`}
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {editMode ? 'DONE EDITING' : 'EDIT CATEGORIES'}
            </button>
            
            <Link 
              href="/dashboard/categories/add" 
              className="inline-flex items-center px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ADD CATEGORY
            </Link>
          </div>
        </div>
        
        {/* Categories grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center text-tron-cyan/50 py-10">
            No categories found matching your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="border border-tron-cyan/30 rounded bg-tron-darkblue/20 hover:bg-tron-darkblue/30 transition-colors duration-300 group">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="text-tron-cyan mr-3">
                        {renderCategoryIcon(category)}
                      </div>
                      <h3 className="text-xl font-semibold text-tron-cyan">{category.name}</h3>
                    </div>
                    
                    {editMode && (
                      <div className="flex space-x-2">
                        <button 
                          className="text-tron-cyan hover:text-tron-cyan/70 transition-colors"
                          onClick={() => handleEditCategory(category)}
                        >
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button 
                          className="text-tron-red hover:text-tron-red/70 transition-colors"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="mt-3 text-tron-cyan/70">{category.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-tron-cyan/80">
                      <svg className="w-5 h-5 mr-2 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg font-semibold">{category.itemCount}</span>
                      <span className="ml-1 text-sm opacity-70">items</span>
                    </div>
                    
                    <Link 
                      href={`/dashboard/categories/${category.id}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-tron-cyan text-sm flex items-center"
                    >
                      <span>VIEW ITEMS</span>
                      <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-tron-darkblue/95 border border-tron-cyan/50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-tron-cyan mb-4">Confirm Deletion</h3>
            <p className="text-tron-cyan/80 mb-6">Are you sure you want to delete this category? This action cannot be undone and may affect all items in this category.</p>
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
      
      {/* Edit category modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-tron-darkblue/95 border border-tron-cyan/50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-tron-cyan mb-4">Edit Category</h3>
            
            <div className="mb-4">
              <label htmlFor="editName" className="block text-sm text-tron-cyan mb-1">CATEGORY NAME</label>
              <input
                id="editName"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter category name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="editDescription" className="block text-sm text-tron-cyan mb-1">DESCRIPTION</label>
              <textarea
                id="editDescription"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                placeholder="Enter category description"
                rows={3}
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-tron-cyan/50 text-tron-cyan rounded hover:bg-tron-cyan/10"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedCategory}
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