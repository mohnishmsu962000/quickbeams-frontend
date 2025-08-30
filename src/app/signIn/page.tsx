'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { FaGoogle, FaApple, FaLinkedin } from 'react-icons/fa';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Product Screenshot */}
      <div className="w-1/2 bg-gray-200 flex items-center justify-center relative">
        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-blue-600"></div>
        <div className="text-center z-10">
          <h2 className="text-4xl font-medium text-gray-800 mb-4">Product</h2>
          <h2 className="text-4xl font-medium text-gray-800">Snapshot</h2>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center text-blue-600 text-2xl font-medium">
                <img src={'./Logo.png'} className='w-10'/>
              Quickbeams
            </div>
          </div>

          <h2 className="text-2xl font-medium text-gray-800 text-center mb-4">Sign-in to Your Account</h2>
          <p className="text-center text-gray-600 mb-8">
            Welcome back! Your solution for affordable and predictable marketing is waiting for your return
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}
            
            <Input
              placeholder="Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
            
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
            
            <div className="text-right">
              <a href="/forgotPassword" className="text-sm text-blue-600 hover:underline">
                Forgot password? Reset here
              </a>
            </div>
            
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                className="rounded-full px-6 py-3"
                isLoading={isLoading}
                disabled={!email || !password}
              >
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-4">
              Don't have an account?{' '}
              <a href="/signUp" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
            
            <div className="flex justify-center space-x-4">
              <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <FaGoogle className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <FaApple className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <FaLinkedin className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}