// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X, BellDot } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { publicKey } = useWallet();
  const [notifications] = useState(3);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Create', href: '/stablecoins/create' },
    { name: 'Explore', href: '/explore' },
  ];

  return (
    <nav className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#E2FF66]">Stable.fun</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'text-[#E2FF66] bg-[#2A2A2A]'
                    : 'text-gray-300 hover:text-[#E2FF66]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Notifications & Wallet */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white">
              <BellDot className="h-6 w-6" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-[#E2FF66] rounded-full flex items-center justify-center text-xs text-black">
                  {notifications}
                </span>
              )}
            </button>
            <WalletMultiButton className="!bg-[#2A2A2A] hover:!bg-[#3A3A3A] !text-[#E2FF66] !border !border-[#E2FF66]" />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === item.href
                  ? 'text-[#E2FF66] bg-[#2A2A2A]'
                  : 'text-gray-300 hover:text-[#E2FF66]'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <WalletMultiButton className="!bg-[#2A2A2A] hover:!bg-[#3A3A3A] !text-[#E2FF66] !border !border-[#E2FF66] w-full" />
          </div>
        </div>
      </div>
    </nav>
  );
}