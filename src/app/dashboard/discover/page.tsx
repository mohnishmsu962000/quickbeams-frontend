'use client';

import { useState } from 'react';
import Link from 'next/link';
import BeamTemplateCard from '@/components/ui/BeamTemplateCard';
import Badge from '@/components/ui/Badge';

const filterTabs = [
 { id: 'all', label: 'All Templates' },
 { id: 'linkedin', label: 'LinkedIn' },
 { id: 'outreach', label: 'Outreach' },
 { id: 'data-scraping', label: 'Data Scraping' },
 { id: 'popular', label: 'Popular' }
];

const mockTemplates = [
 {
   id: '1',
   title: 'LinkedIn Auto-connect',
   slug: 'linkedin-auto-connect',
   description: [
     'Scrape leads from LinkedIn Company Posts',
     'Spot intent signals for personalized outreach', 
     'Daily re-run with smart detection to find most engaged posts'
   ],
   platform: 'linkedin' as const
 },
 {
   id: '2',
   title: 'LinkedIn Search Scrape',
   slug: 'linkedin-search-scrape', 
   description: [
     'Scrape leads from LinkedIn Company Posts',
     'Spot intent signals for personalized outreach',
     'Daily re-run with smart detection to find most engaged posts'
   ],
   platform: 'linkedin' as const
 },
 {
   id: '3',
   title: 'LinkedIn Auto-connect',
   slug: 'linkedin-auto-connect',
   description: [
     'Scrape leads from LinkedIn Company Posts',
     'Spot intent signals for personalized outreach',
     'Daily re-run with smart detection to find most engaged posts'
   ],
   platform: 'linkedin' as const
 },
 {
   id: '4',
   title: 'LinkedIn Search Scrape',
   slug: 'linkedin-search-scrape',
   description: [
     'Scrape leads from LinkedIn Company Posts', 
     'Spot intent signals for personalized outreach',
     'Daily re-run with smart detection to find most engaged posts'
   ],
   platform: 'linkedin' as const
 },
 {
   id: '5',
   title: 'LinkedIn Auto-connect',
   slug: 'linkedin-auto-connect',
   description: [
     'Scrape leads from LinkedIn Company Posts',
     'Spot intent signals for personalized outreach'
   ],
   platform: 'linkedin' as const
 },
 {
   id: '6',
   title: 'LinkedIn Search Scrape',
   slug: 'linkedin-search-scrape',
   description: [
     'Scrape leads from LinkedIn Company Posts', 
     'Spot intent signals for personalized outreach'
   ],
   platform: 'linkedin' as const
 }
];

export default function DiscoverPage() {
 const [activeFilter, setActiveFilter] = useState('all');

 return (
   <div className="py-6 space-y-6 pr-12">
     {/* Filter tabs */}
     <div className="flex space-x-3">
       {filterTabs.map((tab) => (
         <button
           key={tab.id}
           onClick={() => setActiveFilter(tab.id)}
           className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
             activeFilter === tab.id
               ? 'bg-blue-100 text-blue-800'
               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
           }`}
         >
           {tab.label}
         </button>
       ))}
     </div>

     {/* Templates Grid */}
     <div className="grid grid-cols-3 gap-6">
       {mockTemplates.map((template) => (
         <Link href={`/dashboard/discover/${template.slug}`} key={template.id}>
           <BeamTemplateCard
             title={template.title}
             description={template.description}
             platform={template.platform}
           />
         </Link>
       ))}
     </div>
   </div>
 );
}