'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  PlusCircle,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create', href: '/stablecoins/create', icon: PlusCircle },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/profile', icon: Settings },
  ];

  const bottomNavigation = [
    { name: 'Help', href: '/help', icon: HelpCircle },
    { name: 'Logout', href: '/logout', icon: LogOut },
  ];

  return (
    <div 
      className={`
        fixed top-0 left-0 h-full bg-[#1A1A1A] border-r border-[#2A2A2A] 
        transition-all duration-300 z-50
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#2A2A2A]">
        {!isCollapsed && (
          <Link href="/" className="text-[#E2FF66] text-xl font-bold">
            Stable.fun
          </Link>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-[#2A2A2A] text-[#E2FF66]' 
                      : 'text-gray-400 hover:text-[#E2FF66] hover:bg-[#2A2A2A]'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <ul className="space-y-2">
          {bottomNavigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-400 hover:text-[#E2FF66] 
                  hover:bg-[#2A2A2A] rounded-lg transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 text-gray-400 
            hover:text-[#E2FF66] hover:bg-[#2A2A2A] rounded-lg transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}