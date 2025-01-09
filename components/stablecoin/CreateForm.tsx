'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useStablecoinProgram } from '@/lib/hooks/useStablecoinProgram';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { 
  Upload, 
  DollarSign, 
  AlertCircle, 
  Info,
  ChevronRight 
} from 'lucide-react';

interface FormData {
  name: string;
  symbol: string;
  description: string;
  collateralAmount: string;
  targetCurrency: string;
}

export function CreateForm() {
  const { publicKey } = useWallet();
  const { program, loading: programLoading, error: programError } = useStablecoinProgram();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    symbol: '',
    description: '',
    collateralAmount: '',
    targetCurrency: 'USD'
  });

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'MXN', label: 'Mexican Peso (MXN)' },
    { value: 'BRL', label: 'Brazilian Real (BRL)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !program) return;

    setLoading(true);
    try {
      const signature = await program.initialize({
        name: formData.name,
        symbol: formData.symbol,
        targetCurrency: formData.targetCurrency,
        initialSupply: Number(formData.collateralAmount)
      });

      console.log("Created stablecoin:", signature);
      // Add success notification here
    } catch (error) {
      console.error("Failed to create stablecoin:", error);
      // Add error notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${step === stepNumber 
                ? 'bg-[#E2FF66] text-black' 
                : step > stepNumber 
                ? 'bg-[#E2FF66] text-black' 
                : 'bg-[#2A2A2A] text-gray-400'}
            `}>
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`
                w-24 h-0.5 mx-2
                ${step > stepNumber ? 'bg-[#E2FF66]' : 'bg-[#2A2A2A]'}
              `} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card title="Basic Information">
          <div className="space-y-4">
            <Input
              label="Stablecoin Name"
              placeholder="e.g., USD Stablecoin"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Symbol"
              placeholder="e.g., USDS"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              required
            />
            <Input
              label="Description"
              placeholder="Describe your stablecoin"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card title="Configuration">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Currency
              </label>
              <select
                value={formData.targetCurrency}
                onChange={(e) => setFormData({ ...formData, targetCurrency: e.target.value })}
                className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                  text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent"
              >
                {currencies.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Initial Collateral Amount"
              type="number"
              placeholder="Enter amount"
              leftIcon={<DollarSign className="h-4 w-4" />}
              value={formData.collateralAmount}
              onChange={(e) => setFormData({ ...formData, collateralAmount: e.target.value })}
              required
            />
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card title="Review & Create">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Symbol</p>
                <p className="text-white">{formData.symbol}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Target Currency</p>
                <p className="text-white">{formData.targetCurrency}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Initial Collateral</p>
                <p className="text-white">${formData.collateralAmount}</p>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-400/20 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-400">
                    Please review all information carefully. Once created, some parameters 
                    cannot be modified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <Button 
          type="submit"
          isLoading={loading || programLoading}
          disabled={!publicKey || !program}
        >
          Create Stablecoin
        </Button>
        )}
        
        <Button
          type={step === 3 ? 'submit' : 'button'}
          onClick={() => step < 3 && setStep(step + 1)}
          isLoading={loading}
          rightIcon={step < 3 ? <ChevronRight className="h-4 w-4" /> : undefined}
        >
          {step === 3 ? 'Create Stablecoin' : 'Next'}
        </Button>
      </div>
    </form>
  );
}