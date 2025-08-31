'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  FaHome, 
  FaChartBar, 
  FaCog, 
  FaGift, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaBell, 
  FaUser,
  FaSignOutAlt 
} from 'react-icons/fa';
import { MdExplore } from 'react-icons/md';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import Button from '@/components/ui/Button';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: FaHome },
  { name: 'My Beams', href: '/dashboard/my-beams', icon: HiOutlineLightningBolt },
  { name: 'Discover', href: '/dashboard/discover', icon: MdExplore },
  { name: 'Analytics', href: '/dashboard/analytics', icon: FaChartBar },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
];

// Mock notifications
const mockNotifications = [
  { id: 1, message: 'LinkedIn Auto-connect completed - 15 new connections', time: '2 hours ago', unread: true },
  { id: 2, message: 'Weekly report is ready for download', time: '1 day ago', unread: true },
  { id: 3, message: 'Beam "Sales Outreach" reached daily limit', time: '2 days ago', unread: false },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const openChat = () => {
    if (typeof window !== "undefined" && window.fcWidget) {
      window.fcWidget.open();
      window.fcWidget.show();
    }
  };

  const handleSignOut = () => {
    console.log('Signing out...');
    // Add sign out logic here
  };

  const unreadNotifications = mockNotifications.filter(n => n.unread).length;

  return (
    <div className="flex flex-col w-64 mr-12 bg-white border-r border-gray-200 h-screen justify-between p-6 px-9">
      <div>
        {/* Top notification icons */}
        <div className="flex space-x-2 mb-6 justify-center">
          
        </div>

        {/* Workspace selector */}
        <div className="mb-6">
          <button className="flex items-center justify-between w-full px-4 py-3 text-lg font-normal text-black bg-white border border-gray-300 rounded-[20px] hover:bg-gray-50 shadow-sm">
            <span>Workspace</span>
            <FaChevronDown className="w-4 h-4 text-blue-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = item.name === 'Settings' 
              ? pathname.startsWith(item.href)
              : pathname === item.href;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 text-[16px] font-normal transition-colors rounded-[20px]',
                  isActive 
                    ? 'bg-[#E6F0FF] text-blue-600 font-medium' 
                    : 'text-gray-800 hover:bg-gray-100'
                )}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        {/* Trial section */}
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <img
              src="/Logo.png"
              alt="Lightning Bolt"
              width={80}
              height={80}
            />
            <div>
              <p className="text-xs font-medium text-black">TRIAL ENDS IN</p>
              <p className="text-2xl font-bold text-black">8 Days</p>
            </div>
          </div>
          
          <Button variant="outline" size="md" className="w-full rounded-full border-blue-600 text-blue-600">
            Upgrade Now
          </Button>
        </div>

        {/* Bottom links */}
        <div className="space-y-1">
          <Link href="/dashboard/whats-new" className="flex items-center px-4 py-2 text-[16px] font-normal text-gray-800 hover:bg-gray-100 rounded-[20px]">
            <FaGift className="w-4 h-4 mr-3" />
            What's New
          </Link>
          <button onClick={openChat} className="flex items-center px-4 py-2 text-[16px] font-normal text-gray-800 hover:bg-gray-100 rounded-[20px]">
            <FaQuestionCircle className="w-4 h-4 mr-3" />
            Support
          </button>
        </div>
      </div>
    </div>
  );
}