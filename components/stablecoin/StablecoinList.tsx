'use client';

import { useState } from 'react';
import { StablecoinCard } from './StablecoinCard';
import { Input } from '../common/Input';
import { Search, Filter } from 'lucide-react';

interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  holders: number;
  yield: number;
}

interface StablecoinListProps {
  stablecoins: Stablecoin[];
  onSelect?: (stablecoin: Stablecoin) => void;
}

export function StablecoinList({ stablecoins, onSelect }: StablecoinListProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'marketCap' | 'yield'>('marketCap');

  const filteredStablecoins = stablecoins
    .filter(coin => 
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'marketCap') {
        return b.marketCap - a.marketCap;
      }
      return b.yield - a.yield;
    });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search stablecoins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'marketCap' | 'yield')}
          className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
            text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent"
        >
          <option value="marketCap">Market Cap</option>
          <option value="yield">Yield</option>
        </select>
      </div>

      {/* List */}
      {filteredStablecoins.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No stablecoins found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStablecoins.map((coin) => (
            <StablecoinCard
              key={coin.id}
              {...coin}
              onClick={() => onSelect?.(coin)}
            />
          ))}
        </div>
      )}
    </div>
  );
}