'use client';

import { FaChevronDown, FaSearch } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { FiPlus } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-white border-b rounded-bl-[40px] border-gray-200 px-12 py-6 flex items-center justify-between shadow-sm" style={{ height: '80px' }}>
      {/* Left side - Dropdown navigation */}
      <nav className="flex items-center space-x-9">
        <div className="relative group">
          <button className="flex items-center gap-2 text-sm font-light text-black hover:text-gray-600 focus:outline-none">
            Explore Beams
            <FaChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg">LinkedIn Auto-connect</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">LinkedIn Search Export</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-lg">LinkedIn Auto-message</a>
          </div>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-2 text-sm font-light text-black hover:text-gray-600 focus:outline-none">
            Resources
            <FaChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg">Documentation</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Best Practices</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-lg">Support</a>
          </div>
        </div>
      </nav>

      {/* Center - Search bar */}
      <div className="flex-1 max-w-sm mx-8 relative">
        <input
          type="text"
          placeholder="Search quickbeams"
          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg bg-white shadow-sm text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Right side - New Beam button */}
      <Button variant="primary" size="md" className="px-8 py-3 rounded-[20px] min-w-[150px]">
        <FiPlus className='text-xl mr-3' />
        New Beam
      </Button>
    </header>
  );
}