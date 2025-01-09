/**
 * Format utilities for numbers, addresses, and dates
 */

export const formatNumber = (num: number, options?: {
    decimals?: number;
    prefix?: string;
    suffix?: string;
    compact?: boolean;
  }) => {
    const {
      decimals = 2,
      prefix = '',
      suffix = '',
      compact = false,
    } = options || {};
  
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        notation: compact ? 'compact' : 'standard',
      });
  
      return `${prefix}${formatter.format(num)}${suffix}`;
    } catch (error) {
      console.error('Error formatting number:', error);
      return `${prefix}${num}${suffix}`;
    }
  };
  
  export const formatCurrency = (amount: number, currency = 'USD') => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `${currency} ${amount}`;
    }
  };
  
  export const formatPercentage = (value: number, decimals = 2) => {
    try {
      return `${value.toFixed(decimals)}%`;
    } catch (error) {
      console.error('Error formatting percentage:', error);
      return `${value}%`;
    }
  };
  
  export const shortenAddress = (address: string, chars = 4) => {
    if (!address) return '';
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  };
  
  export const formatDate = (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => {
    try {
      const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        ...options,
      };
  
      return new Intl.DateTimeFormat('en-US', defaultOptions).format(
        typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
      );
    } catch (error) {
      console.error('Error formatting date:', error);
      return String(date);
    }
  };
  
  export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  };


  export const cn = (...classes: (string | undefined | boolean)[]) => {
    return classes.filter(Boolean).join(' ');
  };