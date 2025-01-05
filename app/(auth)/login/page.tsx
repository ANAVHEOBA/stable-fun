'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#E2FF66]">Stable.fun</h2>
          <p className="mt-2 text-gray-400">Create your own stablecoins</p>
        </div>

        {/* Main Card */}
        <div className="bg-[#1A1A1A] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#2A2A2A]">
          {/* Connect Wallet Button */}
          <button
            onClick={() => {/* Wallet connection logic */}}
            className="w-full flex justify-center py-3 px-4 border border-[#E2FF66] 
              rounded-md shadow-sm text-[#E2FF66] bg-transparent hover:bg-[#E2FF66] 
              hover:text-black transition-all duration-200 text-sm font-medium 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E2FF66]"
          >
            Connect Wallet
          </button>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2A2A2A]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1A1A1A] text-gray-400">
                  or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Email Login Form */}
          <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-[#2A2A2A] 
                    rounded-md shadow-sm bg-[#121212] text-gray-300 
                    focus:outline-none focus:ring-[#E2FF66] focus:border-[#E2FF66]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-[#2A2A2A] 
                    rounded-md shadow-sm bg-[#121212] text-gray-300 
                    focus:outline-none focus:ring-[#E2FF66] focus:border-[#E2FF66]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-[#2A2A2A] rounded bg-[#121212] 
                    focus:ring-[#E2FF66] text-[#E2FF66]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#E2FF66] hover:text-[#B3CC4D]">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-black bg-[#E2FF66] 
                  hover:bg-[#B3CC4D] focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-[#E2FF66] transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-[#E2FF66] hover:text-[#B3CC4D]">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}