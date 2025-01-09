'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Coins, TrendingUp } from 'lucide-react';
import { WalletButton } from '../components/wallet/WalletButton';

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'Built on Solana blockchain with full transparency and security'
    },
    {
      icon: Coins,
      title: 'Yield-Bearing',
      description: 'Earn yield on your stablecoins through stablebonds'
    },
    {
      icon: TrendingUp,
      title: 'Multiple Currencies',
      description: 'Create stablecoins pegged to various fiat currencies'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Navigation */}
      <nav className="border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-[#E2FF66] text-xl font-bold">
                Stable.fun
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-[#E2FF66] px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <div className="ml-4">
                <WalletButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Create Your Own{' '}
              <span className="text-[#E2FF66]">Stablecoins</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Launch your custom stablecoins backed by yield-bearing stablebonds. 
              Secure, transparent, and profitable.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/stablecoins/create"
                className="px-8 py-3 bg-[#E2FF66] text-black rounded-lg 
                  hover:bg-[#B3CC4D] transition-colors duration-200 flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-3 border border-[#2A2A2A] text-white rounded-lg 
                  hover:border-[#E2FF66] hover:text-[#E2FF66] transition-colors duration-200"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#1A1A1A] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Stable.fun?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Create and manage your stablecoins with confidence using our 
              powerful platform built on Solana.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-[#2A2A2A] rounded-lg hover:border-[#E2FF66] 
                  border border-transparent transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-[#E2FF66] rounded-lg w-12 h-12 flex items-center 
                  justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Your Stablecoin?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join the future of decentralized finance with your own custom stablecoin.
            </p>
            <Link
              href="/stablecoins/create"
              className="inline-flex items-center px-8 py-3 bg-[#E2FF66] text-black 
                rounded-lg hover:bg-[#B3CC4D] transition-colors duration-200"
            >
              Create Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[#E2FF66] text-xl font-bold mb-4">Stable.fun</h3>
              <p className="text-gray-400">
                Create and manage your own stablecoins with ease.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-[#E2FF66]">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/stablecoins/create" className="text-gray-400 hover:text-[#E2FF66]">
                    Create Stablecoin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#E2FF66]">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#E2FF66]">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#E2FF66]">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#E2FF66]">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#2A2A2A] text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Stable.fun. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}