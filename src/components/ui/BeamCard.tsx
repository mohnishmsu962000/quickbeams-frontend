'use client';

import { useState } from 'react';
import Button from './Button';
import Badge from './Badge';
import Modal from './Modal';
import Input from './Input';
import { FaLinkedin, FaEllipsisV, FaCopy, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

interface BeamCardProps {
  id: string;
  predefinedName: string;
  customName: string;
  status: 'active' | 'draft' | 'error';
  onDuplicate: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onInfo: (id: string) => void;
  onEdit: (id: string) => void;
  onShowUpdates: (id: string) => void;
  onCompleteSetup: (id: string) => void;
}

export default function BeamCard({
  id,
  predefinedName,
  customName,
  status,
  onDuplicate,
  onRename,
  onDelete,
  onInfo,
  onEdit,
  onShowUpdates,
  onCompleteSetup
}: BeamCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newName, setNewName] = useState(customName);

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary" size="sm">Draft</Badge>;
      case 'error':
        return <Badge variant="error" size="sm">Error</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  const handleRename = () => {
    onRename(id, newName);
    setShowRenameModal(false);
    setShowDropdown(false);
  };

  const handleRenameCancel = () => {
    setNewName(customName); // Reset to original name
    setShowRenameModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-[40px] border border-gray-200 shadow-sm p-6 mb-4 min-h-[120px]">
        <div className="flex items-start justify-between mb-4">
          {/* Top left - Badge */}
          <div>
            {getStatusBadge()}
          </div>
          
          {/* Top right - Dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <FaEllipsisV className="w-4 h-4" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => { onDuplicate(id); setShowDropdown(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaCopy className="w-4 h-4 mr-3" />
                  Duplicate
                </button>
                <button
                  onClick={() => { setShowRenameModal(true); setShowDropdown(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaEdit className="w-4 h-4 mr-3" />
                  Rename
                </button>
                <button
                  onClick={() => { onDelete(id); setShowDropdown(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaTrash className="w-4 h-4 mr-3" />
                  Delete
                </button>
                <button
                  onClick={() => { onInfo(id); setShowDropdown(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaInfoCircle className="w-4 h-4 mr-3" />
                  See Beam Info
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex items-center justify-between">
          {/* Left side - Icon and text */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaLinkedin className="w-6 h-6 text-blue-600" />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">{predefinedName}</p>
              <h3 className="text-lg font-medium text-gray-800">{customName}</h3>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-3">
            {status === 'draft' ? (
              <>
                <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
                  Edit
                </Button>
                <Button variant="primary" size="sm" onClick={() => onCompleteSetup(id)}>
                  Complete Setup
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
                  Edit
                </Button>
                <Button variant="primary" size="sm" onClick={() => onShowUpdates(id)}>
                  Show Updates
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Rename Modal */}
      <Modal 
        isOpen={showRenameModal} 
        onClose={handleRenameCancel}
        title="Rename Beam"
      >
        <div className="space-y-4">
          <Input
            label="Beam Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new beam name"
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={handleRenameCancel}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleRename}
              disabled={!newName.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}