'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Info, 
  DollarSign,
  AlertCircle
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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    symbol: '',
    description: '',
    targetCurrency: 'USD',
    collateralAmount: '',
  });

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'MXN', label: 'Mexican Peso (MXN)' },
    { value: 'BRL', label: 'Brazilian Real (BRL)' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your stablecoin creation logic here
      console.log('Creating stablecoin:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error creating stablecoin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            href="/dashboard" 
            className="text-gray-400 hover:text-[#E2FF66] transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-white">
            Create New Stablecoin
          </h1>
        </div>

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
            {step === 1 && (
              <div className="space-y-6">
                {/* Basic Info Fields */}
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg bg-[#2A2A2A] flex items-center justify-center">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Token icon" 
                          className="w-full h-full rounded-lg object-cover"
                        />
                      ) : (
                        <Upload className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <label className="cursor-pointer">
                      <span className="bg-[#2A2A2A] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#3A3A3A] transition-colors duration-200">
                        Upload Icon
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Configuration Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Currency
                  </label>
                  <select
                    value={formData.targetCurrency}
                    onChange={(e) => setFormData({...formData, targetCurrency: e.target.value})}
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

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Initial Collateral Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.collateralAmount}
                      onChange={(e) => setFormData({...formData, collateralAmount: e.target.value})}
                      className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                        text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent pl-10"
                      placeholder="0.00"
                    />
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-[#2A2A2A] rounded-lg p-4 flex items-start space-x-3">
                  <Info className="h-5 w-5 text-[#E2FF66] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    The initial collateral amount will be used to mint your first batch of stablecoins. 
                    Make sure you have sufficient funds in your wallet.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Review Information */}
                <div className="bg-[#2A2A2A] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Review Information</h3>
                  
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
                      <span className="text-gray-400">Initial Collateral:</span>
                      <span className="text-white">${formData.collateralAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Warning Box */}
                <div className="bg-yellow-900/20 border border-yellow-400/20 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-400">
                    Please review all information carefully. Once created, some parameters cannot be modified.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2.5 border border-[#2A2A2A] text-gray-300 rounded-lg 
                    hover:border-[#E2FF66] hover:text-[#E2FF66] transition-colors duration-200"
                >
                  Previous
                </button>
              )}
              
              <button
                type={step === 3 ? 'submit' : 'button'}
                onClick={() => step < 3 && setStep(step + 1)}
                disabled={loading}
                className={`px-6 py-2.5 rounded-lg transition-colors duration-200
                  ${step === 3 
                    ? 'bg-[#E2FF66] text-black hover:bg-[#B3CC4D]' 
                    : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'}
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Creating...' : step === 3 ? 'Create Stablecoin' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}