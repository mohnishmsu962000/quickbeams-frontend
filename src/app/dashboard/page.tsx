'use client';

import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import Button from '@/components/ui/Button';
import StatsCard from '@/components/ui/StatsCard';
import TemplateCard from '@/components/ui/TemplateCard';
import Badge from '@/components/ui/Badge';
import { FaPlay, FaCube } from 'react-icons/fa';
import { FiArrowUp } from "react-icons/fi";

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <AppLayout>
      <div className="py-6 space-y-8 pr-12" >
        {/* Header with main stat */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FiArrowUp className="text-2xl text-blue-600 font-bold" style={{ strokeWidth: 3 }}/>
            </div>
            <h1 className="text-3xl font-bold text-black">340 Requests Sent</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Last 7 days</Badge>
          </div>
        </div>

        {/* Stats cards grid */}
        <div className="grid grid-cols-3 gap-6">
          <StatsCard 
            title="85 Accepted"
            percentage="25%"
            trend="up"
            trendValue="4.57%"
          />
          <StatsCard 
            title="45 Accepted"
            percentage="12%"
            trend="down"
            trendValue="4.57%"
          />
          <StatsCard 
            title="17 Replied"
            percentage="5%"
            trend="up"
            trendValue="4.57%"
          />
        </div>

        {/* Popular Beams Section */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Most Popular Beams</h2>
          <div className="grid grid-cols-2 gap-6">
            <TemplateCard
              icon={<FaPlay className="w-6 h-6 text-blue-600" />}
              title="LinkedIn Auto-connect"
              description="Auto-connect profiles on LinkedIn with predefined messages and frequency"
            />
            <TemplateCard
              icon={<FaCube className="w-6 h-6 text-blue-600" />}
              title="LinkedIn Auto-messages"
              description="Connect and send automatic messages to your existing network"
            />
            <TemplateCard
              icon={<FaPlay className="w-6 h-6 text-blue-600" />}
              title="LinkedIn Auto-connect"
              description="Auto-connect profiles on LinkedIn with predefined messages and frequency"
            />
            <TemplateCard
              icon={<FaCube className="w-6 h-6 text-blue-600" />}
              title="LinkedIn Auto-messages"
              description="Connect and send automatic messages to your existing network"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
