import * as anchor from "@coral-xyz/anchor";
import { IdlType } from "@coral-xyz/anchor/dist/cjs/idl";
import idl from './idl.json';

// Helper function to convert type to IdlType
function convertToIdlType(type: any): IdlType {
  if (typeof type === 'string') {
    return type as IdlType;
  }
  if (type.array) {
    return {
      array: [convertToIdlType(type.array[0]), type.array[1]]
    };
  }
  if (type.defined) {
    return {
      defined: type.defined
    };
  }
  return type;
}

// Export the IDL with proper Anchor typing
export const IDL: anchor.Idl = {
  address: idl.address,
  metadata: {
    name: idl.metadata.name,
    version: idl.metadata.version,
    spec: idl.metadata.spec,
  },
  instructions: idl.instructions.map(ix => ({
    name: ix.name,
    discriminator: ix.discriminator,
    accounts: ix.accounts.map(acc => ({
      name: acc.name,
      isMut: acc.writable || false,
      isSigner: acc.signer || false,
    })),
    args: ix.args.map(arg => ({
      name: arg.name,
      type: convertToIdlType(arg.type)
    })),
  })),
  accounts: idl.accounts.map(acc => ({
    name: acc.name,
    discriminator: acc.discriminator,
    type: {
      kind: 'struct' as const,
      fields: idl.types
        .find(t => t.name === acc.name)?.type.fields?.map(f => ({
          name: f.name,
          type: convertToIdlType(f.type)
        })) || []
    },
  })),
  types: idl.types.map(t => ({
    name: t.name,
    type: {
      kind: t.type.kind as 'struct',
      fields: t.type.fields?.map(f => ({
        name: f.name,
        type: convertToIdlType(f.type)
      })) || []
    }
  })),
  errors: idl.errors.map(err => ({
    code: err.code,
    name: err.name,
    msg: err.msg,
  })),
  events: idl.events.map(event => ({
    name: event.name,
    discriminator: event.discriminator,
  })),
};

// Rest of the interfaces remain unchanged
export interface StablecoinSettings {
  feeBasisPoints: number;
  maxSupply: anchor.BN;
  minCollateralRatio: number;
  mintPaused: boolean;
  redeemPaused: boolean;
}

export interface StablecoinStats {
  totalMinted: anchor.BN;
  totalBurned: anchor.BN;
  totalFees: anchor.BN;
  holderCount: number;
}

export interface StablecoinMint {
  authority: anchor.web3.PublicKey;
  name: string;
  symbol: string;
  targetCurrency: string;
  tokenMint: anchor.web3.PublicKey;
  stablebondMint: anchor.web3.PublicKey;
  priceFeed: anchor.web3.PublicKey;
  vault: anchor.web3.PublicKey;
  currentSupply: anchor.BN;
  settings: StablecoinSettings;
  stats: StablecoinStats;
  createdAt: anchor.BN;
  lastUpdated: anchor.BN;
}

export interface StablecoinVault {
  stablecoinMint: anchor.web3.PublicKey;
  authority: anchor.web3.PublicKey;
  collateralAccount: anchor.web3.PublicKey;
  totalCollateral: anchor.BN;
  totalValueLocked: anchor.BN;
  currentRatio: number;
  lastDepositTime: anchor.BN;
  lastWithdrawalTime: anchor.BN;
  depositCount: number;
  withdrawalCount: number;
  bump: number;
}

export interface StableFunAccounts {
  stablecoinMint: StablecoinMint;
  stablecoinVault: StablecoinVault;
}

export type StableFunProgram = anchor.Program<typeof IDL> & {
  account: StableFunAccounts;
};