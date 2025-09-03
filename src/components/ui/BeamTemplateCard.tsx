import React from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';
import { FaLinkedin } from 'react-icons/fa';
import Badge from './Badge';
import Link from 'next/link';

interface BeamTemplateCardProps {
  title: string;
  description: string[];
  platform?: 'linkedin' | 'instagram' | 'google';
  onLearnMore?: () => void;
  onInitiate?: () => void;
  className?: string;
}

export default function BeamTemplateCard({
  title,
  description,
  platform = 'linkedin',
  onLearnMore,
  onInitiate,
  className
}: BeamTemplateCardProps) {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'linkedin':
        return <FaLinkedin className="w-6 h-6 text-blue-600" />;
      default:
        return <FaLinkedin className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className={cn("bg-white rounded-[40px] border border-gray-200 shadow-sm p-10 flex flex-col justify-between h-full", className)}>
      {/* Header with icon and Beam button */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-8 h-8 flex items-center justify-center">
          {getPlatformIcon()}
        </div>
        <Badge variant="default" size="sm">
          Beam
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-lg text-black mb-4 font-medium">{title}</h3>

      {/* Description points */}
      <div className="space-y-3 mb-6 flex-grow">
        {description.map((point, index) => (
          <p key={index} className="text-sm text-gray-600 leading-relaxed">
            {point}
          </p>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex space-x-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onLearnMore}
          className="flex-1 text-blue-600 border-blue-600"
        >
          Learn More
        </Button>
        <Link href="/beam-setup/linkedin-auto-connect/connected-accounts">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={onInitiate}
            className="flex-1"
          >
            Initiate
          </Button>
         </Link>

        </div>
      
    </div>
  );
}