import { useEffect, useState, useCallback } from 'react';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface WalletBalance {
  sol: number;
  usd: number;
  loading: boolean;
  error: string | null;
}

export function useWallet() {
  const { 
    publicKey,
    connected,
    connecting,
    disconnect,
    select,
    wallet,
    wallets,
  } = useSolanaWallet();

  const [balance, setBalance] = useState<WalletBalance>({
    sol: 0,
    usd: 0,
    loading: false,
    error: null,
  });

  // Example RPC endpoint - replace with your preferred endpoint
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;

    setBalance(prev => ({ ...prev, loading: true, error: null }));

    try {
      const lamports = await connection.getBalance(publicKey);
      const sol = lamports / LAMPORTS_PER_SOL;

      // Fetch SOL price (example - replace with your preferred price source)
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      const solPrice = data.solana.usd;

      setBalance({
        sol,
        usd: sol * solPrice,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch balance',
      }));
    }
  }, [publicKey, connection]);

  useEffect(() => {
    if (connected) {
      fetchBalance();
    }
  }, [connected, fetchBalance]);

  const connectWallet = useCallback(async (walletName: string) => {
    try {
      const selectedWallet = wallets.find(w => w.adapter.name === walletName);
      if (selectedWallet) {
        await select(selectedWallet.adapter.name);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, [wallets, select]);

  return {
    publicKey,
    connected,
    connecting,
    disconnect,
    wallet,
    wallets,
    balance,
    connectWallet,
    refreshBalance: fetchBalance,
  };
}