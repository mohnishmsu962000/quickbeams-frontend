'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { FaCog, FaUsers, FaCreditCard, FaEdit, FaTrash } from 'react-icons/fa';

const currentUserRole: 'admin' | 'superadmin' = 'superadmin';

const settingsTabs = [
  { id: 'general', label: 'General', icon: <FaCog className="w-4 h-4 mr-2" />, href: '/dashboard/settings/general' },
  { id: 'users', label: 'Users', icon: <FaUsers className="w-4 h-4 mr-2" />, href: '/dashboard/settings/users' },
  { id: 'billing', label: 'Billing', icon: <FaCreditCard className="w-4 h-4 mr-2" />, href: '/dashboard/settings/billing' }
];

export default function UsersSettingsPage() {
  const pathname = usePathname();
  const [searchUser, setSearchUser] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('admin');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  
  // Edit user states
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    role: 'admin'
  });

  const [users, setUsers] = useState([
    {
      id: '1',
      email: 'mohnish@giift.com',
      name: 'Mohnish Sunil',
      role: 'Super Admin',
      status: 'Active'
    },
    {
      id: '2',
      email: 'name@email.com',
      name: 'John Doe',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: '3',
      email: 'name@email.com',
      name: 'Sarah Wilson',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: '4',
      email: 'name@email.com',
      name: 'Mike Johnson',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: '5',
      email: 'name@email.com',
      name: 'Anna Smith',
      role: 'Admin',
      status: 'Active'
    }
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const isDisabled = currentUserRole !== 'superadmin';

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/dashboard/settings' },
    { label: 'Users' }
  ];

  const handleInviteUser = () => {
    const newUser = {
      id: Date.now().toString(),
      email: inviteEmail,
      name: inviteEmail.split('@')[0],
      role: inviteRole === 'superadmin' ? 'Super Admin' : 'Admin',
      status: 'Invited'
    };
    setUsers(prev => [...prev, newUser]);
    setInviteEmail('');
    setInviteRole('admin');
    setShowInviteModal(false);
    console.log('User invited:', newUser);
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
      setEditUserData({
        name: user.name,
        email: user.email,
        role: user.role === 'Super Admin' ? 'superadmin' : 'admin'
      });
      setShowEditModal(true);
    }
  };

  const handleSaveEditUser = () => {
    if (editingUser) {
      setUsers(prev => 
        prev.map(user => 
          user.id === editingUser.id 
            ? {
                ...user,
                name: editUserData.name,
                email: editUserData.email,
                role: editUserData.role === 'superadmin' ? 'Super Admin' : 'Admin'
              }
            : user
        )
      );
      setShowEditModal(false);
      setEditingUser(null);
      console.log('User updated:', editUserData);
    }
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(user => user.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
      console.log('User deleted:', userToDelete);
    }
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
        <div className="space-y-6">
          {/* Users Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">Manage Users</h2>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setShowInviteModal(true)}
              disabled={isDisabled}
              className={isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Invite User
            </Button>
          </div>

          {/* Search User */}
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search User</label>
            <Input
              placeholder="John Adams"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>

          {/* Users Table */}
          <div className="border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-1">
                  <input type="checkbox" className="rounded" disabled={isDisabled} />
                </div>
                <div className="col-span-4">Email</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div key={user.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <input type="checkbox" className="rounded" disabled={isDisabled} />
                    </div>
                    <div className="col-span-4">
                      <div className="text-sm font-medium text-gray-900">{user.email}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600">{user.role}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gray-600">{user.status}</span>
                    </div>
                    <div className="col-span-3 flex justify-end space-x-4">
                      <button 
                        onClick={() => handleEditUser(user.id)}
                        className={`text-blue-600 hover:text-blue-700 text-sm ${
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isDisabled}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className={`text-red-600 hover:text-red-700 text-sm ${
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isDisabled}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      <Modal 
        isOpen={showInviteModal} 
        onClose={() => setShowInviteModal(false)}
        title="Invite New User"
      >
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="user@company.com"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleInviteUser}
              disabled={!inviteEmail.trim()}
            >
              Send Invite
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit User"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={editUserData.name}
            onChange={(e) => setEditUserData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="User name"
          />
          
          <Input
            label="Email Address"
            type="email"
            value={editUserData.email}
            onChange={(e) => setEditUserData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="user@company.com"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={editUserData.role}
              onChange={(e) => setEditUserData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveEditUser}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
      <Modal 
          isOpen={showDeleteModal} 
          onClose={() => setShowDeleteModal(false)}
          title="Delete User"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete <strong>{userToDelete?.name}</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmDeleteUser}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
    </div>
  );
}