import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { IDL } from "./idl";

export const PROGRAM_ID = new PublicKey("8At1GLJvdVcY6LM7iPax9ShRAtAwKw41R87dd2MpnqHQ");

export class StablecoinProgram {
  program: Program;
  provider: anchor.AnchorProvider;

  constructor(provider: anchor.AnchorProvider) {
    this.provider = provider;
    if (!this.provider.wallet) {
      throw new Error("Provider wallet is not initialized");
    }
    this.program = new Program(IDL, PROGRAM_ID, provider);
  }

  async initialize(params: {
    name: string;
    symbol: string;
    targetCurrency: string;
    initialSupply: number;
  }) {
    return this.program.methods
      .initialize(
        params.name,
        params.symbol,
        params.targetCurrency,
        new anchor.BN(params.initialSupply)
      )
      .accounts({
        authority: this.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  }

  async mint(amount: number) {
    return this.program.methods
      .mint(new anchor.BN(amount))
      .accounts({
        authority: this.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  }
}