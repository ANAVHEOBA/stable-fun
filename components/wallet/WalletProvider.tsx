'use client';

import { useMemo } from 'react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Commitment } from '@solana/web3.js';

// Import the styles in a Next.js friendly way
import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
  children: React.ReactNode;
}

export function CustomWalletProvider({ children }: Props) {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => {
    return process.env.NEXT_PUBLIC_RPC_ENDPOINT || clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ], [network]);

  const config = useMemo(() => ({
    commitment: 'confirmed' as Commitment,
    wsEndpoint: process.env.NEXT_PUBLIC_WS_ENDPOINT,
  }), []);

  return (
    <ConnectionProvider endpoint={endpoint} config={config}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useWalletError() {
  const handleError = (error: WalletError | Error) => {
    if ('code' in error) {
      switch (error.code) {
        case 4001:
          console.error('User rejected the request');
          break;
        case -32002:
          console.error('Request already pending');
          break;
        case -32603:
          console.error('Transaction failed');
          break;
        default:
          console.error(`Wallet error: ${error.message}`);
      }
    } else {
      console.error('Application error:', error.message);
    }
  };

  return { handleError };
}