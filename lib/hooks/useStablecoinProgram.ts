import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';
import * as anchor from "@coral-xyz/anchor";
import { IDL, StableFunProgram } from '../program/idl';
import { Connection, PublicKey } from '@solana/web3.js';
import type { WalletContextState } from '@solana/wallet-adapter-react';

const PROGRAM_ID = new PublicKey("AxsQr2gYQksKWj8Xd4HSxXWDqpeRVYb9ow9ZerNWZoD");

interface StablecoinProgramState {
  program: StableFunProgram | null;
  loading: boolean;
  error: string | null;
  provider: anchor.AnchorProvider | null;
  utils: {
    findProgramAddress: (seeds: Buffer[], programId?: PublicKey) => Promise<[PublicKey, number]>;
    getStablecoinMintPDA: (authority: PublicKey, symbol: string) => Promise<PublicKey>;
    getVaultPDA: (stablecoinMint: PublicKey) => Promise<PublicKey>;
    getMintAuthorityPDA: (stablecoinMint: PublicKey) => Promise<PublicKey>;
  };
}

// Create a wrapper to make wallet-adapter-react's WalletContextState compatible with Anchor
const createAnchorWallet = (wallet: WalletContextState) => {
  if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
    return null;
  }
  
  return {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions,
  };
};

export function useStablecoinProgram(): StablecoinProgramState {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const provider = useMemo(() => {
    const anchorWallet = createAnchorWallet(wallet);
    if (!anchorWallet) {
      return null;
    }

    try {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet as anchor.Wallet,
        { commitment: 'confirmed', preflightCommitment: 'confirmed' }
      );
      anchor.setProvider(provider);
      return provider;
    } catch (err) {
      console.error("Provider initialization error:", err);
      return null;
    }
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) {
      setError("Wallet not connected");
      return null;
    }

    try {
      setLoading(true);
      return new anchor.Program(
        IDL,
        PROGRAM_ID,
        provider
      ) as StableFunProgram;
    } catch (err) {
      console.error("Program initialization error:", err);
      setError("Failed to initialize program");
      return null;
    } finally {
      setLoading(false);
    }
  }, [provider]);

  // Helper function to derive PDA (Program Derived Address)
  const findProgramAddress = async (seeds: Buffer[], programId: PublicKey = PROGRAM_ID) => {
    return await PublicKey.findProgramAddress(seeds, programId);
  };

  // Helper function to get stablecoin mint PDA
  const getStablecoinMintPDA = async (authority: PublicKey, symbol: string) => {
    const [pda] = await findProgramAddress([
      Buffer.from("stablecoin"),
      authority.toBuffer(),
      Buffer.from(symbol)
    ]);
    return pda;
  };

  // Helper function to get vault PDA
  const getVaultPDA = async (stablecoinMint: PublicKey) => {
    const [pda] = await findProgramAddress([
      Buffer.from("vault"),
      stablecoinMint.toBuffer()
    ]);
    return pda;
  };

  // Helper function to get mint authority PDA
  const getMintAuthorityPDA = async (stablecoinMint: PublicKey) => {
    const [pda] = await findProgramAddress([
      Buffer.from("mint-authority"),
      stablecoinMint.toBuffer()
    ]);
    return pda;
  };

  return {
    program,
    loading,
    error,
    provider,
    utils: {
      findProgramAddress,
      getStablecoinMintPDA,
      getVaultPDA,
      getMintAuthorityPDA
    }
  };
}

// Helper types remain unchanged...
export interface StablecoinMintAccount {
  authority: PublicKey;
  name: string;
  symbol: string;
  targetCurrency: string;
  tokenMint: PublicKey;
  stablebondMint: PublicKey;
  priceFeed: PublicKey;
  vault: PublicKey;
  currentSupply: anchor.BN;
  settings: {
    feeBasisPoints: number;
    maxSupply: anchor.BN;
    minCollateralRatio: number;
    mintPaused: boolean;
    redeemPaused: boolean;
  };
  stats: {
    totalMinted: anchor.BN;
    totalBurned: anchor.BN;
    totalFees: anchor.BN;
    holderCount: number;
  };
  createdAt: anchor.BN;
  lastUpdated: anchor.BN;
}

export interface StablecoinVaultAccount {
  stablecoinMint: PublicKey;
  authority: PublicKey;
  collateralAccount: PublicKey;
  totalCollateral: anchor.BN;
  totalValueLocked: anchor.BN;
  currentRatio: number;
  lastDepositTime: anchor.BN;
  lastWithdrawalTime: anchor.BN;
  depositCount: number;
  withdrawalCount: number;
  bump: number;
}

export default useStablecoinProgram;