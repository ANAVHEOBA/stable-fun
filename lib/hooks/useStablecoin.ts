import { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useStablecoinProgram } from './useStablecoinProgram';
import * as anchor from "@coral-xyz/anchor";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { IDL, StablecoinMint, StablecoinVault, StableFunProgram } from '../program/idl';

interface StablecoinInfo {
  address: string;
  name: string;
  symbol: string;
  totalSupply: number;
  collateralAmount: number;
  holders: number;
  price: number;
  yield: number;
  settings: {
    feeBasisPoints: number;
    maxSupply: number;
    minCollateralRatio: number;
    mintPaused: boolean;
    redeemPaused: boolean;
  };
}

interface CreateStablecoinParams {
  name: string;
  symbol: string;
  targetCurrency: string;
  initialSupply: number;
  collateralAmount: number;
  priceFeed: PublicKey;
}

export function useStablecoin(stablecoinAddress?: string) {
  const { publicKey } = useWallet();
  const { program, loading: programLoading, error: programError } = useStablecoinProgram() as {
    program: StableFunProgram | null;
    loading: boolean;
    error: string | null;
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStablecoinInfo = useCallback(async (address: string): Promise<StablecoinInfo> => {
    if (!program) throw new Error('Program not initialized');
    
    setLoading(true);
    setError(null);

    try {
      const stablecoinMint = new PublicKey(address);
      const accountInfo = await (program.account as any).stablecoinMint.fetch(stablecoinMint) as StablecoinMint;
      const vaultInfo = await (program.account as any).stablecoinVault.fetch(accountInfo.vault) as StablecoinVault;

      return {
        address,
        name: accountInfo.name,
        symbol: accountInfo.symbol,
        totalSupply: accountInfo.currentSupply.toNumber(),
        collateralAmount: vaultInfo.totalCollateral.toNumber(),
        holders: accountInfo.stats.holderCount,
        price: 1, // TODO: Implement price fetching
        yield: 0, // TODO: Implement yield calculation
        settings: {
          feeBasisPoints: accountInfo.settings.feeBasisPoints,
          maxSupply: accountInfo.settings.maxSupply.toNumber(),
          minCollateralRatio: accountInfo.settings.minCollateralRatio,
          mintPaused: accountInfo.settings.mintPaused,
          redeemPaused: accountInfo.settings.redeemPaused,
        }
      };
    } catch (error) {
      console.error('Error fetching stablecoin info:', error);
      setError('Failed to fetch stablecoin information');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [program]);

  const createStablecoin = useCallback(async (params: CreateStablecoinParams) => {
    if (!program || !publicKey) {
      throw new Error('Program not initialized or wallet not connected');
    }

    setLoading(true);
    setError(null);

    try {
      const tokenMint = anchor.web3.Keypair.generate();
      const stablebondMint = anchor.web3.Keypair.generate();

      const [stablecoinMint] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("stablecoin"),
          publicKey.toBuffer(),
          Buffer.from(params.symbol)
        ],
        program.programId
      );

      const [vault] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), stablecoinMint.toBuffer()],
        program.programId
      );

      const [mintAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from("mint-authority"), stablecoinMint.toBuffer()],
        program.programId
      );

      const tx = await program.methods
        .initialize(
          params.name,
          params.symbol,
          params.targetCurrency,
          new anchor.BN(params.initialSupply),
          new anchor.BN(params.collateralAmount)
        )
        .accounts({
          authority: publicKey,
          stablecoinMint,
          tokenMint: tokenMint.publicKey,
          mintAuthority,
          stablebondMint: stablebondMint.publicKey,
          vault,
          priceFeed: params.priceFeed,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([tokenMint, stablebondMint])
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error creating stablecoin:', error);
      setError(error instanceof Error ? error.message : 'Failed to create stablecoin');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey]);

  const mintTokens = useCallback(async (amount: number) => {
    if (!program || !publicKey || !stablecoinAddress) {
      throw new Error('Invalid parameters');
    }

    setLoading(true);
    setError(null);

    try {
      const stablecoinMint = new PublicKey(stablecoinAddress);
      const [vault] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), stablecoinMint.toBuffer()],
        program.programId
      );

      const [mintAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from("mint-authority"), stablecoinMint.toBuffer()],
        program.programId
      );

      const userTokenAccount = await anchor.utils.token.associatedAddress({
        mint: stablecoinMint,
        owner: publicKey
      });

      const tx = await program.methods
        .mint(new anchor.BN(amount))
        .accounts({
          authority: publicKey,
          stablecoinMint,
          vault,
          userTokenAccount,
          mintAuthority,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error minting tokens:', error);
      setError('Failed to mint tokens');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey, stablecoinAddress]);

  const redeemTokens = useCallback(async (amount: number) => {
    if (!program || !publicKey || !stablecoinAddress) {
      throw new Error('Invalid parameters');
    }

    setLoading(true);
    setError(null);

    try {
      const stablecoinMint = new PublicKey(stablecoinAddress);
      const [vault] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), stablecoinMint.toBuffer()],
        program.programId
      );

      const userTokenAccount = await anchor.utils.token.associatedAddress({
        mint: stablecoinMint,
        owner: publicKey
      });

      const tx = await program.methods
        .redeem(new anchor.BN(amount))
        .accounts({
          authority: publicKey,
          stablecoinMint,
          vault,
          userTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error redeeming tokens:', error);
      setError('Failed to redeem tokens');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey, stablecoinAddress]);

  return {
    loading: loading || programLoading,
    error: error || programError,
    getStablecoinInfo,
    createStablecoin,
    mintTokens,
    redeemTokens,
  };
}

export default useStablecoin;