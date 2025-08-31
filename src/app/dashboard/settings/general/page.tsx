'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FaCog, FaUsers, FaCreditCard } from 'react-icons/fa';

const currentUserRole: 'admin' | 'superadmin' = 'admin';

const settingsTabs = [
  { id: 'general', label: 'General', icon: <FaCog className="w-4 h-4 mr-2" />, href: '/dashboard/settings/general' },
  { id: 'users', label: 'Users', icon: <FaUsers className="w-4 h-4 mr-2" />, href: '/dashboard/settings/users' },
  { id: 'billing', label: 'Billing', icon: <FaCreditCard className="w-4 h-4 mr-2" />, href: '/dashboard/settings/billing' }
];

export default function GeneralSettingsPage() {
  const pathname = usePathname();
  const [workspaceName, setWorkspaceName] = useState('My workspace - team 1');
  const [profileData, setProfileData] = useState({
    name: 'Mohnish Sunil',
    email: 'mohnish@giift.com',
    phone: '1234556789',
    userId: '4545465677'
  });

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  // Edit form states
  const [editProfileData, setEditProfileData] = useState(profileData);
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const isDisabled = currentUserRole !== 'superadmin';

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/dashboard/settings' },
    { label: 'General' }
  ];

  const handleSave = () => {
    console.log('Saving general settings...', { workspaceName });
  };

  const handleProfileSave = () => {
    setProfileData(editProfileData);
    setShowProfileModal(false);
    console.log('Profile updated:', editProfileData);
  };

  const handleSecuritySave = () => {
    console.log('Security updated:', securityData);
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowSecurityModal(false);
  };

  return (
    <div className="py-6 space-y-6 pr-12">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-medium text-gray-800">Settings</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-3">
        {settingsTabs.map((tab) => (
          <Link key={tab.id} href={tab.href}>
            <button
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                pathname === tab.href
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm p-8">
        <div className="space-y-8">
          {/* General Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">General</h2>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleSave}
              disabled={isDisabled}
              className={isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Save
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Workspace Name</label>
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                disabled={isDisabled}
                className={isDisabled ? 'bg-gray-50 text-gray-400' : ''}
                placeholder="Enter workspace name"
              />
              {isDisabled && (
                <p className="text-xs text-gray-500 mt-1">Only Super Admins can modify workspace settings</p>
              )}
            </div>
          </div>

          {/* My Profile Section */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">My Profile</h3>
              <Button variant="outline" size="sm" onClick={() => setShowProfileModal(true)}>
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input 
                  value={profileData.name} 
                  disabled 
                  className="bg-gray-50 text-gray-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
                <Input 
                  value={profileData.email} 
                  disabled 
                  className="bg-gray-50 text-gray-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input 
                  value={profileData.phone} 
                  disabled 
                  className="bg-gray-50 text-gray-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                  {currentUserRole === 'superadmin' ? 'Super Admin' : 'Admin'}
                </div>
              </div>
            </div>
          </div>

          {/* Login and Security Section */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">Login and Security</h3>
              <Button variant="outline" size="sm" onClick={() => setShowSecurityModal(true)}>
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                <Input 
                  value={profileData.userId} 
                  disabled 
                  className="bg-gray-50 text-gray-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Input 
                  value="••••••••••••••" 
                  disabled 
                  className="bg-gray-50 text-gray-400" 
                  type="password" 
                />
              </div>
            </div>
          </div>

          {/* Additional Settings Section */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-6">Workspace Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Email Notifications</h4>
                  <p className="text-xs text-gray-600">Receive email updates about beam activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Weekly Reports</h4>
                  <p className="text-xs text-gray-600">Get weekly performance summaries</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <Modal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={editProfileData.name}
            onChange={(e) => setEditProfileData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            label="Email"
            value={editProfileData.email}
            onChange={(e) => setEditProfileData(prev => ({ ...prev, email: e.target.value }))}
            type="email"
          />
          <Input
            label="Phone Number"
            value={editProfileData.phone}
            onChange={(e) => setEditProfileData(prev => ({ ...prev, phone: e.target.value }))}
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowProfileModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleProfileSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Security Edit Modal */}
      <Modal 
        isOpen={showSecurityModal} 
        onClose={() => setShowSecurityModal(false)}
        title="Change Password"
      >
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={securityData.currentPassword}
            onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
          />
          <Input
            label="New Password"
            type="password"
            value={securityData.newPassword}
            onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={securityData.confirmPassword}
            onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowSecurityModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSecuritySave}>
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}