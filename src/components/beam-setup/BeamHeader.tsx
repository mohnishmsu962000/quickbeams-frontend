'use client';

import { useState } from 'react';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import Button from '@/components/ui/Button';

export default function BeamHeader() {
  const [beamName, setBeamName] = useState('untitled');
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <header className="flex mt-6 items-center mb-5">
    <div className='flex space-x-20 w-fit border-gray-200 bg-white px-6 py-4 rounded-[20px] shadow-md'>
      {/* Left - Beam name */}
      <div className="flex items-center space-x-3">
        <HiOutlineLightningBolt className="w-6 h-6 text-blue-600" />
        {isEditingName ? (
          <input
            value={beamName}
            onChange={(e) => setBeamName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            className="text-l font-normal min-w-[500px] bg-transparent border-b border-blue-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <h1 
            className="text-l font-normal cursor-pointer hover:text-blue-600 border-b border-blue-500"
            onClick={() => setIsEditingName(true)}
          >
            {beamName}
          </h1>
        )}
      </div>

      {/* Right - Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">Save as Draft</Button>
        <Button variant="primary" size="sm">Publish</Button>
      </div>
      </div>
    </header>
  );
}