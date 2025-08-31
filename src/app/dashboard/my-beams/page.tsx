'use client';

import { useState } from 'react';
import BeamCard from '@/components/ui/BeamCard';

const mockBeams = [
  {
    id: '1',
    predefinedName: 'Predefined beam name',
    customName: 'Custom given beam name lorem ipsum',
    status: 'active' as const
  },
  {
    id: '2',
    predefinedName: 'Predefined beam name',
    customName: 'Custom given beam name lorem ipsum',
    status: 'draft' as const
  },
  {
    id: '3',
    predefinedName: 'Predefined beam name',
    customName: 'Custom given beam name lorem ipsum',
    status: 'error' as const
  }
];

export default function MyBeamsPage() {
  const [filter, setFilter] = useState('all');

  const handleDuplicate = (id: string) => {
    console.log('Duplicate beam:', id);
  };

  const handleRename = (id: string) => {
    // Show rename popup - we'll build this later
    console.log('Rename beam:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete beam:', id);
  };

  const handleInfo = (id: string) => {
    // Navigate to results page - we'll build this later
    console.log('Show beam info:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit beam:', id);
  };

  const handleShowUpdates = (id: string) => {
    console.log('Show updates:', id);
  };

  const handleCompleteSetup = (id: string) => {
    console.log('Complete setup:', id);
  };

  const filteredBeams = mockBeams.filter(beam => 
    filter === 'all' || beam.status === filter
  );

  return (
    <div className="py-6 space-y-6 pr-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-medium text-gray-800">My Beams</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-3">
        {[
          { id: 'all', label: 'All Beams' },
          { id: 'active', label: 'Active' },
          { id: 'draft', label: 'Drafts' },
          { id: 'error', label: 'Errors' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tab.id
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Beams List */}
      <div>
        {filteredBeams.map((beam) => (
          <BeamCard
            key={beam.id}
            id={beam.id}
            predefinedName={beam.predefinedName}
            customName={beam.customName}
            status={beam.status}
            onDuplicate={handleDuplicate}
            onRename={handleRename}
            onDelete={handleDelete}
            onInfo={handleInfo}
            onEdit={handleEdit}
            onShowUpdates={handleShowUpdates}
            onCompleteSetup={handleCompleteSetup}
          />
        ))}
      </div>
    </div>
  );
}