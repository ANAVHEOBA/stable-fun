'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  PlusCircle, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  Wallet
} from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Stablecoin', href: '/stablecoins/create', icon: PlusCircle },
    { name: 'Settings', href: '/profile', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-64 bg-[#1A1A1A] border-r border-[#2A2A2A] 
        transform transition-transform duration-200 ease-in-out z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#2A2A2A]">
          <Link href="/dashboard" className="text-[#E2FF66] text-xl font-bold">
            Stable.fun
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-300 hover:text-[#E2FF66] 
                hover:bg-[#2A2A2A] rounded-lg transition-colors duration-200"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-[#2A2A2A] pt-4">
            <button className="flex items-center px-4 py-3 text-gray-300 hover:text-[#E2FF66] 
              hover:bg-[#2A2A2A] rounded-lg transition-colors duration-200 w-full">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <div className="h-16 bg-[#1A1A1A] border-b border-[#2A2A2A] flex items-center justify-between px-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-300 hover:text-[#E2FF66]"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <WalletMultiButton className="!bg-[#2A2A2A] hover:!bg-[#3A3A3A] !text-[#E2FF66] !border !border-[#E2FF66]" />
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}