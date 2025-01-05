'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock,
  Share2,
  Settings,
  Download,
  Upload
} from 'lucide-react';

interface StablecoinData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  targetCurrency: string;
  totalSupply: number;
  collateralAmount: number;
  holders: number;
  price: number;
  yield: number;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'mint' | 'burn' | 'transfer';
  amount: number;
  address: string;
  timestamp: string;
}

export default function StablecoinDetailsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StablecoinData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({
          id: params.id as string,
          name: 'USD Stablecoin',
          symbol: 'USDS',
          icon: '/placeholder.png',
          targetCurrency: 'USD',
          totalSupply: 1000000,
          collateralAmount: 1050000,
          holders: 156,
          price: 1.00,
          yield: 4.26,
          transactions: [
            {
              id: '1',
              type: 'mint',
              amount: 10000,
              address: '0x1234...5678',
              timestamp: '2024-01-20T10:00:00Z'
            },
            // Add more transaction examples
          ]
        });
      } catch (error) {
        console.error('Error fetching stablecoin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] p-6 flex items-center justify-center">
        <div className="text-[#E2FF66]">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#121212] p-6 flex items-center justify-center">
        <div className="text-red-500">Stablecoin not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link 
              href="/dashboard" 
              className="text-gray-400 hover:text-[#E2FF66] transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="ml-4 flex items-center">
              <img 
                src={data.icon} 
                alt={data.name}
                className="w-10 h-10 rounded-full bg-[#2A2A2A]"
              />
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-white">{data.name}</h1>
                <p className="text-gray-400">{data.symbol}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-[#E2FF66] transition-colors duration-200">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-[#E2FF66] transition-colors duration-200">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Price', 
              value: `$${data.price.toFixed(2)}`, 
              icon: DollarSign,
              change: '+0.01%'
            },
            { 
              label: 'Total Supply', 
              value: data.totalSupply.toLocaleString(), 
              icon: Upload 
            },
            { 
              label: 'Holders', 
              value: data.holders.toLocaleString(), 
              icon: Users 
            },
            { 
              label: 'Current Yield', 
              value: `${data.yield}%`, 
              icon: TrendingUp,
              change: '+0.25%'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-[#1A1A1A] p-6 rounded-lg border border-[#2A2A2A]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className="text-sm text-[#E2FF66] mt-1">{stat.change}</p>
                  )}
                </div>
                <div className="bg-[#2A2A2A] p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-[#E2FF66]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-[#2A2A2A] mb-6">
          <div className="flex space-x-8">
            {['overview', 'transactions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'overview' | 'transactions')}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab 
                    ? 'border-[#E2FF66] text-[#E2FF66]' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Card */}
            <div className="lg:col-span-2 bg-[#1A1A1A] p-6 rounded-lg border border-[#2A2A2A]">
              <h3 className="text-lg font-medium text-white mb-4">Price History</h3>
              <div className="h-64 flex items-center justify-center text-gray-400">
                Chart placeholder
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#2A2A2A]">
              <h3 className="text-lg font-medium text-white mb-4">Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Target Currency</p>
                  <p className="text-white">{data.targetCurrency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Collateral Amount</p>
                  <p className="text-white">${data.collateralAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created At</p>
                  <p className="text-white">January 20, 2024</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Address</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-[#2A2A2A] last:border-0">
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.type === 'mint' 
                            ? 'bg-green-100 text-green-800'
                            : tx.type === 'burn'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="p-4 text-white">{tx.amount.toLocaleString()}</td>
                      <td className="p-4 text-gray-400">{tx.address}</td>
                      <td className="p-4 text-gray-400">
                        {new Date(tx.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <button className="px-6 py-3 bg-[#E2FF66] text-black rounded-lg hover:bg-[#B3CC4D] transition-colors duration-200">
            <Upload className="h-5 w-5 inline-block mr-2" />
            Mint Tokens
          </button>
          <button className="px-6 py-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-colors duration-200">
            <Download className="h-5 w-5 inline-block mr-2" />
            Burn Tokens
          </button>
        </div>
      </div>
    </div>
  );
}