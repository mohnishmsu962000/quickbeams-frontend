'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const linkedInSteps = [
  { id: 'connected-accounts', label: 'Connected Accounts' },
  { id: 'data-source', label: 'Data Source' },
  { id: 'content-personalization', label: 'Content and Personalization' },
  { id: 'frequency', label: 'Frequency' },
  { id: 'other-settings', label: 'Other Settings' }
];

interface LinkedInAutoConnectLayoutProps {
  children: React.ReactNode;
}

export default function LinkedInAutoConnectLayout({ children }: LinkedInAutoConnectLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="pr-12 pb-12">
      <div className="bg-white rounded-[40px] shadow-md border border-gray-200 min-h-[80vh] overflow-hidden">
        <div className="grid grid-cols-5 min-h-[80vh]">
          {/* Left column - Steps (2/5) */}
          <div className="col-span-2 p-8 border-r border-gray-00">
            <div className="space-y-4">
              {linkedInSteps.map((step, index) => {
                const isActive = pathname.includes(step.id);
                
                return (
                  <Link key={step.id} href={`/beam-setup/linkedin-auto-connect/${step.id}`}>
                    <div className={cn(
                      "p-4 rounded-2xl cursor-pointer transition-all duration-200",
                      isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-50"
                    )}>
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                          isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                        )}>
                          {index + 1}
                        </div>
                        <span className="font-medium text-base">{step.label}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right column - Content (3/5) */}
          <div className="col-span-3 p-8 flex items-center justify-center">
            <div className="w-full max-w-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}