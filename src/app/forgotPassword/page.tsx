'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { HiOutlineLightningBolt } from 'react-icons/hi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center text-blue-600 text-2xl font-medium">
            <img src={'./Logo.png'} className='w-10'/>
            Quickbeams
          </div>
        </div>

        {!isSubmitted ? (
          <div>
            <h2 className="text-2xl font-medium text-gray-800 text-center mb-4">Forgot Password?</h2>
            <p className="text-center text-gray-600 mb-8">
              Enter your user account's verified email address and we will send you a password reset link.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Email ID"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
              
              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-full px-8 py-3"
                  isLoading={isLoading}
                  disabled={!email}
                >
                  Send Link
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-8">
              We've sent a password reset link to {email}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false)
                window.location.href = '/signIn'
            
            }}
              className="rounded-full px-6 py-3"
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}