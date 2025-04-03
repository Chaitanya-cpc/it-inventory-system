'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [profileTab, setProfileTab] = useState(true);
  const [notificationsTab, setNotificationsTab] = useState(false);
  const [securityTab, setSecurityTab] = useState(false);
  const [apiTab, setApiTab] = useState(false);
  
  // Profile settings
  const [name, setName] = useState('Kevin Flynn');
  const [email, setEmail] = useState('flynn@encom.com');
  const [role, setRole] = useState('System Administrator');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [warrantyAlerts, setWarrantyAlerts] = useState(true);
  const [subscriptionReminders, setSubscriptionReminders] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [inventoryUpdates, setInventoryUpdates] = useState(false);
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // API settings
  const [apiEnabled, setApiEnabled] = useState(false);
  const [apiKey, setApiKey] = useState('••••••••••••••••••••••••••••••');
  
  const switchTab = (tab: string) => {
    setProfileTab(tab === 'profile');
    setNotificationsTab(tab === 'notifications');
    setSecurityTab(tab === 'security');
    setApiTab(tab === 'api');
  };
  
  const saveChanges = () => {
    // Simulating save functionality
    alert('Settings saved successfully!');
  };
  
  const generateNewApiKey = () => {
    // Simulating API key generation
    setApiKey('TRN_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  };
  
  return (
    <div className="h-full">
      <header className="px-6 py-4 border-b border-tron-cyan/30">
        <div>
          <h1 className="text-2xl font-semibold text-tron-cyan tracking-wide">SYSTEM SETTINGS</h1>
          <p className="mt-1 text-sm text-tron-cyan/70 tracking-wider">CONFIGURE YOUR SYSTEM PREFERENCES</p>
        </div>
      </header>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
              <div className="bg-tron-darkblue p-4">
                <h2 className="text-lg font-medium text-tron-cyan">SETTINGS MENU</h2>
              </div>
              
              <div className="p-2">
                <button
                  onClick={() => switchTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center text-sm ${
                    profileTab ? 'bg-tron-cyan/10 text-tron-cyan' : 'text-tron-cyan/70 hover:bg-tron-cyan/5'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  USER PROFILE
                </button>
                
                <button
                  onClick={() => switchTab('notifications')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center text-sm ${
                    notificationsTab ? 'bg-tron-cyan/10 text-tron-cyan' : 'text-tron-cyan/70 hover:bg-tron-cyan/5'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  NOTIFICATIONS
                </button>
                
                <button
                  onClick={() => switchTab('security')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center text-sm ${
                    securityTab ? 'bg-tron-cyan/10 text-tron-cyan' : 'text-tron-cyan/70 hover:bg-tron-cyan/5'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SECURITY
                </button>
                
                <button
                  onClick={() => switchTab('api')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center text-sm ${
                    apiTab ? 'bg-tron-cyan/10 text-tron-cyan' : 'text-tron-cyan/70 hover:bg-tron-cyan/5'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  API ACCESS
                </button>
              </div>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="flex-1">
            <div className="border border-tron-cyan/30 rounded overflow-hidden bg-black">
              {/* Profile Tab */}
              {profileTab && (
                <div>
                  <div className="bg-tron-darkblue p-4">
                    <h2 className="text-lg font-medium text-tron-cyan">USER PROFILE</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-24 h-24 rounded-full bg-tron-cyan/20 border border-tron-cyan/40 flex items-center justify-center">
                        <svg className="w-12 h-12 text-tron-cyan" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <h3 className="text-xl font-medium text-tron-cyan">{name}</h3>
                        <p className="text-tron-cyan/70">{email}</p>
                        <p className="text-sm text-tron-cyan/60">{role}</p>
                        
                        <button className="mt-2 px-3 py-1 text-xs border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition">
                          CHANGE AVATAR
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm text-tron-cyan">FULL NAME</label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm text-tron-cyan">EMAIL ADDRESS</label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="role" className="block text-sm text-tron-cyan">ROLE</label>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-black border border-tron-cyan/30 text-tron-cyan focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded px-4 py-2"
                        >
                          <option value="System Administrator">System Administrator</option>
                          <option value="Inventory Manager">Inventory Manager</option>
                          <option value="IT Technician">IT Technician</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notifications Tab */}
              {notificationsTab && (
                <div>
                  <div className="bg-tron-darkblue p-4">
                    <h2 className="text-lg font-medium text-tron-cyan">NOTIFICATION PREFERENCES</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="border-b border-tron-cyan/20 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-tron-cyan font-medium">Email Notifications</h3>
                          <p className="text-tron-cyan/60 text-sm mt-1">Enable email notifications for system updates</p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-tron-cyan/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-tron-cyan after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tron-cyan"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-tron-cyan font-medium">Alert Types</h3>
                      
                      <div className="flex items-center justify-between py-2">
                        <div className="text-tron-cyan/80">Warranty Expiration Alerts</div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={warrantyAlerts}
                            onChange={() => setWarrantyAlerts(!warrantyAlerts)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-tron-cyan/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-tron-cyan after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tron-cyan"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div className="text-tron-cyan/80">Subscription Renewal Reminders</div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={subscriptionReminders}
                            onChange={() => setSubscriptionReminders(!subscriptionReminders)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-tron-cyan/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-tron-cyan after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tron-cyan"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div className="text-tron-cyan/80">Security Alerts</div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={securityAlerts}
                            onChange={() => setSecurityAlerts(!securityAlerts)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-tron-cyan/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-tron-cyan after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tron-cyan"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div className="text-tron-cyan/80">Inventory Updates</div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={inventoryUpdates}
                            onChange={() => setInventoryUpdates(!inventoryUpdates)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-tron-cyan/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-tron-cyan after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tron-cyan"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Tab */}
              {securityTab && (
                <div>
                  <div className="bg-tron-darkblue p-4">
                    <h2 className="text-lg font-medium text-tron-cyan">SECURITY SETTINGS</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="border-b border-tron-cyan/20 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-tron-cyan font-medium">Two-Factor Authentication</h3>
                          <p className="text-tron-cyan/60 text-sm mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={twoFactorEnabled}
                            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-tron-cyan/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-tron-cyan after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tron-cyan"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-tron-cyan font-medium">Password</h3>
                      
                      <button className="px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition text-sm">
                        CHANGE PASSWORD
                      </button>
                      
                      <div className="mt-6">
                        <h3 className="text-tron-cyan font-medium mb-3">Session Management</h3>
                        
                        <div className="border border-tron-cyan/30 rounded-md p-4">
                          <p className="text-tron-cyan/80 text-sm">You are currently logged in from:</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-tron-cyan mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-tron-cyan">Mac OS X - Chrome</span>
                            </div>
                            <span className="text-tron-cyan/60 text-xs">Current Session</span>
                          </div>
                        </div>
                        
                        <button className="mt-4 px-4 py-2 border border-red-500 text-red-500 bg-black hover:bg-red-500/10 rounded transition text-sm">
                          LOGOUT FROM ALL DEVICES
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* API Access Tab */}
              {apiTab && (
                <div>
                  <div className="bg-tron-darkblue p-4">
                    <h2 className="text-lg font-medium text-tron-cyan">API ACCESS</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="border-b border-tron-cyan/20 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-tron-cyan font-medium">API Access</h3>
                          <p className="text-tron-cyan/60 text-sm mt-1">Allow external applications to access your data</p>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={apiEnabled}
                            onChange={() => setApiEnabled(!apiEnabled)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-tron-cyan/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:border-tron-cyan after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tron-cyan"></div>
                        </label>
                      </div>
                    </div>
                    
                    {apiEnabled && (
                      <div className="space-y-4">
                        <h3 className="text-tron-cyan font-medium">API Key</h3>
                        
                        <div className="flex">
                          <input
                            type="text"
                            value={apiKey}
                            readOnly
                            className="flex-1 bg-black border border-tron-cyan/30 text-tron-cyan placeholder-tron-cyan/50 focus:outline-none focus:ring-2 focus:ring-tron-cyan/50 focus:border-transparent rounded-l px-4 py-2"
                          />
                          <button 
                            className="px-4 py-2 bg-tron-darkblue text-tron-cyan border border-tron-cyan/30 rounded-r"
                            onClick={generateNewApiKey}
                          >
                            GENERATE NEW KEY
                          </button>
                        </div>
                        
                        <p className="text-tron-cyan/60 text-sm mt-2">
                          This key grants access to your inventory data. Keep it secure and don't share it publicly.
                        </p>
                        
                        <div className="mt-6">
                          <h3 className="text-tron-cyan font-medium mb-3">API Documentation</h3>
                          <p className="text-tron-cyan/80 text-sm mb-3">
                            Learn how to integrate with our API to access inventory data programmatically.
                          </p>
                          <Link href="/api/docs" className="text-tron-cyan hover:text-tron-cyan/70 text-sm flex items-center">
                            VIEW DOCUMENTATION
                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="bg-tron-darkblue/50 p-4 border-t border-tron-cyan/30 flex justify-end">
                <button 
                  onClick={saveChanges}
                  className="px-6 py-2 bg-tron-cyan text-black font-medium rounded hover:bg-tron-cyan/90 transition"
                >
                  SAVE CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 