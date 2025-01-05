import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#E2FF66',
          light: '#EBFF99',
          dark: '#B3CC4D',
        },
        // Background Colors
        background: {
          DEFAULT: '#121212',
          light: '#1A1A1A',
          dark: '#0A0A0A',
          card: '#1A1A1A',
        },
        // Border Colors
        border: {
          DEFAULT: '#2A2A2A',
          light: '#3A3A3A',
          dark: '#1A1A1A',
        },
        // Text Colors
        content: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          tertiary: '#666666',
        },
        // Status Colors
        success: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C',
        },
        warning: {
          DEFAULT: '#FFA726',
          light: '#FFB74D',
          dark: '#F57C00',
        },
        error: {
          DEFAULT: '#F44336',
          light: '#E57373',
          dark: '#D32F2F',
        },
        info: {
          DEFAULT: '#2196F3',
          light: '#64B5F6',
          dark: '#1976D2',
        },
      },
    },
  },
  plugins: [],
};

export default config;