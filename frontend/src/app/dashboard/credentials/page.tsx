'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockCredentials = [
  { id: 1, name: 'AWS Admin Access', username: 'admin@company.com', lastUpdated: '2023-05-15', category: 'Cloud', status: 'Active', strength: 'Strong' },
  { id: 2, name: 'GitHub Organization', username: 'devteam', lastUpdated: '2023-06-22', category: 'Development', status: 'Active', strength: 'Strong' },
  { id: 3, name: 'Internal Wiki', username: 'wikiadmin', lastUpdated: '2022-12-10', category: 'Internal', status: 'Active', strength: 'Medium' },
  { id: 4, name: 'Database Access', username: 'dbadmin', lastUpdated: '2022-09-30', category: 'Database', status: 'Expired', strength: 'Weak' },
  { id: 5, name: 'Office 365', username: 'admin@company.com', lastUpdated: '2023-01-15', category: 'Office', status: 'Active', strength: 'Medium' },
  { id: 6, name: 'VPN Access', username: 'vpn.user', lastUpdated: '2023-03-28', category: 'Network', status: 'Active', strength: 'Strong' },
  { id: 7, name: 'Analytics Platform', username: 'analyst', lastUpdated: '2023-02-14', category: 'Analytics', status: 'Inactive', strength: 'Medium' },
  { id: 8, name: 'Social Media', username: 'social.media', lastUpdated: '2022-11-05', category: 'Marketing', status: 'Active', strength: 'Strong' },
];

export default function CredentialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showPasswords, setShowPasswords] = useState(false);
  
  const filteredCredentials = mockCredentials.filter(credential => {
    const matchesSearch = credential.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          credential.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || credential.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || credential.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const categories = Array.from(new Set(mockCredentials.map(credential => credential.category)));
  const statuses = Array.from(new Set(mockCredentials.map(credential => credential.status)));
  
  // Format date string to MM/DD/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  
  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Strong':
        return 'text-tron-green';
      case 'Medium':
        return 'text-tron-orange';
      case 'Weak':
        return 'text-tron-red';
      default:
        return 'text-tron-cyan';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-tron-green/20 text-tron-green';
      case 'Inactive':
        return 'bg-tron-orange/20 text-tron-orange';
      case 'Expired':
        return 'bg-tron-red/20 text-tron-red';
      default:
        return 'bg-tron-cyan/20 text-tron-cyan';
    }
  };
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">SECURE CREDENTIALS</h1>
        <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">IDENTITY MANAGEMENT</p>
      </header>
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border border-tron-cyan/50 rounded p-4 bg-tron-darkblue/30 text-tron-cyan">
            <p className="text-xs tracking-wider opacity-70">TOTAL CREDENTIALS</p>
            <p className="text-2xl font-semibold mt-1">{mockCredentials.length}</p>
          </div>
          <div className="border border-tron-green/50 rounded p-4 bg-tron-darkblue/30 text-tron-green">
            <p className="text-xs tracking-wider opacity-70">SECURE</p>
            <p className="text-2xl font-semibold mt-1">{mockCredentials.filter(c => c.strength === 'Strong').length}</p>
          </div>
          <div className="border border-tron-orange/50 rounded p-4 bg-tron-darkblue/30 text-tron-orange">
            <p className="text-xs tracking-wider opacity-70">MODERATE</p>
            <p className="text-2xl font-semibold mt-1">{mockCredentials.filter(c => c.strength === 'Medium').length}</p>
          </div>
          <div className="border border-tron-red/50 rounded p-4 bg-tron-darkblue/30 text-tron-red">
            <p className="text-xs tracking-wider opacity-70">VULNERABLE</p>
            <p className="text-2xl font-semibold mt-1">{mockCredentials.filter(c => c.strength === 'Weak').length}</p>
          </div>
        </div>
        
        {/* Controls */}
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
              placeholder="SEARCH CREDENTIALS..."
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
              <option value="All">ALL STATUSES</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status.toUpperCase()}</option>
              ))}
            </select>
            
            <Link 
              href="/dashboard/credentials/add" 
              className="inline-flex items-center px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ADD CREDENTIAL
            </Link>
            
            <button 
              className={`inline-flex items-center px-4 py-2 border ${showPasswords ? 'border-tron-red text-tron-red' : 'border-tron-cyan text-tron-cyan'} bg-black hover:bg-tron-cyan/10 rounded transition`}
              onClick={() => setShowPasswords(!showPasswords)}
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                {showPasswords ? (
                  <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                ) : (
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                )}
                {showPasswords ? (
                  <path d="M7.638 5.823l-1.445-1.445A8.984 8.984 0 0110 3c4.42 0 8 3.58 8 8 0 1.326-.456 2.612-1.235 3.807l-1.446-1.446C14.805 12.668 15 11.85 15 11c0-2.762-2.238-5-5-5-.85 0-1.668.195-2.362.823z" />
                ) : (
                  <path fillRule="evenodd" d="M10 3c-4.416 0-8 3.584-8 8 0 4.416 3.584 8 8 8 4.416 0 8-3.584 8-8 0-4.416-3.584-8-8-8zm0 2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" clipRule="evenodd" />
                )}
              </svg>
              {showPasswords ? "HIDE PASSWORDS" : "SHOW PASSWORDS"}
            </button>
          </div>
        </div>
        
        {/* Credentials table */}
        <div className="border border-tron-cyan/30 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-tron-cyan/30">
              <thead className="bg-tron-darkblue">
                <tr>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs tracking-wider text-tron-cyan/70 font-medium uppercase">
                    Last Updated
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
                {filteredCredentials.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-tron-cyan/50">
                      No credentials found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCredentials.map((credential) => (
                    <tr key={credential.id} className="hover:bg-tron-darkblue/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan">
                        {credential.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {credential.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={getPasswordStrengthColor(credential.strength)}>
                          {showPasswords ? '••••••••••••' : '•••••••••••••'}
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full border" style={{ borderColor: 'currentColor' }}>
                            {credential.strength}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {credential.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-tron-cyan/80">
                        {formatDate(credential.lastUpdated)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(credential.status)}`}>
                          {credential.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-tron-cyan hover:text-tron-cyan/70"
                            onClick={() => {}}
                            title="Copy Password"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          </button>
                          <button
                            className="text-tron-orange hover:text-tron-orange/70"
                            onClick={() => {}}
                            title="Edit Credential"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            className="text-tron-red hover:text-tron-red/70"
                            onClick={() => {}}
                            title="Delete Credential"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Security Reminder */}
        <div className="p-4 border border-tron-orange/30 rounded bg-black">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-tron-orange mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-tron-orange font-medium">SECURITY REMINDER</h3>
              <p className="text-tron-orange/70 text-sm mt-1">
                All credentials are encrypted at rest. For optimal security, regularly rotate passwords and enable two-factor authentication where available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 