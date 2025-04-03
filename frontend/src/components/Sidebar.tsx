'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  icon: any;
  label: string;
  collapsed?: boolean;
};

const NavItem = ({ href, icon: Icon, label, collapsed }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <div title={collapsed ? label : undefined}>
      <Link
        href={href}
        className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded transition ${
          isActive 
            ? 'bg-tron-darkblue text-tron-cyan tron-glow border border-tron-cyan' 
            : 'text-tron-cyan/70 hover:bg-tron-darkblue/50 hover:border hover:border-tron-cyan/50'
        }`}
      >
        <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
        {!collapsed && <span className="tracking-wide">{label}</span>}
      </Link>
    </div>
  );
};

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <div className={`flex flex-col ${collapsed ? 'w-16' : 'w-64'} bg-black h-screen border-r border-tron-cyan/30`}>
      <div className={`p-4 border-b border-tron-cyan/30 ${collapsed ? 'text-center' : ''}`}>
        {collapsed ? (
          <div className="text-xl font-bold text-tron-cyan">IS</div>
        ) : (
          <h1 className="text-xl font-bold text-tron-cyan tron-text tracking-wider">INVENTORY SYSTEM</h1>
        )}
      </div>
      
      <div className={`flex-1 overflow-y-auto ${collapsed ? 'px-2' : 'p-4'} space-y-2`}>
        <div className="space-y-2">
          {!collapsed && <p className="text-xs uppercase text-tron-cyan/70 font-semibold px-2 tracking-wider">Main</p>}
          <NavItem 
            href="/dashboard" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            )} 
            label="DASHBOARD"
            collapsed={collapsed}
          />
        </div>
        
        <div className="space-y-2 pt-4">
          {!collapsed && <p className="text-xs uppercase text-tron-cyan/70 font-semibold px-2 tracking-wider">Inventory</p>}
          <NavItem 
            href="/dashboard/tech" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            )} 
            label="TECH PRODUCTS"
            collapsed={collapsed}
          />
          <NavItem 
            href="/dashboard/wires" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            )} 
            label="WIRES & CABLES"
            collapsed={collapsed}
          />
          <NavItem 
            href="/dashboard/hardware" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )} 
            label="HARDWARE"
            collapsed={collapsed}
          />
        </div>
        
        <div className="space-y-2 pt-4">
          {!collapsed && <p className="text-xs uppercase text-tron-cyan/70 font-semibold px-2 tracking-wider">Digital</p>}
          <NavItem 
            href="/dashboard/subscriptions" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )} 
            label="SUBSCRIPTIONS"
            collapsed={collapsed}
          />
          <NavItem 
            href="/dashboard/credentials" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            )} 
            label="CREDENTIALS"
            collapsed={collapsed}
          />
        </div>
        
        <div className="space-y-2 pt-4">
          {!collapsed && <p className="text-xs uppercase text-tron-cyan/70 font-semibold px-2 tracking-wider">Management</p>}
          <NavItem 
            href="/dashboard/categories" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            )} 
            label="CATEGORIES"
            collapsed={collapsed}
          />
          <NavItem 
            href="/dashboard/warranties" 
            icon={() => (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )} 
            label="WARRANTIES"
            collapsed={collapsed}
          />
        </div>
      </div>
      
      <div className={`${collapsed ? 'p-2' : 'p-4'} border-t border-tron-cyan/30 mt-auto`}>
        {!collapsed && (
          <div className="mb-4 rounded-lg border border-tron-cyan/30 p-4 text-center text-tron-cyan/80 text-xs">
            <p>SYSTEM STATUS: ONLINE</p>
            <p className="mt-1">USER: FLYNN</p>
          </div>
        )}
        
        <NavItem 
          href="/dashboard/settings" 
          icon={() => (
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )} 
          label="SETTINGS"
          collapsed={collapsed}
        />
      </div>
    </div>
  );
} 