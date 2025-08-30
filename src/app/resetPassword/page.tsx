'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { HiOutlineLightningBolt } from 'react-icons/hi';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center text-blue-600 text-2xl font-medium">
            <img src={'./logo.png'} className='w-10'/>
            Quickbeams
          </div>
        </div>

        {!isSuccess ? (
          <div>
            <h2 className="text-2xl font-medium text-gray-800 text-center mb-4">Reset Your Password</h2>
            <p className="text-center text-gray-600 mb-8">
              Please enter your new password in the link below!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}
              
              <Input
                placeholder="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
              
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12"
                required
              />
              
              <div className="text-center pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-full px-8 py-3"
                  isLoading={isLoading}
                  disabled={!password || !confirmPassword}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Password Updated!</h2>
            <p className="text-gray-600 mb-8">
              Your password has been successfully updated.
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/signIn'}
              className="rounded-full px-6 py-3"
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}