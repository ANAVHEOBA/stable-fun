import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable.fun - Create Your Own Stablecoins",
  description: "Create and manage your own stablecoins backed by yield-bearing stablebonds",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wallet Provider would go here */}
        <div className="min-h-screen bg-[#121212]">
          {children}
        </div>

        {/* Toast Container would go here */}
      </body>
    </html>
  );
}