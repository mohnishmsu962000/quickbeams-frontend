'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function LinkedInAutoConnectPage() {
  const [activeTab, setActiveTab] = useState('quick-look');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Discover', href: '/dashboard/discover' },
    { label: 'LinkedIn Auto-connect' }
  ];

  return (
    <div className="py-6 space-y-6 pr-12">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <div className="bg-blue-600 rounded-[40px] p-8 text-white min-h-[400px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-medium mb-6">LinkedIn Auto-connect</h1>
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-fit">
              Initiate
            </Button>
          </div>
          
          <div className="bg-white/20 rounded-[20px] p-4 w-[600px] h-[350px]">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="LinkedIn Auto-connect Demo"
              className="w-full h-full rounded-[12px]"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-6">
        {[
          { id: 'quick-look', label: 'Quick Look' },
          { id: 'walkthrough', label: 'Walkthrough' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-[20px] font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'quick-look' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-gray-800">Why you should use this flow?</h2>
            <div className="space-y-4 text-gray-600">
              <p>Scrape LinkedIn company page posts: Quickly grab data from posts published on a company's LinkedIn page.</p>
              <p>Pick up strong intent signals: Build a database of profiles of users who have liked, or commented on a company's page post.</p>
              <p>Analyze competitors: Gain insights into the engagement patterns and audience of your competitors.</p>
              <p>Daily re-run with smart detection to find most engaged posts and automatically connect with users showing high intent signals for your business.</p>
              <p>Perfect for sales teams, marketing professionals, and business development representatives looking to identify and connect with prospects who are already showing interest in similar companies or solutions.</p>
              <p>This automation saves hours of manual prospecting and ensures you're connecting with the most relevant and engaged audience on LinkedIn.</p>
            </div>
          </div>
        )}
        {activeTab === 'walkthrough' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-gray-800">Step-by-step Walkthrough</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Setup Your LinkedIn Account</h3>
                <p className="text-gray-600">Connect your LinkedIn account securely to QuickBeams. We use industry-standard OAuth to ensure your credentials remain safe.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Choose Target Company</h3>
                <p className="text-gray-600">Select the company whose LinkedIn page posts you want to monitor. You can add multiple companies to track different industries or competitors.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Configure Connection Message</h3>
                <p className="text-gray-600">Create personalized connection messages that will be sent to engaged users. Use variables to customize messages based on the post they engaged with.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 4: Set Frequency & Limits</h3>
                <p className="text-gray-600">Configure how often the automation runs and set daily connection limits to maintain natural engagement patterns and avoid LinkedIn restrictions.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 5: Launch & Monitor</h3>
                <p className="text-gray-600">Activate your automation and monitor performance through our analytics dashboard. Track acceptance rates, response rates, and optimize your strategy.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}