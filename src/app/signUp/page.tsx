'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FaGoogle, FaApple, FaLinkedin } from 'react-icons/fa';

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    workspaceName: '',
    workspaceUrl: '',
    teamMembers: ['', '', '']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => i === index ? value : member)
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      handleNext();
    } else if (currentStep === 5) {
      setIsLoading(true);
      try {
        await signUp(formData.email, formData.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to sign up');
      } finally {
        setIsLoading(false);
      }
    } else {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Promotional Content */}
      <div className="w-1/2 bg-blue-600 p-12 flex items-center relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-md">
          <blockquote className="text-white text-2xl font-medium leading-relaxed">
            {currentStep <= 2 && "Automate your outreach and save up to 30% of your time for high-value tasks. Efficiency starts here!"}
            {currentStep === 3 && "Automate your outreach and save up to 30% of your time for high-value tasks. Efficiency starts here!"}
            {(currentStep === 4 || currentStep === 5) && "Quickbeams allows multiple workspaces for a single organization to manage different teams and projects"}
          </blockquote>
          {currentStep === 5 && (
            <p className="text-white text-sm mt-4 opacity-75">
              (Or add some workspace screenshot here)
            </p>
          )}
        </div>
      </div>

      {/* Right Panel - Form Content */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center text-blue-600 text-2xl font-medium">
              <img src={'/Logo.png'} className='w-10'/>
              Quickbeams
            </div>
          </div>

          {/* Step 1: Initial Signup */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">Create a New Account</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 text-center">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                  </div>
                )}
                
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12"
                  required
                />
                
                <Input
                  placeholder="Email ID"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12"
                  required
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-full px-6 py-3"
                  disabled={!formData.email || !formData.name}
                >
                  Sign Up
                </Button>
              </form>
              
              <div className="text-center mt-6 ">
                <p className="text-sm text-gray-600 mb-4">
                  Have existing account?{' '}
                  <a href="/signIn" className="text-blue-600 hover:underline">
                    Sign In
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
              
              <p className="text-xs text-center text-gray-500 mt-6">
                By creating an account you agree to the{' '}
                <a href="#" className="text-gray-800 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-gray-800 hover:underline">Privacy policy</a>
              </p>
            </div>
          )}

          {/* Step 2: Email Verification */}
          {currentStep === 2 && (
            <div className="text-center">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">Verify</h2>
              <p className="text-gray-600 mb-8">
                A verification link has been sent to {formData.email}.<br />
                Please verify by clicking the link in the email.
              </p>
              <Button
                variant="primary"
                className="rounded-full px-6 py-3"
                onClick={handleNext}
              >
                Resend Verification Link
              </Button>
              
              <div className="mt-8">
                <Button
                  variant="secondary"
                  onClick={handleNext}
                  className="text-sm px-4 py-2"
                >
                  Continue (Skip verification for demo)
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Password Creation */}
          {currentStep === 3 && (
            <div className='text-center'>
              <div className="text-center mb-4">
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm mb-6">
                  Your email has been verified!
                </div>
              </div>
              
              <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">Generate Password</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="New Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-12"
                  required
                />
                
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="h-12"
                  required
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-full px-6 py-3"
                  disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                >
                  Continue
                </Button>
              </form>
            </div>
          )}

          {/* Step 4: Workspace Creation */}
          {currentStep === 4 && (
            <div className='text-center'>
              <h2 className="text-2xl font-medium text-gray-800 text-center mb-4">Create Your First Workspace</h2>
              <p className="text-gray-600 text-center mb-8">
                Workspaces are like different Quickbeam accounts for different teams in your organization.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Workspace name"
                  value={formData.workspaceName}
                  onChange={(e) => handleInputChange('workspaceName', e.target.value)}
                  className="h-12"
                  required
                />
                
                
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-full px-6 py-3"
                  disabled={!formData.workspaceName}
                >
                  Create Workspace
                </Button>
              </form>
            </div>
          )}

          {/* Step 5: Team Member Invitations */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-medium text-gray-800 text-center mb-4">Add Your Team Members</h2>
              <p className="text-gray-600 text-center mb-8">
                Your team members will get an email and they will get added to the workspace as soon as they sign up.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {formData.teamMembers.map((member, index) => (
                  <Input
                    key={index}
                    placeholder="Add member email ID"
                    type="email"
                    value={member}
                    onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                    className="h-12"
                  />
                ))}
                
                <div className="flex space-x-4 pt-4 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSubmit}
                    className="px-6 py-3"
                  >
                    Skip
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="rounded-full px-6 py-3"
                    isLoading={isLoading}
                  >
                    Enter Workspace
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}