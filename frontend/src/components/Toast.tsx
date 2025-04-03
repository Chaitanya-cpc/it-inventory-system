'use client';

import { useState, useEffect } from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export default function Toast({ 
  id, 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, duration);
    
    return () => clearTimeout(timeout);
  }, [duration]);
  
  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 300); // Match transition duration
  };
  
  if (!visible) return null;
  
  const typeStyles = {
    success: "border-tron-green bg-tron-darkblue/50 text-tron-green",
    error: "border-tron-red bg-tron-darkblue/50 text-tron-red",
    info: "border-tron-cyan bg-tron-darkblue/50 text-tron-cyan",
  };
  
  const icons = {
    success: (
      <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  };
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 transform transition-transform duration-300 ease-in-out ${
        exiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
    >
      <div 
        className={`flex items-center border px-4 py-3 rounded shadow-md ${typeStyles[type]}`}
        role="alert"
      >
        {icons[type]}
        <div>{message}</div>
        <button
          onClick={handleClose}
          className="ml-4 text-xl leading-none focus:outline-none"
          aria-label="Close"
        >
          <span>&times;</span>
        </button>
      </div>
    </div>
  );
}

// Toast Manager Component

export interface ToastData extends Omit<ToastProps, 'id' | 'onClose'> {
  id?: string;
}

interface ToastManagerProps {
  toasts: ToastData[];
  removeToast: (id: string) => void;
}

export function ToastManager({ toasts, removeToast }: ToastManagerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id!}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id!)}
        />
      ))}
    </>
  );
}

// Toast Context and Hook

import { createContext, useContext, ReactNode } from 'react';

interface ToastContextType {
  showToast: (toast: ToastData) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  
  const showToast = (toast: ToastData): string => {
    const id = toast.id || Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };
  
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastManager toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
} 