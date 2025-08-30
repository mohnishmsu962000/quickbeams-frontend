import React from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface TemplateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onInitiate?: () => void;
  className?: string;
}

export default function TemplateCard({
  icon,
  title,
  description,
  onInitiate,
  className
}: TemplateCardProps) {
  return (
    <div className={cn("bg-white rounded-[20px] border border-gray-200 shadow-sm p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-black text-base mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="ml-4 flex-shrink-0">
          Beam
        </Button>
      </div>
    </div>
  );
}