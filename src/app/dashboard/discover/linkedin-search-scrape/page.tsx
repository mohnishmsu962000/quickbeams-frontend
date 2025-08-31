'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function LinkedInSearchScrapePage() {
  const [activeTab, setActiveTab] = useState('quick-look');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Discover', href: '/dashboard/discover' },
    { label: 'LinkedIn Search Scrape' }
  ];

  return (
    <div className="py-6 space-y-6 pr-12">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <div className="bg-blue-600 rounded-[40px] p-8 text-white min-h-[400px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-medium mb-6">LinkedIn Search Scrape</h1>
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-fit">
              Initiate
            </Button>
          </div>
          
          <div className="bg-white/20 rounded-[20px] p-4 w-[600px] h-[350px]">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="LinkedIn Search Scrape Demo"
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
              <p>Extract comprehensive LinkedIn search results: Automatically scrape profile data from LinkedIn search queries with advanced filtering options.</p>
              <p>Build targeted prospect databases: Create detailed lists of potential customers, partners, or candidates based on specific criteria like industry, location, job title, and company size.</p>
              <p>Export enriched contact data: Get additional contact information including email addresses, phone numbers, and social media profiles where available.</p>
              <p>Scale your outreach efforts: Process hundreds of profiles in minutes instead of manually copying data for hours.</p>
              <p>Perfect for recruiters, sales development representatives, and business development teams who need to build comprehensive prospect lists quickly and efficiently.</p>
              <p>Advanced filtering allows you to target specific demographics, industries, and job functions to ensure you're reaching the most relevant audience for your business needs.</p>
              <p>Export data in multiple formats including CSV, Excel, and integrate directly with your CRM or email marketing tools.</p>
            </div>
          </div>
        )}
        {activeTab === 'walkthrough' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-gray-800">Step-by-step Walkthrough</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Define Search Criteria</h3>
                <p className="text-gray-600">Set up your search parameters including keywords, job titles, industries, locations, and company filters. Use LinkedIn's advanced search features to narrow down your target audience.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Configure Data Fields</h3>
                <p className="text-gray-600">Choose which profile information to extract: name, job title, company, location, education, experience, and contact details where available.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Set Extraction Limits</h3>
                <p className="text-gray-600">Configure how many profiles to scrape per session and set time delays between requests to maintain LinkedIn compliance and avoid rate limiting.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 4: Data Enrichment Options</h3>
                <p className="text-gray-600">Enable additional data sources to enrich profiles with email addresses, phone numbers, and social media profiles from external databases.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 5: Export and Integration</h3>
                <p className="text-gray-600">Download your scraped data in your preferred format or integrate directly with popular CRM systems, email marketing platforms, and sales tools.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}