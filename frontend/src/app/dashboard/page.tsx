'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className={`flex items-center p-6 rounded border tron-glow ${color}`}>
    <div className="mr-4">{icon}</div>
    <div>
      <p className="text-xs tracking-wider opacity-70">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">SYSTEM DASHBOARD</h1>
        <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">WELCOME TO THE GRID, USER</p>
      </header>
      
      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded border border-tron-cyan/30 bg-tron-darkblue/20"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="TOTAL ASSETS"
                value="127"
                color="border-tron-cyan/50 text-tron-cyan"
                icon={
                  <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                }
              />
              <StatCard
                title="ACTIVE SUBSCRIPTIONS"
                value="14"
                color="border-tron-orange/50 text-tron-orange"
                icon={
                  <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatCard
                title="EXPIRING WARRANTIES"
                value="3"
                color="border-tron-red/50 text-tron-red"
                icon={
                  <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                }
              />
              <StatCard
                title="TOTAL CATEGORIES"
                value="9"
                color="border-tron-green/50 text-tron-green"
                icon={
                  <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                }
              />
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 border border-tron-cyan/30 rounded p-6">
                <h2 className="text-xl font-semibold text-tron-cyan mb-4 tracking-wide">RECENT ACTIVITY</h2>
                <div className="space-y-4">
                  {[
                    { action: 'ADDED TECH ITEM', item: 'Dell XPS 15 Laptop', time: '2 hours ago' },
                    { action: 'RENEWED SUBSCRIPTION', item: 'Adobe Creative Cloud', time: '1 day ago' },
                    { action: 'UPDATED WARRANTY', item: 'Apple iPhone 13', time: '3 days ago' },
                    { action: 'ADDED CREDENTIALS', item: 'GitHub Account', time: '1 week ago' },
                  ].map((activity, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-tron-cyan/20 pb-3">
                      <div>
                        <p className="text-tron-cyan/80 text-sm tracking-wider">{activity.action}</p>
                        <p className="text-tron-cyan text-base">{activity.item}</p>
                      </div>
                      <span className="text-xs text-tron-cyan/60">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border border-tron-cyan/30 rounded p-6">
                <h2 className="text-xl font-semibold text-tron-cyan mb-4 tracking-wide">QUICK ACTIONS</h2>
                <div className="space-y-3">
                  <Link href="/dashboard/tech/add" className="block w-full p-3 text-center rounded border border-tron-cyan text-tron-cyan hover:bg-tron-cyan/10 transition">
                    ADD NEW ASSET
                  </Link>
                  <Link href="/dashboard/subscriptions/add" className="block w-full p-3 text-center rounded border border-tron-orange text-tron-orange hover:bg-tron-orange/10 transition">
                    ADD SUBSCRIPTION
                  </Link>
                  <Link href="/dashboard/credentials/add" className="block w-full p-3 text-center rounded border border-tron-green text-tron-green hover:bg-tron-green/10 transition">
                    STORE CREDENTIALS
                  </Link>
                  <Link href="/dashboard/categories" className="block w-full p-3 text-center rounded border border-tron-blue text-tron-blue hover:bg-tron-blue/10 transition">
                    MANAGE CATEGORIES
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border border-tron-cyan/30 rounded p-6">
              <h2 className="text-xl font-semibold text-tron-cyan mb-4 tracking-wide">UPCOMING EVENTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'SUBSCRIPTION RENEWAL', description: 'Netflix Premium Plan', date: 'Jun 15, 2023', type: 'subscription' },
                  { title: 'WARRANTY EXPIRATION', description: 'Samsung Galaxy S21', date: 'Jul 22, 2023', type: 'warranty' },
                  { title: 'LICENSE RENEWAL', description: 'Microsoft Office 365', date: 'Aug 1, 2023', type: 'license' },
                ].map((event, i) => (
                  <div key={i} className={`p-4 rounded border ${
                    event.type === 'subscription' ? 'border-tron-orange/40 text-tron-orange' :
                    event.type === 'warranty' ? 'border-tron-red/40 text-tron-red' : 'border-tron-blue/40 text-tron-blue'
                  }`}>
                    <p className="text-sm tracking-wider opacity-80">{event.title}</p>
                    <p className="text-base font-medium mt-1">{event.description}</p>
                    <p className="text-xs mt-2 opacity-70">{event.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 