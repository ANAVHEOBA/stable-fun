// WalletButton.tsx
'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '../common/Button';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';

export function WalletButton() {
  const { 
    wallet, 
    publicKey, 
    connecting,
    connect,
    disconnect 
  } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      // Add toast notification here
    }
  };

  const viewOnExplorer = () => {
    if (publicKey) {
      window.open(
        `https://explorer.solana.com/address/${publicKey.toString()}`,
        '_blank'
      );
    }
  };

  if (!wallet) {
    return (
      <WalletModalButton className="px-4 py-2 border border-[#E2FF66] rounded-md text-[#E2FF66] 
        hover:bg-[#E2FF66] hover:text-black transition-colors duration-200">
        Select Wallet
      </WalletModalButton>
    );
  }

  if (!publicKey) {
    return (
      <Button
        variant="outline"
        leftIcon={<Wallet className="h-4 w-4" />}
        isLoading={connecting}
        onClick={() => connect().catch(() => {})}
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        rightIcon={<ChevronDown className="h-4 w-4" />}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {shortenAddress(publicKey.toString())}
      </Button>

      {showDropdown && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] 
            shadow-lg py-1 z-50"
        >
          <div className="px-4 py-2 border-b border-[#2A2A2A]">
            <p className="text-sm text-gray-400">Connected with {wallet.adapter.name}</p>
          </div>

          <button
            onClick={copyAddress}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-300 
              hover:bg-[#2A2A2A] transition-colors duration-200"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </button>

          <button
            onClick={viewOnExplorer}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-300 
              hover:bg-[#2A2A2A] transition-colors duration-200"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </button>

          <button
            onClick={() => {
              disconnect().catch(() => {});
              setShowDropdown(false);
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-red-400 
              hover:bg-[#2A2A2A] transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}