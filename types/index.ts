import { PublicKey } from '@solana/web3.js';

// Auth Types
export interface User {
  id: string;
  address: string;
  username?: string;
  avatar?: string;
  createdAt: Date;
}

// Wallet Types
export interface WalletInfo {
  address: string;
  balance: {
    sol: number;
    usd: number;
  };
  transactions: Transaction[];
}

// Stablecoin Types
export interface Stablecoin {
  id: string;
  address: PublicKey;
  name: string;
  symbol: string;
  description: string;
  creator: PublicKey;
  targetCurrency: string;
  collateralAmount: number;
  totalSupply: number;
  holders: number;
  price: number;
  yield: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StablecoinStats {
  volume24h: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  holders: number;
  transactions24h: number;
}

// Transaction Types
export interface Transaction {
  id: string;
  hash: string;
  type: 'mint' | 'burn' | 'transfer';
  amount: number;
  from: string;
  to: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

// Form Types
export interface CreateStablecoinForm {
  name: string;
  symbol: string;
  description: string;
  targetCurrency: string;
  collateralAmount: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

// Theme Types
export type Theme = 'light' | 'dark';

// Settings Types
export interface UserSettings {
  theme: Theme;
  notifications: {
    email: boolean;
    push: boolean;
    transactions: boolean;
  };
  currency: string;
}

// Chart Data Types
export interface ChartData {
  timestamp: number;
  value: number;
}

export interface ChartDataset {
  label: string;
  data: ChartData[];
  color: string;
}

// Error Types
export interface AppError extends Error {
  code?: string;
  details?: unknown;
}