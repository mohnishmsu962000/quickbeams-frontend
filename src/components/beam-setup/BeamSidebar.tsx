'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaDatabase, FaChartLine, FaMagic, FaCog } from 'react-icons/fa';
import { HiOutlineLightningBolt } from 'react-icons/hi';

export default function BeamSidebar() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard/discover');
  };

  const sidebarItems = [
    { icon: HiOutlineLightningBolt, label: 'Build', active: true },
    { icon: FaChartLine, label: 'Result', active: false },
    { icon: FaDatabase, label: 'Data', active: false },
    { icon: FaMagic, label: 'Hyperpersonalization', active: false },
    { icon: FaCog, label: 'Settings', active: false }
  ];

  return (
    <div className="w-28 flex flex-col items-center justify-start mr-1 mt-6">
        <div className="w-fit h-fit bg-white shadow-md rounded-[20px] px-4 py-6 items-center space-y-4 border-gray-200">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
      >
        <FaArrowLeft className="w-4 h-4 text-gray-600" />
      </button>

      {/* Sidebar Items */}
      {sidebarItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <button
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              item.active 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={item.label}
          >
            <IconComponent className="w-5 h-5" />
          </button>
        );
      })}
      </div>
    </div>
  );
}