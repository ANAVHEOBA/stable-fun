'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, ChevronDown } from 'lucide-react';
import { Button } from '../common/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [notifications] = useState(3); // Example notification count

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Create', href: '/stablecoins/create' },
    { name: 'Explore', href: '/explore' },
  ];

  return (
    <nav className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-[#E2FF66] text-xl font-bold">
                Stable.fun
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-[#E2FF66]'
                      : 'text-gray-300 hover:text-[#E2FF66]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-[#E2FF66] transition-colors duration-200">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.5 text-xs 
                  bg-[#E2FF66] text-black rounded-full">
                  {notifications}
                </span>
              )}
            </button>

            {/* Wallet Button */}
            <Button variant="outline">
              Connect Wallet
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
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
                  : 'text-gray-300 hover:text-[#E2FF66] hover:bg-[#2A2A2A]'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="outline" fullWidth className="mt-4">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
}