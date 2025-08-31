'use client';

import { useDesktopOnly } from '@/hooks/useDesktopOnly';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { FaDesktop } from 'react-icons/fa';

interface DesktopOnlyProps {
  children: React.ReactNode;
}

export default function DesktopOnly({ children }: DesktopOnlyProps) {
  const isDesktop = useDesktopOnly();

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="inline-flex items-center text-blue-600 text-2xl font-medium mb-4">
              <HiOutlineLightningBolt className="mr-2" />
              Quickbeams
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaDesktop className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            Desktop Only Application
          </h2>
          <p className="text-gray-600 mb-6">
            Quickbeams is designed for desktop use only. Please access this application from a desktop or laptop computer for the best experience.
          </p>
          <p className="text-sm text-gray-500">
            Minimum screen width: 1024px
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}