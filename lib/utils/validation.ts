/**
 * Validation utilities for forms and input
 */

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidAddress = (address: string): boolean => {
    // Basic Solana address validation
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  };
  
  export const validateStablecoinInput = (input: {
    name?: string;
    symbol?: string;
    description?: string;
    collateralAmount?: string;
  }) => {
    const errors: Record<string, string> = {};
  
    if (!input.name?.trim()) {
      errors.name = 'Name is required';
    } else if (input.name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
  
    if (!input.symbol?.trim()) {
      errors.symbol = 'Symbol is required';
    } else if (!/^[A-Z0-9]{2,8}$/.test(input.symbol)) {
      errors.symbol = 'Symbol must be 2-8 uppercase letters/numbers';
    }
  
    if (!input.description?.trim()) {
      errors.description = 'Description is required';
    }
  
    if (!input.collateralAmount) {
      errors.collateralAmount = 'Collateral amount is required';
    } else if (isNaN(Number(input.collateralAmount)) || Number(input.collateralAmount) <= 0) {
      errors.collateralAmount = 'Invalid collateral amount';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  
  export const validateAmount = (amount: string, options?: {
    min?: number;
    max?: number;
    decimals?: number;
  }) => {
    const { min = 0, max, decimals } = options || {};
    const num = Number(amount);
  
    if (isNaN(num)) {
      return 'Invalid amount';
    }
  
    if (num < min) {
      return `Amount must be at least ${min}`;
    }
  
    if (max !== undefined && num > max) {
      return `Amount must be less than ${max}`;
    }
  
    if (decimals !== undefined) {
      const [, fraction] = amount.split('.');
      if (fraction && fraction.length > decimals) {
        return `Amount cannot have more than ${decimals} decimal places`;
      }
    }
  
    return null;
  };