import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-16 bg-gray-50 h-full flex flex-col items-center py-6 shadow-md">
      {/* 프로필 */}
      <div className="mb-8">
        <img
          src="/assets/profile.svg"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* 아이콘 리스트 */}
      <div className="flex flex-col space-y-8">
        <button className="text-gray-400 hover:text-red-500">
          <img src="/assets/bell.svg" alt="Notification" className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-red-500">
          <img src="/assets/search.svg" alt="Search" className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-red-500">
          <img src="/assets/dashboard.svg" alt="Dashboard" className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-red-500">
          <img src="/assets/settings.svg" alt="Settings" className="w-6 h-6" />
        </button>
      </div>

      {/* 하단 삼각형 아이콘 */}
      <div className="mt-auto">
        <img src="/assets/triangle.svg" alt="Triangle" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Sidebar;
