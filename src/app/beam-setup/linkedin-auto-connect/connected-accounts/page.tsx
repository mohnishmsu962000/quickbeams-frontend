'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { FaLinkedin, FaCheck, FaTimes } from 'react-icons/fa';

export default function ConnectedAccountsPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);

  const handleConnectLinkedIn = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setConnectedAccount({
        name: 'John Doe',
        email: 'john.doe@company.com',
        profileImage: null
      });
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectedAccount(null);
  };

  if (!isConnected) {
    // Show connect state
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
          <FaLinkedin className="w-10 h-10 text-blue-600" />
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Connect Your LinkedIn Account</h1>
          <p className="text-gray-600">Connect your LinkedIn account to start automating your outreach</p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleConnectLinkedIn}
          isLoading={isConnecting}
          className="px-8 py-4 rounded-2xl text-lg font-medium"
        >
          <FaLinkedin className="w-5 h-5 mr-3" />
          {isConnecting ? 'Connecting...' : 'Connect to LinkedIn'}
        </Button>

        <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
          <h3 className="font-semibold text-blue-900 mb-2">Secure & Safe</h3>
          <p className="text-sm text-blue-700">
            We use OAuth 2.0 for secure authentication. We never store your password and you can revoke access anytime.
          </p>
        </div>
      </div>
    );
  }

  // Show connected state
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto relative">
        <FaLinkedin className="w-10 h-10 text-blue-600" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <FaCheck className="w-3 h-3 text-white" />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">LinkedIn Connected</h1>
        <p className="text-green-600 font-medium">Your account is successfully connected</p>
      </div>

      {/* Connected Account Card */}
      <div className="bg-gray-50 rounded-2xl p-6 max-w-sm mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaLinkedin className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left flex-1">
            <h3 className="font-semibold text-gray-900">{connectedAccount?.name}</h3>
            <p className="text-sm text-gray-600">{connectedAccount?.email}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaCheck className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">Active</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="md"
          onClick={handleDisconnect}
          className="px-6 py-3 rounded-2xl border-red-200 text-red-600 hover:bg-red-50"
        >
          <FaTimes className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
        
        <Button
          variant="primary"
          size="md"
          className="px-6 py-3 rounded-2xl"
        >
          Test Connection
        </Button>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-2xl">
        <p className="text-sm text-green-700">
          Great! Your LinkedIn account is ready. You can now proceed to configure your data source.
        </p>
      </div>
    </div>
  );
}