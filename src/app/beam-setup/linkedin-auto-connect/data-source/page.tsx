'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FaLinkedin, FaUpload, FaSearch, FaFileAlt } from 'react-icons/fa';

type DataSourceType = 'search-url' | 'csv-upload' | 'sales-navigator';

export default function DataSourcePage() {
  const [selectedSource, setSelectedSource] = useState<DataSourceType>('search-url');
  const [searchUrl, setSearchUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const sourceTags = [
    { id: 'search-url', label: 'Search URL', icon: FaSearch },
    { id: 'csv-upload', label: 'CSV Upload', icon: FaUpload },
    { id: 'sales-navigator', label: 'Sales Navigator', icon: FaLinkedin }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaLinkedin className="w-5 h-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Select Data Source</h1>
        <p className="text-gray-600">Choose where to find your target connections</p>
      </div>

      {/* Source Selection Tags - Horizontal Scroll like My Beams */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-3 min-w-max">
          {sourceTags.map((tag) => {
            const Icon = tag.icon;
            return (
              <button
                key={tag.id}
                onClick={() => setSelectedSource(tag.id as DataSourceType)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  selectedSource === tag.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Area */}
      <div className="bg-gray-50 rounded-2xl p-8 min-h-[300px] flex flex-col justify-center">
        {selectedSource === 'search-url' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <FaSearch className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">LinkedIn Search URL</h3>
              <p className="text-gray-600">Paste your LinkedIn search URL to target specific professionals</p>
            </div>
            <Input
              placeholder="https://www.linkedin.com/search/results/people/..."
              value={searchUrl}
              onChange={(e) => setSearchUrl(e.target.value)}
              className="rounded-2xl text-center"
            />
            <div className="p-4 bg-blue-50 rounded-2xl">
              <p className="text-sm text-blue-700 text-center">
                <strong>Tip:</strong> Go to LinkedIn, perform your search with filters, then copy the URL
              </p>
            </div>
          </div>
        )}

        {selectedSource === 'csv-upload' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <FaUpload className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">Upload CSV File</h3>
              <p className="text-gray-600">Upload a file with LinkedIn profile URLs or contact information</p>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-300 transition-colors"
              onClick={() => document.getElementById('csv-upload')?.click()}
            >
              {uploadedFile ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <FaFileAlt className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-green-600 font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">File uploaded successfully</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <FaUpload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg text-gray-600 mb-2">Drop your CSV file here</p>
                    <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                    <Button variant="primary" size="lg" className="rounded-2xl">
                      Choose File
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
          </div>
        )}

        {selectedSource === 'sales-navigator' && (
          <div className="text-center space-y-6">
            <div>
              <FaLinkedin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">Sales Navigator Integration</h3>
              <p className="text-gray-600">Import prospects directly from Sales Navigator searches</p>
            </div>
            
            <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="font-medium text-yellow-800">Premium Feature</span>
              </div>
              <p className="text-sm text-yellow-700 mb-4">
                This feature requires a LinkedIn Sales Navigator subscription
              </p>
              <Button variant="outline" className="rounded-2xl" disabled>
                Connect Sales Navigator (Coming Soon)
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" className="px-6 py-3 rounded-2xl">
          Back
        </Button>
        <Button 
          variant="primary" 
          className="px-6 py-3 rounded-2xl"
          disabled={
            (selectedSource === 'search-url' && !searchUrl.trim()) ||
            (selectedSource === 'csv-upload' && !uploadedFile)
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
}