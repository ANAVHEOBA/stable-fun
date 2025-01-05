'use client';

import { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  Users, 
  DollarSign 
} from 'lucide-react';

export default function DashboardPage() {
  // Example stats - replace with real data
  const stats = [
    { name: 'Total Stablecoins', value: '12', icon: Coins },
    { name: 'Total Value Locked', value: '$24,563', icon: DollarSign },
    { name: 'Active Users', value: '2,345', icon: Users },
    { name: 'Yield Generated', value: '$1,245', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <button className="px-4 py-2 bg-[#E2FF66] text-black rounded-lg 
          hover:bg-[#B3CC4D] transition-colors duration-200">
          Create New Stablecoin
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.name}
            className="bg-[#1A1A1A] p-6 rounded-lg border border-[#2A2A2A]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="bg-[#2A2A2A] p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-[#E2FF66]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
        <div className="p-6 border-b border-[#2A2A2A]">
          <h2 className="text-lg font-medium text-white">Recent Activity</h2>
        </div>
        <div className="p-6">
          {/* Activity List */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="flex items-center justify-between py-3 border-b border-[#2A2A2A] last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    New Stablecoin Created
                  </p>
                  <p className="text-sm text-gray-400">
                    USDC-backed stablecoin
                  </p>
                </div>
                <span className="text-sm text-gray-400">
                  2 hours ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Stablecoins */}
      <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
        <div className="p-6 border-b border-[#2A2A2A]">
          <h2 className="text-lg font-medium text-white">Your Stablecoins</h2>
        </div>
        <div className="p-6">
          {/* Stablecoins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-[#2A2A2A] p-6 rounded-lg hover:border-[#E2FF66] 
                  border border-transparent transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-[#E2FF66] p-2 rounded-full">
                    <Coins className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-white font-medium">USD Stable</p>
                    <p className="text-sm text-gray-400">1,000,000 USDS</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}