'use client';

import { useState } from 'react';
import BeamCard from '@/components/ui/BeamCard';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function MyBeamsPage() {
  const [filter, setFilter] = useState('all');
  const [beams, setBeams] = useState([
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
  ]);
  const router = useRouter();

  

  const handleDuplicate = (id: string) => {
    const beamToDuplicate = beams.find(beam => beam.id === id);
    if (beamToDuplicate) {
      const newBeam = {
        ...beamToDuplicate,
        id: Date.now().toString(),
        customName: `${beamToDuplicate.customName} (Copy)`,
        status: 'draft' as const
      };
      setBeams(prev => [...prev, newBeam]);
    }
    console.log('Duplicate beam:', id);
  };

  const handleRename = (id: string, newName: string) => {
    setBeams(prevBeams => 
      prevBeams.map(beam => 
        beam.id === id 
          ? { ...beam, customName: newName }
          : beam
      )
    );
    console.log('Renamed beam:', id, 'to:', newName);
  };

  const handleDelete = (id: string) => {
    setBeams(prev => prev.filter(beam => beam.id !== id));
    console.log('Delete beam:', id);
  };

  const handleInfo = (id: string) => {
    // Navigate to results page - we'll build this later
    console.log('Show beam info:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit beam:', id);
    
    try {
      const selectedBeam = beams.find(beam => beam.id === id);
      if (selectedBeam) {
        router.push('/beam-setup/linkedin-auto-connect/connected-accounts');
      }
    } catch (error) {
      console.error('Router error:', error);
      // Fallback: use window.location if router fails
      window.location.href = '/beam-setup/linkedin-auto-connect/connected-accounts';
    }
  };

  const handleShowUpdates = (id: string) => {
    console.log('Show updates:', id);
  };

  const handleCompleteSetup = (id: string) => {
    console.log('Complete setup:', id);
  };

  const filteredBeams = beams.filter(beam => 
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

      {/* Empty state */}
      {filteredBeams.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No beams found</h3>
          <p className="text-gray-500 mb-4">
            {filter === 'all' 
              ? "You haven't created any beams yet. Get started by creating your first automation."
              : `No ${filter} beams found. Try a different filter or create a new beam.`
            }
          </p>
          <Button variant="primary">Create Your First Beam</Button>
        </div>
      )}
    </div>
  );
}