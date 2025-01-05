'use client';

import { useState } from 'react';
import { 
  User, 
  Wallet, 
  Bell, 
  Shield, 
  Key, 
  Moon, 
  Sun,
  ChevronRight,
  ExternalLink,
  Copy
} from 'lucide-react';

interface ProfileSettings {
  notifications: {
    email: boolean;
    push: boolean;
    transactions: boolean;
  };
  theme: 'light' | 'dark';
  currency: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'preferences'>('general');
  const [settings, setSettings] = useState<ProfileSettings>({
    notifications: {
      email: true,
      push: true,
      transactions: true
    },
    theme: 'dark',
    currency: 'USD'
  });

  // Simulated wallet data
  const walletAddress = '0x1234...5678';
  const connectedWallets = [
    { name: 'Phantom', address: '0x1234...5678', primary: true },
    { name: 'Solflare', address: '0x9876...4321', primary: false }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#2A2A2A]">
            {[
              { id: 'general', label: 'General', icon: User },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'preferences', label: 'Preferences', icon: Bell }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200
                  ${activeTab === tab.id 
                    ? 'text-[#E2FF66] border-b-2 border-[#E2FF66]' 
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                {/* Profile Section */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                          text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent"
                        placeholder="Your display name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2.5 
                          text-white focus:ring-2 focus:ring-[#E2FF66] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Connected Wallets */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Connected Wallets</h3>
                  <div className="space-y-4">
                    {connectedWallets.map((wallet) => (
                      <div 
                        key={wallet.address}
                        className="bg-[#2A2A2A] rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Wallet className="h-5 w-5 text-[#E2FF66] mr-3" />
                          <div>
                            <p className="text-white font-medium">{wallet.name}</p>
                            <p className="text-sm text-gray-400">{wallet.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {wallet.primary && (
                            <span className="text-xs bg-[#E2FF66]/10 text-[#E2FF66] px-2 py-1 rounded">
                              Primary
                            </span>
                          )}
                          <button 
                            onClick={() => copyToClipboard(wallet.address)}
                            className="text-gray-400 hover:text-[#E2FF66] transition-colors duration-200"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full bg-[#2A2A2A] text-[#E2FF66] rounded-lg py-3 
                      hover:bg-[#3A3A3A] transition-colors duration-200">
                      Connect Another Wallet
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Security Settings */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="bg-[#2A2A2A] rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Key className="h-5 w-5 text-[#E2FF66] mr-3" />
                          <div>
                            <p className="text-white font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-400">Add an extra layer of security</p>
                          </div>
                        </div>
                        <button className="text-[#E2FF66] text-sm">Enable</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div 
                        key={key}
                        className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
                      >
                        <div>
                          <p className="text-white font-medium capitalize">{key} Notifications</p>
                          <p className="text-sm text-gray-400">
                            Receive {key} notifications about your activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => {
                              setSettings({
                                ...settings,
                                notifications: {
                                  ...settings.notifications,
                                  [key]: !value
                                }
                              });
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#121212] peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E2FF66]">
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theme Preference */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Display Settings</h3>
                  <div className="bg-[#2A2A2A] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {settings.theme === 'dark' ? (
                          <Moon className="h-5 w-5 text-[#E2FF66] mr-3" />
                        ) : (
                          <Sun className="h-5 w-5 text-[#E2FF66] mr-3" />
                        )}
                        <div>
                          <p className="text-white font-medium">Theme</p>
                          <p className="text-sm text-gray-400">
                            {settings.theme === 'dark' ? 'Dark' : 'Light'} mode
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSettings({
                          ...settings,
                          theme: settings.theme === 'dark' ? 'light' : 'dark'
                        })}
                        className="text-[#E2FF66] text-sm"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2.5 bg-[#E2FF66] text-black rounded-lg 
            hover:bg-[#B3CC4D] transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}