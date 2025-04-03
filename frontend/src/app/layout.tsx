import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ToastProvider } from '@/components/Toast'
import ErrorBoundary from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'TRON Inventory System',
  description: 'Track and manage your digital assets in the Grid',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-orbitron bg-black">
        <ErrorBoundary>
          <ToastProvider>
            <div className="min-h-screen tron-gradient">
              {children}
            </div>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
} 