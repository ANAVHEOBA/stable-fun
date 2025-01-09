import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { StablecoinProgram } from '../program/stablecoin';
import { useMemo, useState } from 'react';
import * as anchor from "@coral-xyz/anchor";

interface StablecoinProgramState {
  program: StablecoinProgram | null;
  loading: boolean;
  error: string | null;
}

export function useStablecoinProgram(): StablecoinProgramState {
  const { wallet, publicKey } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const program = useMemo(() => {
    if (!wallet || !publicKey) {
      setError("Wallet not connected");
      return null;
    }

    try {
      const provider = new anchor.AnchorProvider(
        connection,
        wallet as any,
        { commitment: 'confirmed' }
      );

      return new StablecoinProgram(provider);
    } catch (err) {
      setError("Failed to initialize program");
      console.error("Program initialization error:", err);
      return null;
    }
  }, [connection, wallet, publicKey]);

  return {
    program,
    loading,
    error,
  };
}

export default useStablecoinProgram;