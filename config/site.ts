export const siteConfig = {
    name: 'Stable.fun',
    description: 'Create and manage your own stablecoins with ease',
    url: 'https://stable.fun',
    ogImage: 'https://stable.fun/og.jpg',
    links: {
      twitter: 'https://twitter.com/stablefun',
      github: 'https://github.com/stablefun',
      discord: 'https://discord.gg/stablefun',
    },
    creator: {
      name: 'Etherfuse',
      url: 'https://etherfuse.com',
    },
  } as const;
  
  export const navConfig = {
    mainNav: [
      {
        name: 'Dashboard',
        href: '/dashboard',
      },
      {
        name: 'Create',
        href: '/stablecoins/create',
      },
      {
        name: 'Explore',
        href: '/explore',
      },
    ],
    userNav: [
      {
        name: 'Profile',
        href: '/profile',
      },
      {
        name: 'Settings',
        href: '/settings',
      },
    ],
  } as const;
  
  export const apiConfig = {
    endpoints: {
      mainnet: 'https://api.mainnet-beta.solana.com',
      devnet: 'https://api.devnet.solana.com',
    },
    rpcTimeout: 30000,
    commitment: 'confirmed',
  } as const;
  
  export const tokenConfig = {
    decimals: 6,
    minCollateralAmount: 100,
    maxCollateralAmount: 1000000,
    supportedCurrencies: [
      {
        symbol: 'USD',
        name: 'US Dollar',
        icon: '/icons/usd.svg',
      },
      {
        symbol: 'EUR',
        name: 'Euro',
        icon: '/icons/eur.svg',
      },
      {
        symbol: 'MXN',
        name: 'Mexican Peso',
        icon: '/icons/mxn.svg',
      },
      {
        symbol: 'BRL',
        name: 'Brazilian Real',
        icon: '/icons/brl.svg',
      },
    ],
  } as const;
  
  export const themeConfig = {
    colors: {
      primary: '#E2FF66',
      background: '#121212',
      card: '#1A1A1A',
      border: '#2A2A2A',
      text: {
        primary: '#FFFFFF',
        secondary: '#A0A0A0',
      },
    },
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
    },
  } as const;
  
  export const analyticsConfig = {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    mixpanel: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  } as const;