'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      // In a real app, this would call the register API endpoint
      // For demo, just simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration successful!');
      router.push('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black grid-bg flex flex-col justify-center">
      <div className="mx-auto max-w-md w-full px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-tron-cyan tron-text font-orbitron tracking-wider">CREATE IDENTITY DISK</h1>
          <p className="text-tron-cyan/70 mt-2 font-orbitron">Register for system access</p>
        </div>

        <div className="bg-black rounded-lg border border-tron-cyan/30 shadow-lg p-6 sm:p-8 relative">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tron-cyan" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-tron-cyan" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-tron-cyan" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tron-cyan" />
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-tron-cyan/90 font-orbitron tracking-wide mb-1">
                USERNAME
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full bg-black border border-tron-cyan/50 text-white rounded-md px-3 py-2 shadow-sm focus:border-tron-cyan focus:ring focus:ring-tron-cyan/20 focus:outline-none font-orbitron"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-tron-cyan/90 font-orbitron tracking-wide mb-1">
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-black border border-tron-cyan/50 text-white rounded-md px-3 py-2 shadow-sm focus:border-tron-cyan focus:ring focus:ring-tron-cyan/20 focus:outline-none font-orbitron"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-tron-cyan/90 font-orbitron tracking-wide mb-1">
                PASSWORD
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-black border border-tron-cyan/50 text-white rounded-md px-3 py-2 shadow-sm focus:border-tron-cyan focus:ring focus:ring-tron-cyan/20 focus:outline-none font-orbitron"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-tron-cyan/90 font-orbitron tracking-wide mb-1">
                CONFIRM PASSWORD
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full bg-black border border-tron-cyan/50 text-white rounded-md px-3 py-2 shadow-sm focus:border-tron-cyan focus:ring focus:ring-tron-cyan/20 focus:outline-none font-orbitron"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-tron-cyan rounded-md shadow-md text-sm font-medium text-black bg-tron-cyan hover:bg-tron-cyan/90 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 transition-all duration-200 font-orbitron tron-glow ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'CREATING IDENTITY...' : 'CREATE IDENTITY'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-sm text-center">
              <p className="text-tron-cyan/70 font-orbitron">
                Already have an identity?{' '}
                <Link href="/login" className="font-medium text-tron-cyan hover:text-white transition-colors">
                  LOGIN
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 