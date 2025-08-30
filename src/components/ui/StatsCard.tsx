import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value?: string | number;  // Made optional
  percentage?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  percentage,
  trend,
  trendValue,
  className
}: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-[20px] border border-gray-200 shadow-sm p-6", className)}>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-black">{percentage || value}</span>
          {trendValue && (
            <span className={cn(
              "text-sm font-medium flex items-center",
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              {trend === 'up' ? '↗' : '↘'} {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}