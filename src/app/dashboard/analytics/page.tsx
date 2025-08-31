'use client';

import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaChartBar, FaRocket, FaBell } from 'react-icons/fa';

export default function AnalyticsPage() {
  return (
    <div className="py-6 space-y-8 pr-12">
      {/* Main Coming Soon Card */}
      <div className="flex items-center justify-center min-h-[500px]">
        <Card className="p-12 text-center max-w-2xl">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaChartBar className="w-10 h-10 text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-medium text-gray-800 mb-4">
            Analytics Dashboard Coming Soon
          </h1>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            We're building powerful analytics to help you track your automation performance, 
            monitor success rates, and optimize your outreach strategies.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-left p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-green-600 text-sm">📊</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Performance Metrics</h3>
              <p className="text-sm text-gray-600">Track acceptance rates, response rates, and conversion metrics</p>
            </div>
            
            <div className="text-left p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-purple-600 text-sm">📈</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Trend Analysis</h3>
              <p className="text-sm text-gray-600">Visualize your automation performance over time</p>
            </div>
            
            <div className="text-left p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-orange-600 text-sm">🎯</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">A/B Testing</h3>
              <p className="text-sm text-gray-600">Compare different message templates and strategies</p>
            </div>
            
            <div className="text-left p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-600 text-sm">📋</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Custom Reports</h3>
              <p className="text-sm text-gray-600">Generate detailed reports for your team</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button variant="primary" size="md">
              <FaBell className="w-4 h-4 mr-2" />
              Notify Me When Ready
            </Button>
            <Button variant="outline" size="md">
              <FaRocket className="w-4 h-4 mr-2" />
              Request Feature
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}