import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';
import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from '@solana/web3.js';
import IDL from '../stable_fun_new.json';

const PROGRAM_ID = new PublicKey("AxsQr2gYQksKWj8Xd4HSxXWDqpeRVYb9ow9ZerNWZoD");

// Create program type from the JSON
type StableFunProgram = anchor.Program<typeof IDL>;

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

export function useStablecoinProgram(): StablecoinProgramState {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const provider = useMemo(() => {
    if (!publicKey || !signTransaction || !signAllTransactions) {
      console.log("Wallet not connected or missing required methods");
      return null;
    }

    try {
      const wallet = {
        publicKey,
        signTransaction,
        signAllTransactions,
      };

      const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        { commitment: 'confirmed', preflightCommitment: 'confirmed' }
      );
      anchor.setProvider(provider);
      return provider;
    } catch (err) {
      console.error("Provider initialization error:", err);
      return null;
    }
  }, [connection, publicKey, signTransaction, signAllTransactions]);

  const program = useMemo(() => {
    if (!provider) {
      console.log("Provider not available");
      return null;
    }
  
    try {
      setLoading(true);
      
      // Create a modified IDL with account types and sizes
      const modifiedIdl = {
        ...IDL,
        accounts: IDL.types
          .filter(t => t.type.kind === 'struct')
          .map(t => ({
            name: t.name,
            type: {
              kind: 'struct',
              fields: t.type.fields || []
            },
            size: 1000 // Default size for all accounts
          }))
      };

      // Log the modified IDL for debugging
      console.log("Creating program with IDL:", {
        version: modifiedIdl.metadata?.version,
        name: modifiedIdl.metadata?.name,
        accountCount: modifiedIdl.accounts?.length,
        instructionCount: modifiedIdl.instructions?.length
      });
      
      const program = new anchor.Program(
        modifiedIdl as anchor.Idl,
        PROGRAM_ID.toString(),
        provider
      ) as StableFunProgram;
      
      console.log("Program created successfully");
      return program;
    } catch (err) {
      console.error("Program initialization error:", err);
      setError("Failed to initialize program");
      return null;
    } finally {
      setLoading(false);
    }
  }, [provider]);

  const findProgramAddress = async (seeds: Buffer[], programId: PublicKey = PROGRAM_ID) => {
    return await PublicKey.findProgramAddress(seeds, programId);
  };

  const getStablecoinMintPDA = async (authority: PublicKey, symbol: string) => {
    const [pda] = await findProgramAddress([
      Buffer.from("stablecoin"),
      authority.toBuffer(),
      Buffer.from(symbol)
    ]);
    return pda;
  };

  const getVaultPDA = async (stablecoinMint: PublicKey) => {
    const [pda] = await findProgramAddress([
      Buffer.from("vault"),
      stablecoinMint.toBuffer()
    ]);
    return pda;
  };

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

export default useStablecoinProgram;