'use client';

import { useState } from 'react';
import { FaChevronDown, FaSearch, FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FiPlus } from "react-icons/fi";
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock notifications
const mockNotifications = [
  { id: 1, message: 'LinkedIn Auto-connect completed - 15 new connections', time: '2 hours ago', unread: true },
  { id: 2, message: 'Weekly report is ready for download', time: '1 day ago', unread: true },
  { id: 3, message: 'Beam "Sales Outreach" reached daily limit', time: '2 days ago', unread: false },
];

export default function Header() {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadNotifications = mockNotifications.filter(n => n.unread).length;

  const router = useRouter();
  
  const handleSignOut = () => {
    console.log('Signing out...');
    router.push('/signIn');
  };

  return (
    <header className="bg-white border-b rounded-bl-[40px] border-gray-200 px-12 py-6 flex items-center justify-between shadow-sm" style={{ height: '80px' }}>
      {/* Left side - Dropdown navigation */}
      <nav className="flex items-center space-x-9">
        <div className="relative group">
          <button className="flex items-center gap-2 text-sm font-light text-black hover:text-gray-600 focus:outline-none">
            Explore Beams
            <FaChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg">LinkedIn Auto-connect</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">LinkedIn Search Export</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-lg">LinkedIn Auto-message</a>
          </div>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-2 text-sm font-light text-black hover:text-gray-600 focus:outline-none">
            Resources
            <FaChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg">Documentation</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Best Practices</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-lg">Support</a>
          </div>
        </div>
      </nav>

      {/* Center - Search bar */}
      <div className="flex-1 max-w-sm mx-8 relative">
        <input
          type="text"
          placeholder="Search quickbeams"
          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Right side - Icons and New Beam button */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <FaBell className="w-4 h-4 text-gray-600" />
          </button>
          {unreadNotifications > 0 && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900">Notifications</h3>
                {unreadNotifications > 0 && (
                  <p className="text-xs text-gray-500">{unreadNotifications} unread</p>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b hover:bg-gray-50 ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t">
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <FaUser className="w-4 h-4 text-gray-600" />
          </button>
          
          {/* User Dropdown */}
          {showUserDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b">
                <p className="font-medium text-gray-900">Mohnish Sunil</p>
                <p className="text-xs text-gray-500">mohnish@giift.com</p>
              </div>
              <div className="py-2">
                <Link
                  href="/dashboard/settings/general"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserDropdown(false)}
                >
                  <FaCog className="w-4 h-4 mr-3" />
                  Account Settings
                </Link>
                <Link
                  href="/dashboard/settings/users"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserDropdown(false)}
                >
                  <FaUser className="w-4 h-4 mr-3" />
                  Manage Users
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* New Beam button */}
        <Button variant="primary" size="md" className="px-8 py-3 rounded-[20px] min-w-[150px]">
          <FiPlus className='text-xl mr-3' />
          New Beam
        </Button>

        {/* Close dropdowns when clicking outside */}
        {(showUserDropdown || showNotifications) && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => {
              setShowUserDropdown(false);
              setShowNotifications(false);
            }}
          />
        )}
      </div>
    </header>
  );
}