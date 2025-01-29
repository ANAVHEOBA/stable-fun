'use client';

import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useStablecoin } from '../../../lib/hooks/useStablecoin';
import { PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Info, 
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface FormData {
  name: string;
  symbol: string;
  description: string;
  targetCurrency: string;
  collateralAmount: string;
}

export default function CreateStablecoinPage() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { createStablecoin, loading: stablecoinLoading, error: stablecoinError } = useStablecoin();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionSig, setTransactionSig] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    symbol: '',
    description: '',
    targetCurrency: 'USD',
    collateralAmount: '',
  });

  // Replace the PRICE_FEEDS constant with:
const PRICE_FEEDS = {
  USD: new PublicKey("FmAmfoyPXiA8Vhhe6MZTr3U6rZfEZ1ctEHay1ysqCqcf"),
  // Temporary test addresses (replace with actual price feed addresses)
  EUR: new PublicKey("FmAmfoyPXiA8Vhhe6MZTr3U6rZfEZ1ctEHay1ysqCqcf"), // Using USD feed temporarily
  MXN: new PublicKey("FmAmfoyPXiA8Vhhe6MZTr3U6rZfEZ1ctEHay1ysqCqcf"), // Using USD feed temporarily
  BRL: new PublicKey("FmAmfoyPXiA8Vhhe6MZTr3U6rZfEZ1ctEHay1ysqCqcf"), // Using USD feed temporarily
};

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'MXN', label: 'Mexican Peso (MXN)' },
    { value: 'BRL', label: 'Brazilian Real (BRL)' },
  ];

  // Handle wallet connection state
  if (!publicKey) {
    return (
      <div className="min-h-screen bg-[#121212] p-6 text-center">
        <div className="max-w-4xl mx-auto pt-20">
          <AlertCircle className="h-16 w-16 text-[#E2FF66] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Wallet Not Connected
          </h2>
          <p className="text-gray-400 mb-8">
            Please connect your wallet to create a stablecoin
          </p>
          <WalletMultiButton className="bg-[#E2FF66] hover:bg-[#B3CC4D] text-black px-6 py-3 rounded-lg transition-colors mx-auto" />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const collateralAmount = parseFloat(formData.collateralAmount);
      if (isNaN(collateralAmount) || collateralAmount <= 0) {
        throw new Error('Invalid collateral amount');
      }

      const tx = await createStablecoin({
        name: formData.name,
        symbol: formData.symbol,
        targetCurrency: formData.targetCurrency,
        initialSupply: collateralAmount * 1e9,
        collateralAmount: collateralAmount * 1e9,
        priceFeed: PRICE_FEEDS[formData.targetCurrency],
      });

      setTransactionSig(tx);
      setTimeout(() => router.push('/dashboard'), 3000);
    } catch (err) {
      console.error('Creation error:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/dashboard" 
            className="text-gray-400 hover:text-[#E2FF66] transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-white">
            Create New Stablecoin
          </h1>
        </div>

        {/* Status Indicators */}
        {transactionSig && (
          <div className="mb-4 p-4 bg-green-900/20 border border-green-400/20 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-green-400">
                Success!{' '}
                <a
                  href={`https://explorer.solana.com/tx/${transactionSig}?cluster=devnet`}
                  target="_blank"
                  rel="noopener"
                  className="underline hover:text-green-300"
                >
                  View transaction
                </a>
              </p>
            </div>
          </div>
        )}

        {(error || stablecoinError) && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-400/20 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-400">{error || stablecoinError}</p>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Basic Info', 'Configuration', 'Review'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${step > index + 1 ? 'bg-[#E2FF66] text-black' : 
                    step === index + 1 ? 'border-2 border-[#E2FF66] text-[#E2FF66]' : 
                    'border-2 border-[#2A2A2A] text-gray-400'}
                `}>
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  step === index + 1 ? 'text-[#E2FF66]' : 'text-gray-400'
                }`}>
                  {stepName}
                </span>
                {index < 2 && (
                  <div className={`
                    w-24 h-0.5 mx-4
                    ${step > index + 1 ? 'bg-[#E2FF66]' : 'bg-[#2A2A2A]'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stablecoin Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                      text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent"
                    placeholder="e.g., My USD Stablecoin"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Symbol
                  </label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                    className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                      text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent"
                    placeholder="e.g., USDS"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Configuration */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Currency
                  </label>
                  <select
                    value={formData.targetCurrency}
                    onChange={(e) => setFormData({...formData, targetCurrency: e.target.value})}
                    className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                      text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent"
                    required
                  >
                    {currencies.map((currency) => (
                      <option key={currency.value} value={currency.value}>
                        {currency.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Initial Collateral (in SOL)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.collateralAmount}
                      onChange={(e) => setFormData({...formData, collateralAmount: e.target.value})}
                      className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                        text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent pl-10"
                      placeholder="0.00"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-[#2A2A2A] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Review Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Symbol:</span>
                      <span className="text-white">{formData.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target Currency:</span>
                      <span className="text-white">{formData.targetCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Collateral Amount:</span>
                      <span className="text-white">
                        {formData.collateralAmount} SOL
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-400/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-yellow-400">
                      Important: This action will create a new stablecoin on the Solana blockchain.
                      Double-check all parameters before confirming.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading || stablecoinLoading}
                  className="px-6 py-2.5 border border-[#2A2A2A] text-gray-300 rounded-lg 
                    hover:border-[#E2FF66] hover:text-[#E2FF66] transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
              )}
              
              <button
                type={step === 3 ? 'submit' : 'button'}
                onClick={step === 3 ? undefined : handleNext}
                disabled={loading || stablecoinLoading}
                className={`px-6 py-2.5 rounded-lg transition-colors
                  ${step === 3 
                    ? 'bg-[#E2FF66] text-black hover:bg-[#B3CC4D]' 
                    : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'}
                  ${(loading || stablecoinLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading || stablecoinLoading 
                  ? 'Processing...' 
                  : step === 3 
                    ? 'Confirm Creation' 
                    : 'Next Step'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}